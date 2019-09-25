<template>
  <div class="ebook">
    <!-- 头部菜单栏 -->
    <TitleBar :flag="flag" />
    <!-- 电子书容器 -->
    <div id="book"></div>
    <!-- 遮罩层 -->
    <div class="mask">
      <div class="pre" @click="prevPage"></div>
      <div class="center" @click="flag = !flag"></div>
      <div class="next" @click="nextPage"></div>
    </div>
    <!-- 底部栏 -->
    <BottomBar :flag="flag" :fontSizeList="fontSizeList" :defaultFontSize='defaultFontSize' @changeSize='changeSize' />
  </div>
</template>

<script>
import TitleBar from "@/components/TitleTop";
import BottomBar from "@/components/BottomBox";
import Epub from "epubjs";

// 静态资源必须放在public文件夹下
// const DOWNLOAD_URL = '/AEN.epub'
const DOWNLOAD_URL = "/unknownJS.epub";
export default {
  components: {
    TitleBar,
    BottomBar
  },
  data() {
    return {
      flag: false,
      fontSizeList: [
        { fontSize: 12 },
        { fontSize: 14 },
        { fontSize: 16 },
        { fontSize: 18 },
        { fontSize: 20 },
        { fontSize: 22 },
        { fontSize: 24 }
      ],
      defaultFontSize:16
    };
  },
  methods: {
    // 子向父传递数据触发的自定义事件
    changeSize(fontSize){
      this.defaultFontSize = fontSize
      this.theme.fontSize(fontSize + 'px')
    },
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
      // 获取theme对象
      this.theme = this.rendtion.themes
      // 设置默认字体大小
      this.changeSize(this.defaultFontSize)
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
}
</style>