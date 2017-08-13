$(window).load(function () {
    $.ajax({
        url: 'http://139.199.192.48:9090/api/getinlanddiscount',
        success: function (data) {
            console.log(data);
            // console.log(template('template',data));
            $('.ulBox').append(template('template', data));
        }
    });


    var flag = true;

    $(window).scroll(function () {
        if ($(document).scrollTop() >= $(document).height() - $(window).height()) {
            $.ajax({
                url: 'http://139.199.192.48:9090/api/getinlanddiscount',
                success: function (data) {
                    // console.log(data);
                    // console.log(template('template',data));
                    $('.ulBox').append(template('template', data));
                }
            });
            if (flag) {
                $('.icon-fanhuidingbu1').css({
                    'transform': 'scale(1)',
                    'opacity': '1',
                    'z-Index':99
                });
                flag = false;
            }
        }
    });

    // 本代码由钱春娇友情赞助
    $('.icon-fanhuidingbu1').on('click', function () {
        if (!flag) {
            setInter();
        }
    });

    //底部的‘返回顶部按钮’和右下角的返回顶部图标的点击事件

    var leader = 0; //定义当前位置
    var timerId = null;
    window.onscroll = function () { //调用页面卷曲的方法
        // if (scroll().top > 100) {
        //     $('#gotop').css('display', 'block');
        // } else {
        //     $('#gotop').css('display', 'none');
        // }
        leader = scroll().top;
    };

    function setInter() {
        timerId = setInterval(function () {
            var step = (0 - leader) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            leader = leader + step;
            window.scrollTo(0, leader);
            console.log(leader);

            if (leader == 0) {
                clearInterval(timerId);
            }

        }, 10)
    };
    // $('#gotop').tap(function () {
    // }); //触摸事件  
    // $('.backTop').tap(function () {
    //     setInter();
    // });
    //获取页面被卷曲的部分
    function scroll() {
        return { //只需要获取被上面卷曲的部分
            top: window.pageXOffset || document.documentElement.scrollTop || document.body.scrollTop,
        } 
    }

    $('.ulBox').on('tap', 'a', function () {
        var aId = this.dataset['id'];
        window.localStorage.setItem('id', aId);
    });

    $('.backTop').click(function () {
        window.scrollTo(0, 0);
    })


});
// 延迟a链接跳转
function delayURL(url) {
    setTimeout("top.location.href = '" + url + "'", 500);
}