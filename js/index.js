 // 延迟a链接跳转
function delayURL(url) {
    setTimeout("top.location.href = '" + url + "'", 500);
}
//使用自执行函数
;
(function (window) {
    function IndexFunction() {
        this.init();
    }
    IndexFunction.prototype = {
        constructor: IndexFunction,
        //页面初始化
        init: function () {
            // 加载图标
            this.getMenu();
            // 获取折扣信息
            this.getDiscount();
            // 加载更多图标
            this.loadMore();
            this.goTop();
            this.showTime();
        },
        //获取导航按钮
        getMenu: function () {
            var that = this;
            $(function () {
                $.ajax({
                    //请求数据
                    url: 'http://139.199.192.48:9090/api/getindexmenu',
                    success: function (data) {
                        var srcArr = ['pages/price_compare.html', 'moneyctrl.html', 'gnzk.html', 'qcj_cabbage.html', 'haitao.html', 'discounts.html', 'haitao.html', '','collectSKU.html', 'pages/price_compare.html', 'storeNav.html', 'Brand.html'];
                        var arr = that.handleData(data);
                        var resultArr = [];
                        for (var i = 0; i < arr.length; i++) {
                            if (i != 7) {
                                arr[i].titlehref = srcArr[i];
                            }

                            resultArr.push(arr[i])
                        }
                        var obj = {
                            result: resultArr
                        }
                        //渲染页面模板
                        $('.menu_bar .bar').html(template('template', obj));
                    }
                });
            });
        },
        // 对请求返回的信息进行二次处理
        handleData: function (data) {
            var result = data.result;
            var dataArray = [];
            for (var i = 0; i < result.length; i++) {
                var obj = {};
                var arr = result[i].img.split(' ');
                // 重新拼接图片链接
                obj.src = 'http://m.manmanbuy.com/' + result[i].img.split(' ')[1].substring(5, arr[1].length - 1);
                obj.name = result[i].name;
                // 获取每个图标需要跳转的路径地址
                obj.titlehref = result[i].titlehref;
                dataArray.push(obj)
            }
            return dataArray;
        },
        // 按钮图标处理的方法
        loadMore: function () {
            // 定义第三方变量
            var flag = false;
            $(function () {
                // 为更多按钮图标添加点击显示和隐藏的功能
                $('.menu_bar .bar').on('tap', 'li:nth-child(8)', function () {
                    if (flag) {
                        //flag为true时从第九个按钮开始隐藏,执行完以后flag变为false
                        $('.menu_bar .bar li:nth-child(n+9)').hide();
                        // $('.menu_bar .bar li:nth-child(n+9)').slideUp(200);

                        flag = false;
                    } else {
                        // fla为false时从第九个按钮开始显示,执行完以后flag变为true
                        $('.menu_bar .bar li:nth-child(n+9)').show();
                        // $('.menu_bar .bar li:nth-child(n+9)').slideDown(200);

                        flag = true;
                    }
                });
            });
        },
        // 加载折扣信息的显示
        getDiscount: function () {
            $(function () {
                $.ajax({
                    // 获取数据信息
                    url: 'http://139.199.192.48:9090/api/getmoneyctrl',
                    success: function (data) {
                        // 渲染页面模板
                        $('.discountList').html(template('template1', data));
                    }
                });
            });
        },
        //返回页面顶部
        goTop: function () {
            $(function () {
                $('.go_top').tap(function () {
                    // 返回页面顶部
                    window.scrollTo(0, 0);
                });
            });
        },
        //进度条加载加载进度
        showTime: function () {
            $(function () {
                document.onreadystatechange = function () {
                    //判断请求的信息是否返回完毕
                    if (document.readyState == "complete") {
                        var img = $('img');
                        var num = 0;
                        // 循环页面加载的图片
                        img.each(function (i) {
                            var oImg = new Image();
                            oImg.onload = function () {
                                oImg.onload = null;
                                num++;
                                $('.loading b').html(parseInt(num / $('img').size() * 100) + "%");
                                // 判断页面上的图片是否加载完毕
                                if (num >= i) {
                                    var timeId = setInterval(function () {
                                        // 关闭遮罩层
                                        $('.loading').fadeOut();
                                        // 清除定时器
                                        clearInterval(timeId);
                                    }, 1000);
                                }
                            }
                            oImg.src = img[i].src;
                        });
                    }
                };
            });
        }
    }
    window.IF = window.IndexFunction = IndexFunction;

   
}(window));

