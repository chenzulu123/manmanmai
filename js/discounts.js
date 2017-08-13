$(function () {
  //获取数据
  var xhr = new XMLHttpRequest();
  xhr.open('get', 'http://139.199.192.48:9090/api/getcoupon');
  xhr.onload = function () {
    console.log(xhr.responseText);
    var obj = JSON.parse(xhr.responseText)
    $("#main").append(template("template1", obj));
    $("#main").append(template("template1", obj));
    $("#main").append(template("template1", obj));
    //

  }
  xhr.send(null);


  //
  var gap = document.querySelector(".gap");
  gap.addEventListener("touchstart", function () {
    gap.style.transform = "translate(200px,200px)";
  })

  //底部返回
  $("#backtop").click(function () {
    window.scrollTo(0, 0);
  })


});
// 延迟a链接跳转
function delayURL(url) {
  setTimeout("top.location.href = '" + url + "'", 500);
}