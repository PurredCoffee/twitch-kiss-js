//@ts-check

const rfc = require('../helpers/rfc3339');
/**
 * 
 * @param {import('../TwitchBot').TwitchBot} twitchBot 
 * @param {ReturnType<import('./api')>["Analytics"]} api
 */
module.exports = (twitchBot, api) => ({
    /**
     * Gets an analytics report for one or more extensions. 
     * 
     * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-extension-analytics)
     * 
     * ---
     * The response contains the URLs used to download the reports [CSV files](https://dev.twitch.tv/docs/insights)
     * 
     * ---
     * Example Response:
     * ```json
     * {
     *   "data": [
     *     {
     *       "extension_id": "efgh",
     *       "URL": "https://twitch-piper-reports.s3-us-west-2.amazonaws.com/dynamic/LoL%20ADC...",
     *       "type": "overview_v2",
     *       "date_range": {
     *          "started_at": "2018-03-01T00:00:00Z",
     *          "ended_at": "2018-06-01T00:00:00Z"
     *       }
     *     },
     *     ...
     *   ],
     *   "pagination": {"cursor": "eyJiIjpudWxsLCJhIjp7Ik9mZnNldCI6NX19"}
     * }
     * ```
     * ---
     * @param {string?} extensionId The extension's client ID. If specified, the response contains a report for the specified extension. If not specified, the response includes a report for each extension that the authenticated user owns.
     * @param {"overview_v2"?} type Defaults 'overview_v2'.
     * 
     * The type of analytics report to get.
     * @param {{started: Date, ended: Date}?} timeFrame The reporting window's start date. The start date must be on or after January 31, 2018. If you specify an earlier date, the API ignores it and uses January 31, 2018. If you don't specify a start and end date, the report includes all available data since January 31, 2018.The report contains one row of data for each day in the reporting window.
     * @param {number?} first Defaults 20.
     * 
     * The maximum number of report URLs to return per page in the response. The minimum page size is 1 URL per page and the maximum is 100 URLs per page. The default is 20. *NOTE*: While you may specify a maximum value of 100, the response will contain at most 20 URLs per page.
     */
    getExtensionAnalytics(extensionId=null, type="overview_v2", timeFrame=null, first=20) {
        if(extensionId != null && typeof extensionId != 'string') return Promise.reject(TypeError('extensionId is not a string'));
        if(type == null) type="overview_v2";
        if(!["overview_v2"].includes(type)) return Promise.reject(TypeError('type is not one of "overview_v2"'));
        if(timeFrame != null) {
            if(!timeFrame.started || !(timeFrame.started instanceof Date)) return Promise.reject(TypeError('timeframe.started is not a Date!'));
            if(!timeFrame.ended || !(timeFrame.ended instanceof Date)) return Promise.reject(TypeError('timeframe.ended is not a Date!'));
            timeFrame.ended.setHours(0, 0, 0, 0);
            timeFrame.started.setHours(0, 0, 0, 0);
        }
        if(first == null) first = 20;
        if(typeof first != 'number' || first <= 0 || first > 100) return Promise.reject(TypeError('first is not a number or 100 < first <= 0'));
        return api.getExtensionAnalytics(extensionId, type, timeFrame?rfc(timeFrame.started):null, timeFrame?rfc(timeFrame.ended):null, first, null);
    },
    /**
     * Gets an analytics report for one or more games. 
     * 
     * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-game-analytics)
     * 
     * ---
     * The response contains the URLs used to download the reports [CSV files](https://dev.twitch.tv/docs/insights)
     * 
     * ---
     * Example Response:
     * ```json
     * {
     *   "data": [
     *     {
     *       "game_id": "493057",
     *       "URL": "https://twitch-piper-reports.s3-us-west-2.amazonaws.com/games/66170/overview/15183..",
     *       "type": "overview_v2",
     *       "date_range": {
     *          "started_at": "2018-03-01T00:00:00Z",
     *          "ended_at": "2018-06-01T00:00:00Z"
     *       }
     *     },
     *     ...
     *   ],
     *   "pagination": {"cursor": "eyJiIjpudWxsLCJhIjp7Ik9mZnNldCI6NX19"}
     * }
     * ```
     * ---
     * @param {string?} gameId The game’s client ID. If specified, the response contains a report for the specified game. If not specified, the response includes a report for each of the authenticated user’s games.
     * @param {"overview_v2"?} type Defaults "overview_v2".
     * 
     * The type of analytics report to get.
     * @param {{started: Date, ended: Date}?} timeFrame The reporting window's start date. The start date must be on or after January 31, 2018. If you specify an earlier date, the API ignores it and uses January 31, 2018. If you don't specify a start and end date, the report includes all available data since January 31, 2018.The report contains one row of data for each day in the reporting window.
     * @param {number?} first Defaults 20.
     * 
     * The maximum number of report URLs to return per page in the response. The minimum page size is 1 URL per page and the maximum is 100 URLs per page. The default is 20. *NOTE*: While you may specify a maximum value of 100, the response will contain at most 20 URLs per page.
     */
    getGameAnalytics(gameId=null, type="overview_v2", timeFrame=null, first=20) {
        if(gameId && typeof gameId != 'string') return Promise.reject(TypeError('gameId is not a string'));
        if(!type) type="overview_v2";
        if(!["overview_v2"].includes(type)) return Promise.reject(TypeError('type is not one of "overview_v2"'));
        if(timeFrame) {
            if(!timeFrame.started || !(timeFrame.started instanceof Date)) return Promise.reject(TypeError('timeframe.started is not a Date!'));
            if(!timeFrame.ended || !(timeFrame.ended instanceof Date)) return Promise.reject(TypeError('timeframe.ended is not a Date!'));
            timeFrame.ended.setHours(0, 0, 0, 0);
            timeFrame.started.setHours(0, 0, 0, 0);
        }
        if(!first) first = 20;
        if(typeof first != 'number' || first <= 0 || first > 100) return Promise.reject(TypeError('first is not a number or 100 < first <= 0'));
        return api.getGameAnalytics(gameId, type, timeFrame?rfc(timeFrame.started):null, timeFrame?rfc(timeFrame.ended):null, first, null);
    }
})