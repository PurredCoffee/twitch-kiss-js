//@ts-check

const {createAuthenticator} = require('./Authenticator');
const {url} = require('../helpers/urlHelper');

/**
 * @import {AuthToken, OptToken, SaveFunc, Authenticator} from "./Authenticator"
 */

/**
 * @typedef {'bearer'} AuthorizationMode
 */

/**
 * @param {{clientID: string, clientSecret: string, authorizationCode: string, redirectUri: string}} loginInfo
 * @returns {Promise<AuthToken>}
 */
async function getKeyAuthorization(loginInfo) {
    const {clientID, clientSecret, authorizationCode, redirectUri} = loginInfo;
    let tokenResponse;
    try {
        tokenResponse = await fetch(url`https://id.twitch.tv/oauth2/token?client_id=${clientID}&code=${authorizationCode}&redirect_uri=${redirectUri}&client_secret=${clientSecret}&&grant_type=authorization_code`, {method: 'POST'});
    } catch(e) {
        return await getKeyAuthorization(loginInfo);
    }
    if(tokenResponse.status !== 200) {
        const errorText = await tokenResponse.text();
        throw Error(errorText);
    }
    const {access_token: accessToken, token_type: tokenType} = await tokenResponse.json();
    return {accessToken, tokenType};
}

/**
 * @param {{clientID: string, clientSecret: string}} loginInfo
 * @returns {Promise<AuthToken>}
 */
async function getKeyClient(loginInfo) {
    const {clientID, clientSecret} = loginInfo;
    let tokenResponse;
    try {
        tokenResponse = await fetch(url`https://id.twitch.tv/oauth2/token?client_id=${clientID}&client_secret=${clientSecret}&grant_type=client_credentials`, {method: 'POST'});
    } catch(e) {
        return await getKeyClient(loginInfo);
    }
    if(tokenResponse.status !== 200) {
        const errorText = await tokenResponse.text();
        throw Error(errorText);
    }
    const {access_token: accessToken, token_type: tokenType} = await tokenResponse.json();
    return {accessToken, tokenType};
}

/**
 * @param {{accessToken: string, tokenType: AuthorizationMode}} loginInfo
 * @returns {Promise<AuthToken>}
 */
async function getKeyImplicit(loginInfo) {
    const {accessToken, tokenType} = loginInfo;
    let tokenResponse;
    try {
        tokenResponse = await fetch('https://id.twitch.tv/oauth2/validate', {headers: {'Authorization': 'OAuth ' + accessToken}});
    } catch(e) {
        return await getKeyImplicit(loginInfo);
    }
    if(tokenResponse.status !== 200) {
        const errorText = await tokenResponse.text();
        throw Error(errorText);
    }
    return {accessToken, tokenType: tokenType};
}

/**
 * 
 * @param {{clientSecret: string, clientID: string} & OptToken} loginInfo 
 * @param {SaveFunc} saveTokenCallback 
 * @returns {Promise<Authenticator>}
 */
async function client(loginInfo, saveTokenCallback) {
    const cacheKey = "CLIENT - " + loginInfo.clientID.replaceAll('-', '--') + " - " + loginInfo.clientSecret.replaceAll('-', '--');
    return createAuthenticator(loginInfo, cacheKey, saveTokenCallback, getKeyClient);
}

/**
 * 
 * @param {{clientID: string, clientSecret: string, authorizationCode: string, redirectUri: string} & OptToken} loginInfo 
 * @param {SaveFunc} saveTokenCallback 
 * @returns {Promise<Authenticator>}
 */
async function authorization(loginInfo, saveTokenCallback) {
    const cacheKey = "AUTHORIZATION - " + loginInfo.clientID.replaceAll('-', '--') + " - " + loginInfo.clientSecret.replaceAll('-', '--') + " - " + loginInfo.authorizationCode.replaceAll('-', '--');
    return createAuthenticator(loginInfo, cacheKey, saveTokenCallback, getKeyAuthorization);
}

/**
 * 
 * @param {{accessToken: string, tokenType: AuthorizationMode?}} loginInfo 
 * @param {SaveFunc} saveTokenCallback 
 * @returns {Promise<Authenticator>}
 */
async function implicit(loginInfo, saveTokenCallback) {
    loginInfo.tokenType = loginInfo.tokenType ?? 'bearer';
    const cacheKey = "IMPLICIT - " + loginInfo.accessToken.replaceAll('-', '--') + " - " + loginInfo.tokenType.replaceAll('-', '--');
    //@ts-ignore
    return createAuthenticator(loginInfo, cacheKey, saveTokenCallback, getKeyImplicit);
}


module.exports = {
    client,
    authorization,
    implicit
}