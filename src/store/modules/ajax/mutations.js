
export const setLoaderTrue = (state) => {
    state.loader = true;
};


export const setLoaderFalse = (state) => {
    state.loader = false;
};


export const setScrollTop = (state, payload) => {
    state.scrollTop = payload;
};


export const setInitialLoadFalse = (state) => {
    state.initialLoad = false;
};


export const setFirstTimeActivationFalse = (state) => {
    state.firstTimeActivation = false;
};


export const setDocumentTitle = (state, payload) => {
    let span = document.createElement("span");
    span.innerHTML = payload;
    let documentTitle = span.textContent;
    document.title = documentTitle;
    state.documentTitle = documentTitle;
};
