export const setLoaderTrue = ({commit}) => {
    commit('setLoaderTrue');
};


export const setLoaderFalse = ({commit}) => {
    commit('setLoaderFalse');
};

export const setScrollTop = ({commit}, payload) => {
    commit('setScrollTop', payload);
};


export const setSsrFalse = ({commit}) => {
    commit('setSsrFalse');
};


export const setDocumentTitle = ({commit}, payload) =>{
    commit('setDocumentTitle', payload);
};
