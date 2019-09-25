<template>
  <div class="bottom">
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
        <div class="icon-box" @click="showSetting = !showSetting">
          <span class="icon icon-A"></span>
        </div>
      </div>
    </transition>
    <!-- 设置 -->
    <transition name="slide-up">
      <div class="setting-box" v-show="showSetting">
        <div class="setting-font-size">
          <!-- 最小字体 -->
          <div class="preview" :style="{fontSize: fontSizeList[0].fontSize+'px'}">A</div>
          <!-- 选择线条 -->
          <div class="select-box">
            <div class="select" v-for="(item, index) in fontSizeList" :key="index">
              <div class="line"></div>
              <div class="point-box" @click="changeSize(item.fontSize)">
                <div class="point" v-show="defaultFontSize == item.fontSize">
                  <!-- 实心圆 -->
                  <div class="solidCircle"></div>
                </div>
              </div>
              <div class="line"></div>
            </div>
          </div>
          <!-- 最大字体 -->
          <div
            class="preview"
            :style="{fontSize: fontSizeList[fontSizeList.length - 1].fontSize+'px'}"
          >A</div>
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
    fontSizeList: {
      type: Array
    },
    defaultFontSize: {
      type: Number
    }
  },
  data() {
    return {
      showSetting: false
    };
  },
  watch: {
    flag(newval, old) {
      if (!newval) {
        this.showSetting = false;
      }
    }
  },
  methods:{
    changeSize(fontSize){
      // this.defaultFontSize = fontSize
      // 子向父传递数据触发的自定义事件
      this.$emit('changeSize',fontSize)
    }
  }
};
</script>
<style lang='scss' scoped>
@import "@/assets/styles/global";
// bottom
.bottom {
  .bottom-box {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: px2rem(25);
    display: flex;
    z-index: 101;
    // box-shadow: 0 px2rem(4) px2rem(10) black;
    box-shadow: 0 px2rem(-2) px2rem(8) rgba(0, 0, 0, 0.15);
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
  .setting-box {
    position: fixed;
    bottom: px2rem(25);
    left: 0;
    width: 100%;
    height: px2rem(25);
    background-color: #fff;
    box-shadow: 0 px2rem(-2) px2rem(8) rgba(0, 0, 0, 0.15);
    z-index: 102;
    .setting-font-size {
      display: flex;
      height: 100%;
      .preview {
        flex: 0 0 px2rem(40);
        @include center;
      }
      .select-box {
        flex: 1;
        display: flex;
        .select {
          flex: 1;
          display: flex;
          align-items: center;
          &:first-child {
            .line:first-child {
              border-bottom: none;
            }
          }
          &:last-child {
            .line:last-child {
              border-bottom: none;
            }
          }
          .line {
            flex: 1;
            height: 0;
            border-bottom: px2rem(1) solid #ccc;
          }
          .point-box {
            position: relative;
            flex: 0 0 0;
            height: px2rem(7);
            border-left: px2rem(2) solid #ccc;
            .point {
              position: absolute;
              top: -(px2rem(.2));
              left: -(px2rem(4.5));
              width: px2rem(9);
              height: px2rem(9);
              border-radius: 50%;
              border: 1px solid rgba(0, 0, 0, 0.15);
              background-color: #fff;
              box-shadow: 0 px2rem(2) px2rem(4) rgba(0, 0, 0, 0.25);
              @include center;
              // 实心球
              .solidCircle {
                width: px2rem(2.5);
                height: px2rem(2.5);
                border-radius: 50%;
                background: #000;
              }
            }
          }
        }
      }
    }
  }
}
</style>