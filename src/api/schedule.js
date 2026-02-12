//@ts-check

/**
 * 
 * @param {import('../TwitchBot').TwitchBot} twitchBot 
 * @param {ReturnType<import('./api')>["Schedule"]} api
 */
module.exports = (twitchBot, api) => ({
    getChannelStreamSchedule() {
        return api.getChannelStreamSchedule();
    },
    getChannelICalendar() {
        return api.getChannelICalendar();
    },
    updateChannelStreamSchedule() {
        return api.updateChannelStreamSchedule();
    },
    createChannelStreamScheduleSegment() {
        return api.createChannelStreamScheduleSegment();
    },
    updateChannelStreamScheduleSegment() {
        return api.updateChannelStreamScheduleSegment();
    },
    deleteChannelStreamScheduleSegment() {
        return api.deleteChannelStreamScheduleSegment();
    }
})