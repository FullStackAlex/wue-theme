<template>
    <div id="pageWrapper">
        <loader v-if="loader"></loader>
        <section v-if="content" class="outer-container">
            <logo></logo>
            <h1 id="homePageTitle" class="title">
                <span v-html="appTitle"></span><br><span v-html="subTitle"></span>
            </h1>
            <div class="inner-container" v-html="content"></div>
        </section>
    </div>
</template>
<script>

    import axios from "axios";
    import ajaxMixins from "~/mixins/ajaxMixins"
    import globalMainMixins from "~/mixins/globalMainMixins"
    import loader from "~/components/ui/loaders/Main"
    import logo from "~/components/header/Logo.vue"

    export default {
        name: 'Homepage',
        data: function () {
            return {
                initialLoad: this.$store.getters.isInitialLoad,
                content: null,
                documentTitle: technomad.bloginfo.name,
                loader: true
            }
        },
        components: {
            loader,
            logo
        },
        mixins: [
            globalMainMixins,
            ajaxMixins,
        ],
        computed: {
            appTitle() {
                return this.$store.getters.getAppTitle.name;
            },
            subTitle() {
                return this.$store.getters.getAppTitle.description;
            }
        },
        mounted() {
            this.$store.dispatch('setPageTitle', false);
            if (this.initialLoad) {
                let initialLoader = document.getElementById("initialLoader");
                document.body.removeChild(initialLoader);
                this.title = technomad.initialData.title;
                this.content = technomad.initialData.content;
                this.documentTitle = technomad.bloginfo.name + " - " + technomad.bloginfo.description;
                this.$store.dispatch("setInitialLoadFalse");
                this.$store.dispatch('setLoaderFalse');
                this.$store.dispatch("setDocumentTitle", this.documentTitle);
                this.loader = false;
                this.mountedStuff();
            } else {
                this.loader = true;
                var host = technomad.host;
                var path = host + "/wp-json/technomad/frontpage/";
                axios.get(path)
                    .then(response => {
                        console.log("response.data", response.data);
                        this.documentTitle = technomad.bloginfo.name + " - " + technomad.bloginfo.description;
                        this.content = response.data.content;
                        this.$store.dispatch('setLoaderFalse');
                        this.$store.dispatch("setDocumentTitle", this.documentTitle);
                        this.loader = false;
                        this.ajaxStuff();
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
        activated() {
            this.$store.dispatch("setPageTitle", false);
            this.$store.dispatch('setLoaderFalse');
            this.$store.dispatch("setDocumentTitle", this.documentTitle);
        },

    }
</script>
<style lang="less">
    @import (reference) "~@styles/variables";

    body[data-page-slug="Homepage"] {
        #wue_svg {
            margin: 4rem auto 0;
        }
    }
    #homePageTitle {
        font-size: 3rem;
        padding: 3rem 0 1.5rem;
        font-weight: 400;
    }

    
    @media (max-width: @inner_container_width_px) {
            #homePageTitle {
                height: auto;
                font-size: 2.5rem;
            }
    }


    @media (max-width: 479px) {
            #homePageTitle {
                height: auto;
                font-size: 2rem;
        }
    }
</style>