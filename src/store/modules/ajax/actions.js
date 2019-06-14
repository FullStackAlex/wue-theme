export const setLoaderTrue = ({commit}) => {
    commit('setLoaderTrue');
};


export const setLoaderFalse = ({commit}) => {
    commit('setLoaderFalse');
};

export const setScrollTop = ({commit}, payload) => {
    commit('setScrollTop', payload);
};


export const setInitialLoadFalse = ({commit}) => {
    commit('setInitialLoadFalse');
};


export const setDocumentTitle = ({commit}, payload) =>{
    commit('setDocumentTitle', payload);
};


export const setFirstTimeActivationFalse = ({commit}) => {
    commit('setFirstTimeActivationFalse');
};
