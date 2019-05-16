<template>
    <section id="page_wrapper" class="outer-container">
        <loader v-if="loader"></loader>
        <div class="inner-container" id="posts">
            <article v-for="(post,index) in posts" class="post">
                <router-link
                        :to="{
                            name: 'Post',
                            params:{
                                slug: post.slug,
                            }
                        }" active-class="active">
                    <div class="img_container" v-if="initialLoad" v-html="post.img"></div>
                    <div class="img_container" v-else>
                        <template v-if="post._embedded['wp:featuredmedia']">
                            <img :src="post._embedded['wp:featuredmedia'][0].media_details.sizes.medium_large.source_url"
                                 alt="">
                        </template>
                    </div>
                    <h2 class="post_name" v-html="post.title.rendered"></h2>
                    <p v-html="post.content.rendered"></p>
                </router-link>
            </article>
        </div>
    </section>
</template>
<script>

    import axios from "axios"
    import ajaxMixins from "~/mixins/ajax"
    import globalMainMixins from "~/mixins/globalMain"
    import loader from "~/components/ui/loaders/Main"



    export default {
        name: 'Posts',
        props: {},
        data() {
            return {
                initialLoad: this.$store.getters.isInitialLoad,
                posts: null,
                post_id: "",
                content: "",
                title: "News",
                document_title: technomad.bloginfo.name,
                loader: true,
            }
        },
        mixins: [
            globalMainMixins,
            ajaxMixins
        ],
        components: {
            loader
        },
        methods: {},
        mounted() {
            this.$store.dispatch('setPageTitle', false);
            if (this.initialLoad) {
                this.posts = technomad.initialData.posts;
                let initial_loader = document.getElementById("initial_loader");
                this.title = technomad.archives.news.title;
                document.body.removeChild(initial_loader);
                this.$store.dispatch("setInitialLoadFalse");
                this.$store.dispatch('setLoaderFalse');
                this.document_title = this.title + " - " + technomad.bloginfo.name;
                this.$store.dispatch('setDocumentTitle', this.document_title);
                this.loader = false;
            } else {
                this.loader = true;
                var host = technomad.host;
                var path = host + "/wp-json/wp/v2/posts?_embed";
                axios.get(path)
                    .then(response => {
                        console.log("response.data", response.data);
                        this.posts = response.data;
                        this.title = technomad.archives.news.title;
                        this.document_title = this.title + " - " + technomad.bloginfo.name;
                        this.$store.dispatch('setDocumentTitle', this.document_title);
                        this.$store.dispatch('setLoaderFalse');
                        this.loader = false;
                    })
                    .catch(error => {
                        console.log("error", error);
                    });

            }
        },
        beforeMount() {
        },
        activated() {
            this.$store.dispatch('setLoaderFalse');
            this.$store.dispatch("setPageTitle", this.title);
            this.$store.dispatch('setDocumentTitle', this.document_title);
        },
        deactivated() {

        },
    }
</script>
<style lang="less">
    @import "~@styles/variables";
    @import "~@styles/flex";
    @import "~@styles/mixins";


    [data-page-slug="post"] {
        #main_header {

            #page_title {
                font-size: 2.5rem;
                @media (max-width: @tablet_width_max) {
                    font-size: 1.75rem;
                }
            }
        }
    }

    .post-name {
        color: black
    }

    #posts {

        .flex();
        .flexWrap();
        .justifyAround();
        max-width: @inner_container_width;
        margin: auto;
        padding-top: 1rem;
        .post {
            box-sizing: border-box;
            background-color: rgba(255, 255, 255, 0.75);
            padding: 0.625rem 2rem;
            width: 100%;
            position: relative;
            border-radius: 0.9375rem;
            .defaultTransition();
            margin-bottom: 2.5rem;
            overflow: hidden;
            transform: scale(1.02);
            box-shadow: 0 0.1rem 0.2rem #555;


            &:hover {
                box-shadow: 0 0.5rem 1rem #555;
                border-color: transparent;
                transform: translate(0px, 5px) scale(1.04, 1.04);
            }

            @media (max-width: @inner_container_width_px) {
                transform: scale(1) !important;

            }

            a {
                color: black;
                text-decoration: none;

                .img_container {
                    height: auto;
                    .flex();
                    .alignItemsCenter();

                    img {
                        display: block;
                        margin: auto;
                        width: 100%;
                        height: auto;
                    }
                }

                .post_name {
                    color: @green;
                }
            }
        }
    }
</style>
