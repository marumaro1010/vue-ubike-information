<template>
    <div>
        <span class="pageSpan" v-for="count in totalPage" :key="count">
            <a :class="{active: currentPage == count ? isActive = true:  isActive = false}" href="#" @click="selectCurrentPage(count)">{{ count }}</a>
        </span>
        <p>共 {{ totalPage }} 頁 , 目前頁數 {{ currentPage }}</p>
    </div>
</template>
<script>
export default {
    props:{
        totalPage:Number,
        currentPage:Number
    },
    data(){
        return{
            isActive : false
        }
    },
    computed:{

    },
    methods:{
        selectCurrentPage(count){
            this.$emit('receiveCurrentPage', count);
        }
    }
}
</script>
<style scoped>
.active::before {
  content: '【';
}
.active::after {
  content: '】';
}
.active{
    color:red;
}
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