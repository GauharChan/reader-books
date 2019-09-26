<template>
  <div class="ebook">
    <!-- 头部菜单栏 -->
    <TitleBar :flag="flag" :bookList="bookList" @handleChange="handleChange" />
    <!-- 电子书容器 -->
    <div id="book"></div>
    <!-- 遮罩层 -->
    <div class="mask">
      <div class="pre" @click="prevPage"></div>
      <div class="center" @click="flag = !flag"></div>
      <div class="next" @click="nextPage"></div>
    </div>
    <!-- 底部栏 -->
    <BottomBar
      :flag="flag"
      :fontSizeList="fontSizeList"
      :defaultFontSize="defaultFontSize"
      @changeSize="changeSize"
      @setTheme="setTheme"
      :themeList="themeList"
      :defaultTheme="defaultTheme"
      :bookUsable="bookUsable"
      @handleProgressChange="handleProgressChange"
      @jumpTo="jumpTo"
      :toc="navigation.toc"
    />
    <div class="load" v-show="isLoading">loading...</div>
  </div>
</template>

<script>
import TitleBar from "@/components/TitleTop";
import BottomBar from "@/components/BottomBox";
import Epub from "epubjs";

// 静态资源必须放在public文件夹下
// const DOWNLOAD_URL = '/AEN.epub'
// const DOWNLOAD_URL = "/unknownJS.epub";
// const DOWNLOAD_URL = "/unknownJSlast.epub";
export default {
  components: {
    TitleBar,
    BottomBar
  },
  data() {
    return {
      isDisplay: false, // 判断电子书是否渲染完成
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
      // 默认字体大小
      defaultFontSize: 16,
      // 主题
      themeList: [
        {
          name: "default",
          style: {
            body: {
              color: "#000",
              background: "#fff"
            }
          }
        },
        {
          name: "eye",
          style: {
            body: {
              color: "#000",
              background: "#bfa"
            }
          }
        },
        {
          name: "night",
          style: {
            body: {
              color: "#c3602c",
              background: "#1e1e1e"
            }
          }
        },
        {
          name: "gold",
          style: {
            body: {
              color: "#000",
              background: "rgba(241,236,226)"
            }
          }
        }
      ],
      defaultTheme: 0,
      bookUsable: false, // 是否加载完成locations对象
      navigation: {},
      bookList: [
        "你不知道的JavaScript(上卷).epub",
        "你不知道的JavaScript(中卷).epub",
        "你不知道的JavaScript(下卷).epub"
      ],
      DOWNLOAD_URL: "/你不知道的JavaScript(上卷).epub",
      isLoading: false
    };
  },
  methods: {
    handleChange(item) {
      // 先把原来的实例销毁
      this.book.destroy();
      this.isDisplay = false
      const url = "/" + item;
      this.showBook(url);
      this.flag = false;
    },
    // 菜单跳转
    jumpTo(href) {
      this.flag = false;
      this.rendtion.display(href);
    },
    // 进度条
    handleProgressChange(num) {
      const percentage = num / 100;
      const location =
        percentage > 0 ? this.locations.cfiFromPercentage(percentage) : 0;
      this.rendtion.display(location);
    },
    // 设置主题
    setTheme(index) {
      this.theme.select(this.themeList[index].name);
      this.defaultTheme = index;
      localStorage.setItem("theme", this.defaultTheme);
    },
    // 注册主题
    registerThemes() {
      this.themeList.forEach((item, index) => {
        this.theme.register(item.name, item.style);
      });
    },
    // 子向父传递数据触发的自定义事件
    changeSize(fontSize) {
      this.defaultFontSize = fontSize;
      this.theme.fontSize(fontSize + "px");
    },
    showBook(url) {
      // 创建Book对象
      this.book = new Epub(url);
      // 通过Book对象的renderTo方法生成rendtion
      this.rendtion = this.book.renderTo("book", {
        // book 是dom元素的id
        width: window.innerWidth,
        height: window.innerHeight
      });
      // 渲染电子书
      this.rendtion.display().then((res) => {
        this.isDisplay = true
      })
      // 获取theme对象
      this.theme = this.rendtion.themes;
      // 设置默认字体大小
      this.changeSize(this.defaultFontSize);
      // 注册主题
      this.registerThemes();
      // 获取主题,如果浏览设置过
      let userTheme = localStorage.getItem("theme");
      this.defaultTheme = userTheme ? parseInt(userTheme) : this.defaultTheme;
      // 设置主题
      this.setTheme(this.defaultTheme);
      // 获取locations对象
      this.book.ready
        .then(() => {
          this.navigation = this.book.navigation;
          return this.book.locations.generate();
        })
        .then(res => {
          this.locations = this.book.locations;
          this.bookUsable = true;
        });
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
  mounted() {
    this.isDisplay = false
    this.showBook(this.DOWNLOAD_URL);
  },
  watch: {
    isDisplay(newVal, old) {
      this.isLoading = newVal ? false : true
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/global.scss";

@media screen and (max-width: 800px) {
    .ebook{
      .mask{
        .pre,.next{
          flex: 0 0 px2rem(50) !important;
        }
      }
    }
}
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
.load{
  @include center;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0,0,0,.8);
  color: rgb(133, 204, 204);
}
</style>