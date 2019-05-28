import router from "~/router";

export default {
    methods: {
        ajaxStuff() {
            /**
             * defined in globalMain.js
             **/
            this.setInternalRouterLinksInsideContent();
        },
        scrollToTop(next) {

        }
    },
    beforeRouteUpdate(to, from, next) {
        //this.scrollToTop(next);
        next();
    },
    beforeRouteLeave(to, from, next) {
        //this.scrollToTop(next);
        next();
    },
}