<template>
  <transition name="slide-up">
    <div class="bottom-box" v-show="flag">
      <div class="icon-box">
        <span class="icon icon-mulu"></span>
      </div>
      <div class="icon-box">
        <span class="icon icon-huakuai"></span>
      </div>
      <div class="icon-box">
        <span class="icon icon-ai250"></span>
      </div>
      <div class="icon-box">
        <span class="icon icon-A"></span>
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
// bottom
.bottom-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: px2rem(25);
  display: flex;
  z-index: 101;
  box-shadow: 0 px2rem(4) px2rem(10) black;
  background-color: #fff;
  .icon-box {
    flex: 1;
    @include center;
    .icon-huakuai {
      font-size: px2rem(12);
    }
    .icon-A {
      font-size: px2rem(7);
    }
  }
}
</style>