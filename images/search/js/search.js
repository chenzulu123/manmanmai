 $(function () {
     var id = window.localStorage.getItem('ID')
     var ip = window.localStorage.getItem('ip')
     console.log(ip);


     // 1
     $.ajax({
         url: 'http://139.199.192.48:9090/api/getbrand',
         data: {
             brandtitleid: id,
         },
         success: function (data) {
             $('.g-h-con').append(template('g-h-con', data))
             $('.hd-ghc').append(ip.replace("十大品牌", "") + '哪个好');

             // 2
             $.ajax({
                 url: 'http://139.199.192.48:9090/api/getbrandproductlist',
                 data: {
                     brandtitleid: id,
                     pagesize: ''
                 },
                 success: function (a) {
                     var eles=a.result;
                    //  console.log(eles)
                     $('.content').append(template('template',a));
                     $('.hd-age').append(ip.replace("十大品牌", "") + '销量排行');
                    $('.hd-ct').append(ip.replace("十大品牌", "") + '用户评论');
                     $('.T_Z').append(ip.replace("十大品牌", ""))
                    var elebs = null;
                    $.each(eles,function(index,ele){
                             // 3
                     $.ajax({
                         url: 'http://139.199.192.48:9090/api/getproductcom',
                         data: {
                             productid: id
                         },
                         success: function (b) {
                             elebs = b.result;
                            //  console.log(elebs)
                             for(var i=0; i<elebs.length;i++){
                                 elebs[i].productImg = eles[index].productImg;
                                  elebs[i].productName = eles[index].productName;
                             }
                             $('.c-c').append(template('getproductcom', b))
                         }
                     })
                    })
                
                 }
             })
         }
     })

    $('#T_top').click(function(){
            $(window).scrollTop(0);
        })

     //   $('.hd-ghc').append(ip.replace("十大品牌","")+'哪个好');
 })