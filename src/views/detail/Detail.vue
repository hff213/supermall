<template>
  <div>
     <DetailNavBar></DetailNavBar>
     <DetailSwiper :topImages="topImages"></DetailSwiper>
     <DetailBaseInfo :goods="goods"></DetailBaseInfo>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import {getDetail,Goods} from 'network/detail'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
export default {
    name:'Detail',
    components:{
       DetailNavBar,
       DetailSwiper,
       DetailBaseInfo
    },
data(){
    return {
        iid:null,
        topImages:[],
        goods:null
    }
},created(){
    this.iid=this.$route.params.id
    console.log(this.iid)
    getDetail(this.iid).then(res=>{
    
      const data=res.result

      this.topImages= data.itemInfo.topImages
        this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
       
    })
}
}
</script>

<style>

</style>