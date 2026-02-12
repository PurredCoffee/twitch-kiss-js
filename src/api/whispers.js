//@ts-check

/**
 * 
 * @param {import('../TwitchBot').TwitchBot} twitchBot 
 * @param {ReturnType<import('./api')>["Whispers"]} api
 */
module.exports = (twitchBot, api) => ({
    sendWhisper() {
        return api.sendWhisper();
    }
})