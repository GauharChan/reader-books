<template>
  <div class="ebook">
    <div id="book"></div>
    <div class="mask">
      <div class="left"></div>
      <div class="center"></div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
import Epub from "epubjs";

// 静态资源必须放在public文件夹下
// const DOWNLOAD_URL = '/AEN.epub'
const DOWNLOAD_URL = "/unknownJS.epub";
export default {
  data() {
    return {};
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
    }
  },
  created() {
    this.showBook();
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/global.scss";
// $fontSize: 16;
// @function px2rem($px){
//     @return ($px / $fontSize) + rem;
// }
.ebook {
  position: relative;
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // background: #bfa;
    display: flex;
    .left {
      flex: 0 0 px2rem(100);
    //   background: #000;
    }
    .center {
      flex: 1;
    //   background: red;
    }
    .right {
      flex: 0 0 px2rem(100);
    //   background: yellow;
    }
  }
}
</style>