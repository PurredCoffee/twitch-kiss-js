//@ts-check

/**
 * 
 * @param {import('../TwitchBot').TwitchBot} twitchBot 
 * @param {ReturnType<import('./api')>["Users"]} api
 */
module.exports = (twitchBot, api) => ({
    getUsers() {
        return api.getUsers();
    },
    updateUser() {
        return api.updateUser();
    },
    getAuthorizationByUser() {
        return api.getAuthorizationByUser();
    },
    getUserBlockList() {
        return api.getUserBlockList();
    },
    blockUser() {
        return api.blockUser();
    },
    unblockUser() {
        return api.unblockUser();
    },
    getUserExtensions() {
        return api.getUserExtensions();
    },
    getUserActiveExtensions() {
        return api.getUserActiveExtensions();
    },
    updateUserExtensions() {
        return api.updateUserExtensions();
    }
})