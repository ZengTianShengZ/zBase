

/*

 base.getId("div_id").style.color = "red";
 base.getId("div_id").style.height = "100px";
 base.getId("div_id").style.width = "100px";
 base.getId("div_id").style.border = "1px solid blue";
 base.getId("div_id").style.background = "red";


 */

window.onload = function () {

    var  login =  $().getId("login");
    var screen = $().getId("screen");





    $().getId("login_close").click(function(){
        login.css("display","none");

        screen.screenUnLock();
    });

    $().getClassName("logo").click(function(){
        $().getId("login").css("display","block");
        login.centerInWindow(470,250);
        screen.screenLock();
    });

    window.onresize = function(){
        if(login.css("display") == "block"){
            login.centerInWindow(470,250);
            screen.screenLock();
        }

    }
    login.drag();


    console.log(      );
  
}


/*var cc = function(num1,num2){
    return num1*num2;
}
var xx = function(num1,num2){
    return cc.call(this,num1,num2);
}
alert(         xx(2,2)     );
console.log(   xx()   );*/


/*

/////////////////////////////拖动 登陆窗口/////////////////////////////////////////////

var moveLogin = document.getElementById("login");

 moveLogin.onmousedown = function(e){
 // 这里的 this 代表 moveLogin，因为在 moveLogin的方法里。
 var _this = this;
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

 var e = e || window.event;
 _this.style.left = e.clientX - diffX + "px";
 _this.style.top = e.clientY - diffY + "px";
 }
 document.onmouseup = function(){
 // 这里的 this 代表 document，因为在 document 的方法里。
 this.onmousemove = null;
 this.onmouseup = null;
 }
 }
 */



/*

 ////////////////////////轮播图///////////////////////////////////

 var indext = 1;

 var dotS = document.getElementsByTagName("span");


 $().getClassName("left_btn").click(function(){
 setScrollX(false);

 })
 $().getClassName("right_btn").click(function(){
 setScrollX(true);
 })


 function indexDotR(indext){
 dotS[indext].className ="" ;
 dotS[indext].className ="dot_buttom_bgOn" ;
 if(indext > 0){
 dotS[indext-1].className ="" ;
 dotS[indext-1].className ="dot_buttom_bgOff" ;
 }

 }
 function indexDotL(indext){
 dotS[indext].className ="" ;
 dotS[indext].className ="dot_buttom_bgOn" ;
 if(indext <= 3){
 dotS[indext+1].className ="" ;
 dotS[indext+1].className ="dot_buttom_bgOff" ;
 }

 }

 function setScrollX( tOrf){
 var scroll_list = $().getClassName("scroll_list");
 var scroll_px = parseInt(  scroll_list.css("left")  );
 if(tOrf){
 if(scroll_px <= -3250){
 scroll_px = 0;
 }
 scroll_px -= 650  ;

 scroll_list.css("left",scroll_px +"px" );

 if(indext > 4 ){
 dotS[4].className ="" ;
 dotS[4].className ="dot_buttom_bgOff" ;
 indext = 0;
 }
 indexDotR(indext);
 indext++;


 }else {
 if(scroll_px >= -650){
 scroll_px = -3250;
 }
 scroll_px += 650  ;

 scroll_list.css("left",scroll_px +"px" );

 indext--;

 if(indext <= 0 ){
 dotS[0].className ="" ;
 dotS[0].className ="dot_buttom_bgOff" ;
 indext = 4;
 }
 indexDotL(indext);


 }

 }




*/


//   console.log("..............."+  this.elements[0]     );


























