//@ts-check
/**
 * @param {(url: string, scopes: string[], token: string[], params: {}, body: {}, errorCodes: {}) => Promise<any>} reqFunc
 */
module.exports = (reqFunc) => ({
    Ads: {
        /**
         * @typedef StartCommercialResponse_Data
         * @prop {number} length The length of the commercial you requested. If you request a commercial that’s longer than 180 seconds, the API uses 180 seconds.
         * @prop {string} message A message that indicates whether Twitch was able to serve an ad.
         * @prop {number} retryAfter The number of seconds you must wait before running another commercial.
         */
        /**
         * @typedef StartCommercialResponse
         * @prop {StartCommercialResponse_Data[]} data An array that contains a single object with the status of your start commercial request.
         */
        /**
         * Starts a commercial on the specified channel.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#start-commercial)
         *
         * ---
         * 
         *
         * *NOTE*: Only partners and affiliates may run commercials and they must be streaming live at the time.
         *
         * *NOTE*: Only the broadcaster may start a commercial; the broadcaster’s editors and moderators may not start commercials on behalf of the broadcaster.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `channel:edit:commercial`
         *
         * ---
         * *Examples*: 
         * 
         * This request starts a commercial.: 
         * ```
         * curl -X POST 'https://api.twitch.tv/helix/channels/commercial' \
         * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
         * -H 'Client-Id: wbmytr93xzw8zbg0p1izqyzzc5mbiz' \
         * -H 'Content-Type: application/json' \
         * --data-raw '{
         *   "broadcaster_id": "141981764",
         *   "length": 60
         * }'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
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
         * @param {string} broadcasterId The ID of the partner or affiliate broadcaster that wants to run the commercial. This ID must match the user ID found in the OAuth token.
         * @param {number} length The length of the commercial to run, in seconds. Twitch tries to serve a commercial that’s the requested length, but it may be shorter or longer. The maximum length you should request is 180 seconds.
         * @returns {Promise<StartCommercialResponse>} 
         */
        startCommercial(broadcasterId, length) {
            return reqFunc("https://api.twitch.tv/helix/channels/commercial",
                ["channel:edit:commercial"],
                ["user"],
                {},
                {broadcaster_id: broadcasterId, length: length},
                {200: "Successfully started the commercial.", 400: "- The broadcaster_id query parameter is required.\n- The length query parameter is required.\n- The ID in broadcaster_id is not valid.\n- To start a commercial, the broadcaster must be streaming live.\n- The broadcaster may not run another commercial until the cooldown period expires. The `retry_after` field in the previous start commercial response specifies the amount of time the broadcaster must wait between running commercials.", 401: "- The ID in `broadcaster_id` must match the user ID found in the request’s OAuth token.\n- The Authorization header is required and must contain a user access token.\n- The user access token must include the channel:edit:commercial scope.\n- The OAuth token is not valid.\n- The client ID specified in the Client-Id header does not match the client ID specified in the OAuth token.", 404: "- The ID in `broadcaster_id` was not found.", 429: "- The broadcaster may not run another commercial until the cooldown period expires. The `retry_after` field in the previous start commercial response specifies the amount of time the broadcaster must wait between running commercials."}
            );
        },
        /**
         * @typedef GetAdScheduleResponse_Data
         * @prop {number} snoozeCount The number of snoozes available for the broadcaster.
         * @prop {string} snoozeRefreshAt The UTC timestamp when the broadcaster will gain an additional snooze, in RFC3339 format.
         * @prop {string} nextAdAt The UTC timestamp of the broadcaster’s next scheduled ad, in RFC3339 format. Empty if the channel has no ad scheduled or is not live.
         * @prop {number} duration The length in seconds of the scheduled upcoming ad break.
         * @prop {string} lastAdAt The UTC timestamp of the broadcaster’s last ad-break, in RFC3339 format. Empty if the channel has not run an ad or is not live.
         * @prop {number} prerollFreeTime The amount of pre-roll free time remaining for the channel in seconds. Returns 0 if they are currently not pre-roll free.
         */
        /**
         * @typedef GetAdScheduleResponse
         * @prop {GetAdScheduleResponse_Data[]} data A list that contains information related to the channel’s ad schedule.
         */
        /**
         * Returns ad schedule related information.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-ad-schedule)
         *
         * ---
         * This endpoint returns ad schedule related information, including snooze, when the last ad was run, when the next ad is scheduled, and if the channel is currently in pre-roll free time. Note that a new ad cannot be run until 8 minutes after running a previous ad.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `channel:read:ads`
         *
         * ---
         * *Examples*: 
         * 
         * Snooze the next ad.: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/channels/ads?broadcaster_id=123' \
         * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
         * -H 'Client-Id: wbmytr93xzw8zbg0p1izqyzzc5mbiz'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "next_ad_at" : "2023-08-01T23:08:18+00:00",
         *       "last_ad_at" : "2023-08-01T23:08:18+00:00",
         *       "duration" : "60",
         *       "preroll_free_time" : "90",
         *       "snooze_count" : "1",
         *       "snooze_refresh_at" : "2023-08-01T23:08:18+00:00",
         *     },
         *   ],
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId Provided `broadcaster_id` must match the `user_id` in the auth token.
         * @returns {Promise<GetAdScheduleResponse>} 
         */
        getAdSchedule(broadcasterId) {
            return reqFunc("https://api.twitch.tv/helix/channels/ads",
                ["channel:read:ads"],
                ["user"],
                {broadcaster_id: broadcasterId},
                {},
                {200: "Returns the ad schedule information for the channel.", 400: "The broadcaster ID is not valid.", 500: ""}
            );
        },
        /**
         * @typedef SnoozeNextAdResponse_Data
         * @prop {number} snoozeCount The number of snoozes available for the broadcaster.
         * @prop {string} snoozeRefreshAt The UTC timestamp when the broadcaster will gain an additional snooze, in RFC3339 format.
         * @prop {string} nextAdAt The UTC timestamp of the broadcaster’s next scheduled ad, in RFC3339 format.
         */
        /**
         * @typedef SnoozeNextAdResponse
         * @prop {SnoozeNextAdResponse_Data[]} data A list that contains information about the channel’s snoozes and next upcoming ad after successfully snoozing.
         */
        /**
         * Pushes back the timestamp of the upcoming automatic mid-roll ad by 5 minutes.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#snooze-next-ad)
         *
         * ---
         * If available, pushes back the timestamp of the upcoming automatic mid-roll ad by 5 minutes. This endpoint duplicates the snooze functionality in the creator dashboard’s Ads Manager.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `channel:manage:ads`
         *
         * ---
         * *Examples*: 
         * 
         * Snooze the next ad.: 
         * ```
         * curl -X POST 'https://api.twitch.tv/helix/channels/ads/schedule/snooze?broadcaster_id=123' \
         * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
         * -H 'Client-Id: wbmytr93xzw8zbg0p1izqyzzc5mbiz'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "snooze_count" : "1",
         *       "snooze_refresh_at" : "2023-08-01T23:08:18+00:00",
         *       "next_ad_at" : "2023-08-01T23:08:18+00:00",
         *     },
         *   ],
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId Provided `broadcaster_id` must match the `user_id` in the auth token.
         * @returns {Promise<SnoozeNextAdResponse>} 
         */
        snoozeNextAd(broadcasterId) {
            return reqFunc("https://api.twitch.tv/helix/channels/ads/schedule/snooze",
                ["channel:manage:ads"],
                ["user"],
                {broadcaster_id: broadcasterId},
                {},
                {200: "User’s next ad is successfully snoozed. Their snooze_count is decremented and snooze_refresh_time and next_ad_at are both updated.", 400: "- The channel is not currently live.\n- The broadcaster ID is not valid.\n- Channel does not have an upcoming scheduled ad break.", 429: "Channel has no snoozes left.", 500: ""}
            );
        },
    },
    Analytics: {
        /**
         * @typedef GetExtensionAnalyticsResponse_Data_Date_range
         * @prop {string} startedAt The reporting window’s start date.
         * @prop {string} endedAt The reporting window’s end date.
         */
        /**
         * @typedef GetExtensionAnalyticsResponse_Data
         * @prop {string} extensionId An ID that identifies the extension that the report was generated for.
         * @prop {string} uRL The URL that you use to download the report. The URL is valid for 5 minutes.
         * @prop {string} type The type of report.
         * @prop {GetExtensionAnalyticsResponse_Data_Date_range} dateRange The reporting window’s start and end dates, in RFC3339 format.
         */
        /**
         * @typedef GetExtensionAnalyticsResponse_Pagination
         * @prop {string} cursor The cursor used to get the next page of results. Use the cursor to set the request’s after query parameter.
         */
        /**
         * @typedef GetExtensionAnalyticsResponse
         * @prop {GetExtensionAnalyticsResponse_Data[]} data A list of reports. The reports are returned in no particular order; however, the data within each report is in ascending order by date (newest first). The report contains one row of data per day of the reporting window; the report contains rows for only those days that the extension was used. The array is empty if there are no reports.
         * @prop {GetExtensionAnalyticsResponse_Pagination} pagination Contains the information used to page through the list of results. The object is empty if there are no more pages left to page through. [Read More](https://dev.twitch.tv/docs/api/guide#pagination)
         */
        /**
         * Gets an analytics report for one or more extensions.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-extension-analytics)
         *
         * ---
         *  The response contains the URLs used to download the reports (CSV files). [Learn More](https://dev.twitch.tv/docs/insights)
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `analytics:read:extensions`
         *
         * ---
         * *Examples*: 
         * 
         * Gets the URLs for all reports for all extensions of the authenticated client. The request was issued on June 1, 2018.: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/analytics/extensions' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *    "data": [
         *       {
         *          "extension_id": "efgh",
         *          "URL": "https://twitch-piper-reports.s3-us-west-2.amazonaws.com/dynamic/LoL%20ADC...",
         *          "type": "overview_v2",
         *          "date_range": {
         *             "started_at": "2018-03-01T00:00:00Z",
         *             "ended_at": "2018-06-01T00:00:00Z"
         *          }
         *       },
         *       ...
         *    ],
         *    "pagination": {"cursor": "eyJiIjpudWxsLCJhIjp7Ik9mZnNldCI6NX19"}
         * }
         * ```
         *
         * ---
         * @param {string?} extensionId The extension's client ID. If specified, the response contains a report for the specified extension. If not specified, the response includes a report for each extension that the authenticated user owns.
         * @param {"overview_v2"?} type The type of analytics report to get. Possible values are:
         *
         * - overview_v2
         * @param {string?} startedAt The reporting window's start date, in RFC3339 format. Set the time portion to zeroes (for example, 2021-10-22T00:00:00Z).The start date must be on or after January 31, 2018. If you specify an earlier date, the API ignores it and uses January 31, 2018. If you specify a start date, you must specify an end date. If you don't specify a start and end date, the report includes all available data since January 31, 2018.The report contains one row of data for each day in the reporting window.
         * @param {string?} endedAt The reporting window's end date, in RFC3339 format. Set the time portion to zeroes (for example, 2021-10-27T00:00:00Z). The report is inclusive of the end date.Specify an end date only if you provide a start date. Because it can take up to two days for the data to be available, you must specify an end date that's earlier than today minus one to two days. If not, the API ignores your end date and uses an end date that is today minus one to two days.
         * @param {number?} first The maximum number of report URLs to return per page in the response. The minimum page size is 1 URL per page and the maximum is 100 URLs per page. The default is 20.*NOTE*: While you may specify a maximum value of 100, the response will contain at most 20 URLs per page.
         * @param {string?} after The cursor used to get the next page of results. The *Pagination* object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination)This parameter is ignored if the extension_id parameter is set.
         * @returns {Promise<GetExtensionAnalyticsResponse>} 
         */
        getExtensionAnalytics(extensionId=null, type=null, startedAt=null, endedAt=null, first=null, after=null) {
            return reqFunc("https://api.twitch.tv/helix/analytics/extensions",
                ["analytics:read:extensions"],
                ["user"],
                {extension_id: extensionId, type: type, started_at: startedAt, ended_at: endedAt, first: first, after: after},
                {},
                {200: "Successfully retrieved the broadcaster's analytics reports.", 400: "- The start and end dates are optional but if you specify one, you must specify the other.\n- The end date must be equal to or later than the start date.\n- The cursor specified in the after query parameter is not valid.\n- The resource supports only forward pagination (use the after query parameter).\n- The first query parameter is outside the allowed range of values.", 401: "- The Authorization header is required and must contain a user access token.\n- The user access token must include the analytics:read:extensions scope.\n- The OAuth token is not valid.\n- The Client-Id header is required.\n- The client ID specified in the Client-Id header does not match the client ID specified in the OAuth token.", 404: "- The extension specified in the extension_id query parameter was not found."}
            );
        },
        /**
         * @typedef GetGameAnalyticsResponse_Data_Date_range
         * @prop {string} startedAt The reporting window’s start date.
         * @prop {string} endedAt The reporting window’s end date.
         */
        /**
         * @typedef GetGameAnalyticsResponse_Data
         * @prop {string} gameId An ID that identifies the game that the report was generated for.
         * @prop {string} uRL The URL that you use to download the report. The URL is valid for 5 minutes.
         * @prop {string} type The type of report.
         * @prop {GetGameAnalyticsResponse_Data_Date_range} dateRange The reporting window’s start and end dates, in RFC3339 format.
         */
        /**
         * @typedef GetGameAnalyticsResponse_Pagination
         * @prop {string} cursor The cursor used to get the next page of results. Use the cursor to set the request’s after query parameter.
         */
        /**
         * @typedef GetGameAnalyticsResponse
         * @prop {GetGameAnalyticsResponse_Data[]} data A list of reports. The reports are returned in no particular order; however, the data within each report is in ascending order by date (newest first). The report contains one row of data per day of the reporting window; the report contains rows for only those days that the game was used. A report is available only if the game was broadcast for at least 5 hours over the reporting period. The array is empty if there are no reports.
         * @prop {GetGameAnalyticsResponse_Pagination} pagination Contains the information used to page through the list of results. The object is empty if there are no more pages left to page through. [Read More](https://dev.twitch.tv/docs/api/guide#pagination)
         */
        /**
         * Gets an analytics report for one or more games.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-game-analytics)
         *
         * ---
         *  The response contains the URLs used to download the reports (CSV files). [Learn more](https://dev.twitch.tv/docs/insights)
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `analytics:read:games`
         *
         * ---
         * *Examples*: 
         * 
         * Gets the URL for a downloadable CSV report for game ID 493057, covering the period January 1, 2018 through March 1, 2018.: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/analytics/games?game_id=493057&started_at=2018-01-01T00:00:00Z&ended_at=2018-03-01T00:00:00Z' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "game_id" : "493057",
         *       "URL" : "https://twitch-piper-reports.s3-us-west-2.amazonaws.com/games/66170/overview/15183...",
         *       "type" : "overview_v2",
         *       "date_range" : {
         *         "started_at" : "2018-01-01T00:00:00Z",
         *         "ended_at" : "2018-03-01T00:00:00Z"
         *       }
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * Gets the first 5 URLs for all reports for all games of the authenticated client. The request was issued on June 14, 2018.: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/analytics/games?first=5' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 2: 
         * ```
         * {
         *   "data": [
         *     {
         *       "game_id": "9821",
         *       "URL": "https://twitch-piper-reports.s3-us-west-2.amazonaws.com/games/9821/overview/152642...",
         *       "type" : "overview_v2",
         *       "date_range" : {
         *         "started_at" : "2018-03-13T00:00:00Z",
         *         "ended_at" : "2018-06-13T00:00:00Z"
         *       }
         *     },
         *     ...
         *   ],
         *   "pagination": {"cursor": "eyJiIjpudWxsLJxhIjoiIn0gf5"}
         * }
         * ```
         *
         * ---
         * @param {string?} gameId The game’s client ID. If specified, the response contains a report for the specified game. If not specified, the response includes a report for each of the authenticated user’s games.
         * @param {"overview_v2"?} type The type of analytics report to get. Possible values are:
         *
         * - overview_v2
         * @param {string?} startedAt The reporting window’s start date, in RFC3339 format. Set the time portion to zeroes (for example, 2021-10-22T00:00:00Z). If you specify a start date, you must specify an end date.The start date must be within one year of today’s date. If you specify an earlier date, the API ignores it and uses a date that’s one year prior to today’s date. If you don’t specify a start and end date, the report includes all available data for the last 365 days from today.The report contains one row of data for each day in the reporting window.
         * @param {string?} endedAt The reporting window’s end date, in RFC3339 format. Set the time portion to zeroes (for example, 2021-10-22T00:00:00Z). The report is inclusive of the end date.Specify an end date only if you provide a start date. Because it can take up to two days for the data to be available, you must specify an end date that’s earlier than today minus one to two days. If not, the API ignores your end date and uses an end date that is today minus one to two days.
         * @param {number?} first The maximum number of report URLs to return per page in the response. The minimum page size is 1 URL per page and the maximum is 100 URLs per page. The default is 20.*NOTE*: While you may specify a maximum value of 100, the response will contain at most 20 URLs per page.
         * @param {string?} after The cursor used to get the next page of results. The *Pagination* object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination)This parameter is ignored if game_id parameter is set.
         * @returns {Promise<GetGameAnalyticsResponse>} 
         */
        getGameAnalytics(gameId=null, type=null, startedAt=null, endedAt=null, first=null, after=null) {
            return reqFunc("https://api.twitch.tv/helix/analytics/games",
                ["analytics:read:games"],
                ["user"],
                {game_id: gameId, type: type, started_at: startedAt, ended_at: endedAt, first: first, after: after},
                {},
                {200: "Successfully retrieved the broadcaster’s analytics reports.", 400: "- The start and end dates are optional but if you specify one, you must specify the other.\n- The end date must be equal to or later than the start date.\n- The cursor specified in the after query parameter is not valid.\n- The resource supports only forward pagination (use the after query parameter).\n- The first query parameter is outside the allowed range of values.", 401: "- The Authorization header is required and must contain a user access token.\n- The user access token must include the analytics:read:games scope.\n- The OAuth token is not valid.\n- The Client-Id header is required.\n- The client ID specified in the Client-Id header does not match the client ID specified in the OAuth token.", 404: "- The game specified in the game_id query parameter was not found."}
            );
        },
    },
    Bits: {
        /**
         * @typedef GetBitsLeaderboardResponse_Data
         * @prop {string} userId An ID that identifies a user on the leaderboard.
         * @prop {string} userLogin The user’s login name.
         * @prop {string} userName The user’s display name.
         * @prop {number} rank The user’s position on the leaderboard.
         * @prop {number} score The number of Bits the user has cheered.
         */
        /**
         * @typedef GetBitsLeaderboardResponse_Date_range
         * @prop {string} startedAt The reporting window’s start date.
         * @prop {string} endedAt The reporting window’s end date.
         */
        /**
         * @typedef GetBitsLeaderboardResponse
         * @prop {GetBitsLeaderboardResponse_Data[]} data A list of leaderboard leaders. The leaders are returned in rank order by how much they’ve cheered. The array is empty if nobody has cheered bits.
         * @prop {GetBitsLeaderboardResponse_Date_range} dateRange The reporting window’s start and end dates, in RFC3339 format. The dates are calculated by using the started_at and period query parameters. If you don’t specify the started_at query parameter, the fields contain empty strings.
         * @prop {number} total The number of ranked users in `data`. This is the value in the count query parameter or the total number of entries on the leaderboard, whichever is less.
         */
        /**
         * Gets the Bits leaderboard for the authenticated broadcaster.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-bits-leaderboard)
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `bits:read`
         *
         * ---
         * *Examples*: 
         * 
         * Gets information about the authenticated broadcaster’s top two Bits leaderboard entries for the specified week.: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/bits/leaderboard?count=2&period=week&started_at=2018-02-05T08%3A00%3A00Z' \
         * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
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
         *
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
         * @param {string?} startedAt The start date, in RFC3339 format, used for determining the aggregation period. Specify this parameter only if you specify the period query parameter. The start date is ignored if period is all.Note that the date is converted to PST before being used, so if you set the start time to `2022-01-01T00:00:00.0Z` and period to month, the actual reporting period is December 2021, not January 2022. If you want the reporting period to be January 2022, you must set the start time to `2022-01-01T08:00:00.0Z` or `2022-01-01T00:00:00.0-08:00`.If your start date uses the ‘+’ offset operator (for example, `2022-01-01T00:00:00.0+05:00`), you must URL encode the start date.
         * @param {string?} userId An ID that identifies a user that cheered bits in the channel. If count is greater than 1, the response may include users ranked above and below the specified user. To get the leaderboard’s top leaders, don’t specify a user ID.
         * @returns {Promise<GetBitsLeaderboardResponse>} 
         */
        getBitsLeaderboard(count=null, period=null, startedAt=null, userId=null) {
            return reqFunc("https://api.twitch.tv/helix/bits/leaderboard",
                ["bits:read"],
                ["user"],
                {count: count, period: period, started_at: startedAt, user_id: userId},
                {},
                {200: "Successfully retrieved the broadcaster’s Bits leaderboard.", 400: "- The time period specified in the period query parameter is not valid.\n- The started_at query parameter is required if period is not set to all.\n- The value in the count query parameter is outside the range of allowed values.", 401: "- The Authorization header is required and must specify a user access token.\n- The user access token must include the the bits:read scope.\n- The access token is not valid.\n- The ID in the Client-Id header must match the client ID in the access token.", 403: ""}
            );
        },
        /**
         * @typedef GetCheermotesResponse_Data_Tiers_Images_Dark
         * @prop {Map<string,string>} animated Each format of sizes: 1, 1.5, 2, 3, and 4. The value of each size contains the URL to the image.
         * @prop {Map<string,string>} static Each format of sizes: 1, 1.5, 2, 3, and 4. The value of each size contains the URL to the image.
         */
        /**
         * @typedef GetCheermotesResponse_Data_Tiers_Images_Light
         * @prop {Map<string,string>} animated Each format of sizes: 1, 1.5, 2, 3, and 4. The value of each size contains the URL to the image.
         * @prop {Map<string,string>} static Each format of sizes: 1, 1.5, 2, 3, and 4. The value of each size contains the URL to the image.
         */
        /**
         * @typedef GetCheermotesResponse_Data_Tiers_Images
         * @prop {GetCheermotesResponse_Data_Tiers_Images_Dark} dark The dark theme variants of the cheermote
         * @prop {GetCheermotesResponse_Data_Tiers_Images_Light} light The light theme variants of the cheermote
         */
        /**
         * @typedef GetCheermotesResponse_Data_Tiers
         * @prop {number} minBits The minimum number of Bits that you must cheer at this tier level. The maximum number of Bits that you can cheer at this level is determined by the required minimum Bits of the next tier level minus 1. For example, if `min_bits` is 1 and `min_bits` for the next tier is 100, the Bits range for this tier level is 1 through 99. The minimum Bits value of the last tier is the maximum number of Bits you can cheer using this Cheermote. For example, 10000.
         * @prop {"1"|"100"|"500"|"1000"|"5000"|"10000"|"100000"} id The tier level. Possible tiers are:
         *
         * - 1
         *
         * - 100
         *
         * - 500
         *
         * - 1000
         *
         * - 5000
         *
         * - 10000
         *
         * - 100000
         * @prop {string} color The hex code of the color associated with this tier level (for example, #979797).
         * @prop {GetCheermotesResponse_Data_Tiers_Images} images The animated and static image sets for the Cheermote. The dictionary of images is organized by theme, format, and size. The theme keys are dark and light. Each theme is a dictionary of formats: animated and static. Each format is a dictionary of sizes: 1, 1.5, 2, 3, and 4. The value of each size contains the URL to the image.
         * @prop {boolean} canCheer A Boolean value that determines whether users can cheer at this tier level.
         * @prop {boolean} showInBitsCard A Boolean value that determines whether this tier level is shown in the Bits card. Is *true* if this tier level is shown in the Bits card.
         */
        /**
         * @typedef GetCheermotesResponse_Data
         * @prop {string} prefix The name portion of the Cheermote string that you use in chat to cheer Bits. The full Cheermote string is the concatenation of {prefix} + {number of Bits}. For example, if the prefix is “Cheer” and you want to cheer 100 Bits, the full Cheermote string is Cheer100. When the Cheermote string is entered in chat, Twitch converts it to the image associated with the Bits tier that was cheered.
         * @prop {GetCheermotesResponse_Data_Tiers[]} tiers A list of tier levels that the Cheermote supports. Each tier identifies the range of Bits that you can cheer at that tier level and an image that graphically identifies the tier level.
         * @prop {"global_first_party"|"global_third_party"|"channel_custom"|"display_only"|"sponsored"} type The type of Cheermote. Possible values are:
         *
         * - global_first_party — A Twitch-defined Cheermote that is shown in the Bits card.
         *
         * - global_third_party — A Twitch-defined Cheermote that is not shown in the Bits card.
         *
         * - channel_custom — A broadcaster-defined Cheermote.
         *
         * - display_only — Do not use; for internal use only.
         *
         * - sponsored — A sponsor-defined Cheermote. When used, the sponsor adds additional Bits to the amount that the user cheered. For example, if the user cheered Terminator100, the broadcaster might receive 110 Bits, which includes the sponsor's 10 Bits contribution.
         * @prop {number} order The order that the Cheermotes are shown in the Bits card. The numbers may not be consecutive. For example, the numbers may jump from 1 to 7 to 13. The order numbers are unique within a Cheermote type (for example, global_first_party) but may not be unique amongst all Cheermotes in the response.
         * @prop {string} lastUpdated The date and time, in RFC3339 format, when this Cheermote was last updated.
         * @prop {boolean} isCharitable A Boolean value that indicates whether this Cheermote provides a charitable contribution match during charity campaigns.
         */
        /**
         * @typedef GetCheermotesResponse
         * @prop {GetCheermotesResponse_Data[]} data The list of Cheermotes. The list is in ascending order by the `order` field’s value.
         */
        /**
         * Gets a list of Cheermotes that users can use to cheer Bits.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-cheermotes)
         *
         * ---
         * Gets a list of Cheermotes that users can use to cheer Bits in any Bits-enabled channel’s chat room. Cheermotes are animated emotes that viewers can assign Bits to.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires an [app access token](https://dev.twitch.tv/docs/authentication#app-access-tokens) or a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens))
         *
         * ---
         * *Examples*: 
         * 
         * Gets a list of all global Cheermotes.Gets a list of all global Cheermotes and any Cheermotes that the broadcaster has uploaded.: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/bits/cheermotes?broadcaster_id=41245072' \
         * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
         * -H 'Client-Id: wbmytr93xzw8zbg0p1izqyzzc5mbiz'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
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
         *
         * ---
         * @param {string?} broadcasterId The ID of the broadcaster whose custom Cheermotes you want to get. Specify the broadcaster’s ID if you want to include the broadcaster’s Cheermotes in the response (not all broadcasters upload Cheermotes). If not specified, the response contains only global Cheermotes.If the broadcaster uploaded Cheermotes, the `type` field in the response is set to *channel_custom*.
         * @returns {Promise<GetCheermotesResponse>} 
         */
        getCheermotes(broadcasterId=null) {
            return reqFunc("https://api.twitch.tv/helix/bits/cheermotes",
                [],
                ["app", "user"],
                {broadcaster_id: broadcasterId},
                {},
                {200: "Successfully retrieved the Cheermotes.", 401: "- The Authorization header is required and must specify an app access token or user access token.\n- The ID in the Client-Id header must match the Client ID in the OAuth token."}
            );
        },
        /**
         * @typedef GetExtensionTransactionsResponse_Data_Product_data_Cost
         * @prop {number} amount The amount exchanged for the digital product.
         * @prop {"bits"} type The type of currency exchanged. Possible values are:
         *
         * - bits
         */
        /**
         * @typedef GetExtensionTransactionsResponse_Data_Product_data
         * @prop {string} sku An ID that identifies the digital product.
         * @prop {string} domain Set to `twitch.ext.` + `<the extension's ID>`.
         * @prop {GetExtensionTransactionsResponse_Data_Product_data_Cost} cost Contains details about the digital product’s cost.
         * @prop {boolean} inDevelopment A Boolean value that determines whether the product is in development. Is *true* if the digital product is in development and cannot be exchanged.
         * @prop {string} displayName The name of the digital product.
         * @prop {string} expiration This field is always empty since you may purchase only unexpired products.
         * @prop {boolean} broadcast A Boolean value that determines whether the data was broadcast to all instances of the extension. Is *true* if the data was broadcast to all instances.
         */
        /**
         * @typedef GetExtensionTransactionsResponse_Data
         * @prop {string} id An ID that identifies the transaction.
         * @prop {string} timestamp The UTC date and time (in RFC3339 format) of the transaction.
         * @prop {string} broadcasterId The ID of the broadcaster that owns the channel where the transaction occurred.
         * @prop {string} broadcasterLogin The broadcaster’s login name.
         * @prop {string} broadcasterName The broadcaster’s display name.
         * @prop {string} userId The ID of the user that purchased the digital product.
         * @prop {string} userLogin The user’s login name.
         * @prop {string} userName The user’s display name.
         * @prop {"BITS_IN_EXTENSION"} productType The type of transaction. Possible values are:
         *
         * - BITS_IN_EXTENSION
         * @prop {GetExtensionTransactionsResponse_Data_Product_data} productData Contains details about the digital product.
         */
        /**
         * @typedef GetExtensionTransactionsResponse_Pagination
         * @prop {string} cursor The cursor used to get the next page of results. Use the cursor to set the request’s after query parameter.
         */
        /**
         * @typedef GetExtensionTransactionsResponse
         * @prop {GetExtensionTransactionsResponse_Data[]} data The list of transactions.
         * @prop {GetExtensionTransactionsResponse_Pagination} pagination Contains the information used to page through the list of results. The object is empty if there are no more pages left to page through. [Read More](https://dev.twitch.tv/docs/api/guide#pagination)
         */
        /**
         * Gets an extension’s list of transactions.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-extension-transactions)
         *
         * ---
         *  A transaction records the exchange of a currency (for example, Bits) for a digital product.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires an [app access token](https://dev.twitch.tv/docs/authentication#app-access-tokens)
         *
         * ---
         * *Examples*: 
         * 
         * Example 1: 
         * ```
         * curl -X GET
         * 'https://api.twitch.tv/helix/extensions/transactions?extension_id=1234' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "id": "74c52265-e214-48a6-91b9-23b6014e8041",
         *       "timestamp": "2019-01-28T04:15:53.325Z",
         *       "broadcaster_id": "439964613",
         *       "broadcaster_login": "chikuseuma",
         *       "broadcaster_name": "chikuseuma",
         *       "user_id": "424596340",
         *       "user_login": "quotrok",
         *       "user_name": "quotrok",
         *       "product_type": "BITS_IN_EXTENSION",
         *       "product_data": {
         *         "domain": "twitch.ext.uo6dggojyb8d6soh92zknwmi5ej1q2",
         *         "sku": "testSku100",
         *         "cost": {
         *           "amount": 100,
         *           "type": "bits"
         *         },
         *         "inDevelopment": false,
         *         "displayName": "Test Product 100",
         *         "expiration": "",
         *         "broadcast": false
         *       }
         *     },
         *     {
         *       "id": "8d303dc6-a460-4945-9f48-59c31d6735cb",
         *       "timestamp": "2019-01-18T09:10:13.397Z",
         *       "broadcaster_id": "439964613",
         *       "broadcaster_login": "chikuseuma",
         *       "broadcaster_name": "chikuseuma",
         *       "user_id": "439966926",
         *       "user_login": "liscuit",
         *       "user_name": "liscuit",
         *       "product_type": "BITS_IN_EXTENSION",
         *       "product_data": {
         *         "domain": "twitch.ext.uo6dggojyb8d6soh92zknwmi5ej1q2",
         *         "sku": "testSku200",
         *         "cost": {
         *           "amount": 200,
         *           "type": "bits"
         *         },
         *         "inDevelopment": false,
         *         "displayName": "Test Product 200",
         *         "expiration": "",
         *         "broadcast": false
         *       }
         *     },
         *     ...
         *   ],
         *   "pagination": {
         *     "cursor": "cursorString"
         *   }
         * }
         * ```
         *
         * ---
         * @param {string} extensionId The ID of the extension whose list of transactions you want to get.
         * @param {string?} id A transaction ID used to filter the list of transactions. Specify this parameter for each transaction you want to get. For example, `id=1234&id=5678`. You may specify a maximum of 100 IDs.
         * @param {number?} first The maximum number of items to return per page in the response. The minimum page size is 1 item per page and the maximum is 100 items per page. The default is 20.
         * @param {string?} after The cursor used to get the next page of results. The *Pagination* object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination)
         * @returns {Promise<GetExtensionTransactionsResponse>} 
         */
        getExtensionTransactions(extensionId, id=null, first=null, after=null) {
            return reqFunc("https://api.twitch.tv/helix/extensions/transactions",
                [],
                ["app"],
                {extension_id: extensionId, id: id, first: first, after: after},
                {},
                {200: "Successfully retrieved the list of transactions.", 400: "- The extension_id query parameter is required.\n- The request specified too many id query parameters.\n- The pagination cursor is not valid.", 401: "- The Authorization header is required and must specify an app access token.\n- The access token is not valid.\n- The ID in the extension_id query parameter must match the client ID in the access token.\n- The ID in the Client-Id header must match the client ID in the access token.", 404: "- One or more of the transaction IDs specified using the id query parameter were not found."}
            );
        },
    },
    Channels: {
        /**
         * @typedef GetChannelInformationResponse_Data
         * @prop {string} broadcasterId An ID that uniquely identifies the broadcaster.
         * @prop {string} broadcasterLogin The broadcaster’s login name.
         * @prop {string} broadcasterName The broadcaster’s display name.
         * @prop {string} broadcasterLanguage The broadcaster’s preferred language. The value is an ISO 639-1 two-letter language code (for example, en for English). The value is set to “other” if the language is not a Twitch supported language.
         * @prop {string} gameName The name of the game that the broadcaster is playing or last played. The value is an empty string if the broadcaster has never played a game.
         * @prop {string} gameId An ID that uniquely identifies the game that the broadcaster is playing or last played. The value is an empty string if the broadcaster has never played a game.
         * @prop {string} title The title of the stream that the broadcaster is currently streaming or last streamed. The value is an empty string if the broadcaster has never streamed.
         * @prop {number} delay The value of the broadcaster’s stream delay setting, in seconds. This field’s value defaults to zero unless 1) the request specifies a user access token, 2) the ID in the broadcaster_id query parameter matches the user ID in the access token, and 3) the broadcaster has partner status and they set a non-zero stream delay value.
         * @prop {string[]} tags The tags applied to the channel.
         * @prop {string[]} contentClassificationLabels The CCLs applied to the channel.
         * @prop {boolean} isBrandedContent Boolean flag indicating if the channel has branded content.
         */
        /**
         * @typedef GetChannelInformationResponse
         * @prop {GetChannelInformationResponse_Data[]} data A list that contains information about the specified channels. The list is empty if the specified channels weren’t found.
         */
        /**
         * Gets information about one or more channels.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-channel-information)
         *
         * ---
         * *Authentication*: 
         * 
         * Requires an [app access token](https://dev.twitch.tv/docs/authentication#app-access-tokens) or a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens))
         *
         * ---
         * *Examples*: 
         * 
         * Gets information about the TwitchDev channel.: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/channels?broadcaster_id=141981764' \
         * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
         * -H 'Client-Id: wbmytr93xzw8zbg0p1izqyzzc5mbiz'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "broadcaster_id": "141981764",
         *       "broadcaster_login": "twitchdev",
         *       "broadcaster_name": "TwitchDev",
         *       "broadcaster_language": "en",
         *       "game_id": "509670",
         *       "game_name": "Science & Technology",
         *       "title": "TwitchDev Monthly Update // May 6, 2021",
         *       "delay": 0,
         *       "tags": ["DevsInTheKnow"],
         *       "content_classification_labels": ["Gambling", "DrugsIntoxication", "MatureGame"],
         *       "is_branded_content": false
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster whose channel you want to get. To specify more than one ID, include this parameter for each broadcaster you want to get. For example, `broadcaster_id=1234&broadcaster_id=5678`. You may specify a maximum of 100 IDs. The API ignores duplicate IDs and IDs that are not found.
         * @returns {Promise<GetChannelInformationResponse>} 
         */
        getChannelInformation(broadcasterId) {
            return reqFunc("https://api.twitch.tv/helix/channels",
                [],
                ["app", "user"],
                {broadcaster_id: broadcasterId},
                {},
                {200: "Successfully retrieved the list of channels.", 400: "- The broadcaster_id query parameter is required.\n- The broadcaster ID is not valid.\n- The number of broadcaster_id query parameters exceeds the maximum allowed.", 401: "- The Authorization header is required and must specify an app access token or user access token.\n- The OAuth token is not valid.\n- The ID in the Client-Id header must match the Client ID in the OAuth token.", 429: "- The application exceeded the number of calls it may make per minute. For details, see [Rate Limits](https://dev.twitch.tv/docs/api/guide#twitch-rate-limits).", 500: ""}
            );
        },
        /**
         * @typedef ModifyChannelInformationRequest_Content_classification_labels
         * @prop {"DebatedSocialIssuesAndPolitics"|"DrugsIntoxication"|"SexualThemes"|"ViolentGraphic"|"Gambling"|"ProfanityVulgarity"} id ID of the [Content Classification Labels](https://help.twitch.tv/s/article/content-classification-labels) that must be added/removed from the channel. Can be one of the following values:
         *
         * - DebatedSocialIssuesAndPolitics
         *
         * - DrugsIntoxication
         *
         * - SexualThemes
         *
         * - ViolentGraphic
         *
         * - Gambling
         *
         * - ProfanityVulgarity
         * @prop {boolean} isEnabled Boolean flag indicating whether the label should be enabled (true) or disabled for the channel.
         */
        /**
         * Updates a channel’s properties.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#modify-channel-information)
         *
         * ---
         * *Info*: 
         * 
         * All fields are optional, but you must specify at least one field.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `channel:manage:broadcast`
         *
         * ---
         * *Examples*: 
         * 
         * Set CCLs for a Channel: 
         * ```
         * curl -X PATCH
         * 'https://api.twitch.tv/helix/channels?broadcaster_id=41245072' \
         * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
         * -H 'Client-Id: wbmytr93xzw8zbg0p1izqyzzc5mbiz' \
         * -H 'Content-Type: application/json' \
         * --data-raw '{ 
         *     “game_id”: “SomeGameID”,
         *     “content_classification_labels”: [
         *        {“id”: “Gambling”, “is_enabled”: true}, // adds this label
         *        {“id”: “DrugsIntoxication”, “is_enabled”: false}  // removes this label
         *      ],
         *     “is_branded_content”: true
         * }'
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster whose channel you want to update. This ID must match the user ID in the user access token.
         * @param {string?} gameId The ID of the game that the user plays. The game is not updated if the ID isn’t a game ID that Twitch recognizes. To unset this field, use “0” or “” (an empty string).
         * @param {string?} broadcasterLanguage The user’s preferred language. Set the value to an ISO 639-1 two-letter language code (for example, en for English). Set to “other” if the user’s preferred language is not a Twitch supported language. The language isn’t updated if the language code isn’t a Twitch supported language.
         * @param {string?} title The title of the user’s stream. You may not set this field to an empty string.
         * @param {number?} delay The number of seconds you want your broadcast buffered before streaming it live. The delay helps ensure fairness during competitive play. Only users with Partner status may set this field. The maximum delay is 900 seconds (15 minutes).
         * @param {string[]?} tags A list of channel-defined tags to apply to the channel. To remove all tags from the channel, set tags to an empty array. Tags help identify the content that the channel streams. [Learn More](https://help.twitch.tv/s/article/guide-to-tags)A channel may specify a maximum of 10 tags. Each tag is limited to a maximum of 25 characters and may not be an empty string or contain spaces or special characters. Tags are case insensitive. For readability, consider using camelCasing or PascalCasing.
         * @param {ModifyChannelInformationRequest_Content_classification_labels[]?} contentClassificationLabels List of labels that should be set as the Channel’s CCLs.
         * @param {boolean?} isBrandedContent Boolean flag indicating if the channel has branded content.
         * @returns {Promise<void>} 
         */
        modifyChannelInformation(broadcasterId, gameId=null, broadcasterLanguage=null, title=null, delay=null, tags=null, contentClassificationLabels=null, isBrandedContent=null) {
            return reqFunc("https://api.twitch.tv/helix/channels",
                ["channel:manage:broadcast"],
                ["user"],
                {broadcaster_id: broadcasterId},
                {game_id: gameId, broadcaster_language: broadcasterLanguage, title: title, delay: delay, tags: tags, content_classification_labels: contentClassificationLabels, is_branded_content: isBrandedContent},
                {204: "Successfully updated the channel’s properties.", 400: "- The broadcaster_id query parameter is required.\n- The request must update at least one property.\n- The `title` field may not contain an empty string.\n- The ID in `game_id` is not valid.\n- To update the `delay` field, the broadcaster must have partner status.\n- The list in the `tags` field exceeds the maximum number of tags allowed.\n- A tag in the `tags` field exceeds the maximum length allowed.\n- A tag in the `tags` field is empty.\n- A tag in the `tags` field contains special characters or spaces.\n- One or more tags in the `tags` field failed AutoMod review.\n- Game restricted for user's age and region", 401: "- User requests CCL for a channel they don’t own\n- The ID in broadcaster_id must match the user ID found in the OAuth token.\n- The Authorization header is required and must specify a user access token.\n- The OAuth token must include the channel:manage:broadcast scope.\n- The OAuth token is not valid.\n- The ID in the Client-Id header must match the Client ID in the OAuth token.", 403: "- User requested gaming CCLs to be added to their channel\n- Unallowed CCLs declared for underaged authorized user in a restricted country", 409: "User set the Branded Content flag too frequently", 500: ""}
            );
        },
        /**
         * @typedef GetChannelEditorsResponse_Data
         * @prop {string} userId An ID that uniquely identifies a user with editor permissions.
         * @prop {string} userName The user’s display name.
         * @prop {string} createdAt The date and time, in RFC3339 format, when the user became one of the broadcaster’s editors.
         */
        /**
         * @typedef GetChannelEditorsResponse
         * @prop {GetChannelEditorsResponse_Data[]} data A list of users that are editors for the specified broadcaster. The list is empty if the broadcaster doesn’t have editors.
         */
        /**
         * Gets the broadcaster’s list editors.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-channel-editors)
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `channel:read:editors`
         *
         * ---
         * *Examples*: 
         * 
         * Gets the list of editors for TwitchDev.: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/channels/editors?broadcaster_id=141981764' \
         * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
         * -H 'Client-Id: wbmytr93xzw8zbg0p1izqyzzc5mbiz' \
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "user_id": "182891647",
         *       "user_name": "mauerbac",
         *       "created_at": "2019-02-15T21:19:50.380833Z"
         *     },
         *     {
         *       "user_id": "135093069",
         *       "user_name": "BlueLava",
         *       "created_at": "2018-03-07T16:28:29.872937Z"
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster that owns the channel. This ID must match the user ID in the access token.
         * @returns {Promise<GetChannelEditorsResponse>} 
         */
        getChannelEditors(broadcasterId) {
            return reqFunc("https://api.twitch.tv/helix/channels/editors",
                ["channel:read:editors"],
                ["user"],
                {broadcaster_id: broadcasterId},
                {},
                {200: "Successfully retrieved the broadcaster's list of editors.", 400: "- The broadcaster_id query parameter is required.", 401: "- The ID in the broadcaster_id query parameter must match the user ID found in the OAuth token.\n- The Authorization header is required and must specify a user access token.\n- The OAuth token must include the channel:read:editors scope.\n- The OAuth token is not valid.\n- The ID in the Client-Id header must match the Client ID in the OAuth token."}
            );
        },
        /**
         * @typedef GetFollowedChannelsResponse_Data
         * @prop {string} broadcasterId An ID that uniquely identifies the broadcaster that this user is following.
         * @prop {string} broadcasterLogin The broadcaster’s login name.
         * @prop {string} broadcasterName The broadcaster’s display name.
         * @prop {string} followedAt The UTC timestamp when the user started following the broadcaster.
         */
        /**
         * @typedef GetFollowedChannelsResponse_Pagination
         * @prop {string} cursor The cursor used to get the next page of results. Use the cursor to set the request’s after query parameter.
         */
        /**
         * @typedef GetFollowedChannelsResponse
         * @prop {GetFollowedChannelsResponse_Data[]} data The list of broadcasters that the user follows. The list is in descending order by `followed_at` (with the most recently followed broadcaster first). The list is empty if the user doesn’t follow anyone.
         * @prop {GetFollowedChannelsResponse_Pagination} pagination Contains the information used to page through the list of results. The object is empty if there are no more pages left to page through. [Read more](https://dev.twitch.tv/docs/api/guide#pagination).
         * @prop {number} total The total number of broadcasters that the user follows. As someone pages through the list, the number may change as the user follows or unfollows broadcasters.
         */
        /**
         * Gets a list of broadcasters that the specified user follows. You can also use this endpoint to see whether a user follows a specific broadcaster.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-followed-channels)
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `user:read:follows`
         *
         * ---
         * *Examples*: 
         * 
         * Gets the list of broadcasters that the specified user follows.: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/channels/followed?user_id=123456' \
         * -H 'Authorization: Bearer kpvy3cjboyptmiacwr0c19hotn5s' \
         * -H 'Client-Id: hof5gwx0su6owfn0nyan9c87zr6t'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "total": 8,
         *   "data": [
         *     {
         *       "broadcaster_id": "11111",
         *       "broadcaster_login": "userloginname",
         *       "broadcaster_name": "UserDisplayName",
         *       "followed_at": "2022-05-24T22:22:08Z"
         *     },
         *     ...
         *   ],
         *   "pagination": {
         *     "cursor": "eyJiIjpudWxsLCJhIjp7Ik9mZnNldCI6NX19"
         *   }
         * }
         * ```
         *
         * ---
         * Checks whether the specified user follows the specified broadcaster.: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/channels/followed?user_id=123456&broadcaster_id=654321' \
         * -H 'Authorization: Bearer kpvy3cjboyptmiacwr0c19hotn5s' \
         * -H 'Client-Id: hof5gwx0su6owfn0nyan9c87zr6t'
         * ```
         * 
         * *Responses*: 
         * 
         * The `data` field is not an empty array, which means that the user does follow the specified broadcaster.: 
         * ```
         * {
         *   "total": 8,
         *   "data": [
         *     {
         *       "broadcaster_id": "654321",
         *       "broadcaster_login": "basketweaver101",
         *       "broadcaster_name": "BasketWeaver101",
         *       "followed_at": "2022-05-24T22:22:08Z"
         *     }
         *   ],
         *   "pagination": {}
         * }
         * ```
         *
         * ---
         * @param {string} userId A user’s ID. Returns the list of broadcasters that this user follows. This ID must match the user ID in the user OAuth token.
         * @param {string?} broadcasterId A broadcaster’s ID. Use this parameter to see whether the user follows this broadcaster. If specified, the response contains this broadcaster if the user follows them. If not specified, the response contains all broadcasters that the user follows.
         * @param {number?} first The maximum number of items to return per page in the response. The minimum page size is 1 item per page and the maximum is 100. The default is 20.
         * @param {string?} after The cursor used to get the next page of results. The *Pagination* object in the response contains the cursor’s value. [Read more](https://dev.twitch.tv/docs/api/guide#pagination).
         * @returns {Promise<GetFollowedChannelsResponse>} 
         */
        getFollowedChannels(userId, broadcasterId=null, first=null, after=null) {
            return reqFunc("https://api.twitch.tv/helix/channels/followed",
                ["user:read:follows"],
                ["user"],
                {user_id: userId, broadcaster_id: broadcasterId, first: first, after: after},
                {},
                {200: "Successfully retrieved the broadcaster's list of followers.", 400: "Possible reasons:\n- The user_id query parameter is required.\n- The broadcaster_id query parameter is not valid.\n- The user_id query parameter is required.", 401: "Possible reasons:\n- The ID in the user_id query parameter must match the user ID in the access token.\n- The Authorization header is required and must contain a user access token.\n- The user access token is missing the user:read:follows scope.\n- The OAuth token is not valid.\n- The client ID specified in the Client-Id header does not match the client ID specified in the OAuth token."}
            );
        },
        /**
         * Gets a list of users that follow the specified broadcaster. You can also use this endpoint to see whether a specific user follows the broadcaster.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-channel-followers)
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `moderator:read:followers`
         *
         * INFO: The ID in the broadcaster_id query parameter must match the user ID in the access token or the user ID in the access token must be a moderator for the specified broadcaster.
         *
         * ---
         * *Examples*: 
         * 
         * Gets the list of users that follow the specified broadcaster.: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/channels/followers?broadcaster_id=123456' \
         * -H 'Authorization: Bearer kpvy3cjboyptmiacwr0c19hotn5s' \
         * -H 'Client-Id: hof5gwx0su6owfn0nyan9c87zr6t'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "total": 8,
         *   "data": [
         *     {
         *       "user_id": "11111",
         *       "user_name": "UserDisplayName",
         *       "user_login": "userloginname",
         *       "followed_at": "2022-05-24T22:22:08Z"
         *     },
         *     ...
         *   ],
         *   "pagination": {
         *     "cursor": "eyJiIjpudWxsLCJhIjp7Ik9mZnNldCI6NX19"
         *   }
         * }
         * ```
         *
         * ---
         * Checks whether the specified user follows the specified broadcaster.: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/channels/followers?broadcaster_id=123456&user_id=654321' \
         * -H 'Authorization: Bearer kpvy3cjboyptmiacwr0c19hotn5s' \
         * -H 'Client-Id: hof5gwx0su6owfn0nyan9c87zr6t'
         * ```
         * 
         * *Responses*: 
         * 
         * The `data` field is an empty array, which means the user doesn’t follow the specified broadcaster.: 
         * ```
         * {
         *   "total": 8,
         *   "data": [],
         *   "pagination": {}
         * }
         * ```
         *
         * ---
         * @returns {Promise<void>} 
         */
        getChannelFollowers() {
            return reqFunc("undefined",
                ["moderator:read:followers"],
                ["user"],
                {},
                {},
                {}
            );
        },
    },
    ChannelPoints: {
        /**
         * @typedef CreateCustomRewardsResponse_Data_Image
         * @prop {string} url1x The URL to a small version of the image.
         * @prop {string} url2x The URL to a medium version of the image.
         * @prop {string} url4x The URL to a large version of the image.
         */
        /**
         * @typedef CreateCustomRewardsResponse_Data_Default_image
         * @prop {string} url1x The URL to a small version of the image.
         * @prop {string} url2x The URL to a medium version of the image.
         * @prop {string} url4x The URL to a large version of the image.
         */
        /**
         * @typedef CreateCustomRewardsResponse_Data_Max_per_stream_setting
         * @prop {boolean} isEnabled A Boolean value that determines whether the reward applies a limit on the number of redemptions allowed per live stream. Is *true* if the reward applies a limit.
         * @prop {number} maxPerStream The maximum number of redemptions allowed per live stream.
         */
        /**
         * @typedef CreateCustomRewardsResponse_Data_Max_per_user_per_stream_setting
         * @prop {boolean} isEnabled A Boolean value that determines whether the reward applies a limit on the number of redemptions allowed per user per live stream. Is *true* if the reward applies a limit.
         * @prop {number} maxPerUserPerStream The maximum number of redemptions allowed per user per live stream.
         */
        /**
         * @typedef CreateCustomRewardsResponse_Data_Global_cooldown_setting
         * @prop {boolean} isEnabled A Boolean value that determines whether to apply a cooldown period. Is *true* if a cooldown period is enabled.
         * @prop {number} globalCooldownSeconds The cooldown period, in seconds.
         */
        /**
         * @typedef CreateCustomRewardsResponse_Data
         * @prop {string} broadcasterId The ID that uniquely identifies the broadcaster.
         * @prop {string} broadcasterLogin The broadcaster’s login name.
         * @prop {string} broadcasterName The broadcaster’s display name.
         * @prop {string} id The ID that uniquely identifies this custom reward.
         * @prop {string} title The title of the reward.
         * @prop {string} prompt The prompt shown to the viewer when they redeem the reward if user input is required (see the `is_user_input_required` field).
         * @prop {number} cost The cost of the reward in Channel Points.
         * @prop {CreateCustomRewardsResponse_Data_Image} image A set of custom images for the reward. This field is set to *null* if the broadcaster didn’t upload images.
         * @prop {CreateCustomRewardsResponse_Data_Default_image} defaultImage A set of default images for the reward.
         * @prop {string} backgroundColor The background color to use for the reward. The color is in Hex format (for example, #00E5CB).
         * @prop {boolean} isEnabled A Boolean value that determines whether the reward is enabled. Is *true* if enabled; otherwise, *false*. Disabled rewards aren’t shown to the user.
         * @prop {boolean} isUserInputRequired A Boolean value that determines whether the user must enter information when redeeming the reward. Is *true* if the reward requires user input.
         * @prop {CreateCustomRewardsResponse_Data_Max_per_stream_setting} maxPerStreamSetting The settings used to determine whether to apply a maximum to the number to the redemptions allowed per live stream.
         * @prop {CreateCustomRewardsResponse_Data_Max_per_user_per_stream_setting} maxPerUserPerStreamSetting The settings used to determine whether to apply a maximum to the number of redemptions allowed per user per live stream.
         * @prop {CreateCustomRewardsResponse_Data_Global_cooldown_setting} globalCooldownSetting The settings used to determine whether to apply a cooldown period between redemptions and the length of the cooldown.
         * @prop {boolean} isPaused A Boolean value that determines whether the reward is currently paused. Is *true* if the reward is paused. Viewers can’t redeem paused rewards.
         * @prop {boolean} isInStock A Boolean value that determines whether the reward is currently in stock. Is *true* if the reward is in stock. Viewers can’t redeem out of stock rewards.
         * @prop {boolean} shouldRedemptionsSkipRequestQueue A Boolean value that determines whether redemptions should be set to FULFILLED status immediately when a reward is redeemed. If *false*, status is UNFULFILLED and follows the normal request queue process.
         * @prop {number} redemptionsRedeemedCurrentStream The number of redemptions redeemed during the current live stream. The number counts against the `max_per_stream_setting` limit. This field is *null* if the broadcaster’s stream isn’t live or max_per_stream_setting isn’t enabled.
         * @prop {string} cooldownExpiresAt The timestamp of when the cooldown period expires. Is *null* if the reward isn’t in a cooldown state (see the `global_cooldown_setting` field).
         */
        /**
         * @typedef CreateCustomRewardsResponse
         * @prop {CreateCustomRewardsResponse_Data[]} data A list that contains the single custom reward you created.
         */
        /**
         * Creates a Custom Reward in the broadcaster’s channel.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#create-custom-rewards)
         *
         * ---
         *  The maximum number of custom rewards per channel is 50, which includes both enabled and disabled rewards.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `channel:manage:redemptions`
         *
         * ---
         * *Examples*: 
         * 
         * Creates a custom reward.: 
         * ```
         * curl -X POST 'https://api.twitch.tv/helix/channel_points/custom_rewards?broadcaster_id=274637212' \
         * -H 'client-id: gx2pv4208cff0ig9ou7nk3riccffxt' \
         * -H 'Authorization: Bearer vjxv3i0l4zxru966wsnwji51tmpkj2' \
         * -H 'Content-Type: application/json' \
         * -d '{
         *   "title":"game analysis 1v1",
         *   "cost":50000
         * }'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "broadcaster_name": "torpedo09",
         *       "broadcaster_login": "torpedo09",
         *       "broadcaster_id": "274637212",
         *       "id": "afaa7e34-6b17-49f0-a19a-d1e76eaaf673",
         *       "image": null,
         *       "background_color": "#00E5CB",
         *       "is_enabled": true,
         *       "cost": 50000,
         *       "title": "game analysis 1v1",
         *       "prompt": "",
         *       "is_user_input_required": false,
         *       "max_per_stream_setting": {
         *         "is_enabled": false,
         *         "max_per_stream": 0
         *       },
         *       "max_per_user_per_stream_setting": {
         *         "is_enabled": false,
         *         "max_per_user_per_stream": 0
         *       },
         *       "global_cooldown_setting": {
         *         "is_enabled": false,
         *         "global_cooldown_seconds": 0
         *       },
         *       "is_paused": false,
         *       "is_in_stock": true,
         *       "default_image": {
         *         "url_1x": "https://static-cdn.jtvnw.net/custom-reward-images/default-1.png",
         *         "url_2x": "https://static-cdn.jtvnw.net/custom-reward-images/default-2.png",
         *         "url_4x": "https://static-cdn.jtvnw.net/custom-reward-images/default-4.png"
         *       },
         *       "should_redemptions_skip_request_queue": false,
         *       "redemptions_redeemed_current_stream": null,
         *       "cooldown_expires_at": null
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster to add the custom reward to. This ID must match the user ID found in the OAuth token.
         * @param {string} title The custom reward’s title. The title may contain a maximum of 45 characters and it must be unique amongst all of the broadcaster’s custom rewards.
         * @param {number} cost The cost of the reward, in Channel Points. The minimum is 1 point.
         * @param {string?} prompt The prompt shown to the viewer when they redeem the reward. Specify a prompt if `is_user_input_required` is *true*. The prompt is limited to a maximum of 200 characters.
         * @param {boolean?} isEnabled A Boolean value that determines whether the reward is enabled. Viewers see only enabled rewards. The default is *true*.
         * @param {string?} backgroundColor The background color to use for the reward. Specify the color using Hex format (for example, #9147FF).
         * @param {boolean?} isUserInputRequired A Boolean value that determines whether the user needs to enter information when redeeming the reward. See the `prompt` field. The default is *false*.
         * @param {boolean?} isMaxPerStreamEnabled A Boolean value that determines whether to limit the maximum number of redemptions allowed per live stream (see the `max_per_stream` field). The default is *false*.
         * @param {number?} maxPerStream The maximum number of redemptions allowed per live stream. Applied only if `is_max_per_stream_enabled` is *true*. The minimum value is 1.
         * @param {boolean?} isMaxPerUserPerStreamEnabled A Boolean value that determines whether to limit the maximum number of redemptions allowed per user per stream (see the `max_per_user_per_stream` field). The default is *false*.
         * @param {number?} maxPerUserPerStream The maximum number of redemptions allowed per user per stream. Applied only if `is_max_per_user_per_stream_enabled` is *true*. The minimum value is 1.
         * @param {boolean?} isGlobalCooldownEnabled A Boolean value that determines whether to apply a cooldown period between redemptions (see the `global_cooldown_seconds` field for the duration of the cooldown period). The default is *false*.
         * @param {number?} globalCooldownSeconds The cooldown period, in seconds. Applied only if the `is_global_cooldown_enabled` field is *true*. The minimum value is 1; however, the minimum value is 60 for it to be shown in the Twitch UX.
         * @param {boolean?} shouldRedemptionsSkipRequestQueue A Boolean value that determines whether redemptions should be set to FULFILLED status immediately when a reward is redeemed. If *false*, status is set to UNFULFILLED and follows the normal request queue process. The default is *false*.
         * @returns {Promise<CreateCustomRewardsResponse>} 
         */
        createCustomRewards(broadcasterId, title, cost, prompt=null, isEnabled=null, backgroundColor=null, isUserInputRequired=null, isMaxPerStreamEnabled=null, maxPerStream=null, isMaxPerUserPerStreamEnabled=null, maxPerUserPerStream=null, isGlobalCooldownEnabled=null, globalCooldownSeconds=null, shouldRedemptionsSkipRequestQueue=null) {
            return reqFunc("https://api.twitch.tv/helix/channel_points/custom_rewards",
                ["channel:manage:redemptions"],
                ["user"],
                {broadcaster_id: broadcasterId},
                {title: title, cost: cost, prompt: prompt, is_enabled: isEnabled, background_color: backgroundColor, is_user_input_required: isUserInputRequired, is_max_per_stream_enabled: isMaxPerStreamEnabled, max_per_stream: maxPerStream, is_max_per_user_per_stream_enabled: isMaxPerUserPerStreamEnabled, max_per_user_per_stream: maxPerUserPerStream, is_global_cooldown_enabled: isGlobalCooldownEnabled, global_cooldown_seconds: globalCooldownSeconds, should_redemptions_skip_request_queue: shouldRedemptionsSkipRequestQueue},
                {200: "Successfully created the custom reward.", 400: "- The request exceeds the maximum number of rewards allowed per channel.\n- The broadcaster_id query parameter is required.\n- The `title` field is required.\n- The `title` must contain a minimum of 1 character and a maximum of 45 characters.\n- The `title` must be unique amongst all of the broadcaster's custom rewards.\n- The `cost` field is required.\n- The `cost` field must contain a minimum of 1 point.\n- The `prompt` field is limited to a maximum of 200 characters.\n- If `is_max_per_stream_enabled` is true, the minimum value for `max_per_stream` is 1.\n- If `is_max_per_user_per_stream_enabled` is true, the minimum value for `max_per_user_per_stream` is 1.\n- If `is_global_cooldown_enabled` is true, the minimum value for `global_cooldown_seconds` is 1.", 401: "- The Authorization header is required and must specify a user access token.\n- The user access token is missing the channel:manage:redemptions scope.\n- The OAuth token is not valid.\n- The ID in the Client-Id header must match the Client ID in the OAuth token.", 403: "- The broadcaster is not a partner or affiliate.", 500: ""}
            );
        },
        /**
         * Deletes a custom reward that the broadcaster created.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#delete-custom-reward)
         *
         * ---
         * 
         *
         * The app used to create the reward is the only app that may delete it. If the reward’s redemption status is UNFULFILLED at the time the reward is deleted, its redemption status is marked as FULFILLED.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `channel:manage:redemptions`
         *
         * ---
         * *Examples*: 
         * 
         * Deletes the specified custom reward.: 
         * ```
         * curl -X DELETE 'https://api.twitch.tv/helix/channel_points/custom_rewards?broadcaster_id=274637212&id=b045196d-9ce7-4a27-a9b9-279ed341ab28' \
         * -H 'Client-Id: gx2pv4208cff0ig9ou7nk3riccffxt' \
         * -H 'Authorization: Bearer vjxv3i0l4zxru966wsnwji51tmpkj2'
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster that created the custom reward. This ID must match the user ID found in the OAuth token.
         * @param {string} id The ID of the custom reward to delete.
         * @returns {Promise<void>} 
         */
        deleteCustomReward(broadcasterId, id) {
            return reqFunc("https://api.twitch.tv/helix/channel_points/custom_rewards",
                ["channel:manage:redemptions"],
                ["user"],
                {broadcaster_id: broadcasterId, id: id},
                {},
                {204: "Successfully deleted the custom reward.", 400: "- The broadcaster_id query parameter is required.\n- The id query parameter is required.", 401: "- The Authorization header is required and must specify a user access token.\n- The user access token must include the channel:manage:redemptions scope.\n- The OAuth token is not valid.\n- The ID in the Client-Id header must match the Client ID in the OAuth token.", 403: "- The ID in the Client-Id header must match the client ID used to create the custom reward.\n- The broadcaster is not a partner or affiliate.", 404: "- The custom reward specified in the id query parameter was not found.", 500: ""}
            );
        },
        /**
         * @typedef GetCustomRewardResponse_Data_Image
         * @prop {string} url1x The URL to a small version of the image.
         * @prop {string} url2x The URL to a medium version of the image.
         * @prop {string} url4x The URL to a large version of the image.
         */
        /**
         * @typedef GetCustomRewardResponse_Data_Default_image
         * @prop {string} url1x The URL to a small version of the image.
         * @prop {string} url2x The URL to a medium version of the image.
         * @prop {string} url4x The URL to a large version of the image.
         */
        /**
         * @typedef GetCustomRewardResponse_Data_Max_per_stream_setting
         * @prop {boolean} isEnabled A Boolean value that determines whether the reward applies a limit on the number of redemptions allowed per live stream. Is *true* if the reward applies a limit.
         * @prop {number} maxPerStream The maximum number of redemptions allowed per live stream.
         */
        /**
         * @typedef GetCustomRewardResponse_Data_Max_per_user_per_stream_setting
         * @prop {boolean} isEnabled A Boolean value that determines whether the reward applies a limit on the number of redemptions allowed per user per live stream. Is *true* if the reward applies a limit.
         * @prop {number} maxPerUserPerStream The maximum number of redemptions allowed per user per live stream.
         */
        /**
         * @typedef GetCustomRewardResponse_Data_Global_cooldown_setting
         * @prop {boolean} isEnabled A Boolean value that determines whether to apply a cooldown period. Is *true* if a cooldown period is enabled.
         * @prop {number} globalCooldownSeconds The cooldown period, in seconds.
         */
        /**
         * @typedef GetCustomRewardResponse_Data
         * @prop {string} broadcasterId The ID that uniquely identifies the broadcaster.
         * @prop {string} broadcasterLogin The broadcaster’s login name.
         * @prop {string} broadcasterName The broadcaster’s display name.
         * @prop {string} id The ID that uniquely identifies this custom reward.
         * @prop {string} title The title of the reward.
         * @prop {string} prompt The prompt shown to the viewer when they redeem the reward if user input is required (see the `is_user_input_required` field).
         * @prop {number} cost The cost of the reward in Channel Points.
         * @prop {GetCustomRewardResponse_Data_Image} image A set of custom images for the reward. This field is *null* if the broadcaster didn’t upload images.
         * @prop {GetCustomRewardResponse_Data_Default_image} defaultImage A set of default images for the reward.
         * @prop {string} backgroundColor The background color to use for the reward. The color is in Hex format (for example, #00E5CB).
         * @prop {boolean} isEnabled A Boolean value that determines whether the reward is enabled. Is *true* if enabled; otherwise, *false*. Disabled rewards aren’t shown to the user.
         * @prop {boolean} isUserInputRequired A Boolean value that determines whether the user must enter information when redeeming the reward. Is *true* if the user is prompted.
         * @prop {GetCustomRewardResponse_Data_Max_per_stream_setting} maxPerStreamSetting The settings used to determine whether to apply a maximum to the number of redemptions allowed per live stream.
         * @prop {GetCustomRewardResponse_Data_Max_per_user_per_stream_setting} maxPerUserPerStreamSetting The settings used to determine whether to apply a maximum to the number of redemptions allowed per user per live stream.
         * @prop {GetCustomRewardResponse_Data_Global_cooldown_setting} globalCooldownSetting The settings used to determine whether to apply a cooldown period between redemptions and the length of the cooldown.
         * @prop {boolean} isPaused A Boolean value that determines whether the reward is currently paused. Is *true* if the reward is paused. Viewers can’t redeem paused rewards.
         * @prop {boolean} isInStock A Boolean value that determines whether the reward is currently in stock. Is *true* if the reward is in stock. Viewers can’t redeem out of stock rewards.
         * @prop {boolean} shouldRedemptionsSkipRequestQueue A Boolean value that determines whether redemptions should be set to FULFILLED status immediately when a reward is redeemed. If *false*, status is set to UNFULFILLED and follows the normal request queue process.
         * @prop {number} redemptionsRedeemedCurrentStream The number of redemptions redeemed during the current live stream. The number counts against the `max_per_stream_setting` limit. This field is *null* if the broadcaster’s stream isn’t live or max_per_stream_setting isn’t enabled.
         * @prop {string} cooldownExpiresAt The timestamp of when the cooldown period expires. Is *null* if the reward isn’t in a cooldown state. See the `global_cooldown_setting` field.
         */
        /**
         * @typedef GetCustomRewardResponse
         * @prop {GetCustomRewardResponse_Data[]} data A list of custom rewards. The list is in ascending order by `id`. If the broadcaster hasn’t created custom rewards, the list is empty.
         */
        /**
         * Gets a list of custom rewards that the specified broadcaster created.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-custom-reward)
         *
         * ---
         * 
         *
         * *NOTE*: A channel may offer a maximum of 50 rewards, which includes both enabled and disabled rewards.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `channel:read:redemptions`, `channel:manage:redemptions`
         *
         * ---
         * *Examples*: 
         * 
         * Gets the broadcaster’s list of custom rewards.: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/channel_points/custom_rewards?broadcaster_id=274637212'
         * -H 'Client-Id: gx2pv4208cff0ig9ou7nk3riccffxt' \
         * -H 'Authorization: Bearer vjxv3i0l4zxru966wsnwji51tmpkj2'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "broadcaster_name": "torpedo09",
         *       "broadcaster_login": "torpedo09",
         *       "broadcaster_id": "274637212",
         *       "id": "92af127c-7326-4483-a52b-b0da0be61c01",
         *       "image": null,
         *       "background_color": "#00E5CB",
         *       "is_enabled": true,
         *       "cost": 50000,
         *       "title": "game analysis",
         *       "prompt": "",
         *       "is_user_input_required": false,
         *       "max_per_stream_setting": {
         *         "is_enabled": false,
         *         "max_per_stream": 0
         *       },
         *       "max_per_user_per_stream_setting": {
         *         "is_enabled": false,
         *         "max_per_user_per_stream": 0
         *       },
         *       "global_cooldown_setting": {
         *         "is_enabled": false,
         *         "global_cooldown_seconds": 0
         *       },
         *       "is_paused": false,
         *       "is_in_stock": true,
         *       "default_image": {
         *         "url_1x": "https://static-cdn.jtvnw.net/custom-reward-images/default-1.png",
         *         "url_2x": "https://static-cdn.jtvnw.net/custom-reward-images/default-2.png",
         *         "url_4x": "https://static-cdn.jtvnw.net/custom-reward-images/default-4.png"
         *       },
         *       "should_redemptions_skip_request_queue": false,
         *       "redemptions_redeemed_current_stream": null,
         *       "cooldown_expires_at": null
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * Gets the list of custom rewards that the calling Client ID can manage.: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/channel_points/custom_rewards?broadcaster_id=274637212&only_manageable_rewards=true'
         * -H 'Client-Id: gx2pv4208cff0ig9ou7nk3riccffxt' \
         * -H 'Authorization: Bearer vjxv3i0l4zxru966wsnwji51tmpkj2'​​​​​​​
         * ```
         * 
         * *Responses*: 
         * 
         * Response 2: 
         * ```
         * {
         *   "data": [
         *     {
         *       "broadcaster_name": "torpedo09",
         *       "broadcaster_id": "274637212",
         *       "id": "92af127c-7326-4483-a52b-b0da0be61c01",
         *       "image": null,
         *       "background_color": "#00E5CB",
         *       "is_enabled": true,
         *       "cost": 50000,
         *       "title": "game analysis",
         *       "prompt": "",
         *       "is_user_input_required": false,
         *       "max_per_stream_setting": {
         *         "is_enabled": false,
         *         "max_per_stream": 0
         *       },
         *       "max_per_user_per_stream_setting": {
         *         "is_enabled": false,
         *         "max_per_user_per_stream": 0
         *       },
         *       "global_cooldown_setting": {
         *         "is_enabled": false,
         *         "global_cooldown_seconds": 0
         *       },
         *       "is_paused": false,
         *       "is_in_stock": true,
         *       "default_image": {
         *         "url_1x": "https://static-cdn.jtvnw.net/custom-reward-images/default-1.png",
         *         "url_2x": "https://static-cdn.jtvnw.net/custom-reward-images/default-2.png",
         *         "url_4x": "https://static-cdn.jtvnw.net/custom-reward-images/default-4.png"
         *       },
         *       "should_redemptions_skip_request_queue": false,
         *       "redemptions_redeemed_current_stream": null,
         *       "cooldown_expires_at": null
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * Gets the specified custom reward.: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/channel_points/custom_rewards?broadcaster_id=274637212&id=92af127c-7326-4483-a52b-b0da0be61c01'
         * -H 'Client-Id: gx2pv4208cff0ig9ou7nk3riccffxt' \
         * -H 'Authorization: Bearer vjxv3i0l4zxru966wsnwji51tmpkj2'​​​​​​​​​​​​​​
         * ```
         * 
         * *Responses*: 
         * 
         * Response 3: 
         * ```
         * {
         *   "data": [
         *     {
         *       "broadcaster_name": "torpedo09",
         *       "broadcaster_id": "274637212",
         *       "id": "92af127c-7326-4483-a52b-b0da0be61c01",
         *       "image": null,
         *       "background_color": "#00E5CB",
         *       "is_enabled": true,
         *       "cost": 50000,
         *       "title": "game analysis",
         *       "prompt": "",
         *       "is_user_input_required": false,
         *       "max_per_stream_setting": {
         *         "is_enabled": false,
         *         "max_per_stream": 0
         *       },
         *       "max_per_user_per_stream_setting": {
         *         "is_enabled": false,
         *         "max_per_user_per_stream": 0
         *       },
         *       "global_cooldown_setting": {
         *         "is_enabled": false,
         *         "global_cooldown_seconds": 0
         *       },
         *       "is_paused": false,
         *       "is_in_stock": true,
         *       "default_image": {
         *         "url_1x": "https://static-cdn.jtvnw.net/custom-reward-images/default-1.png",
         *         "url_2x": "https://static-cdn.jtvnw.net/custom-reward-images/default-2.png",
         *         "url_4x": "https://static-cdn.jtvnw.net/custom-reward-images/default-4.png"
         *       },
         *       "should_redemptions_skip_request_queue": false,
         *       "redemptions_redeemed_current_stream": null,
         *       "cooldown_expires_at": null
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster whose custom rewards you want to get. This ID must match the user ID found in the OAuth token.
         * @param {string?} id A list of IDs to filter the rewards by. To specify more than one ID, include this parameter for each reward you want to get. For example, `id=1234&id=5678`. You may specify a maximum of 50 IDs.Duplicate IDs are ignored. The response contains only the IDs that were found. If none of the IDs were found, the response is 404 Not Found.
         * @param {boolean?} onlyManageableRewards A Boolean value that determines whether the response contains only the custom rewards that the app may manage (the app is identified by the ID in the Client-Id header). Set to *true* to get only the custom rewards that the app may manage. The default is *false*.
         * @returns {Promise<GetCustomRewardResponse>} 
         */
        getCustomReward(broadcasterId, id=null, onlyManageableRewards=null) {
            return reqFunc("https://api.twitch.tv/helix/channel_points/custom_rewards",
                ["channel:read:redemptions", "channel:manage:redemptions"],
                ["user"],
                {broadcaster_id: broadcasterId, id: id, only_manageable_rewards: onlyManageableRewards},
                {},
                {200: "Successfully retrieved the broadcaster’s list of custom rewards.", 400: "- The broadcaster_id query parameter is required.\n- The request exceeds the maximum number of id query parameters that you may specify.", 401: "- The Authorization header must specify a user access token.\n- The user access token must include the channel:read:redemptions scope.\n- The OAuth token is not valid.\n- The ID in the Client-Id header must match the Client ID in the OAuth token.", 403: "- The broadcaster is not a partner or affiliate.", 404: "- All of the custom rewards specified using the id query parameter were not found.", 500: ""}
            );
        },
        /**
         * @typedef GetCustomRewardRedemptionResponse_Data_Reward
         * @prop {string} id The ID that uniquely identifies the redeemed reward.
         * @prop {string} title The reward’s title.
         * @prop {string} prompt The prompt displayed to the viewer if user input is required.
         * @prop {number} cost The reward’s cost, in Channel Points.
         */
        /**
         * @typedef GetCustomRewardRedemptionResponse_Data
         * @prop {string} broadcasterId The ID that uniquely identifies the broadcaster.
         * @prop {string} broadcasterLogin The broadcaster’s login name.
         * @prop {string} broadcasterName The broadcaster’s display name.
         * @prop {string} id The ID that uniquely identifies this redemption.
         * @prop {string} userLogin The user’s login name.
         * @prop {string} userId The ID that uniquely identifies the user that redeemed the reward.
         * @prop {string} userName The user’s display name.
         * @prop {string} userInput The text the user entered at the prompt when they redeemed the reward; otherwise, an empty string if user input was not required.
         * @prop {"CANCELED"|"FULFILLED"|"UNFULFILLED"} status The state of the redemption. Possible values are:
         *
         * - CANCELED
         *
         * - FULFILLED
         *
         * - UNFULFILLED
         * @prop {string} redeemedAt The date and time of when the reward was redeemed, in RFC3339 format.
         * @prop {GetCustomRewardRedemptionResponse_Data_Reward} reward The reward that the user redeemed.
         */
        /**
         * @typedef GetCustomRewardRedemptionResponse
         * @prop {GetCustomRewardRedemptionResponse_Data[]} data The list of redemptions for the specified reward. The list is empty if there are no redemptions that match the redemption criteria.
         */
        /**
         * Gets a list of redemptions for a custom reward.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-custom-reward-redemption)
         *
         * ---
         * Gets a list of redemptions for the specified custom reward. The app used to create the reward is the only app that may get the redemptions.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `channel:read:redemptions`, `channel:manage:redemptions`
         *
         * ---
         * *Examples*: 
         * 
         * Gets the list of redemptions that were canceled for the specified reward.: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/channel_points/custom_rewards/redemptions?broadcaster_id=274637212&reward_id=92af127c-7326-4483-a52b-b0da0be61c01&status=CANCELED' \
         * -H 'Client-Id: gx2pv4208cff0ig9ou7nk3riccffxt' \
         * -H 'Authorization: Bearer vjxv3i0l4zxru966wsnwji51tmpkj2'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "broadcaster_name": "torpedo09",
         *       "broadcaster_login": "torpedo09",
         *       "broadcaster_id": "274637212",
         *       "id": "17fa2df1-ad76-4804-bfa5-a40ef63efe63",
         *       "user_login": "torpedo09",
         *       "user_id": "274637212",
         *       "user_name": "torpedo09",
         *       "user_input": "",
         *       "status": "CANCELED",
         *       "redeemed_at": "2020-07-01T18:37:32Z",
         *       "reward": {
         *         "id": "92af127c-7326-4483-a52b-b0da0be61c01",
         *         "title": "game analysis",
         *         "prompt": "",
         *         "cost": 50000
         *       }
         *     }
         *   ],
         *   "pagination": {
         *       "cursor": "eyJiIjpudWxsLCJhIjp7IkN1cnNvciI6Ik1UZG1ZVEprWmpFdFlXUTNOaTAwT0RBMExXSm1ZVFV0WVRRd1pXWTJNMlZtWlRZelgxOHlNREl3TFRBM0xUQXhWREU0T2pNM09qTXlMakl6TXpFeU56RTFOMW89In19"
         *   }
         * }
         * ```
         *
         * ---
         * Gets redemptions by ID.: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/channel_points/custom_rewards/redemptions?broadcaster_id=274637212&reward_id=92af127c-7326-4483-a52b-b0da0be61c01&id=17fa2df1-ad76-4804-bfa5-a40ef63efe63' \
         * -H 'Client-Id: gx2pv4208cff0ig9ou7nk3riccffxt' \
         * -H 'Authorization: Bearer vjxv3i0l4zxru966wsnwji51tmpkj2'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 2: 
         * ```
         * {
         *   "data": [
         *     {
         *       "broadcaster_name": "torpedo09",
         *       "broadcaster_login": "torpedo09",
         *       "broadcaster_id": "274637212",
         *       "id": "17fa2df1-ad76-4804-bfa5-a40ef63efe63",
         *       "user_id": "274637212",
         *       "user_name": "torpedo09",
         *       "user_input": "",
         *       "status": "CANCELED",
         *       "redeemed_at": "2020-07-01T18:37:32Z",
         *       "reward": {
         *         "id": "92af127c-7326-4483-a52b-b0da0be61c01",
         *         "title": "game analysis",
         *         "prompt": "",
         *         "cost": 50000
         *       }
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster that owns the custom reward. This ID must match the user ID found in the user OAuth token.
         * @param {string} rewardId The ID that identifies the custom reward whose redemptions you want to get.
         * @param {"CANCELED"|"FULFILLED"|"UNFULFILLED"} status The status of the redemptions to return. The possible case-sensitive values are:
         *
         * - CANCELED
         *
         * - FULFILLED
         *
         * - UNFULFILLED
         *
         * *NOTE*: This field is required only if you don’t specify the id query parameter.*NOTE*: Canceled and fulfilled redemptions are returned for only a few days after they’re canceled or fulfilled.
         * @param {string?} id A list of IDs to filter the redemptions by. To specify more than one ID, include this parameter for each redemption you want to get. For example, `id=1234&id=5678`. You may specify a maximum of 50 IDs.Duplicate IDs are ignored. The response contains only the IDs that were found. If none of the IDs were found, the response is 404 Not Found.
         * @param {"OLDEST"|"NEWEST"?} sort The order to sort redemptions by. The possible case-sensitive values are:
         *
         * - OLDEST
         *
         * - NEWEST
         *
         * The default is OLDEST.
         * @param {string?} after The cursor used to get the next page of results. The *Pagination* object in the response contains the cursor’s value. [Read more](https://dev.twitch.tv/docs/api/guide#pagination)
         * @param {number?} first The maximum number of redemptions to return per page in the response. The minimum page size is 1 redemption per page and the maximum is 50. The default is 20.
         * @returns {Promise<GetCustomRewardRedemptionResponse>} 
         */
        getCustomRewardRedemption(broadcasterId, rewardId, status, id=null, sort=null, after=null, first=null) {
            return reqFunc("https://api.twitch.tv/helix/channel_points/custom_rewards/redemptions",
                ["channel:read:redemptions", "channel:manage:redemptions"],
                ["user"],
                {broadcaster_id: broadcasterId, reward_id: rewardId, status: status, id: id, sort: sort, after: after, first: first},
                {},
                {200: "Successfully retrieved the list of redeemed custom rewards.", 400: "- The broadcaster_id query parameter is required.\n- The reward_id query parameter is required.\n- The status query parameter is required if you didn't specify the id query parameter.\n- The value in the status query parameter is not valid.\n- The value in the sort query parameter is not valid.", 401: "- The Authorization header is required and must specify a user access token.\n- The user access token must include the channel:read:redemptions scope.\n- The OAuth token is not valid.\n- The ID in the Client-Id header must match the Client ID in the OAuth token.", 403: "- The ID in the Client-Id header must match the client ID used to create the custom reward.\n- The broadcaster is not a partner or affiliate.", 404: "- All of the redemptions specified using the id query parameter were not found.", 500: ""}
            );
        },
        /**
         * @typedef UpdateCustomRewardResponse_Data_Image
         * @prop {string} url1x The URL to a small version of the image.
         * @prop {string} url2x The URL to a medium version of the image.
         * @prop {string} url4x The URL to a large version of the image.
         */
        /**
         * @typedef UpdateCustomRewardResponse_Data_Default_image
         * @prop {string} url1x The URL to a small version of the image.
         * @prop {string} url2x The URL to a medium version of the image.
         * @prop {string} url4x The URL to a large version of the image.
         */
        /**
         * @typedef UpdateCustomRewardResponse_Data_Max_per_stream_setting
         * @prop {boolean} isEnabled A Boolean value that determines whether the reward applies a limit on the number of redemptions allowed per live stream. Is *true* if the reward applies a limit.
         * @prop {number} maxPerStream The maximum number of redemptions allowed per live stream.
         */
        /**
         * @typedef UpdateCustomRewardResponse_Data_Max_per_user_per_stream_setting
         * @prop {boolean} isEnabled A Boolean value that determines whether the reward applies a limit on the number of redemptions allowed per user per live stream. Is *true* if the reward applies a limit.
         * @prop {number} maxPerUserPerStream The maximum number of redemptions allowed per user per live stream.
         */
        /**
         * @typedef UpdateCustomRewardResponse_Data_Global_cooldown_setting
         * @prop {boolean} isEnabled A Boolean value that determines whether to apply a cooldown period. Is *true* if a cooldown period is enabled.
         */
        /**
         * @typedef UpdateCustomRewardResponse_Data
         * @prop {string} broadcasterId The ID that uniquely identifies the broadcaster.
         * @prop {string} broadcasterLogin The broadcaster’s login name.
         * @prop {string} broadcasterName The broadcaster’s display name.
         * @prop {string} id The ID that uniquely identifies this custom reward.
         * @prop {string} title The title of the reward.
         * @prop {string} prompt The prompt shown to the viewer when they redeem the reward if user input is required. See the `is_user_input_required` field.
         * @prop {number} cost The cost of the reward in Channel Points.
         * @prop {UpdateCustomRewardResponse_Data_Image} image A set of custom images for the reward. This field is *null* if the broadcaster didn’t upload images.
         * @prop {UpdateCustomRewardResponse_Data_Default_image} defaultImage A set of default images for the reward.
         * @prop {string} backgroundColor The background color to use for the reward. The color is in Hex format (for example, #00E5CB).
         * @prop {boolean} isEnabled A Boolean value that determines whether the reward is enabled. Is *true* if enabled; otherwise, *false*. Disabled rewards aren’t shown to the user.
         * @prop {boolean} isUserInputRequired A Boolean value that determines whether the user must enter information when they redeem the reward. Is *true* if the user is prompted.
         * @prop {UpdateCustomRewardResponse_Data_Max_per_stream_setting} maxPerStreamSetting The settings used to determine whether to apply a maximum to the number of redemptions allowed per live stream.
         * @prop {UpdateCustomRewardResponse_Data_Max_per_user_per_stream_setting} maxPerUserPerStreamSetting The settings used to determine whether to apply a maximum to the number of redemptions allowed per user per live stream.
         * @prop {UpdateCustomRewardResponse_Data_Global_cooldown_setting} globalCooldownSetting The settings used to determine whether to apply a cooldown period between redemptions and the length of the cooldown.
         * @prop {number} globalCooldownSeconds The cooldown period, in seconds.
         * @prop {boolean} isPaused A Boolean value that determines whether the reward is currently paused. Is *true* if the reward is paused. Viewers can’t redeem paused rewards.
         * @prop {boolean} isInStock A Boolean value that determines whether the reward is currently in stock. Is *true* if the reward is in stock. Viewers can’t redeem out of stock rewards.
         * @prop {boolean} shouldRedemptionsSkipRequestQueue A Boolean value that determines whether redemptions should be set to FULFILLED status immediately when a reward is redeemed. If *false*, status is set to UNFULFILLED and follows the normal request queue process.
         * @prop {number} redemptionsRedeemedCurrentStream The number of redemptions redeemed during the current live stream. The number counts against the `max_per_stream_setting` limit. This field is *null* if the broadcaster’s stream isn’t live or max_per_stream_setting isn’t enabled.
         * @prop {string} cooldownExpiresAt The timestamp of when the cooldown period expires. Is *null* if the reward isn’t in a cooldown state. See the `global_cooldown_setting` field.
         */
        /**
         * @typedef UpdateCustomRewardResponse
         * @prop {UpdateCustomRewardResponse_Data[]} data The list contains the single reward that you updated.
         */
        /**
         * Updates a custom reward.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#update-custom-reward)
         *
         * ---
         *  The app used to create the reward is the only app that may update the reward.
         *
         * ---
         * *Info*: 
         * 
         * The body of the request should contain only the fields you’re updating.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `channel:manage:redemptions`
         *
         * ---
         * *Examples*: 
         * 
         * Disables the specified custom reward.: 
         * ```
         * curl -X PATCH 'https://api.twitch.tv/helix/channel_points/custom_rewards?broadcaster_id=274637212&id=92af127c-7326-4483-a52b-b0da0be61c01' \
         * -H 'client-id: gx2pv4208cff0ig9ou7nk3riccffxt' \
         * -H 'Authorization: Bearer vjxv3i0l4zxru966wsnwji51tmpkj2' \
         * -H 'Content-Type: application/json' \
         * -d '{
         *   "is_enabled": false
         *  }'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "broadcaster_name": "torpedo09",
         *       "broadcaster_login": "torpedo09",
         *       "broadcaster_id": "274637212",
         *       "id": "92af127c-7326-4483-a52b-b0da0be61c01",
         *       "image": null,
         *       "background_color": "#00E5CB",
         *       "is_enabled": false,
         *       "cost": 30000,
         *       "title": "game analysis 2v2",
         *       "prompt": "",
         *       "is_user_input_required": false,
         *       "max_per_stream_setting": {
         *         "is_enabled": true,
         *         "max_per_stream": 60
         *       },
         *       "max_per_user_per_stream_setting": {
         *         "is_enabled": false,
         *         "max_per_user_per_stream": 0
         *       },
         *       "global_cooldown_setting": {
         *         "is_enabled": false,
         *         "global_cooldown_seconds": 0
         *       },
         *       "is_paused": false,
         *       "is_in_stock": false,
         *       "default_image": {
         *         "url_1x": "https://static-cdn.jtvnw.net/custom-reward-images/default-1.png",
         *         "url_2x": "https://static-cdn.jtvnw.net/custom-reward-images/default-2.png",
         *         "url_4x": "https://static-cdn.jtvnw.net/custom-reward-images/default-4.png"
         *       },
         *       "should_redemptions_skip_request_queue": true,
         *       "redemptions_redeemed_current_stream": 60,
         *       "cooldown_expires_at": null
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * Updates the reward’s title.: 
         * ```
         * curl -X PATCH 'https://api.twitch.tv/helix/channel_points/custom_rewards?broadcaster_id=274637212&id=92af127c-7326-4483-a52b-b0da0be61c01' \
         * -H 'client-id: gx2pv4208cff0ig9ou7nk3riccffxt' \
         * -H 'Authorization: Bearer vjxv3i0l4zxru966wsnwji51tmpkj2' \
         * -H 'Content-Type: application/json' \
         * -d '{
         *   "title": "game analysis 2v2"
         *  }'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 2: 
         * ```
         * {
         *   "data": [
         *     {
         *       "broadcaster_name": "torpedo09",
         *       "broadcaster_login": "torpedo09",
         *       "broadcaster_id": "274637212",
         *       "id": "92af127c-7326-4483-a52b-b0da0be61c01",
         *       "image": null,
         *       "background_color": "",
         *       "is_enabled": false,
         *       "cost": 30000,
         *       "title": "game analysis 2v2",
         *       "prompt": "",
         *       "is_user_input_required": false,
         *       "max_per_stream_setting": {
         *         "is_enabled": true,
         *         "max_per_stream": 60
         *       },
         *       "max_per_user_per_stream_setting": {
         *         "is_enabled": false,
         *         "max_per_user_per_stream": 0
         *       },
         *       "global_cooldown_setting": {
         *         "is_enabled": false,
         *         "global_cooldown_seconds": 0
         *       },
         *       "is_paused": false,
         *       "is_in_stock": true,
         *       "default_image": {
         *         "url_1x": "https://static-cdn.jtvnw.net/custom-reward-images/default-1.png",
         *         "url_2x": "https://static-cdn.jtvnw.net/custom-reward-images/default-2.png",
         *         "url_4x": "https://static-cdn.jtvnw.net/custom-reward-images/default-4.png"
         *       },
         *       "should_redemptions_skip_request_queue": true,
         *       "redemptions_redeemed_current_stream": 60,
         *       "cooldown_expires_at": null
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster that’s updating the reward. This ID must match the user ID found in the OAuth token.
         * @param {string} id The ID of the reward to update.
         * @param {string?} title The reward’s title. The title may contain a maximum of 45 characters and it must be unique amongst all of the broadcaster’s custom rewards.
         * @param {string?} prompt The prompt shown to the viewer when they redeem the reward. Specify a prompt if `is_user_input_required` is *true*. The prompt is limited to a maximum of 200 characters.
         * @param {number?} cost The cost of the reward, in channel points. The minimum is 1 point.
         * @param {string?} backgroundColor The background color to use for the reward. Specify the color using Hex format (for example, \#00E5CB).
         * @param {boolean?} isEnabled A Boolean value that indicates whether the reward is enabled. Set to *true* to enable the reward. Viewers see only enabled rewards.
         * @param {boolean?} isUserInputRequired A Boolean value that determines whether users must enter information to redeem the reward. Set to *true* if user input is required. See the `prompt` field.
         * @param {boolean?} isMaxPerStreamEnabled A Boolean value that determines whether to limit the maximum number of redemptions allowed per live stream (see the `max_per_stream` field). Set to *true* to limit redemptions.
         * @param {number?} maxPerStream The maximum number of redemptions allowed per live stream. Applied only if `is_max_per_stream_enabled` is *true*. The minimum value is 1.
         * @param {boolean?} isMaxPerUserPerStreamEnabled A Boolean value that determines whether to limit the maximum number of redemptions allowed per user per stream (see `max_per_user_per_stream`). The minimum value is 1. Set to *true* to limit redemptions.
         * @param {number?} maxPerUserPerStream The maximum number of redemptions allowed per user per stream. Applied only if `is_max_per_user_per_stream_enabled` is *true*.
         * @param {boolean?} isGlobalCooldownEnabled A Boolean value that determines whether to apply a cooldown period between redemptions. Set to *true* to apply a cooldown period. For the duration of the cooldown period, see `global_cooldown_seconds`.
         * @param {number?} globalCooldownSeconds The cooldown period, in seconds. Applied only if `is_global_cooldown_enabled` is *true*. The minimum value is 1; however, for it to be shown in the Twitch UX, the minimum value is 60.
         * @param {boolean?} isPaused A Boolean value that determines whether to pause the reward. Set to *true* to pause the reward. Viewers can’t redeem paused rewards..
         * @param {boolean?} shouldRedemptionsSkipRequestQueue A Boolean value that determines whether redemptions should be set to FULFILLED status immediately when a reward is redeemed. If *false*, status is set to UNFULFILLED and follows the normal request queue process.
         * @returns {Promise<UpdateCustomRewardResponse>} 
         */
        updateCustomReward(broadcasterId, id, title=null, prompt=null, cost=null, backgroundColor=null, isEnabled=null, isUserInputRequired=null, isMaxPerStreamEnabled=null, maxPerStream=null, isMaxPerUserPerStreamEnabled=null, maxPerUserPerStream=null, isGlobalCooldownEnabled=null, globalCooldownSeconds=null, isPaused=null, shouldRedemptionsSkipRequestQueue=null) {
            return reqFunc("https://api.twitch.tv/helix/channel_points/custom_rewards",
                ["channel:manage:redemptions"],
                ["user"],
                {broadcaster_id: broadcasterId, id: id},
                {title: title, prompt: prompt, cost: cost, background_color: backgroundColor, is_enabled: isEnabled, is_user_input_required: isUserInputRequired, is_max_per_stream_enabled: isMaxPerStreamEnabled, max_per_stream: maxPerStream, is_max_per_user_per_stream_enabled: isMaxPerUserPerStreamEnabled, max_per_user_per_stream: maxPerUserPerStream, is_global_cooldown_enabled: isGlobalCooldownEnabled, global_cooldown_seconds: globalCooldownSeconds, is_paused: isPaused, should_redemptions_skip_request_queue: shouldRedemptionsSkipRequestQueue},
                {200: "Successfully updated the custom reward.", 400: "ul>\n- The broadcaster_id query parameter is required.\n- The id query parameter is required.\n- The `title` must contain a minimum of 1 character and a maximum of 45 characters.\n- The `title` must be unique amongst all of the broadcaster's custom rewards.\n- The `cost` field must contain a minimum of 1 point.\n- The `prompt` field is limited to a maximum of 200 characters.\n- If `is_max_per_stream_enabled` is true, the minimum value for `max_per_stream` is 1.\n- If `is_max_per_user_per_stream_enabled` is true, the minimum value for `max_per_user_per_stream` is 1.\n- If `is_global_cooldown_enabled` is true, the minimum value for `global_cooldown_seconds` is 1 and the maximum is 604800.", 401: "- The Authorization header is required and must specify a user access token.\n- The user access token must include the channel:manage:redemptions scope.\n- The OAuth token is not valide.\n- The ID in the Client-Id header must match the Client ID in the OAuth token.", 403: "- The ID in the Client-Id header must match the client ID used to create the custom reward.\n- The broadcaster is not a partner or affiliate.", 404: "- The custom reward specified in the id query parameter was not found.", 500: ""}
            );
        },
        /**
         * @typedef UpdateRedemptionStatusResponse_Data_Reward
         * @prop {string} id The ID that uniquely identifies the reward.
         * @prop {string} title The reward’s title.
         * @prop {string} prompt The prompt displayed to the viewer if user input is required.
         * @prop {number} cost The reward’s cost, in Channel Points.
         */
        /**
         * @typedef UpdateRedemptionStatusResponse_Data
         * @prop {string} broadcasterId The ID that uniquely identifies the broadcaster.
         * @prop {string} broadcasterLogin The broadcaster’s login name.
         * @prop {string} broadcasterName The broadcaster’s display name.
         * @prop {string} id The ID that uniquely identifies this redemption..
         * @prop {string} userId The ID of the user that redeemed the reward.
         * @prop {string} userName The user’s display name.
         * @prop {string} userLogin The user’s login name.
         * @prop {UpdateRedemptionStatusResponse_Data_Reward} reward An object that describes the reward that the user redeemed.
         * @prop {string} userInput The text that the user entered at the prompt when they redeemed the reward; otherwise, an empty string if user input was not required.
         * @prop {"CANCELED"|"FULFILLED"|"UNFULFILLED"} status The state of the redemption. Possible values are:
         *
         * - CANCELED
         *
         * - FULFILLED
         *
         * - UNFULFILLED
         * @prop {string} redeemedAt The date and time of when the reward was redeemed, in RFC3339 format.
         */
        /**
         * @typedef UpdateRedemptionStatusResponse
         * @prop {UpdateRedemptionStatusResponse_Data[]} data The list contains the single redemption that you updated.
         */
        /**
         * Updates a redemption’s status.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#update-redemption-status)
         *
         * ---
         *  You may update a redemption only if its status is UNFULFILLED. The app used to create the reward is the only app that may update the redemption.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `channel:manage:redemptions`
         *
         * ---
         * *Examples*: 
         * 
         * Updates a redemption’s status.: 
         * ```
         * curl -X PATCH 'https://api.twitch.tv/helix/channel_points/custom_rewards/redemptions?broadcaster_id=274637212&reward_id=92af127c-7326-4483-a52b-b0da0be61c01&id=17fa2df1-ad76-4804-bfa5-a40ef63efe63' \
         * -H 'Client-Id: gx2pv4208cff0ig9ou7nk3riccffxt' \
         * -H 'Authorization: Bearer vjxv3i0l4zxru966wsnwji51tmpkj2' \
         * -H 'Content-Type: application/json' \
         * -d '{
         *   "status": "CANCELED"
         * }'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "broadcaster_name": "torpedo09",
         *       "broadcaster_login": "torpedo09",
         *       "broadcaster_id": "274637212",
         *       "id": "17fa2df1-ad76-4804-bfa5-a40ef63efe63",
         *       "user_id": "274637212",
         *       "user_name": "torpedo09",
         *       "user_login": "torpedo09",
         *       "user_input": "",
         *       "status": "CANCELED",
         *       "redeemed_at": "2020-07-01T18:37:32Z",
         *       "reward": {
         *         "id": "92af127c-7326-4483-a52b-b0da0be61c01",
         *         "title": "game analysis",
         *         "prompt": "",
         *         "cost": 50000
         *       }
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @param {string} id A list of IDs that identify the redemptions to update. To specify more than one ID, include this parameter for each redemption you want to update. For example, `id=1234&id=5678`. You may specify a maximum of 50 IDs.
         * @param {string} broadcasterId The ID of the broadcaster that’s updating the redemption. This ID must match the user ID in the user access token.
         * @param {string} rewardId The ID that identifies the reward that’s been redeemed.
         * @param {"CANCELED"|"FULFILLED"} status The status to set the redemption to. Possible values are:
         *
         * - CANCELED
         *
         * - FULFILLED
         *
         * Setting the status to CANCELED refunds the user’s channel points.
         * @returns {Promise<UpdateRedemptionStatusResponse>} 
         */
        updateRedemptionStatus(id, broadcasterId, rewardId, status) {
            return reqFunc("https://api.twitch.tv/helix/channel_points/custom_rewards/redemptions",
                ["channel:manage:redemptions"],
                ["user"],
                {id: id, broadcaster_id: broadcasterId, reward_id: rewardId},
                {status: status},
                {200: "Successfully updated the redemption’s status.", 400: "- The broadcaster_id query parameter is required.\n- The reward_id query parameter is required.\n- The id query parameter is required.\n- The value in the status query parameter is not valid.", 401: "- The Authorization header is required and must specify a user access token.\n- The user access token must include the channel:manage:redemptions scope.\n- The OAuth token is not valid.\n- The ID in the Client-Id header must match the Client ID in the OAuth token.", 403: "- The ID in the Client-Id header must match the client ID used to create the custom reward.\n- The broadcaster is not a partner or affiliate.", 404: "- The custom reward specified in the reward_id query parameter was not found.\n- The redemptions specified using the id query parameter were not found or their statuses weren't marked as UNFULFILLED.", 500: ""}
            );
        },
    },
    Charity: {
        /**
         * @typedef GetCharityCampaignResponse_Data_Current_amount
         * @prop {number} value The monetary amount. The amount is specified in the currency’s minor unit. For example, the minor units for USD is cents, so if the amount is $5.50 USD, `value` is set to 550.
         * @prop {number} decimalPlaces The number of decimal places used by the currency. For example, USD uses two decimal places. Use this number to translate `value` from minor units to major units by using the formula:`value / 10^decimal_places`
         * @prop {string} currency The ISO-4217 three-letter currency code that identifies the type of currency in `value`.
         */
        /**
         * @typedef GetCharityCampaignResponse_Data_Target_amount
         * @prop {number} value The monetary amount. The amount is specified in the currency’s minor unit. For example, the minor units for USD is cents, so if the amount is $5.50 USD, `value` is set to 550.
         * @prop {number} decimalPlaces The number of decimal places used by the currency. For example, USD uses two decimal places. Use this number to translate `value` from minor units to major units by using the formula:`value / 10^decimal_places`
         * @prop {string} currency The ISO-4217 three-letter currency code that identifies the type of currency in `value`.
         */
        /**
         * @typedef GetCharityCampaignResponse_Data
         * @prop {string} id An ID that identifies the charity campaign.
         * @prop {string} broadcasterId An ID that identifies the broadcaster that’s running the campaign.
         * @prop {string} broadcasterLogin The broadcaster’s login name.
         * @prop {string} broadcasterName The broadcaster’s display name.
         * @prop {string} charityName The charity’s name.
         * @prop {string} charityDescription A description of the charity.
         * @prop {string} charityLogo A URL to an image of the charity’s logo. The image’s type is PNG and its size is 100px X 100px.
         * @prop {string} charityWebsite A URL to the charity’s website.
         * @prop {GetCharityCampaignResponse_Data_Current_amount} currentAmount The current amount of donations that the campaign has received.
         * @prop {GetCharityCampaignResponse_Data_Target_amount} targetAmount The campaign’s fundraising goal. This field is *null* if the broadcaster has not defined a fundraising goal.
         */
        /**
         * @typedef GetCharityCampaignResponse
         * @prop {GetCharityCampaignResponse_Data[]} data A list that contains the charity campaign that the broadcaster is currently running. The list is empty if the broadcaster is not running a charity campaign; the campaign information is not available after the campaign ends.
         */
        /**
         * Gets information about the broadcaster’s active charity campaign.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-charity-campaign)
         *
         * ---
         * Gets information about the charity campaign that a broadcaster is running. For example, the campaign’s fundraising goal and the current amount of donations.
         *
         * To receive events when progress is made towards the campaign’s goal or the broadcaster changes the fundraising goal, subscribe to the [channel.charity_campaign.progress](https://dev.twitch.tv/docs/eventsub/eventsub-subscription-types#channelcharity_campaignprogress) subscription type.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `channel:read:charity`
         *
         * ---
         * *Examples*: 
         * 
         * Gets the broadcaster’s active charity campaign.: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/charity/campaigns?broadcaster_id=123456' \
         * -H 'Authorization: Bearer kpvy3cjboyptmiacwr0c19hotn5s' \
         * -H 'Client-Id: hof5gwx0su6owfn0nyan9c87zr6t'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "id": "123-abc-456-def",
         *       "broadcaster_id": "123456",
         *       "broadcaster_name": "SunnySideUp",
         *       "broadcaster_login": "sunnysideup",
         *       "charity_name": "Example name",
         *       "charity_description": "Example description",
         *       "charity_logo": "https://abc.cloudfront.net/ppgf/1000/100.png",
         *       "charity_website": "https://www.example.com",
         *       "current_amount": {
         *         "value": 86000,
         *         "decimal_places": 2,
         *         "currency": "USD"
         *       },
         *       "target_amount": {
         *         "value": 1500000,
         *         "decimal_places": 2,
         *         "currency": "USD"
         *       }
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster that’s currently running a charity campaign. This ID must match the user ID in the access token.
         * @returns {Promise<GetCharityCampaignResponse>} 
         */
        getCharityCampaign(broadcasterId) {
            return reqFunc("https://api.twitch.tv/helix/charity/campaigns",
                ["channel:read:charity"],
                ["user"],
                {broadcaster_id: broadcasterId},
                {},
                {200: "Successfully retrieved information about the broadcaster’s active charity campaign.", 400: "- The broadcaster_id query parameter is required.\n- The broadcaster_id query parameter is not valid.", 401: "- The ID in the broadcaster_id query parameter must match the user ID in the access token.\n- The Authorization header is required and must contain a user access token.\n- The user access token must include the channel:read:charity scope.\n- The access token is not valid.\n- The client ID specified in the Client-Id header must match the client ID specified in the access token.", 403: "- The broadcaster is not a partner or affiliate."}
            );
        },
        /**
         * @typedef GetCharityCampaignDonationsResponse_Data_Amount
         * @prop {number} value The monetary amount. The amount is specified in the currency’s minor unit. For example, the minor units for USD is cents, so if the amount is $5.50 USD, `value` is set to 550.
         * @prop {number} decimalPlaces The number of decimal places used by the currency. For example, USD uses two decimal places. Use this number to translate `value` from minor units to major units by using the formula:`value / 10^decimal_places`
         * @prop {string} currency The ISO-4217 three-letter currency code that identifies the type of currency in `value`.
         */
        /**
         * @typedef GetCharityCampaignDonationsResponse_Data
         * @prop {string} id An ID that identifies the donation. The ID is unique across campaigns.
         * @prop {string} campaignId An ID that identifies the charity campaign that the donation applies to.
         * @prop {string} userId An ID that identifies a user that donated money to the campaign.
         * @prop {string} userLogin The user’s login name.
         * @prop {string} userName The user’s display name.
         * @prop {GetCharityCampaignDonationsResponse_Data_Amount} amount An object that contains the amount of money that the user donated.
         */
        /**
         * @typedef GetCharityCampaignDonationsResponse_Pagination
         * @prop {string} cursor The cursor used to get the next page of results. Use the cursor to set the request’s after query parameter.
         */
        /**
         * @typedef GetCharityCampaignDonationsResponse
         * @prop {GetCharityCampaignDonationsResponse_Data[]} data A list that contains the donations that users have made to the broadcaster’s charity campaign. The list is empty if the broadcaster is not currently running a charity campaign; the donation information is not available after the campaign ends.
         * @prop {GetCharityCampaignDonationsResponse_Pagination} pagination An object that contains the information used to page through the list of results. The object is empty if there are no more pages left to page through. [Read More](https://dev.twitch.tv/docs/api/guide#pagination)
         */
        /**
         * Gets the list of donations that users have made to the broadcaster’s active charity campaign.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-charity-campaign-donations)
         *
         * ---
         * 
         *
         * To receive events as donations occur, subscribe to the [channel.charity_campaign.donate](https://dev.twitch.tv/docs/eventsub/eventsub-subscription-types#channelcharity_campaigndonate) subscription type.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `channel:read:charity`
         *
         * ---
         * *Examples*: 
         * 
         * Gets the broadcaster’s active charity campaign.: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/charity/donations?broadcaster_id=123456' \
         * -H 'Authorization: Bearer kpvy3cjboyptmiacwr0c19hotn5s' \
         * -H 'Client-Id: hof5gwx0su6owfn0nyan9c87zr6t'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "id": "a1b2c3-aabb-4455-d1e2f3",
         *       "campaign_id": "123-abc-456-def",
         *       "user_id": "5678",
         *       "user_login": "cool_user",
         *       "user_name": "Cool_User",
         *       "amount": {
         *         "value": 500,
         *         "decimal_places": 2,
         *         "currency": "USD"
         *       }
         *     },
         *     {
         *       "id": "z1y2x3-ccdd-6677-d1e2f3",
         *       "campaign_id": "123-abc-456-def",
         *       "user_id": "8765",
         *       "user_login": "cool_user2",
         *       "user_name": "Cool_User2",
         *       "amount": {
         *         "value": 10000,
         *         "decimal_places": 2,
         *         "currency": "USD"
         *       }
         *     },
         *     . . .
         *   ],
         *   "pagination" : {
         *       "cursor" : "eyJiIjpudWxsLCJhIjp7Ik9mZnNldCI6NX19"
         *   }
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster that’s currently running a charity campaign. This ID must match the user ID in the access token.
         * @param {number?} first The maximum number of items to return per page in the response. The minimum page size is 1 item per page and the maximum is 100. The default is 20.
         * @param {string?} after The cursor used to get the next page of results. The *Pagination* object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination)
         * @returns {Promise<GetCharityCampaignDonationsResponse>} 
         */
        getCharityCampaignDonations(broadcasterId, first=null, after=null) {
            return reqFunc("https://api.twitch.tv/helix/charity/donations",
                ["channel:read:charity"],
                ["user"],
                {broadcaster_id: broadcasterId, first: first, after: after},
                {},
                {200: "Successfully retrieved the list of donations that users contributed to the broadcaster’s charity campaign.", 400: "- The broadcaster_id query parameter is required.\n- The broadcaster_id query parameter is not valid.", 401: "- The ID in the broadcaster_id query parameter must match the user ID in the access token.\n- The Authorization header is required and must contain a user access token.\n- The user access token must include the channel:read:charity scope.\n- The access token is not valid.\n- The client ID specified in the Client-Id header must match the client ID specified in the access token.", 403: "- The broadcaster is not a partner or affiliate."}
            );
        },
    },
    Chat: {
        /**
         * @typedef GetChattersResponse_Data
         * @prop {string} userId The ID of a user that’s connected to the broadcaster’s chat room.
         * @prop {string} userLogin The user’s login name.
         * @prop {string} userName The user’s display name.
         */
        /**
         * @typedef GetChattersResponse_Pagination
         * @prop {string} cursor The cursor used to get the next page of results. Use the cursor to set the request’s after query parameter.
         */
        /**
         * @typedef GetChattersResponse
         * @prop {GetChattersResponse_Data[]} data The list of users that are connected to the broadcaster’s chat room. The list is empty if no users are connected to the chat room.
         * @prop {GetChattersResponse_Pagination} pagination Contains the information used to page through the list of results. The object is empty if there are no more pages left to page through. [Read More](https://dev.twitch.tv/docs/api/guide#pagination)
         * @prop {number} total The total number of users that are connected to the broadcaster’s chat room. As you page through the list, the number of users may change as users join and leave the chat room.
         */
        /**
         * Gets the list of users that are connected to the broadcaster’s chat session.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-chatters)
         *
         * ---
         * 
         *
         * *NOTE*: There is a delay between when users join and leave a chat and when the list is updated accordingly.
         *
         * To determine whether a user is a moderator or VIP, use the [Get Moderators](https://dev.twitch.tv/docs/api/reference#get-moderators) and [Get VIPs](https://dev.twitch.tv/docs/api/reference#get-vips) endpoints. You can check the roles of up to 100 users.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `moderator:read:chatters`
         *
         * ---
         * *Examples*: 
         * 
         * Gets the list of users that are connected to the specified broadcaster’s chat room.: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/chat/chatters?broadcaster_id=123456&moderator_id=654321' \
         * -H 'Authorization: Bearer kpvy3cjboyptmiacwr0c19hotn5s' \
         * -H 'Client-Id: hof5gwx0su6owfn0nyan9c87zr6t'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "user_id": "128393656",
         *       "user_login": "smittysmithers",
         *       "user_name": "smittysmithers"
         *     },
         *     ...
         *   ],
         *   "pagination": {
         *     "cursor": "eyJiIjpudWxsLCJhIjp7Ik9mZnNldCI6NX19"
         *   },
         *   "total": 8
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster whose list of chatters you want to get.
         * @param {string} moderatorId The ID of the broadcaster or one of the broadcaster’s moderators. This ID must match the user ID in the user access token.
         * @param {number?} first The maximum number of items to return per page in the response. The minimum page size is 1 item per page and the maximum is 1,000. The default is 100.
         * @param {string?} after The cursor used to get the next page of results. The *Pagination* object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination)
         * @returns {Promise<GetChattersResponse>} 
         */
        getChatters(broadcasterId, moderatorId, first=null, after=null) {
            return reqFunc("https://api.twitch.tv/helix/chat/chatters",
                ["moderator:read:chatters"],
                ["user"],
                {broadcaster_id: broadcasterId, moderator_id: moderatorId, first: first, after: after},
                {},
                {200: "Successfully retrieved the broadcaster’s list of chatters.", 400: "- The broadcaster_id query parameter is required.\n- The ID in the broadcaster_id query parameter is not valid.\n- The moderator_id query parameter is required.\n- The ID in the moderator_id query parameter is not valid.", 401: "- The ID in the moderator_id query parameter must match the user ID in the access token.\n- The Authorization header is required and must contain a user access token.\n- The user access token must include the moderator:read:chatters scope.\n- The access token is not valid.\n- The client ID specified in the Client-Id header does not match the client ID specified in the access token.", 403: "- The user in the moderator_id query parameter is not one of the broadcaster's moderators."}
            );
        },
        /**
         * @typedef GetChannelEmotesResponse_Data_Images
         * @prop {string} url1x A URL to the small version (28px x 28px) of the emote.
         * @prop {string} url2x A URL to the medium version (56px x 56px) of the emote.
         * @prop {string} url4x A URL to the large version (112px x 112px) of the emote.
         */
        /**
         * @typedef GetChannelEmotesResponse_Data
         * @prop {string} id An ID that identifies this emote.
         * @prop {string} name The name of the emote. This is the name that viewers type in the chat window to get the emote to appear.
         * @prop {GetChannelEmotesResponse_Data_Images} images The image URLs for the emote. These image URLs always provide a static, non-animated emote image with a light background.*NOTE:* You should use the templated URL in the `template` field to fetch the image instead of using these URLs.
         * @prop {string} tier The subscriber tier at which the emote is unlocked. This field contains the tier information only if `emote_type` is set to `subscriptions`, otherwise, it's an empty string.
         * @prop {"bitstier"|"follower"|"subscriptions"} emoteType The type of emote. The possible values are:
         *
         * - bitstier — A custom Bits tier emote.
         *
         * - follower — A custom follower emote.
         *
         * - subscriptions — A custom subscriber emote.
         * @prop {string} emoteSetId An ID that identifies the emote set that the emote belongs to.
         * @prop {"animated"|"static"} format The formats that the emote is available in. For example, if the emote is available only as a static PNG, the array contains only `static`. But if the emote is available as a static PNG and an animated GIF, the array contains `static` and `animated`. The possible formats are:
         *
         * - animated — An animated GIF is available for this emote.
         *
         * - static — A static PNG file is available for this emote.
         * @prop {"1.0"|"2.0"|"3.0"} scale The sizes that the emote is available in. For example, if the emote is available in small and medium sizes, the array contains 1.0 and 2.0. Possible sizes are:
         *
         * - 1.0 — A small version (28px x 28px) is available.
         *
         * - 2.0 — A medium version (56px x 56px) is available.
         *
         * - 3.0 — A large version (112px x 112px) is available.
         * @prop {"dark"|"light"} themeMode The background themes that the emote is available in. Possible themes are:
         *
         * - dark
         *
         * - light
         */
        /**
         * @typedef GetChannelEmotesResponse
         * @prop {GetChannelEmotesResponse_Data[]} data The list of emotes that the specified broadcaster created. If the broadcaster hasn't created custom emotes, the list is empty.
         * @prop {string} template A templated URL. Use the values from the `id`, `format`, `scale`, and `theme_mode` fields to replace the like-named placeholder strings in the templated URL to create a CDN (content delivery network) URL that you use to fetch the emote. For information about what the template looks like and how to use it to fetch emotes, see [Emote CDN URL format](https://dev.twitch.tv/docs/irc/emotes#cdn-template). You should use this template instead of using the URLs in the `images` object.
         */
        /**
         * Gets the broadcaster’s list of custom emotes.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-channel-emotes)
         *
         * ---
         *  Broadcasters create these custom emotes for users who subscribe to or follow the channel or cheer Bits in the channel’s chat window. [Learn More](https://dev.twitch.tv/docs/irc/emotes)
         *
         * For information about the custom emotes, see [subscriber emotes](https://help.twitch.tv/s/article/subscriber-emote-guide), [Bits tier emotes](https://help.twitch.tv/s/article/custom-bit-badges-guide?language=bg#slots), and [follower emotes](https://blog.twitch.tv/en/2021/06/04/kicking-off-10-years-with-our-biggest-emote-update-ever/).
         *
         * *NOTE:* With the exception of custom follower emotes, users may use custom emotes in any Twitch chat.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires an [app access token](https://dev.twitch.tv/docs/authentication#app-access-tokens) or a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens))
         *
         * ---
         * *Examples*: 
         * 
         * Gets custom emotes that the TwitchDev channel created.: 
         * ```
         * # Twitch CLI example that gets the custom emotes for the specified channel.
         * 
         * twitch api get /chat/emotes -q broadcaster_id=141981764
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "id": "304456832",
         *       "name": "twitchdevPitchfork",
         *       "images": {
         *         "url_1x": "https://static-cdn.jtvnw.net/emoticons/v2/304456832/static/light/1.0",
         *         "url_2x": "https://static-cdn.jtvnw.net/emoticons/v2/304456832/static/light/2.0",
         *         "url_4x": "https://static-cdn.jtvnw.net/emoticons/v2/304456832/static/light/3.0"
         *       },
         *       "tier": "1000",
         *       "emote_type": "subscriptions",
         *       "emote_set_id": "301590448",
         *       "format": [
         *         "static"
         *       ],
         *       "scale": [
         *         "1.0",
         *         "2.0",
         *         "3.0"
         *       ],
         *       "theme_mode": [
         *         "light",
         *         "dark"
         *       ]
         *     },
         *     ...
         *     {
         *       "id": "emotesv2_4c3b4ed516de493bbcd2df2f5d450f49",
         *       "name": "twitchdevHyperPitchfork",
         *       "images": {
         *         "url_1x": "https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_4c3b4ed516de493bbcd2df2f5d450f49/static/light/1.0",
         *         "url_2x": "https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_4c3b4ed516de493bbcd2df2f5d450f49/static/light/2.0",
         *         "url_4x": "https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_4c3b4ed516de493bbcd2df2f5d450f49/static/light/3.0"
         *       },
         *       "tier": "1000",
         *       "emote_type": "subscriptions",
         *       "emote_set_id": "318939165",
         *       "format": [
         *         "static",
         *         "animated"
         *       ],
         *       "scale": [
         *         "1.0",
         *         "2.0",
         *         "3.0"
         *       ],
         *       "theme_mode": [
         *         "light",
         *         "dark"
         *       ]
         *     },
         *   ],
         *   "template": "https://static-cdn.jtvnw.net/emoticons/v2/{{id}}/{{format}}/{{theme_mode}}/{{scale}}"
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId An ID that identifies the broadcaster whose emotes you want to get.
         * @returns {Promise<GetChannelEmotesResponse>} 
         */
        getChannelEmotes(broadcasterId) {
            return reqFunc("https://api.twitch.tv/helix/chat/emotes",
                [],
                ["app", "user"],
                {broadcaster_id: broadcasterId},
                {},
                {200: "Successfully retrieved broadcaster's list of custom emotes.", 400: "- The broadcaster_id query parameter is required.", 401: "- The Authorization header is required and must specify a valid app access token or user access token.\n- The OAuth token is not valid.\n- The ID in the Client-Id header must match the Client ID in the OAuth token."}
            );
        },
        /**
         * Gets all global emotes.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-global-emotes)
         *
         * ---
         * Gets the list of [global emotes](https://www.twitch.tv/creatorcamp/en/learn-the-basics/emotes/). Global emotes are Twitch-created emotes that users can use in any Twitch chat.
         *
         * [Learn More](https://dev.twitch.tv/docs/irc/emotes)
         *
         * ---
         * *Authentication*: 
         * 
         * Requires an [app access token](https://dev.twitch.tv/docs/authentication#app-access-tokens) or a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens))
         *
         * ---
         * *Examples*: 
         * 
         * Gets all global emotes.: 
         * ```
         * # Twitch CLI example that gets all global emotes.
         * 
         * twitch api get /chat/emotes/global
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "id": "196892",
         *       "name": "TwitchUnity",
         *       "images": {
         *         "url_1x": "https://static-cdn.jtvnw.net/emoticons/v2/196892/static/light/1.0",
         *         "url_2x": "https://static-cdn.jtvnw.net/emoticons/v2/196892/static/light/2.0",
         *         "url_4x": "https://static-cdn.jtvnw.net/emoticons/v2/196892/static/light/3.0"
         *       },
         *       "format": [
         *         "static"
         *       ],
         *       "scale": [
         *         "1.0",
         *         "2.0",
         *         "3.0"
         *       ],
         *       "theme_mode": [
         *         "light",
         *         "dark"
         *       ]
         *     },
         *     ...
         *   ],
         *   "template": "https://static-cdn.jtvnw.net/emoticons/v2/{{id}}/{{format}}/{{theme_mode}}/{{scale}}"
         * }
         * ```
         *
         * ---
         * @returns {Promise<void>} 
         */
        getGlobalEmotes() {
            return reqFunc("https://api.twitch.tv/helix/chat/emotes/global",
                [],
                ["app", "user"],
                {},
                {},
                {}
            );
        },
        /**
         * @typedef GetEmoteSetsResponse_Data_Images
         * @prop {string} url1x A URL to the small version (28px x 28px) of the emote.
         * @prop {string} url2x A URL to the medium version (56px x 56px) of the emote.
         * @prop {string} url4x A URL to the large version (112px x 112px) of the emote.
         */
        /**
         * @typedef GetEmoteSetsResponse_Data
         * @prop {string} id An ID that uniquely identifies this emote.
         * @prop {string} name The name of the emote. This is the name that viewers type in the chat window to get the emote to appear.
         * @prop {GetEmoteSetsResponse_Data_Images} images The image URLs for the emote. These image URLs always provide a static, non-animated emote image with a light background.*NOTE:* You should use the templated URL in the `template` field to fetch the image instead of using these URLs.
         * @prop {"bitstier"|"follower"|"subscriptions"} emoteType The type of emote. The possible values are: - bitstier — A Bits tier emote.
         *
         * - follower — A follower emote.
         *
         * - subscriptions — A subscriber emote.
         * @prop {string} emoteSetId An ID that identifies the emote set that the emote belongs to.
         * @prop {string} ownerId The ID of the broadcaster who owns the emote.
         * @prop {"animated"|"static"} format The formats that the emote is available in. For example, if the emote is available only as a static PNG, the array contains only `static`. But if the emote is available as a static PNG and an animated GIF, the array contains `static` and `animated`. The possible formats are: - animated — An animated GIF is available for this emote.
         *
         * - static — A static PNG file is available for this emote.
         * @prop {"1.0"|"2.0"|"3.0"} scale The sizes that the emote is available in. For example, if the emote is available in small and medium sizes, the array contains 1.0 and 2.0. Possible sizes are: - 1.0 — A small version (28px x 28px) is available.
         *
         * - 2.0 — A medium version (56px x 56px) is available.
         *
         * - 3.0 — A large version (112px x 112px) is available.
         * @prop {"dark"|"light"} themeMode The background themes that the emote is available in. Possible themes are: - dark
         *
         * - light
         */
        /**
         * @typedef GetEmoteSetsResponse
         * @prop {GetEmoteSetsResponse_Data[]} data The list of emotes found in the specified emote sets. The list is empty if none of the IDs were found. The list is in the same order as the set IDs specified in the request. Each set contains one or more emoticons.
         * @prop {string} template A templated URL. Use the values from the `id`, `format`, `scale`, and `theme_mode` fields to replace the like-named placeholder strings in the templated URL to create a CDN (content delivery network) URL that you use to fetch the emote. For information about what the template looks like and how to use it to fetch emotes, see [Emote CDN URL format](https://dev.twitch.tv/docs/irc/emotes#cdn-template). You should use this template instead of using the URLs in the `images` object.
         */
        /**
         * Gets emotes for one or more specified emote sets.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-emote-sets)
         *
         * ---
         * 
         *
         * An emote set groups emotes that have a similar context. For example, Twitch places all the subscriber emotes that a broadcaster uploads for their channel in the same emote set.
         *
         * [Learn More](https://dev.twitch.tv/docs/irc/emotes)
         *
         * ---
         * *Authentication*: 
         * 
         * Requires an [app access token](https://dev.twitch.tv/docs/authentication#app-access-tokens) or a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens))
         *
         * ---
         * *Examples*: 
         * 
         * Gets the emotes for the TwitchDev subscriber emote set.: 
         * ```
         * # Twitch CLI example that gets the emotes for the specified emote set.
         * 
         * twitch api get /chat/emotes/set -q emote_set_id=301590448
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "id": "304456832",
         *       "name": "twitchdevPitchfork",
         *       "images": {
         *         "url_1x": "https://static-cdn.jtvnw.net/emoticons/v2/304456832/static/light/1.0",
         *         "url_2x": "https://static-cdn.jtvnw.net/emoticons/v2/304456832/static/light/2.0",
         *         "url_4x": "https://static-cdn.jtvnw.net/emoticons/v2/304456832/static/light/3.0"
         *       },
         *       "emote_type": "subscriptions",
         *       "emote_set_id": "301590448",
         *       "owner_id": "141981764",
         *       "format": [
         *         "static"
         *       ],
         *       "scale": [
         *         "1.0",
         *         "2.0",
         *         "3.0"
         *       ],
         *       "theme_mode": [
         *         "light",
         *         "dark"
         *       ]
         *     },
         *     ...
         *   ],
         *   "template": "https://static-cdn.jtvnw.net/emoticons/v2/{{id}}/{{format}}/{{theme_mode}}/{{scale}}"
         * }
         * ```
         *
         * ---
         * @param {string} emoteSetId An ID that identifies the emote set to get. Include this parameter for each emote set you want to get. For example, `emote_set_id=1234&emote_set_id=5678`. You may specify a maximum of 25 IDs. The response contains only the IDs that were found and ignores duplicate IDs.To get emote set IDs, use the [Get Channel Emotes](#get-channel-emotes) API.
         * @returns {Promise<GetEmoteSetsResponse>} 
         */
        getEmoteSets(emoteSetId) {
            return reqFunc("https://api.twitch.tv/helix/chat/emotes/set",
                [],
                ["app", "user"],
                {emote_set_id: emoteSetId},
                {},
                {200: "Successfully retrieved the emotes for the specified emote sets.", 400: "- The emote_set_id query parameter is required.\n- The number of emote_set_id query parameters exceeds the maximum allowed.", 401: "- The Authorization header is required and must specify a valid app access token or user access token.\n- The OAuth token is not valid.\n- The ID in the Client-Id header must match the Client ID in the OAuth token."}
            );
        },
        /**
         * Gets the broadcaster’s list of custom chat badges.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-channel-chat-badges)
         *
         * ---
         *  The list is empty if the broadcaster hasn’t created custom chat badges. For information about custom badges, see [subscriber badges](https://help.twitch.tv/s/article/subscriber-badge-guide) and [Bits badges](https://help.twitch.tv/s/article/custom-bit-badges-guide).
         *
         * ---
         * *Authentication*: 
         * 
         * Requires an [app access token](https://dev.twitch.tv/docs/authentication#app-access-tokens) or a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens))
         *
         * ---
         * *Examples*: 
         * 
         * Get the list of custom chat badges that the BlueLava Twitch channel created.: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/chat/badges?broadcaster_id=135093069' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "set_id": "bits",
         *       "versions": [
         *         {
         *           "id": "1",
         *           "image_url_1x": "https://static-cdn.jtvnw.net/badges/v1/743a0f3b-84b3-450b-96a0-503d7f4a9764/1",
         *           "image_url_2x": "https://static-cdn.jtvnw.net/badges/v1/743a0f3b-84b3-450b-96a0-503d7f4a9764/2",
         *           "image_url_4x": "https://static-cdn.jtvnw.net/badges/v1/743a0f3b-84b3-450b-96a0-503d7f4a9764/3",
         *           "title": "cheer 1",
         *           "description": "cheer 1"
         *           "click_action": "visit_url",
         *           "click_url": "https://bits.twitch.tv"
         *         }
         *       ]
         *     },
         *     {
         *       "set_id": "subscriber",
         *       "versions": [
         *         {
         *           "id": "0",
         *           "image_url_1x": "https://static-cdn.jtvnw.net/badges/v1/eb4a8a4c-eacd-4f5e-b9f2-394348310442/1",
         *           "image_url_2x": "https://static-cdn.jtvnw.net/badges/v1/eb4a8a4c-eacd-4f5e-b9f2-394348310442/2",
         *           "image_url_4x": "https://static-cdn.jtvnw.net/badges/v1/eb4a8a4c-eacd-4f5e-b9f2-394348310442/3",
         *           "title": "Subscriber",
         *           "description": "Subscriber",
         *           "click_action": "subscribe_to_channel",
         *           "click_url": null
         *         },
         *       ]
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @returns {Promise<void>} 
         */
        getChannelChatBadges() {
            return reqFunc("https://api.twitch.tv/helix/chat/badges",
                [],
                ["app", "user"],
                {},
                {},
                {}
            );
        },
        /**
         * Gets Twitch’s list of chat badges.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-global-chat-badges)
         *
         * ---
         * Gets Twitch’s list of chat badges, which users may use in any channel’s chat room. For information about chat badges, see [Twitch Chat Badges Guide](https://help.twitch.tv/s/article/twitch-chat-badges-guide).
         *
         * ---
         * *Authentication*: 
         * 
         * Requires an [app access token](https://dev.twitch.tv/docs/authentication#app-access-tokens) or a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens))
         *
         * ---
         * *Examples*: 
         * 
         * Gets the list of global chat badges.: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/chat/badges/global' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     ...
         *     {
         *       "set_id": "vip",
         *       "versions": [
         *         {
         *           "id": "1",
         *           "image_url_1x": "https://static-cdn.jtvnw.net/badges/v1/b817aba4-fad8-49e2-b88a-7cc744dfa6ec/1",
         *           "image_url_2x": "https://static-cdn.jtvnw.net/badges/v1/b817aba4-fad8-49e2-b88a-7cc744dfa6ec/2",
         *           "image_url_4x": "https://static-cdn.jtvnw.net/badges/v1/b817aba4-fad8-49e2-b88a-7cc744dfa6ec/3",
         *           "title": "VIP",
         *           "description": "VIP",
         *           "click_action": "visit_url",
         *           "click_url": "https://help.twitch.tv/customer/en/portal/articles/659115-twitch-chat-badges-guide"
         *         }
         *       ]
         *     },
         *     ...
         *   ]
         * }
         * ```
         *
         * ---
         * @returns {Promise<void>} 
         */
        getGlobalChatBadges() {
            return reqFunc("https://api.twitch.tv/helix/chat/badges/global",
                [],
                ["app", "user"],
                {},
                {},
                {}
            );
        },
        /**
         * @typedef GetChatSettingsResponse_Data
         * @prop {string} broadcasterId The ID of the broadcaster specified in the request.
         * @prop {boolean} emoteMode A Boolean value that determines whether chat messages must contain only emotes. Is *true* if chat messages may contain only emotes; otherwise, *false*.
         * @prop {boolean} followerMode A Boolean value that determines whether the broadcaster restricts the chat room to followers only.Is *true* if the broadcaster restricts the chat room to followers only; otherwise, *false*.See the `follower_mode_duration` field for how long users must follow the broadcaster before being able to participate in the chat room.
         * @prop {number} followerModeDuration The length of time, in minutes, that users must follow the broadcaster before being able to participate in the chat room. Is *null* if `follower_mode` is *false*.
         * @prop {string} moderatorId The moderator’s ID. The response includes this field only if the request specifies a user access token that includes the *moderator:read:chat_settings* scope.
         * @prop {boolean} nonModeratorChatDelay A Boolean value that determines whether the broadcaster adds a short delay before chat messages appear in the chat room. This gives chat moderators and bots a chance to remove them before viewers can see the message. See the `non_moderator_chat_delay_duration` field for the length of the delay. Is *true* if the broadcaster applies a delay; otherwise, *false*.The response includes this field only if the request specifies a user access token that includes the *moderator:read:chat_settings* scope and the user in the moderator_id query parameter is one of the broadcaster’s moderators.
         * @prop {number} nonModeratorChatDelayDuration The amount of time, in seconds, that messages are delayed before appearing in chat. Is *null* if `non_moderator_chat_delay` is *false*.The response includes this field only if the request specifies a user access token that includes the *moderator:read:chat_settings* scope and the user in the moderator_id query parameter is one of the broadcaster’s moderators.
         * @prop {boolean} slowMode A Boolean value that determines whether the broadcaster limits how often users in the chat room are allowed to send messages.Is *true* if the broadcaster applies a delay; otherwise, *false*.See the `slow_mode_wait_time` field for the delay.
         * @prop {number} slowModeWaitTime The amount of time, in seconds, that users must wait between sending messages.Is *null* if slow_mode is *false*.
         * @prop {boolean} subscriberMode A Boolean value that determines whether only users that subscribe to the broadcaster’s channel may talk in the chat room.Is *true* if the broadcaster restricts the chat room to subscribers only; otherwise, *false*.
         * @prop {boolean} uniqueChatMode A Boolean value that determines whether the broadcaster requires users to post only unique messages in the chat room.Is *true* if the broadcaster requires unique messages only; otherwise, *false*.
         */
        /**
         * @typedef GetChatSettingsResponse
         * @prop {GetChatSettingsResponse_Data[]} data The list of chat settings. The list contains a single object with all the settings.
         */
        /**
         * Gets the broadcaster’s chat settings.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-chat-settings)
         *
         * ---
         * 
         *
         * For an overview of chat settings, see [Chat Commands for Broadcasters and Moderators](https://help.twitch.tv/s/article/chat-commands#AllMods) and [Moderator Preferences](https://help.twitch.tv/s/article/setting-up-moderation-for-your-twitch-channel#modpreferences).
         *
         * ---
         * *Authentication*: 
         * 
         * Requires an [app access token](https://dev.twitch.tv/docs/authentication#app-access-tokens) or a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens))
         *
         * ---
         * *Examples*: 
         * 
         * Example 1: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/chat/settings?broadcaster_id=1234' \
         * -H 'Authorization: Bearer 4a4x78f5wqvkybms7mxfist3jmzul' \
         * -H 'Client-Id: t214nt8z1rdtbj69hyarjvh5mi6fh'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "broadcaster_id": "713936733",
         *       "slow_mode": false,
         *       "slow_mode_wait_time": null,
         *       "follower_mode": true,
         *       "follower_mode_duration": 0,
         *       "subscriber_mode": false,
         *       "emote_mode": false,
         *       "unique_chat_mode": false,
         *       "non_moderator_chat_delay": true,
         *       "non_moderator_chat_delay_duration": 4
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster whose chat settings you want to get.
         * @param {string?} moderatorId The ID of the broadcaster or one of the broadcaster’s moderators.This field is required only if you want to include the `non_moderator_chat_delay` and `non_moderator_chat_delay_duration` settings in the response.If you specify this field, this ID must match the user ID in the user access token.
         * @returns {Promise<GetChatSettingsResponse>} 
         */
        getChatSettings(broadcasterId, moderatorId=null) {
            return reqFunc("https://api.twitch.tv/helix/chat/settings",
                [],
                ["app", "user"],
                {broadcaster_id: broadcasterId, moderator_id: moderatorId},
                {},
                {200: "Successfully retrieved the broadcaster’s chat settings.", 400: "- The broadcaster_id query parameter is required.", 401: "- The Authorization header is required and must specify a valid app access token or user access token.\n- The OAuth token is not valid.\n- The ID in the Client-Id header must match the Client ID in the OAuth token."}
            );
        },
        /**
         * @typedef GetSharedChatSessionResponse_Data_Participants
         * @prop {string} broadcasterId The User ID of the participant channel.
         */
        /**
         * @typedef GetSharedChatSessionResponse_Data
         * @prop {string} sessionId The unique identifier for the shared chat session.
         * @prop {string} hostBroadcasterId The User ID of the host channel.
         * @prop {GetSharedChatSessionResponse_Data_Participants[]} participants The list of participants in the session.
         * @prop {string} createdAt The UTC date and time (in RFC3339 format) for when the session was created.
         * @prop {string} updatedAt The UTC date and time (in RFC3339 format) for when the session was last updated.
         */
        /**
         * @typedef GetSharedChatSessionResponse
         * @prop {GetSharedChatSessionResponse_Data[]} data 
         */
        /**
         * NEW Retrieves the active shared chat session for a channel.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-shared-chat-session)
         *
         * ---
         * *Authentication*: 
         * 
         * Requires an [app access token](https://dev.twitch.tv/docs/authentication#app-access-tokens) or a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens))
         *
         * ---
         * *Examples*: 
         * 
         * Example 1: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/shared_chat/session?broadcaster_id=198704263'  \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "session_id": "359bce59-fa4e-41a5-bd6f-9bc0c8360485",
         *       "host_broadcaster_id": “198704263”,
         *       "participants": [{
         *           "broadcaster_id": “198704263”
         *       }, {
         *           "broadcaster_id": “487263401”
         *       }],
         *       "created_at": "2024-09-29T19:45:37Z",
         *       "updated_at": "2024-09-29T19:45:37Z"
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId The User ID of the channel broadcaster.
         * @returns {Promise<GetSharedChatSessionResponse>} 
         */
        getSharedChatSession(broadcasterId) {
            return reqFunc("https://api.twitch.tv/helix/shared_chat/session",
                [],
                ["app", "user"],
                {broadcaster_id: broadcasterId},
                {},
                {200: "Successfully retrieved the shared chat session. Returns an empty array if the broadcaster_id in the request isn’t in a shared chat session.", 400: "The ID in the `broadcaster_id` query parameter is not valid.", 401: "- The OAuth token is not valid.\n- The Authorization header is required and must contain a user access token.", 500: "Internal Server Error."}
            );
        },
        /**
         * @typedef GetUserEmotesResponse_Data
         * @prop {string} id An ID that uniquely identifies this emote.
         * @prop {string} name The User ID of broadcaster whose channel is receiving the unban request.
         * @prop {"none"|"bitstier"|"follower"|"subscriptions"|"channelpoints"|"rewards"|"hypetrain"|"prime"|"turbo"|"smilies"|"globals"|"owl2019"|"twofactor"|"limitedtime"} emoteType The type of emote. The possible values are: - none — No emote type was assigned to this emote.
         *
         * - bitstier — A Bits tier emote.
         *
         * - follower — A follower emote.
         *
         * - subscriptions — A subscriber emote.
         *
         * - channelpoints — An emote granted by using channel points.
         *
         * - rewards — An emote granted to the user through a special event.
         *
         * - hypetrain — An emote granted for participation in a Hype Train.
         *
         * - prime — An emote granted for linking an Amazon Prime account.
         *
         * - turbo — An emote granted for having Twitch Turbo.
         *
         * - smilies — Emoticons supported by Twitch.
         *
         * - globals — An emote accessible by everyone.
         *
         * - owl2019 — Emotes related to Overwatch League 2019.
         *
         * - twofactor — Emotes granted by enabling two-factor authentication on an account.
         *
         * - limitedtime — Emotes that were granted for only a limited time.
         * @prop {string} emoteSetId An ID that identifies the emote set that the emote belongs to.
         * @prop {string} ownerId The ID of the broadcaster who owns the emote.
         * @prop {string[]} format The formats that the emote is available in. For example, if the emote is available only as a static PNG, the array contains only static. But if the emote is available as a static PNG and an animated GIF, the array contains static and animated. - animated — An animated GIF is available for this emote.
         *
         * - static — A static PNG file is available for this emote.
         * @prop {string[]} scale The sizes that the emote is available in. For example, if the emote is available in small and medium sizes, the array contains 1.0 and 2.0. - 1.0 — A small version (28px x 28px) is available.
         *
         * - 2.0 — A medium version (56px x 56px) is available.
         *
         * - 3.0 — A large version (112px x 112px) is available.
         * @prop {string[]} themeMode The background themes that the emote is available in. - dark
         *
         * - light
         */
        /**
         * @typedef GetUserEmotesResponse_Pagination
         * @prop {string} cursor The cursor used to get the next page of results. Use the cursor to set the request’s after query parameter.
         */
        /**
         * @typedef GetUserEmotesResponse
         * @prop {GetUserEmotesResponse_Data[]} data 
         * @prop {string} template A templated URL. Uses the values from the id, format, scale, and theme_mode fields to replace the like-named placeholder strings in the templated URL to create a CDN (content delivery network) URL that you use to fetch the emote. For information about what the template looks like and how to use it to fetch emotes, see [Emote CDN URL](https://dev.twitch.tv/docs/irc/emotes#cdn-template) format.
         * @prop {GetUserEmotesResponse_Pagination} pagination Contains the information used to page through the list of results. The object is empty if there are no more pages left to page through. For more information about pagination support, see [Twitch API Guide - Pagination](https://dev.twitch.tv/docs/api/guide#pagination).
         */
        /**
         * Retrieves emotes available to the user across all channels.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-user-emotes)
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `user:read:emotes`
         *
         * ---
         * *Examples*: 
         * 
         * Example 1: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/chat/emotes/user?user_id=123456' \
         * -H 'Authorization: Bearer kpvy3cjboyptmiacwr0c19hotn5s' \
         * -H 'Client-Id: hof5gwx0su6owfn0nyan9c87zr6t'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "emote_set_id": "",
         *       "emote_type": "hypetrain",
         *       "format": [
         *         "static"
         *       ],
         *       "id": "304420818",
         *       "name": "HypeLol",
         *       "owner_id": "477339272",
         *       "scale": [
         *         "1.0",
         *         "2.0",
         *         "3.0"
         *       ],
         *       "theme_mode": [
         *         "light",
         *         "dark"
         *       ]
         *     }
         *   ],
         *   "template": "https://static-cdn.jtvnw.net/emoticons/v2/{{id}}/{{format}}/{{theme_mode}}/{{scale}}",
         *   "pagination": {
         *     "cursor": "eyJiIjpudWxsLJxhIjoiIn0gf5"
         *   }
         * }
         * ```
         *
         * ---
         * @param {string} userId The ID of the user. This ID must match the user ID in the user access token.
         * @param {string?} after The cursor used to get the next page of results. The Pagination object in the response contains the cursor’s value.
         * @param {string?} broadcasterId The User ID of a broadcaster you wish to get follower emotes of. Using this query parameter will guarantee inclusion of the broadcaster’s follower emotes in the response body. *Note:* If the user specified in `user_id` is subscribed to the broadcaster specified, their follower emotes will appear in the response body regardless if this query parameter is used.
         * @returns {Promise<GetUserEmotesResponse>} 
         */
        getUserEmotes(userId, after=null, broadcasterId=null) {
            return reqFunc("https://api.twitch.tv/helix/chat/emotes/user",
                ["user:read:emotes"],
                ["user"],
                {user_id: userId, after: after, broadcaster_id: broadcasterId},
                {},
                {200: "Successfully retrieved the emotes.", 400: "- The user_id query parameter is required.\n- The ID in the user_id query parameter is not valid.", 401: "- The ID in user_id must match the user ID in the user access token.\n- The Authorization header is required and must contain a user access token.\n- The user access token must include the user:read:emotes scope.\n- The access token is not valid.\n- The client ID specified in the Client-Id header does not match the client ID specified in the access token."}
            );
        },
        /**
         * @typedef UpdateChatSettingsResponse_Data
         * @prop {string} broadcasterId The ID of the broadcaster specified in the request.
         * @prop {boolean} emoteMode A Boolean value that determines whether chat messages must contain only emotes. Is *true* if chat messages may contain only emotes; otherwise, *false*.
         * @prop {boolean} followerMode A Boolean value that determines whether the broadcaster restricts the chat room to followers only.Is *true* if the broadcaster restricts the chat room to followers only; otherwise, *false*.See the `follower_mode_duration` field for how long users must follow the broadcaster before being able to participate in the chat room.
         * @prop {number} followerModeDuration The length of time, in minutes, that users must follow the broadcaster before being able to participate in the chat room. Is *null* if `follower_mode` is *false*.
         * @prop {string} moderatorId The moderator’s ID. The response includes this field only if the request specifies a user access token that includes the *moderator:read:chat_settings* scope.
         * @prop {boolean} nonModeratorChatDelay A Boolean value that determines whether the broadcaster adds a short delay before chat messages appear in the chat room. This gives chat moderators and bots a chance to remove them before viewers can see the message. See the `non_moderator_chat_delay_duration` field for the length of the delay. Is *true* if the broadcaster applies a delay; otherwise, *false*.
         * @prop {number} nonModeratorChatDelayDuration The amount of time, in seconds, that messages are delayed before appearing in chat. Is *null* if `non_moderator_chat_delay` is *false*.
         * @prop {boolean} slowMode A Boolean value that determines whether the broadcaster limits how often users in the chat room are allowed to send messages.Is *true* if the broadcaster applies a delay; otherwise, *false*.See the `slow_mode_wait_time` field for the delay.
         * @prop {number} slowModeWaitTime The amount of time, in seconds, that users must wait between sending messages.Is *null* if slow_mode is *false*.
         * @prop {boolean} subscriberMode A Boolean value that determines whether only users that subscribe to the broadcaster’s channel may talk in the chat room.Is *true* if the broadcaster restricts the chat room to subscribers only; otherwise, *false*.
         * @prop {boolean} uniqueChatMode A Boolean value that determines whether the broadcaster requires users to post only unique messages in the chat room.Is *true* if the broadcaster requires unique messages only; otherwise, *false*.
         */
        /**
         * @typedef UpdateChatSettingsResponse
         * @prop {UpdateChatSettingsResponse_Data[]} data The list of chat settings. The list contains a single object with all the settings.
         */
        /**
         * Updates the broadcaster’s chat settings.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#update-chat-settings)
         *
         * ---
         * *Info*: 
         * 
         * All fields are optional. Specify only those fields that you want to update.
         *
         * To set the `slow_mode_wait_time` or `follower_mode_duration` field to its default value, set the corresponding `slow_mode` or `follower_mode` field to *true* (and don’t include the `slow_mode_wait_time` or `follower_mode_duration` field).
         *
         * To set the `slow_mode_wait_time`, `follower_mode_duration`, or `non_moderator_chat_delay_duration` field’s value, you must set the corresponding `slow_mode`, `follower_mode`, or `non_moderator_chat_delay` field to *true*.
         *
         * To remove the `slow_mode_wait_time`, `follower_mode_duration`, or `non_moderator_chat_delay_duration` field’s value, set the corresponding `slow_mode`, `follower_mode`, or `non_moderator_chat_delay` field to *false* (and don’t include the `slow_mode_wait_time`, `follower_mode_duration`, or `non_moderator_chat_delay_duration` field).
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens))
         *
         * ---
         * *Examples*: 
         * 
         * This example disables `follower_mode` by setting it to false.To change a setting’s value, the request must specify the mode field and its corresponding value field. For example, to change the value of `slow_mode_wait_time`, the request must also specify `slow_mode` even if it’s already *true*.: 
         * ```
         * curl -X PATCH 'https://https://api.twitch.tv/helix/chat/settings?broadcaster_id=1234&moderator_id=5678' \
         * -H 'Authorization: Bearer 8j9yq1kpl92w96trqy7sintbsihdp' \
         * -H 'Client-Id: 0vql4f5yqu4spo6zrz1pkumcqwa9c' \
         * -H 'Content-Type: application/json' \
         * -d '{"slow_mode": true, "slow_mode_wait_time": 10}'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "broadcaster_id": "1234",
         *       "moderator_id": "5678",
         *       "slow_mode": true,
         *       "slow_mode_wait_time": 10,
         *       "follower_mode": false,
         *       "follower_mode_duration": null,
         *       "subscriber_mode": false,
         *       "emote_mode": false,
         *       "unique_chat_mode": false,
         *       "non_moderator_chat_delay": false,
         *       "non_moderator_chat_delay_duration": null
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster whose chat settings you want to update.
         * @param {string} moderatorId The ID of a user that has permission to moderate the broadcaster’s chat room, or the broadcaster’s ID if they’re making the update. This ID must match the user ID in the user access token.
         * @param {boolean?} emoteMode A Boolean value that determines whether chat messages must contain only emotes.Set to *true* if only emotes are allowed; otherwise, *false*. The default is *false*.
         * @param {boolean?} followerMode A Boolean value that determines whether the broadcaster restricts the chat room to followers only.Set to *true* if the broadcaster restricts the chat room to followers only; otherwise, *false*. The default is *true*.To specify how long users must follow the broadcaster before being able to participate in the chat room, see the `follower_mode_duration` field.
         * @param {number?} followerModeDuration The length of time, in minutes, that users must follow the broadcaster before being able to participate in the chat room. Set only if `follower_mode` is *true*. Possible values are: 0 (no restriction) through 129600 (3 months). The default is 0.
         * @param {boolean?} nonModeratorChatDelay A Boolean value that determines whether the broadcaster adds a short delay before chat messages appear in the chat room. This gives chat moderators and bots a chance to remove them before viewers can see the message.Set to *true* if the broadcaster applies a delay; otherwise, *false*. The default is *false*.To specify the length of the delay, see the `non_moderator_chat_delay_duration` field.
         * @param {number?} nonModeratorChatDelayDuration The amount of time, in seconds, that messages are delayed before appearing in chat. Set only if `non_moderator_chat_delay` is *true*. Possible values are:
         *
         * - 2 — 2 second delay (recommended)
         *
         * - 4 — 4 second delay
         *
         * - 6 — 6 second delay
         * @param {boolean?} slowMode A Boolean value that determines whether the broadcaster limits how often users in the chat room are allowed to send messages. Set to *true* if the broadcaster applies a wait period between messages; otherwise, *false*. The default is *false*.To specify the delay, see the `slow_mode_wait_time` field.
         * @param {number?} slowModeWaitTime The amount of time, in seconds, that users must wait between sending messages. Set only if `slow_mode` is *true*.Possible values are: 3 (3 second delay) through 120 (2 minute delay). The default is 30 seconds.
         * @param {boolean?} subscriberMode A Boolean value that determines whether only users that subscribe to the broadcaster’s channel may talk in the chat room.Set to *true* if the broadcaster restricts the chat room to subscribers only; otherwise, *false*. The default is *false*.
         * @param {boolean?} uniqueChatMode A Boolean value that determines whether the broadcaster requires users to post only unique messages in the chat room.Set to *true* if the broadcaster allows only unique messages; otherwise, *false*. The default is *false*.
         * @returns {Promise<UpdateChatSettingsResponse>} 
         */
        updateChatSettings(broadcasterId, moderatorId, emoteMode=null, followerMode=null, followerModeDuration=null, nonModeratorChatDelay=null, nonModeratorChatDelayDuration=null, slowMode=null, slowModeWaitTime=null, subscriberMode=null, uniqueChatMode=null) {
            return reqFunc("https://api.twitch.tv/helix/chat/settings",
                [],
                ["user"],
                {broadcaster_id: broadcasterId, moderator_id: moderatorId},
                {emote_mode: emoteMode, follower_mode: followerMode, follower_mode_duration: followerModeDuration, non_moderator_chat_delay: nonModeratorChatDelay, non_moderator_chat_delay_duration: nonModeratorChatDelayDuration, slow_mode: slowMode, slow_mode_wait_time: slowModeWaitTime, subscriber_mode: subscriberMode, unique_chat_mode: uniqueChatMode},
                {200: "Successfully updated the broadcaster’s chat settings.", 400: "- The broadcaster_id query parameter is required.\n- The moderator_id query parameter is required.\n- If slow_mode is true, the `slow_mode_wait_time` field must be set to a valid value.\n- If `follower_mode` is true, the `follower_mode_duration` field must be set to a valid value.\n- If `non_moderator_chat_delay` is true, the `non_moderator_chat_delay_duration` field must be set to a valid value.", 401: "- The ID in the moderator_id query parameter must match the user ID in the user access token.\n- The Authorization header is required and must contain a user access token.\n- The user access token must include the moderator:manage:chat_settings scope.\n- The access token is not valid.\n- The ID in the Client-Id header must match the client ID in the access token.", 403: "- The user in the moderator_id query parameter must have moderator privileges in the broadcaster's channel."}
            );
        },
        /**
         * Sends an announcement to the broadcaster’s chat room.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#send-chat-announcement)
         *
         * ---
         * 
         *
         * *Rate Limits*: One announcement may be sent every 2 seconds.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens))
         *
         * ---
         * *Examples*: 
         * 
         * Sends an announcement to the broadcaster’s chat room.: 
         * ```
         * curl -X POST 'https://api.twitch.tv/helix/chat/announcements?broadcaster_id=11111&moderator_id=44444' \
         * -H 'Authorization: Bearer kpvy3cjboyptmdkiacwr0c19hotn5s' \
         * -H 'Client-Id: hof5gwx0su6owfnys0nyan9c87zr6t' \
         * -H 'Content-Type: application/json' \
         * -d '{"message":"Hello chat!","color":"purple"}'
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster that owns the chat room to send the announcement to.
         * @param {string} moderatorId The ID of a user who has permission to moderate the broadcaster’s chat room, or the broadcaster’s ID if they’re sending the announcement. This ID must match the user ID in the user access token.
         * @param {string} message The announcement to make in the broadcaster’s chat room. Announcements are limited to a maximum of 500 characters; announcements longer than 500 characters are truncated.
         * @param {"blue"|"green"|"orange"|"purple"|"primary (default)"?} color The color used to highlight the announcement. Possible case-sensitive values are:
         *
         * - blue
         *
         * - green
         *
         * - orange
         *
         * - purple
         *
         * - primary (default)
         *
         * If `color` is set to primary or is not set, the channel’s accent color is used to highlight the announcement (see *Profile Accent Color* under [profile settings](https://www.twitch.tv/settings/profile), *Channel and Videos*, and *Brand*).
         * @returns {Promise<void>} 
         */
        sendChatAnnouncement(broadcasterId, moderatorId, message, color=null) {
            return reqFunc("https://api.twitch.tv/helix/chat/announcements",
                [],
                ["user"],
                {broadcaster_id: broadcasterId, moderator_id: moderatorId},
                {message: message, color: color},
                {}
            );
        },
        /**
         * Sends a Shoutout to the specified broadcaster.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#send-a-shoutout)
         *
         * ---
         *  Typically, you send Shoutouts when you or one of your moderators notice another broadcaster in your chat, the other broadcaster is coming up in conversation, or after they raid your broadcast.
         *
         * Twitch’s Shoutout feature is a great way for you to show support for other broadcasters and help them grow. Viewers who do not follow the other broadcaster will see a pop-up Follow button in your chat that they can click to follow the other broadcaster. [Learn More](https://help.twitch.tv/s/article/shoutouts)
         *
         * *Rate Limits*: The broadcaster may send a Shoutout once every 2 minutes. They may send the same broadcaster a Shoutout once every 60 minutes.
         *
         * To receive notifications when a Shoutout is sent or received, subscribe to the [channel.shoutout.create](https://dev.twitch.tv/docs/eventsub/eventsub-subscription-types#channelshoutoutcreate) and [channel.shoutout.receive](https://dev.twitch.tv/docs/eventsub/eventsub-subscription-types#channelshoutoutreceive) subscription types. The *channel.shoutout.create* event includes cooldown periods that indicate when the broadcaster may send another Shoutout without exceeding the endpoint’s rate limit.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens))
         *
         * ---
         * *Examples*: 
         * 
         * Example 1: 
         * ```
         * curl -X POST 'https://api.twitch.tv/helix/chat/shoutouts?from_broadcaster_id=12345&to_broadcaster_id=626262&moderator_id=98765' \
         * -H 'Authorization: Bearer kpvy3cjboyptmdkiacwr0c19hotn5s' \
         * -H 'Client-Id: hof5gwx0su6owfnys0nyan9c87zr6t'
         * ```
         *
         * ---
         * @param {string} fromBroadcasterId The ID of the broadcaster that’s sending the Shoutout.
         * @param {string} toBroadcasterId The ID of the broadcaster that’s receiving the Shoutout.
         * @param {string} moderatorId The ID of the broadcaster or a user that is one of the broadcaster’s moderators. This ID must match the user ID in the access token.
         * @returns {Promise<void>} 
         */
        sendAShoutout(fromBroadcasterId, toBroadcasterId, moderatorId) {
            return reqFunc("https://api.twitch.tv/helix/chat/shoutouts",
                [],
                ["user"],
                {from_broadcaster_id: fromBroadcasterId, to_broadcaster_id: toBroadcasterId, moderator_id: moderatorId},
                {},
                {}
            );
        },
        /**
         * @typedef SendChatMessageResponse_Data_Drop_reason
         * @prop {string} code Code for why the message was dropped.
         * @prop {string} message Message for why the message was dropped.
         */
        /**
         * @typedef SendChatMessageResponse_Data
         * @prop {string} messageId The message id for the message that was sent.
         * @prop {boolean} isSent If the message passed all checks and was sent.
         * @prop {SendChatMessageResponse_Data_Drop_reason} dropReason The reason the message was dropped, if any.
         */
        /**
         * @typedef SendChatMessageResponse
         * @prop {SendChatMessageResponse_Data[]} data 
         */
        /**
         * Sends a message to the broadcaster’s chat room.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#send-chat-message)
         *
         * ---
         * 
         *
         * *NOTE:* When sending messages to a Shared Chat session, behaviors differ depending on your authentication token type:
         *
         * - When using an App Access Token, messages will only be sent to the source channel (defined by the `broadcaster_id` parameter) by default starting on May 19, 2025. Messages can be sent to all channels by using the `for_source_only` parameter and setting it to `false`.
         *
         * - When using a User Access Token, messages will be sent to all channels in the shared chat session, including the source channel. This behavior cannot be changed with this token type.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires an [app access token](https://dev.twitch.tv/docs/authentication#app-access-tokens) or a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `user:write:chat` and any of the following scopes in the requested chat: `user:bot`, `channel:bot`
         *
         * ---
         * *Examples*: 
         * 
         * Example 1: 
         * ```
         * curl -X POST 'https://api.twitch.tv/helix/chat/messages' \
         * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
         * -H 'Client-Id: wbmytr93xzw8zbg0p1izqyzzc5mbiz' \
         * -H 'Content-Type: application/json' \
         * -d '{
         *   "broadcaster_id": "12826",
         *   "sender_id": "141981764",
         *   "message": "Hello, world! twitchdevHype",
         *   "for_source_only": true
         * }'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "message_id": "abc-123-def",
         *       "is_sent": true
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster whose chat room the message will be sent to.
         * @param {string} senderId The ID of the user sending the message. This ID must match the user ID in the user access token.
         * @param {string} message The message to send. The message is limited to a maximum of 500 characters. Chat messages can also include emoticons. To include emoticons, use the name of the emote. The names are case sensitive. Don’t include colons around the name (e.g., :bleedPurple:). If Twitch recognizes the name, Twitch converts the name to the emote before writing the chat message to the chat room
         * @param {string?} replyParentMessageId The ID of the chat message being replied to.
         * @param {boolean?} forSourceOnly *NOTE:* This parameter can only be set when utilizing an App Access Token. It cannot be specified when a User Access Token is used, and will instead result in an HTTP 400 error.Determines if the chat message is sent only to the source channel (defined by broadcaster_id) during a shared chat session. This has no effect if the message is not sent during a shared chat session.If this parameter is not set, the default value when using an App Access Token is `false`. On May 19, 2025 the default value for this parameter will be updated to `true`, and chat messages sent using an App Access Token will only be shared with the source channel by default. If you prefer to send a chat message to both channels in a shared chat session, make sure this parameter is explicitly set to `false` in your API request before May 19.
         * @returns {Promise<SendChatMessageResponse>} 
         */
        sendChatMessage(broadcasterId, senderId, message, replyParentMessageId=null, forSourceOnly=null) {
            return reqFunc("https://api.twitch.tv/helix/chat/messages",
                ["user:write:chat"],
                ["app", "user"],
                {},
                {broadcaster_id: broadcasterId, sender_id: senderId, message: message, reply_parent_message_id: replyParentMessageId, for_source_only: forSourceOnly},
                {200: "Successfully sent the specified broadcaster a message.", 400: "- The broadcaster_id query parameter is required.\n- The ID in the broadcaster_id query parameter is not valid.\n- The sender_id query parameter is required.\n- The ID in the sender_id query parameter is not valid.\n- The text query parameter is required.\n- The ID in the reply_parent_message_id query parameter is not valid.\n- Cannot set *for_source_only* if User Access Token is used.", 401: "- The ID in the user_id query parameter must match the user ID in the access token.\n- The Authorization header is required and must contain a user access token.\n- The user access token must include the user:write:chat scope.\n- The access token is not valid.\n- The client ID specified in the Client-Id header does not match the client ID specified in the access token.", 403: "The sender is not permitted to send chat messages to the broadcaster’s chat room.", 422: "The message is too large."}
            );
        },
        /**
         * @typedef GetUserChatColorResponse_Data
         * @prop {string} userId An ID that uniquely identifies the user.
         * @prop {string} userLogin The user’s login name.
         * @prop {string} userName The user’s display name.
         * @prop {string} color The Hex color code that the user uses in chat for their name. If the user hasn’t specified a color in their settings, the string is empty.
         */
        /**
         * @typedef GetUserChatColorResponse
         * @prop {GetUserChatColorResponse_Data[]} data The list of users and the color code they use for their name.
         */
        /**
         * Gets the color used for the user’s name in chat.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-user-chat-color)
         *
         * ---
         * *Authentication*: 
         * 
         * Requires an [app access token](https://dev.twitch.tv/docs/authentication#app-access-tokens) or a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens))
         *
         * ---
         * *Examples*: 
         * 
         * Gets the chat color code used by the specified users.: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/chat/color?user_id=11111&user_id=44444' \
         * -H 'Authorization: Bearer kpvy3cjboyptmdkiacwr0c19hotn5s' \
         * -H 'Client-Id: hof5gwx0su6owfnys0nyan9c87zr6t'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "user_id": "11111",
         *       "user_name": "SpeedySpeedster1",
         *       "user_login": "speedyspeedster1",
         *       "color": "#9146FF"
         *     },
         *     {
         *       "user_id": "44444",
         *       "user_name": "SpeedySpeedster2",
         *       "user_login": "speedyspeedster2",
         *       "color": ""
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @param {string} userId The ID of the user whose username color you want to get. To specify more than one user, include the user_id parameter for each user to get. For example, `&user_id=1234&user_id=5678`. The maximum number of IDs that you may specify is 100.The API ignores duplicate IDs and IDs that weren’t found.
         * @returns {Promise<GetUserChatColorResponse>} 
         */
        getUserChatColor(userId) {
            return reqFunc("https://api.twitch.tv/helix/chat/color",
                [],
                ["app", "user"],
                {user_id: userId},
                {},
                {200: "Successfully retrieved the chat color used by the specified users.", 400: "- The ID in the user_id query parameter is not valid.", 401: "- The Authorization header is required and must contain an app access token or user access token.\n- The OAuth token is not valid.\n- The client ID specified in the Client-Id header does not match the client ID specified in the OAuth token."}
            );
        },
        /**
         * Updates the color used for the user’s name in chat.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#update-user-chat-color)
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `user:manage:chat_color`
         *
         * ---
         * *Examples*: 
         * 
         * Uses a named color to change the color that the user uses for their name in chat.Uses a color Hex code to change the color that the user uses for their name in chat.: 
         * ```
         * curl -X PUT 'https://api.twitch.tv/helix/chat/color?user_id=123&color=%239146FF' \
         * -H 'Authorization: Bearer kpvy3cjboyptmdkiacwr0c19hotn5s' \
         * -H 'Client-Id: hof5gwx0su6owfnys0nyan9c87zr6t'
         * ```
         *
         * ---
         * @param {string} userId The ID of the user whose chat color you want to update. This ID must match the user ID in the access token.
         * @param {string} color The color to use for the user's name in chat. All users may specify one of the following named color values.
         *
         * - blue
         *
         * - blue_violet
         *
         * - cadet_blue
         *
         * - chocolate
         *
         * - coral
         *
         * - dodger_blue
         *
         * - firebrick
         *
         * - golden_rod
         *
         * - green
         *
         * - hot_pink
         *
         * - orange_red
         *
         * - red
         *
         * - sea_green
         *
         * - spring_green
         *
         * - yellow_green
         *
         * Turbo and Prime users may specify a named color or a Hex color code like #9146FF. If you use a Hex color code, remember to URL encode it.
         * @returns {Promise<void>} 
         */
        updateUserChatColor(userId, color) {
            return reqFunc("https://api.twitch.tv/helix/chat/color",
                ["user:manage:chat_color"],
                ["user"],
                {user_id: userId, color: color},
                {},
                {}
            );
        },
    },
    Clips: {
        /**
         * @typedef CreateClipResponse_Data
         * @prop {string} id An ID that uniquely identifies the clip.
         * @prop {string} editUrl A URL that you can use to edit the clip’s title, identify the part of the clip to publish, and publish the clip. [Learn More](https://help.twitch.tv/s/article/how-to-use-clips)The URL is valid for up to 24 hours or until the clip is published, whichever comes first.
         */
        /**
         * @typedef CreateClipResponse
         * @prop {CreateClipResponse_Data[]} data A list containing the created clip.
         */
        /**
         * Creates a clip from the broadcaster’s stream.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#create-clip)
         *
         * ---
         * 
         *
         * This API captures up to 90 seconds of the broadcaster’s stream. The 90 seconds spans the point in the stream from when you called the API. For example, if you call the API at the 4:00 minute mark, the API captures from approximately the 2:35 mark to approximately the 4:05 minute mark. Twitch tries its best to capture 90 seconds of the stream, but the actual length may be less. This may occur if you begin capturing the clip near the beginning or end of the stream.
         *
         * By default, Twitch publishes up to the last 30 seconds of the 90 seconds window and provides a default title for the clip. To specify the title and the portion of the 90 seconds window that’s used for the clip, use the URL in the response’s `edit_url` field. You can specify a clip that’s from 5 seconds to 60 seconds in length. The URL is valid for up to 24 hours or until the clip is published, whichever comes first.
         *
         * Creating a clip is an asynchronous process that can take a short amount of time to complete. To determine whether the clip was successfully created, call [Get Clips](#get-clips) using the clip ID that this request returned. If Get Clips returns the clip, the clip was successfully created. If after 15 seconds Get Clips hasn’t returned the clip, assume it failed.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `clips:edit`
         *
         * ---
         * *Examples*: 
         * 
         * Example 1: 
         * ```
         * curl -X POST 'https://api.twitch.tv/helix/clips?broadcaster_id=141981764' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *    "data":
         *    [{
         *       "id": "FiveWordsForClipSlug",
         *       "edit_url": "https://www.twitch.tv/twitchdev/clip/FiveWordsForClipSlug"
         *    }]
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster whose stream you want to create a clip from.
         * @param {string?} title The title of the clip.
         * @param {number?} duration The length of the clip in seconds. Possible values range from 5 to 60 inclusively with a precision of 0.1. The default is 30.
         * @returns {Promise<CreateClipResponse>} 
         */
        createClip(broadcasterId, title=null, duration=null) {
            return reqFunc("https://api.twitch.tv/helix/clips",
                ["clips:edit"],
                ["user"],
                {broadcaster_id: broadcasterId, title: title, duration: duration},
                {},
                {202: "Successfully started the clip process.", 400: "- The broadcaster_id query parameter is required.\n- The ID in the broadcaster_id query parameter was not found.\n- The category is not clippable.\n- The title did not pass AutoMod checks.", 401: "- The Authorization header is required and must specify user access token.\n- The user access token must include the clips:edit scope.\n- The OAuth token is not valid.\n- The ID in the Client-Id header must match the Client ID in the OAuth token.", 403: "- The broadcaster has restricted the ability to capture clips to followers and/or subscribers only.\n- The specified broadcaster has not enabled clips on their channel.\n- The user is banned or timed out from the broadcaster’s channel.", 404: "- The broadcaster in the broadcaster_id query parameter must be broadcasting live."}
            );
        },
        /**
         * @typedef CreateClipFromVODResponse_Data
         * @prop {string} id An ID that uniquely identifies the clip.
         * @prop {string} editUrl A URL you can use to edit the clip’s title, feature the clip, create a portrait version of the clip, download the clip media, and share the clip directly to third-party platforms.
         */
        /**
         * @typedef CreateClipFromVODResponse
         * @prop {CreateClipFromVODResponse_Data[]} data A list containing the created clip.
         */
        /**
         * NEW Creates a clip from the broadcaster’s VOD.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#create-clip-from-vod)
         *
         * ---
         * NEW Creates a clip from a broadcaster’s VOD on behalf of the broadcaster or an editor of the channel. Since a live stream is actively creating a VOD, this endpoint can also be used to create a clip from earlier in the current stream.
         *
         * The duration of a clip can be from 5 seconds to 60 seconds in length, with a default of 30 seconds if not specified.
         *
         * `vod_offset` indicates where the clip will end. In other words, the clip will start at (`vod_offset` - `duration`) and end at `vod_offset`. This means that the value of `vod_offset` must greater than or equal to the value of `duration`.
         *
         * The URL in the response’s `edit_url` field allows you to edit the clip’s title, feature the clip, create a portrait version of the clip, download the clip media, and share the clip directly to social platforms.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires an [app access token](https://dev.twitch.tv/docs/authentication#app-access-tokens) or a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `editor:manage:clips`, `channel:manage:clips`
         *
         * ---
         * *Examples*: 
         * 
         * Example 1: 
         * ```
         * curl -X POST 'https://api.twitch.tv/helix/videos/clips?broadcaster_id=141981764&editor_id=12826&vod_id=2277656159' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *    "data":
         *    [{
         *       "id": "FiveWordsForClipSlug",
         *       "edit_url": "https://www.twitch.tv/twitchdev/clip/FiveWordsForClipSlug"
         *    }]
         * }
         * ```
         *
         * ---
         * @param {string} editorId The user ID of the editor for the channel you want to create a clip for. If using the broadcaster’s auth token, this is the same as broadcaster_id. This must match the user_id in the user access token.
         * @param {string} broadcasterId The user ID for the channel you want to create a clip for.
         * @param {string} vodId ID of the VOD the user wants to clip.
         * @param {number} vodOffset Offset in the VOD to create the clip. See notes above.
         * @param {number?} duration The length of the clip, in seconds. Precision is 0.1. Defaults to 30. Min: 5 seconds, Max: 60 seconds.
         * @param {string} title The title of the clip.
         * @returns {Promise<CreateClipFromVODResponse>} 
         */
        createClipFromVOD(editorId, broadcasterId, vodId, vodOffset, duration=null, title) {
            return reqFunc("https://api.twitch.tv/helix/videos/clips",
                ["editor:manage:clips", "channel:manage:clips"],
                ["app", "user"],
                {editor_id: editorId, broadcaster_id: broadcasterId, vod_id: vodId, vod_offset: vodOffset, duration: duration, title: title},
                {},
                {202: "Successfully started the clip process.", 400: "- Validation errors: Invalid source type, missing required fields.\n- The broadcaster_id query parameter is required.\n- The ID in the broadcaster_id query parameter was not found.\n- The category is not clippable.\n- The title did not pass AutoMod checks.\n- Broadcaster is banned.", 401: "- The Authorization header is required and must specify user access token.\n- The user access token must include the editor:manage:clips or channel:manage:clips scope.\n- The OAuth token is not valid.\n- The ID in the Client-Id header must match the Client ID in the OAuth token.", 403: "- The broadcaster has restricted the ability to capture clips to followers and/or subscribers only.\n- The specified broadcaster has not enabled clips on their channel.\n- The user defined by the editor_id is not authorized to create Clips.\n- The user is banned or timed out from the broadcaster's channel.", 404: "- The broadcaster in the broadcaster_id query parameter must be broadcasting live.\n- The VOD is not found..\n- The broadcaster_id or the editor_id does not exist."}
            );
        },
        /**
         * @typedef GetClipsResponse_Data
         * @prop {string} id An ID that uniquely identifies the clip.
         * @prop {string} url A URL to the clip.
         * @prop {string} embedUrl A URL that you can use in an iframe to embed the clip (see [Embedding Video and Clips](https://dev.twitch.tv/docs/embed/video-and-clips/)).
         * @prop {string} broadcasterId An ID that identifies the broadcaster that the video was clipped from.
         * @prop {string} broadcasterName The broadcaster’s display name.
         * @prop {string} creatorId An ID that identifies the user that created the clip.
         * @prop {string} creatorName The user’s display name.
         * @prop {string} videoId An ID that identifies the video that the clip came from. This field contains an empty string if the video is not available.
         * @prop {string} gameId The ID of the game that was being played when the clip was created.
         * @prop {string} language The ISO 639-1 two-letter language code that the broadcaster broadcasts in. For example, en for English. The value is other if the broadcaster uses a language that Twitch doesn’t support.
         * @prop {string} title The title of the clip.
         * @prop {number} viewCount The number of times the clip has been viewed.
         * @prop {string} createdAt The date and time of when the clip was created. The date and time is in RFC3339 format.
         * @prop {string} thumbnailUrl A URL to a thumbnail image of the clip.
         * @prop {number} duration The length of the clip, in seconds. Precision is 0.1.
         * @prop {number} vodOffset The zero-based offset, in seconds, to where the clip starts in the video (VOD). Is *null* if the video is not available or hasn’t been created yet from the live stream (see `video_id`).Note that there’s a delay between when a clip is created during a broadcast and when the offset is set. During the delay period, `vod_offset` is *null*. The delay is indeterminant but is typically minutes long.
         * @prop {boolean} isFeatured A Boolean value that indicates if the clip is featured or not.
         */
        /**
         * @typedef GetClipsResponse_Pagination
         * @prop {string} cursor The cursor used to get the next page of results. Set the request’s after or before query parameter to this value depending on whether you’re paging forwards or backwards.
         */
        /**
         * @typedef GetClipsResponse
         * @prop {GetClipsResponse_Data[]} data The list of video clips. For clips returned by game_id or broadcaster_id, the list is in descending order by view count. For lists returned by id, the list is in the same order as the input IDs.
         * @prop {GetClipsResponse_Pagination} pagination The information used to page through the list of results. The object is empty if there are no more pages left to page through. [Read More](https://dev.twitch.tv/docs/api/guide#pagination)
         */
        /**
         * Gets one or more video clips.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-clips)
         *
         * ---
         * Gets one or more video clips that were captured from streams. For information about clips, see [How to use clips](https://help.twitch.tv/s/article/how-to-use-clips).
         *
         * When using pagination for clips, note that the maximum number of results returned over multiple requests will be approximately 1,000. If additional results are necessary, paginate over different query parameters such as multiple `started_at` and `ended_at` timeframes to refine the search.
         *
         * ---
         * *Info*: 
         * 
         * The id, game_id, and broadcaster_id query parameters are mutually exclusive.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires an [app access token](https://dev.twitch.tv/docs/authentication#app-access-tokens) or a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens))
         *
         * ---
         * *Examples*: 
         * 
         * Gets a clip by ID.: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/clips?id=AwkwardHelplessSalamanderSwiftRage' \
         * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "id": "AwkwardHelplessSalamanderSwiftRage",
         *       "url": "https://clips.twitch.tv/AwkwardHelplessSalamanderSwiftRage",
         *       "embed_url": "https://clips.twitch.tv/embed?clip=AwkwardHelplessSalamanderSwiftRage",
         *       "broadcaster_id": "67955580",
         *       "broadcaster_name": "ChewieMelodies",
         *       "creator_id": "53834192",
         *       "creator_name": "BlackNova03",
         *       "video_id": "205586603",
         *       "game_id": "488191",
         *       "language": "en",
         *       "title": "babymetal",
         *       "view_count": 10,
         *       "created_at": "2017-11-30T22:34:18Z",
         *       "thumbnail_url": "https://clips-media-assets.twitch.tv/157589949-preview-480x272.jpg",
         *       "duration": 60,
         *       "vod_offset": 480,
         *       "is_featured": false
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * Gets the broadcaster’s top 5 clips based on views.: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/clips?broadcaster_id=1234&first=5' \
         * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 2: 
         * ```
         * {
         *   "data": [
         *     {
         *       "id": "RandomClip1",
         *       "url": "https://clips.twitch.tv/AwkwardHelplessSalamanderSwiftRage",
         *       "embed_url": "https://clips.twitch.tv/embed?clip=RandomClip1",
         *       "broadcaster_id": "1234",
         *       "broadcaster_name": "JJ",
         *       "creator_id": "123456",
         *       "creator_name": "MrMarshall",
         *       "video_id": "",
         *       "game_id": "33103",
         *       "language": "en",
         *       "title": "random1",
         *       "view_count": 10,
         *       "created_at": "2017-11-30T22:34:18Z",
         *       "thumbnail_url": "https://clips-media-assets.twitch.tv/157589949-preview-480x272.jpg",
         *       "duration": 12.9,
         *       "vod_offset": 1957,
         *       "is_featured": true
         *     },
         *     ...
         *   ],
         *   "pagination": {
         *     "cursor": "eyJiIjpudWxsLCJhIjoiIn0"
         *   }
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId An ID that identifies the broadcaster whose video clips you want to get. Use this parameter to get clips that were captured from the broadcaster’s streams.
         * @param {string} gameId An ID that identifies the game whose clips you want to get. Use this parameter to get clips that were captured from streams that were playing this game.
         * @param {string} id An ID that identifies the clip to get. To specify more than one ID, include this parameter for each clip you want to get. For example, `id=foo&id=bar`. You may specify a maximum of 100 IDs. The API ignores duplicate IDs and IDs that aren’t found.
         * @param {string?} startedAt The start date used to filter clips. The API returns only clips within the start and end date window. Specify the date and time in RFC3339 format.
         * @param {string?} endedAt The end date used to filter clips. If not specified, the time window is the start date plus one week. Specify the date and time in RFC3339 format.
         * @param {number?} first The maximum number of clips to return per page in the response. The minimum page size is 1 clip per page and the maximum is 100. The default is 20.
         * @param {string?} before The cursor used to get the previous page of results. The *Pagination* object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination)
         * @param {string?} after The cursor used to get the next page of results. The *Pagination* object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination)
         * @param {boolean?} isFeatured A Boolean value that determines whether the response includes featured clips. If *true*, returns only clips that are featured. If *false*, returns only clips that aren’t featured. All clips are returned if this parameter is not present.
         * @returns {Promise<GetClipsResponse>} 
         */
        getClips(broadcasterId, gameId, id, startedAt=null, endedAt=null, first=null, before=null, after=null, isFeatured=null) {
            return reqFunc("https://api.twitch.tv/helix/clips",
                [],
                ["app", "user"],
                {broadcaster_id: broadcasterId, game_id: gameId, id: id, started_at: startedAt, ended_at: endedAt, first: first, before: before, after: after, is_featured: isFeatured},
                {},
                {200: "Successfully retrieved the list of video clips.", 400: "- The id or game_id or broadcaster_id query parameter is required.\n- The id, game_id, and broadcaster_id query parameters are mutually exclusive; you may specify only one of them.", 401: "- The Authorization header is required and must contain an app access token or user access token.\n- The OAuth token is not valid.\n- The client ID specified in the Client-Id header does not match the client ID specified in the OAuth token.", 404: "- The ID in game_id was not found."}
            );
        },
        /**
         * @typedef GetClipsDownloadResponse_Data
         * @prop {string} clipId An ID that uniquely identifies the clip.
         * @prop {string} landscapeDownloadUrl The landscape URL to download the clip. This field is `null` if the URL is not available.
         * @prop {string} portraitDownloadUrl The portrait URL to download the clip. This field is `null` if the URL is not available.
         */
        /**
         * @typedef GetClipsDownloadResponse
         * @prop {GetClipsDownloadResponse_Data[]} data List of clips and their download URLs.
         */
        /**
         * NEW Provides URLs to download the video file(s) for the specified clips.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-clips-download)
         *
         * ---
         *  For information about clips, see [How to use clips](https://help.twitch.tv/s/article/how-to-use-clips).
         *
         * *Rate Limits*: Limited to 100 requests per minute.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires an [app access token](https://dev.twitch.tv/docs/authentication#app-access-tokens) or a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `editor:manage:clips`, `channel:manage:clips`
         *
         * ---
         * *Examples*: 
         * 
         * Gets clip download URLs for two clips from the TwitchDev channel.: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/clips/downloads?broadcaster_id=141981764&editor_id=141981764&clip_id=InexpensiveDistinctFoxChefFrank&clip_id=SpinelessCloudyLeopardMcaT' \
         * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "clip_id": "InexpensiveDistinctFoxChefFrank",
         *       "landscape_download_url": "https://production.assets.clips.twitchcdn.net/yFZG...",
         *       "portrait_download_url": null
         *     },
         *     {
         *       "clip_id": "SpinelessCloudyLeopardMcaT",
         *       "landscape_download_url": "https://production.assets.clips.twitchcdn.net/542j...",
         *       "portrait_download_url": null
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @param {string} editorId The User ID of the editor for the channel you want to download a clip for. If using the broadcaster’s auth token, this is the same as `broadcaster_id`. This must match the `user_id` in the user access token.
         * @param {string} broadcasterId The ID of the broadcaster you want to download clips for.
         * @param {string} clipId The ID that identifies the clip you want to download. Include this parameter for each clip you want to download, up to a maximum of 10 clips. For example, `clip_id=SleepyGiftedPeppermintNerfRedBlaster-KbkBXYt3lOk3jy8-&clip_id=WimpyAltruisticKleeKeyboardCat-EiY5yMrEwZ4i4gwC`.
         * @returns {Promise<GetClipsDownloadResponse>} 
         */
        getClipsDownload(editorId, broadcasterId, clipId) {
            return reqFunc("https://api.twitch.tv/helix/clips/downloads",
                ["editor:manage:clips", "channel:manage:clips"],
                ["app", "user"],
                {editor_id: editorId, broadcaster_id: broadcasterId, clip_id: clipId},
                {},
                {200: "Successfully retrieved the clip download URL(s).", 400: "The ID in the broadcaster_id, editor_id, or clip_id query parameter is not valid.", 401: "- The OAuth token is not valid.\n- The Authorization header is required and must contain a user access token or app access token.\n- The access token must include the editor:manage:clips or channel:manage:clips scope\n- The access token is not valid\n- The client ID specified in the Client-Id header does not match the client ID specified in the access token.", 403: "The user is not an editor for the specified broadcaster.", 500: "Internal Server Error."}
            );
        },
    },
    Conduits: {
        /**
         * @typedef GetConduitsResponse_Data
         * @prop {string} id Conduit ID.
         * @prop {number} shardCount Number of shards associated with this conduit.
         */
        /**
         * @typedef GetConduitsResponse
         * @prop {GetConduitsResponse_Data[]} data List of information about the client’s conduits.
         */
        /**
         * Gets the conduits for a client ID.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-conduits)
         *
         * ---
         * Gets the [conduits](https://dev.twitch.tv/docs/eventsub/handling-conduit-events/) for a client ID.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires an [app access token](https://dev.twitch.tv/docs/authentication#app-access-tokens)
         *
         * ---
         * *Examples*: 
         * 
         * Example 1: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/eventsub/conduits' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "id": "26b1c993-bfcf-44d9-b876-379dacafe75a",
         *       "shard_count": 15
         *     },
         *     {
         *       "id": "bfcfc993-26b1-b876-44d9-afe75a379dac",
         *       "shard_count": 5
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @returns {Promise<GetConduitsResponse>} 
         */
        getConduits() {
            return reqFunc("https://api.twitch.tv/helix/eventsub/conduits",
                [],
                ["app"],
                {},
                {},
                {200: "Successfully retrieved conduits.", 401: "Authorization header required with an app access token."}
            );
        },
        /**
         * @typedef CreateConduitsResponse_Data
         * @prop {string} id Conduit ID.
         * @prop {number} shardCount Number of shards created for this conduit.
         */
        /**
         * @typedef CreateConduitsResponse
         * @prop {CreateConduitsResponse_Data[]} data List of information about the client’s conduits.
         */
        /**
         * Creates a new conduit.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#create-conduits)
         *
         * ---
         * Creates a new [conduit](https://dev.twitch.tv/docs/eventsub/handling-conduit-events/).
         *
         * ---
         * *Authentication*: 
         * 
         * Requires an [app access token](https://dev.twitch.tv/docs/authentication#app-access-tokens)
         *
         * ---
         * *Examples*: 
         * 
         * Example 1: 
         * ```
         * curl -X POST 'https://api.twitch.tv/helix/eventsub/conduits' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2' \
         * -H 'Content-Type: application/json' \
         * -d '{"shard_count": 5}'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "id": "bfcfc993-26b1-b876-44d9-afe75a379dac",
         *       "shard_count": 5
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @param {number} shardCount The number of shards to create for this conduit.
         * @returns {Promise<CreateConduitsResponse>} 
         */
        createConduits(shardCount) {
            return reqFunc("https://api.twitch.tv/helix/eventsub/conduits",
                [],
                ["app"],
                {},
                {shard_count: shardCount},
                {200: "Conduit created.", 400: "Invalid shard count.", 401: "Authorization header required with an app access token.", 429: "Conduit limit reached."}
            );
        },
        /**
         * @typedef UpdateConduitsResponse_Data
         * @prop {string} id Conduit ID.
         * @prop {number} shardCount Number of shards associated with this conduit after the update.
         */
        /**
         * @typedef UpdateConduitsResponse
         * @prop {UpdateConduitsResponse_Data[]} data List of information about the client’s conduits.
         */
        /**
         * Updates a conduit’s shard count.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#update-conduits)
         *
         * ---
         * Updates a [conduit’s](https://dev.twitch.tv/docs/eventsub/handling-conduit-events/) shard count. To delete shards, update the count to a lower number, and the shards above the count will be deleted. For example, if the existing shard count is 100, by resetting shard count to 50, shards 50-99 are disabled.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires an [app access token](https://dev.twitch.tv/docs/authentication#app-access-tokens)
         *
         * ---
         * *Examples*: 
         * 
         * Example 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "id": "bfcfc993-26b1-b876-44d9-afe75a379dac",
         *       "shard_count": 5
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @param {string} id Conduit ID.
         * @param {number} shardCount The new number of shards for this conduit.
         * @returns {Promise<UpdateConduitsResponse>} 
         */
        updateConduits(id, shardCount) {
            return reqFunc("https://api.twitch.tv/helix/eventsub/conduits",
                [],
                ["app"],
                {},
                {id: id, shard_count: shardCount},
                {200: "Conduit updated.", 400: "- Invalid shard count\n- The id query parameter is required.", 401: "Authorization header required with an app access token.", 404: "- Conduit not found.\n- Conduit’s owner must match the client ID in the access token."}
            );
        },
        /**
         * Deletes a specified conduit.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#delete-conduit)
         *
         * ---
         * Deletes a specified [conduit](https://dev.twitch.tv/docs/eventsub/handling-conduit-events/). Note that it may take some time for Eventsub subscriptions on a deleted [conduit](https://dev.twitch.tv/docs/eventsub/handling-conduit-events/) to show as disabled when calling [Get Eventsub Subscriptions](https://dev.twitch.tv/docs/api/reference/#get-eventsub-subscriptions).
         *
         * ---
         * *Authentication*: 
         * 
         * Requires an [app access token](https://dev.twitch.tv/docs/authentication#app-access-tokens)
         *
         * ---
         * *Examples*: 
         * 
         * Example 1: 
         * ```
         * curl -X DELETE 'https://api.twitch.tv/helix/eventsub/conduits?id=bfcfc993-26b1-b876-44d9-afe75a379dac' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         *
         * ---
         * @param {string} id Conduit ID.
         * @returns {Promise<void>} 
         */
        deleteConduit(id) {
            return reqFunc("https://api.twitch.tv/helix/eventsub/conduits",
                [],
                ["app"],
                {id: id},
                {},
                {204: "Successfully deleted the conduit.", 400: "The id query parameter is required.", 401: "Authorization header required with an app access token.", 404: "- Conduit not found.\n- Conduit’s owner must match the client ID in the access token."}
            );
        },
        /**
         * @typedef GetConduitShardsResponse_Data_Transport
         * @prop {"webhook"|"websocket"} method The transport method. Possible values are:
         *
         * - webhook
         *
         * - websocket
         * @prop {string} callback The callback URL where the notifications are sent. Included only if method is set to webhook.
         * @prop {string} sessionId An ID that identifies the WebSocket that notifications are sent to. Included only if method is set to websocket.
         * @prop {string} connectedAt The UTC date and time that the WebSocket connection was established. Included only if method is set to websocket.
         * @prop {string} disconnectedAt The UTC date and time that the WebSocket connection was lost. Included only if method is set to websocket.
         */
        /**
         * @typedef GetConduitShardsResponse_Data
         * @prop {string} id Shard ID.
         * @prop {"enabled"|"webhook_callback_verification_pending"|"webhook_callback_verification_failed"|"notification_failures_exceeded"|"websocket_disconnected"|"websocket_failed_ping_pong"|"websocket_received_inbound_traffic"|"websocket_internal_error"|"websocket_network_timeout"|"websocket_network_error"|"websocket_failed_to_reconnect"|"The client failed to reconnect to the Twitch WebSocket server within the required time after a Reconnect Message."} status The shard status. The subscriber receives events only for enabled shards. Possible values are:
         *
         * - enabled — The shard is enabled.
         *
         * - webhook_callback_verification_pending — The shard is pending verification of the specified callback URL.
         *
         * - webhook_callback_verification_failed — The specified callback URL failed verification.
         *
         * - notification_failures_exceeded — The notification delivery failure rate was too high.
         *
         * - websocket_disconnected — The client closed the connection.
         *
         * - websocket_failed_ping_pong — The client failed to respond to a ping message.
         *
         * - websocket_received_inbound_traffic — The client sent a non-pong message. Clients may only send pong messages (and only in response to a ping message).
         *
         * - websocket_internal_error — The Twitch WebSocket server experienced an unexpected error.
         *
         * - websocket_network_timeout — The Twitch WebSocket server timed out writing the message to the client.
         *
         * - websocket_network_error — The Twitch WebSocket server experienced a network error writing the message to the client.
         *
         * - websocket_failed_to_reconnect - The client failed to reconnect to the Twitch WebSocket server within the required time after a Reconnect Message.
         * @prop {GetConduitShardsResponse_Data_Transport} transport The transport details used to send the notifications.
         */
        /**
         * @typedef GetConduitShardsResponse_Pagination
         * @prop {string} cursor The cursor used to get the next page of results. Use the cursor to set the request’s after query parameter.
         */
        /**
         * @typedef GetConduitShardsResponse
         * @prop {GetConduitShardsResponse_Data[]} data List of information about a conduit's shards.
         * @prop {GetConduitShardsResponse_Pagination} pagination Contains information used to page through a list of results. The object is empty if there are no more pages left to page through.
         */
        /**
         * Gets a lists of all shards for a conduit.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-conduit-shards)
         *
         * ---
         * Gets a lists of all shards for a [conduit](https://dev.twitch.tv/docs/eventsub/handling-conduit-events/).
         *
         * ---
         * *Authentication*: 
         * 
         * Requires an [app access token](https://dev.twitch.tv/docs/authentication#app-access-tokens)
         *
         * ---
         * *Examples*: 
         * 
         * Example 1: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/eventsub/conduits/shards?conduit_id=bfcfc993-26b1-b876-44d9-afe75a379dac' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "id": "0",
         *       "status": "enabled",
         *       "transport": {
         *         "method": "webhook",
         *         "callback": "https://this-is-a-callback.com"
         *       }
         *     },
         *     {
         *       "id": "1",
         *       "status": "webhook_callback_verification_pending",
         *       "transport": {
         *         "method": "webhook",
         *         "callback": "https://this-is-a-callback-2.com"
         *       }
         *     },
         *     {
         *       "id": "2",
         *       "status": "enabled",
         *       "transport": {
         *         "method": "websocket",
         *         "session_id": "9fd5164a-a958-4c60-b7f4-6a7202506ca0",
         *         "connected_at": "2020-11-10T14:32:18.730260295Z"
         *       }
         *     },
         *     {
         *       "id": "3",
         *       "status": "enabled",
         *       "transport": {
         *         "method": "websocket",
         *         "session_id": "238b4b08-13f1-4b8f-8d31-56665a7a9d9f",
         *         "connected_at": "2020-11-10T14:32:18.730260295Z"
         *       }
         *     },
         *     {
         *       "id": "4",
         *       "status": "websocket_disconnected",
         *       "transport": {
         *         "method": "websocket",
         *         "session_id": "ad1c9fc3-0d99-4eb7-8a04-8608e8ff9ec9",
         *         "connected_at": "2020-11-10T14:32:18.730260295Z",
         *         "disconnected_at": "2020-11-11T14:32:18.730260295Z"
         *       }
         *     }
         *   ],
         *   "pagination": {},
         * }
         * ```
         *
         * ---
         * @param {string} conduitId Conduit ID.
         * @param {string?} status Status to filter by.
         * @param {string?} after The cursor used to get the next page of results. The pagination object in the response contains the cursor’s value.
         * @returns {Promise<GetConduitShardsResponse>} 
         */
        getConduitShards(conduitId, status=null, after=null) {
            return reqFunc("https://api.twitch.tv/helix/eventsub/conduits/shards",
                [],
                ["app"],
                {conduit_id: conduitId, status: status, after: after},
                {},
                {200: "Successfully retrieved shards.", 400: "The id query parameter is required.", 401: "Authorization header required with an app access token.", 404: "- Conduit not found.\n- Conduit’s owner must match the client ID in the access token."}
            );
        },
        /**
         * @typedef UpdateConduitShardsResponse_Data_Transport
         * @prop {"webhook"|"websocket"} method The transport method. Possible values are:
         *
         * - webhook
         *
         * - websocket
         * @prop {string} callback The callback URL where the notifications are sent. Included only if method is set to webhook.
         * @prop {string} sessionId An ID that identifies the WebSocket that notifications are sent to. Included only if method is set to websocket.
         * @prop {string} connectedAt The UTC date and time that the WebSocket connection was established. Included only if method is set to websocket.
         * @prop {string} disconnectedAt The UTC date and time that the WebSocket connection was lost. Included only if method is set to websocket.
         */
        /**
         * @typedef UpdateConduitShardsResponse_Data
         * @prop {string} id Shard ID.
         * @prop {"enabled"|"webhook_callback_verification_pending"|"webhook_callback_verification_failed"|"notification_failures_exceeded"|"websocket_disconnected"|"websocket_failed_ping_pong"|"websocket_received_inbound_traffic"|"websocket_internal_error"|"websocket_network_timeout"|"websocket_network_error"|"websocket_failed_to_reconnect"|"The client failed to reconnect to the Twitch WebSocket server within the required time after a Reconnect Message."} status The shard status. The subscriber receives events only for enabled shards. Possible values are:
         *
         * - enabled — The shard is enabled.
         *
         * - webhook_callback_verification_pending — The shard is pending verification of the specified callback URL.
         *
         * - webhook_callback_verification_failed — The specified callback URL failed verification.
         *
         * - notification_failures_exceeded — The notification delivery failure rate was too high.
         *
         * - websocket_disconnected — The client closed the connection.
         *
         * - websocket_failed_ping_pong — The client failed to respond to a ping message.
         *
         * - websocket_received_inbound_traffic — The client sent a non-pong message. Clients may only send pong messages (and only in response to a ping message).
         *
         * - websocket_internal_error — The Twitch WebSocket server experienced an unexpected error.
         *
         * - websocket_network_timeout — The Twitch WebSocket server timed out writing the message to the client.
         *
         * - websocket_network_error — The Twitch WebSocket server experienced a network error writing the message to the client.
         *
         * - websocket_failed_to_reconnect - The client failed to reconnect to the Twitch WebSocket server within the required time after a Reconnect Message.
         * @prop {UpdateConduitShardsResponse_Data_Transport} transport The transport details used to send the notifications.
         */
        /**
         * @typedef UpdateConduitShardsResponse_Errors
         * @prop {string} id Shard ID.
         * @prop {"The length of the string in the secret field is not valid."|"The URL in the transports callback field is not valid. The URL must use the HTTPS protocol and the 443 port number."|"The value specified in the method field is not valid."|"The callback field is required if you specify the webhook transport method."|"The session_id field is required if you specify the WebSocket transport method."|"The websocket session is not connected."|"The shard id is outside of the conduit’s range."} message The error that occurred while updating the shard. Possible errors:
         *
         * - The length of the string in the secret field is not valid.
         *
         * - The URL in the transport's callback field is not valid. The URL must use the HTTPS protocol and the 443 port number.
         *
         * - The value specified in the method field is not valid.
         *
         * - The callback field is required if you specify the webhook transport method.
         *
         * - The session_id field is required if you specify the WebSocket transport method.
         *
         * - The websocket session is not connected.
         *
         * - The shard id is outside of the conduit’s range.
         * @prop {string} code Error codes used to represent a specific error condition while attempting to update shards.
         */
        /**
         * @typedef UpdateConduitShardsResponse
         * @prop {UpdateConduitShardsResponse_Data[]} data List of successful shard updates.
         * @prop {UpdateConduitShardsResponse_Errors[]} errors List of unsuccessful updates.
         */
        /**
         * @typedef UpdateConduitShardsRequest_Shards_Transport
         * @prop {"webhook"|"websocket"} method The transport method. Possible values are:
         *
         * - webhook
         *
         * - websocket
         * @prop {string} callback The callback URL where the notifications are sent. The URL must use the HTTPS protocol and port 443. See Processing an event.Specify this field only if method is set to webhook.NOTE: Redirects are not followed.
         * @prop {string} secret The secret used to verify the signature. The secret must be an ASCII string that’s a minimum of 10 characters long and a maximum of 100 characters long. For information about how the secret is used, see Verifying the event message.Specify this field only if method is set to webhook.
         * @prop {string} sessionId An ID that identifies the WebSocket to send notifications to. When you connect to EventSub using WebSockets, the server returns the ID in the Welcome message.Specify this field only if method is set to websocket.
         */
        /**
         * @typedef UpdateConduitShardsRequest_Shards
         * @prop {string} id Shard ID.
         * @prop {UpdateConduitShardsRequest_Shards_Transport} transport The transport details that you want Twitch to use when sending you notifications.
         */
        /**
         * Updates shard(s) for a conduit.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#update-conduit-shards)
         *
         * ---
         * Updates shard(s) for a [conduit](https://dev.twitch.tv/docs/eventsub/handling-conduit-events/).
         *
         * *NOTE:* Shard IDs are indexed starting at 0, so a conduit with a `shard_count` of 5 will have shards with IDs 0 through 4.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires an [app access token](https://dev.twitch.tv/docs/authentication#app-access-tokens)
         *
         * ---
         * *Examples*: 
         * 
         * Example 1: 
         * ```
         * curl -X PATCH 'https://api.twitch.tv/helix/eventsub/conduits/shards' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2' \
         * -H 'Content-Type: application/json' \
         * -d '{
         *   "conduit_id":"bfcfc993-26b1-b876-44d9-afe75a379dac",
         *   "shards": [{
         *     "id": "0",
         *     "transport": {
         *         "method": "webhook",
         *         "callback": "https://this-is-a-callback.com",
         *         "secret": "s3cre7"
         *     }
         *   },
         *   {
         *     "id": "1",
         *     "transport": {
         *         "method": "webhook",
         *         "callback": "https://this-is-a-callback-2.com",
         *         "secret": "s3cre7"
         *     }
         *   },
         *   {
         *     "id": "3",
         *     "transport":{
         *         "method": "webhook",
         *         "callback": "https://this-is-a-callback-3.com"
         *         "secret": "s3cre7"
         *     }
         *   }]
         * }'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "id": "0",
         *       "status": "enabled",
         *       "transport": {
         *         "method": "webhook",
         *         "callback": "https://this-is-a-callback.com"
         *       }
         *     },
         *     {
         *       "id": "1",
         *       "status": "webhook_callback_verification_pending",
         *       "transport": {
         *         "method": "webhook",
         *         "callback": "https://this-is-a-callback-2.com"
         *       }
         *     }
         *   ],
         *   "errors": [
         *     {
         *       "id": "3",
         *       "message": "The shard id is outside the conduit's range",
         *       "code": "invalid_parameter"
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @param {string} conduitId Conduit ID.
         * @param {UpdateConduitShardsRequest_Shards[]} shards List of shards to update.
         * @returns {Promise<UpdateConduitShardsResponse>} 
         */
        updateConduitShards(conduitId, shards) {
            return reqFunc("https://api.twitch.tv/helix/eventsub/conduits/shards",
                [],
                ["app"],
                {},
                {conduit_id: conduitId, shards: shards},
                {202: "Successfully retrieved shards.", 400: "The id query parameter is required.", 401: "Authorization header required with an app access token.", 404: "- Conduit not found.\n- Conduit’s owner must match the client ID in the access token."}
            );
        },
    },
    CCLs: {
        /**
         * @typedef GetContentClassificationLabelsResponse_Data_Content_classification_labels
         * @prop {string} id Unique identifier for the CCL.
         * @prop {string} description Localized description of the CCL.
         * @prop {string} name Localized name of the CCL.
         */
        /**
         * @typedef GetContentClassificationLabelsResponse_Data
         * @prop {GetContentClassificationLabelsResponse_Data_Content_classification_labels[]} contentClassificationLabels The list of CCLs available.
         */
        /**
         * @typedef GetContentClassificationLabelsResponse
         * @prop {GetContentClassificationLabelsResponse_Data[]} data A list that contains information about the available content classification labels.
         */
        /**
         * Gets information about Twitch content classification labels.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-content-classification-labels)
         *
         * ---
         * *Authentication*: 
         * 
         * Requires an [app access token](https://dev.twitch.tv/docs/authentication#app-access-tokens) or a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens))
         *
         * ---
         * *Examples*: 
         * 
         * Example 1: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/content_classification_labels' \
         * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
         * -H 'Client-Id: wbmytr93xzw8zbg0p1izqyzzc5mbiz'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "id": "DebatedSocialIssuesAndPolitics",
         *       "description": "Discussions or debates about politics or sensitive social issues such as elections, civic integrity, military conflict, and civil rights in a polarizing manner.",
         *       "name": "Politics and Sensitive Social Issues"
         *     },
         *     {
         *       "id": "DrugsIntoxication",
         *       "description": "Excessive tobacco glorification or promotion, any marijuana consumption/use, legal drug and alcohol induced intoxication, discussions of illegal drugs.",
         *       "name": "Drugs, Intoxication, or Excessive Tobacco Use"
         *     },
         *     {
         *       "id": "Gambling",
         *       "description": "Participating in online or in-person gambling, poker or fantasy sports, that involve the exchange of real money.",
         *       "name": "Gambling"
         *     },
         *     {
         *       "id": "MatureGame",
         *       "description": "Games that are rated Mature or less suitable for a younger audience.",
         *       "name": "Mature-rated game"
         *     },
         *     {
         *       "id": "ProfanityVulgarity",
         *       "description": "Prolonged, and repeated use of obscenities, profanities, and vulgarities, especially as a regular part of speech.",
         *       "name": "Significant Profanity or Vulgarity"
         *     },
         *     {
         *       "id": "SexualThemes",
         *       "description": "Content that focuses on sexualized physical attributes and activities, sexual topics, or experiences.",
         *       "name": "Sexual Themes"
         *     },
         *     {
         *       "id": "ViolentGraphic",
         *       "description": "Simulations and/or depictions of realistic violence, gore, extreme injury, or death.",
         *       "name": "Violent and Graphic Depictions"
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @param {string?} locale Locale for the Content Classification Labels. You may specify a maximum of 1 locale. Default: `“en-US”`Supported locales: `"bg-BG", "cs-CZ", "da-DK", "da-DK", "de-DE", "el-GR", "en-GB", "en-US", "es-ES", "es-MX", "fi-FI", "fr-FR", "hu-HU", "it-IT", "ja-JP", "ko-KR", "nl-NL", "no-NO", "pl-PL", "pt-BT", "pt-PT", "ro-RO", "ru-RU", "sk-SK", "sv-SE", "th-TH", "tr-TR", "vi-VN", "zh-CN", "zh-TW"`
         * @returns {Promise<GetContentClassificationLabelsResponse>} 
         */
        getContentClassificationLabels(locale=null) {
            return reqFunc("https://api.twitch.tv/helix/content_classification_labels",
                [],
                ["app", "user"],
                {locale: locale},
                {},
                {}
            );
        },
    },
    Entitlements: {
        /**
         * @typedef GetDropsEntitlementsResponse_Data
         * @prop {string} id An ID that identifies the entitlement.
         * @prop {string} benefitId An ID that identifies the benefit (reward).
         * @prop {string} timestamp The UTC date and time (in RFC3339 format) of when the entitlement was granted.
         * @prop {string} userId An ID that identifies the user who was granted the entitlement.
         * @prop {string} gameId An ID that identifies the game the user was playing when the reward was entitled.
         * @prop {"CLAIMED"|"FULFILLED"} fulfillmentStatus The entitlement’s fulfillment status. Possible values are: - CLAIMED
         *
         * - FULFILLED
         * @prop {string} lastUpdated The UTC date and time (in RFC3339 format) of when the entitlement was last updated.
         */
        /**
         * @typedef GetDropsEntitlementsResponse_Pagination
         * @prop {string} cursor The cursor used to get the next page of results. Set the request’s after query parameter to this value to page forward through the results.
         */
        /**
         * @typedef GetDropsEntitlementsResponse
         * @prop {GetDropsEntitlementsResponse_Data[]} data The list of entitlements.
         * @prop {GetDropsEntitlementsResponse_Pagination} pagination The information used to page through the list of results. The object is empty if there are no more pages left to page through. [Read More](https://dev.twitch.tv/docs/api/guide#pagination)
         */
        /**
         * Gets an organization’s list of entitlements that have been granted to a game, a user, or both.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-drops-entitlements)
         *
         * ---
         * 
         *
         * *NOTE:* Entitlements returned in the response body data are not guaranteed to be sorted by any field returned by the API. To retrieve *CLAIMED* or *FULFILLED* entitlements, use the `fulfillment_status` query parameter to filter results. To retrieve entitlements for a specific game, use the `game_id` query parameter to filter results.
         *
         * The following table identifies the request parameters that you may specify based on the type of access token used.
         *
         * Access token type Parameter Description App None If you don’t specify request parameters, the request returns all entitlements that your organization owns. App user_id The request returns all entitlements for any game that the organization granted to the specified user. App user_id, game_id The request returns all entitlements that the specified game granted to the specified user. App game_id The request returns all entitlements that the specified game granted to all entitled users. User None If you don’t specify request parameters, the request returns all entitlements for any game that the organization granted to the user identified in the access token. User user_id Invalid. User user_id, game_id Invalid. User game_id The request returns all entitlements that the specified game granted to the user identified in the access token.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires an [app access token](https://dev.twitch.tv/docs/authentication#app-access-tokens) or a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens))
         *
         * INFO: The ID in the broadcaster_id query parameter must match the user ID in the access token or the user ID in the access token must be a moderator for the specified broadcaster.
         *
         * ---
         * *Examples*: 
         * 
         * Example 1: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/entitlements/drops?user_id=25009227&game_id=33214' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "id": "fb78259e-fb81-4d1b-8333-34a06ffc24c0",
         *       "benefit_id": "74c52265-e214-48a6-91b9-23b6014e8041",
         *       "timestamp": "2019-01-28T04:17:53.325Z",
         *       "user_id": "25009227",
         *       "game_id": "33214",
         *       "fulfillment_status": "CLAIMED",
         *       "last_updated": "2019-01-28T04:17:53.325Z"
         *     },
         *     {
         *       "id": "862750a5-265e-4ab6-9f0a-c64df3d54dd0",
         *       "benefit_id": "74c52265-e214-48a6-91b9-23b6014e8041",
         *       "timestamp": "2019-01-28T04:16:53.325Z",
         *       "user_id": "25009227",
         *       "game_id": "33214",
         *       "fulfillment_status": "CLAIMED",
         *       "last_updated": "2021-06-15T04:16:53.325Z"
         *     },
         *     {
         *       "id": "d8879baa-3966-4d10-8856-15fdd62cce02",
         *       "benefit_id": "cdfdc5c3-65a2-43bc-8767-fde06eb4ab2c",
         *       "timestamp": "2019-01-28T04:15:53.325Z",
         *       "user_id": "25009227",
         *       "game_id": "33214",
         *       "fulfillment_status": "FULFILLED",
         *       "last_updated": "2019-01-28T04:17:53.325Z"
         *     },
         *     ...
         *   ],
         *   "pagination": {
         *     "cursor": "eyJiIjpudW..."
         *   }
         * }
         * ```
         *
         * ---
         * @param {string?} id An ID that identifies the entitlement to get. Include this parameter for each entitlement you want to get. For example, `id=1234&id=5678`. You may specify a maximum of 100 IDs.
         * @param {string?} userId An ID that identifies a user that was granted entitlements.
         * @param {string?} gameId An ID that identifies a game that offered entitlements.
         * @param {"CLAIMED"|"FULFILLED"?} fulfillmentStatus The entitlement’s fulfillment status. Used to filter the list to only those with the specified status. Possible values are: - CLAIMED
         *
         * - FULFILLED
         * @param {string?} after The cursor used to get the next page of results. The *Pagination* object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination)
         * @param {number?} first The maximum number of entitlements to return per page in the response. The minimum page size is 1 entitlement per page and the maximum is 1000. The default is 20.
         * @returns {Promise<GetDropsEntitlementsResponse>} 
         */
        getDropsEntitlements(id=null, userId=null, gameId=null, fulfillmentStatus=null, after=null, first=null) {
            return reqFunc("https://api.twitch.tv/helix/entitlements/drops",
                [],
                ["app", "user"],
                {id: id, user_id: userId, game_id: gameId, fulfillment_status: fulfillmentStatus, after: after, first: first},
                {},
                {200: "Successfully retrieved the entitlements.", 400: "- The value in the fulfillment_status query parameter is not valid.\n- The ID in the user_id query parameter must match the user ID in the user access token.\n- The client in the access token is not associated with a known organization.\n- The owner of the client in the access token is not a member of the organization.", 401: "- The ID in the Client-Id header must match the Client ID in the access token.\n- The Authorization header is required and must specify an app access token or user access token.\n- The access token is not valid.", 403: "- The organization associated with the client in the access token must own the game specified in the game_id query parameter.\n- The organization associated with the client in the access token must own the entitlements specified in the id query parameter.", 500: ""}
            );
        },
        /**
         * @typedef UpdateDropsEntitlementsResponse_Data
         * @prop {"INVALID_ID"|"NOT_FOUND"|"SUCCESS"|"UNAUTHORIZED"|"UPDATE_FAILED"} status A string that indicates whether the status of the entitlements in the `ids` field were successfully updated. Possible values are:
         *
         * - INVALID_ID — The entitlement IDs in the `ids` field are not valid.
         *
         * - NOT_FOUND — The entitlement IDs in the `ids` field were not found.
         *
         * - SUCCESS — The status of the entitlements in the `ids` field were successfully updated.
         *
         * - UNAUTHORIZED — The user or organization identified by the user access token is not authorized to update the entitlements.
         *
         * - UPDATE_FAILED — The update failed. These are considered transient errors and the request should be retried later.
         * @prop {string[]} ids The list of entitlements that the status in the `status` field applies to.
         */
        /**
         * @typedef UpdateDropsEntitlementsResponse
         * @prop {UpdateDropsEntitlementsResponse_Data[]} data A list that indicates which entitlements were successfully updated and those that weren’t.
         */
        /**
         * Updates the Drop entitlement’s fulfillment status.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#update-drops-entitlements)
         *
         * ---
         * 
         *
         * The following table identifies which entitlements are updated based on the type of access token used.
         *
         * Access token type Data that’s updated App Updates all entitlements with benefits owned by the organization in the access token. User Updates all entitlements owned by the user in the access token and where the benefits are owned by the organization in the access token.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires an [app access token](https://dev.twitch.tv/docs/authentication#app-access-tokens) or a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens))
         *
         * INFO: The ID in the broadcaster_id query parameter must match the user ID in the access token or the user ID in the access token must be a moderator for the specified broadcaster.
         *
         * ---
         * *Examples*: 
         * 
         * Example 1: 
         * ```
         * curl -X PATCH 'https://api.twitch.tv/helix/entitlements/drops' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2' \
         * -H 'Content-Type: application/json' \
         * -d '{
         *   "fulfillment_status": "FULFILLED",
         *   "entitlement_ids": [
         *     "fb78259e-fb81-4d1b-8333-34a06ffc24c0",
         *     "862750a5-265e-4ab6-9f0a-c64df3d54dd0",
         *     "d8879baa-3966-4d10-8856-15fdd62cce02",
         *     "9a290126-7e3b-4f66-a9ae-551537893b65"
         *   ]
         * }'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "status": "SUCCESS",
         *       "ids": [
         *         "fb78259e-fb81-4d1b-8333-34a06ffc24c0", "862750a5-265e-4ab6-9f0a-c64df3d54dd0"
         *       ]
         *     },
         *     {
         *       "status": "UNAUTHORIZED",
         *       "ids": [
         *         "d8879baa-3966-4d10-8856-15fdd62cce02"
         *       ]
         *     },
         *     {
         *       "status": "UPDATE_FAILED",
         *       "ids": [
         *         "9a290126-7e3b-4f66-a9ae-551537893b65"
         *       ]
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @param {string[]?} entitlementIds A list of IDs that identify the entitlements to update. You may specify a maximum of 100 IDs.
         * @param {"CLAIMED"|"FULFILLED"?} fulfillmentStatus The fulfillment status to set the entitlements to. Possible values are:
         *
         * - CLAIMED — The user claimed the benefit.
         *
         * - FULFILLED — The developer granted the benefit that the user claimed.
         * @returns {Promise<UpdateDropsEntitlementsResponse>} 
         */
        updateDropsEntitlements(entitlementIds=null, fulfillmentStatus=null) {
            return reqFunc("https://api.twitch.tv/helix/entitlements/drops",
                [],
                ["app", "user"],
                {},
                {entitlement_ids: entitlementIds, fulfillment_status: fulfillmentStatus},
                {200: "Successfully requested the updates. Check the response to determine which updates succeeded.", 400: "- The value in the `fulfillment_status` field is not valid.\n- The client in the access token is not associated with a known organization.\n- The owner of the client in the access token is not a member of the organization.", 401: "- The Authorization header is required and must specify an app access token or user access token.\n- The access token is not valid.\n- The ID in the Client-Id header must match the Client ID in the access token.", 500: ""}
            );
        },
    },
    Extensions: {
        /**
         * @typedef GetExtensionConfigurationSegmentResponse_Data
         * @prop {"broadcaster"|"developer"|"global"} segment The type of segment. Possible values are: - broadcaster
         *
         * - developer
         *
         * - global
         * @prop {string} broadcasterId The ID of the broadcaster that installed the extension. The object includes this field only if the `segment` query parameter is set to developer or broadcaster.
         * @prop {string} content The contents of the segment. This string may be a plain-text string or a string-encoded JSON object.
         * @prop {string} version The version number that identifies this definition of the segment’s data.
         */
        /**
         * @typedef GetExtensionConfigurationSegmentResponse
         * @prop {GetExtensionConfigurationSegmentResponse_Data[]} data The list of requested configuration segments. The list is returned in the same order that you specified the list of segments in the request.
         */
        /**
         * Gets the specified configuration segment from the specified extension.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-extension-configuration-segment)
         *
         * ---
         * 
         *
         * *Rate Limits*: You may retrieve each segment a maximum of 20 times per minute.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a signed JSON Web Token (JWT) created by an Extension Backend Service (EBS). For signing requirements, see [Signing the JWT](https://dev.twitch.tv/docs/extensions/building/#signing-the-jwt).
         *
         * INFO: The signed JWT must include the `role`, `user_id`, and `exp` fields (see [JWT Schema](https://dev.twitch.tv/docs/extensions/reference/#jwt-schema)). The `role` field must be set to external.
         *
         * ---
         * *Examples*: 
         * 
         * Gets the global configuration segment from the specified extension. Because the request gets the global segment, it must not include the broadcaster_id query parameter.: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/extensions/configurations?extension_id=<your extension id>&segment=global' \
         * -H 'Authorization: Bearer <your JWT token>' \
         * -H 'Client-Id: <your client ID>'
         * ```
         * 
         * *Responses*: 
         * 
         * The following example shows a global segment that contains a plain-text string in the `content` field.The following example shows a global segment that contains a string-encoded JSON object in the `content` field.: 
         * ```
         * {
         *   "data": [
         *     {
         *       "segment": "global",
         *       "content": "{\"foo\":\"bar\"}",
         *       "version": "0.0.1"
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @param {string?} broadcasterId The ID of the broadcaster that installed the extension. This parameter is required if you set the segment parameter to broadcaster or developer. Do not specify this parameter if you set segment to global.
         * @param {string} extensionId The ID of the extension that contains the configuration segment you want to get.
         * @param {"broadcaster"|"developer"|"global"} segment The type of configuration segment to get. Possible case-sensitive values are: - broadcaster
         *
         * - developer
         *
         * - global
         *
         * You may specify one or more segments. To specify multiple segments, include the `segment` parameter for each segment to get. For example, `segment=broadcaster&segment=developer`. Ignores duplicate segments.
         * @returns {Promise<GetExtensionConfigurationSegmentResponse>} 
         */
        getExtensionConfigurationSegment(broadcasterId=null, extensionId, segment) {
            return reqFunc("https://api.twitch.tv/helix/extensions/configurations",
                [],
                ["JWT"],
                {broadcaster_id: broadcasterId, extension_id: extensionId, segment: segment},
                {},
                {200: "Successfully retrieved the configurations.", 400: "- The extension_id query parameter is required.\n- The value in the segment query parameter is not valid.\n- The broadcaster_id query parameter is required if the segment query parameter is set to broadcaster or developer.", 401: "- The Authorization header is required and must specify a JWT token.\n- The JWT token is not valid.\n- The Client-Id header is required.", 429: "- The app exceeded the number of requests that it may make per minute. See Rate Limits above."}
            );
        },
        /**
         * Updates a configuration segment.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#set-extension-configuration-segment)
         *
         * ---
         *  The segment is limited to 5 KB. Extensions that are active on a channel do not receive the updated configuration.
         *
         * *Rate Limits*: You may update the configuration a maximum of 20 times per minute.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a signed JSON Web Token (JWT) created by an Extension Backend Service (EBS). For signing requirements, see [Signing the JWT](https://dev.twitch.tv/docs/extensions/building/#signing-the-jwt).
         *
         * INFO: The signed JWT must include the `role`, `user_id`, and `exp` fields (see [JWT Schema](https://dev.twitch.tv/docs/extensions/reference/#jwt-schema)). The `role` field must be set to external.
         *
         * ---
         * *Examples*: 
         * 
         * Example 1: 
         * ```
         * curl -X PUT 'https://api.twitch.tv/helix/extensions/configurations' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2' \
         * -H 'Content-Type: application/json' \
         * -d '{
         *   "extension_id": "uo6dggojyb8d6soh92zknwmi5ej1q2",
         *   "segment": "global",
         *   "version": "0.0.1",
         *   "content": "hello config!"
         * }'
         * ```
         *
         * ---
         * @param {string} extensionId The ID of the extension to update.
         * @param {"broadcaster"|"developer"|"global"} segment The configuration segment to update. Possible case-sensitive values are:
         *
         * - broadcaster
         *
         * - developer
         *
         * - global
         * @param {string?} broadcasterId The ID of the broadcaster that installed the extension. Include this field only if the `segment` is set to developer or broadcaster.
         * @param {string?} content The contents of the segment. This string may be a plain-text string or a string-encoded JSON object.
         * @param {string?} version The version number that identifies this definition of the segment’s data. If not specified, the latest definition is updated.
         * @returns {Promise<void>} 
         */
        setExtensionConfigurationSegment(extensionId, segment, broadcasterId=null, content=null, version=null) {
            return reqFunc("https://api.twitch.tv/helix/extensions/configurations",
                [],
                ["JWT"],
                {},
                {extension_id: extensionId, segment: segment, broadcaster_id: broadcasterId, content: content, version: version},
                {204: "Successfully updated the configuration.", 400: "- The `broadcaster_id` field is required if `segment` is set to developer or broadcaster.", 401: "- The Authorization header is required and must specify a JWT token.\n- The JWT token is not valid.\n- The Client-Id header is required."}
            );
        },
        /**
         * Updates the extension’s required_configuration string.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#set-extension-required-configuration)
         *
         * ---
         *  Use this endpoint if your extension requires the broadcaster to configure the extension before activating it (to require configuration, you must select *Custom/My Own Service* in Extension [Capabilities](https://dev.twitch.tv/docs/extensions/life-cycle/#capabilities)). For more information, see [Required Configurations](https://dev.twitch.tv/docs/extensions/building#required-configurations) and [Setting Required Configuration](https://dev.twitch.tv/docs/extensions/building#setting-required-configuration-with-the-configuration-service-optional).
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a signed JSON Web Token (JWT) created by an Extension Backend Service (EBS). For signing requirements, see [Signing the JWT](https://dev.twitch.tv/docs/extensions/building/#signing-the-jwt).
         *
         * INFO: The signed JWT must include the `role`, `user_id`, and `exp` fields (see [JWT Schema](https://dev.twitch.tv/docs/extensions/reference/#jwt-schema)). The `role` field must be set to external.
         *
         * ---
         * *Examples*: 
         * 
         * Example 1: 
         * ```
         * curl -X PUT 'https://api.twitch.tv/helix/extensions/required_configuration?broadcaster_id=274637212' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2' \
         * -H 'Content-Type: application/json' \
         * -d '{
         *   "required_configuration": "RCS",
         *   "extension_id": "uo6dggojyb8d6soh92zknwmi5ej1q2",
         *   "extension_version": "0.0.1"
         * }'
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster that installed the extension on their channel.
         * @param {string} extensionId The ID of the extension to update.
         * @param {string} extensionVersion The version of the extension to update.
         * @param {string} requiredConfiguration The required_configuration string to use with the extension.
         * @returns {Promise<void>} 
         */
        setExtensionRequiredConfiguration(broadcasterId, extensionId, extensionVersion, requiredConfiguration) {
            return reqFunc("https://api.twitch.tv/helix/extensions/required_configuration",
                [],
                ["JWT"],
                {broadcaster_id: broadcasterId},
                {extension_id: extensionId, extension_version: extensionVersion, required_configuration: requiredConfiguration},
                {204: "Successfully updated the extension’s required_configuration string.", 400: "- The broadcaster_id query parameter is required.\n- The `extension_id` field is required.\n- The `extension_version` field is required.\n- The `required_configuration` field is required.", 401: "- The Authorization header is required and must specify a JWT token.\n- The JWT token is not valid.\n- The Client-Id header is required."}
            );
        },
        /**
         * Sends a message to one or more viewers.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#send-extension-pubsub-message)
         *
         * ---
         *  You can send messages to a specific channel or to all channels where your extension is active. This endpoint uses the same mechanism as the [send](https://dev.twitch.tv/docs/extensions/reference#send) JavaScript helper function used to send messages.
         *
         * *Rate Limits*: You may send a maximum of 100 messages per minute per combination of extension client ID and broadcaster ID.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a signed JSON Web Token (JWT) created by an Extension Backend Service (EBS). For signing requirements, see [Signing the JWT](https://dev.twitch.tv/docs/extensions/building/#signing-the-jwt).
         *
         * INFO: The signed JWT must include the `role`, `user_id`, and `exp` fields (see [JWT Schema](https://dev.twitch.tv/docs/extensions/reference/#jwt-schema)) along with the `channel_id` and `pubsub_perms` fields. The `role` field must be set to external.
         *
         * ---
         * *Examples*: 
         * 
         * Example 1: 
         * ```
         * curl -X POST 'https://api.twitch.tv/helix/extensions/pubsub' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2' \
         * -H 'Content-Type: application/json' \
         * -d '{
         *   "message": "hello world!",
         *   "broadcaster_id": "141981764",
         *   "target": ["broadcast"]
         * }'
         * ```
         *
         * ---
         * @returns {Promise<void>} 
         */
        sendExtensionPubSubMessage() {
            return reqFunc("undefined",
                [],
                ["JWT"],
                {},
                {},
                {}
            );
        },
        /**
         * @typedef GetExtensionLiveChannelsResponse_Data
         * @prop {string} broadcasterId The ID of the broadcaster that is streaming live and has installed or activated the extension.
         * @prop {string} broadcasterName The broadcaster’s display name.
         * @prop {string} gameName The name of the category or game being streamed.
         * @prop {string} gameId The ID of the category or game being streamed.
         * @prop {string} title The title of the broadcaster’s stream. May be an empty string if not specified.
         */
        /**
         * @typedef GetExtensionLiveChannelsResponse
         * @prop {GetExtensionLiveChannelsResponse_Data[]} data The list of broadcasters that are streaming live and that have installed or activated the extension.
         * @prop {string} pagination This field contains the cursor used to page through the results. The field is empty if there are no more pages left to page through. Note that this field is a string compared to other endpoints that use a *Pagination* object. [Read More](https://dev.twitch.tv/docs/api/guide#pagination)
         */
        /**
         * Gets a list of broadcasters that are streaming live and have installed or activated the extension.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-extension-live-channels)
         *
         * ---
         * 
         *
         * It may take a few minutes for the list to include or remove broadcasters that have recently gone live or stopped broadcasting.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires an [app access token](https://dev.twitch.tv/docs/authentication#app-access-tokens) or a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens))
         *
         * ---
         * *Examples*: 
         * 
         * Example 1: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/extensions/live?extension_id=uo6dggojyb8d6soh92zknwmi5ej1q2' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "broadcaster_id": "252766116",
         *       "broadcaster_name": "swoosh_xii",
         *       "game_name": "Tom Clancy's Rainbow Six Siege",
         *       "game_id": "460630",
         *       "title": "[PS4] ITA/ENG UNRANKED CHILLIN' (SUB 1/15) - !instagram !donation !sens !team !youtube"
         *     },
         *     {
         *       "broadcaster_id": "264525686",
         *       "broadcaster_name": "gaddem_",
         *       "game_name": "For Honor",
         *       "game_id": "490382",
         *       "title": "any Kätzchen ? - 680 Rep + > Kompetitive Kitten"
         *     },
         *     {
         *       "broadcaster_id": "264787895",
         *       "broadcaster_name": "LenhadorGameplay",
         *       "game_name": "For Honor",
         *       "game_id": "490382",
         *       "title": "Vazou o novo personagem! *Triste*"
         *     }
         *   ],
         *   "pagination": "YVc1emRHRnNiQ015TmpJek5qazVOVHBoYWpKbGRIZDFaR0Z5YjNCMGN6UTJNMkZ1TUdwM2FHWnBZbm8yYW5rNjoy"
         * }
         * ```
         *
         * ---
         * @param {string} extensionId The ID of the extension to get. Returns the list of broadcasters that are live and that have installed or activated this extension.
         * @param {number?} first The specific maximum number of items per page in the response. The actual number returned may be less than this limit. [Read More](https://dev.twitch.tv/docs/api/guide#pagination)
         * @param {string?} after The cursor used to get the next page of results. The `pagination` field in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination)
         * @returns {Promise<GetExtensionLiveChannelsResponse>} 
         */
        getExtensionLiveChannels(extensionId, first=null, after=null) {
            return reqFunc("https://api.twitch.tv/helix/extensions/live",
                [],
                ["app", "user"],
                {extension_id: extensionId, first: first, after: after},
                {},
                {200: "Successfully retrieved the list of broadcasters.", 400: "- The extension_id query parameter is required.\n- The pagination cursor is not valid.", 401: "- The Authorization header is required and must specify an app access token or user access token.\n- The access token is not valid.\n- The ID in the Client-Id header must match the client ID in the access token.", 404: "- The extension specified in the extension_id query parameter was not found or it's not being used in a live stream."}
            );
        },
        /**
         * Gets an extension’s list of shared secrets.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-extension-secrets)
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a signed JSON Web Token (JWT) created by an Extension Backend Service (EBS). For signing requirements, see [Signing the JWT](https://dev.twitch.tv/docs/extensions/building/#signing-the-jwt).
         *
         * INFO: The signed JWT must include the `role`, `user_id`, and `exp` fields (see [JWT Schema](https://dev.twitch.tv/docs/extensions/reference/#jwt-schema)). The `role` field must be set to external.
         *
         * ---
         * *Examples*: 
         * 
         * Example 1: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/extensions/jwt/secrets?extension_id=uo6dggojyb8d6soh92zknwmi5ej1q2' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "format_version": 1,
         *       "secrets": [
         *         {
         *           "content": "secret",
         *           "active_at": "2021-03-29T06:58:40.858343036Z",
         *           "expires_at": "2121-03-05T06:58:40.858343036Z"
         *         }
         *       ]
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @returns {Promise<void>} 
         */
        getExtensionSecrets() {
            return reqFunc("https://api.twitch.tv/helix/extensions/jwt/secrets",
                [],
                ["JWT"],
                {},
                {},
                {}
            );
        },
        /**
         * @typedef CreateExtensionSecretResponse_Data_Secrets
         * @prop {string} content The raw secret that you use with JWT encoding.
         * @prop {string} activeAt The UTC date and time (in RFC3339 format) that you may begin using this secret to sign a JWT.
         * @prop {string} expiresAt The UTC date and time (in RFC3339 format) that you must stop using this secret to decode a JWT.
         */
        /**
         * @typedef CreateExtensionSecretResponse_Data
         * @prop {number} formatVersion The version number that identifies this definition of the secret’s data.
         * @prop {CreateExtensionSecretResponse_Data_Secrets[]} secrets The list of secrets.
         */
        /**
         * @typedef CreateExtensionSecretResponse
         * @prop {CreateExtensionSecretResponse_Data[]} data A list that contains the newly added secrets.
         */
        /**
         * Creates a shared secret used to sign and verify JWT tokens.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#create-extension-secret)
         *
         * ---
         *  Creating a new secret removes the current secrets from service. Use this function only when you are ready to use the new secret it returns.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a signed JSON Web Token (JWT) created by an Extension Backend Service (EBS). For signing requirements, see [Signing the JWT](https://dev.twitch.tv/docs/extensions/building/#signing-the-jwt).
         *
         * INFO: The signed JWT must include the `role`, `user_id`, and `exp` fields (see [JWT Schema](https://dev.twitch.tv/docs/extensions/reference/#jwt-schema)). The `role` field must be set to external.
         *
         * ---
         * *Examples*: 
         * 
         * Example 1: 
         * ```
         * curl -X POST 'https://api.twitch.tv/helix/extensions/jwt/secrets?extension_id=uo6dggojyb8d6soh92zknwmi5ej1q2&delay=600' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "format_version": 1,
         *       "secrets": [
         *         {
         *           "content": "old-secret",
         *           "active_at": "2021-03-29T06:58:40.858343036Z",
         *           "expires_at": "2021-04-22T05:21:54.99261682Z"
         *         },
         *         {
         *           "content": "new-secret",
         *           "active_at": "2021-04-22T04:16:54.996365329Z",
         *           "expires_at": "2121-03-29T04:16:54.996365329Z"
         *         }
         *       ]
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @param {string} extensionId The ID of the extension to apply the shared secret to.
         * @param {number?} delay The amount of time, in seconds, to delay activating the secret. The delay should provide enough time for instances of the extension to gracefully switch over to the new secret. The minimum delay is 300 seconds (5 minutes). The default is 300 seconds.
         * @returns {Promise<CreateExtensionSecretResponse>} 
         */
        createExtensionSecret(extensionId, delay=null) {
            return reqFunc("https://api.twitch.tv/helix/extensions/jwt/secrets",
                [],
                ["JWT"],
                {extension_id: extensionId, delay: delay},
                {},
                {200: "Successfully created the new secret.", 400: "- The extension_id query parameter is required.\n- The delay specified in the delay query parameter is too short.", 401: "- The Authorization header is required and must specify a JWT token.\n- The JWT token is not valid.\n- The Client-Id header is required."}
            );
        },
        /**
         * Sends a message to the specified broadcaster’s chat room.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#send-extension-chat-message)
         *
         * ---
         *  The extension’s name is used as the username for the message in the chat room. To send a chat message, your extension must enable *Chat Capabilities* (under your extension’s *Capabilities* tab).
         *
         * *Rate Limits*: You may send a maximum of 12 messages per minute per channel.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a signed JSON Web Token (JWT) created by an Extension Backend Service (EBS). For signing requirements, see [Signing the JWT](https://dev.twitch.tv/docs/extensions/building/#signing-the-jwt).
         *
         * INFO: The signed JWT must include the `role` and `user_id` fields (see [JWT Schema](https://dev.twitch.tv/docs/extensions/reference/#jwt-schema)). The `role` field must be set to external.
         *
         * ---
         * *Examples*: 
         * 
         * Example 1: 
         * ```
         * curl -X POST 'https://api.twitch.tv/helix/extensions/chat?broadcaster_id=237757755' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2' \
         * -H 'Content-Type: application/json' \
         * -d '{
         *   "text": "Hello",
         *   "extension_id": "uo6dggojyb8d6soh92zknwmi5ej1q2",
         *   "extension_version": "0.0.9"
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster that has activated the extension.
         * @param {string} text The message. The message may contain a maximum of 280 characters.
         * @param {string} extensionId The ID of the extension that’s sending the chat message.
         * @param {string} extensionVersion The extension’s version number.
         * @returns {Promise<void>} 
         */
        sendExtensionChatMessage(broadcasterId, text, extensionId, extensionVersion) {
            return reqFunc("https://api.twitch.tv/helix/extensions/chat",
                [],
                ["JWT"],
                {broadcaster_id: broadcasterId},
                {text: text, extension_id: extensionId, extension_version: extensionVersion},
                {204: "Successfully sent the chat message.", 400: "- The broadcaster_id query parameter is required.\n- The `extension_id` field in the request's body is required.\n- The `extension_version` field in the request's body is required.\n- The `text` field in the request's body is required.\n- The message is too long.", 401: "- The Authorization header is required and must specify a JWT token.\n- The ID in the broadcaster_id query parameter must match the `channel_id` claim in the JWT.\n- The JWT token is not valid.\n- The Client-Id header is required."}
            );
        },
        /**
         * @typedef GetExtensionsResponse_Data_Views_Mobile
         * @prop {string} viewerUrl The HTML file that is shown to viewers on mobile devices. This page is presented to viewers as a panel behind the chat area of the mobile app.
         */
        /**
         * @typedef GetExtensionsResponse_Data_Views_Panel
         * @prop {string} viewerUrl The HTML file that is shown to viewers on the channel page when the extension is activated in a Panel slot.
         * @prop {number} height The height, in pixels, of the panel component that the extension is rendered in.
         * @prop {boolean} canLinkExternalContent A Boolean value that determines whether the extension can link to non-Twitch domains.
         */
        /**
         * @typedef GetExtensionsResponse_Data_Views_Video_overlay
         * @prop {string} viewerUrl The HTML file that is shown to viewers on the channel page when the extension is activated on the Video - Overlay slot.
         * @prop {boolean} canLinkExternalContent A Boolean value that determines whether the extension can link to non-Twitch domains.
         */
        /**
         * @typedef GetExtensionsResponse_Data_Views_Component
         * @prop {string} viewerUrl The HTML file that is shown to viewers on the channel page when the extension is activated in a Video - Component slot.
         * @prop {number} aspectRatioX The width value of the ratio (width : height) which determines the extension’s width, and how the extension’s iframe will resize in different video player environments.
         * @prop {number} aspectRatioY The height value of the ratio (width : height) which determines the extension’s height, and how the extension’s iframe will resize in different video player environments.
         * @prop {boolean} autoscale A Boolean value that determines whether to apply CSS zoom. If *true*, a CSS zoom is applied such that the size of the extension is variable but the inner dimensions are fixed based on Scale Pixels. This allows your extension to render as if it is of fixed width and height. If *false*, the inner dimensions of the extension iframe are variable, meaning your extension must implement responsiveness.
         * @prop {number} scalePixels The base width, in pixels, of the extension to use when scaling (see `autoscale`). This value is ignored if `autoscale` is *false*.
         * @prop {number} targetHeight The height as a percent of the maximum height of a video component extension. Values are between 1% - 100%.
         * @prop {boolean} canLinkExternalContent A Boolean value that determines whether the extension can link to non-Twitch domains.
         */
        /**
         * @typedef GetExtensionsResponse_Data_Views_Config
         * @prop {string} viewerUrl The HTML file shown to broadcasters while they are configuring your extension within the Extension Manager.
         * @prop {boolean} canLinkExternalContent A Boolean value that determines whether the extension can link to non-Twitch domains.
         */
        /**
         * @typedef GetExtensionsResponse_Data_Views
         * @prop {GetExtensionsResponse_Data_Views_Mobile} mobile Describes how the extension is displayed on mobile devices.
         * @prop {GetExtensionsResponse_Data_Views_Panel} panel Describes how the extension is rendered if the extension may be activated as a panel extension.
         * @prop {GetExtensionsResponse_Data_Views_Video_overlay} videoOverlay Describes how the extension is rendered if the extension may be activated as a video-overlay extension.
         * @prop {GetExtensionsResponse_Data_Views_Component} component Describes how the extension is rendered if the extension may be activated as a video-component extension.
         * @prop {GetExtensionsResponse_Data_Views_Config} config Describes the view that is shown to broadcasters while they are configuring your extension within the Extension Manager.
         */
        /**
         * @typedef GetExtensionsResponse_Data
         * @prop {string} authorName The name of the user or organization that owns the extension.
         * @prop {boolean} bitsEnabled A Boolean value that determines whether the extension has features that use Bits. Is *true* if the extension has features that use Bits.
         * @prop {boolean} canInstall A Boolean value that determines whether a user can install the extension on their channel. Is *true* if a user can install the extension.Typically, this is set to *false* if the extension is currently in testing mode and requires users to be allowlisted (the allowlist is configured on Twitch’s [developer site](https://dev.twitch.tv/console/extensions) under the *Extensions* -> *Extension* -> *Version* -> *Access*).
         * @prop {"hosted"|"custom"|"none"} configurationLocation The location of where the extension’s configuration is stored. Possible values are:
         *
         * - hosted — The Extensions Configuration Service hosts the configuration.
         *
         * - custom — The Extension Backend Service (EBS) hosts the configuration.
         *
         * - none — The extension doesn't require configuration.
         * @prop {string} description A longer description of the extension. It appears on the details page.
         * @prop {string} eulaTosUrl A URL to the extension’s Terms of Service.
         * @prop {boolean} hasChatSupport A Boolean value that determines whether the extension can communicate with the installed channel’s chat. Is *true* if the extension can communicate with the channel’s chat room.
         * @prop {string} iconUrl A URL to the default icon that’s displayed in the Extensions directory.
         * @prop {Map<string,string>} iconUrls A dictionary that contains URLs to different sizes of the default icon. The dictionary’s key identifies the icon’s size (for example, 24x24), and the dictionary’s value contains the URL to the icon.
         * @prop {string} id The extension’s ID.
         * @prop {string} name The extension’s name.
         * @prop {string} privacyPolicyUrl A URL to the extension’s privacy policy.
         * @prop {boolean} requestIdentityLink A Boolean value that determines whether the extension wants to explicitly ask viewers to link their Twitch identity.
         * @prop {string[]} screenshotUrls A list of URLs to screenshots that are shown in the Extensions marketplace.
         * @prop {"Approved"|"AssetsUploaded"|"Deleted"|"Deprecated"|"InReview"|"InTest"|"PendingAction"|"Rejected"|"Released"} state The extension’s state. Possible values are:
         *
         * - Approved
         *
         * - AssetsUploaded
         *
         * - Deleted
         *
         * - Deprecated
         *
         * - InReview
         *
         * - InTest
         *
         * - PendingAction
         *
         * - Rejected
         *
         * - Released
         * @prop {"none"|"optional"} subscriptionsSupportLevel Indicates whether the extension can view the user’s subscription level on the channel that the extension is installed on. Possible values are:
         *
         * - none — The extension can't view the user’s subscription level.
         *
         * - optional — The extension can view the user’s subscription level.
         * @prop {string} summary A short description of the extension that streamers see when hovering over the discovery splash screen in the Extensions manager.
         * @prop {string} supportEmail The email address that users use to get support for the extension.
         * @prop {string} version The extension’s version number.
         * @prop {string} viewerSummary A brief description displayed on the channel to explain how the extension works.
         * @prop {GetExtensionsResponse_Data_Views} views Describes all views-related information such as how the extension is displayed on mobile devices.
         * @prop {string[]} allowlistedConfigUrls Allowlisted configuration URLs for displaying the extension (the allowlist is configured on Twitch’s [developer site](https://dev.twitch.tv/console/extensions) under the *Extensions* -> *Extension* -> *Version* -> *Capabilities*).
         * @prop {string[]} allowlistedPanelUrls Allowlisted panel URLs for displaying the extension (the allowlist is configured on Twitch’s [developer site](https://dev.twitch.tv/console/extensions) under the *Extensions* -> *Extension* -> *Version* -> *Capabilities*).
         */
        /**
         * @typedef GetExtensionsResponse
         * @prop {GetExtensionsResponse_Data[]} data A list that contains the specified extension.
         */
        /**
         * Gets information about an extension.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-extensions)
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a signed JSON Web Token (JWT) created by an Extension Backend Service (EBS). For signing requirements, see [Signing the JWT](https://dev.twitch.tv/docs/extensions/building/#signing-the-jwt).
         *
         * INFO: The signed JWT must include the `role` and `user_id` fields (see [JWT Schema](https://dev.twitch.tv/docs/extensions/reference/#jwt-schema)). The `role` field must be set to external.
         *
         * ---
         * *Examples*: 
         * 
         * Example 1: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/extensions?extension_id=uo6dggojyb8d6soh92zknwmi5ej1q2&extension_version=0.0.9' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "author_name": "Twitch Developers",
         *       "bits_enabled": true,
         *       "can_install": false,
         *       "configuration_location": "hosted",
         *       "description": "An extension for testing all the features that we add to extensions",
         *       "eula_tos_url": "",
         *       "has_chat_support": true,
         *       "icon_url": "https://extensions-discovery-images.twitch.tv/pgn0bjv51epi7eaekt53tovjnc82qo/0.0.8/logob6c995d8-8b45-48cc-a748-b256e92ac1cd",
         *       "icon_urls": {
         *         "100x100": "https://extensions-discovery-images.twitch.tv/pgn0bjv51epi7eaekt53tovjnc82qo/0.0.8/logob6c995d8-8b45-48cc-a748-b256e92ac1cd",
         *         "24x24": "https://extensions-discovery-images.twitch.tv/pgn0bjv51epi7eaekt53tovjnc82qo/0.0.8/taskbar905b19da-e7e5-4d8f-beb7-f543a861ac1e",
         *         "300x200": "https://extensions-discovery-images.twitch.tv/pgn0bjv51epi7eaekt53tovjnc82qo/0.0.8/discoveryd9545b2c-5474-46d7-a523-1c3835d862ce"
         *       },
         *       "id": "pgn0bjv51epi7eaekt53tovjnc82qo",
         *       "name": "Official Developers Demo",
         *       "privacy_policy_url": "",
         *       "request_identity_link": true,
         *       "screenshot_urls": [
         *         "https://extensions-discovery-images.twitch.tv/pgn0bjv51epi7eaekt53tovjnc82qo/0.0.8/screenshotbdec475d-3d2f-4378-b334-941dfddc897a"
         *       ],
         *       "state": "Released",
         *       "subscriptions_support_level": "optional",
         *       "summary": "Test ALL the extensions features!",
         *       "support_email": "dx-extensions-test-dev@justin.tv",
         *       "version": "0.0.9",
         *       "viewer_summary": "Test ALL the extensions features!",
         *       "views": {
         *         "mobile": {
         *           "viewer_url": "https://pgn0bjv51epi7eaekt53tovjnc82qo.ext-twitch.tv/pgn0bjv51epi7eaekt53tovjnc82qo/0.0.9/f9a0d8aae0f9dd0b2d6ef3416b96bc79/index.html"
         *         },
         *         "panel": {
         *           "viewer_url": "https://pgn0bjv51epi7eaekt53tovjnc82qo.ext-twitch.tv/pgn0bjv51epi7eaekt53tovjnc82qo/0.0.9/f9a0d8aae0f9dd0b2d6ef3416b96bc79/index.html",
         *           "height": 300,
         *           "can_link_external_content": false
         *         },
         *         "video_overlay": {
         *           "viewer_url": "https://pgn0bjv51epi7eaekt53tovjnc82qo.ext-twitch.tv/pgn0bjv51epi7eaekt53tovjnc82qo/0.0.9/f9a0d8aae0f9dd0b2d6ef3416b96bc79/index.html",
         *           "can_link_external_content": false
         *         },
         *         "component": {
         *           "viewer_url": "https://pgn0bjv51epi7eaekt53tovjnc82qo.ext-twitch.tv/pgn0bjv51epi7eaekt53tovjnc82qo/0.0.9/f9a0d8aae0f9dd0b2d6ef3416b96bc79/index.html",
         *           "aspect_width": 0,
         *           "aspect_height": 0,
         *           "aspect_ratio_x": 48000,
         *           "aspect_ratio_y": 36000,
         *           "autoscale": true,
         *           "scale_pixels": 1024,
         *           "target_height": 5333,
         *           "size": 0,
         *           "zoom": false,
         *           "zoom_pixels": 0,
         *           "can_link_external_content": false
         *         }
         *       },
         *       "allowlisted_config_urls": [],
         *       "allowlisted_panel_urls": []
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @param {string} extensionId The ID of the extension to get.
         * @param {string?} extensionVersion The version of the extension to get. If not specified, it returns the latest, released version. If you don’t have a released version, you must specify a version; otherwise, the list is empty.
         * @returns {Promise<GetExtensionsResponse>} 
         */
        getExtensions(extensionId, extensionVersion=null) {
            return reqFunc("https://api.twitch.tv/helix/extensions",
                [],
                ["JWT"],
                {extension_id: extensionId, extension_version: extensionVersion},
                {},
                {200: "Successfully retrieved the list of extensions.", 400: "- The extension_id query parameter is required.", 401: "- The request must specify the Authorization header.\n- The Authorization header is required and must specify a JWT token.\n- The JWT token is not valid.\n- The request must specify the Client-Id header.", 404: "- The extension in the extension_id query parameter was not found."}
            );
        },
        /**
         * @typedef GetReleasedExtensionsResponse_Data_Views_Mobile
         * @prop {string} viewerUrl The HTML file that is shown to viewers on mobile devices. This page is presented to viewers as a panel behind the chat area of the mobile app.
         */
        /**
         * @typedef GetReleasedExtensionsResponse_Data_Views_Panel
         * @prop {string} viewerUrl The HTML file that is shown to viewers on the channel page when the extension is activated in a Panel slot.
         * @prop {number} height The height, in pixels, of the panel component that the extension is rendered in.
         * @prop {boolean} canLinkExternalContent A Boolean value that determines whether the extension can link to non-Twitch domains.
         */
        /**
         * @typedef GetReleasedExtensionsResponse_Data_Views_Video_overlay
         * @prop {string} viewerUrl The HTML file that is shown to viewers on the channel page when the extension is activated on the Video - Overlay slot.
         * @prop {boolean} canLinkExternalContent A Boolean value that determines whether the extension can link to non-Twitch domains.
         */
        /**
         * @typedef GetReleasedExtensionsResponse_Data_Views_Component
         * @prop {string} viewerUrl The HTML file that is shown to viewers on the channel page when the extension is activated in a Video - Component slot.
         * @prop {number} aspectRatioX The width value of the ratio (width : height) which determines the extension’s width, and how the extension’s iframe will resize in different video player environments.
         * @prop {number} aspectRatioY The height value of the ratio (width : height) which determines the extension’s height, and how the extension’s iframe will resize in different video player environments.
         * @prop {boolean} autoscale A Boolean value that determines whether to apply CSS zoom. If *true*, a CSS zoom is applied such that the size of the extension is variable but the inner dimensions are fixed based on Scale Pixels. This allows your extension to render as if it is of fixed width and height. If *false*, the inner dimensions of the extension iframe are variable, meaning your extension must implement responsiveness.
         * @prop {number} scalePixels The base width, in pixels, of the extension to use when scaling (see `autoscale`). This value is ignored if `autoscale` is *false*.
         * @prop {number} targetHeight The height as a percent of the maximum height of a video component extension. Values are between 1% - 100%.
         * @prop {boolean} canLinkExternalContent A Boolean value that determines whether the extension can link to non-Twitch domains.
         */
        /**
         * @typedef GetReleasedExtensionsResponse_Data_Views_Config
         * @prop {string} viewerUrl The HTML file shown to broadcasters while they are configuring your extension within the Extension Manager.
         * @prop {boolean} canLinkExternalContent A Boolean value that determines whether the extension can link to non-Twitch domains.
         */
        /**
         * @typedef GetReleasedExtensionsResponse_Data_Views
         * @prop {GetReleasedExtensionsResponse_Data_Views_Mobile} mobile Describes how the extension is displayed on mobile devices.
         * @prop {GetReleasedExtensionsResponse_Data_Views_Panel} panel Describes how the extension is rendered if the extension may be activated as a panel extension.
         * @prop {GetReleasedExtensionsResponse_Data_Views_Video_overlay} videoOverlay Describes how the extension is rendered if the extension may be activated as a video-overlay extension.
         * @prop {GetReleasedExtensionsResponse_Data_Views_Component} component Describes how the extension is rendered if the extension may be activated as a video-component extension.
         * @prop {GetReleasedExtensionsResponse_Data_Views_Config} config Describes the view that is shown to broadcasters while they are configuring your extension within the Extension Manager.
         */
        /**
         * @typedef GetReleasedExtensionsResponse_Data
         * @prop {string} authorName The name of the user or organization that owns the extension.
         * @prop {boolean} bitsEnabled A Boolean value that determines whether the extension has features that use Bits. Is *true* if the extension has features that use Bits.
         * @prop {boolean} canInstall A Boolean value that determines whether a user can install the extension on their channel. Is *true* if a user can install the extension.Typically, this is set to *false* if the extension is currently in testing mode and requires users to be allowlisted (the allowlist is configured on Twitch’s [developer site](https://dev.twitch.tv/console/extensions) under the *Extensions* -> *Extension* -> *Version* -> *Access*).
         * @prop {"hosted"|"custom"|"none"} configurationLocation The location of where the extension’s configuration is stored. Possible values are:
         *
         * - hosted — The Extensions Configuration Service hosts the configuration.
         *
         * - custom — The Extension Backend Service (EBS) hosts the configuration.
         *
         * - none — The extension doesn't require configuration.
         * @prop {string} description A longer description of the extension. It appears on the details page.
         * @prop {string} eulaTosUrl A URL to the extension’s Terms of Service.
         * @prop {boolean} hasChatSupport A Boolean value that determines whether the extension can communicate with the installed channel’s chat. Is *true* if the extension can communicate with the channel’s chat room.
         * @prop {string} iconUrl A URL to the default icon that’s displayed in the Extensions directory.
         * @prop {Map<string,string>} iconUrls A dictionary that contains URLs to different sizes of the default icon. The dictionary’s key identifies the icon’s size (for example, 24x24), and the dictionary’s value contains the URL to the icon.
         * @prop {string} id The extension’s ID.
         * @prop {string} name The extension’s name.
         * @prop {string} privacyPolicyUrl A URL to the extension’s privacy policy.
         * @prop {boolean} requestIdentityLink A Boolean value that determines whether the extension wants to explicitly ask viewers to link their Twitch identity.
         * @prop {string[]} screenshotUrls A list of URLs to screenshots that are shown in the Extensions marketplace.
         * @prop {"Approved"|"AssetsUploaded"|"Deleted"|"Deprecated"|"InReview"|"InTest"|"PendingAction"|"Rejected"|"Released"} state The extension’s state. Possible values are:
         *
         * - Approved
         *
         * - AssetsUploaded
         *
         * - Deleted
         *
         * - Deprecated
         *
         * - InReview
         *
         * - InTest
         *
         * - PendingAction
         *
         * - Rejected
         *
         * - Released
         * @prop {"none"|"optional"} subscriptionsSupportLevel Indicates whether the extension can view the user’s subscription level on the channel that the extension is installed on. Possible values are:
         *
         * - none — The extension can't view the user’s subscription level.
         *
         * - optional — The extension can view the user’s subscription level.
         * @prop {string} summary A short description of the extension that streamers see when hovering over the discovery splash screen in the Extensions manager.
         * @prop {string} supportEmail The email address that users use to get support for the extension.
         * @prop {string} version The extension’s version number.
         * @prop {string} viewerSummary A brief description displayed on the channel to explain how the extension works.
         * @prop {GetReleasedExtensionsResponse_Data_Views} views Describes all views-related information such as how the extension is displayed on mobile devices.
         * @prop {string[]} allowlistedConfigUrls Allowlisted configuration URLs for displaying the extension (the allowlist is configured on Twitch’s [developer site](https://dev.twitch.tv/console/extensions) under the *Extensions* -> *Extension* -> *Version* -> *Capabilities*).
         * @prop {string[]} allowlistedPanelUrls Allowlisted panel URLs for displaying the extension (the allowlist is configured on Twitch’s [developer site](https://dev.twitch.tv/console/extensions) under the *Extensions* -> *Extension* -> *Version* -> *Capabilities*).
         */
        /**
         * @typedef GetReleasedExtensionsResponse
         * @prop {GetReleasedExtensionsResponse_Data[]} data A list that contains the specified extension.
         */
        /**
         * Gets information about a released extension.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-released-extensions)
         *
         * ---
         *  Returns the extension if its `state` is Released.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires an [app access token](https://dev.twitch.tv/docs/authentication#app-access-tokens) or a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens))
         *
         * ---
         * *Examples*: 
         * 
         * Example 1: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/extensions/released?extension_version=0.0.9&extension_id=uo6dggojyb8d6soh92zknwmi5ej1q2' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "author_name": "Twitch Developer Experience",
         *       "bits_enabled": true,
         *       "can_install": false,
         *       "configuration_location": "hosted",
         *       "description": "An extension for testing all the features that we add to extensions",
         *       "eula_tos_url": "",
         *       "has_chat_support": true,
         *       "icon_url": "https://extensions-discovery-images.twitch.tv/pgn0bjv51epi7eaekt53tovjnc82qo/0.0.8/logob6c995d8-8b45-48cc-a748-b256e92ac1cd",
         *       "icon_urls": {
         *         "100x100": "https://extensions-discovery-images.twitch.tv/pgn0bjv51epi7eaekt53tovjnc82qo/0.0.8/logob6c995d8-8b45-48cc-a748-b256e92ac1cd",
         *         "24x24": "https://extensions-discovery-images.twitch.tv/pgn0bjv51epi7eaekt53tovjnc82qo/0.0.8/taskbar905b19da-e7e5-4d8f-beb7-f543a861ac1e",
         *         "300x200": "https://extensions-discovery-images.twitch.tv/pgn0bjv51epi7eaekt53tovjnc82qo/0.0.8/discoveryd9545b2c-5474-46d7-a523-1c3835d862ce"
         *       },
         *       "id": "pgn0bjv51epi7eaekt53tovjnc82qo",
         *       "name": "Official Developer Experience Demo",
         *       "privacy_policy_url": "",
         *       "request_identity_link": true,
         *       "screenshot_urls": [
         *         "https://extensions-discovery-images.twitch.tv/pgn0bjv51epi7eaekt53tovjnc82qo/0.0.8/screenshotbdec475d-3d2f-4378-b334-941dfddc897a"
         *       ],
         *       "state": "Released",
         *       "subscriptions_support_level": "optional",
         *       "summary": "Test ALL the extensions features!",
         *       "support_email": "dx-extensions-test-dev@justin.tv",
         *       "version": "0.0.9",
         *       "viewer_summary": "Test ALL the extensions features!",
         *       "views": {
         *         "mobile": {
         *           "viewer_url": "https://pgn0bjv51epi7eaekt53tovjnc82qo.ext-twitch.tv/pgn0bjv51epi7eaekt53tovjnc82qo/0.0.9/f9a0d8aae0f9dd0b2d6ef3416b96bc79/index.html"
         *         },
         *         "panel": {
         *           "viewer_url": "https://pgn0bjv51epi7eaekt53tovjnc82qo.ext-twitch.tv/pgn0bjv51epi7eaekt53tovjnc82qo/0.0.9/f9a0d8aae0f9dd0b2d6ef3416b96bc79/index.html",
         *           "height": 300,
         *           "can_link_external_content": false
         *         },
         *         "video_overlay": {
         *           "viewer_url": "https://pgn0bjv51epi7eaekt53tovjnc82qo.ext-twitch.tv/pgn0bjv51epi7eaekt53tovjnc82qo/0.0.9/f9a0d8aae0f9dd0b2d6ef3416b96bc79/index.html",
         *           "can_link_external_content": false
         *         },
         *         "component": {
         *           "viewer_url": "https://pgn0bjv51epi7eaekt53tovjnc82qo.ext-twitch.tv/pgn0bjv51epi7eaekt53tovjnc82qo/0.0.9/f9a0d8aae0f9dd0b2d6ef3416b96bc79/index.html",
         *           "aspect_width": 0,
         *           "aspect_height": 0,
         *           "aspect_ratio_x": 48000,
         *           "aspect_ratio_y": 36000,
         *           "autoscale": true,
         *           "scale_pixels": 1024,
         *           "target_height": 5333,
         *           "size": 0,
         *           "zoom": false,
         *           "zoom_pixels": 0,
         *           "can_link_external_content": false
         *         }
         *       },
         *       "allowlisted_config_urls": [],
         *       "allowlisted_panel_urls": []
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @param {string} extensionId The ID of the extension to get.
         * @param {string?} extensionVersion The version of the extension to get. If not specified, it returns the latest version.
         * @returns {Promise<GetReleasedExtensionsResponse>} 
         */
        getReleasedExtensions(extensionId, extensionVersion=null) {
            return reqFunc("https://api.twitch.tv/helix/extensions/released",
                [],
                ["app", "user"],
                {extension_id: extensionId, extension_version: extensionVersion},
                {},
                {200: "Successfully retrieved the extension.", 400: "- The extension_id query parameter is required.", 401: "- The Authorization header must specify an app access token or user access token.\n- The access token is not valid.\n- The ID in the Client-Id header must match the client ID in the access token.", 404: "- The extension specified in the extension_id query parameter was not found or is not released."}
            );
        },
        /**
         * @typedef GetExtensionBitsProductsResponse_Data_Cost
         * @prop {number} amount The product’s price.
         * @prop {"bits"} type The type of currency. Possible values are:
         *
         * - bits
         */
        /**
         * @typedef GetExtensionBitsProductsResponse_Data
         * @prop {string} sku The product’s SKU. The SKU is unique across an extension’s products.
         * @prop {GetExtensionBitsProductsResponse_Data_Cost} cost An object that contains the product’s cost information.
         * @prop {boolean} inDevelopment A Boolean value that indicates whether the product is in development. If *true*, the product is not available for public use.
         * @prop {string} displayName The product’s name as displayed in the extension.
         * @prop {string} expiration The date and time, in RFC3339 format, when the product expires.
         * @prop {boolean} isBroadcast A Boolean value that determines whether Bits product purchase events are broadcast to all instances of an extension on a channel. The events are broadcast via the `onTransactionComplete` helper callback. Is *true* if the event is broadcast to all instances.
         */
        /**
         * @typedef GetExtensionBitsProductsResponse
         * @prop {GetExtensionBitsProductsResponse_Data[]} data A list of Bits products that the extension created. The list is in ascending SKU order. The list is empty if the extension hasn’t created any products or they’re all expired or disabled.
         */
        /**
         * Gets the list of Bits products that belongs to the extension.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-extension-bits-products)
         *
         * ---
         *  The client ID in the app access token identifies the extension.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires an [app access token](https://dev.twitch.tv/docs/authentication#app-access-tokens)
         *
         * INFO: The client ID in the app access token must be the extension’s client ID.
         *
         * ---
         * *Examples*: 
         * 
         * Gets the extension’s products including its disabled and expired products.: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/bits/extensions?should_include_all=true' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "sku": "1010",
         *       "cost": {
         *         "amount": 990,
         *         "type": "bits"
         *       },
         *       "in_development": true,
         *       "display_name": "Rusty Crate 2",
         *       "expiration": "2021-05-18T09:10:13.397Z",
         *       "is_broadcast": false
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @param {boolean?} shouldIncludeAll A Boolean value that determines whether to include disabled or expired Bits products in the response. The default is *false*.
         * @returns {Promise<GetExtensionBitsProductsResponse>} 
         */
        getExtensionBitsProducts(shouldIncludeAll=null) {
            return reqFunc("https://api.twitch.tv/helix/bits/extensions",
                [],
                ["app"],
                {should_include_all: shouldIncludeAll},
                {},
                {200: "Successfully retrieved the list of products.", 400: "- The ID in the Client-Id header must belong to an extension.", 401: "- The Authorization header is required and must specify an app access token; you may not specify a user access token.\n- The OAuth token is not valid.\n- The ID in the Client-Id header must match the Client ID in the OAuth token."}
            );
        },
        /**
         * Adds or updates a Bits product that the extension created.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#update-extension-bits-product)
         *
         * ---
         *  If the SKU doesn’t exist, the product is added. You may update all fields except the `sku` field.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires an [app access token](https://dev.twitch.tv/docs/authentication#app-access-tokens)
         *
         * INFO: The client ID in the app access token must be the extension’s client ID.
         *
         * ---
         * *Examples*: 
         * 
         * Example 1: 
         * ```
         * curl -X PUT 'https://api.twitch.tv/helix/bits/extensions' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2' \
         * -H 'Content-Type: application/json' \
         * -d {
         *   "sku": "1010",
         *   "cost": {
         *     "amount": 990,
         *     "type": "bits"
         *   },
         *   "in_development": true,
         *   "display_name": "Rusty Crate 2",
         *   "is_broadcast": true,
         *   "expiration": "2021-05-18T09:10:13.397Z"
         * }
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "sku": "1010",
         *       "cost": {
         *         "amount": 990,
         *         "type": "bits"
         *       },
         *       "in_development": true,
         *       "display_name": "Rusty Crate 2",
         *       "expiration": "2021-05-18T09:10:13.397Z",
         *       "is_broadcast": true
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @returns {Promise<void>} 
         */
        updateExtensionBitsProduct() {
            return reqFunc("https://api.twitch.tv/helix/bits/extensions",
                [],
                ["app"],
                {},
                {},
                {}
            );
        },
    },
    EventSub: {
        /**
         * Creates an EventSub subscription.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#create-eventsub-subscription)
         *
         * ---
         * *Authentication*: 
         * 
         * Requires an [app access token](https://dev.twitch.tv/docs/authentication#app-access-tokens) or a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens))
         *
         * INFO: If you use [webhooks to receive events](https://dev.twitch.tv/docs/eventsub/handling-webhook-events), the request must specify an app access token. The request will fail if you use a user access token. If the subscription type requires user authorization, the user must have granted your app (client ID) permissions to receive those events before you subscribe to them. For example, to subscribe to [channel.subscribe](https://dev.twitch.tv/docs/eventsub/eventsub-subscription-types/#channelsubscribe) events, your app must get a user access token that includes the `channel:read:subscriptions` scope, which adds the required permission to your app access token’s client ID.
         *
         * ---
         * *Examples*: 
         * 
         * For a *webhook* `method` type. Adds a user.update subscription.For a *websocket* `method` type.For a *conduit* `method` type.: 
         * ```
         * {
         *   "data": [
         *     {
         *       "id": "26b1c993-bfcf-44d9-b876-379dacafe75a",
         *       "status": "enabled",
         *       "type": "user.update",
         *       "version": "1",
         *       "condition": {
         *         "user_id": "1234"
         *       },
         *       "created_at": "2020-11-10T14:32:18.730260295Z",
         *       "transport": {
         *         "method": "conduit",
         *         "conduit_id": "bfcfc993-26b1-b876-44d9-afe75a379dac"
         *       },
         *       "cost": 1
         *     }
         *   ],
         *   "total": 1,
         *   "total_cost": 1,
         *   "max_total_cost": 10000
         * }
         * ```
         *
         * ---
         * @returns {Promise<void>} 
         */
        createEventSubSubscription() {
            return reqFunc("undefined",
                [],
                ["app", "user"],
                {},
                {},
                {}
            );
        },
        /**
         * Deletes an EventSub subscription.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#delete-eventsub-subscription)
         *
         * ---
         * *Authentication*: 
         * 
         * Requires an [app access token](https://dev.twitch.tv/docs/authentication#app-access-tokens) or a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens))
         *
         * INFO: If you use [webhooks to receive events](https://dev.twitch.tv/docs/eventsub/handling-webhook-events), the request must specify an app access token. The request will fail if you use a user access token.
         *
         * ---
         * *Examples*: 
         * 
         * Deletes the specified EventSub subscription.: 
         * ```
         * # Twitch CLI example that deletes the specified subscription.
         * 
         * twitch api delete /eventsub/subscriptions -q id=c839a466-034a-4d77-8d4d-c9a751516e7
         * ```
         *
         * ---
         * @returns {Promise<void>} 
         */
        deleteEventSubSubscription() {
            return reqFunc("undefined",
                [],
                ["app", "user"],
                {},
                {},
                {}
            );
        },
        /**
         * Gets a list of EventSub subscriptions that the client in the access token created.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-eventsub-subscriptions)
         *
         * ---
         * *Authentication*: 
         * 
         * Requires an [app access token](https://dev.twitch.tv/docs/authentication#app-access-tokens) or a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens))
         *
         * INFO: If you use [Webhooks](https://dev.twitch.tv/docs/eventsub/handling-webhook-events) or [Conduits](https://dev.twitch.tv/docs/eventsub/handling-conduit-events/) to receive events, the request must specify an app access token. The request will fail if you use a user access token.
         *
         * ---
         * *Examples*: 
         * 
         * Gets a list of EventSub subscriptions that you created. The list is ordered by the oldest subscription first.: 
         * ```
         * # Twitch CLI example that gets a list of EventSub subscriptions that you created.
         * 
         * twitch api get /eventsub/subscriptions
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "total": 2,
         *   "data": [
         *     {
         *       "id": "26b1c993-bfcf-44d9-b876-379dacafe75a",
         *       "status": "enabled",
         *       "type": "stream.online",
         *       "version": "1",
         *       "condition": {
         *         "broadcaster_user_id": "1234"
         *       },
         *       "created_at": "2020-11-10T20:08:33.12345678Z",
         *       "transport": {
         *         "method": "webhook",
         *         "callback": "https://this-is-a-callback.com"
         *       },
         *       "cost": 1
         *     },
         *     {
         *       "id": "35016908-41ff-33ce-7879-61b8dfc2ee16",
         *       "status": "webhook_callback_verification_pending",
         *       "type": "user.update",
         *       "version": "1",
         *       "condition": {
         *         "user_id": "1234"
         *       },
         *       "created_at": "2020-11-10T14:32:18.730260295Z",
         *       "transport": {
         *         "method": "webhook",
         *         "callback": "https://this-is-a-callback.com"
         *       },
         *       "cost": 0
         *     }
         *   ],
         *   "total_cost": 1,
         *   "max_total_cost": 10000,
         *   "pagination": {}
         * }
         * ```
         *
         * ---
         * @returns {Promise<void>} 
         */
        getEventSubSubscriptions() {
            return reqFunc("undefined",
                [],
                ["app", "user"],
                {},
                {},
                {}
            );
        },
    },
    Games: {
        /**
         * @typedef GetTopGamesResponse_Data
         * @prop {string} id An ID that identifies the category or game.
         * @prop {string} name The category’s or game’s name.
         * @prop {string} boxArtUrl A URL to the category’s or game’s box art. You must replace the `{width}x{height}` placeholder with the size of image you want.
         * @prop {string} igdbId The ID that [IGDB](https://www.igdb.com/) uses to identify this game. If the IGDB ID is not available to Twitch, this field is set to an empty string.
         */
        /**
         * @typedef GetTopGamesResponse_Pagination
         * @prop {string} cursor The cursor used to get the next page of results. Use the cursor to set the request’s after or before query parameter to get the next or previous page of results.
         */
        /**
         * @typedef GetTopGamesResponse
         * @prop {GetTopGamesResponse_Data[]} data The list of broadcasts. The broadcasts are sorted by the number of viewers, with the most popular first.
         * @prop {GetTopGamesResponse_Pagination} pagination Contains the information used to page through the list of results. The object is empty if there are no more pages left to page through. [Read More](https://dev.twitch.tv/docs/api/guide#pagination)
         */
        /**
         * Gets information about all broadcasts on Twitch.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-top-games)
         *
         * ---
         * *Authentication*: 
         * 
         * Requires an [app access token](https://dev.twitch.tv/docs/authentication#app-access-tokens) or a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens))
         *
         * ---
         * *Examples*: 
         * 
         * Example 1: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/games/top' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "id": "493057",
         *       "name": "PUBG: BATTLEGROUNDS",
         *       "box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/493057-{width}x{height}.jpg",
         *       "igdb_id": "27789"
         *     },
         *     ...
         *   ],
         *   "pagination":{"cursor":"eyJiIjpudWxsLCJhIjp7Ik9mZnNldCI6MjB9fQ=="}
         * }
         * ```
         *
         * ---
         * @param {number?} first The maximum number of items to return per page in the response. The minimum page size is 1 item per page and the maximum is 100 items per page. The default is 20.
         * @param {string?} after The cursor used to get the next page of results. The *Pagination* object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination)
         * @param {string?} before The cursor used to get the previous page of results. The *Pagination* object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination)
         * @returns {Promise<GetTopGamesResponse>} 
         */
        getTopGames(first=null, after=null, before=null) {
            return reqFunc("https://api.twitch.tv/helix/games/top",
                [],
                ["app", "user"],
                {first: first, after: after, before: before},
                {},
                {200: "Successfully retrieved the list of broadcasts.", 400: "- The value in the first query parameter is not valid.\n- The cursor in the after or before query parameter is not valid.", 401: "- The Authorization header is required and must specify an app access token or user access token.\n- The access token is not valid.\n- The ID in the Client-Id header must match the client ID in the access token."}
            );
        },
        /**
         * @typedef GetGamesResponse_Data
         * @prop {string} id An ID that identifies the category or game.
         * @prop {string} name The category’s or game’s name.
         * @prop {string} boxArtUrl A URL to the category’s or game’s box art. You must replace the `{width}x{height}` placeholder with the size of image you want.
         * @prop {string} igdbId The ID that [IGDB](https://www.igdb.com/) uses to identify this game. If the IGDB ID is not available to Twitch, this field is set to an empty string.
         */
        /**
         * @typedef GetGamesResponse
         * @prop {GetGamesResponse_Data[]} data The list of categories and games. The list is empty if the specified categories and games weren’t found.
         */
        /**
         * Gets information about specified games.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-games)
         *
         * ---
         * Gets information about specified categories or games.
         *
         * You may get up to 100 categories or games by specifying their ID or name. You may specify all IDs, all names, or a combination of IDs and names. If you specify a combination of IDs and names, the total number of IDs and names must not exceed 100.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires an [app access token](https://dev.twitch.tv/docs/authentication#app-access-tokens) or a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens))
         *
         * ---
         * *Examples*: 
         * 
         * Example 1: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/games?id=33214' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "id": "33214",
         *       "name": "Fortnite",
         *       "box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/33214-{width}x{height}.jpg",
         *       "igdb_id": "1905"
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @param {string} id The ID of the category or game to get. Include this parameter for each category or game you want to get. For example, `&id=1234&id=5678`. You may specify a maximum of 100 IDs. The endpoint ignores duplicate and invalid IDs or IDs that weren’t found.
         * @param {string} name The name of the category or game to get. The name must exactly match the category’s or game’s title. Include this parameter for each category or game you want to get. For example, `&name=foo&name=bar`. You may specify a maximum of 100 names. The endpoint ignores duplicate names and names that weren’t found.
         * @param {string} igdbId The [IGDB](https://www.igdb.com/) ID of the game to get. Include this parameter for each game you want to get. For example, `&igdb_id=1234&igdb_id=5678`. You may specify a maximum of 100 IDs. The endpoint ignores duplicate and invalid IDs or IDs that weren’t found.
         * @returns {Promise<GetGamesResponse>} 
         */
        getGames(id, name, igdbId) {
            return reqFunc("https://api.twitch.tv/helix/games",
                [],
                ["app", "user"],
                {id: id, name: name, igdb_id: igdbId},
                {},
                {200: "Successfully retrieved the specified games.", 400: "- The request must specify the id or name or igdb_id query parameter.\n- The combined number of game IDs (id and igdb_id) and game names that you specify in the request must not exceed 100.", 401: "- The Authorization header is required and must specify an app access token or user access token.\n- The access token is not valid.\n- The ID in the Client-Id header must match the client ID in the access token."}
            );
        },
    },
    Goals: {
        /**
         * @typedef GetCreatorGoalsResponse_Data
         * @prop {string} id An ID that identifies this goal.
         * @prop {string} broadcasterId An ID that identifies the broadcaster that created the goal.
         * @prop {string} broadcasterName The broadcaster’s display name.
         * @prop {string} broadcasterLogin The broadcaster’s login name.
         * @prop {"follower"|"subscription"|"subscription_count"|"new_subscription"|"new_subscription_count"} type The type of goal. Possible values are: - follower — The goal is to increase followers.
         *
         * - subscription — The goal is to increase subscriptions. This type shows the net increase or decrease in tier points associated with the subscriptions.
         *
         * - subscription_count — The goal is to increase subscriptions. This type shows the net increase or decrease in the number of subscriptions.
         *
         * - new_subscription — The goal is to increase subscriptions. This type shows only the net increase in tier points associated with the subscriptions (it does not account for users that unsubscribed since the goal started).
         *
         * - new_subscription_count — The goal is to increase subscriptions. This type shows only the net increase in the number of subscriptions (it does not account for users that unsubscribed since the goal started).
         * @prop {string} description A description of the goal. Is an empty string if not specified.
         * @prop {number} currentAmount The goal’s current value.The goal’s `type` determines how this value is increased or decreased. - If `type` is follower, this field is set to the broadcaster's current number of followers. This number increases with new followers and decreases when users unfollow the broadcaster.
         *
         * - If `type` is subscription, this field is increased and decreased by the points value associated with the subscription tier. For example, if a tier-two subscription is worth 2 points, this field is increased or decreased by 2, not 1.
         *
         * - If `type` is subscription_count, this field is increased by 1 for each new subscription and decreased by 1 for each user that unsubscribes.
         *
         * - If `type` is new_subscription, this field is increased by the points value associated with the subscription tier. For example, if a tier-two subscription is worth 2 points, this field is increased by 2, not 1.
         *
         * - If `type` is new_subscription_count, this field is increased by 1 for each new subscription.
         * @prop {number} targetAmount The goal’s target value. For example, if the broadcaster has 200 followers before creating the goal, and their goal is to double that number, this field is set to 400.
         * @prop {string} createdAt The UTC date and time (in RFC3339 format) that the broadcaster created the goal.
         */
        /**
         * @typedef GetCreatorGoalsResponse
         * @prop {GetCreatorGoalsResponse_Data[]} data The list of goals. The list is empty if the broadcaster hasn’t created goals.
         */
        /**
         * Gets the broadcaster’s list of active goals.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-creator-goals)
         *
         * ---
         *  Use this endpoint to get the current progress of each goal.
         *
         * Instead of polling for the progress of a goal, consider [subscribing](https://dev.twitch.tv/docs/eventsub/manage-subscriptions) to receive notifications when a goal makes progress using the [channel.goal.progress](https://dev.twitch.tv/docs/eventsub/eventsub-subscription-types#channelgoalprogress) subscription type. [Read More](https://dev.twitch.tv/docs/api/goals#requesting-event-notifications)
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `channel:read:goals`
         *
         * ---
         * *Examples*: 
         * 
         * Example 1: 
         * ```
         * # Twitch CLI example that gets the broadcaster's goals.
         * 
         * twitch api get /goals -q broadcaster_id=141981764
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "id": "1woowvbkiNv8BRxEWSqmQz6Zk92",
         *       "broadcaster_id": "141981764",
         *       "broadcaster_name": "TwitchDev",
         *       "broadcaster_login": "twitchdev",
         *       "type": "follower",
         *       "description": "Follow goal for Helix testing",
         *       "current_amount": 27062,
         *       "target_amount": 30000,
         *       "created_at": "2021-08-16T17:22:23Z"
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster that created the goals. This ID must match the user ID in the user access token.
         * @returns {Promise<GetCreatorGoalsResponse>} 
         */
        getCreatorGoals(broadcasterId) {
            return reqFunc("https://api.twitch.tv/helix/goals",
                ["channel:read:goals"],
                ["user"],
                {broadcaster_id: broadcasterId},
                {},
                {200: "Successfully retrieved the broadcaster’s goals.", 400: "- The broadcaster_id query parameter is required.", 401: "- The Authorization header is required and must contain a user access token.\n- The user access token must include the channel:read:goals scope.\n- The ID in broadcaster_id must match the user ID in the user access token.\n- The access token is not valid.\n- The client ID specified in the Client-Id header does not match the client ID specified in the access token."}
            );
        },
    },
    GuestStar: {
        /**
         * @typedef GetChannelGuestStarSettingsResponse
         * @prop {boolean} isModeratorSendLiveEnabled Flag determining if Guest Star moderators have access to control whether a guest is live once assigned to a slot.
         * @prop {number} slotCount Number of slots the Guest Star call interface will allow the host to add to a call. Required to be between 1 and 6.
         * @prop {boolean} isBrowserSourceAudioEnabled Flag determining if Browser Sources subscribed to sessions on this channel should output audio
         * @prop {"TILED_LAYOUT"|"SCREENSHARE_LAYOUT"} groupLayout This setting determines how the guests within a session should be laid out within the browser source. Can be one of the following values: - `TILED_LAYOUT`: All live guests are tiled within the browser source with the same size.
         *
         * - `SCREENSHARE_LAYOUT`: All live guests are tiled within the browser source with the same size. If there is an active screen share, it is sized larger than the other guests.
         * @prop {string} browserSourceToken View only token to generate browser source URLs
         */
        /**
         * BETA Gets the channel settings for configuration of the Guest Star feature for a particular host.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-channel-guest-star-settings)
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `channel:read:guest_star`, `channel:manage:guest_star`, `moderator:read:guest_star`, `moderator:manage:guest_star`
         *
         * ---
         * *Examples*: 
         * 
         * Example 1: 
         * ```
         * curl -x GET `https://api.twitch.tv/helix/guest_star/channel_settings?broadcaster_id=9321049&moderator_id=9321049` \
         * 
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * 
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [        
         *     { 
         *       "is_moderator_send_live_enabled": true,            "slot_count": 4,            "is_browser_source_audio_enabled": true,            "layout": "TILED_LAYOUT",            "browser_source_token": "eihq8rew7q3hgierufhi3q"        
         *     }    
         *   ]
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster you want to get guest star settings for.
         * @param {string} moderatorId The ID of the broadcaster or a user that has permission to moderate the broadcaster’s chat room. This ID must match the user ID in the user access token.
         * @returns {Promise<GetChannelGuestStarSettingsResponse>} 
         */
        getChannelGuestStarSettings(broadcasterId, moderatorId) {
            return reqFunc("https://api.twitch.tv/helix/guest_star/channel_settings",
                ["channel:read:guest_star", "channel:manage:guest_star", "moderator:read:guest_star", "moderator:manage:guest_star"],
                ["user"],
                {broadcaster_id: broadcasterId, moderator_id: moderatorId},
                {},
                {400: "- Missing broadcaster_id\n- Missing moderator_id", 403: "Insufficient authorization for viewing channel’s Guest Star settings"}
            );
        },
        /**
         * BETA Mutates the channel settings for configuration of the Guest Star feature for a particular host.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#update-channel-guest-star-settings)
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `channel:manage:guest_star`
         *
         * ---
         * *Examples*: 
         * 
         * Update browser source layout settingsDisable moderator control of slot live settingUpdate max slot countRegenerate browser sources: 
         * ```
         * curl -x PUT `https://api.twitch.tv/helix/guest_star/channel_settings?broadcaster_id=9321049&regenerate_browser_sources=true` \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster you want to update Guest Star settings for.
         * @param {boolean?} isModeratorSendLiveEnabled Flag determining if Guest Star moderators have access to control whether a guest is live once assigned to a slot.
         * @param {number?} slotCount Number of slots the Guest Star call interface will allow the host to add to a call. Required to be between 1 and 6.
         * @param {boolean?} isBrowserSourceAudioEnabled Flag determining if Browser Sources subscribed to sessions on this channel should output audio
         * @param {"TILED_LAYOUT"|"SCREENSHARE_LAYOUT"|"HORIZONTAL_LAYOUT"|"VERTICAL_LAYOUT"?} groupLayout This setting determines how the guests within a session should be laid out within the browser source. Can be one of the following values: - `TILED_LAYOUT`: All live guests are tiled within the browser source with the same size.
         *
         * - `SCREENSHARE_LAYOUT`: All live guests are tiled within the browser source with the same size. If there is an active screen share, it is sized larger than the other guests.
         *
         * - `HORIZONTAL_LAYOUT`: All live guests are arranged in a horizontal bar within the browser source
         *
         * - `VERTICAL_LAYOUT`: All live guests are arranged in a vertical bar within the browser source
         * @param {boolean?} regenerateBrowserSources Flag determining if Guest Star should regenerate the auth token associated with the channel’s browser sources. Providing a true value for this will immediately invalidate all browser sources previously configured in your streaming software.
         * @returns {Promise<void>} 
         */
        updateChannelGuestStarSettings(broadcasterId, isModeratorSendLiveEnabled=null, slotCount=null, isBrowserSourceAudioEnabled=null, groupLayout=null, regenerateBrowserSources=null) {
            return reqFunc("https://api.twitch.tv/helix/guest_star/channel_settings",
                ["channel:manage:guest_star"],
                ["user"],
                {broadcaster_id: broadcasterId},
                {is_moderator_send_live_enabled: isModeratorSendLiveEnabled, slot_count: slotCount, is_browser_source_audio_enabled: isBrowserSourceAudioEnabled, group_layout: groupLayout, regenerate_browser_sources: regenerateBrowserSources},
                {204: "Successfully updated channel settings", 400: "- Missing broadcaster_id\n- Invalid slot_count\n- Invalid group_layout"}
            );
        },
        /**
         * @typedef GetGuestStarSessionResponse_Data_Guests_Audio_settings
         * @prop {boolean} isHostEnabled Flag determining whether the host is allowing the guest’s audio to be seen or heard within the session.
         * @prop {boolean} isGuestEnabled Flag determining whether the guest is allowing their audio to be transmitted to the session.
         * @prop {boolean} isAvailable Flag determining whether the guest has an appropriate audio device available to be transmitted to the session.
         */
        /**
         * @typedef GetGuestStarSessionResponse_Data_Guests_Video_settings
         * @prop {boolean} isHostEnabled Flag determining whether the host is allowing the guest’s video to be seen or heard within the session.
         * @prop {boolean} isGuestEnabled Flag determining whether the guest is allowing their video to be transmitted to the session.
         * @prop {boolean} isAvailable Flag determining whether the guest has an appropriate video device available to be transmitted to the session.
         */
        /**
         * @typedef GetGuestStarSessionResponse_Data_Guests
         * @prop {string} slotId ID representing this guest’s slot assignment. - Host is always in slot "0"
         *
         * - Guests are assigned the following consecutive IDs (e.g, "1", "2", "3", etc)
         *
         * - Screen Share is represented as a special guest with the ID "SCREENSHARE"
         *
         * - The identifier here matches the ID referenced in browser source links used in broadcasting software.
         * @prop {boolean} isLive Flag determining whether or not the guest is visible in the browser source in the host’s streaming software.
         * @prop {string} userId User ID of the guest assigned to this slot.
         * @prop {string} userDisplayName Display name of the guest assigned to this slot.
         * @prop {string} userLogin Login of the guest assigned to this slot.
         * @prop {number} volume Value from 0 to 100 representing the host’s volume setting for this guest.
         * @prop {string} assignedAt Timestamp when this guest was assigned a slot in the session.
         * @prop {GetGuestStarSessionResponse_Data_Guests_Audio_settings} audioSettings Information about the guest’s audio settings
         * @prop {GetGuestStarSessionResponse_Data_Guests_Video_settings} videoSettings Information about the guest’s video settings
         */
        /**
         * @typedef GetGuestStarSessionResponse_Data
         * @prop {string} id ID uniquely representing the Guest Star session.
         * @prop {GetGuestStarSessionResponse_Data_Guests} guests List of guests currently interacting with the Guest Star session.
         */
        /**
         * @typedef GetGuestStarSessionResponse
         * @prop {GetGuestStarSessionResponse_Data[]} data Summary of the session details
         */
        /**
         * BETA Gets information about an ongoing Guest Star session for a particular channel.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-guest-star-session)
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `channel:read:guest_star`, `channel:manage:guest_star`, `moderator:read:guest_star`, `moderator:manage:guest_star`
         *
         * INFO: Guests must be either invited or assigned a slot within the session
         *
         * ---
         * *Examples*: 
         * 
         * Get session for host channel: 
         * ```
         * curl -x GET `https://api.twitch.tv/helix/guest_star/session?broadcaster_id=9321049&moderator_id=9321049` \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *     "data": [
         *         {
         *             "id": "2KFRQbFtpmfyD3IevNRnCzOPRJI",
         *             "guests": [
         *                 {
         *                     "slot_id": "0",
         *                     "user_id": "9321049",
         *                     "user_display_name": "Cool_User",
         *                     "user_login": "cool_user",
         *                     "is_live": true,
         *                     "volume": 100,
         *                     "assigned_at": "2023-01-02T04:16:53.325Z",
         *                     "audio_settings": {
         *                         "is_available": true,
         *                         "is_host_enabled": true,
         *                         "is_guest_enabled": true,
         *                     },
         *                     "video_settings": {
         *                         "is_available": true,
         *                         "is_host_enabled": true,
         *                         "is_guest_enabled": true,
         *                     }
         *                 },
         *                 {
         *                     "slot_id": "1",
         *                     "user_id": "144601104",
         *                     "user_display_name": "Cool_Guest",
         *                     "user_login": "cool_guest",
         *                     "is_live": true,
         *                     "volume": 100,
         *                     "assigned_at": "2023-01-02T04:20:59.325Z",
         *                     "audio_settings": {
         *                         "is_available": true,
         *                         "is_host_enabled": true,
         *                         "is_guest_enabled": true,
         *                     },
         *                     "video_settings": {
         *                         "is_available": true,
         *                         "is_host_enabled": true,
         *                         "is_guest_enabled": true,
         *                     }
         *                 }
         *             ]
         *         }
         *     ]
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId ID for the user hosting the Guest Star session.
         * @param {string} moderatorId The ID of the broadcaster or a user that has permission to moderate the broadcaster’s chat room. This ID must match the user ID in the user access token.
         * @returns {Promise<GetGuestStarSessionResponse>} 
         */
        getGuestStarSession(broadcasterId, moderatorId) {
            return reqFunc("https://api.twitch.tv/helix/guest_star/session",
                ["channel:read:guest_star", "channel:manage:guest_star", "moderator:read:guest_star", "moderator:manage:guest_star"],
                ["user"],
                {broadcaster_id: broadcasterId, moderator_id: moderatorId},
                {},
                {400: "- Missing broadcaster_id\n- Missing moderator_id", 401: "moderator_id and user token do not match"}
            );
        },
        /**
         * @typedef CreateGuestStarSessionResponse_Data_Guests_Audio_settings
         * @prop {boolean} isHostEnabled Flag determining whether the host is allowing the guest’s audio to be seen or heard within the session.
         * @prop {boolean} isGuestEnabled Flag determining whether the guest is allowing their audio to be transmitted to the session.
         * @prop {boolean} isAvailable Flag determining whether the guest has an appropriate audio device available to be transmitted to the session.
         */
        /**
         * @typedef CreateGuestStarSessionResponse_Data_Guests_Video_settings
         * @prop {boolean} isHostEnabled Flag determining whether the host is allowing the guest’s video to be seen or heard within the session.
         * @prop {boolean} isGuestEnabled Flag determining whether the guest is allowing their video to be transmitted to the session.
         * @prop {boolean} isAvailable Flag determining whether the guest has an appropriate video device available to be transmitted to the session.
         */
        /**
         * @typedef CreateGuestStarSessionResponse_Data_Guests
         * @prop {string} slotId ID representing this guest’s slot assignment. - Host is always in slot "0"
         *
         * - Guests are assigned the following consecutive IDs (e.g, "1", "2", "3", etc)
         *
         * - Screen Share is represented as a special guest with the ID "SCREENSHARE"
         *
         * - The identifier here matches the ID referenced in browser source links used in broadcasting software.
         * @prop {boolean} isLive Flag determining whether or not the guest is visible in the browser source in the host’s streaming software.
         * @prop {string} userId User ID of the guest assigned to this slot.
         * @prop {string} userDisplayName Display name of the guest assigned to this slot.
         * @prop {string} userLogin Login of the guest assigned to this slot.
         * @prop {number} volume Value from 0 to 100 representing the host’s volume setting for this guest.
         * @prop {string} assignedAt Timestamp when this guest was assigned a slot in the session.
         * @prop {CreateGuestStarSessionResponse_Data_Guests_Audio_settings} audioSettings Information about the guest’s audio settings
         * @prop {CreateGuestStarSessionResponse_Data_Guests_Video_settings} videoSettings Information about the guest’s video settings
         */
        /**
         * @typedef CreateGuestStarSessionResponse_Data
         * @prop {string} id ID uniquely representing the Guest Star session.
         * @prop {CreateGuestStarSessionResponse_Data_Guests} guests List of guests currently interacting with the Guest Star session. On creation, the session will contain the broadcaster as a solo guest.
         */
        /**
         * @typedef CreateGuestStarSessionResponse
         * @prop {CreateGuestStarSessionResponse_Data[]} data Summary of the session details.
         */
        /**
         * BETA Programmatically creates a Guest Star session on behalf of the broadcaster.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#create-guest-star-session)
         *
         * ---
         *  Requires the broadcaster to be present in the call interface, or the call will be ended automatically.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `channel:manage:guest_star`
         *
         * ---
         * *Examples*: 
         * 
         * Start Guest Star session: 
         * ```
         * curl -x POST `https://api.twitch.tv/helix/guest_star/session?broadcaster_id=9321049` \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *     "data": [
         *         {
         *             "id": "2KFRQbFtpmfyD3IevNRnCzOPRJI",
         *             "guests": [
         *                 {
         *                     "id": "0",
         *                     "user_id": "9321049",
         *                     "user_display_name": "Cool_User",
         *                     "user_login": "cool_user",
         *                     "is_live": true,
         *                     "volume": 100,
         *                     "assigned_at": "2023-01-02T04:16:53.325Z",
         *                     "audio_settings": {
         *                         "is_available": true,
         *                         "is_host_enabled": true,
         *                         "is_guest_enabled": true,
         *                     },
         *                     "video_settings": {
         *                         "is_available": true,
         *                         "is_host_enabled": true,
         *                         "is_guest_enabled": true,
         *                     }
         *                 },
         *             ]
         *         },
         *     ]
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster you want to create a Guest Star session for. Provided `broadcaster_id` must match the `user_id` in the auth token.
         * @returns {Promise<CreateGuestStarSessionResponse>} 
         */
        createGuestStarSession(broadcasterId) {
            return reqFunc("https://api.twitch.tv/helix/guest_star/session",
                ["channel:manage:guest_star"],
                ["user"],
                {broadcaster_id: broadcasterId},
                {},
                {400: "- Missing broadcaster_id\n- Session limit reached (1 active call)", 401: "Phone verification missing", 403: "Insufficient authorization for creating session"}
            );
        },
        /**
         * @typedef EndGuestStarSessionResponse_Data_Guests_Audio_settings
         * @prop {boolean} isHostEnabled Flag determining whether the host is allowing the guest’s audio to be seen or heard within the session.
         * @prop {boolean} isGuestEnabled Flag determining whether the guest is allowing their audio to be transmitted to the session.
         * @prop {boolean} isAvailable Flag determining whether the guest has an appropriate audio device available to be transmitted to the session.
         */
        /**
         * @typedef EndGuestStarSessionResponse_Data_Guests_Video_settings
         * @prop {boolean} isHostEnabled Flag determining whether the host is allowing the guest’s video to be seen or heard within the session.
         * @prop {boolean} isGuestEnabled Flag determining whether the guest is allowing their video to be transmitted to the session.
         * @prop {boolean} isAvailable Flag determining whether the guest has an appropriate video device available to be transmitted to the session.
         */
        /**
         * @typedef EndGuestStarSessionResponse_Data_Guests
         * @prop {string} slotId ID representing this guest’s slot assignment. - Host is always in slot "0"
         *
         * - Guests are assigned the following consecutive IDs (e.g, "1", "2", "3", etc)
         *
         * - Screen Share is represented as a special guest with the ID "SCREENSHARE"
         *
         * - The identifier here matches the ID referenced in browser source links used in broadcasting software.
         * @prop {boolean} isLive Flag determining whether or not the guest is visible in the browser source in the host’s streaming software.
         * @prop {string} userId User ID of the guest assigned to this slot.
         * @prop {string} userDisplayName Display name of the guest assigned to this slot.
         * @prop {string} userLogin Login of the guest assigned to this slot.
         * @prop {number} volume Value from 0 to 100 representing the host’s volume setting for this guest.
         * @prop {string} assignedAt Timestamp when this guest was assigned a slot in the session.
         * @prop {EndGuestStarSessionResponse_Data_Guests_Audio_settings} audioSettings Information about the guest’s audio settings
         * @prop {EndGuestStarSessionResponse_Data_Guests_Video_settings} videoSettings Information about the guest’s video settings
         */
        /**
         * @typedef EndGuestStarSessionResponse_Data
         * @prop {string} id ID uniquely representing the Guest Star session.
         * @prop {EndGuestStarSessionResponse_Data_Guests} guests List of guests currently interacting with the Guest Star session.
         */
        /**
         * @typedef EndGuestStarSessionResponse
         * @prop {EndGuestStarSessionResponse_Data[]} data Summary of the session details when the session was ended.
         */
        /**
         * BETA Programmatically ends a Guest Star session on behalf of the broadcaster.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#end-guest-star-session)
         *
         * ---
         *  Performs the same action as if the host clicked the “End Call” button in the Guest Star UI.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `channel:manage:guest_star`
         *
         * ---
         * *Examples*: 
         * 
         * End Guest Star session: 
         * ```
         * curl -x DELETE `https://api.twitch.tv/helix/guest_star/session?broadcaster_id=9321049&session_id=2KFRQbFtpmfyD3IevNRnCzOPRJI` \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *     "data": [
         *         {
         *             "id": "2KFRQbFtpmfyD3IevNRnCzOPRJI",
         *             "guests": [
         *                 {
         *                     "id": "0",
         *                     "user_id": "9321049",
         *                     "user_display_name": "Cool_User",
         *                     "user_login": "cool_user",
         *                     "is_live": true,
         *                     "volume": 100,
         *                     "assigned_at": "2023-01-02T04:16:53.325Z",
         *                     "audio_settings": {
         *                         "is_available": true,
         *                         "is_host_enabled": true,
         *                         "is_guest_enabled": true,
         *                     },
         *                     "video_settings": {
         *                         "is_available": true,
         *                         "is_host_enabled": true,
         *                         "is_guest_enabled": true,
         *                     }
         *                 },
         *             ]
         *         }
         *     ]
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster you want to end a Guest Star session for. Provided `broadcaster_id` must match the `user_id` in the auth token.
         * @param {string} sessionId ID for the session to end on behalf of the broadcaster.
         * @returns {Promise<EndGuestStarSessionResponse>} 
         */
        endGuestStarSession(broadcasterId, sessionId) {
            return reqFunc("https://api.twitch.tv/helix/guest_star/session",
                ["channel:manage:guest_star"],
                ["user"],
                {broadcaster_id: broadcasterId, session_id: sessionId},
                {},
                {400: "- Missing or invalid broadcaster_id\n- Missing or invalid session_id\n- Session has already been ended", 403: "Insufficient authorization for ending session"}
            );
        },
        /**
         * @typedef GetGuestStarInvitesResponse_Data
         * @prop {string} userId Twitch User ID corresponding to the invited guest
         * @prop {string} invitedAt Timestamp when this user was invited to the session.
         * @prop {string} status Status representing the invited user’s join state. Can be one of the following: - `INVITED`: The user has been invited to the session but has not acknowledged it.
         *
         * - `ACCEPTED`: The invited user has acknowledged the invite and joined the waiting room, but may still be setting up their media devices or otherwise preparing to join the call.
         *
         * - `READY`: The invited user has signaled they are ready to join the call from the waiting room.
         * @prop {boolean} isVideoEnabled Flag signaling that the invited user has chosen to disable their local video device. The user has hidden themselves, but they may choose to reveal their video feed upon joining the session.
         * @prop {boolean} isAudioEnabled Flag signaling that the invited user has chosen to disable their local audio device. The user has muted themselves, but they may choose to unmute their audio feed upon joining the session.
         * @prop {boolean} isVideoAvailable Flag signaling that the invited user has a video device available for sharing.
         * @prop {boolean} isAudioAvailable Flag signaling that the invited user has an audio device available for sharing.
         */
        /**
         * @typedef GetGuestStarInvitesResponse
         * @prop {GetGuestStarInvitesResponse_Data[]} data A list of invite objects describing the invited user as well as their ready status.
         */
        /**
         * BETA Provides the caller with a list of pending invites to a Guest Star session.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-guest-star-invites)
         *
         * ---
         * BETA Provides the caller with a list of pending invites to a Guest Star session, including the invitee’s ready status while joining the waiting room.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `channel:read:guest_star`, `channel:manage:guest_star`, `moderator:read:guest_star`, `moderator:manage:guest_star`
         *
         * ---
         * *Examples*: 
         * 
         * Get session invitesGet session for host channel: 
         * ```
         * {
         *   "data": [
         *     {
         *       "user_id": "144601104",
         *       "invited_at": "2023-01-02T04:16:53.325Z",
         *       "status": "INVITED",
         *       "is_audio_enabled": false,
         *       "is_video_enabled": true,
         *       "is_audio_available": true,
         *       "is_video_available": true
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster running the Guest Star session.
         * @param {string} moderatorId The ID of the broadcaster or a user that has permission to moderate the broadcaster’s chat room. This ID must match the `user_id` in the user access token.
         * @param {string} sessionId The session ID to query for invite status.
         * @returns {Promise<GetGuestStarInvitesResponse>} 
         */
        getGuestStarInvites(broadcasterId, moderatorId, sessionId) {
            return reqFunc("https://api.twitch.tv/helix/guest_star/invites",
                ["channel:read:guest_star", "channel:manage:guest_star", "moderator:read:guest_star", "moderator:manage:guest_star"],
                ["user"],
                {broadcaster_id: broadcasterId, moderator_id: moderatorId, session_id: sessionId},
                {},
                {400: "- Missing broadcaster_id\n- Missing session_id"}
            );
        },
        /**
         * BETA Sends an invite to a specified guest on behalf of the broadcaster for a Guest Star session in progress.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#send-guest-star-invite)
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `channel:manage:guest_star`, `moderator:manage:guest_star`
         *
         * ---
         * *Examples*: 
         * 
         * Invite user to Guest Star session: 
         * ```
         * curl -x POST `https://api.twitch.tv/helix/guest_star/invites?broadcaster_id=9321049&moderator_id=9321049&session_id=2KFRQbFtpmfyD3IevNRnCzOPRJI&guest_id=144601104` \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster running the Guest Star session.
         * @param {string} moderatorId The ID of the broadcaster or a user that has permission to moderate the broadcaster’s chat room. This ID must match the `user_id` in the user access token.
         * @param {string} sessionId The session ID for the invite to be sent on behalf of the broadcaster.
         * @param {string} guestId Twitch User ID for the guest to invite to the Guest Star session.
         * @returns {Promise<void>} 
         */
        sendGuestStarInvite(broadcasterId, moderatorId, sessionId, guestId) {
            return reqFunc("https://api.twitch.tv/helix/guest_star/invites",
                ["channel:manage:guest_star", "moderator:manage:guest_star"],
                ["user"],
                {broadcaster_id: broadcasterId, moderator_id: moderatorId, session_id: sessionId, guest_id: guestId},
                {},
                {400: "- Missing broadcaster_id\n- Missing moderator_id\n- Missing session_id\n- Missing guest_id\n- Invalid session_id", 403: "- Unauthorized guest invited\n- Guest already invited"}
            );
        },
        /**
         * BETA Revokes a previously sent invite for a Guest Star session.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#delete-guest-star-invite)
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `channel:manage:guest_star`, `moderator:manage:guest_star`
         *
         * ---
         * *Examples*: 
         * 
         * Remove invite to session: 
         * ```
         * curl -x DELETE `https://api.twitch.tv/helix/guest_star/invites?broadcaster_id=9321049&moderator_id=9321049&session_id=2KFRQbFtpmfyD3IevNRnCzOPRJI&guest_id=144601104` \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster running the Guest Star session.
         * @param {string} moderatorId The ID of the broadcaster or a user that has permission to moderate the broadcaster’s chat room. This ID must match the `user_id` in the user access token.
         * @param {string} sessionId The ID of the session for the invite to be revoked on behalf of the broadcaster.
         * @param {string} guestId Twitch User ID for the guest to revoke the Guest Star session invite from.
         * @returns {Promise<void>} 
         */
        deleteGuestStarInvite(broadcasterId, moderatorId, sessionId, guestId) {
            return reqFunc("https://api.twitch.tv/helix/guest_star/invites",
                ["channel:manage:guest_star", "moderator:manage:guest_star"],
                ["user"],
                {broadcaster_id: broadcasterId, moderator_id: moderatorId, session_id: sessionId, guest_id: guestId},
                {},
                {400: "- Missing broadcaster_id\n- Missing session_id\n- Missing guest_id\n- Invalid session_id", 404: "No invite exists for specified guest_id"}
            );
        },
        /**
         * BETA Allows a previously invited user to be assigned a slot within the active Guest Star session.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#assign-guest-star-slot)
         *
         * ---
         * BETA Allows a previously invited user to be assigned a slot within the active Guest Star session, once that guest has indicated they are ready to join.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `channel:manage:guest_star`, `moderator:manage:guest_star`
         *
         * ---
         * *Examples*: 
         * 
         * Assign invited user to slot: 
         * ```
         * curl -x POST `https://api.twitch.tv/helix/guest_star/slot?broadcaster_id=9321049&moderator_id=9321049&session_id=2KFRQbFtpmfyD3IevNRnCzOPRJI&guest_id=144601104&slot_id=1` \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *     "data": {
         *         "code": "USER_NOT_READY"
         *     }
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster running the Guest Star session.
         * @param {string} moderatorId The ID of the broadcaster or a user that has permission to moderate the broadcaster’s chat room. This ID must match the `user_id` in the user access token.
         * @param {string} sessionId The ID of the Guest Star session in which to assign the slot.
         * @param {string} guestId The Twitch User ID corresponding to the guest to assign a slot in the session. This user must already have an invite to this session, and have indicated that they are ready to join.
         * @param {string} slotId The slot assignment to give to the user. Must be a numeric identifier between “1” and “N” where N is the max number of slots for the session. Max number of slots allowed for the session is reported by [Get Channel Guest Star Settings](#get-channel-guest-star-settings).
         * @returns {Promise<void>} 
         */
        assignGuestStarSlot(broadcasterId, moderatorId, sessionId, guestId, slotId) {
            return reqFunc("https://api.twitch.tv/helix/guest_star/slot",
                ["channel:manage:guest_star", "moderator:manage:guest_star"],
                ["user"],
                {broadcaster_id: broadcasterId, moderator_id: moderatorId, session_id: sessionId, guest_id: guestId, slot_id: slotId},
                {},
                {204: "Successfuly assigned guest to slot", 400: "- Missing broadcaster_id\n- Missing moderator_id\n- Missing guest_id\n- Missing or invalid session_id - Missing or invalid slot_id", 401: "moderator_id is not a guest star moderator", 403: "- Cannot assign host slot\n- Guest not invited to session\n- Guest already assigned to slot\n- Guest is not ready to join"}
            );
        },
        /**
         * BETA Allows a user to update the assigned slot for a particular user within the active Guest Star session.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#update-guest-star-slot)
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `channel:manage:guest_star`, `moderator:manage:guest_star`
         *
         * ---
         * *Examples*: 
         * 
         * Move slot assignment to a new slot ID: 
         * ```
         * curl -x PATCH `https://api.twitch.tv/helix/guest_star/slot?broadcaster_id=9321049&moderator_id=9321049&session_id=2KFRQbFtpmfyD3IevNRnCzOPRJI&source_slot_id=1&destination_slot_id=2` \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster running the Guest Star session.
         * @param {string} moderatorId The ID of the broadcaster or a user that has permission to moderate the broadcaster’s chat room. This ID must match the `user_id` in the user access token.
         * @param {string} sessionId The ID of the Guest Star session in which to update slot settings.
         * @param {string} sourceSlotId The slot assignment previously assigned to a user.
         * @param {string?} destinationSlotId The slot to move this user assignment to. If the destination slot is occupied, the user assigned will be swapped into `source_slot_id`.
         * @returns {Promise<void>} 
         */
        updateGuestStarSlot(broadcasterId, moderatorId, sessionId, sourceSlotId, destinationSlotId=null) {
            return reqFunc("https://api.twitch.tv/helix/guest_star/slot",
                ["channel:manage:guest_star", "moderator:manage:guest_star"],
                ["user"],
                {broadcaster_id: broadcasterId, moderator_id: moderatorId, session_id: sessionId, source_slot_id: sourceSlotId, destination_slot_id: destinationSlotId},
                {},
                {204: "Successfuly updated slot(s)", 400: "- Missing broadcaster_id\n- Missing or invalid session_id - Missing or invalid slot_id"}
            );
        },
        /**
         * BETA Allows a caller to remove a slot assignment from a user participating in an active Guest Star session.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#delete-guest-star-slot)
         *
         * ---
         *  This revokes their access to the session immediately and disables their access to publish or subscribe to media within the session.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `channel:manage:guest_star`, `moderator:manage:guest_star`
         *
         * ---
         * *Examples*: 
         * 
         * Remove user from slot: 
         * ```
         * curl -x DELETE `https://api.twitch.tv/helix/guest_star/slot?broadcaster_id=9321049&moderator_id=9321049&session_id=2KFRQbFtpmfyD3IevNRnCzOPRJI&session_id=2KFRQbFtpmfyD3IevNRnCzOPRJI&guest_id=144601104&slot_id=1` \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster running the Guest Star session.
         * @param {string} moderatorId The ID of the broadcaster or a user that has permission to moderate the broadcaster’s chat room. This ID must match the user ID in the user access token.
         * @param {string} sessionId The ID of the Guest Star session in which to remove the slot assignment.
         * @param {string} guestId The Twitch User ID corresponding to the guest to remove from the session.
         * @param {string} slotId The slot ID representing the slot assignment to remove from the session.
         * @param {string?} shouldReinviteGuest Flag signaling that the guest should be reinvited to the session, sending them back to the invite queue.
         * @returns {Promise<void>} 
         */
        deleteGuestStarSlot(broadcasterId, moderatorId, sessionId, guestId, slotId, shouldReinviteGuest=null) {
            return reqFunc("https://api.twitch.tv/helix/guest_star/slot",
                ["channel:manage:guest_star", "moderator:manage:guest_star"],
                ["user"],
                {broadcaster_id: broadcasterId, moderator_id: moderatorId, session_id: sessionId, guest_id: guestId, slot_id: slotId, should_reinvite_guest: shouldReinviteGuest},
                {},
                {204: "Successfuly removed user from slot", 400: "- Missing broadcaster_id\n- Missing moderator_id\n- Missing or invalid session_id - Missing or invalid slot_id", 403: "- moderator_id is not a Guest Star moderator\n- The request is attempting to modify a restricted slot", 404: "guest_id or slot_id not found"}
            );
        },
        /**
         * BETA Allows a user to update slot settings for a particular guest within a Guest Star session.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#update-guest-star-slot-settings)
         *
         * ---
         * BETA Allows a user to update slot settings for a particular guest within a Guest Star session, such as allowing the user to share audio or video within the call as a host. These settings will be broadcasted to all subscribers which control their view of the guest in that slot. One or more of the optional parameters to this API can be specified at any time.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `channel:manage:guest_star`, `moderator:manage:guest_star`
         *
         * ---
         * *Examples*: 
         * 
         * Update slot settings to enable slot in broadcasting softwareMute a slot’s audio for a guestAllow slot audio to be unmuted by a guest. *NOTE*: This operation does not immediately unmute the guest. The guest will be notified they can unmute themselves when ready.: 
         * ```
         * curl -x PATCH `https://api.twitch.tv/helix/guest_star/slot_settings?broadcaster_id=9321049&moderator_id=9321049&session_id=2KFRQbFtpmfyD3IevNRnCzOPRJI&slot_id=1&is_audio_enabled=true` \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster running the Guest Star session.
         * @param {string} moderatorId The ID of the broadcaster or a user that has permission to moderate the broadcaster’s chat room. This ID must match the user ID in the user access token.
         * @param {string} sessionId The ID of the Guest Star session in which to update a slot’s settings.
         * @param {string} slotId The slot assignment that has previously been assigned to a user.
         * @param {boolean?} isAudioEnabled Flag indicating whether the slot is allowed to share their audio with the rest of the session. If false, the slot will be muted in any views containing the slot.
         * @param {boolean?} isVideoEnabled Flag indicating whether the slot is allowed to share their video with the rest of the session. If false, the slot will have no video shared in any views containing the slot.
         * @param {boolean?} isLive Flag indicating whether the user assigned to this slot is visible/can be heard from any public subscriptions. Generally, this determines whether or not the slot is enabled in any broadcasting software integrations.
         * @param {number?} volume Value from 0-100 that controls the audio volume for shared views containing the slot.
         * @returns {Promise<void>} 
         */
        updateGuestStarSlotSettings(broadcasterId, moderatorId, sessionId, slotId, isAudioEnabled=null, isVideoEnabled=null, isLive=null, volume=null) {
            return reqFunc("https://api.twitch.tv/helix/guest_star/slot_settings",
                ["channel:manage:guest_star", "moderator:manage:guest_star"],
                ["user"],
                {broadcaster_id: broadcasterId, moderator_id: moderatorId, session_id: sessionId, slot_id: slotId, is_audio_enabled: isAudioEnabled, is_video_enabled: isVideoEnabled, is_live: isLive, volume: volume},
                {},
                {204: "Successfuly updated slot settings", 400: "- Missing broadcaster_id\n- Missing moderator_id\n- Missing or invalid session_id - Missing or invalid slot_id", 403: "- moderator_id is not a Guest Star moderator\n- The request is attempting to modify a restricted slot"}
            );
        },
    },
    HypeTrain: {
        /**
         * @typedef GetHypeTrainStatusResponse_Data_Current_Top_contributions_Shared_train_participants
         * @prop {string} broadcasterUserId The broadcaster ID.
         * @prop {string} broadcasterUserLogin The broadcaster login.
         * @prop {string} broadcasterUserName The broadcaster display name.
         */
        /**
         * @typedef GetHypeTrainStatusResponse_Data_Current_Top_contributions
         * @prop {string} userId The ID of the user that made the contribution.
         * @prop {string} userLogin The user’s login name.
         * @prop {string} userName The user’s display name.
         * @prop {"treasure"|"golden_kappa"|"regular"} type The type of the Hype Train. Possible values are: - treasure
         *
         * - golden_kappa
         *
         * - regular
         *
         * [Learn More](https://help.twitch.tv/s/article/hype-train-guide#special)
         * @prop {number} total The total number of points contributed for the type.
         * @prop {GetHypeTrainStatusResponse_Data_Current_Top_contributions_Shared_train_participants[]} sharedTrainParticipants A list containing the broadcasters participating in the shared Hype Train. Null if the Hype Train is not shared.
         * @prop {string} startedAt The time when the Hype Train started.
         * @prop {string} expiresAt The time when the Hype Train expires. The expiration is extended when the Hype Train reaches a new level.
         * @prop {boolean} isSharedTrain Indicates if the Hype Train is shared. When true, shared_train_participants will contain the list of broadcasters the train is shared with.
         */
        /**
         * @typedef GetHypeTrainStatusResponse_Data_Current
         * @prop {string} id The Hype Train ID.
         * @prop {string} broadcasterUserId The broadcaster ID.
         * @prop {string} broadcasterUserLogin The broadcaster login.
         * @prop {string} broadcasterUserName The broadcaster display name.
         * @prop {number} level The current level of the Hype Train.
         * @prop {number} total Total points contributed to the Hype Train.
         * @prop {number} progress The number of points contributed to the Hype Train at the current level.
         * @prop {number} goal The number of points required to reach the next level.
         * @prop {GetHypeTrainStatusResponse_Data_Current_Top_contributions[]} topContributions The contributors with the most points contributed.
         */
        /**
         * @typedef GetHypeTrainStatusResponse_Data
         * @prop {GetHypeTrainStatusResponse_Data_Current} current An object describing the current Hype Train. Null if a Hype Train is not active.
         */
        /**
         * @typedef GetHypeTrainStatusResponse_All_time_high
         * @prop {number} level The level of the record Hype Train.
         * @prop {number} total Total points contributed to the record Hype Train.
         * @prop {string} achievedAt The time when the record was achieved.
         */
        /**
         * @typedef GetHypeTrainStatusResponse_Shared_all_time_high
         * @prop {number} level The level of the record Hype Train.
         * @prop {number} total Total points contributed to the record Hype Train.
         * @prop {string} achievedAt The time when the record was achieved.
         */
        /**
         * @typedef GetHypeTrainStatusResponse
         * @prop {GetHypeTrainStatusResponse_Data[]} data A list that contains information related to the channel’s Hype Train.
         * @prop {GetHypeTrainStatusResponse_All_time_high} allTimeHigh An object with information about the channel’s Hype Train records. Null if a Hype Train has not occurred.
         * @prop {GetHypeTrainStatusResponse_Shared_all_time_high} sharedAllTimeHigh An object with information about the channel’s shared Hype Train records. Null if a Hype Train has not occurred.
         */
        /**
         * NEW Gets the status of a Hype Train for the specified broadcaster.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-hype-train-status)
         *
         * ---
         * NEW Get the status of a Hype Train for the specified broadcaster.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `channel:read:hype_train`
         *
         * ---
         * *Examples*: 
         * 
         * Example 1: 
         * ```
         * curl -X GET
         * 'https://api.twitch.tv/helix/hypetrain/status?broadcaster_id=123' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "current": {
         *         "id": "1b0AsbInCHZW2SQFQkCzqN07Ib2",
         *         "broadcaster_user_id": "1337",
         *         "broadcaster_user_login": "cool_user",
         *         "broadcaster_user_name": "Cool_User",
         *         "level": 2,
         *         "total": 700,
         *         "progress": 200,
         *         "goal": 1000,
         *         "top_contributions": [
         *           {
         *             "user_id": "123",
         *             "user_login": "pogchamp",
         *             "user_name": "PogChamp",
         *             "type": "bits",
         *             "total": 50
         *           },
         *           {
         *             "user_id": "456",
         *             "user_login": "kappa",
         *             "user_name": "Kappa",
         *             "type": "subscription",
         *             "total": 45
         *           }
         *         ],
         *         "shared_train_participants": [
         *           {
         *             "broadcaster_user_id": "456",
         *             "broadcaster_user_login": "pogchamp",
         *             "broadcaster_user_name": "PogChamp"
         *           },
         *           {
         *             "broadcaster_user_id": "321",
         *             "broadcaster_user_login": "pogchamp",
         *             "broadcaster_user_name": "PogChamp"
         *           }
         *         ],
         *         "started_at": "2020-07-15T17:16:03.17106713Z",
         *         "expires_at": "2020-07-15T17:16:11.17106713Z",
         *         "type": "golden_kappa"
         *       },
         *       "all_time_high": {
         *         "level": 6,
         *         "total": 2850,
         *         "achieved_at": "2020-04-24T20:12:21.003802269Z"
         *       },
         *       "shared_all_time_high": {
         *         "level": 16,
         *         "total": 23850,
         *         "achieved_at": "2020-04-27T20:12:21.003802269Z"
         *       },
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId The User ID of the channel broadcaster.
         * @returns {Promise<GetHypeTrainStatusResponse>} 
         */
        getHypeTrainStatus(broadcasterId) {
            return reqFunc("https://api.twitch.tv/helix/hypetrain/status",
                ["channel:read:hype_train"],
                ["user"],
                {broadcaster_id: broadcasterId},
                {},
                {200: "Successfully retrieved the status object.", 400: "The ID in the `broadcaster_id` query parameter is not valid.", 401: "- The OAuth token is not valid.\n- The Authorization header is required and must contain a user access token.", 500: "Internal Server Error."}
            );
        },
    },
    Moderation: {
        /**
         * @typedef CheckAutoModStatusResponse_Data
         * @prop {string} msgId The caller-defined ID passed in the request.
         * @prop {boolean} isPermitted A Boolean value that indicates whether Twitch would approve the message for chat or hold it for moderator review or block it from chat. Is *true* if Twitch would approve the message; otherwise, *false* if Twitch would hold the message for moderator review or block it from chat.
         */
        /**
         * @typedef CheckAutoModStatusResponse
         * @prop {CheckAutoModStatusResponse_Data[]} data The list of messages and whether Twitch would approve them for chat.
         */
        /**
         * @typedef CheckAutoModStatusRequest_Data
         * @prop {string} msgId A caller-defined ID used to correlate this message with the same message in the response.
         * @prop {string} msgText The message to check.
         */
        /**
         * Checks whether AutoMod would flag the specified message for review.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#check-automod-status)
         *
         * ---
         * 
         *
         * AutoMod is a moderation tool that holds inappropriate or harassing chat messages for moderators to review. Moderators approve or deny the messages that AutoMod flags; only approved messages are released to chat. AutoMod detects misspellings and evasive language automatically. For information about AutoMod, see [How to Use AutoMod](https://help.twitch.tv/s/article/how-to-use-automod).
         *
         * *Rate Limits*: Rates are limited per channel based on the account type rather than per access token.
         *
         * Account type Limit per minute Limit per hour Normal 5 50 Affiliate 10 100 Partner 30 300
         *
         * The above limits are in addition to the standard [Twitch API rate limits](https://dev.twitch.tv/docs/api/guide#twitch-rate-limits). The rate limit headers in the response represent the Twitch rate limits and not the above limits.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `moderation:read`
         *
         * ---
         * *Examples*: 
         * 
         * Example 1: 
         * ```
         * curl -X POST 'https://api.twitch.tv/helix/moderation/enforcements/status?broadcaster_id=12345' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2' \
         * -H 'Content-Type: application/json' \
         * -d '{
         *   "data": [
         *     {
         *       "msg_id": "123",
         *       "msg_text": "Hello World!"
         *     },
         *     {
         *       "msg_id": "393",
         *       "msg_text": "Boooooo!"
         *     }
         *   ]
         * }'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "msg_id": "123",
         *       "is_permitted": true
         *     },
         *     {
         *       "msg_id": "393",
         *       "is_permitted": false
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster whose AutoMod settings and list of blocked terms are used to check the message. This ID must match the user ID in the access token.
         * @param {CheckAutoModStatusRequest_Data[]} data The list of messages to check. The list must contain at least one message and may contain up to a maximum of 100 messages.
         * @returns {Promise<CheckAutoModStatusResponse>} 
         */
        checkAutoModStatus(broadcasterId, data) {
            return reqFunc("https://api.twitch.tv/helix/moderation/enforcements/status",
                ["moderation:read"],
                ["user"],
                {broadcaster_id: broadcasterId},
                {data: data},
                {200: "Successfully checked the messages.", 400: "- The broadcaster_id query parameter is required.\n- The `data` field is required and the list must contain one or more messages to check.\n- The `msg_id` field is required.\n- The `msg_text` field is required.", 401: "- The Authorization header is required and must contain a user access token.\n- The user access token must include the moderation:read scope.\n- The access token is not valid.\n- The client ID specified in the Client-Id header does not match the client ID specified in the access token.", 403: "- The ID in broadcaster_id must match the user ID in the user access token.", 429: "- The broadcaster exceeded the number of chat message checks that they may make. See the endpoint's rate limits."}
            );
        },
        /**
         * Allow or deny the message that AutoMod flagged for review.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#manage-held-automod-messages)
         *
         * ---
         *  For information about AutoMod, see [How to Use AutoMod](https://help.twitch.tv/s/article/how-to-use-automod).
         *
         * To get messages that AutoMod is holding for review, subscribe to the *automod-queue.<moderator_id>.<channel_id>* [topic](https://dev.twitch.tv/docs/pubsub#topics) using [PubSub](https://dev.twitch.tv/docs/pubsub). PubSub sends a notification to your app when AutoMod holds a message for review.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `moderator:manage:automod`
         *
         * ---
         * *Examples*: 
         * 
         * Example 1: 
         * ```
         * curl -X POST 'https://api.twitch.tv/helix/moderation/automod/message' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2' \
         * -H 'Content-Type: application/json' \
         * -d '{
         *   "user_id": "9327994",
         *   "msg_id": "836013710",
         *   "action": "ALLOW"
         * }'
         * ```
         *
         * ---
         * @param {string} userId The moderator who is approving or denying the held message. This ID must match the user ID in the access token.
         * @param {string} msgId The ID of the message to allow or deny.
         * @param {"ALLOW"|"DENY"} action The action to take for the message. Possible values are:
         *
         * - ALLOW
         *
         * - DENY
         * @returns {Promise<void>} 
         */
        manageHeldAutoModMessages(userId, msgId, action) {
            return reqFunc("https://api.twitch.tv/helix/moderation/automod/message",
                ["moderator:manage:automod"],
                ["user"],
                {},
                {user_id: userId, msg_id: msgId, action: action},
                {204: "Successfully approved or denied the message.", 400: "- The value in the `action` field is not valid.\n- The `user_id` field is required.\n- The `msg_id` field is required.\n- The `action` field is required.", 401: "- The ID in `user_id` must match the user ID in the user access token.\n- The Authorization header is required and must contain a user access token.\n- The user access token must include the moderator:manage:automod scope.\n- The access token is not valid.\n- The client ID specified in the Client-Id header does not match the client ID specified in the access token.", 403: "- The user in user_id is not one of the broadcaster's moderators.", 404: "- The message specified in the `msg_id` field was not found."}
            );
        },
        /**
         * @typedef GetAutoModSettingsResponse_Data
         * @prop {string} broadcasterId The broadcaster’s ID.
         * @prop {string} moderatorId The moderator’s ID.
         * @prop {number} overallLevel The default AutoMod level for the broadcaster. This field is *null* if the broadcaster has set one or more of the individual settings.
         * @prop {number} disability The Automod level for discrimination against disability.
         * @prop {number} aggression The Automod level for hostility involving aggression.
         * @prop {number} sexualitySexOrGender The AutoMod level for discrimination based on sexuality, sex, or gender.
         * @prop {number} misogyny The Automod level for discrimination against women.
         * @prop {number} bullying The Automod level for hostility involving name calling or insults.
         * @prop {number} swearing The Automod level for profanity.
         * @prop {number} raceEthnicityOrReligion The Automod level for racial discrimination.
         * @prop {number} sexBasedTerms The Automod level for sexual content.
         */
        /**
         * @typedef GetAutoModSettingsResponse
         * @prop {GetAutoModSettingsResponse_Data[]} data The list of AutoMod settings. The list contains a single object that contains all the AutoMod settings.
         */
        /**
         * Gets the broadcaster’s AutoMod settings.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-automod-settings)
         *
         * ---
         *  The settings are used to automatically block inappropriate or harassing messages from appearing in the broadcaster’s chat room.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `moderator:read:automod_settings`
         *
         * ---
         * *Examples*: 
         * 
         * Gets the broadcaster’s AutoMod settings.: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/moderation/automod/settings?broadcaster_id=1234&moderator_id=5678' \
         * -H 'Authorization: Bearer 4a4x78f5wqvkybms7mxfist3jmzul' \
         * -H 'Client-Id: t214nt8z1rdtbj69hyarjvh5mi6fh'
         * ```
         * 
         * *Responses*: 
         * 
         * Shows what the response looks like if the broadcaster hasn’t enabled AutoMod (none of the settings are set).: 
         * ```
         * {
         *   "data": [
         *     {
         *       "broadcaster_id": "1234",
         *       "moderator_id": "5678",
         *       "overall_level": null,
         *       "disability": 0,
         *       "aggression": 0,
         *       "sexuality_sex_or_gender": 0,
         *       "misogyny": 0,
         *       "bullying": 0,
         *       "swearing": 0,
         *       "race_ethnicity_or_religion": 0,
         *       "sex_based_terms": 0
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster whose AutoMod settings you want to get.
         * @param {string} moderatorId The ID of the broadcaster or a user that has permission to moderate the broadcaster’s chat room. This ID must match the user ID in the user access token.
         * @returns {Promise<GetAutoModSettingsResponse>} 
         */
        getAutoModSettings(broadcasterId, moderatorId) {
            return reqFunc("https://api.twitch.tv/helix/moderation/automod/settings",
                ["moderator:read:automod_settings"],
                ["user"],
                {broadcaster_id: broadcasterId, moderator_id: moderatorId},
                {},
                {200: "Successfully retrieved the broadcaster’s AutoMod settings.", 400: "- The broadcaster_id query parameter is required.\n- The moderator_id query parameter is required.", 401: "- The ID in moderator_id must match the user ID in the user access token.\n- The Authorization header is required and must contain a user access token.\n- The user access token must include the moderator:read:automod_settings scope.\n- The access token is not valid.\n- The client ID specified in the Client-Id header does not match the client ID specified in the access token.", 403: "- The user in moderator_id is not one of the broadcaster's moderators."}
            );
        },
        /**
         * @typedef UpdateAutoModSettingsResponse_Data
         * @prop {string} broadcasterId The broadcaster’s ID.
         * @prop {string} moderatorId The moderator’s ID.
         * @prop {number} overallLevel The default AutoMod level for the broadcaster. This field is *null* if the broadcaster has set one or more of the individual settings.
         * @prop {number} disability The Automod level for discrimination against disability.
         * @prop {number} aggression The Automod level for hostility involving aggression.
         * @prop {number} sexualitySexOrGender The AutoMod level for discrimination based on sexuality, sex, or gender.
         * @prop {number} misogyny The Automod level for discrimination against women.
         * @prop {number} bullying The Automod level for hostility involving name calling or insults.
         * @prop {number} swearing The Automod level for profanity.
         * @prop {number} raceEthnicityOrReligion The Automod level for racial discrimination.
         * @prop {number} sexBasedTerms The Automod level for sexual content.
         */
        /**
         * @typedef UpdateAutoModSettingsResponse
         * @prop {UpdateAutoModSettingsResponse_Data[]} data The list of AutoMod settings. The list contains a single object that contains all the AutoMod settings.
         */
        /**
         * Updates the broadcaster’s AutoMod settings.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#update-automod-settings)
         *
         * ---
         *  The settings are used to automatically block inappropriate or harassing messages from appearing in the broadcaster’s chat room.
         *
         * ---
         * *Info*: 
         * 
         * Because PUT is an overwrite operation, you must include all the fields that you want set after the operation completes. Typically, you’ll send a GET request, update the fields you want to change, and pass that object in the PUT request.
         *
         * You may set either `overall_level` or the individual settings like `aggression`, but not both.
         *
         * Setting `overall_level` applies default values to the individual settings. However, setting `overall_level` to 4 does not necessarily mean that it applies 4 to all the individual settings. Instead, it applies a set of recommended defaults to the rest of the settings. For example, if you set `overall_level` to 2, Twitch provides some filtering on discrimination and sexual content, but more filtering on hostility (see the first example response).
         *
         * If `overall_level` is currently set and you update `swearing` to 3, `overall_level` will be set to *null* and all settings other than `swearing` will be set to 0. The same is true if individual settings are set and you update `overall_level` to 3 — all the individual settings are updated to reflect the default level.
         *
         * Note that if you set all the individual settings to values that match what `overall_level` would have set them to, Twitch changes AutoMod to use the default AutoMod level instead of using the individual settings.
         *
         * Valid values for all levels are from 0 (no filtering) through 4 (most aggressive filtering). These levels affect how aggressively AutoMod holds back messages for moderators to review before they appear in chat or are denied (not shown).
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `moderator:manage:automod_settings`
         *
         * ---
         * *Examples*: 
         * 
         * This example updates the `overall_level` setting to 3.Notice in the response that not all settings are set to level 3.If `overall_level` is set to 3 and you try to change `swearing` to 2, all other settings are set to 0. If the goal was to change the `swearing` setting and leave all the others unchanged, the request must have included all the other settings as well.: 
         * ```
         * {
         *   "data": [
         *     {
         *       "broadcaster_id": "1234",
         *       "moderator_id": "5678",
         *       "overall_level": null,
         *       "disability": 0,
         *       "aggression": 0,
         *       "sexuality_sex_or_gender": 0,
         *       "misogyny": 0,
         *       "bullying": 0,
         *       "swearing": 2,
         *       "race_ethnicity_or_religion": 0,
         *       "sex_based_terms": 0
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster whose AutoMod settings you want to update.
         * @param {string} moderatorId The ID of the broadcaster or a user that has permission to moderate the broadcaster’s chat room. This ID must match the user ID in the user access token.
         * @param {number?} aggression The Automod level for hostility involving aggression.
         * @param {number?} bullying The Automod level for hostility involving name calling or insults.
         * @param {number?} disability The Automod level for discrimination against disability.
         * @param {number?} misogyny The Automod level for discrimination against women.
         * @param {number?} overallLevel The default AutoMod level for the broadcaster.
         * @param {number?} raceEthnicityOrReligion The Automod level for racial discrimination.
         * @param {number?} sexBasedTerms The Automod level for sexual content.
         * @param {number?} sexualitySexOrGender The AutoMod level for discrimination based on sexuality, sex, or gender.
         * @param {number?} swearing The Automod level for profanity.
         * @returns {Promise<UpdateAutoModSettingsResponse>} 
         */
        updateAutoModSettings(broadcasterId, moderatorId, aggression=null, bullying=null, disability=null, misogyny=null, overallLevel=null, raceEthnicityOrReligion=null, sexBasedTerms=null, sexualitySexOrGender=null, swearing=null) {
            return reqFunc("https://api.twitch.tv/helix/moderation/automod/settings",
                ["moderator:manage:automod_settings"],
                ["user"],
                {broadcaster_id: broadcasterId, moderator_id: moderatorId},
                {aggression: aggression, bullying: bullying, disability: disability, misogyny: misogyny, overall_level: overallLevel, race_ethnicity_or_religion: raceEthnicityOrReligion, sex_based_terms: sexBasedTerms, sexuality_sex_or_gender: sexualitySexOrGender, swearing: swearing},
                {200: "Successfully updated the broadcaster’s AutoMod settings.", 400: "- The broadcaster_id is required.\n- The moderator_id is required.\n- The `overall_level` setting or one or more individual settings like `aggression` is required; the overall and individual settings are mutually exclusive, so don't set both.\n- The value of one or more AutoMod settings is not valid.", 401: "- The ID in moderator_id must match the user ID in the user access token.\n- The Authorization header is required and must contain a user access token.\n- The user access token must include the moderator:manage:automod_settings scope.\n- The access token is not valid.\n- The client ID specified in the Client-Id header does not match the client ID specified in the access token.", 403: "- The user in moderator_id is not one of the broadcaster's moderators."}
            );
        },
        /**
         * @typedef GetBannedUsersResponse_Data
         * @prop {string} userId The ID of the banned user.
         * @prop {string} userLogin The banned user’s login name.
         * @prop {string} userName The banned user’s display name.
         * @prop {string} expiresAt The UTC date and time (in RFC3339 format) of when the timeout expires, or an empty string if the user is permanently banned.
         * @prop {string} createdAt The UTC date and time (in RFC3339 format) of when the user was banned.
         * @prop {string} reason The reason the user was banned or put in a timeout if the moderator provided one.
         * @prop {string} moderatorId The ID of the moderator that banned the user or put them in a timeout.
         * @prop {string} moderatorLogin The moderator’s login name.
         * @prop {string} moderatorName The moderator’s display name.
         */
        /**
         * @typedef GetBannedUsersResponse_Pagination
         * @prop {string} cursor The cursor used to get the next page of results. Use the cursor to set the request’s after query parameter.
         */
        /**
         * @typedef GetBannedUsersResponse
         * @prop {GetBannedUsersResponse_Data[]} data The list of users that were banned or put in a timeout.
         * @prop {GetBannedUsersResponse_Pagination} pagination Contains the information used to page through the list of results. The object is empty if there are no more pages left to page through. [Read More](https://dev.twitch.tv/docs/api/guide#pagination)
         */
        /**
         * Gets all users that the broadcaster banned or put in a timeout.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-banned-users)
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `moderation:read`, `moderator:manage:banned_users`
         *
         * ---
         * *Examples*: 
         * 
         * Example 1: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/moderation/banned?broadcaster_id=198704263' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "user_id": "423374343",
         *       "user_login": "glowillig",
         *       "user_name": "glowillig",
         *       "expires_at": "2022-03-15T02:00:28Z",
         *       "created_at": "2022-03-15T01:30:28Z",
         *       "reason": "Does not like pineapple on pizza.",
         *       "moderator_id": "141981764",
         *       "moderator_login": "twitchdev",
         *       "moderator_name": "TwitchDev"
         *     },
         *     {
         *       "user_id": "424596340",
         *       "user_login": "quotrok",
         *       "user_name": "quotrok",
         *       "expires_at": "2022-08-07T02:07:55Z",
         *       "created_at": "2022-08-07T02:02:55Z",
         *       "reason": "Inappropriate words.",
         *       "moderator_id": "141981764",
         *       "moderator_login": "twitchdev",
         *       "moderator_name": "TwitchDev"
         *     },
         *     ...
         *   ],
         *   "pagination": {
         *     "cursor": "eyJiIjpudWxsLCJhIjp7IkN1cnNvciI6IjEwMDQ3MzA2NDo4NjQwNjU3MToxSVZCVDFKMnY5M1BTOXh3d1E0dUdXMkJOMFcifX0"
         *   }
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster whose list of banned users you want to get. This ID must match the user ID in the access token.
         * @param {string?} userId A list of user IDs used to filter the results. To specify more than one ID, include this parameter for each user you want to get. For example, `user_id=1234&user_id=5678`. You may specify a maximum of 100 IDs.The returned list includes only those users that were banned or put in a timeout. The list is returned in the same order that you specified the IDs.
         * @param {number?} first The maximum number of items to return per page in the response. The minimum page size is 1 item per page and the maximum is 100 items per page. The default is 20.
         * @param {string?} after The cursor used to get the next page of results. The *Pagination* object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination)
         * @param {string?} before The cursor used to get the previous page of results. The *Pagination* object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination)
         * @returns {Promise<GetBannedUsersResponse>} 
         */
        getBannedUsers(broadcasterId, userId=null, first=null, after=null, before=null) {
            return reqFunc("https://api.twitch.tv/helix/moderation/banned",
                ["moderation:read", "moderator:manage:banned_users"],
                ["user"],
                {broadcaster_id: broadcasterId, user_id: userId, first: first, after: after, before: before},
                {},
                {200: "Successfully retrieved the list of banned users.", 400: "- The broadcaster_id query parameter is required.", 401: "- The ID in broadcaster_id must match the user ID in the user access token.\n- The Authorization header is required and must contain a user access token.\n- The user access token must include the moderation:read scope.\n- The access token is not valid.\n- The client ID specified in the Client-Id header does not match the client ID specified in the access token."}
            );
        },
        /**
         * @typedef BanUserResponse_Data
         * @prop {string} broadcasterId The broadcaster whose chat room the user was banned from chatting in.
         * @prop {string} moderatorId The moderator that banned or put the user in the timeout.
         * @prop {string} userId The user that was banned or put in a timeout.
         * @prop {string} createdAt The UTC date and time (in RFC3339 format) that the ban or timeout was placed.
         * @prop {string} endTime The UTC date and time (in RFC3339 format) that the timeout will end. Is *null* if the user was banned instead of being put in a timeout.
         */
        /**
         * @typedef BanUserResponse
         * @prop {BanUserResponse_Data[]} data A list that contains the user you successfully banned or put in a timeout.
         */
        /**
         * @typedef BanUserRequest_Data
         * @prop {string} userId The ID of the user to ban or put in a timeout.
         * @prop {number} duration To ban a user indefinitely, don’t include this field.To put a user in a timeout, include this field and specify the timeout period, in seconds. The minimum timeout is 1 second and the maximum is 1,209,600 seconds (2 weeks).To end a user’s timeout early, set this field to 1, or use the [Unban user](#unban-user) endpoint.
         * @prop {string} reason The reason the you’re banning the user or putting them in a timeout. The text is user defined and is limited to a maximum of 500 characters.
         */
        /**
         * Bans a user from participating in a broadcaster’s chat room or puts them in a timeout.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#ban-user)
         *
         * ---
         * Bans a user from participating in the specified broadcaster’s chat room or puts them in a timeout.
         *
         * For information about banning or putting users in a timeout, see [Ban a User](https://help.twitch.tv/s/article/how-to-manage-harassment-in-chat#TheBanFeature) and [Timeout a User](https://help.twitch.tv/s/article/how-to-manage-harassment-in-chat#TheTimeoutFeature).
         *
         * If the user is currently in a timeout, you can call this endpoint to change the duration of the timeout or ban them altogether. If the user is currently banned, you cannot call this method to put them in a timeout instead.
         *
         * To remove a ban or end a timeout, see [Unban user](#unban-user).
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `moderator:manage:banned_users`
         *
         * ---
         * *Examples*: 
         * 
         * Bans a user (it doesn’t include the `duration` field).Puts a user in a 5-minute timeout.Shows what happens if you try to place a banned user in a timeout. You can ban a user that’s already in a timeout but you can’t move a banned user into a timeout. To do this, you’d have to remove the ban and then place them in a timeout.You’ll get the same response if you try to ban a user who is already banned.: 
         * ```
         * { 
         *   "error": "Bad Request", 
         *   "status": 400, 
         *   "message": "user is already banned" 
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster whose chat room the user is being banned from.
         * @param {string} moderatorId The ID of the broadcaster or a user that has permission to moderate the broadcaster’s chat room. This ID must match the user ID in the user access token.
         * @param {BanUserRequest_Data} data Identifies the user and type of ban.
         * @returns {Promise<BanUserResponse>} 
         */
        banUser(broadcasterId, moderatorId, data) {
            return reqFunc("https://api.twitch.tv/helix/moderation/bans",
                ["moderator:manage:banned_users"],
                ["user"],
                {broadcaster_id: broadcasterId, moderator_id: moderatorId},
                {data: data},
                {200: "Successfully banned the user or placed them in a timeout.", 400: "- The broadcaster_id query parameter is required.\n- The moderator_id query parameter is required.\n- The `user_id` field is required.\n- The text in the `reason` field is too long.\n- The value in the `duration` field is not valid.\n- The user specified in the `user_id` field may not be banned.\n- The user specified in the `user_id` field may not be put in a timeout.\n- The user specified in the `user_id` field is already banned.", 401: "- The ID in moderator_id must match the user ID in the access token.\n- The Authorization header is required and must contain a user access token.\n- The user access token must include the moderator:manage:banned_users scope.\n- The access token is not valid.\n- The client ID specified in the Client-Id header does not match the client ID specified in the access token.", 403: "- The user in moderator_id is not one of the broadcaster's moderators.", 409: "- You may not update the user's ban state while someone else is updating the state. For example, someone else is currently banning the user or putting them in a timeout, moving the user from a timeout to a ban, or removing the user from a ban or timeout. Please retry your request.", 429: "- The app has exceeded the number of requests it may make per minute for this broadcaster."}
            );
        },
        /**
         * Removes the ban or timeout that was placed on the specified user.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#unban-user)
         *
         * ---
         * 
         *
         * To ban a user, see [Ban user](#ban-user).
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `moderator:manage:banned_users`
         *
         * ---
         * *Examples*: 
         * 
         * Removes a ban or timeout from a user.Tries to remove a ban or timeout from a user that is not currently banned or in a timeout.: 
         * ```
         * {
         *   "error": "Bad Request",
         *   "status": 400,
         *   "message": "user is not banned"
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster whose chat room the user is banned from chatting in.
         * @param {string} moderatorId The ID of the broadcaster or a user that has permission to moderate the broadcaster’s chat room. This ID must match the user ID in the user access token.
         * @param {string} userId The ID of the user to remove the ban or timeout from.
         * @returns {Promise<void>} 
         */
        unbanUser(broadcasterId, moderatorId, userId) {
            return reqFunc("https://api.twitch.tv/helix/moderation/bans",
                ["moderator:manage:banned_users"],
                ["user"],
                {broadcaster_id: broadcasterId, moderator_id: moderatorId, user_id: userId},
                {},
                {204: "Successfully removed the ban or timeout.", 400: "- The broadcaster_id query parameter is required.\n- The moderator_id query parameter is required.\n- The user_id query parameter is required.\n- The user specified in the user_id query parameter is not banned.", 401: "- The ID in moderator_id must match the user ID in the access token.\n- The Authorization header is required and must contain a user access token.\n- The user access token must include the moderator:manage:banned_users scope.\n- The access token is not valid.\n- The client ID specified in the Client-Id header does not match the client ID specified in the access token.", 403: "- The user in moderator_id is not one of the broadcaster's moderators.", 409: "- You may not update the user's ban state while someone else is updating the state. For example, someone else is currently removing the ban or timeout, or they're moving the user from a timeout to a ban. Please retry your request.", 429: "- The app has exceeded the number of requests it may make per minute for this broadcaster."}
            );
        },
        /**
         * @typedef GetUnbanRequestsResponse_Data
         * @prop {string} id Unban request ID.
         * @prop {string} broadcasterId User ID of broadcaster whose channel is receiving the unban request.
         * @prop {string} broadcasterName The broadcaster's display name.
         * @prop {string} broadcasterLogin The broadcaster's login name.
         * @prop {string} moderatorId User ID of moderator who approved/denied the request.
         * @prop {string} moderatorLogin The moderator's login name.
         * @prop {string} moderatorName The moderator's display name.
         * @prop {string} userId User ID of the requestor who is asking for an unban.
         * @prop {string} userLogin The user's login name.
         * @prop {string} userName The user's display name.
         * @prop {string} text Text of the request from the requesting user.
         * @prop {string} status Status of the request. One of:
         *
         * - pending
         *
         * - approved
         *
         * - denied
         *
         * - acknowledged
         *
         * - canceled
         * @prop {string} createdAt Timestamp of when the unban request was created.
         * @prop {string} resolvedAt Timestamp of when moderator/broadcaster approved or denied the request.
         * @prop {string} resolutionText Text input by the resolver (moderator) of the unban. request
         */
        /**
         * @typedef GetUnbanRequestsResponse_Pagination
         * @prop {string} cursor The cursor used to get the next page of results. Use the cursor to set the request’s after query parameter.
         */
        /**
         * @typedef GetUnbanRequestsResponse
         * @prop {GetUnbanRequestsResponse_Data[]} data A list that contains information about the channel's unban requests.
         * @prop {GetUnbanRequestsResponse_Pagination} pagination Contains information used to page through a list of results. The object is empty if there are no more pages left to page through.
         */
        /**
         * Gets a list of unban requests for a broadcaster’s channel.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-unban-requests)
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `moderator:read:unban_requests`, `moderator:manage:unban_requests`
         *
         * ---
         * *Examples*: 
         * 
         * Gets information about the specified broadcaster.: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/moderation/unban_requests?broadcaster_id=274637212&moderator_id=274637212&status=pending' \
         * ​​​​​-H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "id": "92af127c-7326-4483-a52b-b0da0be61c01",
         *       "broadcaster_name": "torpedo09",
         *       "broadcaster_login": "torpedo09",
         *       "broadcaster_id": "274637212",
         *       "moderator_id": "141981764",
         *       "moderator_login": "twitchdev",
         *       "moderator_name": "TwitchDev",
         *       "user_id": "424596340",
         *       "user_login": "quotrok",
         *       "user_name": "quotrok",
         *       "text": "Please unban me from the channel?",
         *       "status": "pending",
         *       "created_at": "2022-08-07T02:07:55Z",
         *       "resolved_at": null,
         *       "resolution_text": null
         *     }
         *   ],
         *   "pagination": {
         *     "cursor": "eyJiIjpudWxsLCJhIjp7IkN1cnNvciI6IjEwMDQ3MzA2NDo4NjQwNjU3MToxSVZCVDFKMnY5M1BTOXh3d1E0dUdXMkJOMFcifX0"
         *   }
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster whose channel is receiving unban requests.
         * @param {string} moderatorId The ID of the broadcaster or a user that has permission to moderate the broadcaster’s unban requests. This ID must match the user ID in the user access token.
         * @param {string} status Filter by a status.
         *
         * - pending
         *
         * - approved
         *
         * - denied
         *
         * - acknowledged
         *
         * - canceled
         * @param {string?} userId The ID used to filter what unban requests are returned.
         * @param {string?} after Cursor used to get next page of results. Pagination object in response contains cursor value.
         * @param {number?} first The maximum number of items to return per page in response
         * @returns {Promise<GetUnbanRequestsResponse>} 
         */
        getUnbanRequests(broadcasterId, moderatorId, status, userId=null, after=null, first=null) {
            return reqFunc("https://api.twitch.tv/helix/moderation/unban_requests",
                ["moderator:read:unban_requests", "moderator:manage:unban_requests"],
                ["user"],
                {broadcaster_id: broadcasterId, moderator_id: moderatorId, status: status, user_id: userId, after: after, first: first},
                {},
                {200: "Successfully retrieved the list of unban requests.", 400: "- The broadcaster_id query parameter is required.\n- The ID in the broadcaster_id query parameter is not valid.\n- The moderator_id query parameter is required.\n- The ID in the moderator_id query parameter is not valid.\n- The pagination cursor is not valid.", 401: "- The ID in moderator_id must match the user ID in the user access token.\n- The Authorization header is required and must contain a user access token.\n- The user access token must include the *moderator:read:unban_requests* or *moderator:manage:unban_requests* scope.\n- The access token is not valid.\n- The client ID specified in the Client-Id header does not match the client ID specified in the access token."}
            );
        },
        /**
         * @typedef ResolveUnbanRequestsResponse_Data
         * @prop {string} id Unban request ID.
         * @prop {string} broadcasterId User ID of broadcaster whose channel is receiving the unban request.
         * @prop {string} broadcasterLogin The broadcaster’s login name.
         * @prop {string} broadcasterName The broadcaster’s display name.
         * @prop {string} moderatorId User ID of moderator who approved/denied the request.
         * @prop {string} moderatorLogin The moderator’s login name.
         * @prop {string} moderatorName The moderator’s display name.
         * @prop {string} userId User ID of the requestor who is asking for an unban.
         * @prop {string} userLogin The user’s login name.
         * @prop {string} userName The user’s display name.
         * @prop {string} text Text of the request from the requesting user.
         * @prop {string} status Status of the request. One of: - approved
         *
         * - denied
         * @prop {string} createdAt Timestamp of when the unban request was created.
         * @prop {string} resolvedAt Timestamp of when moderator/broadcaster approved or denied the request.
         * @prop {string} resolutionText Text input by the resolver (moderator) of the unban request.
         */
        /**
         * @typedef ResolveUnbanRequestsResponse
         * @prop {ResolveUnbanRequestsResponse_Data[]} data 
         */
        /**
         * Resolves an unban request by approving or denying it.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#resolve-unban-requests)
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `moderator:manage:unban_requests`
         *
         * ---
         * *Examples*: 
         * 
         * Approving an unban request.: 
         * ```
         * curl -X PATCH 'https://api.twitch.tv/helix/moderation/unban_requests?broadcaster_id=274637212&moderator_id=274637212&unban_request_id=92af127c-7326-4483-a52b-b0daa0be61c01&status=approved' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'`
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "id": "92af127c-7326-4483-a52b-b0da0be61c01",
         *       "broadcaster_name": "torpedo09",
         *       "broadcaster_login": "torpedo09",
         *       "broadcaster_id": "274637212",
         *       "moderator_id": "141981764",
         *       "moderator_login": "twitchdev",
         *       "moderator_name": "TwitchDev",
         *       "user_id": "424596340",
         *       "user_login": "quotrok",
         *       "user_name": "quotrok",
         *       "text": "Please unban me from the channel?",
         *       "status": "approved",
         *       "created_at": "2022-08-07T02:07:55Z",
         *       "resolved_at": "2022-08-09T02:07:55Z",
         *       "resolution_text": null
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster whose channel is approving or denying the unban request.
         * @param {string} moderatorId The ID of the broadcaster or a user that has permission to moderate the broadcaster’s unban requests. This ID must match the user ID in the user access token.
         * @param {string} unbanRequestId The ID of the broadcaster or a user that has permission to moderate the broadcaster’s unban requests. This ID must match the user ID in the user access token.
         * @param {string} status Resolution status. - approved
         *
         * - denied
         * @param {string?} resolutionText Message supplied by the unban request resolver. The message is limited to a maximum of 500 characters.
         * @returns {Promise<ResolveUnbanRequestsResponse>} 
         */
        resolveUnbanRequests(broadcasterId, moderatorId, unbanRequestId, status, resolutionText=null) {
            return reqFunc("https://api.twitch.tv/helix/moderation/unban_requests",
                ["moderator:manage:unban_requests"],
                ["user"],
                {broadcaster_id: broadcasterId, moderator_id: moderatorId, unban_request_id: unbanRequestId, status: status, resolution_text: resolutionText},
                {},
                {200: "Successfully resolved the unban request.", 400: "- The broadcaster_id query parameter is required.\n- The ID in the broadcaster_id query parameter is not valid.\n- The moderator_id query parameter is required.\n- The ID in the moderator_id query parameter is not valid.\n- The pagination cursor is not valid.\n- The broadcaster is not receiving unban requests\n- Invalid requested update", 401: "- The ID in moderator_id must match the user ID in the user access token.\n- The Authorization header is required and must contain a user access token.\n- The user access token must include the moderator:manage:unban_requests scope.\n- The access token is not valid.\n- The client ID specified in the Client-Id header does not match the client ID specified in the access token.", 404: "The unban request ID was not found."}
            );
        },
        /**
         * @typedef GetBlockedTermsResponse_Data
         * @prop {string} broadcasterId The broadcaster that owns the list of blocked terms.
         * @prop {string} moderatorId The moderator that blocked the word or phrase from being used in the broadcaster’s chat room.
         * @prop {string} id An ID that identifies this blocked term.
         * @prop {string} text The blocked word or phrase.
         * @prop {string} createdAt The UTC date and time (in RFC3339 format) that the term was blocked.
         * @prop {string} updatedAt The UTC date and time (in RFC3339 format) that the term was updated.When the term is added, this timestamp is the same as `created_at`. The timestamp changes as AutoMod continues to deny the term.
         * @prop {string} expiresAt The UTC date and time (in RFC3339 format) that the blocked term is set to expire. After the block expires, users may use the term in the broadcaster’s chat room.This field is *null* if the term was added manually or was permanently blocked by AutoMod.
         */
        /**
         * @typedef GetBlockedTermsResponse_Pagination
         * @prop {string} cursor The cursor used to get the next page of results. Use the cursor to set the request’s after query parameter.
         */
        /**
         * @typedef GetBlockedTermsResponse
         * @prop {GetBlockedTermsResponse_Data[]} data The list of blocked terms. The list is in descending order of when they were created (see the `created_at` timestamp).
         * @prop {GetBlockedTermsResponse_Pagination} pagination Contains the information used to page through the list of results. The object is empty if there are no more pages left to page through. [Read More](https://dev.twitch.tv/docs/api/guide#pagination)
         */
        /**
         * Gets the broadcaster’s list of non-private, blocked words or phrases.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-blocked-terms)
         *
         * ---
         *  These are the terms that the broadcaster or moderator added manually or that were denied by AutoMod.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `moderator:read:blocked_terms`, `moderator:manage:blocked_terms`
         *
         * ---
         * *Examples*: 
         * 
         * Gets the last 10 blocked terms (see the first query parameter) that were added.: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/moderation/blocked_terms?broadcaster_id=1234&moderator_id=5678&first=10' \
         * -H 'Authorization: Bearer f4otqljtpbpg24v41v9gechs4yvwy' \
         * -H 'Client-Id: t214nt8z1rdtbj69hyarjvh5mi6fh'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "broadcaster_id": "1234",
         *       "moderator_id": "5678",
         *       "id": "520e4d4e-0cda-49c7-821e-e5ef4f88c2f2",
         *       "text": "A phrase I’m not fond of",
         *       "created_at": "2021-09-29T19:45:37Z",
         *       "updated_at": "2021-09-29T19:45:37Z",
         *       "expires_at": null
         *     },
         * 
         *     . . .
         * 
         *   ],
         *   "pagination": {
         *     "cursor": "eyJiIjpudWxsLCJhIjp7IkN1cnNvciI6I..."
         *   }
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster whose blocked terms you’re getting.
         * @param {string} moderatorId The ID of the broadcaster or a user that has permission to moderate the broadcaster’s chat room. This ID must match the user ID in the user access token.
         * @param {number?} first The maximum number of items to return per page in the response. The minimum page size is 1 item per page and the maximum is 100 items per page. The default is 20.
         * @param {string?} after The cursor used to get the next page of results. The *Pagination* object in the response contains the cursor’s value.
         * @returns {Promise<GetBlockedTermsResponse>} 
         */
        getBlockedTerms(broadcasterId, moderatorId, first=null, after=null) {
            return reqFunc("https://api.twitch.tv/helix/moderation/blocked_terms",
                ["moderator:read:blocked_terms", "moderator:manage:blocked_terms"],
                ["user"],
                {broadcaster_id: broadcasterId, moderator_id: moderatorId, first: first, after: after},
                {},
                {200: "Successfully retrieved the list of blocked terms.", 400: "- The broadcaster_id query parameter is required.\n- The moderator_id query parameter is required.", 401: "- The ID in moderator_id must match the user ID in the user access token.\n- The Authorization header must contain a user access token.\n- The user access token must include the moderator:read:blocked_terms scope.\n- The access token is not valid.\n- The client ID specified in the Client-Id header does not match the client ID specified in the access token.", 403: "- The user in moderator_id is not one of the broadcaster's moderators."}
            );
        },
        /**
         * @typedef AddBlockedTermResponse_Data
         * @prop {string} broadcasterId The broadcaster that owns the list of blocked terms.
         * @prop {string} moderatorId The moderator that blocked the word or phrase from being used in the broadcaster’s chat room.
         * @prop {string} id An ID that identifies this blocked term.
         * @prop {string} text The blocked word or phrase.
         * @prop {string} createdAt The UTC date and time (in RFC3339 format) that the term was blocked.
         * @prop {string} updatedAt The UTC date and time (in RFC3339 format) that the term was updated.When the term is added, this timestamp is the same as `created_at`. The timestamp changes as AutoMod continues to deny the term.
         * @prop {string} expiresAt The UTC date and time (in RFC3339 format) that the blocked term is set to expire. After the block expires, users may use the term in the broadcaster’s chat room.This field is *null* if the term was added manually or was permanently blocked by AutoMod.
         */
        /**
         * @typedef AddBlockedTermResponse
         * @prop {AddBlockedTermResponse_Data[]} data A list that contains the single blocked term that the broadcaster added.
         */
        /**
         * Adds a word or phrase to the broadcaster’s list of blocked terms.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#add-blocked-term)
         *
         * ---
         *  These are the terms that the broadcaster doesn’t want used in their chat room.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `moderator:manage:blocked_terms`
         *
         * ---
         * *Examples*: 
         * 
         * Adds a blocked term. Adding the same term again will return the previously added term.Adds a term that uses the wildcard character (*).: 
         * ```
         * {
         *   "data": [
         *     {
         *       "broadcaster_id": "1234",
         *       "moderator_id": "5678",
         *       "id": "520e4d4e-0cda-49c7-821e-e5ef4f88c2f2",
         *       "text": "crac*",
         *       "created_at": "2021-09-29T19:45:37Z",
         *       "updated_at": "2021-09-29T19:45:37Z",
         *       "expires_at": null
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster that owns the list of blocked terms.
         * @param {string} moderatorId The ID of the broadcaster or a user that has permission to moderate the broadcaster’s chat room. This ID must match the user ID in the user access token.
         * @param {string} text The word or phrase to block from being used in the broadcaster’s chat room. The term must contain a minimum of 2 characters and may contain up to a maximum of 500 characters.Terms may include a wildcard character (*). The wildcard character must appear at the beginning or end of a word or set of characters. For example, *foo or foo*.If the blocked term already exists, the response contains the existing blocked term.
         * @returns {Promise<AddBlockedTermResponse>} 
         */
        addBlockedTerm(broadcasterId, moderatorId, text) {
            return reqFunc("https://api.twitch.tv/helix/moderation/blocked_terms",
                ["moderator:manage:blocked_terms"],
                ["user"],
                {broadcaster_id: broadcasterId, moderator_id: moderatorId},
                {text: text},
                {200: "Successfully retrieved the list of blocked terms.", 400: "- The broadcaster_id query parameter is required.\n- The moderator_id query parameter is required.\n- The `text` field is required.\n- The length of the term in the `text` field is either too short or too long.", 401: "- The ID in moderator_id must match the user ID in the user access token.\n- The Authorization header is required and must contain a user access token.\n- The user access token must include the moderator:manage:blocked_terms scope.\n- The access token is not valid.\n- The client ID specified in the Client-Id header does not match the client ID specified in the access token.", 403: "- The user in moderator_id is not one of the broadcaster's moderators."}
            );
        },
        /**
         * Removes the word or phrase from the broadcaster’s list of blocked terms.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#remove-blocked-term)
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `moderator:manage:blocked_terms`
         *
         * ---
         * *Examples*: 
         * 
         * Deletes the specified blocked term.: 
         * ```
         * curl -X DELETE 'https://api.twitch.tv/helix/moderation/blocked_terms?broadcaster_id=1234&moderator_id=5678&id=c9fc79b8-0f63-4ef7-9d38-efd811e74ac2' \ 
         * -H 'Authorization: Bearer f4otqljtpbpg24v41v9gechs4yvwy' \
         * -H 'Client-Id: t214nt8z1rdtbj69hyarjvh5mi6fh'
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster that owns the list of blocked terms.
         * @param {string} moderatorId The ID of the broadcaster or a user that has permission to moderate the broadcaster’s chat room. This ID must match the user ID in the user access token.
         * @param {string} id The ID of the blocked term to remove from the broadcaster’s list of blocked terms.
         * @returns {Promise<void>} 
         */
        removeBlockedTerm(broadcasterId, moderatorId, id) {
            return reqFunc("https://api.twitch.tv/helix/moderation/blocked_terms",
                ["moderator:manage:blocked_terms"],
                ["user"],
                {broadcaster_id: broadcasterId, moderator_id: moderatorId, id: id},
                {},
                {204: "Successfully removed the blocked term. Also returned if the ID is not found.", 400: "- The broadcaster_id query parameter is required.\n- The moderator_id query parameter is required.\n- The id query parameter is required.", 401: "- The ID in moderator_id must match the user ID in the user access token.\n- The Authorization header is required and must contain a user access token.\n- The user access token must include the moderator:manage:blocked_terms scope.\n- The access token is not valid.\n- The client ID specified in the Client-Id header does not match the client ID specified in the access token.", 403: "- The user in moderator_id is not one of the broadcaster's moderators."}
            );
        },
        /**
         * Removes a single chat message or all chat messages from the broadcaster’s chat room.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#delete-chat-messages)
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `moderator:manage:chat_messages`
         *
         * ---
         * *Examples*: 
         * 
         * Removes all messages from the broadcaster’s chat room (doesn’t include the message_id query parameter).Removes the specified message from the broadcaster’s chat room.: 
         * ```
         * curl -X DELETE 'https://api.twitch.tv/helix/moderation/chat?broadcaster_id=11111&moderator_id=44444&message_id=abc-123-def' \ 
         * -H 'Authorization: Bearer f4otqljtpbpg24v41v9gechs4yvwy' \
         * -H 'Client-Id: t214nt8z1rdtbj69hyarjvh5mi6fh'
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster that owns the chat room to remove messages from.
         * @param {string} moderatorId The ID of the broadcaster or a user that has permission to moderate the broadcaster’s chat room. This ID must match the user ID in the user access token.
         * @param {string?} messageId The ID of the message to remove. The `id` tag in the [PRIVMSG](https://dev.twitch.tv/docs/irc/tags#privmsg-tags) tag contains the message’s ID. Restrictions:
         *
         * - The message must have been created within the last 6 hours.
         *
         * - The message must not belong to the broadcaster.
         *
         * - The message must not belong to another moderator.
         *
         * If not specified, the request removes all messages in the broadcaster’s chat room.
         * @returns {Promise<void>} 
         */
        deleteChatMessages(broadcasterId, moderatorId, messageId=null) {
            return reqFunc("https://api.twitch.tv/helix/moderation/chat",
                ["moderator:manage:chat_messages"],
                ["user"],
                {broadcaster_id: broadcasterId, moderator_id: moderatorId, message_id: messageId},
                {},
                {204: "Successfully removed the specified messages.", 400: "- You may not delete another moderator's messages.\n- You may not delete the broadcaster's messages.", 401: "- The Authorization header is required and must contain a user access token.\n- The user access token is missing the moderator:manage:chat_messages scope.\n- The OAuth token is not valid.\n- The client ID specified in the Client-Id header does not match the client ID specified in the OAuth token.", 403: "- The user in moderator_id is not one of the broadcaster's moderators.", 404: "- The ID in message_id was not found.\n- The specified message was created more than 6 hours ago."}
            );
        },
        /**
         * @typedef GetModeratedChannelsResponse_Data
         * @prop {string} broadcasterId An ID that uniquely identifies the channel this user can moderate.
         * @prop {string} broadcasterLogin The channel’s login name.
         * @prop {string} broadcasterName The channels’ display name.
         */
        /**
         * @typedef GetModeratedChannelsResponse_Pagination
         * @prop {string} cursor The cursor used to get the next page of results. Use the cursor to set the request’s after query parameter.
         */
        /**
         * @typedef GetModeratedChannelsResponse
         * @prop {GetModeratedChannelsResponse_Data[]} data The list of channels that the user has moderator privileges in.
         * @prop {GetModeratedChannelsResponse_Pagination} pagination Contains the information used to page through the list of results. The object is empty if there are no more pages left to page through.
         */
        /**
         * Gets a list of channels that the specified user has moderator privileges in.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-moderated-channels)
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `user:read:moderated_channels`
         *
         * ---
         * *Examples*: 
         * 
         * Example 1: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/moderation/channels?user_id=931931' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "broadcaster_id" : "12345",
         *       "broadcaster_login" : "grateful_broadcaster",
         *       "broadcaster_name" : "Grateful_Broadcaster"
         *     },
         *     {
         *       "broadcaster_id" : "98765",
         *       "broadcaster_login" : "bashfulgamer",
         *       "broadcaster_name" : "BashfulGamer"
         *     },
         *     ...
         *   ],
         *   "pagination" : {
         *     "cursor" : "eyJiIjpudWxsLCJhIjp7IkN1cnNvciI6IjEwMDQ3MzA2NDo4NjQwNjU3MToxSVZCVDFKMnY5M1BTOXh3d1E0dUdXMkJOMFcifX0"
         *   }
         * }
         * ```
         *
         * ---
         * @param {string} userId A user’s ID. Returns the list of channels that this user has moderator privileges in. This ID must match the user ID in the user OAuth token
         * @param {string?} after The cursor used to get the next page of results. The Pagination object in the response contains the cursor’s value.
         * @param {number?} first The maximum number of items to return per page in the response.Minimum page size is 1 item per page and the maximum is 100. The default is 20.
         * @returns {Promise<GetModeratedChannelsResponse>} 
         */
        getModeratedChannels(userId, after=null, first=null) {
            return reqFunc("https://api.twitch.tv/helix/moderation/channels",
                ["user:read:moderated_channels"],
                ["user"],
                {user_id: userId, after: after, first: first},
                {},
                {}
            );
        },
        /**
         * @typedef GetModeratorsResponse_Data
         * @prop {string} userId The ID of the user that has permission to moderate the broadcaster’s channel.
         * @prop {string} userLogin The user’s login name.
         * @prop {string} userName The user’s display name.
         */
        /**
         * @typedef GetModeratorsResponse_Pagination
         * @prop {string} cursor The cursor used to get the next page of results. Use the cursor to set the request’s after query parameter.
         */
        /**
         * @typedef GetModeratorsResponse
         * @prop {GetModeratorsResponse_Data[]} data The list of moderators.
         * @prop {GetModeratorsResponse_Pagination} pagination Contains the information used to page through the list of results. The object is empty if there are no more pages left to page through. [Read More](https://dev.twitch.tv/docs/api/guide#pagination)
         */
        /**
         * Gets all users allowed to moderate the broadcaster’s chat room.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-moderators)
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `moderation:read`, `channel:manage:moderators`
         *
         * ---
         * *Examples*: 
         * 
         * Example 1: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/moderation/moderators?broadcaster_id=198704263' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "user_id": "424596340",
         *       "user_login": "quotrok",
         *       "user_name": "quotrok"
         *     },
         *     ...
         *   ],
         *   "pagination": {
         *     "cursor": "eyJiIjpudWxsLCJhIjp7IkN1cnNvciI6IjEwMDQ3MzA2NDo4NjQwNjU3MToxSVZCVDFKMnY5M1BTOXh3d1E0dUdXMkJOMFcifX0"
         *   }
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster whose list of moderators you want to get. This ID must match the user ID in the access token.
         * @param {string?} userId A list of user IDs used to filter the results. To specify more than one ID, include this parameter for each moderator you want to get. For example, `user_id=1234&user_id=5678`. You may specify a maximum of 100 IDs.The returned list includes only the users from the list who are moderators in the broadcaster’s channel. The list is returned in the same order as you specified the IDs.
         * @param {string?} first The maximum number of items to return per page in the response. The minimum page size is 1 item per page and the maximum is 100 items per page. The default is 20.
         * @param {string?} after The cursor used to get the next page of results. The *Pagination* object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination)
         * @returns {Promise<GetModeratorsResponse>} 
         */
        getModerators(broadcasterId, userId=null, first=null, after=null) {
            return reqFunc("https://api.twitch.tv/helix/moderation/moderators",
                ["moderation:read", "channel:manage:moderators"],
                ["user"],
                {broadcaster_id: broadcasterId, user_id: userId, first: first, after: after},
                {},
                {200: "Successfully retrieved the list of moderators.", 400: "- The broadcaster_id query parameter is required.", 401: "- The ID in broadcaster_id must match the user ID found in the access token.\n- The Authorization header is required and must contain a user access token.\n- The user access token must include the moderation:read scope.\n- The access token is not valid.\n- The client ID specified in the Client-Id header does not match the client ID specified in the access token."}
            );
        },
        /**
         * Adds a moderator to the broadcaster’s chat room.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#add-channel-moderator)
         *
         * ---
         * 
         *
         * *Rate Limits*: The broadcaster may add a maximum of 10 moderators within a 10-second window.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `channel:manage:moderators`
         *
         * ---
         * *Examples*: 
         * 
         * Example 1: 
         * ```
         * curl -X POST 'https://api.twitch.tv/helix/moderation/moderators?broadcaster_id=11111&user_id=44444' \
         * -H 'Authorization: Bearer kpvy3cjboyptmdkiacwr0c19hotn5s' \
         * -H 'Client-Id: hof5gwx0su6owfnys0nyan9c87zr6t'
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster that owns the chat room. This ID must match the user ID in the access token.
         * @param {string} userId The ID of the user to add as a moderator in the broadcaster’s chat room.
         * @returns {Promise<void>} 
         */
        addChannelModerator(broadcasterId, userId) {
            return reqFunc("https://api.twitch.tv/helix/moderation/moderators",
                ["channel:manage:moderators"],
                ["user"],
                {broadcaster_id: broadcasterId, user_id: userId},
                {},
                {204: "Successfully added the moderator.", 400: "- The ID in broadcaster_id was not found.\n- The ID in user_id was not found.\n- The user in user_id is already a moderator in the broadcaster's chat room.\n- The user in user_id cannot become a moderator because they're banned from the channel.", 401: "- The Authorization header is required and must contain a user access token.\n- The user access token must include the channel:manage:moderators scope.\n- The access token is not valid.\n- The ID in the broadcaster_id query parameter must match the user ID in the access token.\n- The client ID specified in the Client-Id header does not match the client ID specified in the access token.", 422: "- The user in user_id is a VIP. To make them a moderator, you must first remove them as a VIP (see [Remove Channel VIP](https://dev.twitch.tv/docs/api/reference#remove-channel-vip)).", 429: "- The broadcaster has exceeded the number of requests allowed within a 10-second window. See this endpoint's rate limits."}
            );
        },
        /**
         * Removes a moderator from the broadcaster’s chat room.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#remove-channel-moderator)
         *
         * ---
         * 
         *
         * *Rate Limits*: The broadcaster may remove a maximum of 10 moderators within a 10-second window.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `channel:manage:moderators`
         *
         * ---
         * *Examples*: 
         * 
         * Example 1: 
         * ```
         * curl -X DELETE 'https://api.twitch.tv/helix/moderation/moderators?broadcaster_id=11111&user_id=44444' \
         * -H 'Authorization: Bearer kpvy3cjboyptmdkiacwr0c19hotn5s' \
         * -H 'Client-Id: hof5gwx0su6owfnys0nyan9c87zr6t'
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster that owns the chat room. This ID must match the user ID in the access token.
         * @param {string} userId The ID of the user to remove as a moderator from the broadcaster’s chat room.
         * @returns {Promise<void>} 
         */
        removeChannelModerator(broadcasterId, userId) {
            return reqFunc("https://api.twitch.tv/helix/moderation/moderators",
                ["channel:manage:moderators"],
                ["user"],
                {broadcaster_id: broadcasterId, user_id: userId},
                {},
                {204: "Successfully removed the moderator.", 400: "- The ID in broadcaster_id was not found.\n- The ID in user_id was not found.\n- The user in user_id is not a moderator in the broadcaster's chat room.", 401: "- The Authorization header is required and must contain a user access token.\n- The user access token must include the channel:manage:moderators scope.\n- The access token is not valid.\n- The ID in the broadcaster_id query parameter must match the user ID in the access token.\n- The client ID specified in the Client-Id header does not match the client ID specified in the access token.", 429: "- The broadcaster has exceeded the number of requests allowed within a 10-second window. See this endpoint's rate limits."}
            );
        },
        /**
         * @typedef GetVIPsResponse_Data
         * @prop {string} userId An ID that uniquely identifies the VIP user.
         * @prop {string} userName The user’s display name.
         * @prop {string} userLogin The user’s login name.
         */
        /**
         * @typedef GetVIPsResponse_Pagination
         * @prop {string} cursor The cursor used to get the next page of results. Use the cursor to set the request’s after query parameter.
         */
        /**
         * @typedef GetVIPsResponse
         * @prop {GetVIPsResponse_Data[]} data The list of VIPs. The list is empty if the broadcaster doesn’t have VIP users.
         * @prop {GetVIPsResponse_Pagination} pagination Contains the information used to page through the list of results. The object is empty if there are no more pages left to page through. [Read More](https://dev.twitch.tv/docs/api/guide#pagination)
         */
        /**
         * Gets a list of the broadcaster’s VIPs.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-vips)
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `channel:read:vips`, `channel:manage:vips`
         *
         * ---
         * *Examples*: 
         * 
         * Gets a list of the broadcaster’s VIPsGets a filtered list of the broadcaster’s VIPs. The list in the response contains only those users that are VIPs.: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/channels/vips?broadcaster_id=123&user_id=456&user_id=678' \
         * -H 'Authorization: Bearer kpvy3cjboyptmdkiacwr0c19hotn5s' \
         * -H 'Client-Id: hof5gwx0su6owfnys0nyan9c87zr6t'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "user_id": "11111",
         *       "user_name": "UserDisplayName",
         *       "user_login": "userloginname"
         *     },
         *     ...
         *   ],
         *   "pagination": {
         *     "cursor": "eyJiIjpudWxsLCJhIjp7Ik9mZnNldCI6NX19"
         *   }
         * }
         * ```
         *
         * ---
         * @param {string?} userId Filters the list for specific VIPs. To specify more than one user, include the user_id parameter for each user to get. For example, `&user_id=1234&user_id=5678`. The maximum number of IDs that you may specify is 100. Ignores the ID of those users in the list that aren’t VIPs.
         * @param {string} broadcasterId The ID of the broadcaster whose list of VIPs you want to get. This ID must match the user ID in the access token.
         * @param {number?} first The maximum number of items to return per page in the response. The minimum page size is 1 item per page and the maximum is 100. The default is 20.
         * @param {string?} after The cursor used to get the next page of results. The *Pagination* object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination)
         * @returns {Promise<GetVIPsResponse>} 
         */
        getVIPs(userId=null, broadcasterId, first=null, after=null) {
            return reqFunc("https://api.twitch.tv/helix/channels/vips",
                ["channel:read:vips", "channel:manage:vips"],
                ["user"],
                {user_id: userId, broadcaster_id: broadcasterId, first: first, after: after},
                {},
                {200: "Successfully retrieved the broadcaster’s list of VIPs.", 400: "- The broadcaster_id query parameter is required.\n- The ID in the user_id query parameter is not valid.\n- The number of user_id query parameters exceeds the maximum allowed.", 401: "- The Authorization header is required and must contain a user access token.\n- The user access token must include the channel:read:vips or channel:manage:vips scope.\n- The OAuth token is not valid.\n- The ID in the broadcaster_id query parameter must match the user ID in the access token.\n- The client ID specified in the Client-Id header does not match the client ID specified in the OAuth token."}
            );
        },
        /**
         * Adds the specified user as a VIP in the broadcaster’s channel.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#add-channel-vip)
         *
         * ---
         * 
         *
         * *Rate Limits*: The broadcaster may add a maximum of 10 VIPs within a 10-second window.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `channel:manage:vips`
         *
         * ---
         * *Examples*: 
         * 
         * Adds a VIP to the broadcaster’s chat room.: 
         * ```
         * curl -X POST 'https://api.twitch.tv/helix/channels/vips?broadcaster_id=123&user_id=456' \
         * -H 'Authorization: Bearer kpvy3cjboyptmdkiacwr0c19hotn5s' \
         * -H 'Client-Id: hof5gwx0su6owfnys0nyan9c87zr6t'
         * ```
         *
         * ---
         * @param {string} userId The ID of the user to give VIP status to.
         * @param {string} broadcasterId The ID of the broadcaster that’s adding the user as a VIP. This ID must match the user ID in the access token.
         * @returns {Promise<void>} 
         */
        addChannelVIP(userId, broadcasterId) {
            return reqFunc("https://api.twitch.tv/helix/channels/vips",
                ["channel:manage:vips"],
                ["user"],
                {user_id: userId, broadcaster_id: broadcasterId},
                {},
                {}
            );
        },
        /**
         * Removes the specified user as a VIP in the broadcaster’s channel.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#remove-channel-vip)
         *
         * ---
         * 
         *
         * If the broadcaster is removing the user’s VIP status, the ID in the broadcaster_id query parameter must match the user ID in the access token; otherwise, if the user is removing their VIP status themselves, the ID in the user_id query parameter must match the user ID in the access token.
         *
         * *Rate Limits*: The broadcaster may remove a maximum of 10 VIPs within a 10-second window.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `channel:manage:vips`
         *
         * ---
         * *Examples*: 
         * 
         * Removes the VIP user from the broadcaster’s channel.: 
         * ```
         * curl -X DELETE 'https://api.twitch.tv/helix/channels/vips?broadcaster_id=123&user_id=456' \
         * -H 'Authorization: Bearer kpvy3cjboyptmdkiacwr0c19hotn5s' \
         * -H 'Client-Id: hof5gwx0su6owfnys0nyan9c87zr6t'
         * ```
         *
         * ---
         * @param {string} userId The ID of the user to remove VIP status from.
         * @param {string} broadcasterId The ID of the broadcaster who owns the channel where the user has VIP status.
         * @returns {Promise<void>} 
         */
        removeChannelVIP(userId, broadcasterId) {
            return reqFunc("https://api.twitch.tv/helix/channels/vips",
                ["channel:manage:vips"],
                ["user"],
                {user_id: userId, broadcaster_id: broadcasterId},
                {},
                {}
            );
        },
        /**
         * @typedef UpdateShieldModeStatusResponse_Data
         * @prop {boolean} isActive A Boolean value that determines whether Shield Mode is active. Is *true* if Shield Mode is active; otherwise, *false*.
         * @prop {string} moderatorId An ID that identifies the moderator that last activated Shield Mode.
         * @prop {string} moderatorLogin The moderator’s login name.
         * @prop {string} moderatorName The moderator’s display name.
         * @prop {string} lastActivatedAt The UTC timestamp (in RFC3339 format) of when Shield Mode was last activated.
         */
        /**
         * @typedef UpdateShieldModeStatusResponse
         * @prop {UpdateShieldModeStatusResponse_Data[]} data A list that contains a single object with the broadcaster’s updated Shield Mode status.
         */
        /**
         * Activates or deactivates the broadcaster’s Shield Mode.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#update-shield-mode-status)
         *
         * ---
         * 
         *
         * Twitch’s Shield Mode feature is like a panic button that broadcasters can push to protect themselves from chat abuse coming from one or more accounts. When activated, Shield Mode applies the overrides that the broadcaster configured in the Twitch UX. If the broadcaster hasn’t configured Shield Mode, it applies default overrides.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `moderator:manage:shield_mode`
         *
         * ---
         * *Examples*: 
         * 
         * Example 1: 
         * ```
         * curl -X PUT 'https://api.twitch.tv/helix/moderation/shield_mode?broadcaster_id=12345&moderator_id=98765' \
         * -H 'Authorization: Bearer kpvy3cjboypmiacwr0c19hotn5s' \
         * -H 'Client-Id: hof5gwx0su6owfn0yan9c87zr6t' \
         * -H 'Content-Type: application/json' \
         * -d '{"is_active":false}'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "is_active": false,
         *       "moderator_id": "98765",
         *       "moderator_name": "SimplySimple",
         *       "moderator_login": "simplysimple",
         *       "last_activated_at": "2022-07-26T17:16:03.123Z"
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster whose Shield Mode you want to activate or deactivate.
         * @param {string} moderatorId The ID of the broadcaster or a user that is one of the broadcaster’s moderators. This ID must match the user ID in the access token.
         * @param {boolean} isActive A Boolean value that determines whether to activate Shield Mode. Set to *true* to activate Shield Mode; otherwise, *false* to deactivate Shield Mode.
         * @returns {Promise<UpdateShieldModeStatusResponse>} 
         */
        updateShieldModeStatus(broadcasterId, moderatorId, isActive) {
            return reqFunc("https://api.twitch.tv/helix/moderation/shield_mode",
                ["moderator:manage:shield_mode"],
                ["user"],
                {broadcaster_id: broadcasterId, moderator_id: moderatorId},
                {is_active: isActive},
                {200: "Successfully updated the broadcaster’s Shield Mode status.", 400: "- The broadcaster_id query parameter is required.\n- The ID in the broadcaster_id query parameter is not valid.\n- The `is_active` field is required.\n- The value in the `is_active` field is not valid.", 401: "- The ID in moderator_id must match the user ID in the user access token.\n- The Authorization header is required and must contain a user access token.\n- The user access token must include the moderator:manage:shield_mode scope.\n- The access token is not valid.\n- The client ID specified in the Client-Id header does not match the client ID specified in the access token.", 403: "- The user in moderator_id is not one of the broadcaster's moderators."}
            );
        },
        /**
         * @typedef GetShieldModeStatusResponse_Data
         * @prop {boolean} isActive A Boolean value that determines whether Shield Mode is active. Is *true* if the broadcaster activated Shield Mode; otherwise, *false*.
         * @prop {string} moderatorId An ID that identifies the moderator that last activated Shield Mode. Is an empty string if Shield Mode hasn’t been previously activated.
         * @prop {string} moderatorLogin The moderator’s login name. Is an empty string if Shield Mode hasn’t been previously activated.
         * @prop {string} moderatorName The moderator’s display name. Is an empty string if Shield Mode hasn’t been previously activated.
         * @prop {string} lastActivatedAt The UTC timestamp (in RFC3339 format) of when Shield Mode was last activated. Is an empty string if Shield Mode hasn’t been previously activated.
         */
        /**
         * @typedef GetShieldModeStatusResponse
         * @prop {GetShieldModeStatusResponse_Data[]} data A list that contains a single object with the broadcaster’s Shield Mode status.
         */
        /**
         * Gets the broadcaster’s Shield Mode activation status.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-shield-mode-status)
         *
         * ---
         * 
         *
         * To receive notification when the broadcaster activates and deactivates Shield Mode, subscribe to the [channel.shield_mode.begin](https://dev.twitch.tv/docs/eventsub/eventsub-subscription-types#channelshield_modebegin) and [channel.shield_mode.end](https://dev.twitch.tv/docs/eventsub/eventsub-subscription-types#channelshield_modeend) subscription types.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `moderator:read:shield_mode`, `moderator:manage:shield_mode`
         *
         * ---
         * *Examples*: 
         * 
         * Example 1: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/moderation/shield_mode?broadcaster_id=12345&moderator_id=98765' \
         * -H 'Authorization: Bearer kpvy3cjboypmiacwr0c19hotn5s' \
         * -H 'Client-Id: hof5gwx0su6owfn0yan9c87zr6t'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "is_active": true,
         *       "moderator_id": "98765",
         *       "moderator_name": "SimplySimple",
         *       "moderator_login": "simplysimple",
         *       "last_activated_at": "2022-07-26T17:16:03.123Z"
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster whose Shield Mode activation status you want to get.
         * @param {string} moderatorId The ID of the broadcaster or a user that is one of the broadcaster’s moderators. This ID must match the user ID in the access token.
         * @returns {Promise<GetShieldModeStatusResponse>} 
         */
        getShieldModeStatus(broadcasterId, moderatorId) {
            return reqFunc("https://api.twitch.tv/helix/moderation/shield_mode",
                ["moderator:read:shield_mode", "moderator:manage:shield_mode"],
                ["user"],
                {broadcaster_id: broadcasterId, moderator_id: moderatorId},
                {},
                {200: "Successfully retrieved the broadcaster’s Shield Mode activation status.", 400: "- The broadcaster_id query parameter is required.\n- The ID in the broadcaster_id query parameter is not valid.", 401: "- The ID in moderator_id must match the user ID in the user access token.\n- The Authorization header is required and must contain a user access token.\n- The user access token must include the moderator:read:shield_mode or moderator:manage:shield_mode scope.\n- The access token is not valid.\n- The client ID specified in the Client-Id header does not match the client ID specified in the access token.", 403: "- The user in moderator_id is not one of the broadcaster's moderators."}
            );
        },
        /**
         * @typedef WarnChatUserResponse_Data
         * @prop {string} broadcasterId The ID of the channel in which the warning will take effect.
         * @prop {string} userId The ID of the warned user.
         * @prop {string} moderatorId The ID of the user who applied the warning.
         * @prop {string} reason The reason provided for warning.
         */
        /**
         * @typedef WarnChatUserResponse
         * @prop {WarnChatUserResponse_Data[]} data A list that contains information about the warning.
         */
        /**
         * @typedef WarnChatUserRequest_Data
         * @prop {string} userId The ID of the twitch user to be warned.
         * @prop {string} reason A custom reason for the warning. *Max 500 chars.*
         */
        /**
         * Warns a user in the specified broadcaster’s chat room, preventing them from chat interaction until the warning is acknowledged.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#warn-chat-user)
         *
         * ---
         *  New warnings can be issued to a user when they already have a warning in the channel (new warning will replace old warning).
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `moderator:manage:warnings`
         *
         * ---
         * *Examples*: 
         * 
         * Example 1: 
         * ```
         * curl -X POST 'https://api.twitch.tv/helix/moderation/warnings?broadcaster_id=404040&moderator_id=404041' \
         * -H 'Authorization: Bearer 4a4x78f5wqvkybms7mxfist3jmzul' \
         * -H 'Client-Id: t214nt8z1rdtbj69hyarjvh5mi6fh' \
         * -H 'Content-Type: application/json' \
         * -d '{"data": {"user_id":"9876","reason":"stop doing that!"}}'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "broadcaster_id": "404040",
         *       "user_id": "9876",
         *       "moderator_id": "404041",
         *       "reason": "stop doing that!"
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the channel in which the warning will take effect.
         * @param {string} moderatorId The ID of the twitch user who requested the warning.
         * @param {WarnChatUserRequest_Data} data A list that contains information about the warning.
         * @returns {Promise<WarnChatUserResponse>} 
         */
        warnChatUser(broadcasterId, moderatorId, data) {
            return reqFunc("https://api.twitch.tv/helix/moderation/warnings",
                ["moderator:manage:warnings"],
                ["user"],
                {broadcaster_id: broadcasterId, moderator_id: moderatorId},
                {data: data},
                {200: "Successfully warn a user.", 400: "- The broadcaster_id query parameter is required.\n- The moderator_id query parameter is required.\n- The user_id query parameter is required.\n- The reason query parameter is required.\n- The text in the reason field is too long.\n- The user specified in the user_id may not be warned.", 401: "- The ID in moderator_id must match the user ID in the user access token.\n- The Authorization header is required and must contain a user access token.\n- The user access token must include the moderator:manage:warnings scope.\n- The access token is not valid.\n- The client ID specified in the Client-Id header does not match the client ID specified in the access token.", 403: "The user in moderator_id is not one of the broadcaster’s moderators.", 409: "You may not update the user’s warning state while someone else is updating the state. For example, someone else is currently warning the user or the user is acknowledging an existing warning. Please retry your request.", 429: "The app has exceeded the number of requests it may make per minute for this broadcaster.", 500: "Internal Server Error."}
            );
        },
        /**
         * NEW Adds a suspicious user status to a chatter on the broadcaster’s channel.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#add-suspicious-status-to-chat-user)
         *
         * ---
         * *Authentication*: 
         * 
         * Requires an [app access token](https://dev.twitch.tv/docs/authentication#app-access-tokens) or a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `moderator:manage:suspicious_users`
         *
         * ---
         * *Examples*: 
         * 
         * Mark a user as RESTRICTED.: 
         * ```
         * curl -X POST 'https://api.twitch.tv/helix/moderation/suspicious_users?broadcaster_id=141981764&moderator_id=12826' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2' \
         * -H 'Content-Type: application/json' \
         * -d '{
         *   "user_id": "9876",
         *   "status": "RESTRICTED"
         * }'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "user_id": "9876",
         *       "broadcaster_id": "141981764",
         *       "moderator_id": "12826",
         *       "updated_at": "2025-12-01T23:08:18+00:00",
         *       "status": "RESTRICTED",
         *       "types": [
         *         "MANUALLY_ADDED"
         *       ]
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId The user ID of the broadcaster, indicating the channel where the status is being applied.
         * @param {string} moderatorId The user ID of the moderator who is applying the status.
         * @returns {Promise<void>} 
         */
        addSuspiciousStatusToChatUser(broadcasterId, moderatorId) {
            return reqFunc("https://api.twitch.tv/helix/moderation/suspicious_users",
                ["moderator:manage:suspicious_users"],
                ["app", "user"],
                {broadcaster_id: broadcasterId, moderator_id: moderatorId},
                {},
                {}
            );
        },
        /**
         * @typedef RemoveSuspiciousStatusFromChatUserResponse_Data
         * @prop {string} userId The ID of the user having the suspicious status removed.
         * @prop {string} broadcasterId The user ID of the broadcaster indicating in which channel the status is being removed.
         * @prop {string} moderatorId The user ID of the moderator who modified the last status.
         * @prop {string} updatedAt The timestamp of the last time this user’s status was updated.
         * @prop {string} status The type of suspicious status. Possible values are: NO_TREATMENT
         * @prop {string[]} types An array of strings representing the type(s) of suspicious user this is. Possible values are: MANUALLY_ADDED, DETECTED_BAN_EVADER, DETECTED_SUS_CHATTER, BANNED_IN_SHARED_CHANNEL
         */
        /**
         * @typedef RemoveSuspiciousStatusFromChatUserResponse
         * @prop {RemoveSuspiciousStatusFromChatUserResponse_Data[]} data An array with one object containing information about the suspicious user action.
         */
        /**
         * NEW Remove a suspicious user status from a chatter on broadcaster’s channel.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#remove-suspicious-status-from-chat-user)
         *
         * ---
         * *Authentication*: 
         * 
         * Requires an [app access token](https://dev.twitch.tv/docs/authentication#app-access-tokens) or a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `moderator:manage:suspicious_users`
         *
         * ---
         * *Examples*: 
         * 
         * Removes a suspicious user status from a user.: 
         * ```
         * curl -X DELETE 'https://api.twitch.tv/helix/moderation/suspicious_users?broadcaster_id=141981764&moderator_id=12826&user_id=9876' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   data: [
         *     {
         *       "user_id": "9876",
         *       "broadcaster_id": "141981764",
         *       "moderator_id": "12826",
         *       "updated_at": "2025-12-01T23:08:18+00:00",
         *       "status": "NO_TREATMENT",
         *       "types": [
         *         "MANUALLY_ADDED"
         *       ]
         *     } 
         *   ]
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId The user ID of the broadcaster, indicating the channel where the status is being removed.
         * @param {string} moderatorId The user ID of the moderator who is removing the status.
         * @param {string} userId The ID of the user having the suspicious status removed.
         * @returns {Promise<RemoveSuspiciousStatusFromChatUserResponse>} 
         */
        removeSuspiciousStatusFromChatUser(broadcasterId, moderatorId, userId) {
            return reqFunc("https://api.twitch.tv/helix/moderation/suspicious_users",
                ["moderator:manage:suspicious_users"],
                ["app", "user"],
                {broadcaster_id: broadcasterId, moderator_id: moderatorId, user_id: userId},
                {},
                {200: "Successfully removed a suspicious user status.", 400: "- Validation errors: Missing required fields.\n- The ID in the broadcaster_id query parameter was not found.\n- The status update is not allowed for this user.", 401: "- The Authorization header is required and must specify user access token.\n- The user access token must include the moderator:manage:suspicious_users scope.\n- The OAuth token is not valid.\n- The ID in the Client-Id header must match the Client ID in the OAuth token.", 403: "- The user in the moderator_id query parameter is not one of the broadcaster's moderators."}
            );
        },
    },
    Polls: {
        /**
         * @typedef GetPollsResponse_Data_Choices
         * @prop {string} id An ID that identifies this choice.
         * @prop {string} title The choice's title. The title may contain a maximum of 25 characters.
         * @prop {number} votes The total number of votes cast for this choice.
         * @prop {number} channelPointsVotes The number of votes cast using Channel Points.
         * @prop {number} bitsVotes Not used; will be set to 0.
         */
        /**
         * @typedef GetPollsResponse_Data
         * @prop {string} id An ID that identifies the poll.
         * @prop {string} broadcasterId An ID that identifies the broadcaster that created the poll.
         * @prop {string} broadcasterName The broadcaster's display name.
         * @prop {string} broadcasterLogin The broadcaster's login name.
         * @prop {string} title The question that viewers are voting on. For example, What game should I play next? The title may contain a maximum of 60 characters.
         * @prop {GetPollsResponse_Data_Choices[]} choices A list of choices that viewers can choose from. The list will contain a minimum of two choices and up to a maximum of five choices.
         * @prop {boolean} bitsVotingEnabled Not used; will be set to *false*.
         * @prop {number} bitsPerVote Not used; will be set to 0.
         * @prop {boolean} channelPointsVotingEnabled A Boolean value that indicates whether viewers may cast additional votes using Channel Points. For information about Channel Points, see [Channel Points Guide](https://help.twitch.tv/s/article/channel-points-guide).
         * @prop {number} channelPointsPerVote The number of points the viewer must spend to cast one additional vote.
         * @prop {string} status The poll's status. Valid values are:
         *
         * - ACTIVE — The poll is running.
         *
         * - COMPLETED — The poll ended on schedule (see the `duration` field).
         *
         * - TERMINATED — The poll was terminated before its scheduled end.
         *
         * - ARCHIVED — The poll has been archived and is no longer visible on the channel.
         *
         * - MODERATED — The poll was deleted.
         *
         * - INVALID — Something went wrong while determining the state.
         * @prop {number} duration The length of time (in seconds) that the poll will run for.
         * @prop {string} startedAt The UTC date and time (in RFC3339 format) of when the poll began.
         * @prop {string} endedAt The UTC date and time (in RFC3339 format) of when the poll ended. If `status` is ACTIVE, this field is set to *null*.
         */
        /**
         * @typedef GetPollsResponse_Pagination
         * @prop {string} cursor The cursor used to get the next page of results. Use the cursor to set the request's after query parameter.
         */
        /**
         * @typedef GetPollsResponse
         * @prop {GetPollsResponse_Data[]} data A list of polls. The polls are returned in descending order of start time unless you specify IDs in the request, in which case they're returned in the same order as you passed them in the request. The list is empty if the broadcaster hasn't created polls.
         * @prop {GetPollsResponse_Pagination} pagination Contains the information used to page through the list of results. The object is empty if there are no more pages left to page through. [Read More](https://dev.twitch.tv/docs/api/guide#pagination)
         */
        /**
         * Gets a list of polls that the broadcaster created.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-polls)
         *
         * ---
         * 
         *
         * Polls are available for 90 days after they’re created.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `channel:read:polls`, `channel:manage:polls`
         *
         * ---
         * *Examples*: 
         * 
         * Gets the specified broadcaster’s list of polls.: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/polls?broadcaster_id=141981764&id=ed961efd-8a3f-4cf5-a9d0-e616c590cd2a' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "id": "ed961efd-8a3f-4cf5-a9d0-e616c590cd2a",
         *       "broadcaster_id": "55696719",
         *       "broadcaster_name": "TwitchDev",
         *       "broadcaster_login": "twitchdev",
         *       "title": "Heads or Tails?",
         *       "choices": [
         *         {
         *           "id": "4c123012-1351-4f33-84b7-43856e7a0f47",
         *           "title": "Heads",
         *           "votes": 0,
         *           "channel_points_votes": 0,
         *           "bits_votes": 0
         *         },
         *         {
         *           "id": "279087e3-54a7-467e-bcd0-c1393fcea4f0",
         *           "title": "Tails",
         *           "votes": 0,
         *           "channel_points_votes": 0,
         *           "bits_votes": 0
         *         }
         *       ],
         *       "bits_voting_enabled": false,
         *       "bits_per_vote": 0,
         *       "channel_points_voting_enabled": false,
         *       "channel_points_per_vote": 0,
         *       "status": "ACTIVE",
         *       "duration": 1800,
         *       "started_at": "2021-03-19T06:08:33.871278372Z"
         *     }
         *   ],
         *   "pagination": {}
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster that created the polls. This ID must match the user ID in the user access token.
         * @param {string?} id A list of IDs that identify the polls to return. To specify more than one ID, include this parameter for each poll you want to get. For example, `id=1234&id=5678`. You may specify a maximum of 20 IDs.Specify this parameter only if you want to filter the list that the request returns. The endpoint ignores duplicate IDs and those not owned by this broadcaster.
         * @param {string?} first The maximum number of items to return per page in the response. The minimum page size is 1 item per page and the maximum is 20 items per page. The default is 20.
         * @param {string?} after The cursor used to get the next page of results. The *Pagination* object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination)
         * @returns {Promise<GetPollsResponse>} 
         */
        getPolls(broadcasterId, id=null, first=null, after=null) {
            return reqFunc("https://api.twitch.tv/helix/polls",
                ["channel:read:polls", "channel:manage:polls"],
                ["user"],
                {broadcaster_id: broadcasterId, id: id, first: first, after: after},
                {},
                {200: "Successfully retrieved the broadcaster's polls.", 400: "- The broadcaster_id query parameter is required.", 401: "- The ID in broadcaster_id must match the user ID in the access token.\n- The Authorization header is required and must contain a user access token.\n- The user access token is missing the channel:read:polls scope.\n- The access token is not valid.\n- The client ID specified in the Client-Id header must match the client ID specified in the access token.", 404: "- None of the IDs in the id query parameters were found."}
            );
        },
        /**
         * @typedef CreatePollResponse_Data_Choices
         * @prop {string} id An ID that identifies this choice.
         * @prop {string} title The choice’s title. The title may contain a maximum of 25 characters.
         * @prop {number} votes The total number of votes cast for this choice.
         * @prop {number} channelPointsVotes The number of votes cast using Channel Points.
         * @prop {number} bitsVotes Not used; will be set to 0.
         */
        /**
         * @typedef CreatePollResponse_Data
         * @prop {string} id An ID that identifies the poll.
         * @prop {string} broadcasterId An ID that identifies the broadcaster that created the poll.
         * @prop {string} broadcasterName The broadcaster’s display name.
         * @prop {string} broadcasterLogin The broadcaster’s login name.
         * @prop {string} title The question that viewers are voting on. For example, What game should I play next? The title may contain a maximum of 60 characters.
         * @prop {CreatePollResponse_Data_Choices[]} choices A list of choices that viewers can choose from. The list will contain a minimum of two choices and up to a maximum of five choices.
         * @prop {boolean} bitsVotingEnabled Not used; will be set to *false*.
         * @prop {number} bitsPerVote Not used; will be set to 0.
         * @prop {boolean} channelPointsVotingEnabled A Boolean value that indicates whether viewers may cast additional votes using Channel Points. For information about Channel Points, see [Channel Points Guide](https://help.twitch.tv/s/article/channel-points-guide).
         * @prop {number} channelPointsPerVote The number of points the viewer must spend to cast one additional vote.
         * @prop {string} status The poll’s status. Valid values are:
         *
         * - ACTIVE — The poll is running.
         *
         * - COMPLETED — The poll ended on schedule (see the `duration` field).
         *
         * - TERMINATED — The poll was terminated before its scheduled end.
         *
         * - ARCHIVED — The poll has been archived and is no longer visible on the channel.
         *
         * - MODERATED — The poll was deleted.
         *
         * - INVALID — Something went wrong while determining the state.
         * @prop {number} duration The length of time (in seconds) that the poll will run for.
         * @prop {string} startedAt The UTC date and time (in RFC3339 format) of when the poll began.
         * @prop {string} endedAt The UTC date and time (in RFC3339 format) of when the poll ended. If `status` is ACTIVE, this field is set to *null*.
         */
        /**
         * @typedef CreatePollResponse
         * @prop {CreatePollResponse_Data[]} data A list that contains the single poll that you created.
         */
        /**
         * @typedef CreatePollRequest_Choices
         * @prop {string} title One of the choices the viewer may select. The choice may contain a maximum of 25 characters.
         */
        /**
         * Creates a poll that viewers in the broadcaster’s channel can vote on.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#create-poll)
         *
         * ---
         * 
         *
         * The poll begins as soon as it’s created. You may run only one poll at a time.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `channel:manage:polls`
         *
         * ---
         * *Examples*: 
         * 
         * Creates a poll for the specified broadcaster.: 
         * ```
         * curl -X POST 'https://api.twitch.tv/helix/polls' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2' \
         * -H 'Content-Type: application/json' \
         * -d '{
         *   "broadcaster_id":"141981764",
         *   "title":"Heads or Tails?",
         *   "choices":[{
         *     "title":"Heads"
         *   },
         *   {
         *     "title":"Tails"
         *   }],
         *   "channel_points_voting_enabled":true,
         *   "channel_points_per_vote":100,
         *   "duration":1800
         * }'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "id": "ed961efd-8a3f-4cf5-a9d0-e616c590cd2a",
         *       "broadcaster_id": "141981764",
         *       "broadcaster_name": "TwitchDev",
         *       "broadcaster_login": "twitchdev",
         *       "title": "Heads or Tails?",
         *       "choices": [
         *         {
         *           "id": "4c123012-1351-4f33-84b7-43856e7a0f47",
         *           "title": "Heads",
         *           "votes": 0,
         *           "channel_points_votes": 0,
         *           "bits_votes": 0
         *         },
         *         {
         *           "id": "279087e3-54a7-467e-bcd0-c1393fcea4f0",
         *           "title": "Tails",
         *           "votes": 0,
         *           "channel_points_votes": 0,
         *           "bits_votes": 0
         *         }
         *       ],
         *       "bits_voting_enabled": false,
         *       "bits_per_vote": 0,
         *       "channel_points_voting_enabled": true,
         *       "channel_points_per_vote": 100,
         *       "status": "ACTIVE",
         *       "duration": 1800,
         *       "started_at": "2021-03-19T06:08:33.871278372Z"
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster that’s running the poll. This ID must match the user ID in the user access token.
         * @param {string} title The question that viewers will vote on. For example, What game should I play next? The question may contain a maximum of 60 characters.
         * @param {CreatePollRequest_Choices[]} choices A list of choices that viewers may choose from. The list must contain a minimum of 2 choices and up to a maximum of 5 choices.
         * @param {number} duration The length of time (in seconds) that the poll will run for. The minimum is 15 seconds and the maximum is 1800 seconds (30 minutes).
         * @param {boolean?} channelPointsVotingEnabled A Boolean value that indicates whether viewers may cast additional votes using Channel Points. If *true*, the viewer may cast more than one vote but each additional vote costs the number of Channel Points specified in `channel_points_per_vote`. The default is *false* (viewers may cast only one vote). For information about Channel Points, see [Channel Points Guide](https://help.twitch.tv/s/article/channel-points-guide).
         * @param {number?} channelPointsPerVote The number of points that the viewer must spend to cast one additional vote. The minimum is 1 and the maximum is 1000000. Set only if `ChannelPointsVotingEnabled` is *true*.
         * @returns {Promise<CreatePollResponse>} 
         */
        createPoll(broadcasterId, title, choices, duration, channelPointsVotingEnabled=null, channelPointsPerVote=null) {
            return reqFunc("https://api.twitch.tv/helix/polls",
                ["channel:manage:polls"],
                ["user"],
                {},
                {broadcaster_id: broadcasterId, title: title, choices: choices, duration: duration, channel_points_voting_enabled: channelPointsVotingEnabled, channel_points_per_vote: channelPointsPerVote},
                {200: "Successfully created the poll.", 400: "- The `broadcaster_id` field is required.\n- The `title` field is required.\n- The `choices` field is required.\n- The `duration` field is required.\n- The value in `duration` is outside the allowed range of values.\n- The value in `channel_points_per_vote` is outside the allowed range of values.\n- The value in `bits_per_vote` is outside the allowed range of values.\n- The poll's `title` is too long.\n- The choice's `title` is too long.\n- The choice's `title` failed AutoMod checks.\n- The number of choices in the poll may not be less than 2 or greater that 5.\n- The broadcaster already has a poll that's running; you may not create another poll until the current poll completes.", 401: "- The ID in `broadcaster_id` must match the user ID in the access token.\n- The Authorization header is required and must contain a user access token.\n- The user access token is missing the channel:manage:polls scope.\n- The access token is not valid.\n- The client ID specified in the Client-Id header does not match the client ID specified in the access token."}
            );
        },
        /**
         * @typedef EndPollResponse_Data_Choices
         * @prop {string} id An ID that identifies this choice.
         * @prop {string} title The choice’s title. The title may contain a maximum of 25 characters.
         * @prop {number} votes The total number of votes cast for this choice.
         * @prop {number} channelPointsVotes The number of votes cast using Channel Points.
         * @prop {number} bitsVotes Not used; will be set to 0.
         */
        /**
         * @typedef EndPollResponse_Data
         * @prop {string} id An ID that identifies the poll.
         * @prop {string} broadcasterId An ID that identifies the broadcaster that created the poll.
         * @prop {string} broadcasterName The broadcaster’s display name.
         * @prop {string} broadcasterLogin The broadcaster’s login name.
         * @prop {string} title The question that viewers are voting on. For example, What game should I play next? The title may contain a maximum of 60 characters.
         * @prop {EndPollResponse_Data_Choices[]} choices A list of choices that viewers can choose from. The list will contain a minimum of two choices and up to a maximum of five choices.
         * @prop {boolean} bitsVotingEnabled Not used; will be set to *false*.
         * @prop {number} bitsPerVote Not used; will be set to 0.
         * @prop {boolean} channelPointsVotingEnabled A Boolean value that indicates whether viewers may cast additional votes using Channel Points. For information about Channel Points, see [Channel Points Guide](https://help.twitch.tv/s/article/channel-points-guide).
         * @prop {number} channelPointsPerVote The number of points the viewer must spend to cast one additional vote.
         * @prop {string} status The poll’s status. Valid values are:
         *
         * - ACTIVE — The poll is running.
         *
         * - COMPLETED — The poll ended on schedule (see the `duration` field).
         *
         * - TERMINATED — The poll was terminated before its scheduled end.
         *
         * - ARCHIVED — The poll has been archived and is no longer visible on the channel.
         *
         * - MODERATED — The poll was deleted.
         *
         * - INVALID — Something went wrong while determining the state.
         * @prop {number} duration The length of time (in seconds) that the poll will run for.
         * @prop {string} startedAt The UTC date and time (in RFC3339 format) of when the poll began.
         * @prop {string} endedAt The UTC date and time (in RFC3339 format) of when the poll ended. If `status` is ACTIVE, this field is set to *null*.
         */
        /**
         * @typedef EndPollResponse
         * @prop {EndPollResponse_Data[]} data A list that contains the poll that you ended.
         */
        /**
         * End an active poll.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#end-poll)
         *
         * ---
         * Ends an active poll. You have the option to end it or end it and archive it.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `channel:manage:polls`
         *
         * ---
         * *Examples*: 
         * 
         * Ends the specific poll, but allows the results to be visible for viewers.: 
         * ```
         * curl -X PATCH 'https://api.twitch.tv/helix/polls' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2' \
         * -H 'Content-Type: application/json' \
         * -d '{
         *   "broadcaster_id":"141981764",
         *   "id":"ed961efd-8a3f-4cf5-a9d0-e616c590cd2a",
         *   "status":"TERMINATED"
         * }'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "id": "ed961efd-8a3f-4cf5-a9d0-e616c590cd2a",
         *       "broadcaster_id": "141981764",
         *       "broadcaster_name": "TwitchDev",
         *       "broadcaster_login": "twitchdev",
         *       "title": "Heads or Tails?",
         *       "choices": [
         *         {
         *           "id": "4c123012-1351-4f33-84b7-43856e7a0f47",
         *           "title": "Heads",
         *           "votes": 0,
         *           "channel_points_votes": 0,
         *           "bits_votes": 0
         *         },
         *         {
         *           "id": "279087e3-54a7-467e-bcd0-c1393fcea4f0",
         *           "title": "Tails",
         *           "votes": 0,
         *           "channel_points_votes": 0,
         *           "bits_votes": 0
         *         }
         *       ],
         *       "bits_voting_enabled": false,
         *       "bits_per_vote": 0,
         *       "channel_points_voting_enabled": true,
         *       "channel_points_per_vote": 100,
         *       "status": "TERMINATED",
         *       "duration": 1800,
         *       "started_at": "2021-03-19T06:08:33.871278372Z",
         *       "ended_at": "2021-03-19T06:11:26.746889614Z"
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster that’s running the poll. This ID must match the user ID in the user access token.
         * @param {string} id The ID of the poll to update.
         * @param {"TERMINATED"|"ARCHIVED"} status The status to set the poll to. Possible case-sensitive values are:
         *
         * - TERMINATED — Ends the poll before the poll is scheduled to end. The poll remains publicly visible.
         *
         * - ARCHIVED — Ends the poll before the poll is scheduled to end, and then archives it so it's no longer publicly visible.
         * @returns {Promise<EndPollResponse>} 
         */
        endPoll(broadcasterId, id, status) {
            return reqFunc("https://api.twitch.tv/helix/polls",
                ["channel:manage:polls"],
                ["user"],
                {},
                {broadcaster_id: broadcasterId, id: id, status: status},
                {200: "Successfully ended the poll.", 400: "- The `broadcaster_id` field is required.\n- The `id` field is required.\n- The `status` field is required.\n- The value in the `status` field is not valid.\n- The poll must be active to terminate or archive it.", 401: "- The ID in `broadcaster_id` must match the user ID in the user access token.\n- The Authorization header is required and must contain a user access token.\n- The user access token must include the channel:manage:polls scope.\n- The access token is not valid.\n- The client ID specified in the Client-Id header must match the client ID specified in the access token."}
            );
        },
    },
    Predictions: {
        /**
         * @typedef GetPredictionsResponse_Data_Outcomes_Top_predictors
         * @prop {string} userId An ID that identifies the viewer.
         * @prop {string} userName The viewer’s display name.
         * @prop {string} userLogin The viewer’s login name.
         * @prop {number} channelPointsUsed The number of Channel Points the viewer spent.
         * @prop {number} channelPointsWon The number of Channel Points distributed to the viewer.
         */
        /**
         * @typedef GetPredictionsResponse_Data_Outcomes
         * @prop {string} id An ID that identifies this outcome.
         * @prop {string} title The outcome’s text.
         * @prop {number} users The number of unique viewers that chose this outcome.
         * @prop {number} channelPoints The number of Channel Points spent by viewers on this outcome.
         * @prop {GetPredictionsResponse_Data_Outcomes_Top_predictors[]} topPredictors A list of viewers who were the top predictors; otherwise, *null* if none.
         * @prop {"BLUE"|"PINK"} color The color that visually identifies this outcome in the UX. Possible values are:
         *
         * - BLUE
         *
         * - PINK
         *
         * If the number of outcomes is two, the color is BLUE for the first outcome and PINK for the second outcome. If there are more than two outcomes, the color is BLUE for all outcomes.
         */
        /**
         * @typedef GetPredictionsResponse_Data
         * @prop {string} id An ID that identifies this prediction.
         * @prop {string} broadcasterId An ID that identifies the broadcaster that created the prediction.
         * @prop {string} broadcasterName The broadcaster’s display name.
         * @prop {string} broadcasterLogin The broadcaster’s login name.
         * @prop {string} title The question that the prediction asks. For example, Will I finish this entire pizza?
         * @prop {string} winningOutcomeId The ID of the winning outcome. Is *null* unless `status` is RESOLVED.
         * @prop {GetPredictionsResponse_Data_Outcomes[]} outcomes The list of possible outcomes for the prediction.
         * @prop {number} predictionWindow The length of time (in seconds) that the prediction will run for.
         * @prop {string} status The prediction’s status. Valid values are:
         *
         * - ACTIVE — The Prediction is running and viewers can make predictions.
         *
         * - CANCELED — The broadcaster canceled the Prediction and refunded the Channel Points to the participants.
         *
         * - LOCKED — The broadcaster locked the Prediction, which means viewers can no longer make predictions.
         *
         * - RESOLVED — The winning outcome was determined and the Channel Points were distributed to the viewers who predicted the correct outcome.
         * @prop {string} createdAt The UTC date and time of when the Prediction began.
         * @prop {string} endedAt The UTC date and time of when the Prediction ended. If `status` is ACTIVE, this is set to *null*.
         * @prop {string} lockedAt The UTC date and time of when the Prediction was locked. If `status` is not LOCKED, this is set to *null*.
         */
        /**
         * @typedef GetPredictionsResponse_Pagination
         * @prop {string} cursor The cursor used to get the next page of results. Use the cursor to set the request’s after query parameter.
         */
        /**
         * @typedef GetPredictionsResponse
         * @prop {GetPredictionsResponse_Data[]} data The broadcaster’s list of Channel Points Predictions. The list is sorted in descending ordered by when the prediction began (the most recent prediction is first). The list is empty if the broadcaster hasn’t created predictions.
         * @prop {GetPredictionsResponse_Pagination} pagination Contains the information used to page through the list of results. The object is empty if there are no more pages left to page through. [Read More](https://dev.twitch.tv/docs/api/guide#pagination)
         */
        /**
         * Gets a list of Channel Points Predictions that the broadcaster created.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-predictions)
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `channel:read:predictions`, `channel:manage:predictions`
         *
         * ---
         * *Examples*: 
         * 
         * Gets the specified broadcaster’s list of predictions.: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/predictions?broadcaster_id=55696719&id=d6676d5c-c86e-44d2-bfc4-100fb48f0656' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "id": "d6676d5c-c86e-44d2-bfc4-100fb48f0656",
         *       "broadcaster_id": "55696719",
         *       "broadcaster_name": "TwitchDev",
         *       "broadcaster_login": "twitchdev",
         *       "title": "Will there be any leaks today?",
         *       "winning_outcome_id": null,
         *       "outcomes": [
         *         {
         *           "id": "021e9234-5893-49b4-982e-cfe9a0aaddd9",
         *           "title": "Yes",
         *           "users": 0,
         *           "channel_points": 0,
         *           "top_predictors": null,
         *           "color": "BLUE"
         *         },
         *         {
         *           "id": "ded84c26-13cb-4b48-8cb5-5bae3ec3a66e",
         *           "title": "No",
         *           "users": 0,
         *           "channel_points": 0,
         *           "top_predictors": null,
         *           "color": "PINK"
         *         }
         *       ],
         *       "prediction_window": 600,
         *       "status": "ACTIVE",
         *       "created_at": "2021-04-28T16:03:06.320848689Z",
         *       "ended_at": null,
         *       "locked_at": null
         *     }
         *   ],
         *   "pagination": {}
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster whose predictions you want to get. This ID must match the user ID in the user access token.
         * @param {string?} id The ID of the prediction to get. To specify more than one ID, include this parameter for each prediction you want to get. For example, `id=1234&id=5678`. You may specify a maximum of 25 IDs. The endpoint ignores duplicate IDs and those not owned by the broadcaster.
         * @param {string?} first The maximum number of items to return per page in the response. The minimum page size is 1 item per page and the maximum is 25 items per page. The default is 20.
         * @param {string?} after The cursor used to get the next page of results. The *Pagination* object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination)
         * @returns {Promise<GetPredictionsResponse>} 
         */
        getPredictions(broadcasterId, id=null, first=null, after=null) {
            return reqFunc("https://api.twitch.tv/helix/predictions",
                ["channel:read:predictions", "channel:manage:predictions"],
                ["user"],
                {broadcaster_id: broadcasterId, id: id, first: first, after: after},
                {},
                {200: "Successfully retrieved the list of predictions.", 400: "- The broadcaster_id query parameter is required.", 401: "- The ID in broadcaster_id must match the user ID in the access token.\n- The Authorization header is required and must contain a user access token.\n- The user access token must include the channel:read:predictions scope.\n- The access token is not valid.\n- The client ID specified in the Client-Id header does not match the client ID specified in the access token."}
            );
        },
        /**
         * @typedef CreatePredictionResponse_Data_Outcomes_Top_predictors
         * @prop {string} userId An ID that identifies the viewer.
         * @prop {string} userName The viewer’s display name.
         * @prop {string} userLogin The viewer’s login name.
         * @prop {number} channelPointsUsed The number of Channel Points the viewer spent.
         * @prop {number} channelPointsWon The number of Channel Points distributed to the viewer.
         */
        /**
         * @typedef CreatePredictionResponse_Data_Outcomes
         * @prop {string} id An ID that identifies this outcome.
         * @prop {string} title The outcome’s text.
         * @prop {number} users The number of unique viewers that chose this outcome.
         * @prop {number} channelPoints The number of Channel Points spent by viewers on this outcome.
         * @prop {CreatePredictionResponse_Data_Outcomes_Top_predictors[]} topPredictors A list of viewers who were the top predictors; otherwise, *null* if none.
         * @prop {"BLUE"|"PINK"} color The color that visually identifies this outcome in the UX. Possible values are:
         *
         * - BLUE
         *
         * - PINK
         *
         * If the number of outcomes is two, the color is BLUE for the first outcome and PINK for the second outcome. If there are more than two outcomes, the color is BLUE for all outcomes.
         */
        /**
         * @typedef CreatePredictionResponse_Data
         * @prop {string} id An ID that identifies this prediction.
         * @prop {string} broadcasterId An ID that identifies the broadcaster that created the prediction.
         * @prop {string} broadcasterName The broadcaster’s display name.
         * @prop {string} broadcasterLogin The broadcaster’s login name.
         * @prop {string} title The question that the prediction asks. For example, Will I finish this entire pizza?
         * @prop {string} winningOutcomeId The ID of the winning outcome. Is *null* unless `status` is RESOLVED.
         * @prop {CreatePredictionResponse_Data_Outcomes[]} outcomes The list of possible outcomes for the prediction.
         * @prop {number} predictionWindow The length of time (in seconds) that the prediction will run for.
         * @prop {string} status The prediction’s status. Valid values are:
         *
         * - ACTIVE — The Prediction is running and viewers can make predictions.
         *
         * - CANCELED — The broadcaster canceled the Prediction and refunded the Channel Points to the participants.
         *
         * - LOCKED — The broadcaster locked the Prediction, which means viewers can no longer make predictions.
         *
         * - RESOLVED — The winning outcome was determined and the Channel Points were distributed to the viewers who predicted the correct outcome.
         * @prop {string} createdAt The UTC date and time of when the Prediction began.
         * @prop {string} endedAt The UTC date and time of when the Prediction ended. If `status` is ACTIVE, this is set to *null*.
         * @prop {string} lockedAt The UTC date and time of when the Prediction was locked. If `status` is not LOCKED, this is set to *null*.
         */
        /**
         * @typedef CreatePredictionResponse
         * @prop {CreatePredictionResponse_Data[]} data A list that contains the single prediction that you created.
         */
        /**
         * @typedef CreatePredictionRequest_Outcomes
         * @prop {string} title The text of one of the outcomes that the viewer may select. The title is limited to a maximum of 25 characters.
         */
        /**
         * Create a Channel Points Prediction.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#create-prediction)
         *
         * ---
         * Creates a Channel Points Prediction.
         *
         * With a Channel Points Prediction, the broadcaster poses a question and viewers try to predict the outcome. The prediction runs as soon as it’s created. The broadcaster may run only one prediction at a time.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `channel:manage:predictions`
         *
         * ---
         * *Examples*: 
         * 
         * Creates a Channel Points Prediction for the specified broadcaster.: 
         * ```
         * curl -X POST 'https://api.twitch.tv/helix/predictions' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2' \
         * -H 'Content-Type: application/json' \
         * -d '{
         *   "broadcaster_id": "141981764",
         *   "title": "Any leeks in the stream?",
         *   "outcomes": [
         *     {
         *       "title": "Yes, give it time."
         *     },
         *     {
         *       "title": "Definitely not."
         *     }
         *   ],
         *   "prediction_window": 120
         * }'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "id": "bc637af0-7766-4525-9308-4112f4cbf178",
         *       "broadcaster_id": "141981764",
         *       "broadcaster_name": "TwitchDev",
         *       "broadcaster_login": "twitchdev",
         *       "title": "Any leeks in the stream?",
         *       "winning_outcome_id": null,
         *       "outcomes": [
         *         {
         *           "id": "73085848-a94d-4040-9d21-2cb7a89374b7",
         *           "title": "Yes, give it time.",
         *           "users": 0,
         *           "channel_points": 0,
         *           "top_predictors": null,
         *           "color": "BLUE"
         *         },
         *         {
         *           "id": "906b70ba-1f12-47ea-9e95-e5f93d20e9cc",
         *           "title": "Definitely not.",
         *           "users": 0,
         *           "channel_points": 0,
         *           "top_predictors": null,
         *           "color": "PINK"
         *         }
         *       ],
         *       "prediction_window": 120,
         *       "status": "ACTIVE",
         *       "created_at": "2021-04-28T17:11:22.595914172Z",
         *       "ended_at": null,
         *       "locked_at": null
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster that’s running the prediction. This ID must match the user ID in the user access token.
         * @param {string} title The question that the broadcaster is asking. For example, Will I finish this entire pizza? The title is limited to a maximum of 45 characters.
         * @param {CreatePredictionRequest_Outcomes[]} outcomes The list of possible outcomes that the viewers may choose from. The list must contain a minimum of 2 choices and up to a maximum of 10 choices.
         * @param {number} predictionWindow The length of time (in seconds) that the prediction will run for. The minimum is 30 seconds and the maximum is 1800 seconds (30 minutes).
         * @returns {Promise<CreatePredictionResponse>} 
         */
        createPrediction(broadcasterId, title, outcomes, predictionWindow) {
            return reqFunc("https://api.twitch.tv/helix/predictions",
                ["channel:manage:predictions"],
                ["user"],
                {},
                {broadcaster_id: broadcasterId, title: title, outcomes: outcomes, prediction_window: predictionWindow},
                {200: "Successfully created the Channel Points Prediction.", 400: "- The `broadcaster_id` field is required.\n- The `title` field is required.\n- The `outcomes` field is required.\n- The `prediction_window` field is required.\n- The value in `prediction_window` is outside the allowed range of values.\n- The prediction's `title` is too long.\n- The outcome's `title` is too long.\n- The outcome's `title` failed AutoMod checks.\n- There must be 2 outcomes in the prediction.\n- The broadcaster already has a prediction that's running; you may not create another prediction until the current prediction is resolved or canceled.", 401: "- The ID in `broadcaster_id` must match the user ID in the access token.\n- The Authorization header is required and must contain a user access token.\n- The user access token must include the channel:manage:predictions scope.\n- The access token is not valid.\n- The client ID specified in the Client-Id header does not match the client ID specified in the access token.", 429: ""}
            );
        },
        /**
         * @typedef EndPredictionResponse_Data_Outcomes_Top_predictors
         * @prop {string} userId An ID that identifies the viewer.
         * @prop {string} userName The viewer’s display name.
         * @prop {string} userLogin The viewer’s login name.
         * @prop {number} channelPointsUsed The number of Channel Points the viewer spent.
         * @prop {number} channelPointsWon The number of Channel Points distributed to the viewer.
         */
        /**
         * @typedef EndPredictionResponse_Data_Outcomes
         * @prop {string} id An ID that identifies this outcome.
         * @prop {string} title The outcome’s text.
         * @prop {number} users The number of unique viewers that chose this outcome.
         * @prop {number} channelPoints The number of Channel Points spent by viewers on this outcome.
         * @prop {EndPredictionResponse_Data_Outcomes_Top_predictors[]} topPredictors A list of viewers who were the top predictors; otherwise, *null* if none.
         * @prop {"BLUE"|"PINK"} color The color that visually identifies this outcome in the UX. Possible values are:
         *
         * - BLUE
         *
         * - PINK
         *
         * If the number of outcomes is two, the color is BLUE for the first outcome and PINK for the second outcome. If there are more than two outcomes, the color is BLUE for all outcomes.
         */
        /**
         * @typedef EndPredictionResponse_Data
         * @prop {string} id An ID that identifies this prediction.
         * @prop {string} broadcasterId An ID that identifies the broadcaster that created the prediction.
         * @prop {string} broadcasterName The broadcaster’s display name.
         * @prop {string} broadcasterLogin The broadcaster’s login name.
         * @prop {string} title The question that the prediction asks. For example, Will I finish this entire pizza?
         * @prop {string} winningOutcomeId The ID of the winning outcome. Is *null* unless `status` is RESOLVED.
         * @prop {EndPredictionResponse_Data_Outcomes[]} outcomes The list of possible outcomes for the prediction.
         * @prop {number} predictionWindow The length of time (in seconds) that the prediction will run for.
         * @prop {string} status The prediction’s status. Valid values are:
         *
         * - ACTIVE — The Prediction is running and viewers can make predictions.
         *
         * - CANCELED — The broadcaster canceled the Prediction and refunded the Channel Points to the participants.
         *
         * - LOCKED — The broadcaster locked the Prediction, which means viewers can no longer make predictions.
         *
         * - RESOLVED — The winning outcome was determined and the Channel Points were distributed to the viewers who predicted the correct outcome.
         * @prop {string} createdAt The UTC date and time of when the Prediction began.
         * @prop {string} endedAt The UTC date and time of when the Prediction ended. If `status` is ACTIVE, this is set to *null*.
         * @prop {string} lockedAt The UTC date and time of when the Prediction was locked. If `status` is not LOCKED, this is set to *null*.
         */
        /**
         * @typedef EndPredictionResponse
         * @prop {EndPredictionResponse_Data[]} data A list that contains the single prediction that you updated.
         */
        /**
         * Locks, resolves, or cancels a Channel Points Prediction.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#end-prediction)
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `channel:manage:predictions`
         *
         * ---
         * *Examples*: 
         * 
         * Resolves the specified Channel Points Prediction.: 
         * ```
         * curl -X PATCH 'https://api.twitch.tv/helix/predictions' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2' \
         * -H 'Content-Type: application/json' \
         * -d  '{
         *   "broadcaster_id": "141981764",
         *   "id": "bc637af0-7766-4525-9308-4112f4cbf178",
         *   "status": "RESOLVED",
         *   "winning_outcome_id": "73085848-a94d-4040-9d21-2cb7a89374b7"
         * }'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "id": "bc637af0-7766-4525-9308-4112f4cbf178",
         *       "broadcaster_id": "141981764",
         *       "broadcaster_name": "TwitchDev",
         *       "broadcaster_login": "twitchdev",
         *       "title": "Will we win all the games?",
         *       "winning_outcome_id": "73085848-a94d-4040-9d21-2cb7a89374b7",
         *       "outcomes": [
         *         {
         *           "id": "73085848-a94d-4040-9d21-2cb7a89374b7",
         *           "title": "yes",
         *           "users": 0,
         *           "channel_points": 0,
         *           "top_predictors": null,
         *           "color": "BLUE"
         *         },
         *         {
         *           "id": "86010b2e-9764-4136-9359-fd1c9c5a8033",
         *           "title": "no",
         *           "users": 0,
         *           "channel_points": 0,
         *           "top_predictors": null,
         *           "color": "PINK"
         *         }
         *       ],
         *       "prediction_window": 120,
         *       "status": "RESOLVED",
         *       "created_at": "2021-04-28T21:48:19.480371331Z",
         *       "ended_at": "2021-04-28T21:54:24.026833954Z",
         *       "locked_at": "2021-04-28T21:48:34.636685705Z"
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster that’s running the prediction. This ID must match the user ID in the user access token.
         * @param {string} id The ID of the prediction to update.
         * @param {"RESOLVED"|"CANCELED"|"LOCKED"} status The status to set the prediction to. Possible case-sensitive values are:
         *
         * - RESOLVED — The winning outcome is determined and the Channel Points are distributed to the viewers who predicted the correct outcome.
         *
         * - CANCELED — The broadcaster is canceling the prediction and sending refunds to the participants.
         *
         * - LOCKED — The broadcaster is locking the prediction, which means viewers may no longer make predictions.
         *
         * The broadcaster can update an active prediction to LOCKED, RESOLVED, or CANCELED; and update a locked prediction to RESOLVED or CANCELED.The broadcaster has up to 24 hours after the prediction window closes to resolve the prediction. If not, Twitch sets the status to CANCELED and returns the points.
         * @param {string?} winningOutcomeId The ID of the winning outcome. You must set this parameter if you set `status` to RESOLVED.
         * @returns {Promise<EndPredictionResponse>} 
         */
        endPrediction(broadcasterId, id, status, winningOutcomeId=null) {
            return reqFunc("https://api.twitch.tv/helix/predictions",
                ["channel:manage:predictions"],
                ["user"],
                {},
                {broadcaster_id: broadcasterId, id: id, status: status, winning_outcome_id: winningOutcomeId},
                {200: "Successfully ended the prediction.", 400: "- The `broadcaster_id` field is required.\n- The `id` field is required.\n- The `status` field is required.\n- The `winning_outcome_id` field is required if `status` is RESOLVED.\n- The value in the `status` field is not valid.\n- To update the prediction's status to RESOLVED or CANCELED, its current status must be ACTIVE or LOCKED.\n- To update the prediction's status to LOCKED, its current status must be ACTIVE.", 401: "- The ID in `broadcaster_id` must match the user ID in the OAuth token.\n- The Authorization header is required and must contain a user access token.\n- The user access token must include the channel:manage:predictions scope.\n- The access token is not valid.\n- The client ID specified in the Client-Id header does not match the client ID specified in the access token.", 404: "- The prediction in the `id` field was not found.\n- The outcome in the `winning_outcome_id` field was not found."}
            );
        },
    },
    Raids: {
        /**
         * @typedef StartARaidResponse_Data
         * @prop {string} createdAt The UTC date and time, in RFC3339 format, of when the raid was requested.
         * @prop {boolean} isMature *IMPORTANT* This field is deprecated and returns only `false`.A Boolean value that indicates whether the channel being raided contains mature content.
         */
        /**
         * @typedef StartARaidResponse
         * @prop {StartARaidResponse_Data[]} data A list that contains a single object with information about the pending raid.
         */
        /**
         * Raid another channel by sending the broadcaster’s viewers to the targeted channel.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#start-a-raid)
         *
         * ---
         * 
         *
         * When you call the API from a chat bot or extension, the Twitch UX pops up a window at the top of the chat room that identifies the number of viewers in the raid. The raid occurs when the broadcaster clicks *Raid Now* or after the 90-second countdown expires.
         *
         * To determine whether the raid successfully occurred, you must subscribe to the [Channel Raid](https://dev.twitch.tv/docs/eventsub/eventsub-subscription-types#channelraid) event. For more information, see [Get notified when a raid begins](https://dev.twitch.tv/docs/api/raids#get-notified-when-a-raid-begins).
         *
         * To cancel a pending raid, use the [Cancel a raid](#cancel-a-raid) endpoint.
         *
         * *Rate Limit*: The limit is 10 requests within a 10-minute window.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `channel:manage:raids`
         *
         * ---
         * *Examples*: 
         * 
         * Example 1: 
         * ```
         * curl -X POST 'https://api.twitch.tv/helix/raids?from_broadcaster_id=12345678&to_broadcaster_id=87654321' \
         * -H 'Authorization: Bearer kpvy3cjboyptmdkiacwr0c19hotn5s' \
         * -H 'Client-Id: hof5gwx0su6owfnys0nyan9c87zr6t'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "created_at": "2022-02-18T07:20:50.52Z",
         *       "is_mature": false
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @param {string} fromBroadcasterId The ID of the broadcaster that’s sending the raiding party. This ID must match the user ID in the user access token.
         * @param {string} toBroadcasterId The ID of the broadcaster to raid.
         * @returns {Promise<StartARaidResponse>} 
         */
        startARaid(fromBroadcasterId, toBroadcasterId) {
            return reqFunc("https://api.twitch.tv/helix/raids",
                ["channel:manage:raids"],
                ["user"],
                {from_broadcaster_id: fromBroadcasterId, to_broadcaster_id: toBroadcasterId},
                {},
                {200: "Successfully requested to start a raid. To determine whether the raid successfully occurred (that is, the broadcaster clicked *Raid Now* or the countdown expired), you must subscribe to the [Channel Raid](https://dev.twitch.tv/docs/eventsub/eventsub-subscription-types#channelraid) event.", 400: "- The raiding broadcaster is blocked from the targeted channel.\n- The targeted channel doesn't accept raids from this broadcaster.\n- There are too many viewers in the raiding party.\n- The IDs in from_broadcaster_id and to_broadcaster_id cannot be the same ID.\n- The ID in the from_broadcaster_id query parameter is not valid.\n- The ID in the to_broadcaster_id query parameter is not valid.", 401: "- The ID in from_broadcaster_id must match the user ID found in the request’s OAuth token.\n- The Authorization header is required and must contain a user access token.\n- The user access token must include the channel:manage:raids scope.\n- The access token is not valid.\n- The client ID specified in the Client-Id header does not match the client ID specified in the access token.", 404: "- The targeted channel was not found.", 409: "- The broadcaster is already in the process of raiding another channel.", 429: "- The broadcaster exceeded the number of raid requests that they may make. The limit is 10 requests within a 10-minute window."}
            );
        },
        /**
         * Cancel a pending raid.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#cancel-a-raid)
         *
         * ---
         * 
         *
         * You can cancel a raid at any point up until the broadcaster clicks *Raid Now* in the Twitch UX or the 90-second countdown expires.
         *
         * *Rate Limit*: The limit is 10 requests within a 10-minute window.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `channel:manage:raids`
         *
         * ---
         * *Examples*: 
         * 
         * Example 1: 
         * ```
         * curl -X DELETE 'https://api.twitch.tv/helix/raids?broadcaster_id=12345678' \
         * -H 'Authorization: Bearer kpvy3cjboyptmdkiacwr0c19hotn5s' \
         * -H 'Client-Id: hof5gwx0su6owfnys0nyan9c87zr6t'
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster that initiated the raid. This ID must match the user ID in the user access token.
         * @returns {Promise<void>} 
         */
        cancelARaid(broadcasterId) {
            return reqFunc("https://api.twitch.tv/helix/raids",
                ["channel:manage:raids"],
                ["user"],
                {broadcaster_id: broadcasterId},
                {},
                {204: "The pending raid was successfully canceled.", 400: "- The ID in the broadcaster_id query parameter is not valid.", 401: "- The ID in broadcaster_id must match the user ID found in the request’s OAuth token.\n- The Authorization header is required and must contain a user access token.\n- The user access token must include the channel:manage:raids scope.\n- The access token is not valid.\n- The client ID specified in the Client-Id header does not match the client ID specified in the access token.", 404: "- The broadcaster doesn't have a pending raid to cancel.", 429: "- The broadcaster exceeded the number of raid requests that they may make. The limit is 10 requests within a 10-minute window."}
            );
        },
    },
    Schedule: {
        /**
         * @typedef GetChannelStreamScheduleResponse_Data_Segments_Category
         * @prop {string} id An ID that identifies the category that best represents the content that the broadcaster plans to stream. For example, the game’s ID if the broadcaster will play a game or the Just Chatting ID if the broadcaster will host a talk show.
         * @prop {string} name The name of the category. For example, the game’s title if the broadcaster will playing a game or Just Chatting if the broadcaster will host a talk show.
         */
        /**
         * @typedef GetChannelStreamScheduleResponse_Data_Segments
         * @prop {string} id An ID that identifies this broadcast segment.
         * @prop {string} startTime The UTC date and time (in RFC3339 format) of when the broadcast starts.
         * @prop {string} endTime The UTC date and time (in RFC3339 format) of when the broadcast ends.
         * @prop {string} title The broadcast segment’s title.
         * @prop {string} canceledUntil Indicates whether the broadcaster canceled this segment of a recurring broadcast. If the broadcaster canceled this segment, this field is set to the same value that’s in the `end_time` field; otherwise, it’s set to *null*.
         * @prop {GetChannelStreamScheduleResponse_Data_Segments_Category} category The type of content that the broadcaster plans to stream or *null* if not specified.
         * @prop {boolean} isRecurring A Boolean value that determines whether the broadcast is part of a recurring series that streams at the same time each week or is a one-time broadcast. Is *true* if the broadcast is part of a recurring series.
         */
        /**
         * @typedef GetChannelStreamScheduleResponse_Data_Vacation
         * @prop {string} startTime The UTC date and time (in RFC3339 format) of when the broadcaster’s vacation starts.
         * @prop {string} endTime The UTC date and time (in RFC3339 format) of when the broadcaster’s vacation ends.
         */
        /**
         * @typedef GetChannelStreamScheduleResponse_Data_Pagination
         * @prop {string} cursor The cursor used to get the next page of results. Set the request’s after query parameter to this value.
         */
        /**
         * @typedef GetChannelStreamScheduleResponse_Data
         * @prop {GetChannelStreamScheduleResponse_Data_Segments[]} segments The list of broadcasts in the broadcaster’s streaming schedule.
         * @prop {string} broadcasterId The ID of the broadcaster that owns the broadcast schedule.
         * @prop {string} broadcasterName The broadcaster’s display name.
         * @prop {string} broadcasterLogin The broadcaster’s login name.
         * @prop {GetChannelStreamScheduleResponse_Data_Vacation} vacation The dates when the broadcaster is on vacation and not streaming. Is set to *null* if vacation mode is not enabled.
         * @prop {GetChannelStreamScheduleResponse_Data_Pagination} pagination The information used to page through a list of results. The object is empty if there are no more pages left to page through. [Read more](https://dev.twitch.tv/docs/api/guide#pagination).
         */
        /**
         * @typedef GetChannelStreamScheduleResponse
         * @prop {GetChannelStreamScheduleResponse_Data} data The broadcaster’s streaming schedule.
         */
        /**
         * Gets the broadcaster’s streaming schedule.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-channel-stream-schedule)
         *
         * ---
         *  You can get the entire schedule or specific segments of the schedule. [Learn More](https://help.twitch.tv/s/article/channel-page-setup#Schedule)
         *
         * ---
         * *Authentication*: 
         * 
         * Requires an [app access token](https://dev.twitch.tv/docs/authentication#app-access-tokens) or a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens))
         *
         * ---
         * *Examples*: 
         * 
         * Gets the specified broadcaster’s streaming schedule.: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/schedule?broadcaster_id=141981764' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": {
         *     "segments": [
         *       {
         *         "id": "eyJzZWdtZW50SUQiOiJlNGFjYzcyNC0zNzFmLTQwMmMtODFjYS0yM2FkYTc5NzU5ZDQiLCJpc29ZZWFyIjoyMDIxLCJpc29XZWVrIjoyNn0=",
         *         "start_time": "2021-07-01T18:00:00Z",
         *         "end_time": "2021-07-01T19:00:00Z",
         *         "title": "TwitchDev Monthly Update // July 1, 2021",
         *         "canceled_until": null,
         *         "category": {
         *             "id": "509670",
         *             "name": "Science & Technology"
         *         },
         *         "is_recurring": false
         *       },
         *       ...
         *     ],
         *     "broadcaster_id": "141981764",
         *     "broadcaster_name": "TwitchDev",
         *     "broadcaster_login": "twitchdev",
         *     "vacation": null
         *   },
         *   "pagination": {}
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster that owns the streaming schedule you want to get.
         * @param {string?} id The ID of the scheduled segment to return. To specify more than one segment, include the ID of each segment you want to get. For example, `id=1234&id=5678`. You may specify a maximum of 100 IDs.
         * @param {string?} startTime The UTC date and time that identifies when in the broadcaster’s schedule to start returning segments. If not specified, the request returns segments starting after the current UTC date and time. Specify the date and time in RFC3339 format (for example, `2022-09-01T00:00:00Z`).
         * @param {string?} utcOffset Not supported.
         * @param {number?} first The maximum number of items to return per page in the response. The minimum page size is 1 item per page and the maximum is 25 items per page. The default is 20.
         * @param {string?} after The cursor used to get the next page of results. The *Pagination* object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination)
         * @returns {Promise<GetChannelStreamScheduleResponse>} 
         */
        getChannelStreamSchedule(broadcasterId, id=null, startTime=null, utcOffset=null, first=null, after=null) {
            return reqFunc("https://api.twitch.tv/helix/schedule",
                [],
                ["app", "user"],
                {broadcaster_id: broadcasterId, id: id, start_time: startTime, utc_offset: utcOffset, first: first, after: after},
                {},
                {200: "Successfully retrieved the broadcaster’s streaming schedule.", 400: "- The broadcaster_id query parameter is required.\n- The ID in the broadcaster_id query parameter is not valid.\n- The ID in the id query parameter is not valid.\n- The format of the date and time in the start_time query parameter is not valid.", 401: "- The Authorization header is required and must specify a valid app access token or user access token.\n- The access token is not valid.\n- The ID in the Client-Id header must match the Client ID in the access token.", 403: "- Only partners and affiliates may add non-recurring broadcast segments.", 404: "- The broadcaster has not created a streaming schedule."}
            );
        },
        /**
         * Gets the broadcaster’s streaming schedule as an [iCalendar](https://datatracker.ietf.org/doc/html/rfc5545).
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-channel-icalendar)
         *
         * ---
         * *Authentication*: 
         * 
         * Requires 
         *
         * ---
         * *Examples*: 
         * 
         * Gets the specified broadcaster’s streaming schedule as an iCalendar.: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/schedule/icalendar?broadcaster_id=141981764'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * BEGIN:VCALENDAR
         * PRODID:-//twitch.tv//StreamSchedule//1.0
         * VERSION:2.0
         * CALSCALE:GREGORIAN
         * REFRESH-INTERVAL;VALUE=DURATION:PT1H
         * NAME:TwitchDev
         * BEGIN:VEVENT
         * UID:e4acc724-371f-402c-81ca-23ada79759d4
         * DTSTAMP:20210323T040131Z
         * DTSTART;TZID=/America/New_York:20210701T140000
         * DTEND;TZID=/America/New_York:20210701T150000
         * SUMMARY:TwitchDev Monthly Update // July 1, 2021
         * DESCRIPTION:Science & Technology.
         * CATEGORIES:Science & Technology
         * END:VEVENT
         * END:VCALENDAR%
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster that owns the streaming schedule you want to get.
         * @returns {Promise<void>} The response body contains the iCalendar data (see [RFC5545](https://datatracker.ietf.org/doc/html/rfc5545)).
The Content-Type response header is set to `text/calendar`.
         */
        getChannelICalendar(broadcasterId) {
            return reqFunc("https://api.twitch.tv/helix/schedule/icalendar",
                [],
                [],
                {broadcaster_id: broadcasterId},
                {},
                {}
            );
        },
        /**
         * Updates the broadcaster’s schedule settings, such as scheduling a vacation.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#update-channel-stream-schedule)
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `channel:manage:schedule`
         *
         * ---
         * *Examples*: 
         * 
         * Schedules the broadcaster’s vacation.: 
         * ```
         * curl -X PATCH 'https://api.twitch.tv/helix/schedule/settings?broadcaster_id=141981764&is_vacation_enabled=true&vacation_start_time=2021-05-16T00:00:00Z&vacation_end_time=2021-05-23T00:00:00Z&timezone=America/New_York' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster whose schedule settings you want to update. The ID must match the user ID in the user access token.
         * @param {boolean?} isVacationEnabled A Boolean value that indicates whether the broadcaster has scheduled a vacation. Set to *true* to enable Vacation Mode and add vacation dates, or *false* to cancel a previously scheduled vacation.
         * @param {string?} vacationStartTime The UTC date and time of when the broadcaster’s vacation starts. Specify the date and time in RFC3339 format (for example, 2021-05-16T00:00:00Z). Required if is_vacation_enabled is *true*.
         * @param {string?} vacationEndTime The UTC date and time of when the broadcaster’s vacation ends. Specify the date and time in RFC3339 format (for example, 2021-05-30T23:59:59Z). Required if is_vacation_enabled is *true*.
         * @param {string?} timezone The time zone that the broadcaster broadcasts from. Specify the time zone using [IANA time zone database](https://www.iana.org/time-zones) format (for example, America/New_York). Required if is_vacation_enabled is *true*.
         * @returns {Promise<void>} 
         */
        updateChannelStreamSchedule(broadcasterId, isVacationEnabled=null, vacationStartTime=null, vacationEndTime=null, timezone=null) {
            return reqFunc("https://api.twitch.tv/helix/schedule/settings",
                ["channel:manage:schedule"],
                ["user"],
                {broadcaster_id: broadcasterId, is_vacation_enabled: isVacationEnabled, vacation_start_time: vacationStartTime, vacation_end_time: vacationEndTime, timezone: timezone},
                {},
                {204: "Successfully updated the broadcaster’s schedule settings.", 400: "- The broadcaster_id query parameter is required.\n- The ID in the broadcaster_id query parameter is not valid.\n- The format of the string in vacation_start_time is not valid.\n- The format of the string in vacation_end_time is not valid.\n- The date in vacation_end_time must be later than the date in vacation_start_time.", 401: "- The ID in the broadcaster_id query parameter must match the user ID in the user access token.\n- The Authorization header is required and must contain a user access token.\n- The user access token must include the channel:manage:schedule scope.\n- The access token is not valid.\n- The ID in the Client-Id header must match the client ID in the access token.", 404: "- The broadcaster's schedule was not found."}
            );
        },
        /**
         * @typedef CreateChannelStreamScheduleSegmentResponse_Data_Segments_Category
         * @prop {string} id An ID that identifies the category that best represents the content that the broadcaster plans to stream. For example, the game’s ID if the broadcaster will play a game or the Just Chatting ID if the broadcaster will host a talk show.
         * @prop {string} name The name of the category. For example, the game’s title if the broadcaster will play a game or Just Chatting if the broadcaster will host a talk show.
         */
        /**
         * @typedef CreateChannelStreamScheduleSegmentResponse_Data_Segments
         * @prop {string} id An ID that identifies this broadcast segment.
         * @prop {string} startTime The UTC date and time (in RFC3339 format) of when the broadcast starts.
         * @prop {string} endTime The UTC date and time (in RFC3339 format) of when the broadcast ends.
         * @prop {string} title The broadcast segment’s title.
         * @prop {string} canceledUntil Indicates whether the broadcaster canceled this segment of a recurring broadcast. If the broadcaster canceled this segment, this field is set to the same value that’s in the `end_time` field; otherwise, it’s set to *null*.
         * @prop {CreateChannelStreamScheduleSegmentResponse_Data_Segments_Category} category The type of content that the broadcaster plans to stream or *null* if not specified.
         * @prop {boolean} isRecurring A Boolean value that determines whether the broadcast is part of a recurring series that streams at the same time each week or is a one-time broadcast. Is *true* if the broadcast is part of a recurring series.
         */
        /**
         * @typedef CreateChannelStreamScheduleSegmentResponse_Data_Vacation
         * @prop {string} startTime The UTC date and time (in RFC3339 format) of when the broadcaster’s vacation starts.
         * @prop {string} endTime The UTC date and time (in RFC3339 format) of when the broadcaster’s vacation ends.
         */
        /**
         * @typedef CreateChannelStreamScheduleSegmentResponse_Data
         * @prop {CreateChannelStreamScheduleSegmentResponse_Data_Segments[]} segments A list that contains the single broadcast segment that you added.
         * @prop {string} broadcasterId The ID of the broadcaster that owns the broadcast schedule.
         * @prop {string} broadcasterName The broadcaster’s display name.
         * @prop {string} broadcasterLogin The broadcaster’s login name.
         * @prop {CreateChannelStreamScheduleSegmentResponse_Data_Vacation} vacation The dates when the broadcaster is on vacation and not streaming. Is set to *null* if vacation mode is not enabled.
         */
        /**
         * @typedef CreateChannelStreamScheduleSegmentResponse
         * @prop {CreateChannelStreamScheduleSegmentResponse_Data} data The broadcaster’s streaming scheduled.
         */
        /**
         * Adds a single or recurring broadcast to the broadcaster’s streaming schedule.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#create-channel-stream-schedule-segment)
         *
         * ---
         *  For information about scheduling broadcasts, see [Stream Schedule](https://help.twitch.tv/s/article/channel-page-setup#Schedule).
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `channel:manage:schedule`
         *
         * ---
         * *Examples*: 
         * 
         * Adds a non-recurring broadcast to the broadcaster’s streaming schedule.: 
         * ```
         * curl -X POST 'https://api.twitch.tv/helix/schedule/segment?broadcaster_id=141981764' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2' \
         * -H 'Content-Type: application/json' \
         * -d '{
         *   "start_time": "2021-07-01T18:00:00Z",
         *   "timezone": "America/New_York",
         *   "is_recurring": false,
         *   "duration": "60",
         *   "category_id": "509670",
         *   "title": "TwitchDev Monthly Update // July 1, 2021"
         * }'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": {
         *     "segments": [
         *       {
         *         "id": "eyJzZWdtZW50SUQiOiJlNGFjYzcyNC0zNzFmLTQwMmMtODFjYS0yM2FkYTc5NzU5ZDQiLCJpc29ZZWFyIjoyMDIxLCJpc29XZWVrIjoyNn0=",
         *         "start_time": "2021-07-01T18:00:00Z",
         *         "end_time": "2021-07-01T19:00:00Z",
         *         "title": "TwitchDev Monthly Update // July 1, 2021",
         *         "canceled_until": null,
         *         "category": {
         *             "id": "509670",
         *             "name": "Science & Technology"
         *         },
         *         "is_recurring": false
         *       }
         *     ],
         *     "broadcaster_id": "141981764",
         *     "broadcaster_name": "TwitchDev",
         *     "broadcaster_login": "twitchdev",
         *     "vacation": null
         *   }
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster that owns the schedule to add the broadcast segment to. This ID must match the user ID in the user access token.
         * @param {string} startTime The date and time that the broadcast segment starts. Specify the date and time in RFC3339 format (for example, 2021-07-01T18:00:00Z).
         * @param {string} timezone The time zone where the broadcast takes place. Specify the time zone using [IANA time zone database](https://www.iana.org/time-zones) format (for example, America/New_York).
         * @param {string} duration The length of time, in minutes, that the broadcast is scheduled to run. The duration must be in the range 30 through 1380 (23 hours).
         * @param {boolean?} isRecurring A Boolean value that determines whether the broadcast recurs weekly. Is *true* if the broadcast recurs weekly. Only partners and affiliates may add non-recurring broadcasts.
         * @param {string?} categoryId The ID of the category that best represents the broadcast’s content. To get the category ID, use the [Search Categories](#search-categories) endpoint.
         * @param {string?} title The broadcast’s title. The title may contain a maximum of 140 characters.
         * @returns {Promise<CreateChannelStreamScheduleSegmentResponse>} 
         */
        createChannelStreamScheduleSegment(broadcasterId, startTime, timezone, duration, isRecurring=null, categoryId=null, title=null) {
            return reqFunc("https://api.twitch.tv/helix/schedule/segment",
                ["channel:manage:schedule"],
                ["user"],
                {broadcaster_id: broadcasterId},
                {start_time: startTime, timezone: timezone, duration: duration, is_recurring: isRecurring, category_id: categoryId, title: title},
                {200: "Successfully added the broadcast segment.", 400: "- The broadcaster_id query parameter is required.\n- The ID in the broadcaster_id query parameter is not valid.\n- The format of the date and time in the `start_time` field is not valid.\n- The value in the `timezone` field is not valid.\n- The value in the `duration` field is not valid.\n- The ID in the `category_id` field is not valid.\n- The string in the `title` field is too long.", 401: "- The ID in the broadcaster_id query parameter must match the user ID in the user access token.\n- The Authorization header is required and must contain a user access token.\n- The user access token must include the channel:manage:schedule scope.\n- The access token is not valid.\n- The ID in the Client-Id header must match the client ID in the access token.", 403: "- Only partners and affiliates may add non-recurring broadcast segments."}
            );
        },
        /**
         * @typedef UpdateChannelStreamScheduleSegmentResponse_Data_Segments_Category
         * @prop {string} id An ID that identifies the category that best represents the content that the broadcaster plans to stream. For example, the game’s ID if the broadcaster will play a game or the Just Chatting ID if the broadcaster will host a talk show.
         * @prop {string} name The name of the category. For example, the game’s title if the broadcaster will play a game or Just Chatting if the broadcaster will host a talk show.
         */
        /**
         * @typedef UpdateChannelStreamScheduleSegmentResponse_Data_Segments
         * @prop {string} id An ID that identifies this broadcast segment.
         * @prop {string} startTime The UTC date and time (in RFC3339 format) of when the broadcast starts.
         * @prop {string} endTime The UTC date and time (in RFC3339 format) of when the broadcast ends.
         * @prop {string} title The broadcast segment’s title.
         * @prop {string} canceledUntil Indicates whether the broadcaster canceled this segment of a recurring broadcast. If the broadcaster canceled this segment, this field is set to the same value that’s in the `end_time` field; otherwise, it’s set to *null*.
         * @prop {UpdateChannelStreamScheduleSegmentResponse_Data_Segments_Category} category The type of content that the broadcaster plans to stream or *null* if not specified.
         * @prop {boolean} isRecurring A Boolean value that determines whether the broadcast is part of a recurring series that streams at the same time each week or is a one-time broadcast. Is *true* if the broadcast is part of a recurring series.
         */
        /**
         * @typedef UpdateChannelStreamScheduleSegmentResponse_Data_Vacation
         * @prop {string} startTime The UTC date and time (in RFC3339 format) of when the broadcaster’s vacation starts.
         * @prop {string} endTime The UTC date and time (in RFC3339 format) of when the broadcaster’s vacation ends.
         */
        /**
         * @typedef UpdateChannelStreamScheduleSegmentResponse_Data
         * @prop {UpdateChannelStreamScheduleSegmentResponse_Data_Segments[]} segments A list that contains the single broadcast segment that you updated.
         * @prop {string} broadcasterId The ID of the broadcaster that owns the broadcast schedule.
         * @prop {string} broadcasterName The broadcaster’s display name.
         * @prop {string} broadcasterLogin The broadcaster’s login name.
         * @prop {UpdateChannelStreamScheduleSegmentResponse_Data_Vacation} vacation The dates when the broadcaster is on vacation and not streaming. Is set to *null* if vacation mode is not enabled.
         */
        /**
         * @typedef UpdateChannelStreamScheduleSegmentResponse
         * @prop {UpdateChannelStreamScheduleSegmentResponse_Data} data The broadcaster’s streaming scheduled.
         */
        /**
         * Updates a scheduled broadcast segment.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#update-channel-stream-schedule-segment)
         *
         * ---
         * 
         *
         * For recurring segments, updating a segment’s title, category, duration, and timezone, changes all segments in the recurring schedule, not just the specified segment.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `channel:manage:schedule`
         *
         * ---
         * *Examples*: 
         * 
         * Updates the duration of a non-recurring broadcast segment.: 
         * ```
         * curl -X PATCH 'https://api.twitch.tv/helix/schedule/segment?broadcaster_id=141981764&id=eyJzZWdtZW50SUQiOiJlNGFjYzcyNC0zNzFmLTQwMmMtODFjYS0yM2FkYTc5NzU5ZDQiLCJpc29ZZWFyIjoyMDIxLCJpc29XZWVrIjoyNn0=' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * -H 'Content-Type: application/json' \
         * -d '{
         *   "duration": "120"
         * }'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": {
         *     "segments": [
         *       {
         *         "id": "eyJzZWdtZW50SUQiOiJlNGFjYzcyNC0zNzFmLTQwMmMtODFjYS0yM2FkYTc5NzU5ZDQiLCJpc29ZZWFyIjoyMDIxLCJpc29XZWVrIjoyNn0=",
         *         "start_time": "2021-07-01T18:00:00Z",
         *         "end_time": "2021-07-01T20:00:00Z",
         *         "title": "TwitchDev Monthly Update // July 1, 2021",
         *         "canceled_until": null,
         *         "category": {
         *             "id": "509670",
         *             "name": "Science & Technology"
         *         },
         *         "is_recurring": false
         *       }
         *     ],
         *     "broadcaster_id": "141981764",
         *     "broadcaster_name": "TwitchDev",
         *     "broadcaster_login": "twitchdev",
         *     "vacation": null
         *   }
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster who owns the broadcast segment to update. This ID must match the user ID in the user access token.
         * @param {string} id The ID of the broadcast segment to update.
         * @param {string?} startTime The date and time that the broadcast segment starts. Specify the date and time in RFC3339 format (for example, 2022-08-02T06:00:00Z).*NOTE*: Only partners and affiliates may update a broadcast’s start time and only for non-recurring segments.
         * @param {string?} duration The length of time, in minutes, that the broadcast is scheduled to run. The duration must be in the range 30 through 1380 (23 hours).
         * @param {string?} categoryId The ID of the category that best represents the broadcast’s content. To get the category ID, use the [Search Categories](#search-categories) endpoint.
         * @param {string?} title The broadcast’s title. The title may contain a maximum of 140 characters.
         * @param {boolean?} isCanceled A Boolean value that indicates whether the broadcast is canceled. Set to *true* to cancel the segment.*NOTE*: For recurring segments, the API cancels the first segment after the current UTC date and time and not the specified segment (unless the specified segment is the next segment after the current UTC date and time).
         * @param {string?} timezone The time zone where the broadcast takes place. Specify the time zone using [IANA time zone database](https://www.iana.org/time-zones) format (for example, America/New_York).
         * @returns {Promise<UpdateChannelStreamScheduleSegmentResponse>} 
         */
        updateChannelStreamScheduleSegment(broadcasterId, id, startTime=null, duration=null, categoryId=null, title=null, isCanceled=null, timezone=null) {
            return reqFunc("https://api.twitch.tv/helix/schedule/segment",
                ["channel:manage:schedule"],
                ["user"],
                {broadcaster_id: broadcasterId, id: id},
                {start_time: startTime, duration: duration, category_id: categoryId, title: title, is_canceled: isCanceled, timezone: timezone},
                {200: "Successfully updated the broadcast segment.", 400: "- The broadcaster_id query parameter is required.\n- The ID in the broadcaster_id query parameter is not valid.\n- The id query parameter is required.\n- The ID in the id query parameter is not valid.\n- The format of the date and time in the `start_time` field is not valid.\n- The value in the `timezone` field is not valid.\n- The value in the `duration` field is not valid.\n- The ID in the `category_id` field is not valid.\n- The string in the `title` field is too long.", 401: "- The ID in the broadcaster_id query parameter must match the user ID in the user access token.\n- The Authorization header is required and must contain a user access token.\n- The user access token must include the channel:manage:schedule scope.\n- The access token is not valid.\n- The ID in the Client-Id header must match the client ID in the access token.", 404: "- The specified broadcast segment was not found."}
            );
        },
        /**
         * Deletes a broadcast from the broadcaster’s streaming schedule.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#delete-channel-stream-schedule-segment)
         *
         * ---
         * Removes a broadcast segment from the broadcaster’s streaming schedule.
         *
         * *NOTE*: For recurring segments, removing a segment removes all segments in the recurring schedule.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `channel:manage:schedule`
         *
         * ---
         * *Examples*: 
         * 
         * Removes the segment from the broadcaster’s streaming schedule.: 
         * ```
         * curl -X DELETE 'https://api.twitch.tv/helix/schedule/segment?broadcaster_id=141981764&id=eyJzZWdtZW50SUQiOiI4Y2EwN2E2NC0xYTZkLTRjYWItYWE5Ni0xNjIyYzNjYWUzZDkiLCJpc29ZZWFyIjoyMDIxLCJpc29XZWVrIjoyMX0=' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster that owns the streaming schedule. This ID must match the user ID in the user access token.
         * @param {string} id The ID of the broadcast segment to remove.
         * @returns {Promise<void>} 
         */
        deleteChannelStreamScheduleSegment(broadcasterId, id) {
            return reqFunc("https://api.twitch.tv/helix/schedule/segment",
                ["channel:manage:schedule"],
                ["user"],
                {broadcaster_id: broadcasterId, id: id},
                {},
                {204: "Successfully removed the broadcast segment.", 400: "- The broadcaster_id query parameter is required.\n- The ID in the broadcaster_id query parameter is not valid.\n- The id query parameter is required.\n- The ID in the id query parameter is not valid.", 401: "- The ID in the broadcaster_id query parameter must match the user ID in the user access token.\n- The Authorization header is required and must contain a user access token.\n- The user access token must include the channel:manage:schedule scope.\n- The access token is not valid.\n- The ID in the Client-Id header must match the client ID in the OAuth token."}
            );
        },
    },
    Search: {
        /**
         * @typedef SearchCategoriesResponse_Data
         * @prop {string} boxArtUrl A URL to an image of the game’s box art or streaming category.
         * @prop {string} name The name of the game or category.
         * @prop {string} id An ID that uniquely identifies the game or category.
         */
        /**
         * @typedef SearchCategoriesResponse
         * @prop {SearchCategoriesResponse_Data[]} data The list of games or categories that match the query. The list is empty if there are no matches.
         */
        /**
         * Gets the games or categories that match the specified query.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#search-categories)
         *
         * ---
         * 
         *
         * To match, the category’s name must contain all parts of the query string. For example, if the query string is 42, the response includes any category name that contains 42 in the title. If the query string is a phrase like love computer, the response includes any category name that contains the words love and computer anywhere in the name. The comparison is case insensitive.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires an [app access token](https://dev.twitch.tv/docs/authentication#app-access-tokens) or a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens))
         *
         * ---
         * *Examples*: 
         * 
         * Gets the list of games and categories that contain fort in the name.: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/search/categories?query=fort' \
         * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
         * -H 'Client-Id: wbmytr93xzw8zbg0p1izqyzzc5mbiz'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "id": "33214",
         *       "name": "Fortnite",
         *       "box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/33214-52x72.jpg"
         *     },
         *     ...
         *   ],
         *   "pagination": {
         *     "cursor": "eyJiIjpudWxsLCJhIjp7IkN"
         *   }
         * }
         * ```
         *
         * ---
         * @param {string} query The URI-encoded search string. For example, encode #archery as `%23archery` and search strings like angel of death as `angel%20of%20death`.
         * @param {number?} first The maximum number of items to return per page in the response. The minimum page size is 1 item per page and the maximum is 100 items per page. The default is 20.
         * @param {string?} after The cursor used to get the next page of results. The *Pagination* object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination)
         * @returns {Promise<SearchCategoriesResponse>} 
         */
        searchCategories(query, first=null, after=null) {
            return reqFunc("https://api.twitch.tv/helix/search/categories",
                [],
                ["app", "user"],
                {query: query, first: first, after: after},
                {},
                {200: "Successfully retrieved the list of category names that matched the specified query string.", 400: "- The query query parameter is required.", 401: "- The Authorization header is required and must contain an app access token or user access token.\n- The access token is not valid.\n- The client ID specified in the Client-Id header does not match the client ID specified in the access token."}
            );
        },
        /**
         * @typedef SearchChannelsResponse_Data
         * @prop {string} broadcasterLanguage The ISO 639-1 two-letter language code of the language used by the broadcaster. For example, en for English. If the broadcaster uses a language not in the list of [supported stream languages](https://help.twitch.tv/s/article/languages-on-twitch#streamlang), the value is other.
         * @prop {string} broadcasterLogin The broadcaster’s login name.
         * @prop {string} displayName The broadcaster’s display name.
         * @prop {string} gameId The ID of the game that the broadcaster is playing or last played.
         * @prop {string} gameName The name of the game that the broadcaster is playing or last played.
         * @prop {string} id An ID that uniquely identifies the channel (this is the broadcaster’s ID).
         * @prop {boolean} isLive A Boolean value that determines whether the broadcaster is streaming live. Is *true* if the broadcaster is streaming live; otherwise, *false*.
         * @prop {string[]} tagIds *IMPORTANT* As of February 28, 2023, this field is deprecated and returns only an empty array. If you use this field, please update your code to use the `tags` field.The list of tags that apply to the stream. The list contains IDs only when the channel is steaming live. For a list of possible tags, see [List of All Tags](https://www.twitch.tv/directory/all/tags). The list doesn’t include Category Tags.
         * @prop {string[]} tags The tags applied to the channel.
         * @prop {string} thumbnailUrl A URL to a thumbnail of the broadcaster’s profile image.
         * @prop {string} title The stream’s title. Is an empty string if the broadcaster didn’t set it.
         * @prop {string} startedAt The UTC date and time (in RFC3339 format) of when the broadcaster started streaming. The string is empty if the broadcaster is not streaming live.
         */
        /**
         * @typedef SearchChannelsResponse
         * @prop {SearchChannelsResponse_Data[]} data The list of channels that match the query. The list is empty if there are no matches.
         */
        /**
         * Gets the channels that match the specified query and have streamed content within the past 6 months.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#search-channels)
         *
         * ---
         * 
         *
         * The fields that the API uses for comparison depends on the value that the live_only query parameter is set to. If live_only is *false*, the API matches on the broadcaster’s login name. However, if live_only is *true*, the API matches on the broadcaster’s name and category name.
         *
         * To match, the beginning of the broadcaster’s name or category must match the query string. The comparison is case insensitive. If the query string is angel_of_death, it matches all names that begin with angel_of_death. However, if the query string is a phrase like angel of death, it matches to names starting with angelofdeath or names starting with angel_of_death.
         *
         * By default, the results include both live and offline channels. To get only live channels set the live_only query parameter to *true*.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires an [app access token](https://dev.twitch.tv/docs/authentication#app-access-tokens) or a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens))
         *
         * ---
         * *Examples*: 
         * 
         * Gets the list of live and offline channels where the broadcaster’s name contains twitchdev.: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/search/channels?query=twitchdev' \
         * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
         * -H 'Client-Id: wbmytr93xzw8zbg0p1izqyzzc5mbiz'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "broadcaster_language": "en",
         *       "broadcaster_login": "twitchdev",
         *       "display_name": "TwitchDev",
         *       "game_id": "1469308723",
         *       "game_name": "Software and Game Development",
         *       "id": "141981764",
         *       "is_live": false,
         *       "tag_ids": [],
         *       "tags": [
         *         "WebDevelopment",
         *         "GameDevelopment",
         *         "SoftwareDevelopment",
         *         "English"
         *       ],
         *       "thumbnail_url": "https://static-cdn.jtvnw.net/jtv_user_pictures/8a6381c7-d0c0-4576-b179-38bd5ce1d6af-profile_image-300x300.png",
         *       "title": "Standard Output",
         *       "started_at": ""
         *     },
         *     ...
         *   ],
         *   "pagination": {
         *     "cursor": "Mg=="
         *   }
         * }
         * ```
         *
         * ---
         * Gets the list of live channels where the broadcaster’s name or category name contains a_seagull.: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/search/channels?query=a_seagull&live_only=true' \
         * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
         * -H 'Client-Id: wbmytr93xzw8zbg0p1izqyzzc5mbiz'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 2: 
         * ```
         * {
         *   "data": [
         *     {
         *       "broadcaster_language": "en",
         *       "broadcaster_login": "a_seagull",
         *       "display_name": "A_Seagull",
         *       "game_id": "506442",
         *       "game_name": "DOOM Eternal",
         *       "id": "19070311",
         *       "is_live": true,
         *       "tag_ids": [],
         *       "tags": ["English"],
         *       "thumbnail_url": "https://static-cdn.jtvnw.net/jtv_user_pictures/a_seagull-profile_image-4d2d235688c7dc66-300x300.png",
         *       "title": "a_seagull",
         *       "started_at": "2020-03-18T17:56:00Z"
         *     }
         *   ],
         *   "pagination": {}
         * }
         * ```
         *
         * ---
         * @param {string} query The URI-encoded search string. For example, encode search strings like angel of death as `angel%20of%20death`.
         * @param {boolean?} liveOnly A Boolean value that determines whether the response includes only channels that are currently streaming live. Set to *true* to get only channels that are streaming live; otherwise, *false* to get live and offline channels. The default is *false*.
         * @param {number?} first The maximum number of items to return per page in the response. The minimum page size is 1 item per page and the maximum is 100 items per page. The default is 20.
         * @param {string?} after The cursor used to get the next page of results. The *Pagination* object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination)
         * @returns {Promise<SearchChannelsResponse>} 
         */
        searchChannels(query, liveOnly=null, first=null, after=null) {
            return reqFunc("https://api.twitch.tv/helix/search/channels",
                [],
                ["app", "user"],
                {query: query, live_only: liveOnly, first: first, after: after},
                {},
                {200: "Successfully retrieved the list of category names that matched the specified query string.", 400: "- The query query parameter is required.", 401: "- The Authorization header is required and must contain an app access token or user access token.\n- The access token is not valid.\n- The client ID specified in the Client-Id header does not match the client ID specified in the access token."}
            );
        },
    },
    Streams: {
        /**
         * @typedef GetStreamKeyResponse_Data
         * @prop {string} streamKey The channel’s stream key.
         */
        /**
         * @typedef GetStreamKeyResponse
         * @prop {GetStreamKeyResponse_Data[]} data A list that contains the channel’s stream key.
         */
        /**
         * Gets the channel’s stream key.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-stream-key)
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `channel:read:stream_key`
         *
         * ---
         * *Examples*: 
         * 
         * Example 1: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/streams/key?broadcaster_id=141981764' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "stream_key": "live_44322889_a34ub37c8ajv98a0"
         *     },
         *   ]
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster that owns the channel. The ID must match the user ID in the access token.
         * @returns {Promise<GetStreamKeyResponse>} 
         */
        getStreamKey(broadcasterId) {
            return reqFunc("undefined",
                ["channel:read:stream_key"],
                ["user"],
                {broadcaster_id: broadcasterId},
                {},
                {200: "Successfully retrieved the stream’s key.", 400: "- The broadcaster_id field is required.\n- The ID in the broadcaster_id field is not valid.", 401: "- The ID in broadcaster_id must match the user ID in the access token.\n- The Authorization header is required and must contain a user access token.\n- The user access token must include the channel:read:stream_key scope.\n- The access token is not valid.\n- The client ID specified in the Client-Id header must match the client ID specified in the access token.", 403: "The user must complete additional steps in order to stream. Present the user with the returned error message."}
            );
        },
        /**
         * @typedef GetStreamsResponse_Data
         * @prop {string} id An ID that identifies the stream. You can use this ID later to look up the video on demand (VOD).
         * @prop {string} userId The ID of the user that’s broadcasting the stream.
         * @prop {string} userLogin The user’s login name.
         * @prop {string} userName The user’s display name.
         * @prop {string} gameId The ID of the category or game being played.
         * @prop {string} gameName The name of the category or game being played.
         * @prop {"live"} type The type of stream. Possible values are:
         *
         * - live
         *
         * If an error occurs, this field is set to an empty string.
         * @prop {string} title The stream’s title. Is an empty string if not set.
         * @prop {string[]} tags The tags applied to the stream.
         * @prop {number} viewerCount The number of users watching the stream.
         * @prop {string} startedAt The UTC date and time (in RFC3339 format) of when the broadcast began.
         * @prop {string} language The language that the stream uses. This is an ISO 639-1 two-letter language code or other if the stream uses a language not in the list of [supported stream languages](https://help.twitch.tv/s/article/languages-on-twitch#streamlang).
         * @prop {string} thumbnailUrl A URL to an image of a frame from the last 5 minutes of the stream. Replace the width and height placeholders in the URL (`{width}x{height}`) with the size of the image you want, in pixels.
         * @prop {string[]} tagIds *IMPORTANT* As of February 28, 2023, this field is deprecated and returns only an empty array. If you use this field, please update your code to use the `tags` field.The list of tags that apply to the stream. The list contains IDs only when the channel is steaming live. For a list of possible tags, see [List of All Tags](https://www.twitch.tv/directory/all/tags). The list doesn’t include Category Tags.
         * @prop {boolean} isMature *IMPORTANT* This field is deprecated and returns only `false`.A Boolean value that indicates whether the stream is meant for mature audiences.
         */
        /**
         * @typedef GetStreamsResponse_Pagination
         * @prop {string} cursor The cursor used to get the next page of results. Set the request’s after or before query parameter to this value depending on whether you’re paging forwards or backwards.
         */
        /**
         * @typedef GetStreamsResponse
         * @prop {GetStreamsResponse_Data[]} data The list of streams.
         * @prop {GetStreamsResponse_Pagination} pagination The information used to page through the list of results. The object is empty if there are no more pages left to page through. [Read More](https://dev.twitch.tv/docs/api/guide#pagination)
         */
        /**
         * Gets a list of all streams.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-streams)
         *
         * ---
         *  The list is in descending order by the number of viewers watching the stream. Because viewers come and go during a stream, it’s possible to find duplicate or missing streams in the list as you page through the results.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires an [app access token](https://dev.twitch.tv/docs/authentication#app-access-tokens) or a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens))
         *
         * ---
         * *Examples*: 
         * 
         * Gets information about the 20 most active streams.: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/streams' \
         * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
         * -H 'Client-Id: wbmytr93xzw8zbg0p1izqyzzc5mbiz'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "id": "123456789",
         *       "user_id": "98765",
         *       "user_login": "sandysanderman",
         *       "user_name": "SandySanderman",
         *       "game_id": "494131",
         *       "game_name": "Little Nightmares",
         *       "type": "live",
         *       "title": "hablamos y le damos a Little Nightmares 1",
         *       "tags": ["Español"],
         *       "viewer_count": 78365,
         *       "started_at": "2021-03-10T15:04:21Z",
         *       "language": "es",
         *       "thumbnail_url": "https://static-cdn.jtvnw.net/previews-ttv/live_user_auronplay-{width}x{height}.jpg",
         *       "tag_ids": [],
         *       "is_mature": false
         *     },
         *     ...
         *   ],
         *   "pagination": {
         *     "cursor": "eyJiIjp7IkN1cnNvciI6ImV5SnpJam8zT0RNMk5TNDBORFF4TlRjMU1UY3hOU3dpWkNJNlptRnNjMlVzSW5RaU9uUnlkV1Y5In0sImEiOnsiQ3Vyc29yIjoiZXlKeklqb3hOVGs0TkM0MU56RXhNekExTVRZNU1ESXNJbVFpT21aaGJITmxMQ0owSWpwMGNuVmxmUT09In19"
         *   }
         * }
         * ```
         *
         * ---
         * Gets streams for the specified logins. If the user is not live, the response doesn’t include them.: 
         * ```
         * curl -X GET
         * 'https://api.twitch.tv/helix/streams?user_login=afro&user_login=cohhcarnage&user_login=lana_lux' \
         * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 2: 
         * ```
         * {
         *   "data": [
         *     {
         *       "id": "40952121085",
         *       "user_id": "101051819",
         *       "user_login": "afro",
         *       "user_name": "Afro",
         *       "game_id": "32982",
         *       "game_name": "Grand Theft Auto V",
         *       "type": "live",
         *       "title": "Jacob: Digital Den Laptops & Routers | NoPixel | !MAINGEAR !FCF",
         *       "tags": ["English"],
         *       "viewer_count": 1490,
         *       "started_at": "2021-03-10T03:18:11Z",
         *       "language": "en",
         *       "thumbnail_url": "https://static-cdn.jtvnw.net/previews-ttv/live_user_afro-{width}x{height}.jpg",
         *       "tag_ids": [],
         *       "is_mature": false
         *     },
         *     ...
         *   ],
         *   "pagination": {}
         * }
         * ```
         *
         * ---
         * @param {string?} userId A user ID used to filter the list of streams. Returns only the streams of those users that are broadcasting. You may specify a maximum of 100 IDs. To specify multiple IDs, include the user_id parameter for each user. For example, `&user_id=1234&user_id=5678`.
         * @param {string?} userLogin A user login name used to filter the list of streams. Returns only the streams of those users that are broadcasting. You may specify a maximum of 100 login names. To specify multiple names, include the user_login parameter for each user. For example, `&user_login=foo&user_login=bar`.
         * @param {string?} gameId A game (category) ID used to filter the list of streams. Returns only the streams that are broadcasting the game (category). You may specify a maximum of 100 IDs. To specify multiple IDs, include the game_id parameter for each game. For example, `&game_id=9876&game_id=5432`.
         * @param {"all"|"live"?} type The type of stream to filter the list of streams by. Possible values are:
         *
         * - all
         *
         * - live
         *
         * The default is all.
         * @param {string?} language A language code used to filter the list of streams. Returns only streams that broadcast in the specified language. Specify the language using an ISO 639-1 two-letter language code or other if the broadcast uses a language not in the list of [supported stream languages](https://help.twitch.tv/s/article/languages-on-twitch#streamlang).You may specify a maximum of 100 language codes. To specify multiple languages, include the language parameter for each language. For example, `&language=de&language=fr`.
         * @param {number?} first The maximum number of items to return per page in the response. The minimum page size is 1 item per page and the maximum is 100 items per page. The default is 20.
         * @param {string?} before The cursor used to get the previous page of results. The *Pagination* object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination)
         * @param {string?} after The cursor used to get the next page of results. The *Pagination* object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination)
         * @returns {Promise<GetStreamsResponse>} 
         */
        getStreams(userId=null, userLogin=null, gameId=null, type=null, language=null, first=null, before=null, after=null) {
            return reqFunc("https://api.twitch.tv/helix/streams",
                [],
                ["app", "user"],
                {user_id: userId, user_login: userLogin, game_id: gameId, type: type, language: language, first: first, before: before, after: after},
                {},
                {200: "Successfully retrieved the list of streams.", 400: "- The value in the type query parameter is not valid.", 401: "- The Authorization header is required and must specify an app access token or user access token.\n- The access token is not valid.\n- The ID in the Client-Id header must match the Client ID in the access token."}
            );
        },
        /**
         * @typedef GetFollowedStreamsResponse_Data
         * @prop {string} id An ID that identifies the stream. You can use this ID later to look up the video on demand (VOD).
         * @prop {string} userId The ID of the user that’s broadcasting the stream.
         * @prop {string} userLogin The user’s login name.
         * @prop {string} userName The user’s display name.
         * @prop {string} gameId The ID of the category or game being played.
         * @prop {string} gameName The ID of the category or game being played.
         * @prop {"live"} type The type of stream. Possible values are:
         *
         * - live
         *
         * If an error occurs, this field is set to an empty string.
         * @prop {string} title The stream’s title. Is an empty string if not set.
         * @prop {number} viewerCount The number of users watching the stream.
         * @prop {string} startedAt The UTC date and time (in RFC3339 format) of when the broadcast began.
         * @prop {string} language The language that the stream uses. This is an ISO 639-1 two-letter language code or other if the stream uses a language not in the list of [supported stream languages](https://help.twitch.tv/s/article/languages-on-twitch#streamlang).
         * @prop {string} thumbnailUrl A URL to an image of a frame from the last 5 minutes of the stream. Replace the width and height placeholders in the URL (`{width}x{height}`) with the size of the image you want, in pixels.
         * @prop {string[]} tagIds *IMPORTANT* As of February 28, 2023, this field is deprecated and returns only an empty array. If you use this field, please update your code to use the `tags` field.The list of tags that apply to the stream. The list contains IDs only when the channel is steaming live. For a list of possible tags, see [List of All Tags](https://www.twitch.tv/directory/all/tags). The list doesn’t include Category Tags.
         * @prop {string[]} tags The tags applied to the stream.
         * @prop {boolean} isMature *IMPORTANT* This field is deprecated and returns only `false`.A Boolean value that indicates whether the stream is meant for mature audiences.
         */
        /**
         * @typedef GetFollowedStreamsResponse_Pagination
         * @prop {string} cursor The cursor used to get the next page of results. Set the request’s after query parameter to this value.
         */
        /**
         * @typedef GetFollowedStreamsResponse
         * @prop {GetFollowedStreamsResponse_Data[]} data The list of live streams of broadcasters that the specified user follows. The list is in descending order by the number of viewers watching the stream. Because viewers come and go during a stream, it’s possible to find duplicate or missing streams in the list as you page through the results. The list is empty if none of the followed broadcasters are streaming live.
         * @prop {GetFollowedStreamsResponse_Pagination} pagination The information used to page through the list of results. The object is empty if there are no more pages left to page through. [Read More](https://dev.twitch.tv/docs/api/guide#pagination)
         */
        /**
         * Gets the list of broadcasters that the user follows and that are streaming live.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-followed-streams)
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `user:read:follows`
         *
         * ---
         * *Examples*: 
         * 
         * Gets the streams that the broadcaster follows.: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/streams/followed?user_id=141981764' \
         * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
         * -H 'Client-Id: wbmytr93xzw8zbg0p1izqyzzc5mbiz'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "id": "42170724654",
         *       "user_id": "132954738",
         *       "user_login": "aws",
         *       "user_name": "AWS",
         *       "game_id": "417752",
         *       "game_name": "Talk Shows & Podcasts",
         *       "type": "live",
         *       "title": "AWS Howdy Partner! Y'all welcome ExtraHop to the show!",
         *       "viewer_count": 20,
         *       "started_at": "2021-03-31T20:57:26Z",
         *       "language": "en",
         *       "thumbnail_url": "https://static-cdn.jtvnw.net/previews-ttv/live_user_aws-{width}x{height}.jpg",
         *       "tag_ids": [],
         *       "tags": ["English"]
         *     },
         *     ...
         *   ],
         *   "pagination": {
         *     "cursor": "eyJiIjp7IkN1cnNvciI6ImV5SnpJam8zT0RNMk5TNDBORFF4TlRjMU1UY3hOU3dpWkNJNlptRnNjMlVzSW5RaU9uUnlkV1Y5In0sImEiOnsiQ3Vyc29yIjoiZXlKeklqb3hOVGs0TkM0MU56RXhNekExTVRZNU1ESXNJbVFpT21aaGJITmxMQ0owSWpwMGNuVmxmUT09In19"
         *   }
         * }
         * ```
         *
         * ---
         * @param {string} userId The ID of the user whose list of followed streams you want to get. This ID must match the user ID in the access token.
         * @param {number?} first The maximum number of items to return per page in the response. The minimum page size is 1 item per page and the maximum is 100 items per page. The default is 100.
         * @param {string?} after The cursor used to get the next page of results. The *Pagination* object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination)
         * @returns {Promise<GetFollowedStreamsResponse>} 
         */
        getFollowedStreams(userId, first=null, after=null) {
            return reqFunc("https://api.twitch.tv/helix/streams/followed",
                ["user:read:follows"],
                ["user"],
                {user_id: userId, first: first, after: after},
                {},
                {200: "Successfully retrieved the list of broadcasters that the user follows and that are streaming live.", 400: "- The user_id query parameter is required.", 401: "- The ID in user_id must match the user ID found in the access token.\n- The Authorization header is required and must contain a user access token.\n- The user access token must include the user:read:follows scope.\n- The OAuth token is not valid.\n- The client ID specified in the Client-Id header does not match the client ID specified in the access token."}
            );
        },
        /**
         * @typedef CreateStreamMarkerResponse_Data
         * @prop {string} id An ID that identifies this marker.
         * @prop {string} createdAt The UTC date and time (in RFC3339 format) of when the user created the marker.
         * @prop {number} positionSeconds The relative offset (in seconds) of the marker from the beginning of the stream.
         * @prop {string} description A description that the user gave the marker to help them remember why they marked the location.
         */
        /**
         * @typedef CreateStreamMarkerResponse
         * @prop {CreateStreamMarkerResponse_Data[]} data A list that contains the single marker that you added.
         */
        /**
         * Adds a marker to a live stream.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#create-stream-marker)
         *
         * ---
         *  A marker is an arbitrary point in a live stream that the broadcaster or editor wants to mark, so they can return to that spot later to create video highlights (see Video Producer, Highlights in the Twitch UX).
         *
         * You may not add markers:
         *
         * - If the stream is not live
         *
         * - If the stream has not enabled video on demand (VOD)
         *
         * - If the stream is a premiere (a live, first-viewing event that combines uploaded videos with live chat)
         *
         * - If the stream is a rerun of a past broadcast, including past premieres.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `channel:manage:broadcast`
         *
         * ---
         * *Examples*: 
         * 
         * Creates a marker at the current location in user 123’s stream.: 
         * ```
         * curl -X POST 'https://api.twitch.tv/helix/streams/markers' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2' \
         * -H 'Content-Type: application/json' \
         * -d '{"user_id":"123", "description":"hello, this is a marker!"}'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *      {
         *         "id": 123,
         *         "created_at": "2018-08-20T20:10:03Z",
         *         "description": "hello, this is a marker!",
         *         "position_seconds": 244
         *      }
         *   ]
         * }
         * ```
         *
         * ---
         * @param {string} userId The ID of the broadcaster that’s streaming content. This ID must match the user ID in the access token or the user in the access token must be one of the broadcaster’s editors.
         * @param {string?} description A short description of the marker to help the user remember why they marked the location. The maximum length of the description is 140 characters.
         * @returns {Promise<CreateStreamMarkerResponse>} 
         */
        createStreamMarker(userId, description=null) {
            return reqFunc("https://api.twitch.tv/helix/streams/markers",
                ["channel:manage:broadcast"],
                ["user"],
                {},
                {user_id: userId, description: description},
                {200: "Successfully created the marker.", 400: "- The `user_id` field is required.\n- The length of the string in the `description` field is too long.", 401: "- The Authorization header is required and must contain a user access token.\n- The user access token must include the user:manage:broadcast scope.\n- The access token is not valid.\n- The client ID specified in the Client-Id header does not match the client ID specified in the access token.", 403: "- The user in the access token is not authorized to create video markers for the user in the `user_id` field. The user in the access token must own the video or they must be one of the broadcaster's editors.", 404: "- The user in the `user_id` field is not streaming live.\n- The ID in the user_id field is not valid.\n- The user hasn't enabled video on demand (VOD)."}
            );
        },
        /**
         * Gets a list of markers from the user’s most recent stream or from the specified VOD/video.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-stream-markers)
         *
         * ---
         *  A marker is an arbitrary point in a live stream that the broadcaster or editor marked, so they can return to that spot later to create video highlights (see Video Producer, Highlights in the Twitch UX).
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `user:read:broadcast`, `channel:manage:broadcast`
         *
         * ---
         * *Examples*: 
         * 
         * Gets the first 5 markers in the most recent stream of user 123.: 
         * ```
         * curl -X GET
         * 'https://api.twitch.tv/helix/streams/markers?user_id=123&first=5' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "user_id": "123",
         *       "user_name": "TwitchName",
         *       "user_login": "twitchname",
         *       "videos": [
         *         {
         *           "video_id": "456",
         *           "markers": [
         *             {
         *               "id": "106b8d6243a4f883d25ad75e6cdffdc4",
         *               "created_at": "2018-08-20T20:10:03Z",
         *               "description": "hello, this is a marker!",
         *               "position_seconds": 244,
         *               "URL": "https://twitch.tv/twitchname/manager/highlighter/456?t=0h4m06s"
         *             },
         *             ...
         *           ]
         *         }
         *       ]
         *     }
         *   ],
         *   "pagination": {
         *     "cursor": "eyJiIjpudWxsLCJhIjoiMjk1MjA0Mzk3OjI1Mzpib29rbWFyazoxMDZiOGQ1Y"
         *   }
         * }
         * ```
         *
         * ---
         * @returns {Promise<void>} 
         */
        getStreamMarkers() {
            return reqFunc("https://api.twitch.tv/helix/streams/markers",
                ["user:read:broadcast", "channel:manage:broadcast"],
                ["user"],
                {},
                {},
                {}
            );
        },
    },
    Subscriptions: {
        /**
         * Gets a list of users that subscribe to the specified broadcaster.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-broadcaster-subscriptions)
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `channel:read:subscriptions`
         *
         * ---
         * *Examples*: 
         * 
         * Example 1: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/subscriptions?broadcaster_id=141981764' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "broadcaster_id": "141981764",
         *       "broadcaster_login": "twitchdev",
         *       "broadcaster_name": "TwitchDev",
         *       "gifter_id": "12826",
         *       "gifter_login": "twitch",
         *       "gifter_name": "Twitch",
         *       "is_gift": true,
         *       "tier": "1000",
         *       "plan_name": "Channel Subscription (twitchdev)",
         *       "user_id": "527115020",
         *       "user_name": "twitchgaming",
         *       "user_login": "twitchgaming"
         *     },
         *     ...
         *   ],
         *   "pagination": {
         *     "cursor": "xxxx"
         *   },
         *   "total": 13,
         *   "points": 13
         * }
         * ```
         *
         * ---
         * @returns {Promise<void>} 
         */
        getBroadcasterSubscriptions() {
            return reqFunc("undefined",
                ["channel:read:subscriptions"],
                ["user"],
                {},
                {},
                {}
            );
        },
        /**
         * Checks whether the user subscribes to the broadcaster’s channel.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#check-user-subscription)
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `user:read:subscription`
         *
         * ---
         * *Examples*: 
         * 
         * Checks whether the user subscribes to the broadcaster’s channel.: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/subscriptions/user?broadcaster_id=149747285&user_id=141981764' \
         * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
         * -H 'Client-Id: wbmytr93xzw8zbg0p1izqyzzc5mbiz'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "broadcaster_id": "149747285",
         *       "broadcaster_name": "TwitchPresents",
         *       "broadcaster_login": "twitchpresents",
         *       "is_gift": false,
         *       "tier": "1000"
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @returns {Promise<void>} 
         */
        checkUserSubscription() {
            return reqFunc("undefined",
                ["user:read:subscription"],
                ["user"],
                {},
                {},
                {}
            );
        },
    },
    Tags: {
        /**
         * @typedef GetAllStreamTagsResponse_Data
         * @prop {string} tagId An ID that identifies this tag.
         * @prop {boolean} isAuto A Boolean value that determines whether the tag is an automatic tag. An automatic tag is one that Twitch adds to the stream. Broadcasters may not add automatic tags to their channel. The value is *true* if the tag is an automatic tag; otherwise, *false*.
         * @prop {Map<string,string>} localizationNames A dictionary that contains the localized names of the tag. The key is in the form, <locale>-<country/region>. For example, en-us. The value is the localized name.
         * @prop {Map<string,string>} localizationDescriptions A dictionary that contains the localized descriptions of the tag. The key is in the form, <locale>-<country/region>. For example, en-us. The value is the localized description.
         */
        /**
         * @typedef GetAllStreamTagsResponse_Pagination
         * @prop {string} cursor The cursor used to get the next page of results. Set the request’s after query parameter to this value to page forwards through the results.
         */
        /**
         * @typedef GetAllStreamTagsResponse
         * @prop {GetAllStreamTagsResponse_Data[]} data The list of stream tags that the broadcaster can apply to their channel.
         * @prop {GetAllStreamTagsResponse_Pagination} pagination The information used to page through the list of results. The object is empty if there are no more pages left to page through. [Read More](https://dev.twitch.tv/docs/api/guide#pagination)
         */
        /**
         * Gets the list of all stream tags that Twitch defines. You can also filter the list by one or more tag IDs.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-all-stream-tags)
         *
         * ---
         * *IMPORTANT* Twitch is moving from Twitch-defined tags to channel-defined tags. *IMPORTANT* As of February 28, 2023, this endpoint returns an empty array. On July 13, 2023, it will return a 410 response.
         *
         * Gets a list of all stream tags that Twitch defines. The broadcaster may apply any of these to their channel except automatic tags. For an online list of the possible tags, see [List of All Tags](https://www.twitch.tv/directory/all/tags).
         *
         * ---
         * *Authentication*: 
         * 
         * Requires an [app access token](https://dev.twitch.tv/docs/authentication#app-access-tokens) or a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens))
         *
         * ---
         * *Examples*: 
         * 
         * Gets the first page of stream tags that Twitch defines.: 
         * ```
         * # Twitch CLI example that gets the first page of stream tags.
         * twitch api get /tags/streams
         * 
         * # Twitch CLI example that gets the specified stream tags.
         * twitch api get /tags/streams -q tag_id=39490173-ed5f-4271-96a8-26ab546ee1e9 -q tag_id=233f4789-1ad0-403c-aaf9-7d37a22264e7
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "tag_id": "621fb5bf-5498-4d8f-b4ac-db4d40d401bf",
         *       "is_auto": false,
         *       "localization_names": {
         *         "bg-bg": "Изчистване на 1 кредит",
         *         "cs-cz": "1 čistý kredit",
         *         "da-dk": "1 credit klaret",
         *         "de-de": "Mit 1 Leben abschließen",
         *         "el-gr": "1 μόνο πίστωση",
         *         "en-us": "1 Credit Clear",
         *         ...
         *       },
         *       "localization_descriptions": {
         *         "bg-bg": "За потоци с акцент върху завършване на аркадна игра с монети, в която не се използва продължаване",
         *         "cs-cz": "Pro vysílání s důrazem na plnění mincových arkádových her bez použití pokračování.",
         *         "da-dk": "Til streams med vægt på at gennemføre et arkadespil uden at bruge continues",
         *         "de-de": "Für Streams mit dem Ziel, ein Coin-op-Arcade-Game mit nur einem Leben abzuschließen.",
         *         "el-gr": "Για μεταδόσεις με έμφαση στην ολοκλήρωση παλαιού τύπου ηλεκτρονικών παιχνιδιών που λειτουργούν με κέρμα, χωρίς να χρησιμοποιούν συνέχειες",
         *         "en-us": "For streams with an emphasis on completing a coin-op arcade game without using any continues",
         *         ...
         *       }
         *     },
         *     ...
         *   ],
         *   "pagination": {
         *     "cursor": "eyJiI..."
         *   }
         * }
         * ```
         *
         * ---
         * @param {string?} tagId The ID of the tag to get. Used to filter the list of tags. To specify more than one tag, include the tag_id parameter for each tag to get. For example, `tag_id=1234&tag_id=5678`. The maximum number of IDs you may specify is 100. Ignores invalid IDs but not duplicate IDs.
         * @param {number?} first The maximum number of items to return per page in the response. The minimum page size is 1 item per page and the maximum is 100. The default is 20.
         * @param {string?} after The cursor used to get the next page of results. The *Pagination* object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination)
         * @returns {Promise<GetAllStreamTagsResponse>} 
         */
        getAllStreamTags(tagId=null, first=null, after=null) {
            return reqFunc("https://api.twitch.tv/helix/tags/streams",
                [],
                ["app", "user"],
                {tag_id: tagId, first: first, after: after},
                {},
                {200: "Successfully retrieved the list of tags.", 400: "- The tag_id query parameter is empty (for example, `&tag_id=`).\n- The list of tag IDs is too long.", 401: "- The Authorization header is required and must specify an app access token or user access token.\n- The access token is not valid.\n- The ID in the Client-Id header must match the Client ID in the access token."}
            );
        },
        /**
         * @typedef GetStreamTagsResponse_Data
         * @prop {string} tagId An ID that identifies this tag.
         * @prop {boolean} isAuto A Boolean value that determines whether the tag is an automatic tag. An automatic tag is one that Twitch adds to the stream. Broadcasters may not add automatic tags to their channel. The value is *true* if the tag is an automatic tag; otherwise, *false*.
         * @prop {Map<string,string>} localizationNames A dictionary that contains the localized names of the tag. The key is in the form, <locale>-<coutry/region>. For example, en-us. The value is the localized name.
         * @prop {Map<string,string>} localizationDescriptions A dictionary that contains the localized descriptions of the tag. The key is in the form, <locale>-<coutry/region>. For example, en-us. The value is the localized description.
         */
        /**
         * @typedef GetStreamTagsResponse
         * @prop {GetStreamTagsResponse_Data[]} data The list of stream tags. The list is empty if the broadcaster or Twitch hasn’t added tags to the broadcaster’s channel.
         */
        /**
         * Gets the list of stream tags that the broadcaster or Twitch added to their channel.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-stream-tags)
         *
         * ---
         * *IMPORTANT* Twitch is moving from Twitch-defined tags to channel-defined tags. *IMPORTANT* As of February 28, 2023, this endpoint returns an empty array. On July 13, 2023, it will return a 410 response. If you use this endpoint, please update your code to use [Get Channel Information](#get-channel-information).
         *
         * Gets the list of stream tags that the broadcaster or Twitch added to their channel.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires an [app access token](https://dev.twitch.tv/docs/authentication#app-access-tokens) or a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens))
         *
         * ---
         * *Examples*: 
         * 
         * Gets the TwitchGaming channel’s tags.: 
         * ```
         * # Twitch CLI example that gets the TwitchGaming channel's tags.
         * twitch api get /streams/tags -q broadcaster_id=527115020
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "tag_id": "6ea6bca4-4712-4ab9-a906-e3336a9d8039",
         *       "is_auto": true,
         *       "localization_names": {
         *         "bg-bg": "английски",
         *         "cs-cz": "Angličtina",
         *         "da-dk": "Engelsk",
         *         "de-de": "Englisch",
         *         "el-gr": "Αγγλικά",
         *         "en-us": "English",
         *         ...
         *       },
         *       "localization_descriptions": {
         *         "bg-bg": "За потоци с използване на английски",
         *         "cs-cz": "Pro vysílání obsahující angličtinu.",
         *         "da-dk": "Til streams, hvori der indgår engelsk",
         *         "de-de": "Für Streams auf Englisch.",
         *         "el-gr": "Για μεταδόσεις που περιλαμβάνουν τη χρήση Αγγλικών",
         *         "en-us": "For streams featuring the use of English",
         *         ...
         *       }
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster whose stream tags you want to get.
         * @returns {Promise<GetStreamTagsResponse>} 
         */
        getStreamTags(broadcasterId) {
            return reqFunc("https://api.twitch.tv/helix/streams/tags",
                [],
                ["app", "user"],
                {broadcaster_id: broadcasterId},
                {},
                {200: "Successfully retrieved the list of tags.", 400: "- The broadcaster_id field is required.\n- The ID in the broadcaster_id field is not valid.", 401: "- The Authorization header is required and must specify an app access token or user access token.\n- The access token is not valid.\n- The ID in the Client-Id header must match the Client ID in the access token."}
            );
        },
    },
    Teams: {
        /**
         * @typedef GetChannelTeamsResponse_Data
         * @prop {string} broadcasterId An ID that identifies the broadcaster.
         * @prop {string} broadcasterLogin The broadcaster’s login name.
         * @prop {string} broadcasterName The broadcaster’s display name.
         * @prop {string} backgroundImageUrl A URL to the team’s background image.
         * @prop {string} banner A URL to the team’s banner.
         * @prop {string} createdAt The UTC date and time (in RFC3339 format) of when the team was created.
         * @prop {string} updatedAt The UTC date and time (in RFC3339 format) of the last time the team was updated.
         * @prop {string} info The team’s description. The description may contain formatting such as Markdown, HTML, newline (\n) characters, etc.
         * @prop {string} thumbnailUrl A URL to a thumbnail image of the team’s logo.
         * @prop {string} teamName The team’s name.
         * @prop {string} teamDisplayName The team’s display name.
         * @prop {string} id An ID that identifies the team.
         */
        /**
         * @typedef GetChannelTeamsResponse
         * @prop {GetChannelTeamsResponse_Data[]} data The list of teams that the broadcaster is a member of. Returns an empty array if the broadcaster is not a member of a team.
         */
        /**
         * Gets the list of Twitch teams that the broadcaster is a member of.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-channel-teams)
         *
         * ---
         * *Authentication*: 
         * 
         * Requires an [app access token](https://dev.twitch.tv/docs/authentication#app-access-tokens) or a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens))
         *
         * ---
         * *Examples*: 
         * 
         * Gets a list of Twitch Teams that the specified broadcaster is a member of.: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/teams/channel?broadcaster_id=96909659' \
         * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
         * -H 'Client-Id: wbmytr93xzw8zbg0p1izqyzzc5mbiz'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "broadcaster_id": "96909659",
         *       "broadcaster_name": "CSharpFritz",
         *       "broadcaster_login": "csharpfritz",
         *       "background_image_url": null,
         *       "banner": null,
         *       "created_at": "2019-02-11T12:09:22Z",
         *       "updated_at": "2020-11-18T15:56:41Z",
         *       "info": "<p>An outgoing and enthusiastic group of friendly channels that write code, teach about technology, and promote the technical community.</p>",
         *       "thumbnail_url": "https://static-cdn.jtvnw.net/jtv_user_pictures/team-livecoders-team_logo_image-bf1d9a87ca81432687de60e24ad9593d-600x600.png",
         *       "team_name": "livecoders",
         *       "team_display_name": "Live Coders",
         *       "id": "6358"
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster whose teams you want to get.
         * @returns {Promise<GetChannelTeamsResponse>} 
         */
        getChannelTeams(broadcasterId) {
            return reqFunc("https://api.twitch.tv/helix/teams/channel",
                [],
                ["app", "user"],
                {broadcaster_id: broadcasterId},
                {},
                {200: "Successfully retrieved the list of teams.", 400: "- The broadcaster_id query parameter is missing or invalid.", 401: "- The Authorization header must contain an app access token or user access token.\n- The access token is not valid.\n- The ID specified in the Client-Id header does not match the client ID specified in the access token.", 404: "- The broadcaster was not found."}
            );
        },
        /**
         * @typedef GetTeamsResponse_Data_Users
         * @prop {string} userId An ID that identifies the team member.
         * @prop {string} userLogin The team member’s login name.
         * @prop {string} userName The team member’s display name.
         */
        /**
         * @typedef GetTeamsResponse_Data
         * @prop {GetTeamsResponse_Data_Users[]} users The list of team members.
         * @prop {string} backgroundImageUrl A URL to the team’s background image.
         * @prop {string} banner A URL to the team’s banner.
         * @prop {string} createdAt The UTC date and time (in RFC3339 format) of when the team was created.
         * @prop {string} updatedAt The UTC date and time (in RFC3339 format) of the last time the team was updated.
         * @prop {string} info The team’s description. The description may contain formatting such as Markdown, HTML, newline (\n) characters, etc.
         * @prop {string} thumbnailUrl A URL to a thumbnail image of the team’s logo.
         * @prop {string} teamName The team’s name.
         * @prop {string} teamDisplayName The team’s display name.
         * @prop {string} id An ID that identifies the team.
         */
        /**
         * @typedef GetTeamsResponse
         * @prop {GetTeamsResponse_Data[]} data A list that contains the single team that you requested.
         */
        /**
         * Gets information about the specified Twitch team.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-teams)
         *
         * ---
         *  [Read More](https://help.twitch.tv/s/article/twitch-teams)
         *
         * ---
         * *Authentication*: 
         * 
         * Requires an [app access token](https://dev.twitch.tv/docs/authentication#app-access-tokens) or a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens))
         *
         * ---
         * *Examples*: 
         * 
         * Gets information about the specified team.: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/teams?id=6358' \
         * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
         * -H 'Client-Id: wbmytr93xzw8zbg0p1izqyzzc5mbiz'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "users": [
         *         {
         *           "user_id": "278217731",
         *           "user_name": "mastermndio",
         *           "user_login": "mastermndio"
         *         },
         *         {
         *           "user_id": "41284990",
         *           "user_name": "jenninexus",
         *           "user_login": "jenninexus"
         *         },
         *         ...
         *       ],
         *       "background_image_url": null,
         *       "banner": null,
         *       "created_at": "2019-02-11T12:09:22Z",
         *       "updated_at": "2020-11-18T15:56:41Z",
         *       "info": "<p>An outgoing and enthusiastic group of friendly channels that write code, teach about technology, and promote the technical community.</p>",
         *       "thumbnail_url": "https://static-cdn.jtvnw.net/jtv_user_pictures/team-livecoders-team_logo_image-bf1d9a87ca81432687de60e24ad9593d-600x600.png",
         *       "team_name": "livecoders",
         *       "team_display_name": "Live Coders",
         *       "id": "6358"
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @param {string} name The name of the team to get. This parameter and the id parameter are mutually exclusive; you must specify the team’s name or ID but not both.
         * @param {string} id The ID of the team to get. This parameter and the name parameter are mutually exclusive; you must specify the team’s name or ID but not both.
         * @returns {Promise<GetTeamsResponse>} 
         */
        getTeams(name, id) {
            return reqFunc("https://api.twitch.tv/helix/teams",
                [],
                ["app", "user"],
                {name: name, id: id},
                {},
                {200: "Successfully retrieved the team's information.", 400: "- The name or id query parameter is required.\n- Specify either the name or id query parameter but not both.\n- The ID in the id query parameter is not valid.", 401: "- The Authorization header must contain an app access token or user access token.\n- The access token is not valid.\n- The ID specified in the Client-Id header does not match the client ID specified in the access token.", 404: "- The specified team was not found."}
            );
        },
    },
    Users: {
        /**
         * @typedef GetUsersResponse_Data
         * @prop {string} id An ID that identifies the user.
         * @prop {string} login The user’s login name.
         * @prop {string} displayName The user’s display name.
         * @prop {"admin"|"global_mod"|"staff"|""} type The type of user. Possible values are: - admin — Twitch administrator
         *
         * - global_mod
         *
         * - staff — Twitch staff
         *
         * - "" — Normal user
         * @prop {"affiliate"|"partner"|""} broadcasterType The type of broadcaster. Possible values are: - affiliate — An affiliate broadcaster [affiliate broadcaster](https://help.twitch.tv/s/article/joining-the-affiliate-program target=)
         *
         * - partner — A partner broadcaster [partner broadcaster](https://help.twitch.tv/s/article/partner-program-overview)
         *
         * - "" — A normal broadcaster
         * @prop {string} description The user’s description of their channel.
         * @prop {string} profileImageUrl A URL to the user’s profile image.
         * @prop {string} offlineImageUrl A URL to the user’s offline image.
         * @prop {number} viewCount The number of times the user’s channel has been viewed. *NOTE*: This field has been deprecated (see [Get Users API endpoint – “view_count” deprecation](https://discuss.dev.twitch.tv/t/get-users-api-endpoint-view-count-deprecation/37777)). Any data in this field is not valid and should not be used.
         * @prop {string} email The user’s verified email address. The object includes this field only if the user access token includes the *user:read:email* scope. If the request contains more than one user, only the user associated with the access token that provided consent will include an email address — the email address for all other users will be empty.
         * @prop {string} createdAt The UTC date and time that the user’s account was created. The timestamp is in RFC3339 format.
         */
        /**
         * @typedef GetUsersResponse
         * @prop {GetUsersResponse_Data[]} data The list of users.
         */
        /**
         * Gets information about one or more users.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-users)
         *
         * ---
         *  You may look up users using their user ID, login name, or both but the sum total of the number of users you may look up is 100. For example, you may specify 50 IDs and 50 names or 100 IDs or names, but you cannot specify 100 IDs and 100 names. If you don’t specify IDs or login names, the request returns information about the user in the access token if you specify a user access token. To include the user’s verified email address in the response, you must use a user access token that includes the *user:read:email* scope.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires an [app access token](https://dev.twitch.tv/docs/authentication#app-access-tokens) or a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens))
         *
         * ---
         * *Examples*: 
         * 
         * Gets information about the specified user.: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/users?id=141981764' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "id": "141981764",
         *       "login": "twitchdev",
         *       "display_name": "TwitchDev",
         *       "type": "",
         *       "broadcaster_type": "partner",
         *       "description": "Supporting third-party developers building Twitch integrations from chatbots to game integrations.",
         *       "profile_image_url": "https://static-cdn.jtvnw.net/jtv_user_pictures/8a6381c7-d0c0-4576-b179-38bd5ce1d6af-profile_image-300x300.png",
         *       "offline_image_url": "https://static-cdn.jtvnw.net/jtv_user_pictures/3f13ab61-ec78-4fe6-8481-8682cb3b0ac2-channel_offline_image-1920x1080.png",
         *       "view_count": 5980557,
         *       "email": "not-real@email.com",
         *       "created_at": "2016-12-14T20:32:28Z"
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @param {string?} id The ID of the user to get. To specify more than one user, include the id parameter for each user to get. For example, `id=1234&id=5678`. The maximum number of IDs you may specify is 100.
         * @param {string?} login The login name of the user to get. To specify more than one user, include the login parameter for each user to get. For example, `login=foo&login=bar`. The maximum number of login names you may specify is 100.
         * @returns {Promise<GetUsersResponse>} 
         */
        getUsers(id=null, login=null) {
            return reqFunc("https://api.twitch.tv/helix/users",
                [],
                ["app", "user"],
                {id: id, login: login},
                {},
                {200: "Successfully retrieved the specified users’ information.", 400: "- The *id* or *login* query parameter is required unless the request uses a user access token.\n- The request exceeded the maximum allowed number of *id* and/or *login* query parameters.", 401: "- The Authorization header is required and must contain an app access token or user access token.\n- The access token is not valid.\n- The ID specified in the Client-Id header does not match the client ID specified in the access token."}
            );
        },
        /**
         * @typedef UpdateUserResponse_Data
         * @prop {string} id An ID that identifies the user.
         * @prop {string} login The user's login name.
         * @prop {string} displayName The user's display name.
         * @prop {"admin"|"global_mod"|"staff"|""} type The type of user. Possible values are:
         *
         * - admin — Twitch administrator
         *
         * - global_mod
         *
         * - staff — Twitch staff
         *
         * - "" — Normal user
         * @prop {"affiliate"|"partner"|""} broadcasterType The type of broadcaster. Possible values are:
         *
         * - affiliate — An [affiliate broadcaster](https://help.twitch.tv/s/article/joining-the-affiliate-program target=)
         *
         * - partner — A [partner broadcaster](https://help.twitch.tv/s/article/partner-program-overview)
         *
         * - "" — A normal broadcaster
         * @prop {string} description The user's description of their channel.
         * @prop {string} profileImageUrl A URL to the user's profile image.
         * @prop {string} offlineImageUrl A URL to the user's offline image.
         * @prop {number} viewCount The number of times the user's channel has been viewed.*NOTE*: This field has been deprecated (see [Get Users API endpoint – "view_count" deprecation](https://discuss.dev.twitch.tv/t/get-users-api-endpoint-view-count-deprecation/37777)). Any data in this field is not valid and should not be used.
         * @prop {string} email The user's verified email address. The object includes this field only if the user access token includes the *user:read:email* scope.If the request contains more than one user, only the user associated with the access token that provided consent will include an email address — the email address for all other users will be empty.
         * @prop {string} createdAt The UTC date and time that the user's account was created. The timestamp is in RFC3339 format.
         */
        /**
         * @typedef UpdateUserResponse
         * @prop {UpdateUserResponse_Data[]} data A list contains the single user that you updated.
         */
        /**
         * Updates the user’s information.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#update-user)
         *
         * ---
         * Updates the specified user’s information. The user ID in the OAuth token identifies the user whose information you want to update.
         *
         * To include the user’s verified email address in the response, the user access token must also include the *user:read:email* scope.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `user:edit`
         *
         * ---
         * *Examples*: 
         * 
         * Updates the description of the specified user.: 
         * ```
         * curl  -X PUT 'https://api.twitch.tv/helix/users?description=BaldAngel' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data":[{
         *     "id": "44322889",
         *     "login": "dallas",
         *     "display_name": "dallas",
         *     "type": "staff",
         *     "broadcaster_type": "affiliate",
         *     "description": "BaldAngel",
         *     "profile_image_url": "https://static-cdn.jtvnw.net/jtv_user_pictures/4d1f36cbf1f0072d-profile_image-300x300.png",
         *     "offline_image_url": "https://static-cdn.jtvnw.net/jtv_user_pictures/dallas-channel_offline_image-2e82c1df2a464df7-1920x1080.jpeg",
         *     "view_count": 6995,
         *     "email": "not-real@email.com",
         *     "created_at": "2013-06-03T19:12:02.580593Z"
         *   }]
         * }
         * ```
         *
         * ---
         * @param {string?} description The string to update the channel’s description to. The description is limited to a maximum of 300 characters.To remove the description, specify this parameter but don’t set it’s value (for example, `?description=`).
         * @returns {Promise<UpdateUserResponse>} 
         */
        updateUser(description=null) {
            return reqFunc("https://api.twitch.tv/helix/users",
                ["user:edit"],
                ["user"],
                {description: description},
                {},
                {200: "Successfully updated the specified user's information.", 400: "- The string in the description query parameter is too long.", 401: "- The Authorization header is required and must contain a user access token.\n- The user access token must include the user:edit scope.\n- The access token is not valid.\n- The ID specified in the Client-Id header does not match the client ID specified in the access token.", 429: "The app exceeded the number of requests that it may make."}
            );
        },
        /**
         * @typedef GetAuthorizationByUserResponse_Data
         * @prop {string} userId The user’s ID.
         * @prop {string} userName The user’s display name.
         * @prop {string} userLogin The user’s login name.
         * @prop {string[]} scopes An array of all the scopes the user has granted to the client ID.
         */
        /**
         * @typedef GetAuthorizationByUserResponse
         * @prop {GetAuthorizationByUserResponse_Data[]} data List of users and their authorized scopes.
         */
        /**
         * NEW Gets the authorization scopes that the specified user has granted the application.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-authorization-by-user)
         *
         * ---
         * NEW Gets the authorization scopes that the specified user(s) have granted the application.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires an [app access token](https://dev.twitch.tv/docs/authentication#app-access-tokens)
         *
         * ---
         * *Examples*: 
         * 
         * Gets the authorized scopes for the TwitchDev user and the TwitchRivals user.: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/authorization/users?user_id=141981764&user_id=197886470' \
         * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "user_id": "141981764",
         *       "user_name": "TwitchDev",
         *       "user_login": "twitchdev",
         *       "scopes": [
         *         "bits:read", 
         *         "channel:bot", 
         *         "channel:manage:predictions"
         *       ]
         *     },
         *     {
         *       "user_id": "197886470",
         *       "user_name": "TwitchRivals",
         *       "user_login": "twitchrivals",
         *       "scopes": [
         *         "channel:manage:predictions"
         *       ]
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @param {string} userId The ID of the user(s) you want to check authorization for. To specify more than one user, include the user_id parameter for each user to get. For example, `user_id=1234&user_id=5678`. The maximum number of IDs you may specify is 10.
         * @returns {Promise<GetAuthorizationByUserResponse>} 
         */
        getAuthorizationByUser(userId) {
            return reqFunc("https://api.twitch.tv/helix/authorization/users",
                [],
                ["app"],
                {user_id: userId},
                {},
                {200: "Successfully retrieved user authorization.", 400: "Request is malformed - invalid parameters or missing parameters.", 401: "- The access token is not valid.\n- Authorization header is required and must specify an app access token.", 403: "The client-id in the header must match the client ID in the access token.", 500: "Internal Server Error."}
            );
        },
        /**
         * @typedef GetUserBlockListResponse_Data
         * @prop {string} userId An ID that identifies the blocked user.
         * @prop {string} userLogin The blocked user’s login name.
         * @prop {string} displayName The blocked user’s display name.
         */
        /**
         * @typedef GetUserBlockListResponse
         * @prop {GetUserBlockListResponse_Data[]} data The list of blocked users. The list is in descending order by when the user was blocked.
         */
        /**
         * Gets the list of users that the broadcaster has blocked.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-user-block-list)
         *
         * ---
         *  [Read More](https://help.twitch.tv/s/article/how-to-manage-harassment-in-chat?language=en_US#BlockWhispersandMessagesfromStrangers)
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `user:read:blocked_users`
         *
         * ---
         * *Examples*: 
         * 
         * Gets the specified broadcaster’s list of blocked users.: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/users/blocks?broadcaster_id=141981764' \
         * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
         * -H 'Client-Id: wbmytr93xzw8zbg0p1izqyzzc5mbiz' \
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "user_id": "135093069",
         *       "user_login": "bluelava",
         *       "display_name": "BlueLava"
         *     },
         *     {
         *       "user_id": "27419011",
         *       "user_login": "travistyoj",
         *       "display_name": "TravistyOJ"
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @param {string} broadcasterId The ID of the broadcaster whose list of blocked users you want to get.
         * @param {number?} first The maximum number of items to return per page in the response. The minimum page size is 1 item per page and the maximum is 100. The default is 20.
         * @param {string?} after The cursor used to get the next page of results. The *Pagination* object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination)
         * @returns {Promise<GetUserBlockListResponse>} 
         */
        getUserBlockList(broadcasterId, first=null, after=null) {
            return reqFunc("https://api.twitch.tv/helix/users/blocks",
                ["user:read:blocked_users"],
                ["user"],
                {broadcaster_id: broadcasterId, first: first, after: after},
                {},
                {200: "Successfully retrieved the broadcaster's list of blocked users.", 400: "- The broadcaster_id query parameter is required.", 401: "- The ID in broadcaster_id must match the user ID found in the request’s access token.\n- The Authorization header is required and must contain a user access token.\n- The user access token must include the user:read:blocked_users scope.\n- The access token is not valid.\n- The ID specified in the Client-Id header does not match the client ID specified in the access token."}
            );
        },
        /**
         * Blocks the specified user from interacting with or having contact with the broadcaster.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#block-user)
         *
         * ---
         *  The user ID in the OAuth token identifies the broadcaster who is blocking the user.
         *
         * To learn more about blocking users, see [Block Other Users on Twitch](https://help.twitch.tv/s/article/how-to-manage-harassment-in-chat?language=en_US#BlockWhispersandMessagesfromStrangers).
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `user:manage:blocked_users`
         *
         * ---
         * *Examples*: 
         * 
         * Blocks the specified user.: 
         * ```
         * curl -X PUT 'https://api.twitch.tv/helix/users/blocks?target_user_id=198704263' \
         * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
         * -H 'Client-Id: wbmytr93xzw8zbg0p1izqyzzc5mbiz' \
         * ```
         *
         * ---
         * @param {string} targetUserId The ID of the user to block. The API ignores the request if the broadcaster has already blocked the user.
         * @param {"chat"|"whisper"?} sourceContext The location where the harassment took place that is causing the brodcaster to block the user. Possible values are:
         *
         * - chat
         *
         * - whisper
         *
         * .
         * @param {"harassment"|"spam"|"other"?} reason The reason that the broadcaster is blocking the user. Possible values are:
         *
         * - harassment
         *
         * - spam
         *
         * - other
         * @returns {Promise<void>} 
         */
        blockUser(targetUserId, sourceContext=null, reason=null) {
            return reqFunc("https://api.twitch.tv/helix/users/blocks",
                ["user:manage:blocked_users"],
                ["user"],
                {target_user_id: targetUserId, source_context: sourceContext, reason: reason},
                {},
                {204: "Successfully blocked the user.", 400: "- The target_user_id query parameter is required.\n- The ID in target_user_id cannot be the same as the user ID in the access token.\n- The value in source_context is not valid.\n- The value in reason is not valid.", 401: "- The Authorization header is required and must contain a user access token.\n- The user access token must include the user:manage:blocked_users scope.\n- The access token is not valid.\n- The ID specified in the Client-Id header does not match the client ID specified in the access token."}
            );
        },
        /**
         * Removes the user from the broadcaster’s list of blocked users.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#unblock-user)
         *
         * ---
         *  The user ID in the OAuth token identifies the broadcaster who’s removing the block.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `user:manage:blocked_users`
         *
         * ---
         * *Examples*: 
         * 
         * Unblocks the specified user.: 
         * ```
         * curl -X DELETE 'https://api.twitch.tv/helix/users/blocks?target_user_id=198704263' \
         * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
         * -H 'Client-Id: wbmytr93xzw8zbg0p1izqyzzc5mbiz' \
         * ```
         *
         * ---
         * @param {string} targetUserId The ID of the user to remove from the broadcaster’s list of blocked users. The API ignores the request if the broadcaster hasn’t blocked the user.
         * @returns {Promise<void>} 
         */
        unblockUser(targetUserId) {
            return reqFunc("https://api.twitch.tv/helix/users/blocks",
                ["user:manage:blocked_users"],
                ["user"],
                {target_user_id: targetUserId},
                {},
                {204: "Successfully removed the block.", 400: "- The target_user_id query parameter is required.", 401: "- The Authorization header is required and must contain a user access token.\n- The user access token must include the user:read:blocked_users scope.\n- The access token is not valid.\n- The ID specified in the Client-Id header does not match the client ID specified in the access token."}
            );
        },
        /**
         * @typedef GetUserExtensionsResponse_Data
         * @prop {string} id An ID that identifies the extension.
         * @prop {string} version The extension's version.
         * @prop {string} name The extension's name.
         * @prop {boolean} canActivate A Boolean value that determines whether the extension is configured and can be activated. Is *true* if the extension is configured and can be activated.
         * @prop {"component"|"mobile"|"overlay"|"panel"} type The extension types that you can activate for this extension. Possible values are:
         *
         * - component
         *
         * - mobile
         *
         * - overlay
         *
         * - panel
         */
        /**
         * @typedef GetUserExtensionsResponse
         * @prop {GetUserExtensionsResponse_Data[]} data The list of extensions that the user has installed.
         */
        /**
         * Gets a list of all extensions (both active and inactive) that the broadcaster has installed.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-user-extensions)
         *
         * ---
         *  The user ID in the access token identifies the broadcaster.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `user:read:broadcast`, `user:edit:broadcast`
         *
         * INFO: To include inactive extensions, you must include the *user:edit:broadcast* scope
         *
         * ---
         * *Examples*: 
         * 
         * Gets the extensions that the user has installed.: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/users/extensions/list' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "id": "wi08ebtatdc7oj83wtl9uxwz807l8b",
         *       "version": "1.1.8",
         *       "name": "Streamlabs Leaderboard",
         *       "can_activate": true,
         *       "type": [
         *         "panel"
         *       ]
         *     },
         *     {
         *       "id": "d4uvtfdr04uq6raoenvj7m86gdk16v",
         *       "version": "2.0.2",
         *       "name": "Prime Subscription and Loot Reminder",
         *       "can_activate": true,
         *       "type": [
         *         "overlay"
         *       ]
         *     },
         *     {
         *       "id": "rh6jq1q334hqc2rr1qlzqbvwlfl3x0",
         *        "version": "1.1.0",
         *       "name": "TopClip",
         *       "can_activate": true,
         *       "type": [
         *         "mobile",
         *         "panel"
         *       ]
         *     },
         *     {
         *       "id": "zfh2irvx2jb4s60f02jq0ajm8vwgka",
         *       "version": "1.0.19",
         *       "name": "Streamlabs",
         *       "can_activate": true,
         *       "type": [
         *         "mobile",
         *         "overlay"
         *       ]
         *     },
         *     {
         *       "id": "lqnf3zxk0rv0g7gq92mtmnirjz2cjj",
         *       "version": "0.0.1",
         *       "name": "Dev Experience Test",
         *       "can_activate": true,
         *       "type": [
         *         "component",
         *         "mobile",
         *         "panel",
         *         "overlay"
         *       ]
         *     }
         *   ]
         * }
         * ```
         *
         * ---
         * @returns {Promise<GetUserExtensionsResponse>} 
         */
        getUserExtensions() {
            return reqFunc("https://api.twitch.tv/helix/users/extensions/list",
                ["user:read:broadcast", "user:edit:broadcast"],
                ["user"],
                {},
                {},
                {200: "Successfully retrieved the user's installed extensions.", 401: "- The Authorization header is required and must contain a user access token.\n- The user access token must include the user:read:broadcast scope.\n- The access token is not valid.\n- The ID specified in the Client-Id header does not match the client ID specified in the access token."}
            );
        },
        /**
         * @typedef GetUserActiveExtensionsResponse_Data_Panel
         * @prop {boolean} active A Boolean value that determines the extension’s activation state. If *false*, the user has not configured this panel extension.
         * @prop {string} id An ID that identifies the extension.
         * @prop {string} version The extension’s version.
         * @prop {string} name The extension’s name.
         */
        /**
         * @typedef GetUserActiveExtensionsResponse_Data_Overlay
         * @prop {boolean} active A Boolean value that determines the extension’s activation state. If *false*, the user has not configured this overlay extension.
         * @prop {string} id An ID that identifies the extension.
         * @prop {string} version The extension’s version.
         * @prop {string} name The extension’s name.
         */
        /**
         * @typedef GetUserActiveExtensionsResponse_Data_Component
         * @prop {boolean} active A Boolean value that determines the extension’s activation state. If *false*, the user has not configured this component extension.
         * @prop {string} id An ID that identifies the extension.
         * @prop {string} version The extension’s version.
         * @prop {string} name The extension’s name.
         * @prop {number} x The x-coordinate where the extension is placed.
         * @prop {number} y The y-coordinate where the extension is placed.
         */
        /**
         * @typedef GetUserActiveExtensionsResponse_Data
         * @prop {GetUserActiveExtensionsResponse_Data_Panel} panel A dictionary that contains the data for a panel extension. The dictionary’s key is a sequential number beginning with 1. The following fields contain the panel’s data for each key.
         * @prop {GetUserActiveExtensionsResponse_Data_Overlay} overlay A dictionary that contains the data for a video-overlay extension. The dictionary’s key is a sequential number beginning with 1. The following fields contain the overlay’s data for each key.
         * @prop {GetUserActiveExtensionsResponse_Data_Component} component A dictionary that contains the data for a video-component extension. The dictionary’s key is a sequential number beginning with 1. The following fields contain the component’s data for each key.
         */
        /**
         * @typedef GetUserActiveExtensionsResponse
         * @prop {GetUserActiveExtensionsResponse_Data} data The active extensions that the broadcaster has installed.
         */
        /**
         * Gets the active extensions that the broadcaster has installed for each configuration.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-user-active-extensions)
         *
         * ---
         * 
         *
         * NOTE: To include extensions that you have under development, you must specify a user access token that includes the *user:read:broadcast* or *user:edit:broadcast* scope.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires an [app access token](https://dev.twitch.tv/docs/authentication#app-access-tokens) or a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens))
         *
         * ---
         * *Examples*: 
         * 
         * Gets the user’s active extensions. The API gets the user from the access token.: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/users/extensions' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": {
         *     "panel": {
         *       "1": {
         *         "active": true,
         *         "id": "rh6jq1q334hqc2rr1qlzqbvwlfl3x0",
         *         "version": "1.1.0",
         *         "name": "TopClip"
         *       },
         *       "2": {
         *         "active": true,
         *         "id": "wi08ebtatdc7oj83wtl9uxwz807l8b",
         *         "version": "1.1.8",
         *         "name": "Streamlabs Leaderboard"
         *       },
         *       "3": {
         *         "active": true,
         *         "id": "naty2zwfp7vecaivuve8ef1hohh6bo",
         *         "version": "1.0.9",
         *         "name": "Streamlabs Stream Schedule & Countdown"
         *       }
         *     },
         *     "overlay": {
         *       "1": {
         *         "active": true,
         *         "id": "zfh2irvx2jb4s60f02jq0ajm8vwgka",
         *         "version": "1.0.19",
         *         "name": "Streamlabs"
         *       }
         *     },
         *     "component": {
         *       "1": {
         *         "active": true,
         *         "id": "lqnf3zxk0rv0g7gq92mtmnirjz2cjj",
         *         "version": "0.0.1",
         *         "name": "Dev Experience Test",
         *         "x": 0,
         *         "y": 0
         *       },
         *       "2": {
         *         "active": false
         *       }
         *     }
         *   }
         * }
         * ```
         *
         * ---
         * @param {string?} userId The ID of the broadcaster whose active extensions you want to get.This parameter is required if you specify an app access token and is optional if you specify a user access token. If you specify a user access token and don’t specify this parameter, the API uses the user ID from the access token.
         * @returns {Promise<GetUserActiveExtensionsResponse>} 
         */
        getUserActiveExtensions(userId=null) {
            return reqFunc("https://api.twitch.tv/helix/users/extensions",
                [],
                ["app", "user"],
                {user_id: userId},
                {},
                {200: "Successfully retrieved the user's active extensions.", 400: "- The user_id query parameter is required if you specify an app access token.", 401: "- The Authorization header is required and must contain an app access token or user access token.\n- The access token is not valid.\n- The ID specified in the Client-Id header does not match the client ID specified in the access token."}
            );
        },
        /**
         * @typedef UpdateUserExtensionsResponse_Data_Panel
         * @prop {boolean} active A Boolean value that determines the extension’s activation state. If *false*, the user has not configured a panel extension.
         * @prop {string} id An ID that identifies the extension.
         * @prop {string} version The extension’s version.
         * @prop {string} name The extension’s name.
         */
        /**
         * @typedef UpdateUserExtensionsResponse_Data_Overlay
         * @prop {boolean} active A Boolean value that determines the extension’s activation state. If *false*, the user has not configured an overlay extension.
         * @prop {string} id An ID that identifies the extension.
         * @prop {string} version The extension’s version.
         * @prop {string} name The extension’s name.
         */
        /**
         * @typedef UpdateUserExtensionsResponse_Data_Component
         * @prop {boolean} active A Boolean value that determines the extension’s activation state. If *false*, the user has not configured a component extension.
         * @prop {string} id An ID that identifies the extension.
         * @prop {string} version The extension’s version.
         * @prop {string} name The extension’s name.
         * @prop {number} x The x-coordinate where the extension is placed.
         * @prop {number} y The y-coordinate where the extension is placed.
         */
        /**
         * @typedef UpdateUserExtensionsResponse_Data
         * @prop {UpdateUserExtensionsResponse_Data_Panel} panel A dictionary that contains the data for a panel extension. The dictionary’s key is a sequential number beginning with 1. The following fields contain the panel’s data for each key.
         * @prop {UpdateUserExtensionsResponse_Data_Overlay} overlay A dictionary that contains the data for a video-overlay extension. The dictionary’s key is a sequential number beginning with 1. The following fields contain the overlay’s data for each key.
         * @prop {UpdateUserExtensionsResponse_Data_Component} component A dictionary that contains the data for a video-component extension. The dictionary’s key is a sequential number beginning with 1. The following fields contain the component’s data for each key.
         */
        /**
         * @typedef UpdateUserExtensionsResponse
         * @prop {UpdateUserExtensionsResponse_Data} data The extensions that the broadcaster updated.
         */
        /**
         * Updates an installed extension’s information.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#update-user-extensions)
         *
         * ---
         *  You can update the extension’s activation state, ID, and version number. The user ID in the access token identifies the broadcaster whose extensions you’re updating.
         *
         * NOTE: If you try to activate an extension under multiple extension types, the last write wins (and there is no guarantee of write order).
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `user:edit:broadcast`
         *
         * ---
         * *Examples*: 
         * 
         * Updates the the user’s installed extensions.: 
         * ```
         * curl -X PUT 'https://api.twitch.tv/helix/users/extensions' \
         * -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2' \
         * -H "Content-Type: application/json" \
         * -d '{
         *   "data": {
         *     "panel": {
         *       "1": {
         *         "active": true,
         *         "id": "rh6jq1q334hqc2rr1qlzqbvwlfl3x0",
         *         "version": "1.1.0"
         *       },
         *       "2": {
         *         "active": true,
         *         "id": "wi08ebtatdc7oj83wtl9uxwz807l8b",
         *         "version": "1.1.8"
         *       },
         *       "3": {
         *         "active": true,
         *         "id": "naty2zwfp7vecaivuve8ef1hohh6bo",
         *         "version": "1.0.9"
         *       }
         *     },
         *     "overlay": {
         *       "1": {
         *         "active": true,
         *         "id": "zfh2irvx2jb4s60f02jq0ajm8vwgka",
         *         "version": "1.0.19"
         *       }
         *     },
         *     "component": {
         *       "1": {
         *         "active": true,
         *         "id": "lqnf3zxk0rv0g7gq92mtmnirjz2cjj",
         *         "version": "0.0.1",
         *         "x": 0,
         *         "y": 0
         *       },
         *       "2": {
         *         "active": false
         *       }
         *     }
         *   }
         * }'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": {
         *     "panel": {
         *       "1": {
         *         "active": true,
         *         "id": "rh6jq1q334hqc2rr1qlzqbvwlfl3x0",
         *         "version": "1.1.0",
         *         "name": "TopClip"
         *       },
         *       "2": {
         *         "active": true,
         *         "id": "wi08ebtatdc7oj83wtl9uxwz807l8b",
         *         "version": "1.1.8",
         *         "name": "Streamlabs Leaderboard"
         *       },
         *       "3": {
         *         "active": true,
         *         "id": "naty2zwfp7vecaivuve8ef1hohh6bo",
         *         "version": "1.0.9",
         *         "name": "Streamlabs Stream Schedule & Countdown"
         *       }
         *     },
         *     "overlay": {
         *       "1": {
         *         "active": true,
         *         "id": "zfh2irvx2jb4s60f02jq0ajm8vwgka",
         *         "version": "1.0.19",
         *         "name": "Streamlabs"
         *       }
         *     },
         *     "component": {
         *       "1": {
         *         "active": true,
         *         "id": "lqnf3zxk0rv0g7gq92mtmnirjz2cjj",
         *         "version": "0.0.1",
         *         "name": "Dev Experience Test",
         *         "x": 0,
         *         "y": 0
         *       },
         *       "2": {
         *         "active": false
         *       }
         *     }
         *   }
         * }
         * ```
         *
         * ---
         * @param {Map<string,string>} data The extensions to update. The `data` field is a dictionary of extension types. The dictionary’s possible keys are: panel, overlay, or component. The key’s value is a dictionary of extensions.For the extension’s dictionary, the key is a sequential number beginning with 1. For panel and overlay extensions, the key’s value is an object that contains the following fields: `active` (true/false), `id` (the extension’s ID), and `version` (the extension’s version).For component extensions, the key’s value includes the above fields plus the `x` and `y` fields, which identify the coordinate where the extension is placed.
         * @returns {Promise<UpdateUserExtensionsResponse>} 
         */
        updateUserExtensions(data) {
            return reqFunc("https://api.twitch.tv/helix/users/extensions",
                ["user:edit:broadcast"],
                ["user"],
                {},
                {data: data},
                {200: "Successfully updated the active extensions.", 400: "- The JSON payload is malformed.", 401: "- The Authorization header is required and must contain a user access token.\n- The user access token must include the user:edit:broadcast scope.\n- The access token is not valid.\n- The ID specified in the Client-Id header does not match the client ID specified in the access token.", 404: "- An extension with the specified `id` and `version` values was not found."}
            );
        },
    },
    Videos: {
        /**
         * @typedef GetVideosResponse_Data_Muted_segments
         * @prop {number} duration The duration of the muted segment, in seconds.
         * @prop {number} offset The offset, in seconds, from the beginning of the video to where the muted segment begins.
         */
        /**
         * @typedef GetVideosResponse_Data
         * @prop {string} id An ID that identifies the video.
         * @prop {string} streamId The ID of the stream that the video originated from if the video's type is "archive;" otherwise, *null*.
         * @prop {string} userId The ID of the broadcaster that owns the video.
         * @prop {string} userLogin The broadcaster's login name.
         * @prop {string} userName The broadcaster's display name.
         * @prop {string} title The video's title.
         * @prop {string} description The video's description.
         * @prop {string} createdAt The date and time, in UTC, of when the video was created. The timestamp is in RFC3339 format.
         * @prop {string} publishedAt The date and time, in UTC, of when the video was published. The timestamp is in RFC3339 format.
         * @prop {string} url The video's URL.
         * @prop {string} thumbnailUrl A URL to a thumbnail image of the video. Before using the URL, you must replace the `%{width}` and `%{height}` placeholders with the width and height of the thumbnail you want returned. Due to current limitations, `${width}` must be 320 and `${height}` must be 180.
         * @prop {string} viewable The video's viewable state. Always set to *public*.
         * @prop {number} viewCount The number of times that users have watched the video.
         * @prop {string} language The ISO 639-1 two-letter language code that the video was broadcast in. For example, the language code is DE if the video was broadcast in German. For a list of supported languages, see [Supported Stream Language](https://help.twitch.tv/s/article/languages-on-twitch#streamlang). The language value is "other" if the video was broadcast in a language not in the list of supported languages.
         * @prop {"archive"|"highlight"|"upload"} type The video's type. Possible values are:
         *
         * - archive — An on-demand video (VOD) of one of the broadcaster's past streams.
         *
         * - highlight — A highlight reel of one of the broadcaster's past streams. See [Creating Highlights](https://help.twitch.tv/s/article/creating-highlights-and-stream-markers).
         *
         * - upload — A video that the broadcaster uploaded to their video library. See Upload under [Video Producer](https://help.twitch.tv/s/article/video-on-demand?language=en_US#videoproducer).
         * @prop {string} duration The video's length in ISO 8601 duration format. For example, 3m21s represents 3 minutes, 21 seconds.
         * @prop {GetVideosResponse_Data_Muted_segments[]} mutedSegments The segments that Twitch Audio Recognition muted; otherwise, *null*.
         */
        /**
         * @typedef GetVideosResponse_Pagination
         * @prop {string} cursor The cursor used to get the next page of results. Use the cursor to set the request's after or before query parameter depending on whether you're paging forwards or backwards through the results.
         */
        /**
         * @typedef GetVideosResponse
         * @prop {GetVideosResponse_Data[]} data The list of published videos that match the filter criteria.
         * @prop {GetVideosResponse_Pagination} pagination Contains the information used to page through the list of results. The object is empty if there are no more pages left to page through. [Read More](https://dev.twitch.tv/docs/api/guide#pagination)
         */
        /**
         * Gets information about one or more published videos.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-videos)
         *
         * ---
         *  You may get videos by ID, by user, or by game/category.
         *
         * You may apply several filters to get a subset of the videos. The filters are applied as an AND operation to each video. For example, if language is set to ‘de’ and game_id is set to 21779, the response includes only videos that show playing League of Legends by users that stream in German. The filters apply only if you get videos by user ID or game ID.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires an [app access token](https://dev.twitch.tv/docs/authentication#app-access-tokens) or a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens))
         *
         * ---
         * *Examples*: 
         * 
         * Gets information about the specified video.: 
         * ```
         * curl -X GET 'https://api.twitch.tv/helix/videos?id=335921245' \
         * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     {
         *       "id": "335921245",
         *       "stream_id": null,
         *       "user_id": "141981764",
         *       "user_login": "twitchdev",
         *       "user_name": "TwitchDev",
         *       "title": "Twitch Developers 101",
         *       "description": "Welcome to Twitch development! Here is a quick overview of our products and information to help you get started.",
         *       "created_at": "2018-11-14T21:30:18Z",
         *       "published_at": "2018-11-14T22:04:30Z",
         *       "url": "https://www.twitch.tv/videos/335921245",
         *       "thumbnail_url": "https://static-cdn.jtvnw.net/cf_vods/d2nvs31859zcd8/twitchdev/335921245/ce0f3a7f-57a3-4152-bc06-0c6610189fb3/thumb/index-0000000000-%{width}x%{height}.jpg",
         *       "viewable": "public",
         *       "view_count": 1863062,
         *       "language": "en",
         *       "type": "upload",
         *       "duration": "3m21s",
         *       "muted_segments": [
         *         {
         *           "duration": 30,
         *           "offset": 120
         *         }
         *       ]
         *     }
         *   ],
         *   "pagination": {}
         * }
         * ```
         *
         * ---
         * @param {string} id A list of IDs that identify the videos you want to get. To get more than one video, include this parameter for each video you want to get. For example, `id=1234&id=5678`. You may specify a maximum of 100 IDs. The endpoint ignores duplicate IDs and IDs that weren't found (if there's at least one valid ID).The id, user_id, and game_id parameters are mutually exclusive.
         * @param {string} userId The ID of the user whose list of videos you want to get.The id, user_id, and game_id parameters are mutually exclusive.
         * @param {string} gameId A category or game ID. The response contains a maximum of 500 videos that show this content. To get category/game IDs, use the [Search Categories](#search-categories) endpoint.The id, user_id, and game_id parameters are mutually exclusive.
         * @param {string?} language A filter used to filter the list of videos by the language that the video owner broadcasts in. For example, to get videos that were broadcast in German, set this parameter to the ISO 639-1 two-letter code for German (i.e., DE). For a list of supported languages, see [Supported Stream Language](https://help.twitch.tv/s/article/languages-on-twitch#streamlang). If the language is not supported, use “other.”Specify this parameter only if you specify the game_id query parameter.
         * @param {"all"|"day"|"month"|"week"?} period A filter used to filter the list of videos by when they were published. For example, videos published in the last week. Possible values are:
         *
         * - all
         *
         * - day
         *
         * - month
         *
         * - week
         *
         * The default is "all," which returns videos published in all periods.Specify this parameter only if you specify the game_id or user_id query parameter.
         * @param {"time"|"trending"|"views"?} sort The order to sort the returned videos in. Possible values are:
         *
         * - time — Sort the results in descending order by when they were created (i.e., latest video first).
         *
         * - trending — Sort the results in descending order by biggest gains in viewership (i.e., highest trending video first).
         *
         * - views — Sort the results in descending order by most views (i.e., highest number of views first).
         *
         * The default is "time."Specify this parameter only if you specify the game_id or user_id query parameter.
         * @param {"all"|"archive"|"highlight"|"upload"?} type A filter used to filter the list of videos by the video's type. Possible case-sensitive values are:
         *
         * - all
         *
         * - archive — On-demand videos (VODs) of past streams.
         *
         * - highlight — Highlight reels of past streams.
         *
         * - upload — External videos that the broadcaster uploaded using the Video Producer.
         *
         * The default is "all," which returns all video types.Specify this parameter only if you specify the game_id or user_id query parameter.
         * @param {string?} first The maximum number of items to return per page in the response. The minimum page size is 1 item per page and the maximum is 100. The default is 20.Specify this parameter only if you specify the game_id or user_id query parameter.
         * @param {string?} after The cursor used to get the next page of results. The *Pagination* object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination)Specify this parameter only if you specify the user_id query parameter.
         * @param {string?} before The cursor used to get the previous page of results. The *Pagination* object in the response contains the cursor’s value. [Read More](https://dev.twitch.tv/docs/api/guide#pagination)Specify this parameter only if you specify the user_id query parameter.
         * @returns {Promise<GetVideosResponse>} 
         */
        getVideos(id, userId, gameId, language=null, period=null, sort=null, type=null, first=null, after=null, before=null) {
            return reqFunc("https://api.twitch.tv/helix/videos",
                [],
                ["app", "user"],
                {id: id, user_id: userId, game_id: gameId, language: language, period: period, sort: sort, type: type, first: first, after: after, before: before},
                {},
                {200: "Successfully retrieved the list of videos.", 400: "- The request must specify either the id or user_id or game_id query parameter.\n- The id, user_id, and game_id query parameters are mutually exclusive; you must specify only one of them.\n- The value in the id query parameter is not valid.\n- The ID in the game_id query parameter is not valid.\n- The value in the type query parameter is not valid.\n- The value in the period query parameter is not valid.\n- The value in the sort query parameter is not valid.", 401: "- The Authorization header is required and must contain an app access token or user access token.\n- The access token is not valid.\n- The ID specified in the Client-Id header does not match the client ID specified in the access token.", 404: "- The ID in the game_id query parameter was not found.\n- The ID in the id query parameter was not found. Returned only if all the IDs were not found; otherwise, the ID is ignored."}
            );
        },
        /**
         * @typedef DeleteVideosResponse
         * @prop {string[]} data The list of IDs of the videos that were deleted.
         */
        /**
         * Deletes one or more videos.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#delete-videos)
         *
         * ---
         *  You may delete past broadcasts, highlights, or uploads.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `channel:manage:videos`
         *
         * ---
         * *Examples*: 
         * 
         * Deletes the two specified videos.: 
         * ```
         * curl -X DELETE 'https://api.twitch.tv/helix/videos?id=1234&id=9876' \
         * -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
         * -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'
         * ```
         * 
         * *Responses*: 
         * 
         * Response 1: 
         * ```
         * {
         *   "data": [
         *     "1234",
         *     "9876"
         *   ]
         * }
         * ```
         *
         * ---
         * @param {string} id The list of videos to delete. To specify more than one video, include the id parameter for each video to delete. For example, `id=1234&id=5678`. You can delete a maximum of 5 videos per request. Ignores invalid video IDs.If the user doesn’t have permission to delete one of the videos in the list, none of the videos are deleted.
         * @returns {Promise<DeleteVideosResponse>} 
         */
        deleteVideos(id) {
            return reqFunc("https://api.twitch.tv/helix/videos",
                ["channel:manage:videos"],
                ["user"],
                {id: id},
                {},
                {200: "Successfully deleted the list of videos.", 400: "- The id query parameter is required.\n- The request exceeded the number of allowed id query parameters.", 401: "- The caller is not authorized to delete the specified video.\n- The Authorization header is required and must contain a user access token.\n- The user access token must include the channel:manage:videos scope.\n- The access token is not valid.\n- The ID specified in the Client-Id header does not match the client ID specified in the access token."}
            );
        },
    },
    Whispers: {
        /**
         * Sends a whisper message to the specified user.
         * [Learn More](https://dev.twitch.tv/docs/api/reference/#send-whisper)
         *
         * ---
         * 
         *
         * NOTE: The user sending the whisper must have a verified phone number (see the *Phone Number* setting in your [Security and Privacy](https://www.twitch.tv/settings/security) settings).
         *
         * NOTE: The API may silently drop whispers that it suspects of violating Twitch policies. (The API does not indicate that it dropped the whisper; it returns a 204 status code as if it succeeded.)
         *
         * *Rate Limits*: You may whisper to a maximum of 40 unique recipients per day. Within the per day limit, you may whisper a maximum of 3 whispers per second and a maximum of 100 whispers per minute.
         *
         * ---
         * *Authentication*: 
         * 
         * Requires a [user access token](https://dev.twitch.tv/docs/authentication#user-access-tokens)) with any of the following scopes: `user:manage:whispers`
         *
         * ---
         * *Examples*: 
         * 
         * Send the user a whisper message.: 
         * ```
         * curl -X POST 'https://api.twitch.tv/helix/whispers?from_user_id=123&to_user_id=456' \
         * -H 'Authorization: Bearer kpvy3cjboyptmdkiacwr0c19hotn5s' \
         * -H 'Client-Id: hof5gwx0su6owfnys0nyan9c87zr6t' \
         * -H 'Content-Type: application/json' \
         * -d '{"message":"hello"}'
         * ```
         *
         * ---
         * @param {string} fromUserId The ID of the user sending the whisper. This user must have a verified phone number. This ID must match the user ID in the user access token.
         * @param {string} toUserId The ID of the user to receive the whisper.
         * @returns {Promise<void>} 
         */
        sendWhisper(fromUserId, toUserId) {
            return reqFunc("https://api.twitch.tv/helix/whispers",
                ["user:manage:whispers"],
                ["user"],
                {from_user_id: fromUserId, to_user_id: toUserId},
                {},
                {}
            );
        },
    },
})
