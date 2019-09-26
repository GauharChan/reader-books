<template>
  <div>
    <transition name="slide">
      <div class="title-top" v-show="flag">
        <div class="title-left">
          <span class="icon icon-xiaoyuhao"></span>
        </div>
        <div class="title-right">
          <div class="right-icon-box">
            <span class="icon icon-cart_icon"></span>
            <span class="icon icon-wode"></span>
            <span class="icon icon-gengduo" @click="handleSetting()"></span>
          </div>
        </div>
      </div>
    </transition>
    <transition name="slide-up">
      <div v-show="showSetting">
        <div class="setting-box">
          <div
            class="book-item"
            @click="handleChange(item)"
            v-for="(item, index) in bookList"
            :key="index"
          >{{`《${item}》`}}</div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    bookList: Array
  },
  data() {
    return {
      showSetting: false,
      showTag: 0
    };
  },
  watch: {
    flag(newval, old) {
      if (!newval) {
        this.showSetting = false;
      }
    }
  },
  methods: {
    handleSetting() {
      this.showSetting = !this.showSetting;
    },
    handleChange(item) {
      this.$emit("handleChange", item);
    }
  }
};
</script>
<style lang='scss' scoped>
@import "@/assets/styles/global";
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
  box-shadow: 0px px2rem(-4) px2rem(10) rgba(0, 0, 0, 0.55);
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

.setting-box {
  position: fixed;
  top: px2rem(25);
  left: 0;
  width: 100%;
  height: px2rem(26);
  background-color: #fff;
  box-shadow: 0 px2rem(2) px2rem(8) rgba(0, 0, 0, 0.15);
  z-index: 102;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .book-item {
    box-sizing: border-box;
    padding: px2rem(2);
    font-size: px2rem(6);
    word-break: break-all;
    line-height: px2rem(10);
  }
}


</style>