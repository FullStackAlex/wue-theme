<template>
    <div id="pageWrapper" class="outer-container">
        <loader v-if="loader"></loader>
        <div class="inner-container" v-html="post.content"></div>
    </div>
</template>
<script>

    import axios from "axios";
    import ajaxMixins from "~/mixins/ajaxMixins"
    import globalMainMixins from "~/mixins/globalMainMixins"
    import loader from "~/components/ui/loaders/Main"

    export default {
        name: 'Page',
        data: function () {
            return {
                initialLoad: this.$store.getters.isInitialLoad,
                loader: true,
                documentTitle: technomad.siteInfo.name,
                post:{
                    title: null,
                    content:null,
                    datePublished: null,
                    dateModified: null,
                },
            }
        },
        components: {
            loader
        },
        mixins: [
            globalMainMixins,
            ajaxMixins,
        ],
        mounted() {
            if (this.initialLoad) {
                this.initialStuff();
            } else {
                this.loader = true;
                this.ajaxStatus = "pending";
                var path = technomad.host + "/wp-json/wp/v2/pages?slug=" + this.$route.params.slug;
                axios.get(path)
                    .then(response => {
                        this.ajaxStuff({
                            response,
                            responseData: response.data[0]});
                    })
                    .catch(error => {
                        this.$store.dispatch('setLoaderFalse');
                        console.log("error", error);
                    });

            }
        },
        activated() {
            this.activatedStuff();
        },
    }
</script>
<style lang="less" scoped>
    @import "~@styles/variables";


    #pageWrapper {
        text-align: center;
    }

</style>