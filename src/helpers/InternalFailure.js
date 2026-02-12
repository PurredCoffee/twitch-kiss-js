function error(...params) {
    const oldTrace = Error.prepareStackTrace;
    Error.prepareStackTrace = (error, structuredStackTrace) => {
        return structuredStackTrace[1];
    }
    const err = {};
    Error.captureStackTrace(err);
    console.error("internal failure at " + err.stack + '\nplease open an issue!\n', ...params);
    Error.prepareStackTrace = oldTrace;
}

module.exports = error;