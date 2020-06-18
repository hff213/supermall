<template>
  <div class="recommend">
     <div v-for="item in recommends" class="recommend-item">
         <a :href="item.link">
             <img :src="item.image">
             <div>{{item.title}}</div>
         </a>
     </div>
  </div>
</template>

<script>
export default {
    props:{
        recommends:{
            type:Array,
            default(){
                return []
            }
        }
    }

}
</script>

<style scoped> 
.recommend{
    display: flex;
    width: 100%;
    text-align: center;
    padding: 10px 0 20px;
    border-bottom: solid 8px #eee;
   font-size: 12px;
}
.recommend-item{
    flex: 1;
}
.recommend-item img{
    height: 70px;
    width: 70px;
    margin-bottom: 10px;
}
</style>