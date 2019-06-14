import axios from "axios"

export default {

    data() {
        return {
            currentPage: 1,
            totalPages: technomad.archives.blog.totalPages,
            lastScrollPosition: 0,
            loadingMore: false,
            scrollListenerAdded: false
        }
    },
    methods: {
        initPagination() {
            let vm = this;
            /**
             * set a flag to prevent multiple scroll listeners being added on each "mounted" and "activated" call
             **/
            this.scrollListenerAdded = true;
            
            
            /**
             * set the initial scroll position to be able to detect scroll direction later on
             **/
            this.lastScrollPosition = this.windowScrollTop();

            /**
             * set all available posts and the total count of available  pages
             * if the page is loaded via ajax then this properties will be set in ajaxMixins.js
             **/
            this.totalPages = technomad.initialData.totalPages;
            this.totalPosts = parseInt(technomad.initialData.totalPosts);

            document.addEventListener('scroll', function (e) {

                /**
                 * detect scroll direction and whether the bottom of the page is reached
                 * and then call the loadMorePosts method
                 **/
                let scrollDirection = vm.getScrollDirection(vm);
                let scrollTop = vm.windowScrollTop();
                vm.lastScrollPosition = scrollTop;

                var docHeight = vm.documentHeight();
                if (scrollDirection === "down" && scrollTop + window.innerHeight >= docHeight && vm.loadingMore === false) {
                    if(vm.currentPage < vm.totalPages){
                        vm.loadMorePosts(vm);
                    }
                }
            }, false);
        },
        loadMorePosts(vm) {
            /**
             * flag for loader animation and to prevent a call of this function
             * if the previously requested posts were not loaded yet
             **/
            vm.loadingMore = true;
            
            /**
             * concatenate the ajax path
             **/
            let host = technomad.host;
            let endpoint = "/wp-json/wp/v2/posts?";
            let postsPerPage = "per_page=" + technomad.archives.blog.postsPerPage;
            let page = "&page=" + (vm.currentPage + 1);
            let path = host + endpoint + postsPerPage + page + "&_embed";

            axios.get(
                path,
                {
                    /**
                     * https://codex.wordpress.org/WordPress_Nonces
                     **/
                    headers: {
                        'X-WP-Nonce': technomad.nonce
                    }
                },
            ).then(response => {


                vm.currentPage++;
                vm.loadingMore = false;

                /**
                 * add new posts to the DOM
                 **/
                response.data.forEach(function (post) {
                    vm.posts.push(post);
                });


            }).catch(error => {
                console.log("error", error);
                console.log("Request failed: ");
                console.log(error.response);

            });

        },
        documentHeight() {
            var body = document.body,
                html = document.documentElement;
            var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
            return height;
        },
        windowScrollTop() {
            return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        },
        getScrollDirection(vm) {
            if (vm.lastScrollPosition < vm.windowScrollTop()) {
                return "down";
            } else if (vm.lastScrollPosition > vm.windowScrollTop()) {
                return "up";
            }
        }
    },
    mounted() {
        if (!this.scrollListenerAdded) {
            this.initPagination();
        }
    },
    activated() {
        if (!this.scrollListenerAdded) {
            this.initPagination();
        }
    }

}
