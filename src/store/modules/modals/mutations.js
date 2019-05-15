export const setCurrentModal = (state,  payload)  =>{
    state.currentModal = payload;
};


export const setModalOpenTrue = (state) =>{
    state.modalOpen = true;
};

export const setModalOpenFalse = (state) =>{
    state.modalOpen = false;
};

export const setMagnificPopupTrue = (state) =>{
    state.magnificPopupOpen = true;
};

export const setMagnificPopupFalse = (state) =>{
    state.magnificPopupOpen = false;
};
