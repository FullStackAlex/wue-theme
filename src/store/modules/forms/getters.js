export const isAuthenticated = state => {
    return state.token !== null;
};

export const userDisplayName = state => {
    return state.userDisplayName;
};


export const userNicename = state => {
    return state.userNicename;
};

export const userEmail = state => {
    return state.userEmail;
};