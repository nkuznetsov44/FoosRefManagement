export const requireLoggedIn = (user) => {
    return Boolean(user);
};

export const requireNotLoggedIn = (user) => {
    return !Boolean(user);
};