//@ts-check

/**
 * 
 * @param {import('../TwitchBot').TwitchBot} twitchBot 
 * @param {ReturnType<import('./api.js')>["Ads"]} api
 */
module.exports = (twitchBot, api) => ({
    /**
     * Starts a commercial on the specified channel. 
     * 
     * [Learn More](https://dev.twitch.tv/docs/api/reference/#start-commercial)
     * 
     * ---
     * NOTE: Only partners and affiliates may run commercials and they must be streaming live at the time.
     * 
     * ---
     * Example Response:
     * ```json
     * {
     *   "data": [
     *     {
     *       "length" : 60,
     *       "message" : "",
     *       "retry_after" : 480
     *     }
     *   ]
     * }
     * ```
     * 
     * ---
     * @param {number} length The length of the commercial to run, in seconds. Twitch tries to serve a commercial that’s the requested length, but it may be shorter or longer. The maximum length you should request is 180 seconds.
     * @returns 
     */
    startCommercial(length) {
        if(typeof length != 'number' || length > 180) throw Promise.reject(TypeError('length is not a number or > 180!'));
        return api.startCommercial(twitchBot.userID ?? "", length);
    },
    /**
     * Returns ad schedule related information.
     * 
     * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-ad-schedule)
     *
     * ---
     * This endpoint returns ad schedule related information, including snooze, when the last ad was run, when the next ad is scheduled, and if the channel is currently in pre-roll free time. Note that a new ad cannot be run until 8 minutes after running a previous ad.
     *
     * ---
     * Example Response:
     * ```json
     * {
     *  "data": [
     *    {
     *      "next_ad_at" : "2023-08-01T23:08:18+00:00",
     *      "last_ad_at" : "2023-08-01T23:08:18+00:00",
     *      "duration" : "60",
     *      "preroll_free_time" : "90",
     *      "snooze_count" : "1",
     *      "snooze_refresh_at" : "2023-08-01T23:08:18+00:00",
     *    },
     *  ],
     * }
     * ```
     */
    getAdSchedule() {
        return api.getAdSchedule(twitchBot.userID ?? "");
    },
    snoozeNextAd() {
        return api.snoozeNextAd(twitchBot.userID ?? "");
    }
})