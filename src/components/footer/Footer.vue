<template>
    <footer>
        <footer-navigation></footer-navigation>
    </footer>
</template>
<script>
    import FooterNavigation from "~/components/nav/FooterNavigation"
    export default {
        name: 'Footer',
        props: {},
        data() {
            return {
            }
        },
        components: {
            FooterNavigation
        },
        watch: {
            "$route"(to, from) {
                //console.log("to");
                //console.log(to);
                //console.log("from");
                //console.log(from);
            }
        },
        methods: {},
        beforeMount() {
        },
    }
</script>
<style scoped lang="less">

</style>