<template>
  <div class="toast" v-if="isShow">
  <div>
{{msg}}
  </div>
  </div>
</template>

<script>
export default {
// props:{
//   msg:{
// type:String,
// default(){
//   return ''
// }
//   },
//   show:{
//     type:Boolean,
//     default(){
//       return false
//     }
//   }
// }
data(){
  return {
    msg:'',
    isShow:false
  }
},
methods:{
  show(msg,time=1000){
this.isShow=true
this.msg=msg
setTimeout(() => {
  this.isShow=false
  this.msg=''
}, time);
  }
}
}
</script>

<style scoped>
.toast{
  position: fixed;
  z-index: 1;
  top:50%;
  left:50%;
 transform: translate(-50%,-50%);
  padding: 8px 10px;
  background-color: rgba(0,0,0,.75);
  color:white;
}
</style>