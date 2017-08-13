// 第几页
var myPageNum = 1;
// 总页数
var totalPage;
//  分页数
var num = 0;
// 点击下一页
document.querySelector('#btnDown').addEventListener("click", function () {

  if ($(this).hasClass('disabled')) {
    return;
  }
  myPageNum++;
  num++;

  // 刷新页面
  getData()
});

// 点击上一页
document.querySelector('#btnUp').addEventListener("click", function () {

  if ($(this).hasClass('disabled')) {

    return;
  }
  myPageNum--;
  num--
  // 刷新页面
  getData()
});


// 选择搜索框翻页
$('#se').change(function () {
  myPageNum = $(this).val();
  num = myPageNum - 1
  console.log(myPageNum)
  getData();

})



// 滑动翻页$('.MMD_li')
itcast(document.querySelector('#listUl')).swipe(function (desc) {
  switch (desc) {
    case 'left':

      $('#btnDown').trigger('click');


      break;
    case 'right':
      $('#btnUp').trigger('click');
      break;

  }
})


// 获取数据

getData()

function getData() {
  $.ajax({
    url: "http://139.199.192.48:9090/api/getmoneyctrl",
    data: {
      pageid: myPageNum,
    },
    success: function (data) {
      // 需求2--渲染数据
      $("#listUl").html(template('template', data));
      console.log(data);
      totalPage = Math.ceil(data.totalCount / data.pagesize);
      var html = "";
      for (var i = 1; i <= totalPage; i++) {
        html += ' <option value="' + i + '" >' + i + '/' + totalPage + '</option>';
      }
      $('#se').html(html)
      $('#se>option').eq(num).prop('selected', true)

      if (num == totalPage - 1) {
        $('#btnDown').addClass('disabled')
      } else {
        $('#btnDown').removeClass('disabled')
      }
      if (num == 0) {
        $('#btnUp').addClass('disabled')
      } else {
        $('#btnUp').removeClass('disabled')
      }
      // var iscroll = new IScroll(".list");
    }
  })
}

// 進度條
$(function () {
  document.onreadystatechange = function () {
    //判断请求的信息是否返回完毕
    if (document.readyState == "complete") {
      var img = $('img');
      var num = 0;
      img.each(function (i) {
        var oImg = new Image();
        oImg.onload = function () {
          oImg.onload = null;
          num++;
          $('.loading b').html(parseInt(num / $('img').size() * 100) + "%");
          // <!--判断页面的图片是否加载完毕  -->
          if (num >= i) {
            var timeId = setInterval(function () {
              $('.loading').fadeOut();
              clearInterval(timeId);
            }, 2000);

          }
        }
        oImg.src = img[i].src;
      });
    }
  };
});

// 延迟a链接跳转
function delayURL(url) {
  setTimeout("top.location.href = '" + url + "'", 500);
}


// 返回顶部
function goTop() {
  $('.backTop').click(function () {
    // 返回页面顶部
    window.scrollTo(0, 0);
  });
}
goTop();