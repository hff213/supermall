<template>
  <div id="home">
    <navbar class="home-nav">
      <div slot="center">购物街</div>
    </navbar>

    <Scroll  class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">>
<home-swiper :banners="banners"></home-swiper>
<recommendview :recommends="recommends"></recommendview>
<feature-view></feature-view>
<tab-control :arr="['流行','新款','精选']"></tab-control>

    </Scroll>

  </div>
</template>

<script>
import navbar from "components/common/navbar/NavBar";
import { getHomeMultidata } from "network/home";
import recommendview from './childComps/RecommendView'
import HomeSwiper from './childComps/HomeSwiper'
import FeatureView from './childComps/FeatureView'
import TabControl from 'components/content/tabControl/TabControl'
import Scroll from 'components/common/scroll/Scroll'
export default {
  components: {
    navbar,
   recommendview,
   HomeSwiper,
   FeatureView,
   TabControl,
   Scroll
  },
  data() {
    return {
      recommends: null,
     
       banners: [],
            goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isShowBackTop: false
    };
  },
  created() {
   this.getHomeMultidata()
  },
  methods:{
        getHomeMultidata() {
        getHomeMultidata().then(res => {
          // this.result = res;
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
  }
};
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
   color: #fff;
}
.content{
  overflow: auto;
  position: absolute;
  top:44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>