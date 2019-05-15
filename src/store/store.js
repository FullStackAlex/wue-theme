import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);


import formsState from './modules/forms/state'
import * as formsGetters from './modules/forms/getters'
import * as formsMutations from './modules/forms/mutations'
import * as formsActions from './modules/forms/actions'


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

import listState from './modules/lists/state'
import * as listGetters from './modules/lists/getters'
import * as listMutations from './modules/lists/mutations'
import * as listActions from './modules/lists/actions'


import modalsState from './modules/modals/state'
import * as modalsGetters from './modules/modals/getters'
import * as modalsMutations from './modules/modals/mutations'
import * as modalsActions from './modules/modals/actions'





const forms = {
    state: formsState,
    getters: formsGetters,
    mutations: formsMutations,
    actions: formsActions,
};

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

const lists = {
    state: listState,
    getters: listGetters,
    mutations: listMutations,
    actions: listActions,
};

const modals = {
    state: modalsState,
    getters: modalsGetters,
    mutations: modalsMutations,
    actions: modalsActions,
};



export const store = new Vuex.Store({
    modules: {
        forms,
        ajax,
        nav,
        header,
        footer,
        lists,
        modals,
    }
});