//@ts-check

const rfc = require('../helpers/rfc3339');
/**
 * 
 * @param {import('../TwitchBot').TwitchBot} twitchBot 
 * @param {ReturnType<import('./api')>["Bits"]} api
 */
module.exports = (twitchBot, api) => ({
    /**
     * Gets the Bits leaderboard for the authenticated broadcaster.
     * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-bits-leaderboard)
     *
     * ---
     * Example Response:
     * ```json
     * {
     *   "data": [
     *     {
     *       "user_id": "158010205",
     *       "user_login": "tundracowboy",
     *       "user_name": "TundraCowboy",
     *       "rank": 1,
     *       "score": 12543
     *     },
     *     {
     *       "user_id": "7168163",
     *       "user_login": "topramens",
     *       "user_name": "Topramens",
     *       "rank": 2,
     *       "score": 6900
     *     }
     *   ],
     *   "date_range": {
     *     "started_at": "2018-02-05T08:00:00Z",
     *     "ended_at": "2018-02-12T08:00:00Z"
     *   },
     *   "total": 2
     * }
     * ```
     * --- 
     * @param {number?} count The number of results to return. The minimum count is 1 and the maximum is 100. The default is 10.
     * @param {"day"|"week"|"month"|"year"|"all"?} period The time period over which data is aggregated (uses the PST time zone). Possible values are:
     *
     * - day — A day spans from 00:00:00 on the day specified in started_at and runs through 00:00:00 of the next day.
     *
     * - week — A week spans from 00:00:00 on the Monday of the week specified in started_at and runs through 00:00:00 of the next Monday.
     *
     * - month — A month spans from 00:00:00 on the first day of the month specified in started_at and runs through 00:00:00 of the first day of the next month.
     *
     * - year — A year spans from 00:00:00 on the first day of the year specified in started_at and runs through 00:00:00 of the first day of the next year.
     *
     * - all — Default. The lifetime of the broadcaster's channel.
     * @param {Date?} started The start date. Specify this parameter only if you specify the period query parameter. The start date is ignored if period is all. Note that the date is converted to PST before being used, so if you set the start time to `2022-01-01T00:00:00.0Z` and period to month, the actual reporting period is December 2021, not January 2022. If you want the reporting period to be January 2022, you must set the start time to `2022-01-01T08:00:00.0Z` or `2022-01-01T00:00:00.0-08:00`.If your start date uses the ‘+’ offset operator (for example, `2022-01-01T00:00:00.0+05:00`), you must URL encode the start date.
     * @param {string?} userId An ID that identifies a user that cheered bits in the channel. If count is greater than 1, the response may include users ranked above and below the specified user. To get the leaderboard’s top leaders, don’t specify a user ID.
     */
    getBitsLeaderboard(count=10, period='all', started=null, userId=null) {
        if(count == null) count=10;
        if(typeof count != 'number' || count <= 0 || count > 100) return Promise.reject(TypeError('first is not a number or 100 < first <= 0'));
        if(started != null) {
            if(!period) return Promise.reject(TypeError('started is not a Date!'));
            if(!(started instanceof Date)) return Promise.reject(TypeError('started is not a Date!'));
            started.setHours(8, 0, 0, 0);
        }
        if(userId != null && typeof userId != 'string') return Promise.reject(TypeError('userId is not a string'));
        return api.getBitsLeaderboard(count, period, started?rfc(started):null, userId);
    },
    /**
     * Gets a list of Cheermotes that users can use to cheer Bits in any Bits-enabled channel’s chat room. Cheermotes are animated emotes that viewers can assign Bits to.
     *
     * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-cheermotes)
     *
     * ---
     * Example Response:
     * ```json
     * {
     *   "data": [
     *     {
     *       "prefix": "Cheer",
     *       "tiers": [
     *         {
     *           "min_bits": 1,
     *           "id": "1",
     *           "color": "#979797",
     *           "images": {
     *             "dark": {
     *               "animated": {
     *                 "1": "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/dark/animated/1/1.gif",
     *                 "1.5": "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/dark/animated/1/1.5.gif",
     *                 "2": "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/dark/animated/1/2.gif",
     *                 "3": "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/dark/animated/1/3.gif",
     *                 "4": "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/dark/animated/1/4.gif"
     *               },
     *               "static": {
     *                 "1": "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/dark/static/1/1.png",
     *                 "1.5": "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/dark/static/1/1.5.png",
     *                 "2": "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/dark/static/1/2.png",
     *                 "3": "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/dark/static/1/3.png",
     *                 "4": "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/dark/static/1/4.png"
     *               }
     *             },
     *             "light": {
     *               "animated": {
     *                 "1": "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/light/animated/1/1.gif",
     *                 "1.5": "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/light/animated/1/1.5.gif",
     *                 "2": "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/light/animated/1/2.gif",
     *                 "3": "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/light/animated/1/3.gif",
     *                 "4": "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/light/animated/1/4.gif"
     *               },
     *               "static": {
     *                 "1": "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/light/static/1/1.png",
     *                 "1.5": "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/light/static/1/1.5.png",
     *                 "2": "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/light/static/1/2.png",
     *                 "3": "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/light/static/1/3.png",
     *                 "4": "https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/light/static/1/4.png"
     *               }
     *             }
     *           },
     *           "can_cheer": true,
     *           "show_in_bits_card": true
     *         }
     *         ...
     *       ],
     *       "type": "global_first_party",
     *       "order": 1,
     *       "last_updated": "2018-05-22T00:06:04Z",
     *       "is_charitable": false
     *     },
     *     ...
     *   ]
     * }
     * ```
     * ---
     * @param {string?} broadcasterId The ID of the broadcaster whose custom Cheermotes you want to get. Specify the broadcaster’s ID if you want to include the broadcaster’s Cheermotes in the response (not all broadcasters upload Cheermotes). If not specified, the response contains only global Cheermotes. If the broadcaster uploaded Cheermotes, the type field in the response is set to channel_custom.
     */
    getCheermotes(broadcasterId) {
        if(broadcasterId && typeof broadcasterId != 'string') return Promise.reject(TypeError('broadcasterId is not a string'));
        return api.getCheermotes(broadcasterId);
    }
})