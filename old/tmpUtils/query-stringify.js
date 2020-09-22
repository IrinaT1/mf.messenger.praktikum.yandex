/**
 * @description
 * @example
 * const obj: StringIndexed = {key: 1, key2: 'test', key3: false, key4: true, key5: [1, 2, 3], key6: { a: 1 }, key7: { b: { d: 2 } }};
 * queryStringify(obj) returns 'key=1&key2=test&key3=false&key4=true&key5[0]=1&key5[1]=2&key5[2]=3&key6[a]=1&key7[b][d]=2'
 */
function queryStringifyNew(data) {
    if (!(!!data) || !(data.constructor === Object)) {
        throw Error("input must be an object");
    }
    var result = [];
    function process(initkey, data) {
        Object.keys(data).forEach(function (key) {
            var value = data[key];
            if ((!!value) && (value.constructor === Object)) {
                console.log("key = ", key);
                console.log("initkey = ", initkey);
                var newkey = initkey === "" ? key : initkey + "[" + key + "]";
                process(newkey, value);
            }
            else if ((!!value) && (value.constructor === Array)) {
                var vArray = value;
                vArray.forEach(function (v, index) {
                    var newkey = initkey === "" ? key : initkey + "[" + key + "]";
                    newkey += '[' + index + ']';
                    var tmpobj = {};
                    tmpobj[initkey + newkey] = v;
                    result.push(tmpobj);
                });
            }
            else {
                var newkey = initkey === "" ? key : initkey + "[" + key + "]";
                var tmpobj = {};
                tmpobj[newkey] = value;
                result.push(tmpobj);
            }
        });
    }
    process("", data);
    var str = "";
    result.forEach(function (pair, index) {
        if (index != 0) {
            str += "&";
        }
        str += Object.keys(pair)[0] + "=" + pair[Object.keys(pair)[0]];
    });
    return str;
}
//# sourceMappingURL=query-stringify.js.map