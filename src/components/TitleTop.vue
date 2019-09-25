<template>
  <transition name="slide">
    <div class="title-top" v-show="flag">
      <div class="title-left">
        <span class="icon icon-xiaoyuhao"></span>
      </div>
      <div class="title-right">
        <div class="right-icon-box">
          <span class="icon icon-cart_icon"></span>
          <span class="icon icon-wode"></span>
          <span class="icon icon-gengduo"></span>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props:{
    flag:{
      type: Boolean,
      default: false
    }
  }
};
</script>
<style lang='scss' scoped>
@import '@/assets/styles/global';
.title-top {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 101;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: px2rem(25);
  box-shadow: 0px px2rem(-4) px2rem(10) black;
  background-color: #fff;
  padding: 0 px2rem(10);
  .title-left {
    @include center;
  }
  .right-icon-box {
    width: px2rem(50);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>