<template>
    <header id="main_header">
        <component v-bind:is="navigationComponent"></component>
        <transition name="pageTitle">
            <h1 id="page_title" class="inner-container" v-html="pageTitle" v-if="pageTitle" :key="pageTitle"></h1>
        </transition>
    </header>
</template>
<script>


    export default {
        name: 'MainHeader',
        data() {
            return {
                title: "",
            }
        },
        components: {
        },
        methods:{

        },
        computed: {
            pageTitle() {
                this.title = this.$store.getters.getPageTitle;
                console.log( "this.$store.getters.getPageTitle", this.$store.getters.getPageTitle );
                if (this.title !== null) {
                    return this.$store.getters.getPageTitle;
                }

            },
            navigationComponent() {
                return this.$store.getters.getNavigationComponent;
            },
        }
    }
</script>
<style lang="less">
    @import (reference) "~@styles/mixins.less";

    #main_header {

        .title {
            .titleDefault();
        }

        #page_title {
            font-size: 3.5rem;
            word-wrap: break-word;
            display: block;
            -webkit-hyphens: auto;
            -ms-hyphens: auto;
            hyphens: auto;
            @media (max-width: @tablet_width_max) {
                font-size: 2.5rem;
            }
        }



        .pageTitle-enter {
            transform: scale(0);
        }

        .pageTitle-enter-to {
            transform: scale(1);
            transition: all .3s ease .25s;
        }

        .pageTitle-leave-active {
            transform: scale(0);
            transition: all .2s ease;
            opacity: 0;
        }


    }


</style>