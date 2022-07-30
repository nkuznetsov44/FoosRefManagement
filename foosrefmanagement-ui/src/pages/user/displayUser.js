const displayUser = (user) => {
    if (!user)
        return null;
    if (user.username)
        return `@${user.username}`;
    if (user.first_name) {
        if (user.last_name) {
            return `${user.first_name} ${user.last_name}`;
        }
        return user.first_name;
    }
    if (user.telegram_user_id) {
        return `id="${user.telegram_user_id}"`;
    }
    if (user.id) {
        return `id="${user.id}"`;
    }
    return null;
};

export default displayUser;