<template>
    <div>
        <div>
          站名搜尋 <input type="text" v-model="search">
        </div>
    </div>
</template>
<script>
export default {
    name:"Search",
    data(){
        return {
        }
    },
    computed :{
        search:{
           get(){
               return this.$store.state.searchStation;
           },
           set(val){
               this.$store.commit('setSearchName', val); 
           }
           
        },
    }
}
</script>