import Vue from 'vue'
import VueResource from "vue-resource";
import VueRouter from 'vue-router'

Vue.use(VueResource);
Vue.use(VueRouter);


export default new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    saveScrollPosition: true,
    routes: [
        {
            path: '/',
            component: {
                template: "<router-view></router-view>"
            },
            children: [
                {
                    path: '',
                    name: "Homepage",
                    component: () => import('~/components/main/pages/Home.vue')
                },
                {
                    /**
                     *
                     * List Posts
                     *
                     * */
                    path: technomad.blogpath,
                    component: {
                        template: "<router-view></router-view>"
                    },
                    children: [
                        {
                            /**
                             *
                             * Blog Post List
                             *
                             * */
                            path: '',
                            name: "Posts",
                            component: () => import("~/components/main/lists/Posts"),
                        }, {
                            /**
                             *
                             * Single Blog Post
                             *
                             * */
                            path: ':slug',
                            name: "Post",
                            component: () => import("~/components/main/single/Post"),
                        },
                    ]
                },
                {
                    path: ':slug',
                    name: 'Page',
                    component: () => import( '~/components/main/pages/Page.vue')
                }
            ]
        }
    ]
});
