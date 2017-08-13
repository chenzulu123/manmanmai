//使用自执行函数
;
(function (window) {
    function IndexFunction() {
        this.init();
        // this.render();
    }
    IndexFunction.prototype = {
        constructor: IndexFunction,
        // 初始化方法

        // 优惠券
        //http://m.manmanbuy.com/images/ic_temai.png
        //title:优惠券
        // titlehref:quanindex.html
        init: function () {
            var that = this;
            $(function () {
                $.ajax({
                    //请求数据
                    url: 'http://139.199.192.48:9090/api/getindexmenu',
                    success: function (data) {
                        var arr = that.handleData(data);
                        var resultArr = [];
                        for (var i = 0; i < 8; i++) {
                            resultArr.push(arr[i])
                        }
                        resultArr.push({
                            src: 'http://m.manmanbuy.com/images/ic_temai.png',
                            name: '优惠券',
                            'titlehref': 'quanindex.html'
                        });
                        for (var j = 8; j < arr.length; j++) {
                            resultArr.push(arr[j]);
                        }
                        var obj = {
                            result: resultArr
                        }
                        //执行页面加载
                        that.render(obj);
                    }
                });
            });
        },
        handleData: function (data) {
            var result = data.result;
            var dataArray = [];
            for (var i = 0; i < result.length; i++) {
                var obj = {};
                var arr = result[i].img.split(' ');
                obj.src = 'http://m.manmanbuy.com/' + result[i].img.split(' ')[1].substring(5, arr[1].length - 1);
                obj.name = result[i].name;
                obj.titlehref = result[i].titlehref;
                dataArray.push(obj)
            }
            return dataArray;
        },
        loadMore: function () {
            var flag = false;
            $(function () {
                $('.menu_bar .bar').on('click', 'li:nth-child(8)', function () {
                    if (flag) {
                        $('.menu_bar .bar li:nth-child(n+9)').hide();
                        flag = false;
                    } else {
                        $('.menu_bar .bar li:nth-child(n+9)').show();
                        flag = true;
                    }
                });
            });
        },
        render: function (obj) {
            $('.menu_bar .bar').html(template('template', obj));
        },
        getDiscount: function () {
            $(function () {
                $.ajax({
                    url: 'http://139.199.192.48:9090/api/getmoneyctrl',
                    success: function (data) {
                        $('.discountList').html(template('template1', data));
                        // console.log(data.result[0]);
                    }
                });
            });
        }
    }
    window.IF = window.IndexFunction = IndexFunction;
}(window));