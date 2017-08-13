// 把需求2 需求3的代码抽取出来


function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
var res = GetQueryString("id");
getMoneyProduct(res)

function getMoneyProduct(num) {
    $.ajax({
        url: "http://139.199.192.48:9090/api/getmoneyctrlproduct",
        data: {
            productid: num
        },
        success: function (data) {
            // 需求2--渲染数据
             console.log( data.result[0])
            $('#mmb_container').html(template('template', data.result[0]))

        }
    })
}
// 进度条
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


//写评论$('.tjdp')
// document.querySelector('.tjdp').addEventListener('touchend', function () {


// })
$('#mmb_container').on('click', '#ctl00_ContentBody_Button1', function () {
    console.log(1);
    var arr1 = new Date().toLocaleString().split('/');
    var arr2 = new Date().toLocaleString();

    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth() + 1;
    var date = myDate.getDate();
    var h = myDate.getHours();
    var m = myDate.getMinutes();
    var s = myDate.getSeconds();
    if (h < 10) {
        h = '0' + h;
    }
    if (m < 10) {
        m = '0' + m;
    }
    if (s < 10) {
        s = '0' + s;
    }
    if ($('.form>textarea').val().trim() == '') {
        alert('请填写内容');
        return;
    }

    var html = '';
    html += '<li class="ui-border-b">';
    html += '<div class="userimg"><img src="./images/smile' + parseInt(Math.random() * 5 + 1) + '.jpg"></div>';
    html += '<div class="con">';
    html += '    <div class="name clearfix">';
    html += '            <div class="username">放肆的青春</div>';
    html += '            <div class="time">' + year + '/' + month + '/' + date + ' ' + h + ':' + m + ':' + s + '</div>';
    html += '        </div>';
    html += '        <div class="content">' + $('.form>textarea').val().trim() + '</div>';
    html += '    </div>';
    html += '  </li>';
    $('.list>ul').prepend(html);
    $('textarea').val('');

})


