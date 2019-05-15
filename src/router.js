import Vue from 'vue'
import VueResource from "vue-resource";
import VueRouter from 'vue-router'

Vue.use(VueResource);
Vue.use(VueRouter);


export default new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    saveScrollPosition: true,
    scrollBehavior(to, from, savedPosition) {
        return new Promise((resolve, reject) => {
            resolve({x: 0, y: 0})
        })
    },
    routes: [
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
            path: '/'+ technomad.blogpath,
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
            path: '/thema/:slug',
            name: 'Thema',
            component: () => import('~/components/main/single/Thema.vue')
        },
        {
            path: '/:slug',
            name: 'Page',
            component: () => import( '~/components/main/pages/Page.vue')
        }
    ]
});
