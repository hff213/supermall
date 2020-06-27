<template>
  <div id="home">
    <navbar class="home-nav">
      <div slot="center">购物街</div>
    </navbar>
<tab-control :arr="['流行','新款','精选']"  @tabClick="tabClick" 
ref="tabControl1"
class="tab-control"
v-show="isTabControlShow"
></tab-control>
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
      <tab-control :arr="['流行','新款','精选']"  @tabClick="tabClick" ref="tabControl2"></tab-control>

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
import debounce from 'common/utils'
export default {
   name: "Home",
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
      isShowBackTop: false,
  
    isTabControlShow:false,
    saveY:0,
    refresh:null
    };
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  
  },
  mounted(){
   
     const refresh=debounce(this.$refs.scroll.refresh,500)
     this.refresh=()=>{refresh()}
      this.$bus.$on('imgLoad',this.refresh)
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
     
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page = page + 1;
        this.$refs.scroll.finishPullUp()
         this.$refs.scroll.refresh()
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
      this.$refs.tabControl1.currIndex=index
       this.$refs.tabControl2.currIndex=index
    },
    backClick(){
     this.$refs.scroll.scrollTo(0,0,500)
    },
    contentScroll(position){
    
     this.isShowBackTop=position.y<-500
     this.isTabControlShow=-position.y>this.$refs.tabControl2.$el.offsetTop
     
  
    },
    loadMore(){
   
      this.getHomeGoods(this.currentType)
    }
  },
  destroyed(){console.log('destroy')},
  activated(){
this.$refs.scroll.scrollTo(0,this.saveY,0)
 this.$refs.scroll.refresh()
  },
  deactivated(){
    this.saveY=this.$refs.scroll.scroll.y
     this.$bus.$off('imgLoad',this.refresh)
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
.tab-control{
  position:relative;
  z-index: 1;
}

</style>