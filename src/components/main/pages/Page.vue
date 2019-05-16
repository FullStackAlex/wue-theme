<template>
    <div id="page_wrapper" class="outer-container">
        <loader v-if="loader"></loader>
        <div class="inner-container" v-html="content"></div>
    </div>
</template>
<script>

    import axios from "axios";
    import ajaxMixins from "~/mixins/ajax"
    import globalMainMixins from "~/mixins/globalMain"
    import loader from "~/components/ui/loaders/Main"

    export default {
        name: 'Page',
        data: function () {
            return {
                initialLoad: this.$store.getters.isInitialLoad,
                content: null,
                page: null,
                title: null,
                document_title: technomad.bloginfo.name,
                loader: true,
            }
        },
        components: {
            loader
        },
        methods: {},
        mixins: [
            globalMainMixins,
            ajaxMixins,
        ],
        computed: {},
        beforeMount() {
        },
        mounted() {

            if (this.initialLoad) {
                let initial_loader = document.getElementById("initial_loader");
                document.body.removeChild(initial_loader);
                this.content = technomad.initialData.content;
                this.title = technomad.initialData.title;
                this.document_title = this.title + " - " + technomad.bloginfo.name;
                this.$store.dispatch("setInitialLoadFalse");
                this.$store.dispatch('setLoaderFalse');
                this.$store.dispatch("setPageTitle", this.title);
                this.$store.dispatch('setDocumentTitle', this.document_title);
                this.loader = false;
            } else {
                this.loader = true;
                var host = technomad.host;
                var path = host + "/wp-json/wp/v2/pages?slug=" + this.$route.params.slug;
                axios.get(path)
                    .then(response => {
                        console.log("response.data", response.data);
                        this.page = response.data[0];
                        this.content = this.page.content.rendered;
                        this.title = this.page.title.rendered;
                        this.document_title = this.title  + " - " + technomad.bloginfo.name;
                        this.$store.dispatch('setLoaderFalse');
                        this.$store.dispatch("setPageTitle", this.title);
                        this.$store.dispatch('setDocumentTitle', this.document_title);
                        this.loader = false;
                    })
                    .catch(error => {
                        this.$store.dispatch('setLoaderFalse');
                        console.log("error", error);
                    });

            }
        },
        created() {
        },
        updated() {
        },

        beforeCreate() {
        },
        destroyed() {
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
<style lang="less" scoped>
    @import "~@styles/variables";



    #page_wrapper{
        text-align: center;
    }

</style>