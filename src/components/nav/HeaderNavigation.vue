<template>
    <section id="header_nav" class="outer-container">
        <nav class="nav inner-container">
            <template v-for="nav_item in nav_items">
                <!-- switching between text and logo SVG  for "Home" nav link-->
                <!-- if route != home-->
                <div :id="nav_item.title" class=" link" v-if="nav_item.title !== 'Home'">
                    <router-link :to="nav_item.slug" active-class="active" :exact="nav_item.classes.includes('exact') ? true : false" v-if="internal(nav_item.slug)">
                        {{nav_item.title}}
                    </router-link>
                    <a :href="nav_item.slug" v-else>
                        {{nav_item.title}}
                    </a>
                </div>
                <!-- if home route-->
                <div :id="nav_item.title" class=" link" v-else>
                    <transition name="logo">
                        <!-- if logo ( = any page except homepage)-->
                        <router-link :to="nav_item.slug" class="logolink homelink" active-class="active"
                                     :exact="nav_item.classes.includes('exact') ? true : false"
                                     v-if="!home">
                            <logo></logo>
                        </router-link>
                    </transition>
                    <transition name="homelinktext">
                        <!-- if text ( = only homepage) -->
                        <router-link :to="nav_item.slug" class="homelink" active-class="active"
                                     :exact="nav_item.classes.includes('exact') ? true : false"
                                     v-if="home">
                            {{nav_item.title}}
                        </router-link>
                    </transition>
                </div>
            </template>
        </nav>
    </section>
</template>
<script>
    import logo from '~/components/header/Logo.vue'

    export default {
        name: "HeaderNavigation", //template tag name
        data: function () {
            return {
                nav_items: technomad.menus["header-menu"],
            }
        },
        components: {
            logo
        },
        methods: {
            internal(slug){
                if(slug.indexOf("http") === 0){
                    console.log( "slug", slug );
                    return false;
                }else{
                    return true;
                }
            },
        },
        mounted: function () {


        },
        computed: {
            home() {
                if (this.$route.name === "Homepage") {
                    return true;
                } else {
                    return false;
                }
            },
            initialLoad() {
                return this.$store.getters.isInitialLoad;
            }
        },
        watch: {
            "$route"(to, from) {
            }
        },
        created() {
        },
        beforeDestroy() {
        },
        destroyed() {
        },
        activated() {
        },
        deactivated() {
        }
    }
</script>

<style lang="less" scoped>
    @import (reference) "~@styles/variables";
    @import (reference) "~@styles/flex";
    @import (reference) "~@styles/mixins";


    .logolink{
        height: 5rem;
    }
    .logo-before-enter {
        display:none;

    }
    .logo-enter {
        display:block;
        height: 0;
        opacity: 0;
    }

    .logo-enter-to {
        opacity: 1;
        transition: all .3s ease .2s !important;
    }

    .logo-leave-active {
        transition: all .2s ease !important;
        opacity: 0;
        height: 0;
        svg#wue_svg{
            margin:0;
        }
    }

    .homelinktext-enter {
        transform: scale(0);
        opacity: 0;
    }

    .homelinktext-enter-to {
        transform: scale(1);
        opacity: 1;
        transition: all .3s ease .2s !important;
    }

    .homelinktext-leave-active {
        transition: all .2s ease !important;
        opacity: 0;
        position: absolute;
        left: 0;
        transform: scale(0);
    }


    #header_nav {
        background-color: #2f4053;
    }

    #header_nav nav.inner-container {
        position: relative;
        .flex();
        .justifyBetween();
        width: 100%;
        max-width: @inner_container_width;
        padding: 2rem 0;
        margin: auto;

        .link {
            .navlink;
        }

        .link {
            #wue_svg {
                width: 100%;
                height: 100%;
                max-width: 10rem;
                max-height: 5rem;
            }
        }
    }


    @media (max-width: @inner_container_width_px) {
        #header_nav nav.inner-container {
            .link a {
                font-size: 2rem;
            }
        }

    }


    @media (max-width: @tablet_width_max) {
        #header_nav nav.inner-container {
            .flexColumn();
        }

    }


</style>