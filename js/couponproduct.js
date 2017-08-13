var swiper;
$(function () {

  // 显示加载动画遮罩层
  $('.loading').show();
  $(".all").css({
    'opacity': 0
  });

  function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }
  var res = GetQueryString("couponId");
  var all = document.querySelector(".all")
  var xhr = new XMLHttpRequest();
  xhr.open('get', 'http://139.199.192.48:9090/api/getcouponproduct?couponid=' + GetQueryString("couponId")),
    xhr.onload = function () {
      // console.log(xhr.responseText);
      console.log(obj);

      var obj = JSON.parse(xhr.responseText);
      setTimeout(function () {
        $('.loading').hide(function () {
          $(".all").css({
            'opacity': 1
          });
        })
      }, 1000);

      $(".all").append(template("templateD", obj));


      // 生成轮播图
      var html = '';
      for (let i = 0, len = obj.result.length; i < len; i++) {
        html += '<div class="swiper-slide">' + obj.result[i].couponProductImg + '</div>'
      }
      $('.swiper-wrapper').html(html);
      swiper = new Swiper('.swiper-container', {
        // pagination: '.swiper-pagination',
        effect: 'cube',
        grabCursor: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        cube: {
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,

        }
      });
      $("#mask").hide();



      //隐藏遮罩层 


      var modelHeight = document.querySelector(".model-out").offsetHeight;
      // console.log(modelHeight);
      var downBtn = document.querySelectorAll("#downbtn");
      // console.log(downBtn);
      for (var i = 0; i < downBtn.length; i++) {
        downBtn[i].onclick = function (e) {
          var start = e.pageY
          window.scrollTo(0, start + modelHeight);
        }
      }
      //
      var upbtn = document.querySelectorAll("#left>img");
      var change = document.querySelector("#change");
      // console.log(upbtn);

      // 隐藏遮罩层
      $('#mask').on('click', function (e) {
        if (e.target == this) {
          $("#mask").hide();
          $('.swiper-container').css({
            'opacity':0,
          });
        }
      });
      // 

      $('#left>img').on('click', function (e) {
        if (e.target.nodeName == 'IMG') {
          $("#mask").show();
          $('.swiper-container').css({
            'opacity':1,
        });
        }
      });



    }

  xhr.send(null);

  //弹簧效果;
  function yourScroll() {
    var all = document.querySelector(".all")
    var startY;
    var preDistance = 0;
    var springs = 50;
    var maxUp = -(all.offsetHeight - all.parentNode.offsetHeight);
    all.addEventListener("touchstart", function (e) {
      if (e.targetTouches.length > 1) {
        return;
      }
      startY = e.targetTouches[0].clientY;
      all.style.transition = "none";
    });
    all.addEventListener("touchmove", function (e) {
      if (e.targetTouches.length > 1) {
        return;
      }
      var moveY = e.targetTouches[0].clientY;
      var distance = moveY - startY + preDistance;

      if (distance > springs) {
        distance = springs;
      } else if (distance < maxUp - springs) {
        distance = maxUp - springs;
      }
      all.style.transform = "translateY(" + distance + "px)";
    });

    all.addEventListener("touchend", function (e) {
      if (e.changedTouches.length > 1) {
        return;
      }
      var endY = e.changedTouches[0].clientY;

      preDistance += endY - startY;
      if (preDistance > 0) {
        preDistance = 0;
        all.style.transition = "transform .3s";
        all.style.transform = "translateY(" + preDistance + "px)";
      } else if (preDistance < maxUp) {
        preDistance = maxUp;
        all.style.transition = "transform .3s";
        all.style.transform = "translateY(" + preDistance + "px)";
      }
    });
  }

  //返回顶部
  var img = document.querySelector("#backtop")
  var leader = 0;
  var timer = null;
  window.onscroll = function () {
    if (scroll().top > 4000) {
      img.style.display = "block";
    } else {
      img.style.display = "none";
    }
    leader = scroll().top;
  }
  img.onclick = function () {
    timer = setInterval(function () {
      var step = (0 - leader) / 10;
      step = step > 0 ? Math.ceil(step) : Math.floor(step);
      leader = leader + step;
      window.scrollTo(0, leader);
      if (leader === 0) {
        clearInterval(timer);
      }
    }, 20);
  }
});

function scroll() {
  return {
    top: window.pageYOffset || document.documentElement.scrollTop,
    left: window.pageXOffset || document.documentElement.scrollLeft
  }
}