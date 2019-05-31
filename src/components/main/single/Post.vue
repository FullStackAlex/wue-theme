<template>
    <section id="pageWrapper" class="outer-container single-post">
        <loader v-if="loader"></loader>
        <div class="post-time inner-container" v-if="post.date">
            <span class="date" v-if="initialLoad">
                            {{post.date}}
                        </span>
            <span class="date" v-else>
                            {{ new Date(post.date).toLocaleString('en-us', { year: 'numeric', month: 'long', day: 'numeric' })}}
                        </span>
            <span class="update" v-if="post.update && post.update !== post.date"><br>(Updated: {{post.update}})</span>
            <span class="update" v-else-if="checkDateVsModified(post.date, post.modified)">
                <br>{{checkDateVsModified(post.date, post.modified)}}
            </span>
        </div>
        <div id="single-post" class="blog-post post inner-container" v-html="content"></div>
    </section>
</template>
<script>
    import axios from "axios"
    import ajaxMixins from "~/mixins/ajaxMixins"
    import globalMainMixins from "~/mixins/globalMainMixins"
    import loader from "~/components/ui/loaders/Main"

    export default {
        name: 'Post',
        data() {
            return {
                postPromise: null,
                initialLoad: this.$store.getters.isInitialLoad,
                content: "",
                post: {},
                title: null,
                documentTitle: technomad.bloginfo.name,
                loader: true
            }
        },
        components: {
            loader
        },
        mixins: [
            globalMainMixins,
            ajaxMixins
        ],
        methods: {},
        computed: {
            slug() {
                return this.$route.params.slug;
            },

        },
        watch: {},
        beforeMount() {
        },
        mounted() {
            if (this.initialLoad) {
                let initialLoader = document.getElementById("initialLoader");
                document.body.removeChild(initialLoader);
                this.content = technomad.initialData.post.content.rendered;
                this.post = technomad.initialData.post;
                this.$store.dispatch("setInitialLoadFalse");
                this.$store.dispatch('setLoaderFalse');
                this.title = technomad.initialData.title;
                this.$store.dispatch("setPageTitle", this.title);
                this.documentTitle = this.title + " - " + technomad.bloginfo.name;
                this.$store.dispatch('setDocumentTitle', this.documentTitle);
                this.loader = false;
                this.mountedStuff();
            } else {
                this.loader = true;
                var host = technomad.host;
                var path = host + "/wp-json/wp/v2/posts?slug=" + this.$route.params.slug;
                axios.get(path)
                    .then(response => {
                        this.post = response.data[0];
                        this.content = this.post.content.rendered;
                        this.$store.dispatch("setPageTitle", this.post.title.rendered);
                        this.title = this.post.title.rendered;
                        this.$store.dispatch('setLoaderFalse');
                        this.documentTitle = this.title + " - " + technomad.bloginfo.name;
                        this.$store.dispatch('setDocumentTitle', this.documentTitle);
                        this.loader = false;
                        this.ajaxStuff();
                    })
                    .catch(error => {
                        console.log("error", error);
                        this.$store.dispatch('setLoaderFalse');
                    });

            }
        },
        updated() {
        },
        activated() {
            this.$store.dispatch('setLoaderFalse');
            this.$store.dispatch("setPageTitle", this.title);
            this.$store.dispatch('setDocumentTitle', this.documentTitle);
        }
    }
</script>,
<style lang="less">
    @import "~@node_modules/magnific-popup/dist/magnific-popup.css";
    @import "~@styles/variables";
    @import "~@styles/flex";
    @import "~@styles/mixins";

    [data-page-slug="Post"] {
        #main_header {

            #page_title {
                font-size: 2.5rem;
                @media (max-width: @tablet_width_max) {
                    font-size: 1.75rem;
                }
            }
        }

        #main_header_title {
            margin-bottom: 2rem;
            //filter: drop-shadow(0 0.25rem 0.125rem rgba(0, 0, 0, 0.5));
        }

        #pageWrapper.single-post {
            .blog-post {
                overflow-x: hidden;
                overflow-y: auto;

                p {
                    a {
                        color: @green !important;
                    }

                }
            }

            .post-time {
                font-weight: bold;
                color: grey;
                font-size: 2rem;
                text-transform: uppercase;
                text-align: center;
                @media (max-width: @tablet_width_max) {
                    font-size: 1rem;
                }
            }
        }
    }


</style>