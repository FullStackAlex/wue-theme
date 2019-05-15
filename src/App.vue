<template>
    <div id="app_container" class="flex flexColumn">
        <component v-bind:is="header"></component>
        <main-vue></main-vue>
        <footer-vue></footer-vue>
        <modals></modals>
    </div>
</template>
<script>
    import MainVue from '~/components/main/Main'
    import Modals from '~/components/modals/Modals'
    import FooterVue from '~/components/footer/Footer'

    require("~/less/style.less");

    export default {
        name: 'App',
        components: {
            Modals,
            MainVue,
            FooterVue,
        },
        computed: {
            header() {
                return this.$store.getters.getHeader;
            },
            auth() {
                return this.$store.getters.isAuthenticated;
            },
            title() {
                return this.$store.state.header.appTitle;
            },
            loader() {
                return this.$store.getters.getLoaderState;
            }
        },
        watch: {
            "$route"(to, from) {
                document.body.setAttribute("data-page-slug", to.name);
            },
        },
        beforeCreate() {

        },
        beforeMount() {
            this.title;

        },
        mounted() {
            this.title;
        },


    }
</script>
<style scoped lang="less">

    @import (reference) "~@styles/variables";
    @import (reference) "~@styles/mixins";
    @import (reference) "~@styles/flex";

    #app_container{
        .flex;
        .flexColumn;
        min-height: 100vh;
    }

    .moveleft-enter {
        left: -20rem !important;
    }

    .moveleft-enter-to {
        left: 0rem !important;
        transition: all .5s ease;
    }

    .moveleft-leave-active {
        transform: translate(-100%);
        transition: all 0.5s ease;
        position: absolute;
    }
</style>