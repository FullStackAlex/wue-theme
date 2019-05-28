<template>
    <section id="pageWrapper" class="outer-container">
        <loader v-if="loader"></loader>
        <div id="single-post" class="blog-post post inner-container" v-html="content"></div>
    </section>
</template>
<script>
    import axios from "axios"
    import ajaxMixins from "~/mixins/ajax"
    import globalMainMixins from "~/mixins/globalMain"
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
        methods: {
        },
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


    #main_header_title {
        margin-bottom: 2rem;
        //filter: drop-shadow(0 0.25rem 0.125rem rgba(0, 0, 0, 0.5));
    }



</style>