<template>
  <div id="detail">
     <DetailNavBar class="detail-nav"></DetailNavBar>
     <scroll class="content">
 <DetailSwiper :topImages="topImages"></DetailSwiper>
     <DetailBaseInfo :goods="goods"></DetailBaseInfo>
     <DetailShopInfo :shop="shop"></DetailShopInfo>
<DetailGoodsInfo :detailInfo="detailInfo"></DetailGoodsInfo>
     </scroll>
    
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import {getDetail,Goods,Shop} from 'network/detail'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import Scroll from 'components/common/scroll/Scroll'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
export default {
    name:'Detail',
    components:{
       DetailNavBar,
       DetailSwiper,
       DetailBaseInfo,
       DetailShopInfo,
       Scroll,
       DetailGoodsInfo
    },
data(){
    return {
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{}
    }
},created(){
    this.iid=this.$route.params.id
  
    getDetail(this.iid).then(res=>{
    console.log(res)
      const data=res.result

      this.topImages= data.itemInfo.topImages
        this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
       this.shop=new Shop(data.shopInfo)
       this.detailInfo=data.detailInfo
       console.log(this.detailInfo)
    })
}
}
</script>

<style scoped>
#detail{
  position: relative;
    z-index: 1;
    background-color: white;
    height: 100vh;
}
.detail-nav{
  position: relative;
  z-index: 1;
 background-color: white;
}
.content{
 height: calc(100% - 44px);
  /* top:44px;
  overflow: hidden;
  position:absolute;
  left: 0;
  right: 0;
  bottom:0; */
}
</style>