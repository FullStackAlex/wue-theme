<template>
    <main id="main_container">
        <loader-main v-bind:loader-classes="loaderClasses" v-if="loader"></loader-main>
        <transition name="fade">
            <keep-alive>
                <router-view :key="$route.fullPath"></router-view>
            </keep-alive>
        </transition>
    </main>
</template>
<script>

    import LoaderMain from '~/components/ui/loaders/Main'
    import globalMainMixins from "~/mixins/globalMain"

    export default {
        name: 'MainVue',
        data(){
          return{
              loaderClasses: "loader",
          }
        },
        beforeMount() {
            if (this.$route.name) {
                document.body.setAttribute("data-page-slug", this.$route.name);
            }

        },
        mixins:[
            globalMainMixins,
        ],
        components: {
            LoaderMain,
        },
        computed:{
          loader(){
              return this.$store.getters.getLoaderState;
          }
        },
        mounted() {
        },
        created() {

        },
        updated() {

        },
        beforeCreate() {
        },

    }
</script>
<style lang="less" scoped>
    @import (reference) "~@styles/variables";
    @import (reference) " ~@styles/mixins";


    
    #main_container{
        .flexOne;
        overflow: hidden;
        padding-bottom: 3rem;
        background: white;
        .flex;
        .alignItemsCenter;
        .justifyCenter;
    }

    .fade-enter {
        opacity: 0;
        transform: translate(200%);
    }

    .fade-enter-to {
        opacity: 1;
        transition: all .4s ease .2s;
        transform: translate(0%);
    }


    .fade-leave-active {
        transform: translate(-200%);
        transition: all .2s ease;
    }

    .loader {
        position: absolute;
        z-index: -1;
    }

</style>