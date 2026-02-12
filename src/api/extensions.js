//@ts-check

/**
 * 
 * @param {import('../TwitchBot').TwitchBot} twitchBot 
 * @param {ReturnType<import('./api')>["Extensions"]} api
 */
module.exports = (twitchBot, api) => ({
    getExtensionConfigurationSegment() {
        return api.getExtensionConfigurationSegment();
    },
    setExtensionConfigurationSegment() {
        return api.setExtensionConfigurationSegment();
    },
    setExtensionRequiredConfiguration() {
        return api.setExtensionRequiredConfiguration();
    },
    sendExtensionPubSubMessage() {
        return api.sendExtensionPubSubMessage();
    },
    getExtensionLiveChannels() {
        return api.getExtensionLiveChannels();
    },
    getExtensionSecrets() {
        return api.getExtensionSecrets();
    },
    createExtensionSecret() {
        return api.createExtensionSecret();
    },
    sendExtensionChatMessage() {
        return api.sendExtensionChatMessage();
    },
    getExtensions() {
        return api.getExtensions();
    },
    getReleasedExtensions() {
        return api.getReleasedExtensions();
    },
    getExtensionBitsProducts() {
        return api.getExtensionBitsProducts();
    },
    updateExtensionBitsProduct() {
        return api.updateExtensionBitsProduct();
    }
})