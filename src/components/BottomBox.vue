<template>
  <div class="bottom">
    <transition name="slide-up">
      <div class="bottom-box" v-show="flag">
        <div class="icon-box" @click="menuControll(1)">
          <span class="icon icon-mulu"></span>
        </div>
        <div class="icon-box" @click="setSetting(2)">
          <span class="icon icon-huakuai"></span>
        </div>
        <div class="icon-box" @click="setSetting(1)">
          <span class="icon icon-ai250"></span>
        </div>
        <div class="icon-box" @click="setSetting(0)">
          <span class="icon icon-A"></span>
        </div>
      </div>
    </transition>
    <!-- 设置 -->
    <transition name="slide-up">
      <div class="setting-box" v-show="showSetting">
        <!-- 字体 -->
        <div class="setting-font-size" v-if="showTag == 0">
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
        <!-- 主题 -->
        <div class="setting-theme" v-else-if="showTag == 1">
          <div
            class="setting-item"
            v-for="(item, index) in themeList"
            :key="index"
            @click="setTheme(index)"
          >
            <div
              class="preview"
              :class="{'hasborder': index === defaultTheme}"
              :style="{background: item.style.body.background}"
            ></div>
            <div class="text" :class="{'selected':index === defaultTheme}">{{item.name}}</div>
          </div>
        </div>
        <!-- 进度条 -->
        <div class="setting-progress" v-else-if="showTag == 2">
          <div class="progress-box">
            <input
              class="progress"
              type="range"
              max="100"
              min="0"
              step="1"
              @change="handleProgressChange"
              @input="handleProgressInput"
              :disabled="!bookUsable"
              :value="progress"
              ref="progressRef"
            />
            <div class="tips">
              <span>{{bookUsable ? progress + '%' : '加载中...'}}</span>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- 菜单 -->
    <transition name="mask-box">
      <div class="mask" v-show="showMenu">
        <transition name="fade">
          <div class="setting-menu" v-show="showMenu">
            <div
              class="menu-item"
              @click="jumpTo(item.href)"
              v-for="(item, index) in toc"
              :key="index"
            >{{item.label}}</div>
          </div>
        </transition>
        <transition name="mask">
          <div class="close" ref="close" @click="menuControll(0)" v-show="showMask"></div>
        </transition>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  props: {
    flag: {
      // 上下栏的显示隐藏
      type: Boolean,
      default: false
    },
    fontSizeList: {
      // 可选字体大小列表
      type: Array
    },
    defaultFontSize: {
      // 默认字体大小
      type: Number
    },
    defaultTheme: Number, // 默认主题
    themeList: Array, // 主题列表
    bookUsable: Boolean, // 电子书加载状态
    toc: Array // 菜单
  },
  data() {
    return {
      showSetting: false,
      showTag: 0,
      // 初始化的页码数
      progress: 0,
      showMenu: false,
      showMask: false
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
    menuControll(flag) {
      if (flag == 1) {
        this.showMenu = true;
        this.showMask = true;
      } else {
        this.showMenu = false;
        this.showMask = false;
      }
    },
    jumpTo(href) {
      this.menuControll(0);
      this.$emit("jumpTo", href);
    },
    // 百分比的变化
    handleProgressInput(e) {
      this.progress = e.target.value;
      this.$refs.progressRef.style.backgroundSize = `${this.progress}% 100%`;
    },
    // 拖动翻页
    handleProgressChange(e) {
      this.$emit("handleProgressChange", e.target.value);
    },
    // 设置主题
    setTheme(index) {
      this.$emit("setTheme", index);
    },
    setSetting(tag) {
      this.showSetting = !this.showSetting;
      this.showTag = tag;
    },
    changeSize(fontSize) {
      // 子向父传递数据触发的自定义事件
      this.$emit("changeSize", fontSize);
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
              top: -(px2rem(0.2));
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
    .setting-theme {
      height: 100%;
      display: flex;
      cursor: pointer;
      .setting-item {
        flex: 1;
        @include column;
        .preview {
          width: 50%;
          height: 50%;
          &.hasborder {
            border: 1px solid #ccc;
          }
        }
        .text {
          font-size: px2rem(8);
          color: #ccc;
          &.selected {
            color: #333;
          }
        }
      }
    }
    .setting-progress {
      .progress-box {
        input {
          -webkit-appearance: none;
          width: 100%;
          height: px2rem(2);
          background: linear-gradient(#999, #999) no-repeat #ddd;
          background-size: 0% 100%;
          &:focus {
            outline: none;
          }
          &::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: px2rem(9);
            height: px2rem(9);
            border-radius: 50%;
            border: 1px solid rgba(0, 0, 0, 0.15);
            background-color: #fff;
            box-shadow: 0 px2rem(2) px2rem(4) rgba(0, 0, 0, 0.25);
          }
        }
        .tips {
          @include center;
          span {
            font-size: px2rem(8);
            color: rgb(61, 60, 60);
          }
        }
      }
    }
  }

  .mask {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 102;
    .setting-menu {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      width: 80%;
      height: 100%;
      background: #fff;
      overflow: scroll;
      .menu-item {
        font-size: px2rem(10);
        padding-left: px2rem(10);
        margin-top: px2rem(5);
        cursor: pointer;
      }
    }
    .close {
      flex: 1;
      background: rgba(0, 0, 0, 0.7);
    }
  }
  .no-back {
    background: rgba(0, 0, 0, 0) !important;
  }
  // 大盒子mask-box过渡
  .mask-box-enter,
  .mask-box-leave-to {
    opacity: 0;
  }
  .mask-box-enter-to,
  .mask-box-leave {
    opacity: 1;
  }
  // 左边菜单栏过渡
  .fade-enter,
  .fade-leave-to {
    transform: translateX(-100%);
  }
  .fade-enter-to,
  .fade-leave {
    transform: translateX(0);
  }
  // 右边蒙版过渡
  .mask-enter,
  .mask-leave-to {
    transform: translateX(100%);
  }
  .mask-enter-to,
  .mask-leave {
    transform: translateX(0);
  }
  .mask-enter-active,
  .mask-leave-active,
  .fade-enter-active,
  .fade-leave-active,
  .mask-box-enter-active,
  .mask-box-leave-active {
    transition: all 0.3s;
  }
}
</style>