import router from "~/router";

export default {
    methods: {
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