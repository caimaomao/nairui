
 
$(document).ready(function(){
  //购物车
  $('.nav-cart').hover(function(){
     $('.nav-cart-message').slideDown(300);
  },function(){
     $('.nav-cart-message').slideUp(300);
  })
 
  //上滑框
  $('.playerBtn').click(function(e){
      e.stopPropagation()
     $('.pop').slideDown(200)
  })

  $('.close').click(function(e){
      e.stopPropagation()
     $('.pop').fadeOut()
  })
  /*轮播图*/
   var i = 0 ;
   var timer;

  //用jquery方法设置第一张图片显示，其余隐藏
  $('.ig').eq(0).show().siblings('.ig').hide();
   
  //调用showTime()函数（轮播函数）
  showTime();
   
  //当鼠标经过下面的数字时，触发两个事件（鼠标悬停和鼠标离开）
  $('.tab').hover(function(){
    //获取当前i的值，并显示，同时还要清除定时器
    i = $(this).index();
    Show();
    clearInterval(timer);
  },function(){
    //
    showTime();
  });
   
  //鼠标点击左侧的箭头
  $('.prev').click(function(){
    clearInterval(timer);
    if(i == 0){
      i = 5;//注意此时i的值
    }
    i--;
    Show();
    showTime();
  });
   
  //鼠标点击右侧的箭头
  $('.next').click(function(){
    clearInterval(timer);
    if(i == 4){
      i = -1;//注意此时i的值
    }
    i++;
    Show();
    showTime();
  });

   
//创建一个showTime函数
function showTime(){
  //定时器
  timer = setInterval(function(){
    //调用一个Show()函数
    Show();
    i++;
    //当图片是最后一张的后面时，设置图片为第一张
    if(i==5){
      i=0;
    }
  },2000);
}
 
 
//创建一个Show函数
function Show(){
  //在这里可以用其他jquery的动画
  $('.ig').eq(i).fadeIn(300).siblings('.ig').fadeOut(300);
   
  //给.tab创建一个新的Class为其添加一个新的样式，并且要在css代码中设置该样式
  $('.tab').eq(i).addClass('active').siblings('.tab').removeClass('active');
   
}



//选项卡切换
$('.Jm-ul li').mouseover(function(){
  $('.Jm-ul li').eq($(this).index()).addClass("active").siblings().removeClass('active');
  $('.tab-content div').hide().eq($(this).index()).show();
})

$('.tab-content div').mouseleave(function(){
   $('.Jm-ul li').eq($(this).index()).removeClass('active');
   $('.tab-content div').eq($(this).index()).hide();
})



//回到顶部
$('#Jtop').click(function(){
   $("html,body").animate({
     scrollTop:0
   },500)
})

//图片懒加载..
var Img=$('.Jlazy-descri img');
     lazyRender(Img);
    var timer;
    $(window).on('scroll',function() {
        if(timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(function(){//延时加载
          console.log('1')
          lazyRender(Img);
        },30)
    })
   
    //判断当前的img是否出现在了视野中
    function checkShow($img) {
      var scrollTop = $(window).scrollTop();
      var windowHeight = $(window).height();
      var offsetTop = $img.offset().top;
        //判断是否出现在视野中的两种情况:
        //一、目标图片的顶部是否小于滚动距离+浏览器窗口的高度，如果小于，证明没有加载过
        //二、目标图片顶部距离大于滚动距离，就加载..
      if(offsetTop < (scrollTop + windowHeight) && offsetTop > scrollTop) {
        return true;
      }
      return false;
    }

    function isLoaded($img) {//判断是否已经加载过..
      return $img.attr('data-src') === $img.attr('src');
    }
    
    function loadImg($img) {//把自定义属性的值赋值给图片的src
      $img.attr('src',$img.attr('data-src'));
    }

    function lazyRender($img) {
       $img.each(function () {
            if (checkShow($(this)) && !isLoaded($(this)) ){
                loadImg($(this));
            }
        })
    }

});
 
