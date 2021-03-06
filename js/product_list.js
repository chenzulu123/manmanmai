$(function () {
    var categoryid = parseFloat(window.sessionStorage.getItem('id'));
    ajax(categoryid);
    var pageid = 1;
    ajax2(categoryid, pageid);

    //需要设置延迟实例化iscroll
    setTimeout(inita, 300);

    function inita() {
        if ($("#temp_load").height() == 0) {
            console.log("iScroll初始化失败重新初始化");
            setTimeout(inita, 300);
        }
        delay();
        myScroll.on("scroll", function () {
            if (myScroll.y - myScroll.maxScrollY <= -30) {
                $(".click_onload .iconfont").html('&#xe692;');
                sendajax();
            }
        });
    }

    //防止重复发送ajax请求 设立标志
    var flag = true;
    var timeid;

    function sendajax() {
        if (flag == true) {
            var str = '正在加载中';
            $(".click_onload em").html(str);
            timeid = setInterval(function () {
                if (str == '正在加载中....') {
                    str = '正在加载中';
                }
                str += '.';
                $(".click_onload em").html(str);
            }, 200)
            setTimeout(newOnload, 1500);
        }
        flag = false;
    }
    var myScroll;

    function delay() {
        myScroll = new IScroll('#wrapper', {
            scrollX: true,
            freeScroll: true,
            probeType: 2
        });
    }
    document.addEventListener('touchmove', function (e) {
        e.preventDefault();
    }, false);

    function newOnload() {
        clearInterval(timeid);
        pageid++;
        $.ajax({
            url: 'http://139.199.192.48:9090/api/getproductlist',
            type: 'get',
            data: {
                categoryid: categoryid,
                pageid: pageid
            },
            success: function (e) {
                load_product(e);
                myScroll.refresh();
            }
        })

    }

    // 发送ajax请求 获取标题信息
    function ajax(categoryid) {
        $.ajax({
            url: 'http://139.199.192.48:9090/api/getcategorybyid',
            type: 'get',
            data: {
                categoryid: categoryid
            },
            success: function (data) {
                load_list(data);
            },
            error: function (e) {
                console.log("未响应!");
            }
        })
    }

    function ajax2(categoryid, pageid) {
        $.ajax({
            url: 'http://139.199.192.48:9090/api/getproductlist',
            type: 'get',
            data: {
                categoryid: categoryid,
                pageid: pageid
            },
            success: function (e) {
                load_product(e);
            }
        })
    }

    //根据回来的ajax数据刷新页面
    function load_list(data) {
        $("#category").html(data.result[0]['category'])
    }
    //根据ajax2回来的数据刷新页面
    function load_product(data) {
        flag = true;
        $(".click_onload .iconfont").html('&#xe695;')
        $(".click_onload em").html('上拉获得更多');
        $("#temp_load").append(template('temp', data));
        if (Math.ceil(data.totalCount / data.pagesize) == pageid) {
            $(".click_onload").hide();
        }

    }
    $("#temp_load").on("tap", "li", function () {
        window.sessionStorage.setItem("productId", $(this).attr("productId"));
    })
})
// 延迟a链接跳转
function delayURL(url) {
    setTimeout("top.location.href = '" + url + "'", 500);
}