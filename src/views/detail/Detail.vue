<template>
  <div id="detail">
    <DetailNavBar ref="DetailNavBar" class="detail-nav" @titleClick="titleClick"></DetailNavBar>
    <Scroll class="content" ref="scroll" @scroll="contentScroll" :probeType="3">
      <DetailSwiper :topImages="topImages"></DetailSwiper>
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <DetailShopInfo :shop="shop"></DetailShopInfo>
      <DetailGoodsInfo :detailInfo="detailInfo" @imageLoad="imageLoad"></DetailGoodsInfo>
      <DetailParamsInfo :paramInfo="itemParams" ref="params"></DetailParamsInfo>
      <DetailCommentInfo :commentInfo="commentInfo" ref="comment"></DetailCommentInfo>
      <GoodsList :goods="recommends" ref="recommend"></GoodsList>
    </Scroll>
    <DetailBottomBar @addToCart="addToCart()"></DetailBottomBar>
     <back-top @click.native="backClick()" v-show="isShowBackTop"></back-top>

    
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import { getDetail, getRecommend, Goods, Shop } from "network/detail";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import Scroll from "components/common/scroll/Scroll";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamsInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import GoodsList from "components/content/goods/GoodsList";
import debounce from "common/utils";
import DetailBottomBar from './childComps/DetailBottomBar'
import {backTop11} from 'common/mixin'

import {mapActions} from 'vuex'


export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
 
  },
mixins:[backTop11],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      itemParams: {},
      commentInfo: {},
      recommends: {},
      themeTopYs: [],
      debounce: null,
    
    };
  },
  created() {
    this.iid = this.$route.params.id;

    getDetail(this.iid).then(res => {
      const data = res.result;

      this.topImages = data.itemInfo.topImages;
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      this.shop = new Shop(data.shopInfo);
      this.detailInfo = data.detailInfo;
      this.itemParams = data.itemParams;
      //7.取出评论信息
      if (data.rate.cRate != 0) {
        this.commentInfo = data.rate.list[0];
      }

      //       this.$nextTick(() => {
      //       this.themeTopYs=[]
      //     this.themeTopYs.push(0)
      //  this.themeTopYs.push(-this.$refs.params.$el.offsetTop)
      //   this.themeTopYs.push(-this.$refs.comment.$el.offsetTop)
      //    this.themeTopYs.push(-this.$refs.recommend.$el.offsetTop)

      //     });

      this.debounce = debounce(() => {
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(-this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(-this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(-this.$refs.recommend.$el.offsetTop);
      
      }, 100);
    });
    getRecommend().then(res => {
      this.recommends = res.data.list;
    });
  },

  methods: {
    ...mapActions(['addCart']),
    imageLoad() {
      this.$refs.scroll.scroll.refresh();

      this.debounce();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, this.themeTopYs[index], 100);
    },
    contentScroll(position) {
      for (let i = 0; i < this.themeTopYs.length; i++) {
        if (i == this.themeTopYs.length - 1) {
        
          this.$refs.DetailNavBar.currIndex=i
          break;
        } else if (
          position.y < this.themeTopYs[i] &&
          position.y > this.themeTopYs[i + 1]
        ) {
      
            this.$refs.DetailNavBar.currIndex=i
          break;
        }
      }

      if(position.y<-500){
        this.isShowBackTop=true
      }else{
         this.isShowBackTop=false
      }
    },
    addToCart(){
       const obj = {}
        // 2.对象信息
        obj.iid = this.iid;
        obj.imgURL = this.topImages[0]
        obj.title = this.goods.title
        obj.desc = this.goods.desc;
        obj.newPrice = this.goods.nowPrice;
        // 3.添加到Store中
       
        // this.$store.commit('addCart', obj)
        // this.$store.dispatch('addCart', obj).then(res=>{console.log(res)})
        this.addCart(obj).then(res=>{
         this.$toast.show(res,1000)
        })
    }
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 1;
  background-color: white;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 1;
  background-color: white;
}
.content {
  /* height: calc(100% - 44px); */
  top: 44px;
  overflow: hidden;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 58px;
}

</style>