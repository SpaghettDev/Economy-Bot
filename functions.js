module.exports = {
    match: function(msg, i) {
        if (!msg) return undefined;
        if (!i) return undefined;
        let user = i.members.cache.find(
          m =>
            m.user.username.toLowerCase().startsWith(msg) ||
            m.user.username.toLowerCase() === msg ||
            m.user.username.toLowerCase().includes(msg) ||
            m.displayName.toLowerCase().startsWith(msg) ||
            m.displayName.toLowerCase() === msg ||
            m.displayName.toLowerCase().includes(msg)
        );
        if (!user) return undefined;
        return user.user;
    }
};