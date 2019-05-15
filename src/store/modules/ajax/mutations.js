
export const setLoaderTrue = (state) => {
    state.loader = true;
};


export const setLoaderFalse = (state) => {
    state.loader = false;
};


export const setScrollTop = (state, payload) => {
    state.scrollTop = payload;
};


export const setSsrFalse = (state) => {
    state.ssr = false;
};

export const setDocumentTitle = (state, payload) => {
    let noLineBreaks = payload.replace("<br>", " ");
    document.title = noLineBreaks;
    state.documentTitle = noLineBreaks;

    _paq.push(["trackEvent", "Menu", noLineBreaks]);
};
