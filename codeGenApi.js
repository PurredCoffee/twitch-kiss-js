//@ts-check
/**
 * @type {{[category: string]: {[command: string]: API}}}
 */
//@ts-ignore
const docs = require('./docs/API/docs.json');

/**
 * @typedef {{possible?: string[], type: string, required: boolean, description: string, attr?: {[name: string]: param}}} param
 */
/**
 * @typedef {{possible?: string[], type: string, description: string, attr?: {[name: string]: response}}} response
 */
/**
 * @typedef {{
 *  category: string,
 *  short: string,
 *  long: string,
 *  paramsInfo: string?,
 *  params: {[name: string]: param},
 *  reqBodyInfo: string?,
 *  reqBody: {[name: string]: param},
 *  bodyInfo: string?,
 *  body: {[name: string]: response},
 *  codes: {[num: number]: string},
 *  auth: string,
 *  authInfo: string?,
 *  token: ('app'|'user'|'JWT')[],
 *  method: string,
 *  url: string,
 *  examples: {
 *   request: string,
 *   comment: string,
 *   responses: {
 *    response: string,
 *    comment: string
 *   }[]
 *  }[],
 *  scopes: string[],
 *  queryRestraints: {[param: string]: string}
 * }} API
 */

/**
 * 
 * @param {string} str 
 * @returns {string}
 */
function classIfy(str) {
    return str.split(' ').map(v => (v[0]?v[0].toUpperCase() + v.substring(1):"")).join('');
}
/**
 * 
 * @param {string} str 
 * @returns {string}
 */
function funcIfy(str) {
    return str.split(' ').map((v,i) => (i == 0?v[0]?v[0].toLowerCase() + v.substring(1):"":classIfy(v))).join('');
}
/**
 * @param {string} str
 * @returns {string}
 */
function paramIfy(str) {
    return str.split('_').map((v,i) => (i == 0?v[0]?v[0].toLowerCase() + v.substring(1):"":classIfy(v))).join('');
}

let finalFile = "";
/**
 * 
 * @param  {...string} str 
 */
function addStr(...str) {
    finalFile += str.join(' ');
    finalFile += '\n';
}
/**
 * 
 * @param {param|response} param
 * @param {string} name
 * @param {string} prevName
 * @returns {{
 *  name: string,
 *  original: string,
 *  type: string,
 *  required: boolean?,
 *  description: string
 * }}
 */
function convertParam(param, name, prevName) {
    switch (param.type) {
        case 'integer': param.type = 'number'; break;
        case 'float': param.type = 'number'; break;
        case 'unsigned integer': param.type = 'number'; break;
        case 'int64': param.type = 'number'; break;
        case 'bool': param.type = 'boolean'; break;
    }
    if(param.type.startsWith('map')) {
        param.type = param.type.replaceAll(/map<(.*),(.*)>/g, 'Map<$1,$2>');
    }
    if(param.attr) {
        //
        const values = Object.entries(param.attr).map(([v, attr]) => convertParam(attr, v, `${prevName}_${classIfy(name)}`));
        addStr('        /**');
        addStr(`         * @typedef ${prevName}_${classIfy(name)}`);
        for(let v of values) {
            addStr(`         * @prop {${v.type}} ${v.name} ${v.description?.replaceAll('\n', '\n         *\n         * ')}`)
        }
        addStr('         */');
        param.type = `${prevName}_${classIfy(name)}` + (param.type.endsWith('[]')?"[]":"");
    }
    if(param.possible) {
        return {
            name: paramIfy(name),
            original: name,
            type: param.possible.map(v => '"'+v+'"').join('|'),
            //@ts-ignore
            required: (param.required)?param.required: undefined,
            description: param.description
        }
    }
    return {
        name: paramIfy(name),
        original: name,
        type: param.type,
        //@ts-ignore
        required: (param.required)?param.required: undefined,
        description: param.description
    }
}
/**
 * 
 * @param {API} doc 
 * @param {string} name
 */
function processFunc(doc, name) {
    if(Object.keys(doc.body).length > 0) {
        const values = Object.entries(doc.body).map(([v, attr]) => convertParam(attr, v, classIfy(name)+"Response"));
        addStr('        /**');
        addStr(`         * @typedef ${classIfy(name)}Response`);
        for(let v of values) {
            addStr(`         * @prop {${v.type}} ${v.name} ${v.description?.replaceAll('\n', '\n         *\n         * ')}`)
        }
        addStr('         */');
    }
    const params = [];
    for(let v in doc.params) {
        //@ts-ignore
        params.push({body: false, ...convertParam(doc.params[v], v, classIfy(name)+"Request")});
    }
    for(let v in doc.reqBody) {
        //@ts-ignore
        params.push({body: true, ...convertParam(doc.reqBody[v], v, classIfy(name)+"Request")});
    }
    for(let v in doc.queryRestraints) {
        let a = params.find(a => a.name === v);
        //@ts-ignore
        if(a) a.restraint = doc.queryRestraints[v];
    }
    addStr('        /**');
    addStr(`         * ${doc.short.replaceAll('\n', '\n         *\n         * ')}`);
    addStr(`         * [Learn More](https://dev.twitch.tv/docs/api/reference/#${name.toLowerCase().replaceAll(" ","-")})`);
    if(doc.short != doc.long) {
        addStr(`         *`);
        addStr(`         * ---`);
        if(doc.long.startsWith(doc.short)) addStr(`         * ${doc.long.substring(doc.short.length).replaceAll('\n', '\n         *\n         * ')}`);
        else addStr(`         * ${doc.long.replaceAll('\n', '\n         *\n         * ')}`);
    }
    if(doc.reqBodyInfo || doc.paramsInfo) {
        addStr(`         *`);
        addStr(`         * ---`);
        addStr(`         * *Info*: `);
        addStr(`         * `);
        if(doc.reqBodyInfo) addStr(`         * ${doc.reqBodyInfo.replaceAll('\n', '\n         *\n         * ')}`);
        if(doc.paramsInfo) addStr(`         * ${doc.paramsInfo.replaceAll('\n', '\n         *\n         * ')}`);
    }
    if(doc.auth) {
        addStr(`         *`);
        addStr(`         * ---`);
        addStr(`         * *Authentication*: `);
        addStr(`         * `);
        addStr(`         * ${doc.auth.replaceAll('\n', '\n         *\n         * ')}`);
    }
    if(doc.examples?.length > 0) {
        addStr(`         *`);
        addStr(`         * ---`);
        addStr(`         * *Examples*: `);
        addStr(`         * `);
        doc.examples.forEach((e, i) => {
            addStr(`         * ${e.comment?.replaceAll('\n', '\n         *\n         * ') || "Example " + (i+1)}: `);
            if(e.request) {
                addStr("         * ```");
                addStr(`         * ${e.request.replaceAll('\n', '\n         * ')}`);
                addStr("         * ```");
            }
            if(e.responses.length > 0) {
                addStr(`         * `);
                addStr(`         * *Responses*: `);
                addStr(`         * `);
                e.responses.forEach((r, o) => {
                    addStr(`         * ${r.comment?.replaceAll('\n', '\n         *\n         * ') || "Response " + (i+1)}: `);
                    if(r.response) {
                        addStr("         * ```");
                        addStr(`         * ${r.response.replaceAll('\n', '\n         * ')}`);
                        addStr("         * ```");
                    }
                })
            }
            addStr(`         *`);
            addStr(`         * ---`);
        })
    }
    for(let v of params) {
        addStr(`         * @param {${v.type}${v.required?"":"?"}} ${v.name} ${v.description?.replaceAll('\n', '\n         *\n         * ')}`)
    }
    addStr(`         * @returns {Promise<${Object.keys(doc.body).length > 0?classIfy(name) + "Response":"void"}>} ${doc.bodyInfo?doc.bodyInfo:""}`)
    addStr(`         */`);
    addStr(`        ${funcIfy(name)}(${params.map(v => v.name + (v.required?"":"=null")).join(", ")}) {`);
    addStr(`            return reqFunc("${doc.method}", "${doc.url}",`);
    addStr(`                [${doc.scopes.map(v => '"'+v+'"').join(', ')}],`);
    addStr(`                [${doc.token.map(v => '"'+v+'"').join(', ')}],`);
    addStr(`                {${params.filter(v => !v.body).map(v => v.original + ": " + v.name).join(', ')}},`);
    addStr(`                {${params.filter(v => v.body).map(v => v.original + ": " + v.name).join(', ')}},`);
    addStr(`                {${Object.entries(doc.codes).map(([v, exp]) => v + ": \"" + exp.replaceAll('"', '\\"').replaceAll('\n', '\\n') + "\"").join(', ')}}`);
    addStr(`            );`);
    addStr(`        },`);
}

addStr('//@ts-check');
addStr('/**');
addStr(' * @param {(method: string, url: string, scopes: string[], token: string[], params: {}, body: {}, errorCodes: {}) => Promise<any>} reqFunc');
addStr(' */');
addStr("module.exports = (reqFunc) => ({")
Object.keys(docs).forEach((v) => {
    addStr('    ' + classIfy(v) + ': {');
    Object.keys(docs[v] ?? {}).forEach(a => {
        //@ts-ignore
        processFunc(docs[v][a], a);
    });
    addStr('    },');
});
addStr("})");

const fs = require('fs');

fs.writeFileSync('./src/api/api.js', finalFile);

Object.entries(docs).forEach(([v, entry]) => {
    if(fs.existsSync('./src/api/' + v.toLowerCase() + '.js')) return;
    fs.writeFileSync('./src/api/' + v.toLowerCase() + '.js', `//@ts-check

/**
 * 
 * @param {import('../TwitchBot').TwitchBot} twitchBot 
 * @param {ReturnType<import('./api')>["${classIfy(v)}"]} api
 */
module.exports = (twitchBot, api) => ({
    ${Object.keys(entry).map(v => funcIfy(v) +`() {
        return api.${funcIfy(v)}();
    }`).join(',\n    ')}
})`);
})