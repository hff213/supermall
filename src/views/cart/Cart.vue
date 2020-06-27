<template>
  <div class="cart">
     <nav-bar class="nav-ber">
       <div slot="center">购物车({{cartLength}})</div>
     </nav-bar>

     <CartList class="cart-list"></CartList>
    
     <BottomBar></BottomBar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import {mapGetters} from  'vuex'
import CartList from './childComps/CartList'
import BottomBar from './childComps/BottomBar'
export default {
components:{
  NavBar,
  CartList,
  BottomBar
},
computed:{
  ...mapGetters(['cartLength'])
}
}
</script>

<style scoped>
.nav-bar{
  background-color: var(--color-tint);
  color:white;
}
.cart {
  height: 100vh;
}
.cart-list{
  position: relative;
height: calc(100% - 44px - 49px - 44px);
}
</style>