<template>
    <div v-bind:class="[loaderClasses, 'loader']">
        <div class="ball-scale-multiple">
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'LoaderBallWave',
        props: ["loaderClasses"]
    }
</script>
<style lang="less">

    @import "~@styles/variables";
    @import "~@styles/flex";
    @import "~@styles/mixins";


    .loader {
        .flex();
        .flexColumn();
        .justifyCenter();
        .alignItemsCenter();
        flex: 0 1 auto;
        flex-grow: 1;
        flex-shrink: 0;
        flex-basis: 25%;
        width: 100%;
        height: 20vh;
        min-height: 20rem;
        transition: all .3s ease;

        .ball-scale-multiple {
            position: relative;
            transform: translateY(-30px);

            div {
                background-color: black;
                border-radius: 100%;
                position: absolute;
                left: -30px;
                top: 0;
                opacity: 0;
                margin: 0;
                width: 60px;
                height: 60px;
                animation: ball-scale-multiple 1s 0s linear infinite;

                &:nth-child(2) {
                    animation-delay: -.4s;
                }

                &:nth-child(3) {
                    animation-delay: -.2s;
                }
            }
        }

        @-webkit-keyframes ball-scale-multiple {
            0% {
                -webkit-transform: scale(0);
                transform: scale(0);
                opacity: 0
            }

            5% {
                opacity: 1
            }

            100% {
                -webkit-transform: scale(1);
                transform: scale(1);
                opacity: 0
            }
        }

        @keyframes ball-scale-multiple {
            0% {
                -webkit-transform: scale(0);
                transform: scale(0);
                opacity: 0
            }

            5% {
                opacity: 1
            }

            100% {
                -webkit-transform: scale(1);
                transform: scale(1);
                opacity: 0
            }
        }

        .ball-scale-multiple {
            position: relative;
            -webkit-transform: translateY(-30px);
            transform: translateY(-30px)
        }

        .ball-scale-multiple > div:nth-child(2) {
            -webkit-animation-delay: -.4s;
            animation-delay: -.4s
        }

        .ball-scale-multiple > div:nth-child(3) {
            -webkit-animation-delay: -.2s;
            animation-delay: -.2s
        }

        .ball-scale-multiple > div {
            position: absolute;
            left: -30px;
            top: 0;
            opacity: 0;
            margin: 0;
            width: 60px;
            height: 60px;
            -webkit-animation: ball-scale-multiple 1s 0s linear infinite;
            animation: ball-scale-multiple 1s 0s linear infinite
        }

    }
    .loader.none{
        height: 0;
        opacity: 0;
    }


</style>