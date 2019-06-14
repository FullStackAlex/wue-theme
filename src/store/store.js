import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);



import ajaxState from './modules/ajax/state'
import * as ajaxGetters from './modules/ajax/getters'
import * as ajaxMutations from './modules/ajax/mutations'
import * as ajaxActions from './modules/ajax/actions'


import navState from './modules/navigation/state'
import * as navGetters from './modules/navigation/getters'
import * as navMutations from './modules/navigation/mutations'
import * as navActions from './modules/navigation/actions'


import headerState from './modules/header/state'
import * as headerGetters from './modules/header/getters'
import * as headerMutations from './modules/header/mutations'
import * as headerActions from './modules/header/actions'


import footerState from './modules/footer/state'
import * as footerGetters from './modules/footer/getters'
import * as footerMutations from './modules/footer/mutations'
import * as footerActions from './modules/footer/actions'


const ajax = {
    state: ajaxState,
    getters: ajaxGetters,
    mutations: ajaxMutations,
    actions: ajaxActions,
};
const nav = {
    state: navState,
    getters: navGetters,
    mutations: navMutations,
    actions: navActions,
};
const header = {
    state: headerState,
    getters: headerGetters,
    mutations: headerMutations,
    actions: headerActions,
};
const footer = {
    state: footerState,
    getters: footerGetters,
    mutations: footerMutations,
    actions: footerActions,
};

export const store = new Vuex.Store({
    modules: {
        ajax,
        nav,
        header,
        footer,
    }
});