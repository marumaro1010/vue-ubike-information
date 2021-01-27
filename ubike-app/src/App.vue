<template>
  <div id="app">
    <search
      @receiveSearchName="updateSearchName"
    ></search>
    <pagination
      @receiveCurrentPage="updateCurrentPage"
      :totalPage="totalPage"
    />
    <table class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>場站名稱</th>
          <th>場站區域</th>
          <th><a :class="getSortSbiClass" href="#" @click="setSort('sbi')">目前可用車輛</a></th>
          <th><a :class="getSortTotClass" href="#" @click="setSort('tot')">總停車格</a></th>
          <th>資料更新時間</th>
        </tr>
      </thead>
      <tbody>
        <ubike-table v-for="s in sortStops" 
          :key="s.sno"
          :sno="s.sno"
          :sna="s.sna"
          :sarea="s.sarea"
          :sbi="s.sbi"
          :tot="s.tot"
          :mday="timeFormat(s.mday)"
        ></ubike-table>
      </tbody>
    </table>
  </div>
</template>

<script>
import Pagination from './components/Pagination.vue'
import Search from './components/Search.vue'
import UbikeTable from './components/UbikeTable.vue'

export default {
  name: 'App',
  components: {
    Pagination,
    Search,
    UbikeTable
  },
  data(){
    return{
    }
  },
  created(){
    this.$store.dispatch('fetchLocations');
  },
  watch:{
    //有搜尋變動,回初始值第一頁
    searchStation:function(){
      this.$store.state.currentPage = 1;
    }
  },
  computed:{
      getSortSbiClass:{
        get(){
          return this.$store.getters.getSortSbiClass;
        },
        set(value){
          this.$store.commit('setSortType', value);
        }
      },
      getSortTotClass:{
        get(){
          return this.$store.getters.getSortTotClass;
        },
        set(value){
          this.$store.commit('setSortType', value);
        }
      },
      setIsDesc:{
        get(){
          return this.$store.state.isDesc;
        },
        set(value){
          this.$store.commit('setIsDesc', value);
        }
      },
      fliterStops(){
        return this.$store.getters.fliterStops;
      },
      sortStops(){
        return this.$store.getters.sortStops;
      },
      start(){
        return this.$store.getters.start;
      },
      end(){
        return this.$store.getters.end;
      },
      totalPage(){
        return this.$store.getters.totalPage;
      }
  },
  methods:{
      updateSearchName(val){
          this.searchStation = val;
      },
      setSort(val){
        this.getSortSbiClass = val;
        this.setIsDesc = !this.setIsDesc;
      },
      timeFormat(t){

        var date = [], time = [];

        date.push(t.substr(0, 4));
        date.push(t.substr(4, 2));
        date.push(t.substr(6, 2));
        time.push(t.substr(8, 2));
        time.push(t.substr(10, 2));
        time.push(t.substr(12, 2));

        return date.join("/") + ' ' + time.join(":");
      },
      updateCurrentPage(currentPage){
        this.$store.state.currentPage = currentPage;
      }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.defaultSort::after {
  content: '(-)';
}
.upSort::after {
  content: '⏫';
}
.downSort::after {
  content: '⏬';
}

</style>
