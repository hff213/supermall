<template>
  <div class="tab-bar-item" @click="tabBarItemClick()">
    <div v-if="!isActive">
      <slot name="icon"></slot>
    </div>

    <div v-else>
      <slot name="icon-active"></slot>
    </div>
    <div>
      <slot name="text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    path: {
      type: String
    }
  },
  methods: {
    tabBarItemClick() {
      this.$router.replace(this.path);
    }
  },
  computed:{
      isActive(){
         return this.$route.path.indexOf(this.path)>-1
      }
  }
};
</script>

<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
}
</style>