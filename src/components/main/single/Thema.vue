<template>
    <div id="page_wrapper">
        <loader v-if="loader"></loader>
        <section class="flex flexWrap justifyAround" id="gallery">
            <template v-for="attachment in attachments">
                <transition name="opacity">
                    <a :href="attachment.guid" v-html="attachment.thumbnail" :key="attachment.guid"></a>
                </transition>
            </template>
        </section>
    </div>
</template>
<script>

    import axios from "axios";
    import HeaderNavigation from "~/components/nav/HeaderNavigation"
    import MainHeader from "~/components/header/MainHeader"
    import ajaxMixins from "~/mixins/ajax"
    import globalMainMixins from "~/mixins/globalMain"
    import mfp from "magnific-popup"
    import $ from 'jquery'
    import loader from "~/components/ui/loaders/Main"



    export default {
        name: 'Thema',
        data: function () {
            return {
                ssr: this.$store.getters.isSsr,
                content: null,
                title: null,
                attachments: null,
                document_title: technomad.bloginfo.name,
                loader: true,
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
            ajaxMixins
        ],
        computed: {},

        beforeMount() {
        }
        ,
        mounted() {
            this.$store.dispatch('setPageTitle', false);
            if (this.ssr) {
                let initial_loader = document.getElementById("initial_loader");
                document.body.removeChild(initial_loader);
                this.content = technomad.initialData.content;
                this.attachments = technomad.initialData.attachments;
                this.title = technomad.initialData.title;
                this.document_title = this.title + " - " + technomad.bloginfo.name;
                this.$store.dispatch("setSsrFalse");
                this.$store.dispatch('setLoaderFalse');
                this.$store.dispatch('setDocumentTitle', this.document_title);
                this.$store.dispatch("setPageTitle", this.title);
                this.loader = false;
            } else {
                this.loader = true;
                var host = technomad.host;
                var path = host + "/wp-json/technomad/thema/";
                axios.get(path, {
                    params: {
                        slug: this.$route.params.slug
                    }
                }).then(response => {
                    console.log("response.data", response.data);
                    this.attachments = response.data.attachments;
                    this.title = response.data.title;
                    this.document_title = this.title + " - " + technomad.bloginfo.name;
                    this.$store.dispatch('setLoaderFalse');
                    this.$store.dispatch("setPageTitle", this.title);
                    this.$store.dispatch('setDocumentTitle', this.document_title);
                    this.loader = false;
                }).catch(error => {
                    this.$store.dispatch('setLoaderFalse');
                    console.log("error", error);
                });

            }
        },
        created() {

        },
        updated() {

            let vm = this;
            $('#gallery').magnificPopup({
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

            });   //magnificPopupInit

        },

        beforeCreate() {
        },
        beforeDestroy() {
        },
        destroyed() {
        },
        activated() {
            this.$store.dispatch("setPageTitle", this.title);
            this.$store.dispatch('setLoaderFalse');
            this.$store.dispatch('setDocumentTitle', this.document_title);
        },
        deactivated() {

        },


    }
</script>
<style lang="less">
    @import "~@node_modules/magnific-popup/dist/magnific-popup.css";
    @import "~@styles/variables";
    @import "~@styles/flex";
    @import "~@styles/mixins";

    [data-page-slug="thema"] {

        #homepage_wrapper {
            width: 100%;
        }

        #gallery {
            max-width: 90%;
            margin: auto;

            a {
                .flex();
                .justifyCenter();
                .alignItemsCenter();

                img {
                    width: 25rem;
                    height: auto;
                    display: block;
                    margin: 1rem;
                }
            }
        }

        .opacity-enter {
            opacity: 0;
        }

        .opacity-enter-to {
            opacity: 1;
            transition: all .3s ease;
        }

        .opacity-leave-active {
            opacity: 0;
            transition: all 0.3s ease;
        }


    }

</style>