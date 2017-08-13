$(function () {
    var aId = window.localStorage.getItem('id');
    $.ajax({
        url: 'http://139.199.192.48:9090/api/getdiscountproduct',
        data: {
            productid: aId
        },
        success: function (data) {
            // console.log(data);
            $('.container').append(template('template', data));
            $('.nav').append(template('template1', data));
            $('.tjdp').on('tap', function () {
                var myDate = new Date();
                console.log(myDate.toLocaleString());
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
                if ($('textarea').val().trim() == '') {
                    alert('请填写内容');
                    return;
                }
                var html = '<li class = "ui-border-b">' +
                    '<div class = "userimg">' +
                    '<img src = "images/cqcq.jpg">' +
                    '</div>' +
                    '<div class="con">' +
                    '<div class="name clearfix">' +
                    '<div class="username">ノ吥偠妳離開じ</div >' +
                    '<div class = "time"> ' + year + '/' + month + '/' + date + ' ' + h + ':' + m + ':' + s + ' </div>' +
                    '</div>' +
                    '<div class = "content">' + $('textarea').val() + '</div>' +
                    '</div>' +
                    '</li>';
                $('.list ul').append(html);
                $('textarea').val('');
            });
        }
    })

    $('.backTop').on('tap', function () {
        window.scrollTo(0, 0);
    })
})