var shop_hi;
var where_hi;
var repetition;
//获取.加载商家菜单内容
function shopId() {
	var cIfy = document.querySelector('.shop-hide');
	var scre = document.querySelector('.screen');
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://139.199.192.48:9090/api/getgsshop');
	xhr.onload = function () {

		var json1 = JSON.parse(xhr.responseText);
		//创建新的 li标签添加到菜单内容中
		for (var k in json1.result) {
			var liDom = document.createElement('li');
			var aDom = document.createElement('a');
			aDom.innerHTML = json1.result[k].shopName;
			liDom.id = json1.result[k].shopId;
			liDom.appendChild(aDom);
			cIfy.appendChild(liDom);
		}
		var liArr = shop_hi = cIfy.querySelectorAll('li');
		//给第一个加上class 显示默认选中
		liArr[0].classList.add('on');
	}
	xhr.send(null);
}
shopId();

//获取.加载地点菜单内容
function shopWhere() {

	var cIfy = document.querySelector('.where-hide');
	var scre = document.querySelector('.screen');
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://139.199.192.48:9090/api/getgsshoparea');
	xhr.onload = function () {
		var json2 = JSON.parse(xhr.responseText);
		//创建新的 li标签添加到菜单内容中
		for (var k in json2.result) {
			var liDom = document.createElement('li');
			var aDom = document.createElement('a');
			aDom.innerHTML = json2.result[k].areaName;
			liDom.id = json2.result[k].areaId
			liDom.appendChild(aDom);
			cIfy.appendChild(liDom);
			//			console.log(liDom.id);
		}
		var liArr = where_hi = cIfy.querySelectorAll('li');
		//给第一个加上class 显示默认选中
		liArr[0].classList.add('on');
		//		console.log(aJareaId);
	}
	xhr.send(null);
}
shopWhere();
var datails = document.getElementById('datails');

//加载商品数据
function getData(sho, whe) {
	//	var datails = document.getElementById('datails');
	var xhr = new XMLHttpRequest();
	//	console.log(sho, whe);
	xhr.open('GET', 'http://139.199.192.48:9090/api/getgsproduct?shopid=' + sho + '&areaid=' + whe + '');
	xhr.onload = function () {
		//清空 ul中的内容
		datails.innerHTML = '';
		document.body.scrollTop = 0;
		var json3 = repetition = JSON.parse(xhr.responseText);
		//				console.log(json3.result[0]);
		//创建新的 li标签添加到ul中
		for (var i = 0; i < json3.result.length; i++) {
			for (var k in json3) {
				var newLi = document.createElement('li');
				newLi.innerHTML = '<i class="one"></i><i class="two"></i><i class="three"></i><i class="four"></i><a href="javascript:;" class="item border-img">' +
					'<div class="pic">' +
					'	<img src="' + json3[k][i].productImg + '">' +
					'</div>' +
					'<div class="title">' + json3[k][i].productName + '</div>' +
					'<div class="other">' +
					'<div class="price">' + json3[k][i].productPrice + '</div>' +
					'<div class="btn">去凑单</div>' +
					'<div class="clearfix"></div>' +
					'</div>' +
					'</a>';
				datails.appendChild(newLi);
			}
		}
	}
	xhr.send(null);
}
// 
document.querySelector('.icon-fanhuidingbu1').onclick = function () {
	if (!flag1) {
		setInter();

	}

};

//底部的‘返回顶部按钮’和右下角的返回顶部图标的点击事件

var leader = 0; //定义当前位置
var timerId = null;
// window.onscroll = function () { //调用页面卷曲的方法
// if (scroll().top > 100) {
//     $('#gotop').css('display', 'block');
// } else {
//     $('#gotop').css('display', 'none');
// }
// };

function setInter() {
	timerId = setInterval(function () {
		var step = (0 - leader) / 10;
		step = step > 0 ? Math.ceil(step) : Math.floor(step);
		leader = leader + step;
		window.scrollTo(0, leader);
		console.log(leader);

		if (leader == 0) {
			clearInterval(timerId);
		}

	}, 10)
};
// $('#gotop').tap(function () {
// }); //触摸事件  
// $('.backTop').tap(function () {
//     setInter();
// });
//获取页面被卷曲的部分
function scroll() {
	return { //只需要获取被上面卷曲的部分
		top: window.pageXOffset || document.documentElement.scrollTop || document.body.scrollTop,
	} //document.body.scrollTop 获取到移动端页面被卷曲的高度
}
// 
window.onload = function () {


	// 记录当前选中的 下标 
	var shopIndex = 0;
	var whereIndex = 0;
	//调用加载数据
	getData(shopIndex, whereIndex);

	(function () {
		var aBtn = document.querySelectorAll('.screen li');
		var aUl = document.querySelectorAll('.con-one-hide ul');
		var aI = document.querySelectorAll('.screen li i')
		for (var i = 0; i < aBtn.length; i++) {
			aBtn[i].classList.remove('bot');
			aI[i].classList.remove('icon-fanhuidingbu2');
			//						aUl[i].classList.remove('show');
			aUl[i].style.opacity = 0;
			aUl[i].style.height = 0 + 'px';
			aBtn[i].index = i;
			//商铺,地点菜单点击
			aBtn[i].onclick = function () {
				if (this.className.indexOf('bot') === -1) {
					for (var i = 0; i < aBtn.length; i++) {
						aBtn[i].classList.remove('bot');
						aI[i].classList.remove('icon-fanhuidingbu2');
						//						aUl[i].classList.remove('show');
						aUl[i].style.opacity = 0;
						aUl[i].style.height = 0 + 'px';

					}
					this.classList.add('bot');
					aI[this.index].classList.add('icon-fanhuidingbu2');
					var ulLi = aUl[this.index].children;
					//					aUl[this.index].classList.add('show');
					aUl[this.index].style.opacity = 1;
					aUl[this.index].style.height = ulLi.length * 2 + 'rem';
				} else {
					for (var i = 0; i < aBtn.length; i++) {
						aBtn[i].classList.remove('bot');
						aI[i].classList.remove('icon-fanhuidingbu2');
						//						aUl[i].classList.remove('show');
						aUl[i].style.opacity = 0;
						aUl[i].style.height = 0 + 'px';

					}
				};
				(function () {
					var shopA = document.querySelector('.shop a');
					var whereA = document.querySelector('.where a');
					for (var i = 0; i < shop_hi.length; i++) {
						shop_hi[i].index = i;
						//商铺下拉类点击
						shop_hi[i].onclick = function () {
							shopIndex = this.index;
							for (var i = 0; i < shop_hi.length; i++) {
								shop_hi[i].classList.remove('on');
							}

							this.classList.add('on');
							shopA.innerText = this.innerText;
							getData(shopIndex, whereIndex);
							for (var i = 0; i < aUl.length; i++) {
								aUl[i].classList.remove('show');
							}
							for (var i = 0; i < aBtn.length; i++) {
								aBtn[i].classList.remove('bot');
								aI[i].classList.remove('icon-fanhuidingbu2');
								//						aUl[i].classList.remove('show');
								aUl[i].style.opacity = 0;
								aUl[i].style.height = 0 + 'px';
							}
						};
					}
					for (var i = 0; i < where_hi.length; i++) {
						where_hi[i].index = i;
						//地点下拉类点击
						where_hi[i].onclick = function () {
							whereIndex = this.index;
							for (var i = 0; i < where_hi.length; i++) {
								where_hi[i].classList.remove('on');
							}
							this.classList.add('on');
							whereA.innerText = this.innerText.slice(0, 2);
							getData(shopIndex, whereIndex);
							for (var i = 0; i < aUl.length; i++) {
								aUl[i].classList.remove('show');
							}
							for (var i = 0; i < aBtn.length; i++) {
								aBtn[i].classList.remove('bot');
								aI[i].classList.remove('icon-fanhuidingbu2');
								//						aUl[i].classList.remove('show');
								aUl[i].style.opacity = 0;
								aUl[i].style.height = 0 + 'px';
							}
						};

					}

				})()

			}
		}
		//		console.log(aUl[0].children);
		//		console.log(aJareaId);

	})();

}
var flag1 = true;
var flag = true;
window.onscroll = function () {
	leader = scroll().top;

	var scro = scroll();

	function scroll() {
		return {
			//一个取到值，另一个为0；
			top: document.body.scrollTop + document.documentElement.scrollTop,
			left: document.body.scrollLeft + document.documentElement.scrollLeft
		};
	};


	//下拉加载商品数据
	(function () {
		if (document.documentElement.offsetHeight - (scro.top + document.documentElement.clientHeight) <= 30) {
			if (flag1) {
				document.querySelector('.icon-fanhuidingbu1').style.zIndex = 99;
				document.querySelector('.icon-fanhuidingbu1').style.transform = 'scale(1)';
				document.querySelector('.icon-fanhuidingbu1').style.opacity = 1;
				flag1 = false;
			}
			if (flag) {
				flag = false;
				setTimeout(function () {
					for (var i = 0; i < repetition.result.length; i++) {
						for (var k in repetition) {
							var newLi = document.createElement('li');
							newLi.innerHTML = '<i class="one"></i><i class="two"></i><i class="three"></i><i class="four"></i><a href="javascript:;" class="item border-img">' +
								'<div class="pic">' +
								'	<img src="' + repetition[k][i].productImg + '">' +
								'</div>' +
								'<div class="title">' + repetition[k][i].productName + '</div>' +
								'<div class="other">' +
								'<div class="price">' + repetition[k][i].productPrice + '</div>' +
								'<div class="btn">去凑单</div>' +
								'<div class="clearfix"></div>' +
								'</div>' +
								'</a>';
							datails.appendChild(newLi);
							flag = true;
						}
					}
				}, 1000);


			}
		}
	})();

}