import { createStore } from 'vuex'

export default createStore({
    state: {
        ubikeStops:[],
        searchStation:'',
        sortSelected:'',
        tempList:[],
        currentPage:1,
        perPage:40,
        sortType:'',
        isDesc:false
    },
    mutations: {
        setSearchName(state, payload){
            state.searchStation = payload;
        },
        setUbikeStops (state, payload) {
            state.ubikeStops = payload;
        },
        setSortType(state, payload){
            state.sortType = payload;
        },
        setIsDesc(state, payload){
            state.isDesc = payload;
        }
    },
    getters: {
        getSortSbiClass(state){
            let sortType = state.sortType;
            let isSortDesc = state.isDesc;
            if(sortType == 'sbi')
            {
              return isSortDesc
              ? {'defaultSort':true,'upSort':true,'downSort':false}
              : {'defaultSort':true,'upSort':false,'downSort':true}
            }
            else{
              return {'defaultSort':true,'upSort':false,'downSort':false}
            }
        },
        getSortTotClass(state){
            let sortType = state.sortType;
            let isSortDesc = state.isDesc;
            if(sortType == 'tot')
            {
              return isSortDesc
              ? {'defaultSort':true,'upSort':true,'downSort':false}
              : {'defaultSort':true,'upSort':false,'downSort':true}
            }
            else{
              return {'defaultSort':true,'upSort':false,'downSort':false}
            }
        },
        fliterStops(state){
            let stopList = [];
    
            if(state.searchStation)
            {
                stopList = state.ubikeStops.filter(v => v.sna.includes(state.searchStation));
            }
            else
            {
                stopList = state.ubikeStops;
            }
            return stopList;
        },
        sortStops(state, getters){
            let fliterStops = getters.fliterStops.slice(getters.start, getters.end);
            let sortType = state.sortType;
            let isSortDesc = state.isDesc;
    
            return isSortDesc
            ? fliterStops.sort((a, b) => b[sortType] - a[sortType])
            : fliterStops.sort((a, b) => a[sortType] - b[sortType]);
        },
        start(state){
          return (state.currentPage - 1) * state.perPage;
        },
        end(state, getters){
          return getters.start + state.perPage;
        },
        totalPage(state, getters){
            let fliterStops = getters.fliterStops;
            return Math.ceil(fliterStops.length / state.perPage);
        }
    },
    actions:{
        // 欄位說明請參照:
        // http://data.taipei/opendata/datalist/datasetMeta?oid=8ef1626a-892a-4218-8344-f7ac46e1aa48

        // sno：站點代號、 sna：場站名稱(中文)、 tot：場站總停車格、
        // sbi：場站目前車輛數量、 sarea：場站區域(中文)、 mday：資料更新時間、
        // lat：緯度、 lng：經度、 ar：地(中文)、 sareaen：場站區域(英文)、
        // snaen：場站名稱(英文)、 aren：地址(英文)、 bemp：空位數量、 act：全站禁用狀態
        async fetchLocations({ commit }){
            await fetch('https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.gz')
            .then(res => res.json())
            .then(res => {
                // 將 json 轉陣列後存入 this.ubikeStops
                const ubikeStops = Object.keys(res.retVal).map(key => res.retVal[key]);
                commit('setUbikeStops', ubikeStops);
            });
            
        }
    }
})