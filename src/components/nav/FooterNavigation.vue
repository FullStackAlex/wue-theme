<template>
    <section id="footer_nav" :class="footer_nav_class + ' outer-container'">
        <div class="inner-container">
            <template v-for="(footerNav, index) in footerNavs">
                <nav :id="index" v-if="index.includes('footer')" class="column">
                    <template v-for="nav_item in footerNav">
                        <div :id="nav_item.slug.replace(new RegExp('/', 'g'), '')" class="link">
                            <router-link :to="nav_item.slug" active-class="active" exact v-if="internal(nav_item.slug)">{{nav_item.title}}</router-link>
                            <a :href="nav_item.slug" target="_blank" v-else>{{nav_item.title}}</a>
                        </div>
                    </template>
                </nav>
            </template>
        </div>
    </section>
</template>
<script>


    export default {
        name: "Footer", //template tag name
        data() {
            return {
                footerNavs: technomad.menus,
                copyrightYear: new Date().getFullYear(),
                siteInfo: technomad.siteInfo
            }
        },
        components: {},
        mixins: [],
        methods: {

            internal(slug){
                if(slug.indexOf("http") === 0){
                    return false;
                }else{
                    return true;
                }
            },
            getFooterMenuLength() {
                var size = 0, key;
                for (key in technomad.menus) {
                    if (technomad.menus.hasOwnProperty(key) && key.includes("footer")) size++;
                }
                return size;
            }
        },
        mounted() {


        },
        computed: {
            footer_nav_class() {
                let length = this.getFooterMenuLength();
                if (length === 1) {
                    return "one-column";
                } else if (length === 2) {
                    return "two-columns";
                } else if (length === 3) {
                    return "three-columns";
                } else if (length === 4) {
                    return "four-columns";
                } else {
                    return "";
                }
            }
        },
        watch: {
            "$route"(to, from) {
            }
        },
        created() {
        }
    }
</script>

<style lang="less">
    @import (reference)"~@styles/variables";
    @import (reference)"~@styles/flex";
    @import (reference)"~@styles/mixins";

    #footer_nav {
        background-color: @blue;

        .inner-container {
            .flex();
            .justifyBetween();
            .flexWrap();
            padding: 2rem 0;

            nav {
                .flex();
                .flexWrap();
                .justifyBetween();
                min-width: 19rem;
                margin: 0 auto 2rem;
            }

            .link {
                .navlink;

                a {
                    color: @green;
                }
            }
        }

        &.two-columns,
        &.three-columns,
        &.four-columns {
            .inner-container {
                .justifyBetween();

                nav.column {
                    .justifyStart();
                    .alignItemsStart();
                    .flexColumn();
                }
            }
        }

        &.one-column {
            nav.column {
                margin-bottom: 0;
            }
        }
    }

    #copyright {
        text-align: center;
        margin: auto;
        display: inline-block;
    }

    #copyright_break {
        display: none;
    }

    #copyright_span {
        display: inline-block;
    }

    @media (max-width: @inner_container_width_px) {
        #footer_nav {
            .inner-container {

                .link a {
                    font-size: 2rem;
                }
            }
        }
    }


    @media (max-width: @tablet_width_max) {
        #footer_nav {
            .flexColumn();

            .inner-container {
                .link {
                    margin: auto;

                    a {
                        text-align: center;
                        font-size: 1.5rem;
                    }
                }
            }
        }

    }


    @media (max-width: 500px) {
        #copyright_break {
            display: block;;
        }

        #copyright_span {
            display: none;
        }

        #footer_nav {

            .inner-container {
                nav {
                    .flexColumn();

                    .link {
                        margin: auto;

                        a {
                            text-align: center;
                            font-size: 1.5rem;
                        }
                    }
                }
            }

        }

    }

</style>