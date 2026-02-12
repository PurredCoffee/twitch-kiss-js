//@ts-check

/**
 * 
 * @param {import('../TwitchBot').TwitchBot} twitchBot 
 * @param {ReturnType<import('./api')>["Clips"]} api
 */
module.exports = (twitchBot, api) => ({
    createClip() {
        return api.createClip();
    },
    createClipFromVOD() {
        return api.createClipFromVOD();
    },
    getClips() {
        return api.getClips();
    },
    getClipsDownload() {
        return api.getClipsDownload();
    }
})