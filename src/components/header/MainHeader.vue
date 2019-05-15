<template>
    <header id="main_header">
        <component v-bind:is="navigationComponent"></component>
        <logo v-if="home"></logo>
        <transition name="homeTitle"
                    @beforeEnter="homeTitleBeforeEnter"
                    @enter="homeTitleEnter"
                    @afterEnter="homeTitleAfterEnter"
                    @beforeLeave="homeTitleBeforeLeave"
                    @leave="homeTitleLeave"
                    @afterLeave="homeTitleAfterLeave">
            <h1 id="main_header_title" class="title" v-if="home">
                <span v-html="appTitle"></span><br><span v-html="subTitle"></span>
            </h1>
        </transition>
        <transition name="moveright">
            <h1 id="page_title" class="inner-container" v-html="pageTitle" v-if="pageTitle" :key="pageTitle"></h1>
        </transition>
    </header>
</template>
<script>

    import logo from "~/components/header/Logo.vue"

    export default {
        name: 'MainHeader',
        data() {
            return {
                title: "",
            }
        },
        components: {
            logo
        },
        methods:{
            homeTitleBeforeEnter(){

            },
            homeTitleEnter(){

            },
            homeTitleAfterEnter(){

            },
            homeTitleBeforeLeave(){

            },
            homeTitleLeave(){

            },
            homeTitleAfterLeave(){

            }

        },
        computed: {
            home() {
                if (this.$route.name === "Homepage") {
                    return true;
                } else {
                    return false;
                }
            },
            pageTitle() {
                this.title = this.$store.getters.getPageTitle;
                if (this.title !== null) {
                    console.log("this.title", this.title);
                    return this.$store.getters.getPageTitle;
                }

            },
            navigationComponent() {
                return this.$store.getters.getNavigationComponent;
            },
            appTitle() {
                return this.$store.getters.getAppTitle.name;
            },
            subTitle() {
                return this.$store.getters.getAppTitle.description;
            }
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


        #main_header_title {
            font-size: 3rem;
            padding: 3rem 0 1.5rem;
            font-weight: 400;
        }


        .moveright-enter {
            transform: translate(-100%);
            opacity: 0;
        }

        .moveright-enter-to {
            transform: translate(0%);
            transition: all .5s ease !important;
            opacity: 1;
        }

        .moveright-leave-active {
            transform: translate(200%);
            transition: all .5s ease;
            opacity: 0;
            position: absolute;
        }

        .homeTitle-enter{

        }

    }

    [data-page-slug="Homepage"] {
        #vue_svg {
            margin: 4rem auto 0;
        }
    }

    [data-page-slug="post"] {
        #main_header {
            #page_title {
                color: @red;
            }
        }
    }


    @media (max-width: @inner_container_width_px) {
        #main_header {
            #main_header_title {
                height: auto;
                font-size: 2.5rem;
            }
        }
    }


    @media (max-width: @tablet_width_max) {

    }

    @media (max-width: 479px) {
        #main_header {
            #main_header_title {
                height: auto;
                font-size: 2rem;
            }
        }
    }
</style>