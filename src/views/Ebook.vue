<template>
  <div class="ebook">
    <!-- 头部菜单栏 -->
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
    <!-- 电子书容器 -->
    <div id="book"></div>
    <!-- 遮罩层 -->
    <div class="mask">
      <div class="pre" @click="prevPage"></div>
      <div class="center" @click="flag = !flag"></div>
      <div class="next" @click="nextPage"></div>
    </div>
    <!-- 底部栏 -->
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
  </div>
</template>

<script>
import Epub from "epubjs";

// 静态资源必须放在public文件夹下
// const DOWNLOAD_URL = '/AEN.epub'
const DOWNLOAD_URL = "/unknownJS.epub";
export default {
  data() {
    return {
      flag: false
    };
  },
  methods: {
    showBook() {
      // 创建Book对象
      this.book = new Epub(DOWNLOAD_URL);
      // 通过Book对象的renderTo方法生成rendtion
      this.rendtion = this.book.renderTo("book", {
        // book 是dom元素的id
        width: window.innerWidth,
        height: window.innerHeight
      });
      // 渲染电子书
      this.rendtion.display();
    },
    prevPage() {
      // Rendition.prev
      if (this.rendtion) {
        this.rendtion.prev();
      }
    },
    nextPage() {
      // Rendition.next
      if (this.rendtion) {
        this.rendtion.next();
      }
    }
  },
  created() {
    this.showBook();
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/global.scss";

.ebook {
  position: relative;
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
  // 遮罩层
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    display: flex;
    .pre {
      flex: 0 0 px2rem(100);
    }
    .center {
      flex: 1;
    }
    .next {
      flex: 0 0 px2rem(100);
    }
  }

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
}
</style>