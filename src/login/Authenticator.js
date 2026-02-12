//@ts-check

const {autoValidate} = require('./Validation');
const {getID} = require('../helpers/UUIDs');

/**
 * @import {TokenInfo, Validator} from "./Validation"
 * @import {AuthorizationMode} from "./ConnectionMethods"
 */

/**
 * @typedef {{readonly tokenInfo: TokenInfo, disconnect(): void, reverify(): Promise<TokenInfo?>}} Authenticator
 */
/**
 * @typedef {(err: Error?, accessData: AuthToken?, tokenInfo: TokenInfo?) => any} SaveFunc
 */
/**
 * @typedef {{accessToken: string, tokenType: AuthorizationMode}} AuthToken
 */
/**
 * @typedef {{accessToken: string?, tokenType: AuthorizationMode?}} OptToken
 */

/**
 * @type {Map<string, {val: Validator, funcs: Map<string,SaveFunc>, token: AuthToken}>}
 */
const cache = new Map();

/**
 * 
 * @param {string} cacheKey
 * @param {T} loginInfo
 * @param {(loginInfo: T) => Promise<AuthToken>} keyFunc
 * @template {OptToken} T
 * @returns {Promise<{val: Validator; funcs: Map<string, SaveFunc>; token: AuthToken;}>}
 */
async function getManager(cacheKey, loginInfo, keyFunc) {
    if(!cache.has(cacheKey)) {
        if(!loginInfo.accessToken) {
            const newToken = await keyFunc(loginInfo);
            loginInfo.tokenType = newToken.tokenType;
            loginInfo.accessToken = newToken.accessToken;
        }
        const callbacks = new Map();
        const updater = await autoValidate(loginInfo.accessToken, async (err, tokenInfo) => {
            if(!tokenInfo) {
                let newToken;
                try {
                    newToken = await keyFunc(loginInfo);
                } catch(e) {
                    callbacks.forEach(v => {try { v(err, null, tokenInfo) } catch(e) {require('../helpers/InternalFailure')('authenticator should not deal with callback errors!', e)}});
                    return;
                }
                loginInfo.tokenType = newToken.tokenType;
                loginInfo.accessToken = newToken.accessToken;
                tokenInfo = await updater.setToken(newToken.accessToken);
                return;
            }
            callbacks.forEach(v => {try { v(null, /**@type {{tokenType: String, accessToken: string}} */ (loginInfo), tokenInfo ) } catch(e) {require('../helpers/InternalFailure')('authenticator should not deal with callback errors!', e)}});
        });

        cache.set(cacheKey, {val: updater, funcs: callbacks, token: /** @type {AuthToken} */ (loginInfo)});
    }
    const cacheObj = /**@type {{val: Validator;funcs: Map<string, SaveFunc>;token: AuthToken;}} */ (cache.get(cacheKey));
    loginInfo.tokenType = cacheObj.token.tokenType;
    loginInfo.accessToken = cacheObj.token.accessToken;
    return cacheObj;
}

/**
 * 
 * @param {T} loginInfo 
 * @param {string} cacheKey
 * @param {SaveFunc} saveTokenCallback 
 * @param {(loginInfo: T) => Promise<AuthToken>} keyFunc
 * @template {OptToken} T
 * @returns {Promise<Authenticator>}
 */
async function createAuthenticator(loginInfo, cacheKey, saveTokenCallback, keyFunc) {
    loginInfo = {...loginInfo};
    const cacheObj = await getManager(cacheKey, loginInfo, keyFunc);
    const ownKey = getID();
    //@ts-ignore
    cacheObj.funcs.set(ownKey, saveTokenCallback);
    saveTokenCallback(null, /**@type {{accessToken: String, tokenType: AuthorizationMode}} */ (loginInfo), cacheObj.val.tokenInfo);
    /**
     * @type {Authenticator}
     */
    return {
        tokenInfo: cacheObj.val.tokenInfo,
        disconnect() {
            cacheObj.funcs.delete(ownKey);
            if(cacheObj.funcs.size == 0) {
                cacheObj.val.kill();
                cache.delete(cacheKey);
            }
        },
        reverify() {
            return cacheObj.val.reverify();
        }
    }
}

module.exports = {
    createAuthenticator
}