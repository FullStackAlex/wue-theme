<template>
    <svg id="vue_svg" data-name="vue svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 410 220.8">
        <defs>

        </defs>
        <title>Wue - The first Vue WordPress Theme</title>
        <path class="cls-1" d="M50.56,0,128,133.12,204.8,0H157.44L128,51.2,97.92,0Z"/>
        <polygon class="cls-2"
                 points="410 0 358.8 0 282 132.48 204.8 0 204.68 0.21 204.56 0 128 132.48 50.56 0 0 0 128 220.8 205 87.97 282 220.8 410 0"/>
        <path class="cls-1" d="M204.56,0,282,133.12,358.8,0H311.44L282,51.2,251.92,0Z"/>
    </svg>
</template>
<script>

    export default {
        name: 'Logo',
        props: {},
    }
</script>
<style scoped lang="less">
    #vue_svg {
        max-width: 20rem;
        width: 100%;
        margin: auto;
        display:block;
    }

    .cls-1 {
        fill: #35495e;
    }

    .cls-2 {
        fill: #41b883;
    }

</style>