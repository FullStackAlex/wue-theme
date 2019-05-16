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
        background: white;
        .flex;
        .flexColumn;
        .alignItemsCenter;
        .justifyCenter;
    }

    .fade-enter {
        opacity: 0;
        transform: scale(0);
    }

    .fade-enter-to {
        opacity: 1;
        transition: all .3s ease .25s;
        transform: scale(1);
    }

    .fade-leave-to {
        transform: scale(0);
        opacity: 0;
        transition: all .20s ease;
        position:absolute;
    }

    .loader {
        position: absolute;
        z-index: -1;
    }

</style>