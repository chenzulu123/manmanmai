$(function () {
    var productid = window.sessionStorage.getItem("productId");
    ajax_prodetail(productid);
    ajax_procomments(productid);
    //获取商品详情
    function ajax_prodetail(productid) {
        $.ajax({
            url: "http://139.199.192.48:9090/api/getproduct",
            type: "get",
            data: {
                productid: productid
            },
            success: function (data) {
                //获取标题(分类)
                $.ajax({
                    url: "http://139.199.192.48:9090/api/getcategorybyid",
                    type: "get",
                    data: {
                        categoryid: data.result[0].categoryId
                    },
                    success: function (data) {
                        $(".cs_bread .category").html(data.result[0].category);
                        $(".cs_bread .category").attr("categoryId", data.result[0].categoryId);

                    }
                });
                console.log(data);
                //获取标题(品牌)
                $(".cs_bread .brandName").html(data.result[0].productName.split(" ")[0]);
                //商品详情
                $(".cs_goods_title").html(data.result[0].productName);
                $(".cs_goods_pic").append(data.result[0].productImg);
                $(".cs_goods_shopping .plist").append("table").html(data.result[0].bjShop);
            }
        });
    }
    //获取网友评价
    function ajax_procomments(productid) {
        $.ajax({
            url: "http://139.199.192.48:9090/api/getproductcom",
            type: "get",
            data: {
                productid: productid
            },
            success: function (data) {
                var comHTML = "<ul>";
                for (var i = 0; i < data.result.length; i++) {
                    comHTML += '<li class="clearfix">';
                    comHTML += '<div class="comName">' + data.result[i].comName + '</div>';
                    comHTML += '<div class="comTime">' + data.result[i].comTime + '</div>';
                    comHTML += '<br>';
                    comHTML += '<ul class="stars"></ul>';
                    comHTML += '<div class="comFrom">' + data.result[i].comFrom + '</div>';
                    comHTML += '<br>';
                    comHTML += '<div class="comContent">' + data.result[i].comContent + '</div>';
                    comHTML += '<br>';
                    comHTML += '<div class="comResponse"><a href="javascript:;">回复</a></div>';
                    comHTML += "</li>";
                }
                comHTML += "</ul>";                
                $(".evaluateContents").html(comHTML);
                stars();
            }
        }) 
    }
    function stars() {
        var num = Math.ceil(Math.random() * 5);
        for (var i = 0; i < num; i++) {
            $(".stars").append("<li></li>");
            $(".stars>li").html("★");
        }
    }

});