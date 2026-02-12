const scopes = /** @type {const} */ ({
    Analytics: [
        "analytics:read:extensions",
        "analytics:read:games"
    ],
    Bits: [
        "bits:read"
    ],
    Channel: [
        "channel:bot",
        "channel:manage:ads",
        "channel:read:ads",
        "channel:read:charity",
        "channel:manage:clips",
        "channel:edit:commercial",
        "channel:read:editors",
        "channel:manage:extensions",
        "channel:read:goals",
        "channel:read:guest_star",
        "channel:manage:guest_star",
        "channel:read:hype_train",
        "channel:manage:moderators",
        "channel:read:polls",
        "channel:manage:polls",
        "channel:read:predictions",
        "channel:manage:predictions",
        "channel:manage:raids",
        "channel:read:redemptions",
        "channel:manage:redemptions",
        "channel:manage:schedule",
        "channel:read:subscriptions",
        "channel:manage:videos",
        "channel:read:vips",
        "channel:manage:vips",
        "channel:moderate"
    ],
    Clips: [
        "clips:edit"
    ],
    Editor: [
        "editor:manage:clips"
    ],
    Moderator: [
        "moderator:manage:announcements",
        "moderator:manage:automod",
        "moderator:read:automod_settings",
        "moderator:manage:automod_settings",
        "moderator:read:banned_users",
        "moderator:manage:banned_users",
        "moderator:read:blocked_terms",
        "moderator:read:chat_messages",
        "moderator:manage:blocked_terms",
        "moderator:manage:chat_messages",
        "moderator:read:chat_settings",
        "moderator:manage:chat_settings",
        "moderator:read:chatters",
        "moderator:read:followers",
        "moderator:read:guest_star",
        "moderator:manage:guest_star",
        "moderator:read:moderators",
        "moderator:read:shield_mode",
        "moderator:manage:shield_mode",
        "moderator:read:shoutouts",
        "moderator:manage:shoutouts",
        "moderator:read:suspicious_users",
        "moderator:manage:suspicious_users",
        "moderator:read:unban_requests",
        "moderator:manage:unban_requests",
        "moderator:read:vips",
        "moderator:read:warnings",
        "moderator:manage:warnings"
    ],
    User: [
        "user:bot",
        "user:edit",
        "user:edit:broadcast",
        "user:read:blocked_users",
        "user:manage:blocked_users",
        "user:read:broadcast",
        "user:read:chat",
        "user:manage:chat_color",
        "user:read:email",
        "user:read:emotes",
        "user:read:follows",
        "user:read:moderated_channels",
        "user:read:subscriptions",
        "user:read:whispers",
        "user:manage:whispers",
        "user:write:chat"
    ],
    IRC: [
        "chat:edit",
        "chat:read"
    ]
});
/**
 * @type {typeof scopes & {All: [FlatArray<(typeof scopes)[keyof typeof scopes],1>]}}
 */
const modScopes = {All: [], ...scopes};
Object.values(scopes).forEach(v => modScopes.All.push(...v));
/**
 * @typedef {FlatArray<(typeof scopes)[keyof typeof scopes],1>} TwitchScope
 */
/**
 * @exports TwitchScope
 */
module.exports = modScopes;