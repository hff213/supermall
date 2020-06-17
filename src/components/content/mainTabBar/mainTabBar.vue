<template>
  <div>
    <router-link tab="button" to="/home"><button>首页</button></router-link>
    <router-link to="/category"><button>分类</button></router-link>
    <router-link to="/cart"><button>购物车</button></router-link>
    <router-link to="/profile"><button>我的</button></router-link>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
div{
    text-align: center;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
}
button{
    display: inline;
    margin-left: 20px;
}
</style>
</style>
