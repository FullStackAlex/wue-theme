// scripts for all main components

export default {

    methods: {
        setInternalRouterLinksInsideContent() {

            /**
             * passes absolute public path links like <a href="/bla">Bla</a> inside any page or post content to the vue router
             **/
            var vm = this;
            setTimeout(() => {
                let pageWrapper = document.getElementById("pageWrapper");
                let links = pageWrapper.getElementsByTagName("A");
                links = Array.from(links);
                links.forEach(function (link) {
                    let href = link.getAttribute("href");
                    if (href.indexOf("/") === 0) {
                        link.addEventListener("click", function (e) {
                            e.preventDefault();
                            vm.$router.push(href);
                        }, false);
                    }
                });

            }, 500);
        },

        /**
         * setup content of the component and global data (page title, document title, etc )
         * if the current page is an entry page (initial load)
         * see "ajaxStuff" method  for setup on route change once initial load is finished (ajax load)
         **/
        initialStuff(args) {
            console.log("%c initialStuff", "background: #770000; color:white");
            this.setInternalRouterLinksInsideContent();
            let initialLoader = document.getElementById("initialLoader");
            document.body.removeChild(initialLoader);

            let yoastTitle = technomad.yoastTitle;
            if (yoastTitle === undefined || yoastTitle.length < 1) {
                yoastTitle = false;
            }
            let argsDocumentTitle;
            if (!(args && args.documentTitle)) {
                argsDocumentTitle = false;
            } else {
                argsDocumentTitle = args.documentTitle;
            }

            this.$store.dispatch("setInitialLoadFalse");
            this.$store.dispatch('setLoaderFalse');
            this.loader = false;

            /**
             * if single post or page
             **/
            if (technomad.initialData.post) {
                this.post = technomad.initialData.post;
                this.title = this.post.title;


                this.documentTitle = yoastTitle || argsDocumentTitle || this.title + " - " + technomad.siteInfo.name;


                if (args) {
                    if (args.title) {
                        this.title = args.title
                    }
                    if (args.pageTitle === undefined) {
                        this.$store.dispatch('setPageTitle', this.title);
                    } else {
                        this.$store.dispatch('setPageTitle', args.pageTitle);
                    }
                } else {
                    this.$store.dispatch('setPageTitle', this.title);
                }

                /**
                 * if a list of posts:
                 **/
            } else if (technomad.initialData.posts) {
                this.posts = technomad.initialData.posts;


                this.documentTitle = yoastTitle || argsDocumentTitle || this.title + " - " + technomad.siteInfo.name;

                /**
                 * if any parameter is set
                 **/
                if (args) {
                    /**
                     * if parameter "title" is set
                     **/
                    if (args.title) {
                        this.title = args.title
                    }
                    /**
                     * if parameter "pageTitle" is set (explicitly false or string)
                     **/
                    if (args.pageTitle === undefined) {
                        this.$store.dispatch('setPageTitle', this.title);
                    } else {
                        this.$store.dispatch('setPageTitle', args.pageTitle);
                    }
                } else {
                    /**
                     * if no parameters at all were attached to the callback
                     **/
                    this.$store.dispatch('setPageTitle', this.title);
                }
            }

            this.$store.dispatch("setDocumentTitle", this.documentTitle);

        },
        activatedStuff(args) {
            let firstTimeActivation = this.$store.getters.isFirstTimeActivation;

            /**
             * run only if the activated hook is called after ajaxStuff or mountedStuff
             **/
            if (!firstTimeActivation && this.ajaxStatus !== "pending") {
                console.log("%c activatedStuff", "background: green; color:white");
                /**
                 * setup global data if component was already loaded previously
                 * (either ajaxStuff or initialStuff completed)
                 **/
                this.$store.dispatch('setLoaderFalse');
                this.$store.dispatch("setDocumentTitle", this.documentTitle);
                if (args) {
                    if (args.pageTitle === undefined) {
                        this.$store.dispatch('setPageTitle', this.title);
                    } else {
                        this.$store.dispatch('setPageTitle', args.pageTitle);
                    }
                } else {
                    this.$store.dispatch('setPageTitle', this.title);
                }
            }

            this.$store.dispatch('setFirstTimeActivationFalse');
        },

        /**
         * check if publish date is equal to modified, if so: don't show modified/updated date
         **/
        checkDateVsModified(date, modified) {

            if (modified !== undefined) {

                /**
                 * compare dates without time (WP Rest API loads date with time)
                 **/
                if (new Date(modified).toLocaleString('en-us', {year: 'numeric', month: 'long', day: 'numeric'})
                    ===
                    new Date(date).toLocaleString('en-us', {year: 'numeric', month: 'long', day: 'numeric'}))
                {
                    return false;
                } else {
                    return "(Updated: " + new Date(modified).toLocaleString('en-us', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }) + ")"
                }
            }
        }

    }

}