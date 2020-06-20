<template>
  <div id="home">
    <navbar class="home-nav">
      <div slot="center">购物街</div>
    </navbar>

    <Scroll class="content" 
    ref="scroll" 
    :probe-type="3"
     @scroll="contentScroll"
     @pullingUp="loadMore"
    :pullUpLoad="true"
    >
      <home-swiper :banners="banners"></home-swiper>
      <recommendview :recommends="recommends"></recommendview>
      <feature-view></feature-view>
      <tab-control :arr="['流行','新款','精选']" class="tab-control" @tabClick="tabClick"></tab-control>

      <goods-list :goods="showGoods"></goods-list>
     
    </Scroll>
     <back-top @click.native="backClick()" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import navbar from "components/common/navbar/NavBar";
import recommendview from "./childComps/RecommendView";
import HomeSwiper from "./childComps/HomeSwiper";
import FeatureView from "./childComps/FeatureView";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'
import { getHomeMultidata, getHomeGoods } from "network/home";
export default {
  components: {
    navbar,
    recommendview,
    HomeSwiper,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      recommends: null,

      banners: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShowBackTop: false
    };
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  methods: {
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;

      getHomeGoods(type, page).then(res => {
        console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page = page + 1;
        this.$refs.scroll.finishPullUp()
         this.$refs.scroll.scroll.refresh()
      });
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    backClick(){
     this.$refs.scroll.scrollTo(0,0,500)
    },
    contentScroll(position){
    
     this.isShowBackTop=position.y<-500
    
  
    },
    loadMore(){
   
      this.getHomeGoods(this.currentType)
    }
  }
};
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
.content {
  overflow: hidden;;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control {
  position: sticky;
  top: 0px;
  z-index: 1;
}
</style>