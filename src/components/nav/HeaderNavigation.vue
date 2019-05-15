<template>
    <section id="header_nav"  class="outer-container">
        <nav class="nav inner-container">
            <template v-for="nav_item in nav_items">
                <div :id="nav_item.title" class=" link" v-if="nav_item.title !== 'Home'">
                    <router-link :to="nav_item.slug" active-class="active"
                                 :exact="nav_item.classes.includes('exact') ? true : false">{{nav_item.title}}
                    </router-link>
                </div>
                <div :id="nav_item.title" class=" link" v-else>
                    <router-link :to="nav_item.slug" active-class="active"
                                 :exact="nav_item.classes.includes('exact') ? true : false"
                                 v-if="!home">
                        <logo></logo>
                    </router-link>
                    <router-link :to="nav_item.slug" active-class="active"
                                 :exact="nav_item.classes.includes('exact') ? true : false"
                                 v-else>
                        {{nav_item.title}}
                    </router-link>
                </div>
            </template>
        </nav>
    </section>
</template>
<script>
    import logo  from '~/components/header/Logo.vue'
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
        methods: {},
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

    #header_nav{
        background-color: #2f4053;
    }
    #header_nav nav.inner-container{
        .flex();
        .justifyBetween();
        width:100%;
        max-width: @inner_container_width;
        padding: 2rem 0;
        margin: auto;

        .link{
            .navlink;
        }
        .link{
            #vue_svg{
                max-width: 10rem;
            }
        }
    }



    @media (max-width: @inner_container_width_px) {
        #header_nav nav.inner-container{
            .link a{
                font-size: 2rem;
            }
        }

    }


    @media (max-width: @tablet_width_max) {
        #header_nav nav.inner-container{
           .flexColumn();
        }

    }


</style>