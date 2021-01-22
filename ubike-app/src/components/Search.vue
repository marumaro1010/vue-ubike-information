<template>
    <div>
        <div>
          站名搜尋 <input type="text" v-model="searchStation">
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
        searchStation:{
           get:function(){
               return this.searchStation;
           },
           set:function(val){
                this.$emit('receiveSearchName', val);
           }
           
        },
    }
}
</script>