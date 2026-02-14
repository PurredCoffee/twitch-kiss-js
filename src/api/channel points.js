//@ts-check

const isColor = require('../helpers/color');

/**
 * 
 * @param {import('../TwitchBot').TwitchBot} twitchBot 
 * @param {ReturnType<import('./api')>["ChannelPoints"]} api
 */
module.exports = (twitchBot, api) => ({
    /**
     * @typedef CustomRewardData
     * @prop {string?} prompt The prompt shown to the viewer when they redeem the reward. The prompt is limited to a maximum of 200 characters. 
     * 
     * Use `null` to not require user input.
     * @prop {boolean?} isEnabled Defaults false.
     * 
     * A Boolean value that determines whether the reward is enabled. Viewers see only enabled rewards.
     * @prop {string?} backgroundColor The background color to use for the reward. Specify the color using Hex format (for example, #9147FF).
     * @prop {number?} maxPerStream The maximum number of redemptions allowed per live stream. The minimum value is 1.
     * 
     * Use `null` to disable.
     * @prop {number?} maxPerUserPerStream The maximum number of redemptions allowed per user per stream. The minimum value is 1.
     * 
     * Use `null` to disable.
     * @prop {number?} globalCooldownSeconds The cooldown period, in seconds. The minimum value is 1; however, the minimum value is 60 for it to be shown in the Twitch UX.
     * 
     * Use `null` to disable.
     * @prop {boolean?} shouldRedemptionsSkipRequestQueue Defaults false.
     * 
     * A Boolean value that determines whether redemptions should be set to FULFILLED status immediately when a reward is redeemed. If *false*, status is set to UNFULFILLED and follows the normal request queue process.
     */
    /**
     * Creates a Custom Reward in the broadcaster’s channel.
     * 
     * [Learn More](https://dev.twitch.tv/docs/api/reference/#create-custom-rewards)
     *
     * ---
     * The maximum number of custom rewards per channel is 50, which includes both enabled and disabled rewards.
     * 
     * It is not possible to upload images through the Twitch API, please upload images yourself if you wish to use them!
     *
     * ---
     * Example Response:
     * ```json
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
     * ---
     * @param {string} title The custom reward’s title. The title may contain a maximum of 45 characters and it must be unique amongst all of the broadcaster’s custom rewards.
     * @param {number} cost The cost of the reward, in Channel Points. The minimum is 1 point.
     * @param {CustomRewardData?} data
     */
    createCustomRewards(title, cost, data=null) {
        if(typeof title != 'string' || title.length > 45) return Promise.reject(new TypeError('title is not a string or is too long!'));
        if(typeof cost != 'number' || cost <= 0) return Promise.reject(new TypeError('cost is not a number or is <= 0!'));
        let {prompt, isEnabled, backgroundColor, maxPerStream, maxPerUserPerStream, globalCooldownSeconds, shouldRedemptionsSkipRequestQueue} = data ?? {};
        if(prompt != null && (typeof prompt != 'string' || prompt.length > 200)) return Promise.reject(new TypeError('prompt is not a string or is too long!'));
        if(isEnabled == null) isEnabled = true;
        if(typeof isEnabled != 'boolean') return Promise.reject(new TypeError('isEnabled is not a bool!'));
        if(backgroundColor != null && !isColor(backgroundColor, false)) return Promise.reject(new TypeError('backgroundColor is not a correctly formatted string!'));
        if(maxPerStream != null && (typeof maxPerStream != 'number' || maxPerStream < 1)) return Promise.reject(new TypeError('maxPerStream is not a number or below 1'));
        if(globalCooldownSeconds != null && (typeof globalCooldownSeconds != 'number' || globalCooldownSeconds < 1)) return Promise.reject(new TypeError('globalCooldownSeconds is not a number or below 1'));
        if(shouldRedemptionsSkipRequestQueue == null) shouldRedemptionsSkipRequestQueue = false
        if(typeof shouldRedemptionsSkipRequestQueue != 'boolean') return Promise.reject(new TypeError('shouldRedemptionsSkipRequestQueue is not a boolean'));
        return api.createCustomRewards(
            twitchBot.userID ?? "",
            title, cost,
            prompt, isEnabled,
            backgroundColor, prompt != null,
            maxPerStream != null, maxPerStream,
            maxPerUserPerStream != null, maxPerUserPerStream,
            globalCooldownSeconds != null, globalCooldownSeconds,
            shouldRedemptionsSkipRequestQueue
        );
    },
    /**
     * Deletes a custom reward that the broadcaster created.
     * 
     * [Learn More](https://dev.twitch.tv/docs/api/reference/#delete-custom-reward)
     *
     * ---
     * The app used to create the reward is the only app that may delete it. If the reward’s redemption status is UNFULFILLED at the time the reward is deleted, its redemption status is marked as FULFILLED.
     *
     * ---
     * @param {string} rewardId The ID of the custom reward to delete.
     */
    deleteCustomReward(rewardId) {
        if(typeof rewardId != 'string') return Promise.reject(new TypeError('rewardId is not a string!'));
        return api.deleteCustomReward(twitchBot.userID ?? "", rewardId);
    },
    /**
     * Gets a list of custom rewards that the specified broadcaster created.
     * 
     * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-custom-reward)
     * 
     * ---
     * The response contains only the IDs that were found. 
     * 
     * If none of the IDs were found, the response is 404 Not Found.
     * 
     * ---
     * Example Response:
     * ```json
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
     * ---
     * @param {string[]} rewardIds A list of IDs to filter the rewards by. You may specify a maximum of 50 IDs. Duplicate IDs are ignored.
     */
    getCustomReward(rewardIds) {
        if(!Array.isArray(rewardIds) || rewardIds.some(v => typeof v != 'string')) return Promise.reject(new TypeError('rewardIds is not an array of strings!'));
        return api.getCustomReward(twitchBot.userID ?? "", rewardIds, null);
    },
    /**
     * Gets a list of all custom rewards that the specified broadcaster created.
     * 
     * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-custom-reward)
     * 
     * ---
     * Example Response:
     * ```json
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
     * ---
     * @param {boolean?} onlyManaged A list of IDs to filter the rewards by. You may specify a maximum of 50 IDs. Duplicate IDs are ignored.
     */
    getCustomRewards(onlyManaged=false) {
        if(onlyManaged == null) onlyManaged = true;
        if(typeof onlyManaged != 'boolean') return Promise.reject(new TypeError('onlyManaged is not a bool!'));
        return api.getCustomReward(twitchBot.userID ?? "", null, onlyManaged);
    },
    /**
     * Gets a list of redemptions for the specified custom reward. The app used to create the reward is the only app that may get the redemptions.
     * 
     * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-custom-reward-redemption)
     *
     * ---
     * Example Response:
     * ```json
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
     * ---
     * @param {string} rewardId The ID that identifies the custom reward whose redemptions you want to get.
     * @param {{status: "CANCELED"|"FULFILLED"|"UNFULFILLED", ids: string[]}?} userInfo status: The status of the redemptions to return. The possible case-sensitive values are:
     * - CANCELED
     * - FULFILLED
     * - UNFULFILLED
     *
     * ids: A list of IDs to filter the redemptions by. You may specify a maximum of 50 IDs. Duplicate IDs are ignored. The response contains only the IDs that were found. If none of the IDs were found, the response is 404 Not Found.
     * @param {"OLDEST"|"NEWEST"?} sort Defaults 'OLDEST'.
     * 
     * The order to sort redemptions by. The possible case-sensitive values are:
     * - OLDEST
     * - NEWEST
     * @param {number?} first Defaults 20.
     * 
     * The maximum number of redemptions to return per page in the response. The minimum page size is 1 redemption per page and the maximum is 50. The default is 20.  
     */
    getCustomRewardRedemptions(rewardId, userInfo=null, sort='OLDEST', first=20) {
        if(typeof rewardId != 'string') return Promise.reject(new TypeError('rewardId is not a string!'));
        if(userInfo != null) {
            if(!['CANCELED', 'FULFILLED', 'UNFULFILLED'].includes(userInfo.status)) return Promise.reject(new TypeError('status is not a valid status!'));
            if(!Array.isArray(userInfo.ids) || userInfo.ids.some(v => typeof v != 'string')) return Promise.reject(new TypeError('ids is not an array of strings!'));
        }
        if(sort == null) sort = 'OLDEST';
        if(!['OLDEST', 'NEWEST'].includes(sort)) return Promise.reject(new TypeError('status is not a valid sorting order!'));
        if(first == null) first = 20;
        if(typeof first != 'number' || first < 1 || first >= 50) return Promise.reject(new TypeError('first is not a number or 1 > first > 50!'));

        return api.getCustomRewardRedemption(
            twitchBot.userID ?? "", rewardId,
            userInfo?.status, userInfo?.ids,
            sort, null, first
        );
    },
    /**
     * Updates a custom reward. The app used to create the reward is the only app that may update the reward.
     * 
     * [Learn More](https://dev.twitch.tv/docs/api/reference/#update-custom-reward)
     * 
     * ---
     * Example Response:
     * ```json
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
     * ---
     * @param {string} rewardId 
     * @param {string?} title The custom reward’s title. The title may contain a maximum of 45 characters and it must be unique amongst all of the broadcaster’s custom rewards.
     * @param {number?} cost The cost of the reward, in Channel Points. The minimum is 1 point.
     * @param {(CustomRewardData & {paused: boolean?})? } data
     */
    updateCustomReward(rewardId, title=null, cost=null, data) {
        if(title != null && (typeof title != 'string' || title.length > 45)) return Promise.reject(new TypeError('title is not a string or is too long!'));
        if(cost != null && (typeof cost != 'number' || cost <= 0)) return Promise.reject(new TypeError('cost is not a number or is <= 0!'));
        let {prompt, isEnabled, backgroundColor, maxPerStream, maxPerUserPerStream, globalCooldownSeconds, shouldRedemptionsSkipRequestQueue, paused} = data ?? {};
        if(prompt != null && (typeof prompt != 'string' || prompt.length > 200)) return Promise.reject(new TypeError('prompt is not a string or is too long!'));
        if(isEnabled != null && typeof isEnabled != 'boolean') return Promise.reject(new TypeError('isEnabled is not a bool!'));
        if(backgroundColor != null && !isColor(backgroundColor, false)) return Promise.reject(new TypeError('backgroundColor is not a correctly formatted string!'));
        if(maxPerStream != null && (typeof maxPerStream != 'number' || maxPerStream < 1)) return Promise.reject(new TypeError('maxPerStream is not a number or below 1'));
        if(globalCooldownSeconds != null && (typeof globalCooldownSeconds != 'number' || globalCooldownSeconds < 1)) return Promise.reject(new TypeError('globalCooldownSeconds is not a number or below 1'));
        if(shouldRedemptionsSkipRequestQueue != null && typeof shouldRedemptionsSkipRequestQueue != 'boolean') return Promise.reject(new TypeError('shouldRedemptionsSkipRequestQueue is not a boolean'));
        if(paused != null && typeof paused != 'boolean') return Promise.reject(new TypeError('paused is not a boolean'));

        return api.updateCustomReward(
            twitchBot.userID ?? "", rewardId,
            title, prompt,
            cost, backgroundColor,
            isEnabled, prompt != null,
            maxPerStream != null, maxPerStream,
            maxPerUserPerStream != null, maxPerUserPerStream,
            globalCooldownSeconds != null, globalCooldownSeconds,
            paused, shouldRedemptionsSkipRequestQueue
        );
    },
    /**
     * Updates a redemption’s status. You may update a redemption only if its status is UNFULFILLED. The app used to create the reward is the only app that may update the redemption.
     * 
     * [Learn More](https://dev.twitch.tv/docs/api/reference/#update-redemption-status)
     * 
     * ---
     * Example Response:
     * ```json
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
     * ---
     * @param {string[]} redemptionIds A list of IDs that identify the redemptions to update. You may specify a maximum of 50 IDs.
     * @param {string} rewardId The ID that identifies the reward that’s been redeemed.
     * @param {"CANCELED"|"FULFILLED"} status The status to set the redemption to. Possible values are:
     * - CANCELED
     * - FULFILLED
     * Setting the status to CANCELED refunds the user’s channel points.
     */
    updateRedemptionStatus(redemptionIds, rewardId, status) {
        if(!Array.isArray(redemptionIds) || redemptionIds.some(v => typeof v != 'string')) return Promise.reject(new TypeError('redemptionIds is not an array of strings!'));
        if(typeof rewardId != 'string') return Promise.reject(new TypeError('rewardId is not a string!'));
        if(!["CANCELED","FULFILLED"].includes(status)) return Promise.reject(new TypeError('status is not a valid status!'));
        return api.updateRedemptionStatus(
            redemptionIds, twitchBot.userID ?? "", rewardId, status
        );
    }
})