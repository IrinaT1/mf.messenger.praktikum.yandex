/**
 * @description 
 * @example
 * const obj: StringIndexed = {key: 1, key2: 'test', key3: false, key4: true, key5: [1, 2, 3], key6: { a: 1 }, key7: { b: { d: 2 } }};
 * queryStringify(obj) returns 'key=1&key2=test&key3=false&key4=true&key5[0]=1&key5[1]=2&key5[2]=3&key6[a]=1&key7[b][d]=2'
 */

type StringIndexed = Record<string, unknown>;

function queryStringifyNew(data: StringIndexed): string | never {
    if (!(!!data) || !(data.constructor === Object)) {
        throw Error("input must be an object");
    }
    let result = [];

    function process(initkey, data) {
        Object.keys(data).forEach((key) => {
            let value = data[key];

            if ((!!value) && (value.constructor === Object)) {

                console.log("key = ", key);
                console.log("initkey = ", initkey);

                let newkey = initkey === "" ? key : initkey + "[" + key + "]";

                process(newkey, value);

            } else if ((!!value) && (value.constructor === Array)) {
                let vArray = value as Array<any>;
                vArray.forEach((v, index) => {

                    let newkey = initkey === "" ? key : initkey + "[" + key + "]";

                    newkey += '[' + index + ']';

                    let tmpobj = {};
                    tmpobj[initkey + newkey] = v;
                    result.push(tmpobj);
                });

            } else {

                let newkey = initkey === "" ? key : initkey + "[" + key + "]";

                let tmpobj = {};
                tmpobj[newkey] = value;
                result.push(tmpobj);
            }
        });
    }

    process("", data);

    let str = "";
    result.forEach((pair, index) => {
        if (index != 0) {
            str += "&";
        }
        str += Object.keys(pair)[0] + "=" + pair[Object.keys(pair)[0]];
    });

    return str;
}