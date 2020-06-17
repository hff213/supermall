<template>
  <div id="home">
    <navbar class="home-nav">
      <div slot="center">购物街</div>
    </navbar>
    <Swipe :auto="1000">
      <SwipeItem>1</SwipeItem>
      <SwipeItem>2</SwipeItem>
      <SwipeItem>3</SwipeItem>
    </Swipe>
  </div>
</template>

<script>
import navbar from "components/common/navbar/NavBar";
import { getHomeMultidata } from "network/home";
import { Swipe, SwipeItem } from "mint-ui";
export default {
  components: {
    navbar,
    Swipe,
    SwipeItem
  },
  data() {
    return {
      res: null,
      value: 1
    };
  },
  created() {
    getHomeMultidata().then(res => {
      this.res = res;
      console.log(this.res);
    });
  }
};
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
}
</style>