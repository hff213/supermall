<template>
  <div class="cart-list">
    <Scroll class="content1">
    <cart-list-item v-for="(item,index) in cartList" :key="index" :itemInfo="item"></cart-list-item>
    </Scroll>

 
  </div>
</template>

<script>
import {mapGetters} from  'vuex'
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'
export default {
  components:{
    Scroll,
    CartListItem 
  },
computed:{
  ...mapGetters(['cartList'])
}
}
</script>

<style scoped>

.content1{
  position: absolute;
  top:0;
  bottom: 0;
  left:0;
  right: 0;

  overflow: hidden;
}
</style>