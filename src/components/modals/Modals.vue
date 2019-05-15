<template>
    <div id="modal_container" v-if="currentModal">
        <component :is="currentModal"></component>
    </div>
</template>
<script>


    export default {
        name: 'Modals',
        props: {},
        computed: {
            currentModal(){
                if(this.$store.getters.getCurrentModal){
                    return this.$store.getters.getCurrentModal.name;
                }else{
                    return this.$store.getters.getCurrentModal;
                }
            }
        },
        watch: {
            currentModal(value){
                //console.log("currentModal watch value", value);
            }
        }
    }
</script>
<style scoped>

</style>