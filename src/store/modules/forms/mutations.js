/**
 *
 * methods for handling synchronious state changes
 *
 * */
export const authUser = (state, userData) => {
    state.token = userData.token;
    state.userEmail = userData.userEmail;
    state.userDisplayName = userData.userDisplayName ;
    state.userNicename = userData.userNicename;
    state.user = {
        firstName: state.userDisplayName,
        login: state.userNicename,
        email: state.userEmail,
        token: state.token,
    }
    //console.log("userData", userData);
};

export const clearAuthData = (state) => {
    state.token = null;
    state.userEmail = null;
    //state.expirationDate = null;
    state.userDisplayName = null;
    state.userNicename = null;
    state.user = null;
    //localStorage.clear();
    //instead:
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    //localStorage.removeItem("expirationDate");
    localStorage.removeItem("userDisplayName");
    localStorage.removeItem("userNicename");
};

