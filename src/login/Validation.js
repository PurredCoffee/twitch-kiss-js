//@ts-check

/**
 * @typedef {{login: string?, userID: string?, scopes: import('../TwitchScopes').TwitchScope[]?, expiry: number}} TokenInfo
 */
/**
 * @typedef {{readonly tokenInfo: TokenInfo, kill(): void, reverify(): Promise<TokenInfo?>, setToken(newToken: string): Promise<TokenInfo?>}} Validator
 */

/**
 * @type {typeof fetch}
 */
const fetchRetried = async (input, init) => {
    try {
        return await fetch(input, init);
    } catch(e) {
        return await fetchRetried(input, init);
    }
}
/**
 * Spec: https://dev.twitch.tv/docs/authentication/validate-tokens/
 */
const VERIFYPERIOD = 60 *  60 * 1000;

/**
 * 
 * @param {string} accessToken
 * @throws {Error} 
 * @returns {Promise<TokenInfo>}
 */
async function validateToken(accessToken) {
    const validationInfo = await fetchRetried('https://id.twitch.tv/oauth2/validate', {headers: {'Authorization': 'OAuth ' + accessToken}});
    if(validationInfo.status !== 200) {
        throw Error("Access Token invalidated!");
    }
    const {login, user_id: userID, scopes, expires_in: expiry} = await validationInfo.json();
    return {login: login ?? null, scopes, userID: userID ?? null, expiry};
};

/**
 * 
 * @param {string} accessToken accessToken to verify
 * @param {(error: Error?, tokenInfo: TokenInfo?) => void} callback callback that will be called hourly whenever the token is automatically reverified
 * @returns {Promise<Validator>}
 */
async function autoValidate(accessToken, callback) {
    const tokenInfo = await validateToken(accessToken);
    async function verify() {
        let x;
        try {
            x = await validateToken(accessToken);
        } catch(e) {
            if(!(e instanceof Error)) {
                require('../helpers/InternalFailure')('unknown error', e);
                return null;
            }
            callback(e, null);
            return null;
        }
        tokenInfo.expiry = x.expiry;
        tokenInfo.login = x.login;
        tokenInfo.scopes = x.scopes;
        tokenInfo.userID = x.userID;
        callback(null, x);
        return x;
    }
    let verificationLoop = setInterval(verify, VERIFYPERIOD);
    /**
     * @type {Validator}
     */
    const returnObj = {
        tokenInfo,
        kill() {
            clearInterval(verificationLoop);
        },
        async reverify() {
            clearInterval(verificationLoop);
            verificationLoop = setInterval(verify, VERIFYPERIOD);
            return await verify();
        },
        async setToken(newToken) {
            accessToken = newToken;
            clearInterval(verificationLoop);
            verificationLoop = setInterval(verify, VERIFYPERIOD);
            return await verify();
        }
    }
    return returnObj;
}

module.exports = {
    autoValidate,
    validateToken
}