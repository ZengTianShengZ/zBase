# zBase --轻量级DOM操作库


### zBase-1.1.0  --v2

- 对 version 1 版本做了升级，优化DOM查找，简化API，提高代码可读性，支持模块化
- 支持 AMD & CommonJS


### zBase  --v1

- 没有任何依赖
- 轻量级的Dom操作库，封装一些常用的css选择器和事件操作等


# Quick start

```
$ npm install
$ gulp scripts
```

>使用npm安装 zBase：

```
$ npm install zbase
```


zBase是一个轻量级 DOM 操作库，里面封装了一些对元素节点的简单操作， 如节点的查询获取，className的添加移除，样式的添加移除， 节点的添加和移除，事件的封装，动画的封装等等...



# Usage


```
#require
var base = require('zbase');

#es6
import Base from 'zbase';
```

#### **一、节点的查找：**

**1、一般查找：**

| 语法        |    概述         |   
| ------------- |:-------------:| -----:|
| $('div_id')      | id = 'div_id' 的元素 |
| $('p')      | 所有 p 标签的元素   |   
| $('.className') | 所有 class = 'className'  的元素     |    
|      |   |
|  $(this)   |    当前 HTML 元素  |

**2、组合查找**
 在此前提下，你还可以任意组合，得到你所需要的节点，如：

| 语法        |    概述         |   
| ------------- |:-------------:| -----:|
| $('div_id p')      | id = 'div_id' 节点下的 所有 p 元素(注意中间空格) |
| $('.name1 .name2')      | 所有class = 'name1 ' 下的所有 class = 'name1 '元素     
| $('p a')      | 所有 p 标签下的 a 标签元素     |


**3、find查找**
利用 find() 方法来查找：

| 语法        |    概述         |   
| ------------- |:-------------:| -----:|
| $('p').find('a')      |  所有 p 标签下的 a 标签元素 |
| $('.name1').find('.name2') |  所有class = 'name1 ' 下的所有 class = 'name1 '元素   
| $('#div_1').find('div_2')      | `注意`这样也是行的，但没什么意义，最后得到的是 id= 'div_2' 的元素，与 id= 'div_2'没关系  |



#### **二 、操作节点**


**1、.addClass()**

```Javascript
//给 所有 p 标签 添加 一个'name_1'  的class

$('p').addClass('name_1')  

```
```Javascript
//添加多个  className
$('p').addClass('name_1 name_2')  

```

**2、.removeClass()**

```Javascript
//给 所有 p 标签 移除 一个'name_1'  的className
$('p').removeClass('name_1')  

```
```Javascript
//移除多个  removeClass
$('p').removeClass('name_1 name_2')  

```

**3、获取第几个节点  .getE()**
`注意`，`.getE()` 返回的是 `dom元素`，所以后面不能再执行链式操作
```Javascript
//得到 ul 里面的 第 3 个 li节点
$('ul li').getE(2)  

```

**4、getElement 获取第几个节点  **

与第 3 条不同的是 `.getElement()` 返回的是 `当前对象`，所以后面可以再执行链式操作
```Javascript
//得到 ul 里面的 第 3 个 li节点
$('ul li').getElement(2) .css('color','red');

```

**5、css方法**  

```Javascript
// 给所有 p 标签 添加 color样式
 $('p').css('color','red');
```

```Javascript
// 给所有 p 标签 添加多组样式
 $('p').css({
        "color":"red",
        "background":"blue"
    });
```

`说明`
```Javascript
// 当 参数只有一个时，获取该值
 $('p').css('color');
```

**6、获取 或 设置 某一节点的属性 .arrt()**

```Javascript
// 给所有 p 标签 添加 age 属性
$('p').arrt("age","233");

// 当参数只有一个时 ， 获得 p 标签下的属性值
$('p').arrt("age");
```

**7、html()获取或设置html  **
```Javascript
// 给所有 p 标签 设置 html
$('p').html("I love JavaScript！");

// 得到 html 值
$('p').html("age");
```




#### **三、事件操作**

**1、隐藏标签 show 和 hide方法**

```Javascript

$('p').show();

$('p').hide();

```

**2、hover()鼠标的移入移出事件；**

```Javascript
// hover传递两个函数，分别 用于处理 鼠标移入事件 和 鼠标移出 事件

 $('span').hover(function () {
        $('span').css("color","red");
    },function () {
        $('span') .css("color","blue");
    });
```

**3、addEvent(ele,type,fun) 添加事件 ;**
这里做了兼容  IE6、7、8
参数：ele：添加事件的元素节点 ， type：事件类型(click,movie等)，fun:执行事件函数
`注意：`第一个参数为`元素节点`，可用上面提到的  `getE()`  来获得
```Javascript

 addEvent($('#div_id').getE(0),'click',function () {
        alert(" 啊 ，我被点击啦~~~ ");
    });
```

**4、removeEvent(ele,type,fun) 移除事件**

```Javascript
//添加事件
 addEvent($('#div_id').getE(0),'click',f_click);
// 移除事件
 removeEvent($('#div_id').getE(0),'click',f_click);

 function f_click() {
    alert(" 啊 ，我被点击啦~~~ ");
 }
```

**5、绑定事件  bind();**



```Javascript
// 给所有的 span 标签 绑定点击事件

 $('span').bind('click',function () {
        console.log("........"+this);  //  ....[object HTMLSpanElement]
    });
```


#### **四、animate动画**


>**animate(obj);**


```Javascript
/
 * @param attr 样式 ，一般是 left 或 top
 * @param start 开始的位置
 * @param step 移动的距离
 * @param target 移动的终点
 * @param t 每次移动的毫秒
/
    $('#div_id').animate({
        'attr':'x',
        'start':100,
        't':500,
        'step':10,
        'alter':550
    });
```



>#### **五、一些工具方法**
**1、设置元素处在 视口中间位置 .centerInWindow()**

`传递的两个参数分别是 元素自身的 的 宽 和 高；`
```Javascript
// 传递的两个参数分别是 元素自身的 的 宽 和 高；
 $('#div_id').centerInWindow(100,100);
```

**2、获取当前视口的大小 getInner();**
返回 obj ，兼容 IE

```Javascript
  console.log("...width....."+ getInner().width);
  console.log("...height....."+ getInner().height);
```

**3、获取 浏览器滚动条的距离 getScroll()**

```Javascript
 console.log("...top....."+  getScroll().top);
console.log("...top....."+  getScroll().left);
```

**4、图片预加载 preprocessorImage(obj)**


参数 obj ：一个对象，里面是 图片的 链接数组 和 回调函数，如下例子：
加载完图片，再将 <img 标签插入 div 里面
```Javascript
 preprocessorImage({
                img_array:['http://img.pconline.com.cn/images/upload/upc/tx/wallpaper/1209/10/c1/13764273_1347270360314_800x600.jpg',
                    'https://cloud.githubusercontent.com/assets/15622519/18378764/61d0b4be-76a1-11e6-9571-36d785a35e56.png'],

                callback:function (img_src) {

                    $('#img-div').html( '<img class="bg-img" src="'+  img_src +'" alt="">');
                }
            });
```



#### **六、添加插件**

zBase库还支持扩展插件：

```Javascript
// 加载在 zBase.js 的后面
<script  src="../js/zBase_drag.js"></script>
```
那么这个js插件需要 用 `$().extend('name',fun)` 来扩展
`参数：`第一个参数为 插件的名称，第二个参数是 插件的实现函数
```Javascript
$().extend("drag",function () {

        // your code here...
}
```

那怎么调用写好的插件呢？ 比如我上面写了是一个 盒子拖拽的插件，那么我直接调用

```Javascript
 $('#div_id').drag();
```
此时，id = div_id 的元素就有了拖拽的功能了(前提这个 div 必须  position: absolute;)
关于 zBase_drag.js 插件源码可以查看的到。

有了插件扩展是不是很方便呢，可以为 zBase 库 扩展跟多自己实用的功能。


#### **七、ajax封装**

引入`zBase-ajax.js`文件：

```Javascript
<script src="../js/zBase-ajax.js"></script>
```
**ajax(obj);**
参数 obj 里面的属性说明：


```Javascript

  method ： 请求方式 -- get 或 post
  url ： 请求路径
  async ：true 为异步请求 ， false 为同步请求
  data ： 请求数据 ，为 一个 对象
  success ：请求成功时的回调函数
  error ：请求失败时的回调函数

```

```Javascript
 addEvent(document,'click',function () {
        ajax({
            method:'get',
            url:'https://api.github.com/users/ZengTianShengZ',
            async:true,
            data:{
                'name':'zeng',
                'age': 24
            },
            success:function (text) {
                alert(text);
            },
            error : function(error_status,error_statusText){
                alert(error_status + '.........' + error_statusText);
            }

        });
```


>项目有不足的地方欢迎大家 issues ，本类库适合做一些小项目时使用，主要避免了原生js操作dom的麻烦，以及浏览器的兼容问题

# LICENSE
(MIT License)

Copyright (c) 2016 ZengTianShengZ
