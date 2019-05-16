<template>
    <div id="page_wrapper">
        <loader v-if="loader"></loader>
        <section v-if="content" class="outer-container">
            <div class="inner-container" v-html="content"></div>
        </section>
    </div>
</template>
<script>

    import axios from "axios";
    import HeaderNavigation from "~/components/nav/HeaderNavigation"
    import MainHeader from "~/components/header/MainHeader"
    import ajaxMixins from "~/mixins/ajax"
    import globalMainMixins from "~/mixins/globalMain"
    import loader from "~/components/ui/loaders/Main"


    export default {
        name: 'Homepage',
        data: function () {
            return {
                initialLoad: this.$store.getters.isInitialLoad,
                content: null,
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
        ],
        computed: {},

        beforeMount() {
        }
        ,
        mounted() {
            console.log("mounted");
            this.$store.dispatch('setPageTitle', false);
            if (this.initialLoad) {
                let initial_loader = document.getElementById("initial_loader");
                document.body.removeChild(initial_loader);
                this.title = technomad.initialData.title;
                this.themen = technomad.initialData.themen;
                this.content = technomad.initialData.content;
                this.document_title = technomad.bloginfo.name + " - " + technomad.bloginfo.description;
                this.$store.dispatch("setInitialLoadFalse");
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
        },
        deactivated() {

        },


    }
</script>
<style lang="less">
    @import (reference) "~@styles/variables";


    body[data-page-slug="homepage"] {


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