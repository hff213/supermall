<template>
  <div>
       <NavBar>
           <div slot="left" class="back" @click="backClick()">
               <img src="~assets/img/common/back.svg">
           </div>
          <div slot="center" class="title">
              <div v-for="(item,index) in titles" class="title-item"
                :class="{active:index==currIndex}"
                @click="titleClick(index)"
              >{{item}}</div>
          </div>
          
          </NavBar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
components:{
     NavBar
},
data(){
    return {
        titles:['商品','参数','评论','推荐'],
        currIndex:0
    }
},
methods:{
    titleClick(index){
        this.currIndex=index
        this.$emit('titleClick',index)
    },
    backClick(){
        this.$router.back()
    }
}
}
</script>

<style scoped>
.title{
    display: flex;
    font-size: 13px;
}
.title-item{
    flex: 1;
}
.active{
    color:var(--color-high-text)
}
.back img{
    margin-top: 10px;
}
</style>