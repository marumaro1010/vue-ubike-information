<template>
  <div id="app">
    <search
      @searchName="updateSearchName"
      :searchStation="searchStation"
    ></search>
    <span>◀</span>
    <pagination v-for="count in totalPage"
      :key="count"
      :count="count"
      :currentPage="currentPage"
    />
    <span>▶</span>
    <p>共 {{ totalPage }} 頁</p>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>場站名稱</th>
          <th>場站區域</th>
          <th><a href="#" @click="setSort('sbi')">目前可用車輛</a></th>
          <th><a href="#" @click="setSort('tot')">總停車格</a></th>
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
        ubikeStops:[],
        searchStation:'',
        sortSelected:'',
        tempList:[],
        currentPage:1,
        perPage:40,
        sortType:'',
        isDesc:false
    }
  },
  created(){
      // 欄位說明請參照:
      // http://data.taipei/opendata/datalist/datasetMeta?oid=8ef1626a-892a-4218-8344-f7ac46e1aa48

      // sno：站點代號、 sna：場站名稱(中文)、 tot：場站總停車格、
      // sbi：場站目前車輛數量、 sarea：場站區域(中文)、 mday：資料更新時間、
      // lat：緯度、 lng：經度、 ar：地(中文)、 sareaen：場站區域(英文)、
      // snaen：場站名稱(英文)、 aren：地址(英文)、 bemp：空位數量、 act：全站禁用狀態

      fetch('https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.gz')
        .then(res => res.json())
        .then(res => {
            // 將 json 轉陣列後存入 this.ubikeStops
            this.ubikeStops = Object.keys(res.retVal).map(key => res.retVal[key]);
      });
  },
  computed:{
    fliterStops(){
        let stopList = [];
        if(this.searchStation)
        {
            stopList = this.ubikeStops.filter(v => v.sna.includes(this.searchStation));
        }
        else
        {
            stopList = this.ubikeStops;
        }
        return stopList;
    },
    sortStops(){
        let fliterStops = this.fliterStops;
        let sortType = this.sortType;
        let isSortDesc = this.isDesc;

        return isSortDesc
        ? fliterStops.sort((a, b) => b[sortType] - a[sortType])
        : fliterStops.sort((a, b) => a[sortType] - b[sortType]);
    },
    totalPage(){
        let sortStops = this.sortStops;
        return Math.floor(sortStops.length / this.perPage);
    }
  },
  methods:{
      updateSearchName(val){
          this.searchStation = val;
      },
      setSort(val){
        this.sortType = val;
        this.isDesc = !this.isDesc;
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
</style>
