//@ts-check

const Scopes = require('./TwitchScopes');
const connectors = require('../login/ConnectionMethods');
const internalSym = require('../helpers/InternalSym');
const TwitchScopes = require('./TwitchScopes');

class TwitchBot {
    constructor(clientID, config) {
        this.clientID = clientID;
        Object.assign(this.config, config);
    }

    /**
     * @type {string?}
     */
    userID = null;
    /**
     * @type {string?}
     */
    login = null;
    /**
     * @type {string?}
     */
    accessToken = null;
    /**
     * @type {string?}
     */
    refreshToken = null;
    /**
     * @type {string?}
     */
    tokenType = null;
    /**
     * @type {number?}
     */
    expiry = null;
    /**
     * @type {import('./TwitchScopes').TwitchScope[]?}
     */
    scopes = null;
    connected = false;
    config = {
        retryTimeout: 5000
    };
    [internalSym] = {
        /**
         * @type {{[name:string]: Map<string, {func: }>}}
         */
        listeners: {},
        self: this,
        refreshTimeout: null,
        validationTimeout: null,
        callListeners(name, identifiers, ...args) {
            //TODO find correct listener from identifiers
            Array.from(this.listeners[name].values()).forEach(v => {
                try {
                    v.func(...args);
                } catch(e) {
                    console.error(e);
                }
            });
        },
        async updateTokenInfo(accessToken, refreshToken) {
            this.self.accessToken = accessToken;
            this.self.refreshToken = refreshToken;
            this.callListeners('onTokenUpdate', [], accessToken, refreshToken);
            clearInterval(this.validationTimeout);
            this.validationTimeout = setInterval(this.self.validate, 60 * 60 * 1000);
            const data = await this.self.validate();
            this.self.scopes = data.scopes;
            this.self.expiry = data.expiry;
            this.self.login = data.login;
            this.self.userID = data.userID;
            return data;
        },
        throwError(error) {
            this.callListeners('onInternalError', [], error);
        },
        disconnected(reason) {
            this.self.connected = false;
            this.callListeners('onDisconnect', [], reason);
        },
        connected() {
            this.self.connected = true;
            this.callListeners('onConnect', []);
        }
    };

    addListener(name, cb, ...args) {
        const listener = this[internalSym].listeners[name] = this[internalSym].listeners[name] ?? new Map();
        //TODO find correct listener from identifiers
        function on() {
            listener.set(key, lobj);
        }
        function off() {
            listener.delete(key);
        }
        const key = Bun.randomUUIDv7('hex');
        const lobj = {
            key,
            func: cb,
            on,
            off,
            start: on,
            stop: off,
            open: on,
            close: off,
            connect: on,
            disconnect: off,
        }
        on();
        return lobj;
    };

    events = {
        [internalSym]: {
            self: this, 
        },
        internal: {
            [internalSym]: {
                self: this, 
            },
            onTokenUpdate(callback) {
                return this[internalSym].self.addListener('onTokenUpdate', callback);
            },
            onError(callback) {
                return this[internalSym].self.addListener('onError', callback);
            },
            onDisconnect(callback) {
                return this[internalSym].self.addListener('onDisconnect', callback);
            },
            onConnect(callback) {
                return this[internalSym].self.addListener('onConnect', callback);
            }
        }
    };

    /**
     * Use this method to authentiate a User using the {@link https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/#implicit-grant-flow implicit grant flow}
     * @overload
     * @param {'Implicit'} type
     * @param {string} accessToken
     * @returns {Promise<void>}
     */
    /**
     * {@link https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/#authorization-code-grant-flow}
     * @overload
     * @param {'Authorization'} type
     * @param {string} clientSecret
     * @param {string} accessCode
     * @returns {Promise<void>}
     */
    /**
     * @overload
     * @param {'Client'} type 
     * @param {string} clientSecret
     * @returns {Promise<void>}
     */
    /**
     * @overload
     * @param {'Device'} type 
     * @param {FlatArray<Scopes[keyof Scopes], 1>[]} scopes The APIs that you’re calling identify the scopes you must list. (See https://dev.twitch.tv/docs/authentication/scopes/)
     * @returns {Promise<void>}
     */
    /**
     * @param {'Device'|'Implicit'|'Authorization'|'Client'} type
     */
    async connect(type, ...tokenData) {
        if(this.connected) return;
        switch(type) {
            case 'Authorization': break;
            case 'Client': await connectors.connect.Client(this, ...tokenData); break;
            case 'Device': break;
            case 'Implicit': await connectors.connect.Implicit(this, ...tokenData); break;
        }
        this[internalSym].connected();
    };

    disconnect(reason) {
        this[internalSym].refreshTimeout?.close();
        this[internalSym].validationTimeout?.close();
        this[internalSym].disconnected(reason ?? 'disconnected by user');
    };

    /**
     * 
     * @returns {{login: string, userID: string, scopes: string[], expiry: number}}
     */
    async validate() {
        try {
            const validationInfo = await fetch('https://id.twitch.tv/oauth2/validate', {headers: {'Authorization': 'OAuth ' + this.accessToken}});
            if(validationInfo.status !== 200) {
                this.throwError(Error("Access Token invalidated!"));
                this.disconnect("Access Token invalidated!");
            }
            const {login, user_id: userID, scopes, expires_in: expiry} = await validationInfo.json();
            return {login, scopes, userID, expiry};
        } catch(e) {
            return await new Promise((resolve) => setTimeout(async () => {resolve(await validate(twitchBot))}, this.config.retryTimeout));
        }
    };

    /**
     * Returns the URL to display to the user that will let them generate an {@link https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/#implicit-grant-flow Implicit Grant OAuth2 Token}. This Token will be sent to redirectUri and accessible as `document.location.hash` by the website.
     * @param {string} clientID Your app’s registered client ID. (Create it under https://dev.twitch.tv/console)
     * @param {string} redirectUri Your app’s registered redirect URI. (Set it under https://dev.twitch.tv/console/apps/[YourApplicationID])
     * @param {FlatArray<Scopes[keyof Scopes], 1>[]} scopes The APIs that you’re calling identify the scopes you must list. Defaults to all. (See https://dev.twitch.tv/docs/authentication/scopes/)
     * @param {boolean} forceVerify Set to true to force the user to re-authorize your app’s access to their resources. The default is false.
     * @param {string?} state Although optional, you are strongly encouraged to pass a state string to help prevent Cross-Site Request Forgery (CSRF) attacks.
     * The server returns this string to you in your redirect URI (see the state parameter in the fragment portion of the URI).
     * If this string doesn’t match the state string that you passed, ignore the response. The state string should be randomly generated and unique for each OAuth request.
     * @returns {string} the URL to give to the user.
     */
    static getImplicitGrantUrl(clientID, redirectUri, scopes=TwitchScopes.All, forceVerify=null, state=null) {
        return `https://id.twitch.tv/oauth2/authorize?client_id=${clientID}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes.join(' '))}${forceVerify == null?"":`&force_verify=${forceVerify}`}${state == null?"":`&state=${encodeURIComponent(state)}`}`;
    };
    /**
     * Returns the URL to display to the user that will let them generate an {@link https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/#authorization-code-grant-flow Authorization OAuth2 Code}. This code will be sent to redirectUri with the query parameter `code`.
     * {@link https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/#authorization-code-grant-flow}
     * @param {string} clientID Your app’s registered client ID. (Create it under https://dev.twitch.tv/console)
     * @param {string} redirectUri Your app’s registered redirect URI. (Set it under https://dev.twitch.tv/console/apps/[YourApplicationID])
     * @param {import('./TwitchScopes').TwitchScope[]?} scopes The APIs that you’re calling identify the scopes you must list. Defaults to all. (See https://dev.twitch.tv/docs/authentication/scopes/)
     * @param {bool?} forceVerify Set to true to force the user to re-authorize your app’s access to their resources. The default is false.
     * @param {string?} state Although optional, you are strongly encouraged to pass a state string to help prevent Cross-Site Request Forgery (CSRF) attacks.
     * The server returns this string to you in your redirect URI (see the state parameter in the fragment portion of the URI).
     * If this string doesn’t match the state string that you passed, ignore the response. The state string should be randomly generated and unique for each OAuth request.
     * @returns {string} the URL to give to the user.
     */
    static getAuthorizationCodeUrl(clientID, redirectUri, scopes=TwitchScopes.All, forceVerify=null, state=null) {
        return `https://id.twitch.tv/oauth2/authorize?client_id=${clientID}&response_type="code"&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes.join(' '))}${forceVerify == null?"":`&force_verify=${forceVerify}`}${state == null?"":`&state=${encodeURIComponent(state)}`}`;
    };

    /**
     * 
     * @param {*} clientID Your app’s registered client ID. (Create it under https://dev.twitch.tv/console)
     * @param {import('./TwitchScopes').TwitchScope[]?} scopes The APIs that you’re calling identify the scopes you must list. Defaults to all. (See https://dev.twitch.tv/docs/authentication/scopes/)
     */
    static initializeDeviceFlow(clientID, scopes=TwitchScopes.All) {
        
    };
}

module.exports = {
    TwitchBot
}