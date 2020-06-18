<template>
  <div>
    <TabBar>
      <TabBarItem path="/home">
        <div slot="icon">
          <img src="~assets/img/tabbar/home.svg" />
        </div>
        <div slot="icon-active"><img src="~assets/img/tabbar/home_active.svg"></div>
        <div slot="text">首页</div>
      </TabBarItem>
      <TabBarItem path="/category">
        <div slot="icon">
          <img src="~assets/img/tabbar/category.svg" />
        </div>
          <div slot="icon-active"><img src="~assets/img/tabbar/category_active.svg"></div>
        <div slot="text">分类</div>
      </TabBarItem>
      <TabBarItem path="cart">
        <div slot="icon">
          <img src="~assets/img/tabbar/shopcart.svg" />
        </div>
          <div slot="icon-active"><img src="~assets/img/tabbar/shopcart_active.svg"></div>
        <div slot="text">购物车</div>
      </TabBarItem>
      <TabBarItem path="profile">
        <div slot="icon">
          <img src="~assets/img/tabbar/profile.svg" />
        </div>
          <div slot="icon-active"><img src="~assets/img/tabbar/profile_active.svg"></div>
        <div slot="text">我的</div>
      </TabBarItem>
    </TabBar>
  </div>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";
export default {
  components: {
    TabBar,
    TabBarItem
  }
};
</script>

<style scoped>
</style>
</style>
