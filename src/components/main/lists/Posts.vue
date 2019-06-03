<template>
    <section id="pageWrapper" class="outer-container posts">
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
                    <div class="img-container" v-if="initialLoad" v-html="post.img"></div>
                    <div class="img-container" v-else>
                        <template v-if="post._embedded['wp:featuredmedia']">
                            <img :src="post._embedded['wp:featuredmedia'][0].media_details.sizes.medium_large.source_url"
                                 alt="">
                        </template>
                    </div>
                    <div class="post-time" v-if="post.date">
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
                    <h2 class="post-name" v-html="post.title.rendered"></h2>
                    <p v-html="post.excerpt.rendered" v-if="technomad.archives.news.excerpt"></p>
                    <p v-html="post.content.rendered" v-else></p>
                </router-link>
            </article>
        </div>
    </section>
</template>
<script>

    import axios from "axios"
    import ajaxMixins from "~/mixins/ajaxMixins"
    import globalMainMixins from "~/mixins/globalMainMixins"
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
                documentTitle: technomad.bloginfo.name,
                loader: true,
                technomad: technomad
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
            if (this.initialLoad) {
                this.initialStuff({
                    title:technomad.archives.news.title
                });
            } else {
                this.loader = true;
                var host = technomad.host;
                var path = host + "/wp-json/wp/v2/posts?_embed";
                console.log( "path", path );
                axios.get(path)
                    .then(response => {
                        this.posts = response.data;
                        this.ajaxStuff({
                            response,
                            responseData: response.data,
                            title:technomad.archives.news.title
                        })
                    })
                    .catch(error => {
                        console.log("error", error);
                    });

            }
        },
        activated() {
            this.activatedStuff();
        },
    }
</script>
<style lang="less">
    @import "~@styles/variables";
    @import "~@styles/flex";
    @import "~@styles/mixins";


    #pageWrapper.posts {

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

                    .img-container {
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

                    .post-name {
                        color: @green;
                    }
                }
            }
        }

        .post-time {
            font-weight: bold;
            color: grey;
            font-size: 1rem;
            text-transform: uppercase;
        }
    }
</style>
