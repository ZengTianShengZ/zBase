/**
 * ajax 请求网络数据 ，
 * 里面提供了get 请求，post 请求，
 * 以及判断 是同步还是异步请求
 *
 * @param obj  obj 请求的全部信息
 */
function ajax( obj ) {
    // 向服务器发送请求和 响应服务器 请求的 接口 ；
    var xhr = new XMLHttpRequest();
    // 请求 地址
    var url = obj.url;
    // 如果 IE 浏览器 不能实时更新数据，那么把这一句 加上！
    //var url = obj.url + '?rand' + Math.random();

    //  method ： 请求的 方式 ，‘get’ 或 ‘post’
    var method = obj.method;
    //  async 同步 还是 异步请求， false ，true
    var async = obj.async;
    // 发送给服务器的数据
    var data;
    if(obj.data != undefined){
        data = params( obj.data );
        if(method === 'get') {
            url += url.indexOf('?') == -1 ? '?' + data : '&' + data ;
        }
    }
    //  如果是 异步请求
    if(async === true){
        // 请求方式为 异步时 会 回调 这个函数；
        xhr.onreadystatechange = function () {
            //  readyState == 4 代表接受到全部响应数据；
            if(xhr.readyState == 4){
                callback();  // 回调函数
            }
        };
    }
    console.log(".......url........"+ url)
    xhr.open(method,url,async);

    if(method === 'post'){
        xhr.setRequestHeader('Content-Typr','application/x-www-form-urlencoded');
        if(data != undefined){
            xhr.send(data);
        }
    }else{
        xhr.send(null);
    }
    // 如果是 同步请求
    if(async === false){
        callback();
    }

    function  callback() {
        //  xhr.status == 200 代表服务器成功返回页面
        if(xhr.status == 200){
            // 回调 obj 对象 的 方法  ！！！
            obj.success(xhr.responseText);
        }else {
            obj.error(xhr.status,xhr.statusText);
        }
    }


}
/**
 * 解析  data 数据 ，data 是一个对象，将其对象属性转换成数组
 * @param data  包含 键值对 的 对象
 * @returns {string}  给 get 和 post 请求的 数组 数据
 */
function params(data) {
    var arr = [];
    for(var i in data){
        arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
    }
    // 将 arr 数组 默认的 ‘，’逗号分隔符 替换成 ‘&’
    return arr.join('&');
}