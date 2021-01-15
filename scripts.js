const vm = Vue.createApp({
    data () {
      return {
        ubikeStops: [],
        stopList:[],
        searchStation:'',
        sortSelected:'',
        tempList:[],
        defaultPage:0,
        size:10,
      }
    },
    methods: {
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
      arrangeSort(stops, currentSort, isSort){
        //複製陣列
        const copyStops = [...stops];
        return (isSort === 'Desc') ? copyStops.sort((a, b) => b[currentSort] - a[currentSort])
        : copyStops.sort((a, b) => a[currentSort] - b[currentSort]);
      },
      reset()
      {
        this.sortSelected = '';
        this.searchStation = '';
      },
      prevPage()
      {
          this.defaultPage--;
      },
      nextPage()
      {
          if(this.defaultPage >= this.totalPage)
          {
              alert("已經是最末頁囉^^");
              return false;
          }
          this.defaultPage++;
      }
    },
    created() {

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
    computed:
    {
      fiterStops:function()
      {
        if(this.searchStation !== '')
        {
          this.stopList = this.ubikeStops.filter(v => v.sna.includes(this.searchStation));
        }
        else
        {
          this.stopList = this.ubikeStops;
        }

        if(this.sortSelected !== '')
        { 
          var sortArray = this.sortSelected.split("_");
          var str1 = sortArray[0];
          var str2 = sortArray[1];
          this.stopList = this.arrangeSort(this.stopList, str1, str2);
        }

        return this.stopList;
      },
      pageFiter:function()
      {
        return this.fiterStops.slice(this.start, this.end);
      },
      //每一頁40筆資料
      pageSize:function()
      {
          return Math.floor(this.totalData.length / this.size);
      },
      //從哪裡開始顯示
      start:function(){
        if(this.defaultPage === 0)
        {
          return this.defaultPage * this.pageSize;
        }
        else
        {
          return (this.defaultPage * this.pageSize) - 1;
        }
      },
      //從哪裡開始結束
      end:function(){
        if(this.defaultPage === 0)
        {
          return (this.start + this.pageSize) - 1;
        }
        else
        {
          return (this.start + this.pageSize);
        }
      },
      totalPage:function(){
        return Math.floor(this.totalData.length / this.pageSize);
      },
      totalData:function(){
          if(this.fiterStops != "undefined"){
            return this.fiterStops;
          }
          else{
            return this.ubikeStops;
          }
      }
    }
}).mount('#app');