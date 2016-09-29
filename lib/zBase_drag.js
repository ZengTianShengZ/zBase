/**
 * 当加载 zBase_drag.js  这个文件时，会执行这段代码，
 * 其中  $() 是  new Base(_this); new 出一个对象，
 * 对象执行 extend() 方法 ，这个方法是在 zBase.js  里面定义的一个方法，这个方法会将
 * 方法名 和 函数 加载到 对象的 原型中。 这样 下面的代码 就会像插件的形式插入 对象原型，给其他对象调用了。
 *
 * 为什么  new Base(_this); new 出一个的是一个新对象，而其他对象能调用新对象添加的方法呢，
 * 因为 下面是将方法添加到原型中，共享的
 */


/**
 *  盒子的 拖拽 功能
 */
$().extend("drag",function () {

     for(var t = 0;t<this.elements.length;t++){
         // var moveLogin = document.getElementById("login");
         this.elements[t].onmousedown = function(e){
             // 这里的 this 代表 moveLogin，因为在 moveLogin的方法里。
             var _this = this;
             // 兼容 IE
             var e = e || window.event;
             //  diffX 只 鼠标点在 moveLogin 容器里 距离 容器左边的 小 距离
             var diffX = e.clientX - _this.offsetLeft;
             var diffY = e.clientY - _this.offsetTop;

             // 为什么 onmousemove 和 onmouseup 用的是 document，而不是 moveLogin
             // 因为 如果是 在 moveLogin执行 onmousemove 和 onmouseup 操作，那么只是针对  moveLogin 的操作，
             // 当你 鼠标快速移动 离开了 moveLogin 区域，那么 onmousemove 和 onmouseup事件就被 屏幕给抓取了，
             // 你就不能继续 对 moveLogin执行onmousemove 和 onmouseup 操作了。
             // 所以 onmousemove 和 onmouseup 操作 全局交给 document 就可以了！！！！
             document.onmousemove = function(e){
                console.log('ddddddd');
                 var e = e || window.event;

                 var left =  e.clientX - diffX;
                 var top = e.clientY - diffY;
                 // 设置 最左边最右边，使之不能脱出 浏览器大小
                 if(left <0){
                     left = 0;

                 }else if(left <= getScroll().left){
                     left = getScroll().left;
                 }
                 else if(left > getInner().width - _this.offsetWidth){
                     left = getInner().width - _this.offsetWidth;
                 }
                 // 设置 最上边最下边，使之不能脱出 浏览器大小
                 if(top<0){
                     top = 0;

                 }else if(top <= getScroll().top){
                     top = getScroll().top;
                 }
                 else if(top > getInner().height - _this.offsetHeight){
                     top =  getInner().height - _this.offsetHeight;
                 }

                 _this.style.left = left + "px";
                 _this.style.top = top + "px";
             }
             document.onmouseup = function(){
                 // 这里的 this 代表 document，因为在 document 的方法里。
                 this.onmousemove = null;
                 this.onmouseup = null;
             }
         }


     }
     return this;
 })