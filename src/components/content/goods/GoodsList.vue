<template>
  <div class="goods" >
    <goods-list-item v-for="item in goods" :good="item"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'
export default {
props:{
    goods:{
     
    }
},
components:{
     GoodsListItem 
}
}
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    padding: 2px;
  }
</style>