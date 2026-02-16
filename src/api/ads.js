//@ts-check

const mkr = require('../helpers/makeReadonly.js');
const {isType} = require('kiss-typecheck');
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
        if(!isType('number', length)) return Promise.reject(new TypeError('length is not a number!'));
        return api.startCommercial(twitchBot.userID ?? "", length).then(v => mkr(() => {if(v.data[0]) return {
            /**
             * The length of the commercial you requested. If you request a commercial that’s longer than 180 seconds, the API uses 180 seconds.
             */
            length: v.data[0].length,
            /**
             * A message that indicates whether Twitch was able to serve an ad.
             */
            message: v.data[0].message,
            /**
             * The number of seconds you must wait before running another commercial.
             */
            retryAfter: v.data[0].retryAfter,
            /**
             * The raw data from twitch, can be subject to jank!
             */
            raw: v
        }; throw 1}));
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
        return api.getAdSchedule(twitchBot.userID ?? "").then(v => mkr(() => {if(v.data[0]) return {
            /**
             * The length in seconds of the scheduled upcoming ad break.
             */
            duration: v.data[0].duration,
            /**
             * The Date/Time of the broadcaster’s last scheduled ad. Empty if the channel has no ad scheduled or is not live.
             */
            lastAdAt: (v.data[0].lastAdAt)?new Date(v.data[0].lastAdAt):null,
            /**
             * The Date/Time of the broadcaster’s next scheduled ad. Empty if the channel has no ad scheduled or is not live.
             */
            nextAdAt: (v.data[0].nextAdAt)?new Date(v.data[0].nextAdAt):null,
            /**
             * The amount of pre-roll free time remaining for the channel in seconds. Returns 0 if they are currently not pre-roll free.
             */
            prerollFreeTime: v.data[0].prerollFreeTime,
            /**
             * The number of snoozes available for the broadcaster.
             */
            snoozeCount: v.data[0].snoozeCount,
            /**
             * The Date/Time when the broadcaster will gain an additional snooze,
             */
            snoozeRefreshAt: v.data[0].snoozeRefreshAt,
            /**
             * The raw data from twitch, can be subject to jank!
             */
            raw: v
        }; throw 1}));
    },
    snoozeNextAd() {
        return api.snoozeNextAd(twitchBot.userID ?? "").then(v => mkr(() => {if(v.data[0]) return {
            /**
             * The Date/Time of the broadcaster’s next scheduled ad.
             */
            nextAdAt: new Date(v.data[0].nextAdAt),
            /**
             * The number of snoozes available for the broadcaster.
             */
            snoozeCount: v.data[0].snoozeCount,
            /**
             * The Date/Time timestamp when the broadcaster will gain an additional snooze
             */
            snoozeRefreshAt: new Date(v.data[0].snoozeRefreshAt)
        }; throw 1}));
    }
})