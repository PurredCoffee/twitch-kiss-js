//@ts-check

/**
 * 
 * @param {import('../TwitchBot').TwitchBot} twitchBot 
 * @param {ReturnType<import('./api')>["Predictions"]} api
 */
module.exports = (twitchBot, api) => ({
    getPredictions() {
        return api.getPredictions();
    },
    createPrediction() {
        return api.createPrediction();
    },
    endPrediction() {
        return api.endPrediction();
    }
})