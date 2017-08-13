$(function () {

    ajax1();
    // 发送ajax请求 获取标题信息
    function ajax1() {
        // 获取分类的标题信息（ 大家电， 手机数码...）等8个数据然后渲染到分类标题上
        $.ajax({
            url: 'http://139.199.192.48:9090/api/getcategorytitle',
            type: 'get',
            success: function (data1) {
                load_title(data1);
                for (var i = 0; i < data1.result.length; i++) {
                    ajax2(parseInt(data1.result[i]['titleId']));
                }
            },
            error: function (e) {
                console.log("未响应!");
            }
        })
    }

    //发送ajax请求 获取列表信息
    function ajax2(titleid) {
        // 获取分类的分类列表然后渲染到分类标题上
        $.ajax({
            url: 'http://139.199.192.48:9090/api/getcategory',
            type: 'get',
            data: {
                titleid: titleid
            },
            success: function (e) {
                load_list(e);
            },
            error: function (e) {
                console.log("未响应!");
            }
        })
    }
    //根据ajax回来的数据 刷新标题
    function load_title(data) {
        $("#template_load").append(template('temp1', data));
        $('.brief_in').slideDown(500,function(){
            // $('.title').css({'padding-left':'16px','transition':'.5s'});
            for(let i=0,len=$('.title').length;i<len;i++){
                $('.title').eq(i).css({'padding-left':'16px','transition':'all .5s .'+(i+1)+'s'});
                $('.title').eq(i).children('span').css({'opacity':1,'transition':'all .5s .'+(i+1)+'s'});
            }
        });
    }
    //根据ajax回来的数据 刷新列表
    function load_list(data) {
        var categoryId = data.result[0]['titleId'];
        $('ul[categoryId="' + categoryId + '"]').append(template('temp2', data));
        // 延迟a链接跳转

    }

    $("#template_load").on('click', '.title', function () {
        $(".content").slideUp(400);
        $(".iconfont").removeClass('rotate');
        $(this).siblings('.content').slideDown(400);
        $(this).find('.iconfont').addClass('rotate');
    })
    $("#template_load").on('click', '.category', function () {
        window.sessionStorage.setItem('id', $(this).attr('categoryid'));
    })

})

function delayURL(url) {
    setTimeout("top.location.href = '" + url + "'", 500);
}