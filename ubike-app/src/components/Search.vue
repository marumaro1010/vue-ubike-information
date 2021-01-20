<template>
    <div>
        <div>
          站名搜尋 <input type="text" v-model="inputStation">
        </div>
    </div>
</template>
<script>
export default {
    name:"Search",
    props:{
        searchStation:String
    },
    data(){
        return {
            inputStation:this.searchStation
        }
    },
    watch:{
        inputStation:function(val){
           this.$emit('searchName', val);
        },
    }
}
</script>