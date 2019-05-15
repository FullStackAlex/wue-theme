<template>
    <div id="page_wrapper">
        <loader v-if="loader"></loader>
        <section v-if="content" class="outer-container">
            <div class="inner-container" v-html="content"></div>
        </section>
        <section id="home_slick_slider" class="outer-container">
            <div class="slick-container">
                <div :href="slide.guid" v-for="(slide,index) in featured_slider" :key="index" v-html="slide.thumbnail"
                     class="mfp-link"></div>
            </div>
        </section>
        <section id="themen" class="outer-container">
            <div class="flex flexWrap justifyBetween inner-container" data-columns>
                <div v-for="(thema, index) in themen">
                    <router-link :to="'/thema/'+ index" class="thema">
                        <h2 v-html="thema.name"></h2>
                        <div v-html="thema.featured_image"></div>
                    </router-link>
                </div>
            </div>
        </section>
    </div>
</template>
<script>

    import axios from "axios";
    import HeaderNavigation from "~/components/nav/HeaderNavigation"
    import MainHeader from "~/components/header/MainHeader"
    import ajaxMixins from "~/mixins/ajax"
    import globalMainMixins from "~/mixins/globalMain"
    import salvattore from "~/mixins/salvattore"
    import mfp from "magnific-popup"
    import $ from 'jquery'
    import Slick from "slick-carousel"
    import loader from "~/components/ui/loaders/Main"


    export default {
        name: 'Homepage',
        data: function () {
            return {
                ssr: this.$store.getters.isSsr,
                content: null,
                sliderOptions: {
                    autoplay: '4000',
                    speed: 1500,
                    loop: true,
                },
                featured_slider: null,
                themen: null,
                document_title: technomad.bloginfo.name,
                loader: true
            }
        },
        components: {
            HeaderNavigation,
            MainHeader,
            loader
        },
        methods: {},
        mixins: [
            globalMainMixins,
            ajaxMixins,
            salvattore
        ],
        computed: {},

        beforeMount() {
        }
        ,
        mounted() {
            console.log("mounted");
            this.$store.dispatch('setPageTitle', false);
            if (this.ssr) {
                let initial_loader = document.getElementById("initial_loader");
                document.body.removeChild(initial_loader);
                this.title = technomad.initialData.title;
                this.themen = technomad.initialData.themen;
                this.featured_slider = technomad.initialData["featured-slider"];
                this.content = technomad.initialData.content;
                this.document_title = technomad.bloginfo.name + " - " + technomad.bloginfo.description;
                this.$store.dispatch("setSsrFalse");
                this.$store.dispatch('setLoaderFalse');
                this.$store.dispatch("setDocumentTitle", this.document_title);
                this.loader = false;
            } else {
                this.loader = true;
                var host = technomad.host;
                var path = host + "/wp-json/technomad/frontpage/";
                axios.get(path)
                    .then(response => {
                        console.log("response.data", response.data);
                        this.themen = response.data.themen;
                        this.featured_slider = response.data["featured-slider"];
                        this.document_title = technomad.bloginfo.name + " - " + technomad.bloginfo.description;
                        this.content = response.data.content;
                        this.$store.dispatch('setLoaderFalse');
                        this.$store.dispatch("setDocumentTitle", this.document_title);
                        this.loader = false;
                    })
                    .catch(error => {
                        this.$store.dispatch('setLoaderFalse');
                        console.log("error", error);
                    });

                if (document.getElementById('gallery')) {
                    this.loaded = true;
                }
            }
        },
        created() {
        },
        updated() {

            window.homeslick = $('#home_slick_slider .slick-container').slick({
                dots: true,
                infinite: true,
                autoplay: true,
                lazyLoad: "ondemand",
                slidesToShow: 1,
                slidesToScroll: 1,
                prevArrow: false,
                nextArrow: false,
                fade: false,
                adaptiveHeight: true,
            });

            setTimeout(function(){
                homeslick.slick("refresh");
            },200);
            /* let vm = this;
            $('.slick-slide:not(.slick-cloned)').magnificPopup({
                type: 'image',
                closeOnContentClick: true,
                delegate: 'a',
                closeBtnInside: false,
                gallery: {
                    enabled: true
                },
                callbacks: {
                    open: function () {
                        vm.$store.dispatch("setMagnificPopupTrue");
                    },
                    close: function () {
                        vm.$store.dispatch("setMagnificPopupFalse");
                    }
                }

            });   //magnificPopupInit*/

            this.salvattore();

        },

        beforeCreate() {
        },
        beforeDestroy() {
        },
        destroyed() {
        },
        activated() {
            this.$store.dispatch("setPageTitle", false);
            this.$store.dispatch('setLoaderFalse');
            this.$store.dispatch("setDocumentTitle", this.document_title);
            console.log("activated");
            if (window.homeslick) {
                console.log("refresh");
                homeslick.slick("refresh");
            }
        },
        deactivated() {

        },


    }
</script>
<style lang="less">
    @import (reference) "~@styles/variables";
    @import (css) "~@node_modules/slick-carousel/slick/slick-theme.css";
    @import (css) "~@node_modules/slick-carousel/slick/slick.css";
    @import (css) "~@node_modules/magnific-popup/dist/magnific-popup.css";


    body[data-page-slug="homepage"] {


    }


    #home_slick_slider {
        width: 100%;

        .mfp-link {
            img {
                margin: auto;
                width: 100%;
                max-width: @inner_container_width !important;
                height: auto;
            }
        }

        .slick-dots li button:before {
            font-size: 1rem;
        }

    }

    #themen {

        .column {
            .thema {
                position: relative;
                border-radius: 1rem;
                width: 100%;
                margin: 1rem 0;

                h2 {
                    position: absolute;
                    text-align: center;
                    left: 0;
                    bottom: 0;
                    width: 100%;
                    font-size: 2rem;
                    padding: 1rem 0;
                    color: white;
                    margin: 0;
                    background: rgba(0, 0, 0, 0.3);
                }

                img {
                    width: 100%;
                    height: auto;
                    display: block;
                }
            }
        }
    }

    #themen .inner-container[data-columns]::before {
        content: '2 .column.size-1of2';
    }

    .inner-container[data-columns] {

        .column {
            opacity: 0;
        }

        .size-1of2 {
            opacity: 1;
            width: calc(50% ~'-' 0.5rem);
        }
    }

    @media (max-width: @tablet_width_max) {
        #themen {

            .column {
                .thema {
                    h2 {
                        font-size: 1.25rem;
                    }
                }
            }
        }

    }

    @media (max-width: 600px) {
        .inner-container[data-columns] {

            .column {
                width: 85%;
                margin: auto;
            }
        }
    }
</style>