$(function () {
    // 获取页面上的id的方法
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    //获取跳转信息的方法
    function getDiscountList() {
        $.ajax({
            url: 'http://139.199.192.48:9090/api/getmoneyctrl',
            success: function (data) {
                //获取url传递的id值
                var id = getUrlParam('id');
                for (var i = 0; i < data.result.length; i++) {
                    //通过页面传递的id来确定需要请求的数据内容
                    if (data.result[i].productId == id) {
                        //渲染模板页面
                        $('.container').html(template('template', data.result[i]));
                    }
                }
            }
        })
    }
    //执行获取跳转信息的方法
    getDiscountList();
    //增加评论
    function addComment() {
        //通过事件委托，为提交按钮增加点击事件
        // 由于使用一般的方法为提交按钮注册点击事件是没用的，元素在加载的时候，就去获取了，一次获取的结果是null
        // 所以这边需要使用事件委托的方式
        $('.container').on('tap', '.tjdp', function () {
            //创建dom元素
            var htmlDom = '<li><div class="userimg"><img src="http://bbs.manmanbuy.com/images/face/none.gif"></div>';
            htmlDom += '<div class="con"><div class="name clearfix"><div class="username">匿名用户</div><div class="time">2017/08/08 14:13:53</div></div>';
            // 获取用户的评论内容
            var text = $('#ctl00_ContentBody_txt_nr').val();
            if (text == '') {
                // 如果用户输入的评论内容为空时，使用表单中默认的评论内容
                htmlDom += '<div class="content">' + $('#ctl00_ContentBody_hid_name').val() + '</div>';
            } else {
                // 使用用户输入的评论内容
                htmlDom += '<div class="content">' + text + '</div>';
            }
            // 清除用户在输入框进行输入的内容
            $('#ctl00_ContentBody_txt_nr').val('');
            htmlDom += '</div></li>';
            // 把用户的评论内容添加到页面中进行显示
            $('.list ul').prepend(htmlDom);
        })
    }
    // 执行添加评论的方法
    addComment();
    function goTop() {
        $('.backTop').tap(function () {
            // 返回页面顶部
            window.scrollTo(0, 0);
        });
    }
    goTop();
})