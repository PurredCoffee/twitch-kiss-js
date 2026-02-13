//@ts-check

/**
 * 
 * @param {import('../TwitchBot').TwitchBot} twitchBot 
 * @param {ReturnType<import('./api')>["CCLs"]} api
 */
module.exports = (twitchBot, api) => ({
    /**
     * Gets information about Twitch content classification labels.
     * 
     * [Learn More](https://dev.twitch.tv/docs/api/reference/#get-content-classification-labels)
     *
     * ---
     * Example Response:
     * ```json
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
     * ---
     * @param {"bg-BG"|"cs-CZ"|"da-DK"|"da-DK"|"de-DE"|"el-GR"|"en-GB"|"en-US"|"es-ES"|"es-MX"|"fi-FI"|"fr-FR"|"hu-HU"|"it-IT"|"ja-JP"|"ko-KR"|"nl-NL"|"no-NO"|"pl-PL"|"pt-BT"|"pt-PT"|"ro-RO"|"ru-RU"|"sk-SK"|"sv-SE"|"th-TH"|"tr-TR"|"vi-VN"|"zh-CN"|"zh-TW"} locale Defaults 'en-US'.
     * 
     * Locale for the Content Classification Labels. You may specify a maximum of 1 locale.
     */
    getContentClassificationLabels(locale='en-US') {
        if(locale != null && !["bg-BG", "cs-CZ", "da-DK", "da-DK", "de-DE", "el-GR", "en-GB", "en-US", "es-ES", "es-MX", "fi-FI", "fr-FR", "hu-HU", "it-IT", "ja-JP", "ko-KR", "nl-NL", "no-NO", "pl-PL", "pt-BT", "pt-PT", "ro-RO", "ru-RU", "sk-SK", "sv-SE", "th-TH", "tr-TR", "vi-VN", "zh-CN", "zh-TW"].includes(locale))
            return Promise.reject(new Error('locale is not supported!'));
        return api.getContentClassificationLabels(locale);
    }
})