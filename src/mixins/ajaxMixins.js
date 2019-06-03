export default {
    methods: {

        ajaxStuff(args) {
            
            /**
             * defined in globalMainMixins.js
             **/
            this.setInternalRouterLinksInsideContent();
            
            
            this.loader = false;
            this.$store.dispatch('setLoaderFalse');
            
            
            /**
             * if single post or page
             **/
            if (this.post) {
                if (args.post) {
                    this.post = args.post;
                } else if (args.responseData) {
                    this.post = args.responseData;
                } else {
                    throw "No ajax responseData";
                }
                if (this.post) {
                    this.post.datePublished = this.post.date;
                    this.post.dateModified = this.post.modified;
                }

                if (args.content) {
                    this.post.content = args.content;
                } else if (this.post.content.rendered) {
                    this.post.content = this.post.content.rendered;
                } else {
                    throw "No ajax content";
                }

                if (args.title) {
                    this.title = args.title;
                } else if (this.post.title.rendered) {
                    this.title = this.post.title.rendered;
                } else {
                    throw "No ajax title";
                }
                /**
                 * we can't check here the value being "falsy", as "false" can be the desired value
                 * (which disables pageTitle for this page)
                 **/
                if (args.pageTitle === undefined) {
                    this.pageTitle = this.title;
                } else {
                    this.pageTitle = args.pageTitle;
                }


                if (args.documentTitle) {
                    this.documentTitle = args.documentTitle;
                } else {
                    this.documentTitle = this.title + " - " + technomad.bloginfo.name;
                }

            }
            /**
             * if list of posts
             **/
            else if (this.posts) {
                if (args.posts) {
                    this.posts = args.posts;
                } else if (args.responseData) {
                    this.posts = args.responseData;
                } else {
                    throw "No ajax responseData";
                }

                if (args.title) {
                    this.title = args.title;
                } else {
                    throw "No ajax title";
                }
                /**
                 * we can't check here the value being "falsy" as "false" can be the desired value
                 * (which disables pageTitle for this page)
                 **/
                if (args.pageTitle === undefined) {
                    this.pageTitle = this.title;
                } else {
                    this.pageTitle = args.pageTitle;
                }


                if (args.documentTitle) {
                    this.documentTitle = args.documentTitle;
                } else {
                    this.documentTitle = this.title + " - " + technomad.bloginfo.name;
                }
            }
            this.$store.dispatch('setPageTitle', this.pageTitle);
            this.$store.dispatch("setDocumentTitle", this.documentTitle);
        },
        scrollToTop(next) {

        }
    },
    beforeRouteUpdate(to, from, next) {
        //this.scrollToTop(next);
        next();
    },
    beforeRouteLeave(to, from, next) {
        //this.scrollToTop(next);
        next();
    },
}