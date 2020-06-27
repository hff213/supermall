<template>
  <div class="bottom-bar">
    <div class="check-content">
      <CheckButton class="check-button" :value="isSelectedAll" @click.native="checkClick()"></CheckButton>
      <span>全选</span>
    </div>
    <div class="price">合计:{{totalPrice}}</div>
    <div class="calculate" @click="compClick()">去计算({{checkedLength}})</div>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";
import {mapGetters} from  'vuex'
export default {
  name: "BottomBar",
  components: {
    CheckButton
  },

  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return (
        "￥" +
        this.$store.getters.cartList
          .filter(item => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return item.newPrice * item.count + preValue;
          }, 0)
          .toFixed(2)
      );
    },
    checkedLength() {
      return this.$store.getters.cartList.filter(item => item.checked).length;
    },
    isSelectedAll() {
      if (this.$store.getters.cartList.length == 0) {
        return false;
      }
      return !this.$store.getters.cartList.filter(item => !item.checked).length;
    }
  },
  methods: {
    checkClick() {
     
     let isSelectedAll=this.isSelectedAll
        this.cartList.forEach(element => {
          element.checked = !isSelectedAll;
        });
      
    },
    compClick(){
      this.$toast.show('去计算了')
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  height: 44px;
  background-color: #eee;
  position: relative;
  line-height: 44px;
  display: flex;
}
.check-content {
  display: flex;
  align-items: center;
}
.check-button {
  margin-right: 10px;
  line-height: 20px;
}
.price {
  margin-left: 30px;
  flex: 1;
}
.calculate {
  width: 90px;
  background: red;
  text-align: center;
  color: white;
}
</style>
