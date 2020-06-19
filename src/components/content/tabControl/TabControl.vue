<template>
  <div id="tabControl" >
<div v-for="(item,index) in arr"  @click="divClick(index)"> 
    <span :class="{active:index==currIndex}">{{item}}</span>
    </div>


  
  </div>

</template>

<script>
export default {
    data(){
        return {
        currIndex:0
        }
    },
props:{
    arr:{
    type:Array
    }
},
computed:{
    isActive(){
return fasle
    }
}
,methods:{
divClick(index){
this.currIndex=index
this.$emit('tabClick',index)
}
}
}
</script>

<style>
#tabControl{
    display: flex;
    text-align: center;
     font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
}
#tabControl div{
    flex: 1;
   
}

.active{
 color: var(--color-high-text);
  border-bottom: 3px solid var(--color-tint);
}
span{
     padding: 5px;
}
</style>