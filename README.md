### 克隆/运行项目

使用`git bash here`，执行代码

```shell
git clone https://github.com/GauharChan/reader-books.git
```

在下载好的文件夹中，重新打开`git bash here`，安装依赖，如果没有下载`yarn`，请看下文

```shell
yarn
```

下载好依赖之后，执行，等待自动打开浏览器

```shell
yarn serve
```

打包项目

```shell
yarn build
```



### vue-cli  3.0

#### 创建项目

```shell
vue create reader-books
```

#### 下载yarn

```shell
npm i yarn -g
```

### 字体图标

首先选好自己需要的图标，然后登陆[icomoon](https://icomoon.io/)，点击右上角`icoMoon App`；点击左上角，选择`new empty set`, 新建一个清单，然后在import引入自己下载好的图标，接着点右下角的generate font，点download下载。

将fonts文件夹和style.css拷贝到assets文件夹下，然后在main.js中引入style.css

```js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/styles/icon.css'
import '@/assets/styles/global.scss' // 公共样式

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```

### 根据屏幕大小调整根标签的字体大小

> DOMContentLoaded事件，在dom渲染完成的时候执行

```js
document.addEventListener('DOMContentLoaded',function(){
  let html = document.querySelector('html')
  let fontSize = window.innerWidth / 12
  fontSize = fontSize > 50 ? '50px' : fontSize + 'px' // 最大50px
  html.style.fontSize = fontSize
})
```

### 静态资源，需要存放在public文件夹下，如电子书文件。

### scss

#### @mixin

定义的@mixin center方法

```scss
@mixin center{
	display: flex;
    justify-content: center;
    align-items: center;
}
```

在.vue文件中的css中使用`@include center`引用

#### @import

使用@import引入文件

```scss
@import 'reset'
```

#### @function

```scss
@function px2rem($px) {
    @return ($px / $fontSize)+rem;
}
```

#### 变量

```scss
$fontSize : 16;
```

#### &

使用`&`符号表示同级选择器

```scss
.box{
    &:last-child
}
```



### 设置过渡

使用`transition`标签包裹需要设置过渡的`title-top`元素，默认的过渡类名`enter,enter-to`等，是和`title-top`同级的，写css的时候，需要使用`&`符号表示同级

下面带中，transition标签的name属性是`slide`

```scss
.title-top {
    // 过渡
    &.slide-enter,&.slide-leave-to{  // 类名前需要添加&
        transform: translate(0,-100%);
    }
    &.slide-enter-to, &.slide-leave{
        transform: translate(0,0);
    }
    &.slide-enter-active, &.slide-leave-active{
        transition: transform .3s;
    }
}
```

### input滑块的样式

通过background-size来控制两种背景的颜色。background-size需要动态设置

`background: linear-gradient(#999,#999) no-repeat #ddd;`
`background-size: 0% 100%;`

通过伪类选择器`::-webkit-slider-thumb`选择到中间的小滑块

```css
input{
    -webkit-appearance: none; /*去除默认样式*/
    width: 100%;
    height: px2rem(2);
    background: linear-gradient(#999,#999) no-repeat #ddd;
    background-size: 0% 100%;
    &:focus{
        outline: none;
    }
    &::-webkit-slider-thumb{ 设置滑块的样式
        -webkit-appearance: none;
        width: px2rem(9);
        height: px2rem(9);
        border-radius: 50%;
        border: 1px solid rgba(0, 0, 0, 0.15);
        background-color: #fff;
        box-shadow: 0 px2rem(2) px2rem(4) rgba(0, 0, 0, 0.25);
    }
}
```

### epubjs

生成Book对象

```js
let book = new Epub(url);
```

通过Book对象的renderTo方法生成rendtion对象

```js
this.rendtion = this.book.renderTo("book", {
    // book 是dom元素的id
    width: window.innerWidth,
    height: window.innerHeight
});
```

rendtion对象的display方法渲染电子书，返回的是promise对象

```js
this.rendtion.display()
```

获取themes对象

```js
this.theme = this.rendtion.themes;
```

注册主题register('主题名称' , '主题样式')  必须先注册所有的主题后，才可以设置

```js
this.theme.register(item.name, item.style);
```

设置主题select('主题名称')

```js
this.theme.select(this.themeList[index].name);
```

改变字体大小

```js
this.theme.fontSize(fontSize + "px")
```

获取书本的导航，navigation对象的toc数组，href是书本导航的锚点，label是导航标题

```js
this.book.navigation
```

导航跳转

```js
href：this.book.navigation.toc[0].href
this.rendtion.display(href)
```

获取location对象，书本的页面位置

```js
this.locations = this.book.locations;
this.book.locations.generate()   // 初始化获取书本位置
```

设置百分比的进度，percentage：一个百分比的数字

```js
this.locations.cfiFromPercentage(percentage)
```

上一页

```js
this.rendtion.prev();
```

下一页

```js
this.rendtion.next();
```

























