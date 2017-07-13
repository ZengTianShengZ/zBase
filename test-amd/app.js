/**
 * Created by bong on 2017/3/7.
 */
require.config({
    baseUrl:"../lib",
    paths:{
        "zbase": "zBase-1.2.0"
    }
});

require(["zbase"],function($){
    $('.test').css({
        width:'300px',
        height:'300px',
        color:"white",
        'font-size':'40px',
        background:"red"
    });
});

