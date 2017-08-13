$(window).load(function () {
    $('.mask').show();
    $.ajax({
        url: 'http://139.199.192.48:9090/api/getsitenav',
        success: function (data) {
            $('.storeName').append(template('template', data)).slideDown(2000, function () {
                $('.mask').hide();
                $('.storeName a').css({'width':'36%','padding-left':'12%'});
            });
            console.log(data);
        }
    });
    $.ajax({
        url: 'http://139.199.192.48:9090/api/getproductcom',
        data:{productid:0},
        success: function (data) {
            
            console.log(data);
        }
    });
    yourScroll();

/**
 * 1 手动拖动
 *    touchend-是为了记录上一次移动的距离 preDistance
 *    在touchend里面 不能够preDistance=endY-startY; 因为还需要记录之前自己已经移动了的距离 所以需要+=
 * 2 弹簧效果
 *    1 需要在move里面限制下拉高度
 *    2 手指松开的时候 要反弹
 * 3 点击置顶
 */
function yourScroll() {
  // 获取目标元素
  var l_menu = document.querySelector('.storeName');

  // 记录手指按下的坐标
  var startY;

  // 记录以前一共移动了的距离  初始化的时候 一要要让它等于 0 
  // var preDistance;
  var preDistance = 0;

  // 弹簧的长度
  // var 弹簧 = 50;
  // alert(弹簧);
  var springs = 60;

  // 最大上滑的高度 上滑是一个负数
  var maxUp = -(l_menu.offsetHeight - l_menu.parentNode.offsetHeight);
  // console.log(maxUp);

  l_menu.addEventListener("touchstart", function (e) {
    /*
    1 记录手指按下的坐标
    2 判断手指的个数
    */
    if (e.targetTouches.length > 1) {
      return;
    }

    // 记录手指按下位置
    startY = e.targetTouches[0].clientY;
    // console.log(startY);

    // 清除过渡效果
    l_menu.style.transition = "none";
  });

  l_menu.addEventListener("touchmove", function (e) {
    // 判断手指的个数
    if (e.targetTouches.length > 1) {
      return;
    }

    // 记录当前的y坐标
    var moveY = e.targetTouches[0].clientY;

    // 当前移动的距离  --  需要加上上一次移动的距离  
    var distance = moveY - startY + preDistance;

    // 判断下拉的高度是否超出了弹簧的长度-是的话  让distance等于弹簧的长度
    if (distance > springs) {
      distance = springs;
    } else if (distance < maxUp - springs) {
      //  distance  -10000  maxUp -1000  -1050
      // maxUp 是一个负数 
      distance = maxUp - springs;
    }
    // 把这个距离设置到ul里面
    l_menu.style.transform = "translateY(" + distance + "px)";
  });

  l_menu.addEventListener("touchend", function (e) {
    // 判断手指的个数
    if (e.changedTouches.length > 1) {
      return;
    }

    // 记录手指离开的坐标
    var endY = e.changedTouches[0].clientY;

    // 上一次移动的距离  手指松开的时候 还需要记录 自己至之前移动了的距离 -否则的话  它的值都是只跟当前的一次按下-松开有关系
    preDistance += endY - startY;

    // 在这里需要判断 preDistance 如果它大于0的话 让ul反弹回去
    if (preDistance > 0) {
      preDistance = 0;
      // 设置位移   添加过渡
      l_menu.style.transition = "transform .6s";
      l_menu.style.transform = "translateY(" + preDistance + "px)";
    } else if (preDistance < maxUp) {
      // 只要preDistance 比maxup高的话 就可以反弹 -不用管弹簧的
      preDistance = maxUp;

      // 设置位移   添加过渡
      l_menu.style.transition = "transform .6s";
      l_menu.style.transform = "translateY(" + preDistance + "px)";
    }
  });
}
})