//白菜价tab栏 begin-----------------------------------------
//白菜价tab栏 请求数据
$.ajax({
    url: 'http://139.199.192.48:9090/api/getbaicaijiatitle',
    success: function (datas) {
        // console.log(datas)
        $('.cabbage_tab').html(template('templateTitle', datas))
    },
});
//白菜价 body部分，请求ajax数据,因为下面还要用到，这里封装成一个函数
function request(id) {
    
    $.ajax({
        url: 'http://139.199.192.48:9090/api/getbaicaijiaproduct',
        type: 'get',
        data: {
            titleid: id, //把获取到的点击的Li标签的id传进来。
        },
        success: function (datas) {
            $('.cabbage_body').html(template('templateProduct', datas));
            $('.items .picture img').error(function () {
                this.src = './images/2.jpg';
            });
        }
    })
};
var TitleID = 0; //页面加载时候，默认获取id为0的那一页
request(TitleID); //调用ajax获取数据函数

//白菜价tab栏 点击切换功能 (事件委托)
$('.cabbage_tab').on('tap', 'ul>li', function () {
    $(this).addClass('active').siblings('li').removeClass('active');
    TitleID = this.dataset['num']; //保存该li的titieId
    request(TitleID); //调用ajax请求的函数
    // 点击tab栏，头部的文字对应的改变：
    if ($(this).text() == '热销') {
        $('.cabbage_head h1').html('1小时' + $(this).text() + '-白菜价')
    } else if ($(this).text() == '全部') {
        $('.cabbage_head h1').html('白菜价-淘宝内部券');
    } else {
        $('.cabbage_head h1').html($(this).text() + '-白菜价')
    };

});



//白菜价tab栏 iscroll插件，实现tab滚动 
var myScroll;
loaded();

function loaded() {
    myScroll = new IScroll('#wrapper', {
        scrollX: true,
        scrollY: false,
        mouseWheel: true
    });
};
//底部的‘返回顶部按钮’和右下角的返回顶部图标的点击事件
backToTop();

function backToTop() {
    var leader = 0; //定义当前位置
    var timerId = null;
    window.onscroll = function () { //调用页面卷曲的方法
        if (scroll().top > 100) {
            $('#gotop').css('display', 'block');
        } else {
            $('#gotop').css('display', 'none');
        }
        leader = scroll().top;
    };

    function setInter() {
        timerId = setInterval(function () {
            var step = (0 - leader) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            leader = leader + step;
            window.scrollTo(0, leader);
            if (leader == 0) {
                clearInterval(timerId);
            }
        }, 10)
    };
    $('#gotop').tap(function () {
        setInter();
    }); //触摸事件  
    $('.backTop').tap(function () {
        setInter();
    });
};
//获取页面被卷曲的部分
function scroll() {
    return { //只需要获取被上面卷曲的部分
        top: window.pageXOffset || document.documentElement.scrollTop || document.body.scrollTop,
    } //document.body.scrollTop 获取到移动端页面被卷曲的高度
}