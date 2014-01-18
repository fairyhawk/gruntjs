function deldialog(){//弹出框关闭方法
	$(".dContent .dClose,.dCancel").click();
}
 $(function() {
	 leftShow();//左边特效
 	//搜索下拉展示效果
 	$(".gt-input").bind("focus", function() {
 		$(this).parent(".gt-search").addClass("gt-checked");
 		$(this).siblings(".gt-topmenulist").show();
 		$(this).val("");
 		$(this).focus();
 	})
 	$(".gt-input").bind("blur", function() {
 		$(this).parent(".gt-search").removeClass("gt-checked");
 		$(this).siblings(".gt-topmenulist").hide();
 		$(this).val("大家都在搜索...");
 	})
 	//发微博点击textarea后效果
 	$(".s-t-detail").bind("focus", function() {
 		$(this).parent(".send-txt-input").addClass("s-tarea-checked");
 		$(this).focus();
 	})
 	$(".s-t-detail").bind("blur", function() {
 		$(this).parent(".send-txt-input").removeClass("s-tarea-checked");
 	})
 	//表格隔行效果
 	$(".tab-challenge>table>tbody>tr:odd td").css("background-color" , "#F4FBFE");
 	$(".question-list>ul>li:odd").css("background-color" , "#FFFEF4");
 	//挑战详细显示
 	$(".tab-challenge>table>tbody>tr").each(function() {
 		var oM = $(this).children("td").find("p"),
 			oBtn = $(this).children("td").find(".chanllenge-more-btn");
 		oBtn.click(function() {
 			if (oM.is(":hidden")) {
 				oM.slideDown(200);
 				oBtn.addClass("open-c-m");
 				oBtn.children("tt").text("收起");
 			} else {
 				oM.slideUp(200);
 				oBtn.removeClass("open-c-m");
 				oBtn.children("tt").text("详情");
 			};
 		})
 	})
 	//排行榜序号效果
 	$(".ranking-list>li:lt(3) tt").addClass("lt3");
 	$(".cj-comment-list>dl:lt(3)>dt>span").addClass("lt3");
 	$(".WB-ranking-list>ul>li:lt(3) .order-num").addClass("lt3");
 	//评论排行效果
 	$(".cj-comment-list>dl").each(function() {
 		$(this).mouseover(function() {
 			$(this).addClass("cj-c-d-show").siblings().removeClass("cj-c-d-show");
 		})
 	})
 	//显隐成员信息层
 	$("#QM-list>ol>li").each(function() {
 		var oTime = null;
 		$(this).hover(function() {
 			var _this = $(this);
 				oTime = setInterval(function() {
 					_this.children(".QM-into-wrap").fadeIn(80);
 				}, 300);
 				_this.addClass("zIndex98");
 		}, function() {
 			var _this = $(this);
 			clearInterval(oTime);
 			_this.children(".QM-into-wrap").fadeOut(80);
 			_this.removeClass("zIndex98");
 		})
 	});
 })

 /*
 	公共弹出提示框&会话框方法
	dTitle : 标题；
	num    : 类型；
	num = 0 : 错误信息提示框;
	num = 1 : 正确信息提示框;
	num = 2 : 确认信息提示框; 
	num = 3 : 博客评论弹出框; 
	num = 4 : 发私信弹出框;
	num = 5 : 提示操作失败，渐出提示效果;
	num = 6 : 提示操作成，渐出提示效果;
 */
 var dialog = function(dTitle,num) {
 	var winW = document.documentElement.clientWidth,
 		winH = document.documentElement.clientHeight,
 		bMask = $('<div class="black-mask"></div>').appendTo($("body"));
 		bMask.css({
 			background : "#000000",
 			height : winH,
 			width : winW,
 			position : "fixed",
 			top : "0px",
 			left : "0px",
 			opacity : "0.3",
 			filter : "Alpha(opacity=30)",
 			zIndex : "10001"
 		});

 	var dCommEle = $('<div id="dialog-shadow" class="dialog-shadow"><div class="dContent"><header id="dHead" class="dHead"><span class="c-333 ml20">提示信息</span></header><a href="javascript:void(0)" title="关闭" class="dClose">&nbsp;</a><div id="dcWrap" class="dcWrap">提示</div></div></div>').appendTo($("body"));
 	var dContArr = [
	 		'<section class="dca dca0"><i class="icon26 dError">&nbsp;</i><span class="fsize14 c-555 ml5">'+dTitle+'</span>'+
	 		'<div class="mt20 mb10"><a href="" title="" class="comm-btn-orange queding0"><span>确定</span></a></div></section>',
	 		'<section class="dca dca1"><i class="icon26 dRight">&nbsp;</i><span class="fsize14 c-555 ml5">'+dTitle+'</span>'+
	 		'<div class="mt20 mb10"><a href="" title="" class="comm-btn-green queding1"><span>确定</span></a></div></section>',
	 		'<section class="dca dca2"><i class="icon26 dAsk">&nbsp;</i><span class="fsize14 c-555 ml5">确定删除?</span>'+
	 		'<div class="mt20 mb10"><a href="" title="" class="comm-btn-orange queding2"><span>确定</span></a><a href="javascript:void(0)" class="dCancel comm-btn-gray ml10"><span>取消</span></a></div></section>',
 			'<section class="dca dca3">'+
 			'<section><h6><span class="fsize14 c-555">引用：</span></h6></section>'+
 			'<section class="yinY-txt"><p id="yingyong"></p></section>'+
 			'<section class="mt10"><h6><span class="fsize14 c-555">评论：</span></h6></section>'+
 			'<section class="mt10"><textarea name="" class="dTextarea" id="replyContent"></textarea></section>'+
 			'<section class="mt10 tar mb20"><span class="mr10 vam"><tt class="c-red fsize12" id="wenzi" style="display: none;">您还没输入文字！</tt></span><a class="send-btn-wrap" title="" href=javascript:void(0)" id="reply"><span>评论</span></a></section>'+
 			'</section>',
 			'<section class="dca dca4">'+ 
 			'<section><h6><span class="fsize14 c-555">收信人：</span><span class="c-555 cusName"></span></h6></section>'+
 			'<section class="mt10"><h6><span class="fsize14 c-555">信件内容：</span></h6></section>'+
 			'<section class="mt10"><textarea name="" class="dTextarea" id="letterTextarea"></textarea></section>'+
 			'<section class="mt10 tar mb20"><span class="mr10 vam"><tt class="c-red fsize12"><span id="wenzistr"></span><span id="wenzinum"></span>字</tt></span><a class="send-btn-wrap" title="发信" href="javascript:void(0)" onclick="sendLetter()"><span>发信</span></a></section>'+
 			'</section>',
 			'<section class="dca dca5"><i class="icon26 dFade">&nbsp;</i><span class="fsize14 c-555 ml5">'+dTitle+'</span>'+
	 		'</section>',
	 		'<section class="dca dca5"><i class="icon26 dRight"></i><span class="fsize14 c-555 ml5">'+dTitle+'</span>'+
	 		'</section>',
 		];

 	$("#dcWrap").html(dContArr[num]);

	var sTop = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
 	var	dTop = (parseInt(winH, 10)/2) + (parseInt(sTop, 10)),
	dcW = $(".dca" + num).width() + 46,
	dcH = dCommEle.height() + 6,
	dHead = $(".dHead");
	dCommEle.css({
		position : "absolute",
		left : "50%",
		top : dTop - (dcH/2),
		marginLeft : -(dcW/2),
		zIndex : "10001"
	});
	dHead.css("width" , dcW + "px");

	var oTimer = null,
		closeFun;
	closeFun = function() {dCommEle.remove();bMask.remove();}
	if (num == 5||num == 6) {
		$(".black-mask").remove();
		$("#dHead").remove();
		$(".dClose").remove();
		oTimer = setTimeout(function() {
			dCommEle.fadeOut(1800);
			bMask.fadeOut(1800);
		}, 500);
		oTimer = setTimeout(function() {
			dCommEle.remove();
			bMask.remove();
		}, 2500);
		
		
	};
 	$(".dContent .dClose,.dCancel").click(function() {closeFun();});
 }

//拖动弹出框&提示框方法
function dragFun() {
	var eDrag = document.getElementById("dialog-shadow"),
	    oDrag = document.getElementById("dHead"),
        bDrag = false,
        disX = disY = 0;
	oDrag.onmousedown = function(event) {
		var event = event || window.event;
		bDrag = true;
		disX = event.clientX - eDrag.offsetLeft;
		disY = event.clientY - eDrag.offsetTop;
		this.setCapture && this.setCapture();
		return false;
	}
	document.onmousemove = function(event) {
		if(!bDrag) return;
		var event = event || window.event;
		var dL = event.clientX - disX;
		var dT = event.clientY - disY;
		var maxL = document.documentElement.clientWidth + (document.documentElement.scrollLeft || document.body.scrollLeft) - eDrag.offsetWidth;
		var maxT = document.documentElement.clientHeight + (document.documentElement.scrollTop || document.body.scrollTop) - eDrag.offsetHeight;
		dL = dL < 0 ? 0 : dL;
		dL = dL > maxL ? maxL : dL;
		dT = dT <0 ? 0 : dT;
		dT = dT > maxT ? maxT : dT;
		eDrag.style.marginTop = eDrag.style.marginLeft = 0;
		eDrag.style.left = dL + "px";
		eDrag.style.top = dT + "px";
		return false;
	}
	document.onmouseup = window.onblur = oDrag.onlosecapture = function() {
		bDrag = false;
		oDrag.releaseCapture && oDrag.releaseCapture();
	}
};
function leftShow() {//头部选中样式
	var all = '/weibo';//全站微博
	var hot = '/weibo/hot';//热门微博
	var my = '/weibo/my';//我的微博
	var attention = '/weibo/attention';//我关注的微博
	var most = '/weibo/most';//评论最多的微博
	var wushi = '/sug/wushi';//务实建议列表
	var yijing = '/sug/yijing';//意境建议列表
	var zh = '/sug/zh/';//智慧推荐建议猎捕
	var rx = '/sug/rx/';//热心推荐建议猎捕
	var tj = '/sug/tj/';//推荐建议
	var add = '/sug/add';//寻求建议
	var sugmy = '/sug/my';//我寻求的建议
	var mytj = '/sug/mytj';//我推荐的建议
	var myhd = '/sug/myhd';//我回答的建议
	var btj = '/sug/btj';//我被推荐的建议
	var group = '/letter';//群消息
	var friend = '/letter/frd';//好友消息
	var unfrd = '/letter/unfrd';//未处理好友消息
	var letter = '/letter/inbox';//发件箱站内信
	var outbox = '/letter/outbox';//收件箱站内信
	var system = '/letter/sys';//系统消息
	var myfriend = '/friend';//我的好友
	var attent = '/friend/attent';//我的关注
	var fans = '/friend/fans';//我的粉丝
	var black = '/friend/black';//黑名单
	var frircd = '/friend/frircd';//好友记录
	var sdfrircd = '/friend/sdfrircd';//收到的好友记录
	var dis = '/dis';//所有群
	var dishot = '/dis/hot';//热门群
	var dismy = '/dis/my';//我创建的群
	var join = '/dis/join';//我加入的群
	var disart = '/dis/myart';//我的群文章
	var blog = '/blog';//全部博文
	var bloghot = '/blog/hot';//热门博文
	var blogmy = '/blog/my';//我的博文
	var blogfriend = '/blog/fri';//好友博文
	var blogmost = '/blog/rep';//评论最多
	
		var pageUrl = window.location;//获得当前的url
		pageUrl = pageUrl + '';
		 if (pageUrl.indexOf(hot) != -1) {
			$(".hot").addClass('current');//
		}else if (pageUrl.indexOf(my) != -1) {
			$(".my").addClass('current');//
		} else if (pageUrl.indexOf(attention) != -1) {
			$(".attention").addClass('current');
		}else if (pageUrl.indexOf(most) != -1) {
			$(".most").addClass('current');
		} else if (pageUrl.indexOf(all) != -1) {
			$(".all").addClass('current');//
		} else if (pageUrl == sug) {
			$(".sug").addClass('current');//
		} else if (pageUrl.indexOf(wushi) != -1) {
			$(".sug").addClass('current');//
		}else if (pageUrl.indexOf(yijing) != -1) {
			$(".sug").addClass('current');//
		} else if (pageUrl.indexOf(tj) != -1) {
			$(".tj").addClass('current');
		}else if (pageUrl.indexOf(zh) != -1) {
			$(".tj").addClass('current');
		}else if (pageUrl.indexOf(rx) != -1) {
			$(".tj").addClass('current');
		} else if (pageUrl.indexOf(add) != -1) {
			$(".add").addClass('current');
		} else if (pageUrl.indexOf(mytj) != -1) {
			$(".my").addClass('current');
		} else if (pageUrl.indexOf(myhd) != -1) {
			$(".myhd").addClass('current');
		}else if (pageUrl.indexOf(btj) != -1) {
			$(".myhd").addClass('current');
		}else if (pageUrl.indexOf(sugmy) != -1) {
			$(".my").addClass('current');
		} else if (pageUrl.indexOf(friend) != -1) {
			$(".friendNum").addClass('current');
		}else if (pageUrl.indexOf(unfrd) != -1) {
			$(".friendNum").addClass('current');
		} else if (pageUrl.indexOf(letter) != -1) {
			$(".letterNum").addClass('current');
		}else if (pageUrl.indexOf(outbox) != -1) {
			$(".letterNum").addClass('current');
		} else if (pageUrl.indexOf(system) != -1) {
			$(".systemNum").addClass('current');
		}else if (pageUrl.indexOf(group) != -1 ) {
			$(".groupNum").addClass('current');//
		} else if (pageUrl.indexOf(attent) != -1) {
			$(".attent").addClass('current');
		} else if (pageUrl.indexOf(fans) != -1) {
			$(".fans").addClass('current');
		} else if (pageUrl.indexOf(black) != -1) {
			$(".black").addClass('current');
		} else if (pageUrl.indexOf(frircd) != -1) {
			$(".frircd").addClass('current');
		}else if (pageUrl.indexOf(sdfrircd) != -1) {
			$(".frircd").addClass('current');
		}else if (pageUrl.indexOf(myfriend) != -1  ) {
			$(".friend").addClass('current');//
		} else if (pageUrl.indexOf(dishot) != -1) {
			$(".hot").addClass('current');
		} else if (pageUrl.indexOf(join) != -1) {
			$(".myjoin").addClass('current');
		}else if (pageUrl.indexOf(disart) != -1) {
			$(".myart").addClass('current');
		}else if (pageUrl.indexOf(dismy) != -1) {
			$(".my").addClass('current');
		} else if (pageUrl.indexOf(dis) != -1) {
			$(".dis").addClass('current');//
		}else if (pageUrl.indexOf(bloghot) != -1) {
			$(".hot").addClass('current');
		}else if (pageUrl.indexOf(blogmy) != -1) {
			$(".my").addClass('current');
		} else if (pageUrl.indexOf(blogfriend) != -1) {
			$(".friend").addClass('current');
		}else if (pageUrl.indexOf(blogmost) != -1) {
			$(".most").addClass('current');
		} else if (pageUrl.indexOf(blog) != -1) {
			$(".blog").addClass('current');//
		} 
	}
