
/*var Base = {
    getId:function (id) {
        return document.getElementById(id);
    },
    getName:function (name) {
        return document.getElementsByName(name);
    },
    getTagName:function (tagName) {
        return document.getElementsByTagName(tagName);
    },
    getClassName:function (className) {
        return document.getElementsByClassName(className);
    }

};*/

var $ = function (args) {
    return new Base(args);
}

function Base(args) {
    // 将  elements数组在这里声明，当 new Base();就会有一份新的 数组
    // elements 用来存放 节点数组
    this.elements = [];

    if(typeof args == 'string'){
        // css 模拟
        // 传进来的 字符串 有包含空格
        if(args.indexOf(' ') != -1) {
            var ele = args.split(' ');
            //console.log(".................."+ele.length);
            var childElements = [];
            var node = []
            for (var i = 0; i < ele.length; i++) {
                if(node.length == 0)
                    node.push(document);
                switch (ele[i].charAt(0)) {
                    case '#':
                        childElements = [];
                        childElements.push(this.getId(ele[i].substring(1)));
                        node = childElements;
                        break;
                    case '.':
                        childElements = [];
                        for( var j = 0;j<node.length;j++){
                          var temps = this.getClassName(ele[i].substring(1),node[j]);
                            for(var k=0;k<temps.length;k++){
                                childElements.push(temps[k]);
                            }
                        }
                         node = childElements;

                        break;
                    default :
                        childElements = [];
                        for( var j = 0;j<node.length;j++){
                            // 这里的 node 是上一次的子节点，在这一次变成了父节点来为这次的子节点做遍历！！！
                            var temps = this.getTagName(ele[i],node[j]);
                            for(var k=0;k<temps.length;k++){
                                childElements.push(temps[k]);
                            }
                        }
                        // 遍历的子节点变成父节点，供给下一次子节点的子节点用。
                        node = childElements;
                }
            }
            this.elements = childElements;
        }else{
            // find 模拟
            switch (args.charAt(0)){
                case '#':

                    this.elements.push(this.getId(args.substring(1)));

                    break;
                case '.':

                    this.elements =  this.getClassName(args.substring(1))

                    break;
                default :
                    this.elements =  this.getTagName(args)
                //  this.getTagName(args);

            }
        }

    }else if(typeof args == 'object'){
        // args 是一个对象，对象不存在就是 undefined ，而不是 ‘undefined’，带引号的是对象的类型，
        if(args != undefined){
            this.elements[0] = args
        }
    }

}
Base.prototype.find = function (str) {
    var childElements = [];
    for(var t = 0;t< this.elements.length;t++){
        switch (str.charAt(0)){
            case '#':
                // 虽然这么写，但没什么意义，因为 id是唯一的，想得到id不用利用他的父元素再来找id
                childElements.push(this.getId(str.substring(1)));
                break;
            case '.':
                var temp = this.getClassName(str.substring(1),this.elements[t]);
                for(var j = 0 ; j <temp.length;j++){
                    childElements.push(temp[j]);
                }

                break;
            default :
                console.log(".............");
                var temp = this.getTagName(str,this.elements[t]);
                console.log("............."+temp);
                for(var j = 0 ; j <temp.length;j++){
                    console.log("...vv..........");
                    childElements.push(temp[j]);
                }
        }
    }
    this.elements = childElements;
    return this;
}
// 注意： elements 不能放在 prototype 原型里面，不然参数会共享，
//Base.prototype.elements = [];


Base.prototype.getId = function (id) {
    // 创建一个数组 ，用来保存节点，或节点数组
    return document.getElementById(id);
    //this.elements.push(document.getElementById(id));

}

Base.prototype.getName = function (name) {

    var tags = document.getElementsByName(name);
    for(var t = 0;t<tags.length;t++){
        //[object HTMLParagraphElement]
        this.elements.push(tags[t]);
    }

}

Base.prototype.getTagName = function (tagName,parentNode) {

    var node = null;
    var temps = [];
    if(parentNode != undefined){
        node = parentNode;
        //  node 是 [object HTMLDivElement]  及 id 包含下的 html 片段
    }else{
        node = document;
        //  document   是   [object HTMLDocument]  及所有html 片段  ,typeof document 是 object
    }

    var tags = node.getElementsByTagName(tagName);
    for(var t = 0;t<tags.length;t++){
        //[object HTMLParagraphElement]
        temps.push(tags[t]);

    }
    return temps;

}

Base.prototype.getClassName =function (className,parentNode) {
    var node = null;
    var temps = [];
    if(parentNode != undefined){
        node = parentNode;
        //  node 是 [object HTMLDivElement]  及 id 包含下的 html 片段
    }else{
        node = document;
        //  document   是   [object HTMLDocument]  及所有html 片段  ,typeof document 是 object
    }

    var tags = node.getElementsByClassName(className);
    for(var t = 0;t<tags.length;t++){
        //[object HTMLParagraphElement]
        temps.push(tags[t]);

    }
    return temps;

}

/**
 * 给节点 添加 class name
 * @param className
 * @returns {Base}
 */
Base.prototype.addClass = function(className){
    for(var i=0; i<this.elements.length; i++){
        // 利用正则表达式 判断 添加的 classname 是否已经存在；
        // (\\s|^) 表示 空格或重第一个开始判断， (\\s|$) 表示 空格或 结束
        if(!this.elements[i].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))){
            this.elements[i].className += ' '+className;
        }
    }
    return this;
}

Base.prototype.removeClass = function(className){
    for(var i=0; i<this.elements.length; i++){
        // 先做个正则表达式 判断 是否存在 要替换的 class name ，
        if(this.elements[i].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))){
            // 如果存在，将 要替换的 name  = 空；再付给 elements[i]
            this.elements[i].className =  this.elements[i].className.replace(new RegExp('(\\s|^)'+className+'(\\s|$)'),'')
        }
    }
    return this;
}


/**
 * 获取 相同 节点 下的 第几个 节点
 *  $().getTagName("p").getElement(1)
 * @param num
 * @returns {Base}
 */
Base.prototype.getElement = function(num){
    var ele = this.elements[num];
    this.elements = [];
    // 清空后 重新赋值 ！！！！
    // 反正 就是 对 elements 进行操作就是了，elements保存了所有节点的信息
    this.elements[0] = ele;
    return this;
}

/**
 * 操作 css
 * @param css_type
 * @param value
 * @returns {Base}
 */

Base.prototype.css = function (css_type, value) {
    //  js 调用属性有 两种方法 ，xx.xx 或 xx[xx] ，这里传进的是一个字符串，所以用  xx[xx]
   var tags = this.elements.length;
    for(var t = 0;t<tags;t++){
        /*// 当只传进一个参数时，css_type，说明目的是为获取css样式，而不是设置，所以返回css 样式
        // 但这种方法有局限性，只能获取 行内 的 css 样式    <div id="div_id" style="color:red">  div_id  </div>
        if(arguments.length == 1){
            return this.elements[t].style[css_type];
        }*/

        //  接下来用第二中方法
        if(arguments.length == 1){

          if(typeof window.getComputedStyle != 'undefined'){  // W3C
              return window.getComputedStyle(this.elements[t],null)[css_type];
          }
          else if(typeof this.elements[t].currentStyle!='underfined'){  // IE
              return this;
          }
        }
        this.elements[t].style[css_type] = value;
    }

    return this;
}

/**
 *  操作 html
 * @param str
 * @returns {*}
 */
Base.prototype.html = function (str) {

    for(var t = 0;t<this.elements.length;t++){

        // 当不传参数 直接 调用 .html（） 时，就 将原本的 innerHTML 返回，而不是设置 innerHTML；
        // 如  $().getTagName("p").html() ；
        if(arguments.length == 0){
            return  this.elements[t].innerHTML;
        }
        // 当有参数时 设置  innerHTML = str;
        this.elements[t].innerHTML = str;
    }

    return this;

}


Base.prototype.click = function (fun) {
    for(var t = 0;t<this.elements.length;t++){
        this.elements[t].onclick = fun;
    }

    return this;
}

/**
 * 鼠标的 移入 移出 事件
 * @param over
 * @param out
 * @returns {Base}
 */
Base.prototype.hover = function(over,out){
    for(var t = 0;t<this.elements.length;t++){
        this.elements[t].onmouseover = over;
        this.elements[t].onmouseout = out;
    }
    return this;
}
/**
 *  将元素  显示 display = "block"
 * @returns {Base}
 */
Base.prototype.show = function(){
    for(var t = 0;t<this.elements.length;t++){
        this.elements[t].style.display = "block";
    }
    return this;
}
/**
 * 将元素 隐藏  display = "none"
 * @returns {Base}
 */
Base.prototype.hide = function(){
    for(var t = 0;t<this.elements.length;t++){
        this.elements[t].style.display = "none";
    }
    return this;
}

/**
 * 设置 div 在 当前窗口的 居中 位置
 * @param width   div 的 宽
 * @param heigh   div 的 高
 * @returns {Base}
 */
Base.prototype.centerInWindow = function(width,heigh){
    var top = (document.documentElement.clientHeight-heigh)/2;
    var left = (document.documentElement.clientWidth-width)/2;

    for(var t = 0;t<this.elements.length;t++){
        this.elements[t].style.top = top + "px";
        this.elements[t].style.left = left + "px";
    }
    return this;

}
Base.prototype.windowResize = function(fun){
    window.onresize = fun;
    return this;
}

/**
 * 将屏幕完全遮住的功能，如登陆弹窗，需要将背景置灰色透明
 * 用法  $().getId("screen")。screenLock（）;
 *
 * @returns {Base}
 */
Base.prototype.screenLock = function(){
    for(var t = 0;t<this.elements.length;t++){
        // 将 宽度 和 高度 设为 当前窗口的 大小
        this.elements[t].style.height = getInner().height +'px';
        this.elements[t].style.width = getInner().width +'px';
        this.elements[t].style.display = "block";
    }
    return this;
}
/**
 * 关闭屏幕遮住功能，配合  screenLock（） 方法使用
 * @returns {Base}
 */
Base.prototype.screenUnLock = function(){
    for(var t = 0;t<this.elements.length;t++){
        this.elements[t].style.display = "none";
    }
    return this;
}

/**
 *  插件接口  ，当一些比较不经常用的东西可以以插件的形式载入，避免 zBase 文件冗余
 *  <script type="text/javascript" src="../js/zBase_drag.js"></script>
 *  例如 一个 zBase_drag.js 插件，利用下面函数将插件的 内容加载到 原型函数中
 * @param name   插件函数名
 * @param fun    插件方法
 */
Base.prototype.extend = function (name ,fun) {
    Base.prototype[name] = fun;
};


/**
 * 封装现代事件 ，因为 存在 IE 的兼容问题，所以在 else 的 地方处理的比较麻烦
 * 添加事件
 * @param obj   元素节点，需要注册事件的 节点
 * @param type  事件类型 click 或 movie
 * @param fun   处理事件的方法
 * @returns {boolean}
 */
function addEvent(obj,type,fun) {
    if(typeof obj.addEventListener != "undefined"){
        obj.addEventListener(type,fun,false);
    }else{
        // IE 的 现代事件绑定有很多漏洞，所以用原始的事件绑定模拟 现代事件绑定
        //创建一个存放事件的哈希表
        if(! obj.events)
            obj.events = {};
        // 第一次执行时
        if(! obj.events[type]){
            // 创建一个存放事件处理函数的数组
            obj.events[type] = [];
            // 把第一次事件处理函数添加到第一个位置
            if(obj['on'+type])
                obj.events[type][0] = fun;
        }else{
            // 判断比较是否传进了重复的点击事件，是的话不做处理，跳过
            if(addEvent.equal(obj.events[type],fun))
                return false;
        }
        // 从第二次开始用事件计数器来存储
        obj.events[type][addEvent.ID ++] = fun;
        // 执行事件处理函数
        obj['on'+type] = addEvent.exec;
    }
}
                        // 直接 var ID =  1  为什么不行，因为全局变量是魔鬼 ID是给 addEvent用的，就应该是addEvent的变量
                        addEvent.ID = 1;
                        // 执行事件处理函数
                        addEvent.exec  =function (e) {
                             var e = event || addEvent.fixEvent(window.event);
                            var es = this.events[e.type];
                            for(var i in es){
                                es[i].call(this,e);
                            }
                        }
                        addEvent.equal = function (es,fun) {
                            for(var i in es){
                                if(es[i] == fun)
                                    return true;
                            }
                            return false;
                        }
                        // 把IE 常用的 Event 对象 配对到 W3C 中去 ， 其实也就是 重写 IE 的 默认方法
                        addEvent.fixEvent = function (e) {
                            //e.preventDefault() 是 w3c 的 方法
                            e.preventDefault() =addEvent.fixEvent.preventDefault;
                            e.stopPropagation() = addEvent.fixEvent.stopPropagation;
                            return e;
                        }
                        // IE 阻止默认行为
                        addEvent.fixEvent.preventDefault = function () {
                            // e.returnValue = false; 是 IE 的 方法
                            this.returnValue = false;
                        }
                        // IE 取消冒泡
                        addEvent.fixEvent.stopPropagation = function () {
                            this.cancelBubble = true;
                        }
/**
 *  移除 事件
 * @param obj   要移除的元素节点，需要移除事件的 节点
 * @param type  事件类型 click 或 movie
 * @param fun   处理事件的方法
 */
function removeEvent(obj,type,fun) {
   if(typeof obj.addEventListener != "undefined"){
         obj.addEventListener(type,fun,false);
         }else{
            for(var i in obj.events[type]){
                if(obj.events[type][i] == fun){
                    delete obj.events[type][i];
                }
        }
    }
}

/**
 *  跨浏览器获取视口大小
 * @returns {*}
 */
 function getInner(){
    if(typeof window.innerWidth != 'undefined'){
        // 直接 返回一个 对象  ，掉调调；
        return {
            width:window.innerWidth,  // google 和 IE
            height:window.innerHeight   //  在这种 方法下 火狐 有白边，滚动条的白边
        }
    }else{
        return {
            width:document.documentElement.clientWidth,  // google  Fixfox
            height:document.documentElement.clientHeight
        }
    }
}






















