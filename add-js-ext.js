/**
 * Взято из обсуждения бага https://github.com/microsoft/TypeScript/issues/16577
 * Дополняет пути к зависимостям в es6 модулях расширением '.js'
 */
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const fs = require('fs');
const path = require('path');

function fromDir(startPath, filter, callback) {

    if (!fs.existsSync(startPath)) {
        console.log('no dir ', startPath);
        return;
    }

    const files = fs.readdirSync(startPath);
    for (let i = 0; i < files.length; i++) {
        const filename = path.join(startPath, files[i]);
        const stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            fromDir(filename, filter, callback); //recurse
        } else if (filter.test(filename)) callback(filename);
    }
}

function addDotJsToLocalImports(filename) {
    const buf = fs.readFileSync(filename);

    const replacedImport = buf.toString().replace(/(import .* from\s+['"])(?!.*\.js['"])(\..*?)(?=['"])/g, '$1$2.js');
    if (replacedImport !== buf.toString()) {
        fs.writeFileSync(filename, replacedImport);
        console.log('fixed imports at ' + filename);
    }
    const replacedExport = buf.toString().replace(/(export .* from\s+['"])(?!.*\.js['"])(\..*?)(?=['"])/g, '$1$2.js');
    if (replacedExport !== buf.toString()) {
        fs.writeFileSync(filename, replacedExport);
        console.log('fixed exports at ' + filename);
    }
}

//------------------------
//---BUILD TASK START
//------------------------

fromDir(process.argv[2], /\.js$/, addDotJsToLocalImports);
