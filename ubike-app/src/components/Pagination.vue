<template>
    <span class="pageSpan">
        <span v-if="count == currentPage">【</span><a href="#" @click="selectCurrentPage(count)">{{ count }}</a><span v-if="count == currentPage">】</span>
    </span>
</template>
<script>
export default {
    props:{
        count:Number,
        currentPage:Number
    },
    methods:{
        selectCurrentPage(count){
            this.$emit('receiveCurrentPage', count);
        }
    }
}
</script>
<style scoped>
.pagination{
    margin:20px 0 0 0;
	font-size:12;
	text-align:center;
}
.pageSpan{
    cursor: pointer;
    margin-left:10px;
}
.pagecurrent{
    color:red;
}
</style>