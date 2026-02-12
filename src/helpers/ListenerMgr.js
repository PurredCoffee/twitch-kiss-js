//@ts-check

/**
 * @import {UUID} from './UUIDs'
 */

const {getID} = require('./UUIDs');

/**
 * @typedef {(sublistener: sublistener, listener: listener<Function>, on: boolean, ...args: any) => void} metaFunc
 */
/**
 * @typedef {{
 *  functions: Map<UUID, listener<Function>>,
 *  metafunctions: Map<UUID, listener<metaFunc>>,
 *  sublisteners: Map<any, sublistener>,
 *  parent: sublistener?,
 *  name: any,
 *  on<T extends Function>(callback: T): listener<T>,
 *  off(listener: listener<Function> | UUID): boolean,
 *  onChange(callback: metaFunc): listener<metaFunc>,
 *  offChange(listener: listener<metaFunc> | UUID): boolean,
 * }} sublistener
 */

/**
 * @typedef {{
 *  id: UUID,
 *  callback: T,
 *  on(): boolean,
 *  off(): boolean,
 *  enable(): boolean,
 *  disable(): boolean,
 *  subscribe(): boolean,
 *  unsubscribe(): boolean
 * }} listener
 * @template {Function} T
 */


/**
 * 
 * @param {[T]} keys
 * @template {string} T 
 */
function createListenable(keys) {

    /**
     * @type {Map<T | 'all', sublistener>}
     */
    const listeners = new Map();
    /**
     * @type {Map<UUID, sublistener>}
     */
    const sublistenerFromListenerID = new Map();

    const finalization = new FinalizationRegistry(value => { sublistenerFromListenerID.delete(value); });

    /**
     * 
     * @param {() => boolean} onCbk
     * @param {() => boolean} offCbk
     * @param {T} callback 
     * @returns {listener<T>}
     * @template {Function} T
     */
    function registerListener(onCbk, offCbk, callback) {
        const id = getID();
        /**
         * @type {listener<T>}
         */
        const listener = {
            id: id,
            get callback() {return callback},
            set callback(newC) {
                const wasOn = listener.off();
                finalization.unregister(callback);
                newC = callback;
                finalization.register(callback, id);
                if(wasOn) listener.on();
            },
            on: onCbk,
            off: offCbk,
            enable: onCbk,
            disable: offCbk,
            subscribe: onCbk,
            unsubscribe: offCbk,
        };
        finalization.register(callback, id);
        return listener;
    }
    /**
     * 
     * @param {any} name 
     * @param {sublistener | Map<string, sublistener>} sublistener 
     */
    function registerSubListener(name, sublistener) {
        /**
         * @type {Map<string, sublistener>}
         */
        //@ts-ignore
        const slMap = sublistener?.sublisteners ?? sublistener;
        //@ts-ignore
        sublistener = (sublistener?.subListeners) ?? null;
        if (!slMap.has(name)) {
            /**
             * 
             * @param {sublistener} sl 
             * @param {any[]} path
             * @param {sublistener} originalSl
             * @param {listener<Function>} listener
             * @param {boolean} on
             */
            function callParents(originalSl, on, listener, sl = originalSl, path = []) {
                if(sl.parent) callParents(originalSl, on, listener, sl.parent, path.concat([sl.name]));
                sl.metafunctions.forEach(func => {
                    func.callback(originalSl, listener, on, ...path)
                });
            }
            /**
             * @type {sublistener}
             */
            const self = {
                functions: new Map(),
                sublisteners: new Map(),
                metafunctions: new Map(),
                name: name,
                //@ts-ignore
                parent: sublistener,
                on(callback) {
                    /**
                     * @type {listener<typeof callback>}
                     */
                    const listener = registerListener(
                        () => {
                            if(self.functions.has(listener.id)) return false;
                            callParents(self, true, listener);
                            self.functions.set(listener.id, listener);
                            return true
                        },
                        () => {
                            callParents(self, false, listener);
                            return self.functions.delete(listener.id);
                        },
                        callback
                    );
                    sublistenerFromListenerID.set(listener.id, self);
                    listener.on();
                    return listener;
                },
                off(listener) {
                    if (typeof listener !== 'string') {
                        listener = listener.id;
                    }
                    return self.functions.delete(listener);
                },
                onChange(callback) {
                    /**
                     * @type {listener<metaFunc>}
                     */
                    const listener = registerListener(
                        () => {
                            if(self.functions.has(listener.id)) return false;
                            self.functions.set(listener.id, listener);
                            finalization.register(listener.callback, listener.id);
                            return true
                        },
                        () => {
                            finalization.unregister(listener.callback);
                            return self.functions.delete(listener.id);
                        },
                        callback
                    );
                    sublistenerFromListenerID.set(listener.id, self);
                    listener.on();
                    return listener;
                },
                offChange(listener) {
                    if (typeof listener !== 'string') {
                        listener = listener.id;
                    }
                    return self.metafunctions.delete(listener);
                }
            };
            slMap.set(name, self);
        }
        return slMap.get(name) ?? (() => {throw Error('subListener doesnt exist?')})();
    }

    keys.forEach(key => {
        registerSubListener(key, listeners);
    });
    registerSubListener('all', listeners);

    const listenable = {
        /**
         * 
         * @param {T | 'all'} eventName 
         * @param  {...any} data 
         */
        callEvent(eventName, ...data) {
            let listener = listeners.get(eventName);
            if (!listener) throw new Error('eventName does not exist in listener');
            data = [...data];
            /**
             * @type {({key: UUID, ret: any} | {key: UUID, err: any})[]}
             */
            const returnVals = [];

            while(data.length) {
                listener.functions.forEach((func, key) => {
                    try {
                        returnVals.push({key, ret: func.callback(data)});
                    } catch(e) {
                        returnVals.push({key, err: e});
                    }
                })
                listener = listener.sublisteners.get(data.shift());
                if(!listener) break;
            }

            return returnVals;
        },
        /**
         * 
         * @param {T | 'all'} eventName 
         * @param  {A} callback 
         * @param  {...any} specifiers 
         * @returns {listener<A>}
         * @template {Function} A
         */
        on(eventName, callback, ...specifiers) {
            let listener = listeners.get(eventName);
            if (!listener) {
                throw new Error('eventName does not exist in listener');
            }
            specifiers.forEach(s => {
                //@ts-ignore
                listener = registerSubListener(s, listener);
            });
            const l = listener.on(callback);
            return l;
        },
        /**
         * 
         * @param {listener<Function> | UUID} listener
         */
        off(listener) {
            if (typeof listener !== 'string') {
                listener = listener.id;
            }
            const sublistener = sublistenerFromListenerID.get(listener);
            return sublistener?.off(listener) ?? false;
        },
        /**
         * 
         * @param {T | 'all'} eventName 
         * @param {metaFunc} callback
         * @param {...any} specifiers
         * @returns 
         */
        onNew(eventName, callback, ...specifiers) {
            let listener = listeners.get(eventName);
            if (!listener) throw new Error('eventName does not exist in listener');
            specifiers.forEach(s => {
                //@ts-ignore
                listener = registerSubListener(s, listener);
            });
            const l = listener.onChange(callback);
            return l;
        },
        /**
         * 
         * @param {listener<metaFunc> | UUID} listener
         */
        onOff(listener) {
            if (typeof listener !== 'string') {
                listener = listener.id;
            }
            const sublistener = sublistenerFromListenerID.get(listener);
            return sublistener?.offChange(listener) ?? false;
        }
    }
    return listenable;
}

module.exports = {
    createListenable
}