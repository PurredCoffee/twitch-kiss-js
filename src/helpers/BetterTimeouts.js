//@ts-check

const MAX_INT = 2 ** 30; // specifically much less than 2 ** 31 - 1 to give leniency
const MAX_32INT = 2 ** 31 - 1;

/**
 * 
 * @param {Timeout} timeout 
 */
function updateTimeout(timeout) {
    const time = new Date().getTime();
    if(timeout.finalTime - time <= MAX_32INT) {
        const newTimeout = setTimeout(timeout.callback, timeout.finalTime - new Date().getTime(), ...timeout.args);
        if(!(timeout.currentTimeout?.hasRef() ?? true)) {
            newTimeout.unref();
        }
        timeout.currentTimeout = newTimeout;
    } else {
        const newTimeout = setTimeout(updateTimeout, MAX_INT, timeout);
        if(!(timeout.currentTimeout?.hasRef() ?? true)) {
            newTimeout.unref();
        }
        timeout.currentTimeout = newTimeout;
    }
}

/**
 * 
 * @param {Interval} interval 
 */
function updateInterval(interval) {
    const time = new Date().getTime();
    if(interval.finalTime - time <= MAX_32INT) {
        const newTimeout = setTimeout(() => {
            interval.callback(...interval.args);
            interval.finalTime += interval.milliseconds;
            updateInterval(interval);
        }, interval.finalTime - new Date().getTime());
        if(!(interval.currentTimeout?.hasRef() ?? true)) {
            newTimeout.unref();
        }
        interval.currentTimeout = newTimeout;
    } else {
        const newTimeout = setTimeout(updateTimeout, MAX_INT, interval);
        if(!(interval.currentTimeout?.hasRef() ?? true)) {
            newTimeout.unref();
        }
        interval.currentTimeout = newTimeout;
    }
}

class Timeout {
    constructor(callback, milliseconds, ...args) {
        this.callback = callback;
        this.milliseconds = milliseconds;
        this.args = args;
        this.finalTime = new Date().getTime() + this.milliseconds;
        /**
         * @type {NodeJS.Timeout}
         */
        this.currentTimeout = null;
        updateTimeout(this);
    }
    close() {
        this.currentTimeout?.close();
    }
    refresh() {
        this.currentTimeout.close();
        this.finalTime = new Date().getTime() + this.milliseconds;
        updateTimeout(this);
    }
    hasRef() {
        return this.currentTimeout.hasRef();
    }
    ref() {
        return this.currentTimeout.ref();
    }
    unref() {
        return this.currentTimeout.unref();
    }
}

class Interval {
    constructor(callback, milliseconds, ...args) {
        this.callback = callback;
        this.milliseconds = milliseconds;
        this.args = args;
        this.finalTime = new Date().getTime() + this.milliseconds;
        /**
         * @type {NodeJS.Timeout}
         */
        this.currentTimeout = null;
        updateInterval(this);
    }
    close() {
        this.currentTimeout?.close();
    }
    refresh() {
        this.currentTimeout.close();
        this.finalTime = new Date().getTime() + this.milliseconds;
        updateInterval(this);
    }
    hasRef() {
        return this.currentTimeout.hasRef();
    }
    ref() {
        return this.currentTimeout.ref();
    }
    unref() {
        return this.currentTimeout.unref();
    }
}

module.exports = {
    setTimeout(callback, milliseconds, ...args) {
        if(typeof callback !== 'function') throw TypeError('callback is not a function');
        return new Interval(callback, milliseconds, ...args);
    },
    clearTimeout(timeout) {
        timeout?.close();
    },
    setInterval(callback, milliseconds, ...args) {
        if(typeof callback !== 'function') throw TypeError('callback is not a function');
        return new Interval(callback, milliseconds, ...args);
    },
    clearInterval(interval) {
        interval?.close();
    }
}