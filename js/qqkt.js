/**
 * Created by Administrator.
 */
var QQKT={
    loop: null,//定时器标识
    index: 0,//当前索引
    isTop: false,//是否滚动到顶部了
    /*鼠标移动到或移出回到顶部的图标时*/
    turnindex: 0,//左右翻动索引
    changeflybk: function(){
        $(".js_jump").hover(function(){
            $(this).prev(".fly").addClass("fly_hover");
        },function(){
            if( $(this).prev(".fly").hasClass("fly_hover")){
                $(this).prev(".fly").removeClass("fly_hover");
            }
        });
    },
    /*返回顶部*/
    scrollTotop: function(){
        $("body,html").animate({scrollTop: 0},"normal");
        $(this).parent().animate({top: -2000},"normal",function(){
            QQKT.isTop=true;
        });
    },
    flyhover: function(){
        $(".js_fly").mouseout(function(){
            if(QQKT.isTop){
                $(".js_jump").css({top: 0});
                QQKT.isTop=false;
            }
        });
    },
    /*显示返回顶部图标*/
    scrollevent: function(){
        //console.log(123);
        if($(this).scrollTop()>200){
            if($(".js_fly").css("opacity")==undefined||$(".js_fly").css("opacity")==0){
                $(".js_fly").stop().fadeTo(500,1);
                $(".js_jump").fadeTo(500,1);
                $(".fly").removeClass("fly_hover");
            }
        }
        else {
            if($(".js_fly").css("opacity")==1){
                $(".js_fly").stop().fadeTo(500,0);
                $(".js_jump").fadeTo(500,0);
            }
        }
    },
    //暂停轮播，显示左右两侧翻页图标
    showbanarrow: function(){
        $(".banner").hover(function(){
            clearInterval(QQKT.loop);
            $(this).children("a").fadeIn();
        },function(){
            QQKT.autobanner();
            $(this).children("a").fadeOut();
        });
    },
    /*1、自动轮播
      2、点击左右翻页
      3、鼠标移到圆点翻页
    */
    //自动轮播
    autobanner: function(){
        QQKT.loop=setInterval(function(){
            $("#nextimg").trigger("click");
        },5000);
    },
    //轮播主要函数
    scrollimg: function($banner){
        //console.log("li个数："+$banner.children("ul.js_imgwrap").find("li").length);
            $banner.children("ul.js_imgwrap").find("a").stop().hide().eq(QQKT.index).fadeIn();
            var $circle=$banner.find(".js_navur").children("li");
            $circle.eq(QQKT.index).
                addClass("on").siblings().removeClass("on");
            $banner.parents(".js_banbg").css("backgroundColor",$circle.eq(QQKT.index).data("color"));
    },
    //上翻
    previmg: function(){
            var total=$("#banner").children("ul.js_imgwrap").find("li").length;
            QQKT.index--;
            if(QQKT.index<=0){
                QQKT.index=total-1;
            }
            QQKT.scrollimg($("#banner"));
    },
    //下翻
    nextimg: function(){
        var total=$("#banner").children("ul.js_imgwrap").find("li").length;
        QQKT.index++;
        if(QQKT.index>total-1){
            QQKT.index=0;
        }
        QQKT.scrollimg($("#banner"));
    },
    //移动到小圆点的事件
    hovercircle: function(){
        QQKT.index=$(this).index();
        QQKT.scrollimg($("#banner"));
    },
    /*鼠标悬停效果*/
    hotcourse: function(event){
        var $target=$(this),
            indexs=$target.index();
        $(this).addClass("on").siblings().removeClass("on");
        if($target.parent().is(".js_pay")){
            $(this).parent().siblings(".js_show").hide().eq(indexs).show();
        }
        else {
            event.data.obj.children(".js_show").eq(indexs).show().siblings(".js_show").hide();
        }
    },
    pageturn: function(){
        var singlewidth=$("#compul li").eq(0).outerWidth(true);
        //console.log("singlewidth:"+singlewidth+"\n"+"current:"+QQKT.turnindex);
        $("#inner").animate({left: -QQKT.turnindex*singlewidth*8},1000);
    },
    turnright: function(){
       var total=Math.ceil($("#compul").find("li").length/8-1);
        //console.log("total:"+total);
        if(total>QQKT.turnindex){
            QQKT.turnindex++;
            QQKT.pageturn(QQKT.turnindex);
        }
    },
    turnleft: function(){
        if(QQKT.turnindex>0){
            QQKT.turnindex--;
            QQKT.pageturn(QQKT.turnindex);
        }
    }
};