<template>
    <span>{{ count }}</span>
</template>
<script>
export default {
    props:{
        count:Number,
        currentPage:Number
    },
}
</script>
<style scoped>
.pagination{
    margin:20px 0 0 0;
	font-size:12;
	text-align:center;
}
span{
    cursor: pointer;
    margin-left:10px;
}
.page-current{
    color:red;
}
</style>