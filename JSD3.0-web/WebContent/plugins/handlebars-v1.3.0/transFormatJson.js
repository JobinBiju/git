Handlebars.registerHelper("transFormatStyle", function(value) {
	switch (value) {
	case 1:
		return "等额本息";
		break;
	case 2:
		return "一次性还";
		break;
	case 3:
		return "每月付息";
		break;
	case 4:
		return "提前付息到期还本";
		break;
	case 5:
		return "每月提前还息到期还本";
		break;
	default:
		return ""
	}
});

Handlebars.registerHelper("transFormatType",
		function(value) {
			switch (value) {
			case 101:
				return new Handlebars.SafeString(
						'<img src="../../img/miao.png" />');// 秒还标
				break;
			case 102:
				return new Handlebars.SafeString(
						'<img src="../../img/xin.png" />');// 信用标
				break;
			case 103:
				return new Handlebars.SafeString(
						'<img src="../../img/pledge.png" />');// 抵押标
				break;
			case 104:
				return new Handlebars.SafeString(
						'<img src="../../img/jing.png" />');// 净值标
				break;
			case 105:
				return new Handlebars.SafeString(
						'<img src="../../img/bao.png" />');// 担保标
				break;
			case 108:
				return new Handlebars.SafeString(
						'<img src="../../img/yuyue.png" />');// 预约标
				break;
			case 110:
				return new Handlebars.SafeString(
						'<img src="../../img/flow.png" />');// 流转标
				break;
			case 112:
				return new Handlebars.SafeString(
						'<img src="../../img/offvouch.png" />');// 线下担保标
				break;
			case 113:
				return new Handlebars.SafeString(
						'<img src="../../img/bao.png" />');// 质押标
				break;
			case 115:
				return new Handlebars.SafeString(
						'<img src="../../img/shi.png" />');// 事业标
				break;
			case 116:
				return new Handlebars.SafeString(
						'<img src="../../img/lian.png" />');// 联名担保标
				break;
			default:
				return ""
			}
		});
// 时间转换 格式:2014-08-15 00:00:00
Handlebars.registerHelper("transFormatDate", function(value) {
	function formatDate(now) {
		var year = now.getFullYear();
		var month = now.getMonth() + 1;
		var date = now.getDate();
		var hour = now.getHours();
		var minute = now.getMinutes();
		var second = now.getSeconds();
		if (second < 10) {
			second = '0' + second;
		}
		if (minute < 10) {
			minute = '0' + minute;
		}
		return year + "-" + month + "-" + date + " " + hour + ":" + minute
				+ ":" + second;
	}
	if (value == null || value == '') {
		return '--';
	}
	var d = new Date(value);
	return formatDate(d);
});

//时间转换 格式:2014-08-15 00:00:00 查询活动红包的失效时间
Handlebars.registerHelper("rpActivityUnvalidFormatDate", function(value) {
	function formatDate(now) {
		var year = now.getFullYear();
		var month = now.getMonth() + 1;
		var date = now.getDate();
		var hour = now.getHours();
		var minute = now.getMinutes();
		var second = now.getSeconds();
		if (second < 10) {
			second = '0' + second;
		}
		if (minute < 10) {
			minute = '0' + minute;
		}
		return year + "-" + month + "-" + date + " " + hour + ":" + minute
				+ ":" + second;
	}
	if (value == null || value == '') {
		return '--';
	}
	var d = new Date(value);
	var a = new Date(d.valueOf() + 30 * 24 * 60 * 60 * 1000);
	return formatDate(a);
});

Handlebars.registerHelper("transActivityType", function(value) {
	if (value == 'indianaJones') {
		return "夺宝骑兵";
	}else {
		return value;
	}
});



Handlebars.registerHelper("convertTenderType", function(value) {
	if (value == 0) {
		return "网站投标";
	} else if (value == 1) {
		return "自动投标";
	} else if (value == 2) {
		return "手机投标";
	} else {
		return "错误的投资方式";
	}
});

// 格式:2014/08/15
Handlebars.registerHelper("noticeDateFormat", function(value) {
	function formatDate(now) {
		var year = now.getFullYear();
		var month = now.getMonth() + 1;
		var date = now.getDate();
		var hour = now.getHours();
		var minute = now.getMinutes();
		var second = now.getSeconds();
		if (second < 10) {
			second = '0' + second;
		}
		return year + "/" + month + "/" + date;
	}
	if (value == null || value == '') {
		return '';
	}
	var d = new Date(value);
	return formatDate(d);
});
// 格式:2014-08-15
Handlebars.registerHelper("noticeNewDateFormat", function(value) {
	function formatDate(now) {
		var year = now.getFullYear();
		var month = now.getMonth() + 1;
		var date = now.getDate();
		var hour = now.getHours();
		var minute = now.getMinutes();
		var second = now.getSeconds();
		if (second < 10) {
			second = '0' + second;
		}
		return year + "-" + month + "-" + date;
	}
	if (value == null || value == '') {
		return '';
	}
	var d = new Date(value);
	return formatDate(d);
});
// 格式: 12:10:11
Handlebars.registerHelper("timeDateFormat", function(value) {
	function formatDate(now) {
		var year = now.getFullYear();
		var month = now.getMonth() + 1;
		var date = now.getDate();
		var hour = now.getHours();
		var minute = now.getMinutes();
		var second = now.getSeconds();
		if (second < 10) {
			second = '0' + second;
		}
		return hour + ":" + minute + ":" + second;
	}
	if (value == null || value == '') {
		return '';
	}
	var d = new Date(value);
	return formatDate(d);
});

// 格式: 12:10:11
Handlebars.registerHelper("MyDateDateFormat", function(value) {
	function formatDate(now) {
		var year = now.getFullYear();
		var month = now.getMonth() + 1;
		var date = now.getDate();
		var hour = now.getHours();
		var minute = now.getMinutes();
		var second = now.getSeconds();
		if (second < 10) {
			second = '0' + second;
		}
		return year + "-" + month + "-" + date;
	}
	if (value == null || value == '') {
		return '';
	}
	var d = new Date(value);
	return formatDate(d);
});

Handlebars.registerHelper("MemberLevelJS", function(value) {
	if (value == "V1") {
		return "铜牌会员";
	}
	if (value == "V2") {
		return "银牌会员";
	}
	if (value == "V3") {
		return "金牌会员";
	}
	if (value == "V4") {
		return "钻石会员";
	}
});

// 格式:2014/08/15 12:00
Handlebars.registerHelper("noticeDateFormatNew", function(value) {
	function formatDate(now) {
		var year = now.getFullYear();
		var month = now.getMonth() + 1;
		var date = now.getDate();
		var hour = now.getHours();
		var minute = now.getMinutes();
		var second = now.getSeconds();
		if (month < 10) {
			month = '0' + month;
		}
		if (date < 10) {
			date = '0' + date;
		}
		if (hour < 10) {
			hour = '0' + hour;
		}
		if (second < 10) {
			second = '0' + second;
		}
		return year + "/" + month + "/" + date + " " + hour + ":" + second;
	}
	if (value == null || value == '') {
		return '';
	}
	var d = new Date(value);
	return formatDate(d);
});

Handlebars.registerHelper("transFormatStatus", function(status, scales) {
	if (status == 0) {
		return "未满标复审";
	} else if (status == 1) {
		return "满标复审通过";
	} else {
		return "满标复审未通过";
	}
});

// 添加判断是否满标复审通过
Handlebars.registerHelper("AddProtocol", function(status, scales, id) {
	if (status == 1 && scales == 100) {
		return '<a href="/member/invest/tenderProtocol.html?tenderId=' + id
				+ '" >下载协议</a>';
	} else {
		return "-";
	}
});
Handlebars.registerHelper("transFormatTenderStatus", function(status) {
	if (status == 0) {
		return "待审核";
	} else if (status == 1) {
		return "成功";
	} else {
		return "失败";
	}
});

// 添加判断是否投标成功
Handlebars.registerHelper("AddTenderProtocol", function(status, scales, id) {
	if (status == 1 && scales == 100) {
		return '<a href="/member/invest/tenderProtocol.html?tenderId=' + id
				+ '" >下载协议</a>';
	} else {
		return "-";
	}
});

// 我的投资-收款明细-期数
Handlebars.registerHelper("investPeriodFun", function(borrowStyle, period,
		timeLimit) {
	if (borrowStyle == 2) {
		return "1/1";
	}
	if (borrowStyle && timeLimit) {
		return (period + 1) + "/" + timeLimit;
	} else {
		return (period + 1) + "/" + 1;
	}
});

// 我的投资-收款明细-交易状态
Handlebars.registerHelper("transStatusFun", function(status) {
	if (status == 0) {
		return "待收";
	} else {
		return "已收";
	}

});

// --------------------我的借款-我的借款----------------------------
// 标题
Handlebars.registerHelper("logBorrowNameFun", function(name, id, addTime) {
	if (name.length > 5) {
		return new Handlebars.SafeString("<a href='/invest/detail.html?id="
				+ id + "&startTime=" + addTime + "&randomTime="
				+ (new Date()).getTime() + "' title='" + name
				+ "' target='_blank'>" + name.substring(0, 5) + "…</a>");
	} else {
		return new Handlebars.SafeString("<a href='/invest/detail.html?id="
				+ id + "&startTime=" + addTime + "&randomTime="
				+ (new Date()).getTime() + "' title='" + name
				+ "' target='_blank'>" + name + "</a>");
	}
})

// 标类型
Handlebars.registerHelper("borrowTypeName", function(type) {
	switch (type) {
	case 101:
		return "秒还标";
		break;
	case 102:
		return "信用标";
		break;
	case 103:
		return "车贷宝";
		break;
	case 104:
		return "净值标";
		break;
	case 110:
		return "流转标";
		break;
	case 112:
		return "担保标";
		break;
	case 113:
		return "能源宝";
	case 115:
		return "微商贷";
	case 105:
		return "分期宝";
	default:
		break;
	}
})
/*
 * 20141229 李建云
 */
Handlebars.registerHelper("borrowTypeFormatName", function(type) {
	if (type == "113") {
		return "能源宝";
	} else if (type == "103") {
		return "车贷宝";
	} else if (type == "115") {
		return "微商贷";
	} else if (type == "105") {
		return "分期宝";
	}
})
// 借款期限
Handlebars.registerHelper("logBorrowTimeLimitFun", function(type, isDay,
		timeLimit) {
	if (type == 101) {
		return "满标即还";
	} else if (isDay != undefined && isDay == 1) {
		return timeLimit + "天";
	} else {
		return timeLimit + "个月";
	}
})

// 进度条的显示
Handlebars.registerHelper("slideBar", function(accountYes, account) {
	showVal = ((accountYes / account) * 100).toString();
	showVal = showVal.substr(0, 4);
	return showVal;
})

// 状态
Handlebars.registerHelper("logBorrowStatusFun", function(status, scales, type,
		flow) {
	if (status == 0) {
		return "等待初审";
	} else if (status == 1 && flow == true) {
		return "已流标";
	} else if (status == 1 && scales != 100) {
		return "初审通过";
	} else if (status == 1 && scales == 100) {
		if(type == 113 || type == 115 ){
			return "还款中" ;
		}else{
			return "满标待审";
		}
	} else if (status == 2) {
		return "初审未通过";
	} else if (status == 3) {
		return "复审通过";
	} else if (status == 4 || status == 49) {
		return "复审未通过";
	} else if (status == -2) {
		return "撤回处理中";
	} else if (status == 5 || status == 59) {
		return "管理员撤回";
	} else if (status == 6) {
		return "还款中";
	} else if (status == 7) {
		return "部分还款";
	} else if (status == 8) {
		if (type == 110) {
			return "停止流转";
		} else {
			return "还款成功";
		}
	} else {
		return "已撤回";
	}
})
// 借款详情-状态（区分后台管理员撤回）
Handlebars.registerHelper("borrowMineStatusFun", function(status, scales, type,
		flow) {
	if (status == 0) {
		return "等待初审";
	} else if (status == 1 && flow == true) {
		return "初审通过(已流标)";
	} else if (status == 1 && scales != 100) {
		return "初审通过";
	} else if (status == 1 && scales == 100) {
		return "满标待审";
	} else if (status == 2) {
		return "初审未通过";
	} else if (status == 3) {
		return "复审通过";
	} else if (status == 4 || status == 49) {
		return "复审未通过";
	} else if (status == -2) {
		return "复审处理中";
	} else if (status == 5 || status == 59) {
		return "复审未通过";
	} else if (status == 6) {
		return "还款中";
	} else if (status == 7) {
		return "部分还款";
	} else if (status == 8) {
		if (type == 110) {
			return "停止流转";
		} else {
			return "还款成功";
		}
	} else if (status == 11) {
		return "待初审";
	} else {
		return "已撤回";
	}
})
// 债权状态
Handlebars.registerHelper("logCreditStatusFun", function(status) {
	if (status == "01") {
		return "可购买";
	}
	if (status == "02") {
		return "初审未通过"
	}
	if (status == "03") {
		return "复审通过";
	}
	if (status == "05") {
		return "已撤销";
	}
	if (status == "06") {
		return "待复审";
	}
	if (status == "07") {
		return "已结束";
	}
})
// 债权列表状态
Handlebars.registerHelper("ListCreditStatusFun", function(status,id) {
	if (status == "01") {
		return  new Handlebars.SafeString('<a href="/credit/index/creditDetail.html?id='+id+'" data-val="'+id+'" class="y_moreBids">立即认购</a>');
	}
	if (status == "02") {
		return  new Handlebars.SafeString('<a href="/credit/index/creditDetail.html?id='+id+'" data-val="'+id+'" class="y_moreBids c_refund_on">初审未通过</a>');
	}
	if (status == "03") {
		return  new Handlebars.SafeString('<a href="/credit/index/creditDetail.html?id='+id+'" data-val="'+id+'" class="y_moreBids c_refund_on">复审通过</a>');
	}
	if (status == "05") {
		return  new Handlebars.SafeString('<a href="/credit/index/creditDetail.html?id='+id+'" data-val="'+id+'" class="y_moreBids c_refund_on">已撤销</a>');
	}
	if (status == "06") {
		return  new Handlebars.SafeString('<a href="/credit/index/creditDetail.html?id='+id+'" data-val="'+id+'" class="y_moreBids c_refund_on">待复审</a>');
	}
	if (status == "07") {
		return  new Handlebars.SafeString('<a href="/credit/index/creditDetail.html?id='+id+'" data-val="'+id+'" class="y_moreBids c_refund_on">已结束</a>');
	}
})
// 债权剩余天数处理
Handlebars.registerHelper("getTimelimit", function(status) {
	 if(status <= 0 ){
		 return 0 ;
	 }else{
		 return status ;
	 }
})
// 操作
Handlebars.registerHelper("logBorrowOperateFun", function(status, type, id) {
	if (status == 0) {
		return '-';
	} else if (status == 6 || status == 7 || status == 8) {
		return "<a href='/member/borrow/repayment.html?borrowId=" + id
				+ "' >还款明细</a>";
	} else {
		return '-';
	}
})

// 协议下载
Handlebars.registerHelper("protocolBorrowerOperateFun", function(status, id,type) {
	if (status == 3 || status == 6 || status == 7 || status == 8) { // 添加判断是否满标复审通过
		return "<a href='/member/borrow/borrowerProtocol.html?borrowId=" + id
				+ "' >下载协议</a>";
	} else {
		if((type=="113" && status==1) || (type=="115" && status==1) ){
			return "<a href='/member/borrow/borrowerProtocol.html?borrowId=" + id
			+ "' >下载协议</a>";
		}
		return "-";
	}
})
// 协议下载
Handlebars.registerHelper("protocolTenderOperateFun", function(status, id,type) {
	if (status == 3 || status == 6 || status == 7 || status == 8) { // 添加判断是否满标复审通过
		return "<a href='/member/invest/tenderProtocol.html?tenderId=" + id
		+ "' >下载协议</a>";
	} else {
		if((type=="113" && status==1) || (type=="115" && status==1)){
			return "<a href='/member/invest/tenderProtocol.html?tenderId=" + id
			+ "' >下载协议</a>";
		}
		return "-";
	}
})

// --------------------我的借款-还款明细----------------------------
// 第几期
Handlebars.registerHelper("repayPeriodFun", function(borrowStyle,
		borrowTimeType, timeLimit, period) {
	if (borrowStyle != 2) {
		if (borrowTimeType == 1) {// 天标
			return "1/1";
		} else if (borrowTimeType == 0) {// 月标
			return (period + 1) + "/" + timeLimit;
		} else {
			return ""
		}
	} else {
		return "1/1";
	}
})

Handlebars.registerHelper("mainRepayPeriodFun", function(borrowStyle,
		borrowTimeType, timeLimit, currPeriod) {
	if (borrowStyle != 2) {
		if (borrowTimeType == 1) {// 天标
			return "第1期/共1期";
		} else if (borrowTimeType == 0) {// 月标
			return "第" + (currPeriod + 1) + "期/共" + timeLimit + "期";
		} else {
			return ""
		}
	} else {
		return "第1期/共1期";
	}
})

// 状态
Handlebars.registerHelper("repayStatusFun", function(status) {
	if (status == 0) {
		return '待还款';
	} else if (status == 2) {
		return '网站垫付';
	} else if (status == 1) {
		return '已还款';
	} else if (status == 3) {
		return '还款处理中';
	}
})

// 操作
Handlebars
		.registerHelper(
				"repayOpearteFun",
				function(status, id, api_code, is_open_deposit,
						repaymentAccount, lateInterest, useMoney, type) {
					if (type != 113 && type != 115) {
						if (status == 1) {
							return '已还款';
						} else if (status == 2) {
							return '<a href="javascript:;"  onClick=repay("/member/borrow/overduePayment.html?repaymentId='
									+ id + '") >逾期垫付还款</a>';
						} else if (status == 3) {
							return '处理中';
						} else {
							if (api_code == 3 && is_open_deposit == 1) {
								// return '<a href="javascript:;"
								// onClick=repay("/invest/repaySkip.html?repaymentId='+id+'")">还款</a>';
								var totalMoney = repaymentAccount
										+ lateInterest;
								return '<a href="javascript:;"  class="c_recharge_this" id="toPayBtn" data-val="'
										+ id
										+ '" data-total="'
										+ totalMoney
										+ '" date-money="'
										+ useMoney
										+ '">还款</a>';
							} else {
								// return '<a href="javascript:;"
								// onClick=repay("/member/borrow/repay.html?repaymentId='+id+'")>还款</a>';
							}
						}
					} else {
						return '';
					}
				})

// --------------------我的借款-信用额度----------------------------

// 新额度
Handlebars.registerHelper("accountNewFun", function(accountNew) {
	if (accountNew > 0) {
		return accountNew;
	} else {
		return "-";
	}
})

// 状态
Handlebars.registerHelper("amountStatusFun", function(status) {
	switch (status) {
	case -1:
		return "审核未通过";
	case 1:
		return "审核通过";
	default:
		return "正在审核";
	}
})

// 审核时间
Handlebars.registerHelper("verifyTimeFun", function(verifyTime, status) {
	if (status != 0 && status != 2) {
		function formatDate(now) {
			var year = now.getFullYear();
			var month = now.getMonth() + 1;
			var date = now.getDate();
			var hour = now.getHours();
			var minute = now.getMinutes();
			var second = now.getSeconds();
			if (second < 10) {
				second = '0' + second;
			}
			return year + "-" + month + "-" + date + " " + hour + ":" + minute
					+ ":" + second;
		}
		if (verifyTime == null || verifyTime == '') {
			return '';
		}
		var d = new Date(verifyTime);
		return formatDate(d);
	}
	return "-";
})

/*
 * 标名称隐藏 李建云
 */
Handlebars.registerHelper("hideBorrowName",function(borrowName) {
	if (borrowName.length > 7) {
		return new Handlebars.SafeString(borrowName.substr(0, 7)
					+ '…<div class="c_remark_info" style="display: none;left: 10px;"><b class="c_recharge_arrow"></b><span  style="font-size:12px;color:#555;">'
						+ borrowName + '</span></div>')
	} else {
		return borrowName;
	}
});

// 时间格式转换 2014-8-18 16:09:27
Handlebars.registerHelper("timeFormat", function(time) {
	function formatDate(now) {
		var year = now.getFullYear();
		var month = now.getMonth() + 1;
		var date = now.getDate();
		var hour = now.getHours();
		var minute = now.getMinutes();
		var second = now.getSeconds();
		if (second < 10) {
			second = '0' + second;
		}
		return year + "-" + month + "-" + date + " " + hour + ":" + minute
				+ ":" + second;
	}
	if (time == null || time == '') {
		return '';
	}
	var d = new Date(time);
	return formatDate(d);
})

// 时间格式转换 2014-9-4
Handlebars.registerHelper("timeMonthFormat", function(time) {
	function formatDate(now) {
		var year = now.getFullYear();
		var month = now.getMonth() + 1;
		var date = now.getDate();
		return year + "-" + month + "-" + date;
	}
	if (time == null || time == '') {
		return '';
	}
	var d = new Date(time);
	return formatDate(d);
})

// 时间格式转换 2014年7月10日 12:32:00
Handlebars.registerHelper("timeMsgFormat", function(time) {
	function formatDate(now) {
		var year = now.getFullYear();
		var month = now.getMonth() + 1;
		var date = now.getDate();
		var hour = now.getHours();
		var minute = now.getMinutes();
		var second = now.getSeconds();
		if (second < 10) {
			second = '0' + second;
		}
		return year + '年' + month + '月' + date + '日' + '' + hour + ':' + minute
				+ ':' + second;
	}
	if (time == null || time == '') {
		return '';
	}
	return formatDate(new Date(time));
})

// 分期宝日付金额计算
Handlebars.registerHelper("dayPaidMoney", function(value) {
	var money = value / 19 / 30;

	n = 2;
	money = parseFloat((money + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
	var l = money.split(".")[0].split("").reverse(), r = money.split(".")[1];
	t = "";
	for (i = 0; i < l.length; i++) {
		t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
	}
	return t.split("").reverse().join("") + "." + r;
})

// 时间格式转换 2014年7月10日
Handlebars.registerHelper("timeMsgFormatYMD", function(time) {
	function formatDate(now) {
		var year = now.getFullYear();
		var month = now.getMonth() + 1;
		var date = now.getDate();

		return year + '年' + month + '月' + date + '日';
	}
	if (time == null || time == '') {
		return '';
	}
	return formatDate(new Date(time));
})

// 积分商城图片链接
Handlebars.registerHelper("imgSrcAdd", function(imgSrc) {
	return $("#goods_list").data("href") + imgSrc;

});

// 积分商城剩余数量
Handlebars.registerHelper("remainCount", function(store, sellAcount,
		freezeStore) {
	return store - sellAcount - freezeStore;

});

// 积分商城动态链接图片
Handlebars.registerHelper("imgDemicSrc", function(imgSrc) {
	return $("#convert_dynamic_ul").data("href") + imgSrc;

});

// 发货状态转换 状态:0待审核,1审核通过,-1审核未通过,2已发货,3已收货
Handlebars.registerHelper("deliverStatus", function(status) {
	switch (status) {
	case 0:
		return '待审核';
		break;
	case 1:
		return '审核通过';
		break;
	case -1:
		return '审核未通过';
		break;
	case 2:
		return '已发货';
		break;
	case 3:
		return '已收货';
		break;
	default:
		return '';
	}

})

/*-------------------------首页-------------------------------------*/
// 标类型
Handlebars.registerHelper("investTypeName", function(type) {
	switch (type) {
	case 101:
		return "<em class='type5'></em>";
		break;
	case 102:
		return "<em class='type4'></em>";
		break;
	case 103:
		return "<em class='type1'></em>";
		break;
	case 104:
		return "<em class='type5'></em>";
		break;
	case 110:
		return "<em class='type3'></em>";
		break;
	case 112:
		return "<em class='type2'></em>";
		break;
	default:
		break;
	}
})
// 标标题截取
Handlebars.registerHelper("hideIndexBorrowName", function(name) {
	if (name.length > 18) {
		return new Handlebars.SafeString(name.substr(0, 18) + '…');
	} else {
		return name;
	}

});

Handlebars.registerHelper("timeLimitFormat", function(type, timeLimit,
		borrowTimeType) {
	if (type == 101) {
		return "满标即还";
	} else {
		if (borrowTimeType == 0) {// 月标
			return '<span><em class="specialFamily">' + timeLimit
					+ '</em>个月<span>';
		} else if (borrowTimeType == 1) {// 天标
			return '<span><em class="specialFamily">' + timeLimit
					+ '</em> 天<span>';
		}
	}

});

// 奖励显示
Handlebars
		.registerHelper("awardShowFun",
				function(award, partAccount, funds) {
					if (award == 1) {
						return new Handlebars.SafeString("投资比例奖励：<em>"
								+ partAccount + "</em>%");
					} else if (award == 2) {
						return new Handlebars.SafeString("分摊奖励：<em>" + funds
								+ "</em>元");
					} else {
						return "";
					}
				});

// 借款标状态显示
Handlebars.registerHelper("investBorrowStatus", function(status, account,
		accountYes) {
	switch (status) {
	case -1:
		return "用户取消";
		break;
	case 0:
		return "等待审批";
		break;
	case 1:
		if (account == accountYes) {
			return "等待复审";
		} else {
			return "招标中";
		}
		break;
	case 2:
		return "管理员撤回";
		break;
	case 3:
		return "复审通过";
		break;
	case 4:
		return "复审失败";
		break;
	case 5:
		return "用户取消";
		break;
	case 6:
		return "还款中";
		break;
	case 7:
		return "还款中";
		break;
	case 8:
		return "已还款";
		break;
	case 19:
		return "自动投标";
		break;
	case 59:
		return "用户取消";
		break;
	default:
		break;
	}
})

// 操作状态
Handlebars
		.registerHelper(
				"inverstListOptFun",
				function(scales, id, addTime) {
					if (scales == 100) {
						return new Handlebars.SafeString(
								'<a href="/invest/detail.html?id='
										+ id
										+ '&startTime='
										+ addTime
										+ '&randomTime='
										+ (new Date()).getTime()
										+ '" class="y_moreBids c_refund_on" title="还款中·查看详情" id="index_invest_btn">还款中·查看详情</a>');
					} else {
						var html = '<a  class="y_moreBids" href="/invest/detail.html?id='
								+ id
								+ '&startTime='
								+ addTime
								+ '&randomTime='
								+ (new Date()).getTime()
								+ '" title="立即投标" id="index_invest_btn">立即投标</a>'
						return new Handlebars.SafeString(html);
					}

				});

// 操作状态 冯国琴加
Handlebars
		.registerHelper(
				"inverstListOptFun2",
				function(scales, id, addTime, status,type) {

					if (scales == 100 && status == 8) {
						return new Handlebars.SafeString(
								'<a href="/invest/detail.html?id='
										+ id
										+ '&startTime='
										+ addTime
										+ '&randomTime='
										+ (new Date()).getTime()
										+ '" class="y_moreBids c_refund_on" title="还款成功！" id="index_invest_btn" style="color:#666;" >还款成功！</a>');

					} else if (scales == 100 && status == 3 || status == 6
							|| status == 7) {
						return new Handlebars.SafeString(
								'<a href="/invest/detail.html?id='
										+ id
										+ '&startTime='
										+ addTime
										+ '&randomTime='
										+ (new Date()).getTime()
										+ '" class="y_moreBids c_refund_on" title="还款中·查看详情" id="index_invest_btn" style="color:#666;">还款中·查看详情</a>');

					} else if (scales == 100 && status == 1&&(type=='113'||type=='115')) {
						return new Handlebars.SafeString(
								'<a href="/invest/detail.html?id='
										+ id
										+ '&startTime='
										+ addTime
										+ '&randomTime='
										+ (new Date()).getTime()
										+ '" class="y_moreBids c_refund_on" title="还款中·查看详情" id="index_invest_btn" style="color:#666;">还款中·查看详情</a>');

					} else if (scales == 100 && status == 1&&(type=='103'||type=='105')) {
						return new Handlebars.SafeString(
								'<a href="/invest/detail.html?id='
										+ id
										+ '&startTime='
										+ addTime
										+ '&randomTime='
										+ (new Date()).getTime()
										+ '" class="y_moreBids c_refund_on" title="已满标" id="index_invest_btn" style="color:#666;">已满标</a>');

					} 
					else if (status == 5 || status == 59) {
						return new Handlebars.SafeString(
								'<a href="/invest/detail.html?id='
										+ id
										+ '&startTime='
										+ addTime
										+ '&randomTime='
										+ (new Date()).getTime()
										+ '" class="y_moreBids c_refund_on" title="已流标" id="index_invest_btn"  style="color:#666;">已流标</a>');
					} else {
						var html = '<a  class="y_moreBids" href="/invest/detail.html?id='
								+ id
								+ '&startTime='
								+ addTime
								+ '&randomTime='
								+ (new Date()).getTime()
								+ '" title="立即投标" id="index_invest_btn">立即投标</a>'
						return new Handlebars.SafeString(html);
					}

				});
// 操作状态 郭俊辉添加
Handlebars
		.registerHelper(
				"inverstListOptFun1",
				function(scales, id, addTime) {
					if (scales == 100) {
						return new Handlebars.SafeString(
								'<a href="/invest/detail.html?id='
										+ id
										+ '&startTime='
										+ addTime
										+ '&randomTime='
										+ (new Date()).getTime()
										+ '"><div class="c_par_support" style="display: none;background:none repeat scroll 0 0 #ddd;color:#666;" ><span class="c_arrow"  style="color:#ddd;border-bottom: 10px solid #ddd;" ></span>还款中·查看详情</div></a>');
					} else {
						var html = '<a href="/invest/detail.html?id='
								+ id
								+ '&startTime='
								+ addTime
								+ '&randomTime='
								+ (new Date()).getTime()
								+ '"><div class="c_par_support" style="display: none;"><span class="c_arrow"></span>立即投标</div></a>'
						return new Handlebars.SafeString(html);
					}

				});

// 获取定时状态
Handlebars.registerHelper("inverstcountdown", function(fixedTime) {
	var html = "";
	if (fixedTime) {
		var d = new Date(fixedTime);
		var fmtDate = (d.getFullYear()) + '-' + (d.getMonth() + 1) + '-'
				+ d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':'
				+ d.getSeconds();
		html = "<div class=\"y_countDownNew\" data='" + fmtDate + "'></div>";
	}
	return new Handlebars.SafeString(html);
});
// 公告标题截取
Handlebars.registerHelper("hideNoticeTitle", function(title) {
	if (title.length > 20) {
		return new Handlebars.SafeString(title.substr(0, 20) + '…');
	} else {
		return title;
	}

});
// 公告简介截取
Handlebars.registerHelper("hideNoticIntroduction", function(introduction) {
	if (introduction.length > 30) {
		return new Handlebars.SafeString(introduction.substr(0, 30) + '…');
	} else {
		return introduction;
	}

});

// 媒体报道简介截取
Handlebars.registerHelper("hideMediaIntroduction", function(introduction) {
	if (introduction.length > 112) {
		return new Handlebars.SafeString(introduction.substr(0, 112));
	} else {
		return introduction;
	}

});

// 消息中心已读未读
Handlebars.registerHelper("msgRead",
		function(status) {
			switch (status) {
			case 0:
				return new Handlebars.SafeString(
						'<span class="c_site_noread">未读</span>');
				break;
			case 1:
				return new Handlebars.SafeString(
						'<span class="c_site_read">已读</span>');
				break;
			default:
				return '';
				break;
			}
		});

// 隐藏消息内容
Handlebars.registerHelper("hideMsgContent", function(content) {
	var content = content.replace(/<\/?[^>]*>/g, '');
	if (content.length > 34) {
		return new Handlebars.SafeString(content.substr(0, 34) + '…');
	} else {
		return content;
	}
});

// 取整
Handlebars.registerHelper("parseInt", function(value) {
	return parseInt(value);
})

// 借款者认证
Handlebars.registerHelper("thirdPartyIsOpen", function(thirdPartyIsOpen,
		thirdPartyAccount) {
	if (thirdPartyIsOpen == "N") {
		return "请立即开通";
	} else {
		return thirdPartyAccount;
	}
});
// 借款者认证
Handlebars.registerHelper("thirdPartyIsOpenBorrow", function(thirdPartyIsOpen,
		thirdPartyAccount) {
	if (thirdPartyIsOpen == "N") {
		return "请立即开通";
	} else {
		if (thirdPartyAccount.length > 11) {
			var tpAccount = thirdPartyAccount.substring(0, 7);
			var showtpAccount = tpAccount + "..."
			return showtpAccount;

		} else {

			return thirdPartyAccount;
		}
	}
});
//首页债权名称长度控制
Handlebars.registerHelper("getCreditName", function(thirdPartyAccount) {
	if (thirdPartyAccount.length > 11) {
		var tpAccount = thirdPartyAccount.substring(0, 8);
		var showtpAccount = tpAccount + "..."
		return showtpAccount;
	}else{
		return thirdPartyAccount ;
	}
});
// 待还月份
Handlebars.registerHelper("repaymentMonth", function(time) {
	var time = new Date(time);
	var month = parseInt(time.getMonth() + 1);
	if (month < 10) {
		month = "0" + month;
	}
	return time.getFullYear() + "." + month;
});
// 待还日
Handlebars.registerHelper("repaymentDay", function(time) {
	var time = new Date(time);
	var day = time.getDate();
	if (parseInt(day) < 10) {
		day = "0" + day;
	}
	return day;
})
// 正在借款项目
Handlebars.registerHelper("mineLink", function(value) {
	if (value == 0) {
		return "";
	} else {
		return "?status=1";
	}

})

// 实名认证
Handlebars
		.registerHelper(
				"transBorrowRealName",
				function(realNameStatus) {
					if (realNameStatus == "83") {
						return new Handlebars.SafeString(
								'<a title="实名已认证" hidefocus href="javascript:;" class="authenticationas authentication_user"></a>');
					} else if (realNameStatus == -1) {
						return new Handlebars.SafeString(
								'<a hidefocus href="/member/useridentify/identify.html" title="实名认证未通过" class="authenticationas authentication_userNo"></a>');
					} else if (realNameStatus == 2) {
						return new Handlebars.SafeString(
								'<a hidefocus href="/member/useridentify/identify.html" title="实名认证审核中" class="authenticationas authentication_userNo"></a>');
					} else {
						return new Handlebars.SafeString(
								'<a hidefocus href="/member/useridentify/identify.html" title="实名未认证" class="authenticationas authentication_userNo"></a>	');
					}
				});

Handlebars
		.registerHelper(
				"transRealName",
				function(realNameStatus) {
					if (realNameStatus == "83") {
						return new Handlebars.SafeString(
								'<a title="实名已认证" hidefocus href="javascript:;" class="authenticationas authentication_user"></a>');
					} else if (realNameStatus == -1) {
						return new Handlebars.SafeString(
								'<a hidefocus href="/member/useridentify/identify.html" title="实名认证未通过" class="authenticationas authentication_userNo"></a>');
					} else if (realNameStatus == 2) {
						return new Handlebars.SafeString(
								'<a hidefocus href="/member/useridentify/identify.html" title="实名认证审核中" class="authenticationas authentication_userNo"></a>');
					} else {
						return new Handlebars.SafeString(
								'<a hidefocus href="/member/useridentify/identify.html" title="实名未认证" class="authenticationas authentication_userNo"></a>');
					}
				});
// 借款者认证
Handlebars.registerHelper("transApi", function(apiStatus, apiUsercustName) {
	if (apiStatus == 0) {
		return "请立即开通";
	} else {
		return apiUsercustName;
	}
});

// 手机认证
Handlebars
		.registerHelper(
				"transBorrowMobile",
				function(mobilePhoneStatus) {
					if (mobilePhoneStatus == "86") {
						return new Handlebars.SafeString(
								'<a title="手机已认证" hidefocus href="javascript:;" class="authenticationas authentication_phone"></a>');
					} else {
						return new Handlebars.SafeString(
								'<a hidefocus href="/member/useridentify/identify.html" title="手机未认证" class="authenticationas authentication_phoneNo"></a>');
					}
				});
Handlebars
		.registerHelper(
				"transMobile",
				function(mobilePhoneStatus) {
					if (mobilePhoneStatus == "86") {
						return new Handlebars.SafeString(
								'<a title="手机已认证" hidefocus href="javascript:void(0)" class="authenticationas authentication_phone"></a');
					} else {
						return new Handlebars.SafeString(
								'<a hidefocus href="/member/useridentify/identify.html" title="手机未认证" class="authenticationas authentication_phoneNo"></a>');
					}
				});

// 邮箱认证
Handlebars
		.registerHelper(
				"transBorrowEmail",
				function(emailStatus) {
					if (emailStatus == "81") {
						return new Handlebars.SafeString(
								'<a title="邮箱已认证" hidefocus href="javascript:;" class="authenticationas authentication_email"></a>');
					} else {
						return new Handlebars.SafeString(
								'<a title="邮箱未认证" hidefocus href="/member/useridentify/identify.html"  class="authenticationas authentication_emailNo"></a>');
					}
				});
Handlebars
		.registerHelper(
				"transEmail",
				function(emailStatus) {
					if (emailStatus == "81") {
						return new Handlebars.SafeString(
								'<a title="邮箱已认证" hidefocus href="javascript:void(0)" class="authenticationas authentication_email"></a>');
					} else {
						return new Handlebars.SafeString(
								'<a title="邮箱未认证" hidefocus href="/member/useridentify/identify.html"  class="authenticationas authentication_emailNo"></a>');
					}
				});

// VIP认证
Handlebars
		.registerHelper(
				"transBorrowVip",
				function(vipStatus) {
					if (vipStatus == 1) {
						return new Handlebars.SafeString(
								'<i class="iconfont" style="color: #ff6955;">&#xe61e;</i>');
					} else if (vipStatus == 2) {
						return new Handlebars.SafeString(
								'<a  href="/member_borrow/security/realNameIdentify.html" title="VIP审核中"><i class="iconfont" style="color: #f1f1f1;">&#xe61e;</i></a>');
					} else if (vipStatus == 3) {
						return new Handlebars.SafeString(
								'<a  href="/member_borrow/security/realNameIdentify.html" title="已经过期"><i class="iconfont" style="color: #f1f1f1;">&#xe61e;</i></a>');
					}
				});
Handlebars
		.registerHelper(
				"transVip",
				function(vipStatus) {
					if (vipStatus == 1) {
						return new Handlebars.SafeString(
								'<i class="iconfont" style="color: #ff6955;">&#xe61e;</i>');
					} else if (vipStatus == 2) {
						return new Handlebars.SafeString(
								'<a  href="/member/security/realNameIdentify.html" title="VIP审核中"><i class="iconfont" style="color: #f1f1f1;">&#xe61e;</i></a>');
					} else if (vipStatus == 3) {
						return new Handlebars.SafeString(
								'<a  href="/member/security/realNameIdentify.html" title="已经过期"><i class="iconfont" style="color: #f1f1f1;">&#xe61e;</i></a>');
					}
				});

// 金额格式化 12,345.00
Handlebars.registerHelper("moneyFormat",
		function(money) {
			if (money == 0) {
				return money;
			} else {
				n = 2;
				money = parseFloat((money + "").replace(/[^\d\.-]/g, ""))
						.toFixed(n)
						+ "";
				var l = money.split(".")[0].split("").reverse(), r = money
						.split(".")[1];
				t = "";
				for (i = 0; i < l.length; i++) {
					t += l[i]
							+ ((i + 1) % 3 == 0 && (i + 1) != l.length ? ","
									: "");
				}
				return t.split("").reverse().join("") + "." + r;
			}
		});

// 金额格式化 12,345.00
Handlebars.registerHelper("moneyFormatNew", function(money) {
	if (money == 0) {
		return money;
	} else {
		// 返回的
		return money / 10000;
	}
});
// 截取2位小数点金额
Handlebars.registerHelper("moneyFormatNews", function(money) {
	money = money + "";
	var result = money.substr(0, money.indexOf(".") + 3);
	return result;
});

// 个人账户首页账户余额计算
Handlebars
		.registerHelper(
				"accountBalanceFun",
				function(useMoney, noUseMoney) {
					var accountBalance = parseFloat(useMoney + noUseMoney);
					n = 2;
					accountBalance = parseFloat(
							(accountBalance + "").replace(/[^\d\.-]/g, ""))
							.toFixed(n)
							+ "";
					var l = accountBalance.split(".")[0].split("").reverse(), r = accountBalance
							.split(".")[1];
					t = "";
					for (i = 0; i < l.length; i++) {
						t += l[i]
								+ ((i + 1) % 3 == 0 && (i + 1) != l.length ? ","
										: "");
					}
					return t.split("").reverse().join("") + "." + r;
					return accountBalance;
				});
// 更换客服各种状态处理
Handlebars
		.registerHelper(
				"changeKf",
				function(status) {
					var str = "";
					if (status == 5) {
						str = "<a hidefocus href=\"javascript:;\"  style=\"padding-left:13px;\">审核中</a>";
					} else if (status == 1) {// 可以更换客服了
						str = "<a hidefocus class='changekf' href=\"javascript:;\" title=\"点击更换客服\" style=\"padding-left:13px;\">更换客服</a>";
					} else if (status == 2) { // 审核失败
						// JSDP-126 20150519 sxy start
						//str = '<a hidefocus href="javascript:;" class="c_cf_re c_cf_re1" style="padding-left:13px;">投诉</a><span style="padding-left:10px;"></span><a hidefocus href="javascript:;" class="c_cf_re c_cf_re2"> 更换</a>';
						str = '<span style="padding-left:10px;"></span><a hidefocus href="javascript:;" class="c_cf_re c_cf_re2"> 更换</a>';
					}
					return str;
				});

// 公司类型判断
Handlebars.registerHelper("transCompanyType", function(companyType) {
	if (companyType == "70") {
		return "独资企业";
	}
	if (companyType == "71") {
		return "合伙企业";
	}
	if (companyType == "72") {
		return "公司企业";
	}
	if (companyType == "73") {
		return "个体工商户";
	}
})

// 投资详情借款期限
Handlebars
		.registerHelper("borrowLimitTime",
				function(borrowTimeType, timeLimit) {
					switch (borrowTimeType) {
					case 0:
						return new Handlebars.SafeString(
								'<em style="font-size: 38px;line-height: 70px;font-weight: bold;">' + timeLimit
										+ '</em>个月');
						break;
					case 1:
						return new Handlebars.SafeString(
								'<em style="font-size: 38px;line-height: 70px;font-weight: bold;">' + timeLimit
										+ '</em> 天');
						break;
					default:
						return "";
					}

				})

// 投资详情标类型
Handlebars
		.registerHelper(
				"borrowDetailsTypeName",
				function(type) {
					switch (type) {
					case 101:
						return new Handlebars.SafeString(
								'<i class="icon bid_type_icon bid_type_second float_left mt5"></i>秒还标');
						break;
					case 102:
						return new Handlebars.SafeString(
								'<i class="icon bid_type_icon bid_type_credit float_left mt5"></i>信用标');
						break;
					case 103:
						return new Handlebars.SafeString(
								'<i class="icon bid_type_icon bid_type_pledge float_left mt5"></i>抵押标');
						break;
					case 104:
						return new Handlebars.SafeString(
								'<i class="icon bid_type_icon bid_type_net float_left mt5"></i>净值标');
						break;
					case 110:
						return new Handlebars.SafeString(
								'<i class="icon bid_type_icon bid_type_flow float_left mt5"></i>流转标');
						break;
					case 112:
						return new Handlebars.SafeString(
								'<i class="icon bid_type_icon bid_type_guarantee float_left mt5"></i>担保标');
						break;
					default:
						break;
					}
				})

// 投资详情 项目描述
Handlebars.registerHelper("borrowDetailContent", function(content) {
	if (content == "") {
		return "暂无项目描述"
	} else {
		return new Handlebars.SafeString(content);
	}
});
// 投资详情 还款来源

// 投资详情 资金用途
Handlebars.registerHelper("borrowDetailBorrowUse", function(borrowUse) {
	switch (borrowUse) {
	case "1":
		return "短期周转";
		break;
	case "2":
		return "生意周转";
		break;
	case "3":
		return "生活周转";
		break;
	case "4":
		return "购物消费";
		break;
	case "5":
		return "不提现借款";
		break;
	case "6":
		return "其它借款";
		break;
	case "7":
		return "创业借款";
		break;
	default:
		return "暂无资金用途";

	}
});

// 序号增加
Handlebars.registerHelper("addOne", function(index) {
	this._index = index + 1;
	return this._index;
});

// 抵押价格比
Handlebars.registerHelper("overPercentWidth", function(account,
		totalAssessPrice) {
	return parseInt(parseInt(account) * 100 / parseInt(totalAssessPrice));
})

// 投资详情-实物照判断-档案照判断-担保函判断
Handlebars.registerHelper("borrowUploadsType", function(v1, v2, options) {
	if (v1 == v2) {
		// 满足添加继续执行
		return options.fn(this);
	} else {
		// 不满足条件执行{{else}}部分
		return options.inverse(this);
	}
});

// 判断相等
Handlebars.registerHelper("borrowPreview", function(v1, options) {
	var endDate = new Date(v1);
	var now = new Date();
	var leftTime = endDate.getTime() - now.getTime();
	if (leftTime > 0) {
		// 满足添加继续执行
		return options.fn(this);
	} else {
		// 不满足条件执行{{else}}部分
		return options.inverse(this);
	}
});
// 判断时间大小
Handlebars.registerHelper("equal", function(v1, v2, options) {
	if (v1 == v2) {
		// 满足添加继续执行
		return options.fn(this);
	} else {
		// 不满足条件执行{{else}}部分
		return options.inverse(this);
	}
});
// 投资详情-入库出库判断
Handlebars.registerHelper("mortgage_update", function(v1, v2, options) {
	if (v1 != v2) {
		// 满足添加继续执行
		return options.fn(this);
	} else {
		// 不满足条件执行{{else}}部分
		return options.inverse(this);
	}
});

// 判断不相等
Handlebars.registerHelper("inequality", function(v1, v2, options) {
	if (v1 != v2) {
		// 满足添加继续执行
		return options.fn(this);
	} else {
		// 不满足条件执行{{else}}部分
		return options.inverse(this);
	}
});
//JSDP-171 xingjia 20150714 start
// 判断不相等
Handlebars.registerHelper("gtpetCard", function(v1, v2, options) {
	if (v1 > v2) {
		// 满足添加继续执行
		return options.fn(this);
	} else {
		// 不满足条件执行{{else}}部分
		return options.inverse(this);
	}
});
//JSDP-171 xingjia 20150714 end

// 判断逾期借款时间
Handlebars.registerHelper("less", function(v1, options) {
	var time = parseInt((new Date()).valueOf());
	v1 = parseInt(v1);
	if (v1 < time) {
		// 满足添加继续执行
		return options.fn(this);
	} else {
		// 不满足条件执行{{else}}部分
		return options.inverse(this);
	}
});

// 投资详情-最小投资额度
Handlebars.registerHelper("bidLimit", function(value) {
	if (value == 0) {
		return "无限制"
	} else {
		return value
	}
})

// 投资详情-最大投资额度
Handlebars.registerHelper("bidMostLimit", function(value, borrowfee) {
	if (value == 0) {
		return new Handlebars.SafeString("单笔最大投标　<span>" + borrowfee
				+ "元</span>");

	} else {
		if (value > borrowfee) {
			return new Handlebars.SafeString("最多投标总额　<span>" + borrowfee
					+ "元</span>");
		} else {
			return new Handlebars.SafeString("最多投标总额　<span>" + value
					+ "元</span>");
		}
	}

})

// 投资详情-图片添加前缀
Handlebars.registerHelper("urlAdd", function(url, picPath) {
	return url + picPath;
})
// 投资详情-图片添加前缀
Handlebars.registerHelper("urlAddNew", function(url, picPath) {
	return url + "/" + picPath;
})
// 更新资产包 时间格式转换
Handlebars.registerHelper("updateTime", function(time) {
	time = new Date(time);
	var year = time.getFullYear();
	var month = time.getMonth() + 1;
	var day = time.getDate();
	return new Handlebars.SafeString(year + '<br>' + month + '/' + day);
})

// 更新资产包 超出比
Handlebars.registerHelper("beyondProportion", function(value1, value2) {
	return parseInt((value2 - value1) * 100 / value1);
})

// 标题
Handlebars.registerHelper("mainRepaymentNameFun", function(name, id) {
	if (name.length > 5) {
		return "<a href='/member_borrow/borrow/repayment.html?borrowId=" + id
				+ "' title=" + name + " target='_blank'>"
				+ name.substring(0, 5)
				+ "…</a><u><div class='mark_details_l'><i></i>" + name
				+ "</div></u>";
	} else {
		return "<a href='/member_borrow/borrow/repayment.html?borrowId=" + id
				+ "' title=" + name + " target='_blank'>" + name + "</a>";
	}
})
// 标题 于俊斐 新加
Handlebars.registerHelper("mainRepaymentNameFunNew", function(name, id) {
	if (name.length > 5) {
		return "<a href='/member_borrow/borrow/repayment.html?borrowId=" + id
				+ "' title=" + name + " target='_blank'>"
				+ name.substring(0, 5) + "…</a>";
	} else {
		return "<a href='/member_borrow/borrow/repayment.html?borrowId=" + id
				+ "' title=" + name + " target='_blank'>" + name + "</a>";
	}
})

// 借款人用户名
Handlebars.registerHelper("userNameFormat", function(name) {
	if (name.length > 5) {
		return "<a href='#' title=" + name + ">" + name.substring(0, 5)
				+ "…</a>";
	} else {
		return "<a href='#' title=" + name + ">" + name + "</a>";
	}
});

// 账户中心投资详情
Handlebars.registerHelper("memberInvestBtn", function(value) {
	if (value != 100) {
		return "立即投资";
	} else {
		return "查看详情";
	}
})

// 账户中心还款按钮
Handlebars.registerHelper("borrowHref", function(value) {
	var time = new Date(value);
	var year = time.getFullYear();
	var month = time.getMonth() + 1;
	var day = time.getDate();
	if (month < 10) {
		month = '0' + month;
	}
	if (day < 10) {
		day = '0' + day;
	}
	return "/member_borrow/borrow/repayment.html?status=0&startTime=" + year
			+ "-" + month + "-" + day + "&endTime=" + year + "-" + month + "-"
			+ day;
})

// 提现手续费判断 cashFeeBear 承担方： 1为平台 2为个人
Handlebars.registerHelper("cashFee", function(fee, cashFeeBear) {
	if (cashFeeBear == 1) {
		return "0";
	} else if (cashFeeBear == 2) {
		return fee;
	}
})

// 债权转让状态转化
Handlebars.registerHelper("convertCreditLogStatus", function(status) {
	if (status == "00") {
		return "未成交";
	} else if (status == "01") {
		return "已成交";
	} else if (status == "02") {
		return "撤回";
	} else {
		return "未指定的状态";
	}
});

/*******************************************************************************
 * 沈国平加 自动投标记录备注
 ******************************************************************************/
Handlebars.registerHelper("hideRemarkName", function(name) {
	if (name != null && name !="") {
		if (name.length > 6) {
			return new Handlebars.SafeString(name.substr(0, 6) + '…');
		} else {
			return new Handlebars.SafeString(name + '');
		}
	}
});

/*******************************************************************************
 * 沈国平加 自动投标记录状态
 ******************************************************************************/
Handlebars.registerHelper("borrowAutoInvestStatus", function(status) {
	if (status == "22") {
		return "失败";
	} else if (status == "11") {
		return "成功";
	}
});

/*******************************************************************************
 * 沈国平加 抽奖发放状态
 ******************************************************************************/
Handlebars.registerHelper("scoreAwardReceiveStatus", function(status) {
	if (status == "22") {
		return "未发放";
	} else if (status == "11") {
		return "已发放";
	}
});

/*******************************************************************************
 * 沈国平加 抽奖中奖状态
 ******************************************************************************/
Handlebars.registerHelper("scoreAwardStatus", function(status) {
	if (status == "22") {
		return "未中奖";
	} else if (status == "11") {
		return "中奖";
	}
});

/*******************************************************************************
 * 沈国平加 抽奖奖品等级转换
 ******************************************************************************/
Handlebars.registerHelper("awardLevelConvert", function(value) {
	switch (value) {
	case 1:
		return '一等奖';
		break;
	case 2:
		return '二等奖';
		break;
	case 3:
		return '三等奖';
		break;
	case 4:
		return "四等奖";
		break;
	case 5:
		return "五等奖";
		break;
	case 6:
		return "六等奖";
		break;
	case 7:
		return "七等奖";
		break;
	case 8:
		return "八等奖";
		break;
	default:
		return "未指定的奖品等级";
		break;
	}
});

/*******************************************************************************
 * 沈国平加 抽奖奖品类型转化
 ******************************************************************************/
Handlebars.registerHelper("awardTypeConvert", function(value) {
	switch (value) {
	case 1:
		return '现金';
		break;
	case 2:
		return '积分';
		break;
	case 3:
		return 'VIP奖励';
		break;
	case 4:
		return '实物奖励';
		break;
	case 5:
		return '红包奖励';
	case 6:
		return '云购卡奖励';
	default:
		return "未指定的奖品类型";
		break;
	}
});

Handlebars.registerHelper("awardTypeConvert", function(value, vipLevel,
		vipValidMonth) {
	if (value == "1") {
		return '现金';
	} else if (value == "2") {
		return '积分';
	} else if (value == "4") {
		return '实物奖励';
	} else if (value == "3") {
		if (vipLevel == "V1") {
			return vipValidMonth + "个月" + "铜牌会员";
		} else if (vipLevel == "V2") {
			return vipValidMonth + "个月" + "银牌会员";
		} else if (vipLevel == "V3") {
			return vipValidMonth + "个月" + "金牌会员";
		} else if (vipLevel == "V4") {
			return vipValidMonth + "个月" + "钻石会员";
		}
	} else if (value == "5"){		
		return "红包奖励";
	} else if (value == "6"){
		return "云购卡奖励";	
	} else {
		return "未指定的奖品类型";
	}
});

Handlebars.registerHelper("transferTypeConvert", function(type) {
	if (type == "3") {
		return "云购卡转账";
	} else if (type == "4") {
		return "现金转账";
	}
});

Handlebars.registerHelper("cardTransferStatus", function(status) {
	if (status == "22") {
		return "转账失败";
	} else if (status == "11") {
		return "转账成功";
	}
});

Handlebars.registerHelper("hideUserName", function(name) {
	if (name.length > 3) {
		return new Handlebars.SafeString(name.substr(0, 2) + '***');
	} else if (name.length > 2) {
		return new Handlebars.SafeString(name.substr(0, 1) + '***');
	} else {
		return name;
	}
});

// --------------------担保公司账户中----------------------------

// 登记
Handlebars.registerHelper("guaranteeRegFun", function(id) {
	return new Handlebars.SafeString("<a href='javascript:;' data-id='" + id
			+ "'  class='guaranteeReg'>登记</a>");
});

// 格式:2014-08-15
Handlebars.registerHelper("transGuaranteeDateFormat", function(value) {
	function formatDate(now) {
		var year = now.getFullYear();
		var month = now.getMonth() + 1;
		var date = now.getDate();
		var hour = now.getHours();
		var minute = now.getMinutes();
		var second = now.getSeconds();
		if (second < 10) {
			second = '0' + second;
		}
		return year + "-" + month + "-" + date;
	}
	if (value == null || value == '') {
		return '';
	}
	var d = new Date(value);
	return formatDate(d);
});

// 操作
Handlebars.registerHelper("guaranteeOperateFun", function(borrowId) {
	return new Handlebars.SafeString(
			"<a href='/member_guarantee/repayment/repaymentDetail.html?borrowId="
					+ borrowId + "' target='_blank'>还款明细</a>");
})
// 代偿操作
Handlebars.registerHelper("guaranteeCompensatoryOperateFun", function(id,
		status) {
	if (status == 0) {
		return new Handlebars.SafeString("<a href='javascript:;' data-id='"
				+ id + "'  class='toCompensateBtn'>代偿</a>");
	} else {
		return "-";
	}
})
// 还款状态
Handlebars.registerHelper("guaranteeRepaymentStatusFun", function(status) {
	if (status == 0) {
		return "未还";
	} else if (status == 1 || status == 2) {
		return "已还";
	} else if (status == 3) {
		return "还款处理中";
	} else if (status == 4) {
		return "代偿处理中";
	}
})
// 剩余天数
Handlebars.registerHelper("guaranteeRepaymentLateDaysFun", function(lateDays) {
	return -lateDays;
})
// 借款人 商户账户设置 各认证状态
Handlebars.registerHelper("accSetIndivitfy",function(value, status) {
					var str = "";
					if (value == 1) { // 实名认证
						if (status == "83") { // 已认证
							str = '<a href="/member_borrow/security/identifedRealNameView.html" class="y_account_rightula y_account_rightula1_yes"></a> <h4>实名认证</h4> <a href="/member_borrow/security/identifedRealNameView.html" class="y_account_rightula22">已认证</a>';
						} else { // 未认证
							str = '<a href="/member_borrow/security/realNameIdentify.html" class="y_account_rightula y_account_rightula1"></a> <h4>实名认证</h4> <a href="/member_borrow/security/realNameIdentify.html" class="y_account_rightula22">未认证</a>';
						}
					}
					if (value == 2) { // 手机认证
						if (status == "86") { // 已认证
							str = '<a href="/member_borrow/security/identifedPhoneView.html" class="y_account_rightula y_account_rightula3_yes"></a> <h4>手机认证</h4><a href="/member_borrow/security/identifedPhoneView.html" class="y_account_rightula22">已认证</a>';
						} else {
							str = '<a href="javascript:;" class="y_account_rightula y_account_rightula3"></a> <h4>手机认证</h4><a href="javascript:void:(0);" class="y_account_rightula22">未认证</a>';
						}
					}
					if (value == 3) { // 邮箱认证
						if (status == "81") { // 已认证
							str = '<a href="/member_borrow/security/identifedEmailView.html" class="y_account_rightula y_account_rightula2_yes"></a><h4>邮箱认证</h4><a href="/member_borrow/security/identifedEmailView.html" class="y_account_rightula22">已认证</a>';
						} else {
							str = '<a href="/user/activeEmail.html" class="y_account_rightula y_account_rightula2"></a><h4>邮箱认证</h4><a href="/user/activeEmail.html" class="y_account_rightula22">未认证</a>';
						}
					}
					return str
})

// 投资人账户设置 各认证状态   fgq  
Handlebars.registerHelper("investAccSetIndivitfy",function(value, status) {
					var str = "";
					if (value == 1) { // 实名认证
						if (status == "83") { // 已认证
							str = '<a href="identifedRealName.html" class="y_account_rightula y_account_rightula1_yes"></a> <h4>实名认证</h4> <a href="identifedRealName.html" class="y_account_rightula22">已认证</a>';
						} else { // 未认证
							str = '<a href="http://www.jinshangdai.com/member/security/realNameIdentify.html" class="y_account_rightula y_account_rightula1"></a> <h4>实名认证</h4> <a href="http://www.jinshangdai.com/member/security/realNameIdentify.html" class="y_account_rightula22">未认证</a>';
						}
					}
					if (value == 2) { // 手机认证
						if (status == "86") { // 已认证
							str = '<a href="identifedPhoneView.html" class="y_account_rightula y_account_rightula3_yes"></a> <h4>手机认证</h4><a href="identifedPhoneView.html" class="y_account_rightula22">已认证</a>';
						} else {
							str = '<a href="javascript:;" class="y_account_rightula y_account_rightula3"></a> <h4>手机认证</h4><a href="javascript:void:(0);" class="y_account_rightula22">未认证</a>';
						}
					}
					if (value == 3) { // 邮箱认证
						if (status == "81") { // 已认证
							str = '<a href="identifedEmail.html" class="y_account_rightula y_account_rightula2_yes"></a><h4>邮箱认证</h4><a href="identifedEmail.html" class="y_account_rightula22">已认证</a>';
						} else {
							str = '<a href="/user/activeEmail.html" class="y_account_rightula y_account_rightula2"></a><h4>邮箱认证</h4><a href="/user/activeEmail.html" class="y_account_rightula22">未认证</a>';
						}
					}
					return str
})


//担保公司账户设置 各认证状态
Handlebars.registerHelper("memberGuaranteeAccSetIndivitfy",function(value, status) {
					var str = "";
					if (value == 1) { // 实名认证
						if (status == "83") { // 已认证
							str = '<a href="identifedRealName.html" class="y_account_rightula y_account_rightula1_yes"></a> <h4>实名认证</h4> <a href="identifedRealName.html" class="y_account_rightula22">已认证</a>';
						} else { // 未认证
							str = '<a href="/member_borrow/security/realNameIdentify.html" class="y_account_rightula y_account_rightula1"></a> <h4>实名认证</h4> <a href="/member_borrow/security/realNameIdentify.html" class="y_account_rightula22">未认证</a>';
						}
					}
					if (value == 2) { // 手机认证
						if (status == "86") { // 已认证
							str = '<a href="identifedPhoneView.html" class="y_account_rightula y_account_rightula3_yes"></a> <h4>手机认证</h4><a href="identifedPhoneView.html" class="y_account_rightula22">已认证</a>';
						} else {
							str = '<a href="javascript:;" class="y_account_rightula y_account_rightula3"></a> <h4>手机认证</h4><a href="javascript:void:(0);" class="y_account_rightula22">未认证</a>';
						}
					}
					if (value == 3) { // 邮箱认证
						if (status == "81") { // 已认证
							str = '<a href="identifedEmail.html" class="y_account_rightula y_account_rightula2_yes"></a><h4>邮箱认证</h4><a href="identifedEmail.html" class="y_account_rightula22">已认证</a>';
						} else {
							str = '<a href="/user/activeEmail.html" class="y_account_rightula y_account_rightula2"></a><h4>邮箱认证</h4><a href="/user/activeEmail.html" class="y_account_rightula22">未认证</a>';
						}
					}
					return str
})

// 投资获取剩余金额
Handlebars.registerHelper("subaccount", function(v1, v2) { // v1 表示借款总额 v2
															// 表示已投总额 return
															// 剩余额度
	if (v1 > v2) {
		
		  var num = 0;
			n = 2;
			var  money = v1 - v2;
			money = parseFloat((money + "").replace(/[^\d\.-]/g, ""))
					.toFixed(n)
					+ "";
			var l = money.split(".")[0].split("").reverse(), r = money
					.split(".")[1];
			t = "";
			for (i = 0; i < l.length; i++) {
				t += l[i]
						+ ((i + 1) % 3 == 0 && (i + 1) != l.length ? ","
								: "");
			}
			var account =  t.split("").reverse().join("") + "." + r;
		
		return '剩余 <em class="specialFamily">' + account + '</em> 元';
	} else if (v1 == v2) { // 满标了
		var  money = v1;
		 var num = 0;
			n = 2;
			money = parseFloat((money + "").replace(/[^\d\.-]/g, ""))
					.toFixed(n)
					+ "";
			var l = money.split(".")[0].split("").reverse(), r = money
					.split(".")[1];
			t = "";
			for (i = 0; i < l.length; i++) {
				t += l[i]
						+ ((i + 1) % 3 == 0 && (i + 1) != l.length ? ","
								: "");
			}
			var account =  t.split("").reverse().join("") + "." + r;
		
		return '融资完成 ' + account;
	} else { // 超了。不知道怎么显示

	}
	
	
	
});
// 只格式化的金额
Handlebars.registerHelper("subAccNum",
		function(v1, v2) { // v1 表示借款总额 v2 表示已投总额 return 剩余额度
			var num = 0;
			if (v1 > v2) {
				money = v1 - v2;
				n = 2;
				money = parseFloat((money + "").replace(/[^\d\.-]/g, ""))
						.toFixed(n)
						+ "";
				var l = money.split(".")[0].split("").reverse(), r = money
						.split(".")[1];
				t = "";
				for (i = 0; i < l.length; i++) {
					t += l[i]
							+ ((i + 1) % 3 == 0 && (i + 1) != l.length ? ","
									: "");
				}
				return t.split("").reverse().join("") + "." + r;
			} else if (v1 == v2) { // 满标了
				return 0.00;
			}
		});
// 计息方式 新增
Handlebars.registerHelper("planBreathWay",
		function(v1) { // v1 表示借款总额 v2 表示已投总额 return 剩余额度
	if(v1 == "103" || v1 == "105"){
		return "满审计息";
	}else if(v1 == "113" || v1 == "115"){
		return "投即计息";
	}
});
// 投资有奖 新增
Handlebars.registerHelper("investPrizeWay",
		function(v1) { // v1 表示借款总额 v2 表示已投总额 return 剩余额度
	if(v1 == "103" || v1 == "105"){
		return "满审送红包";
	}else if(v1 == "113" || v1 == "115"){
		return "投即送红包";
	}
});
// 只格式化的金额
Handlebars.registerHelper("dataSource", function(tenderType) { // v1 表示借款总额 v2
																// 表示已投总额 return
																// 剩余额度
	if (tenderType == 2) {
		return "dd_phones";
	}
	if (tenderType == 0) {
		return "";
	}
	if (tenderType == 1) {
		return "";
	}

});


//只格式化的金额
Handlebars.registerHelper("moneyCheck",function(money) { // v1 表示借款总额 v2 表示已投总额 return 剩余额度
			 var num = 0;
				n = 2;
				money = parseFloat((money + "").replace(/[^\d\.-]/g, ""))
						.toFixed(n)
						+ "";
				var l = money.split(".")[0].split("").reverse(), r = money
						.split(".")[1];
				t = "";
				for (i = 0; i < l.length; i++) {
					t += l[i]
							+ ((i + 1) % 3 == 0 && (i + 1) != l.length ? ","
									: "");
				}
				return t.split("").reverse().join("") + "." + r;
});
/*
 * 李建云加 充值类型
 */
Handlebars.registerHelper("rechargeFormatType", function(rechargeType) {
	//JSDP-37  wcw 2015-04-25 start
	if (rechargeType == "00") {
		return "汇潮充值";
	}else if(rechargeType=="02"){
		return "平台转账";
	}else if(rechargeType=="01"){
		return "体验卡充值";
	}else if(rechargeType=="1"){
		return "充值转账";
	}else {
		return rechargeType;
	}
	//JSDP-37  wcw 2015-04-25 end
});
/*
 * 李建云加 充值类型
 */
Handlebars.registerHelper("tradeFormatStatus", function(rechargeType) {
	if (rechargeType == "00" || rechargeType == "01") {
		return "成功";
	} else if (rechargeType == "55") {
		return "充值中";
	} else if (rechargeType == "99") {
		return "失败";
	} else if (rechargeType == "52") {
		return "初审";
	} else if (rechargeType == "56") {
		return "已充值";
	}
});
/*
 * 于俊斐加 更换客服
 */
Handlebars
		.registerHelper(
				"reKFlist",
				function(list, oldid, imgpath) {
					var html = "<ul>"
					var x = 0;
					for (var i = 0; i < list.length; i++) {
						if (oldid == list[i].id) {
						//JSDP-108 fengguoqin  5.12  start 
							html += '<li class="changeli"><img style="width:148px;height:142px" src="'
									+ imgpath
									+ '/'
									+ list[i].path
									+ '"><p>'
									+ list[i].no + '</p></li>';
						} else {
							html += '<li data-val="'
									+ list[i].id
									+ '"><img style="width:148px;height:142px" src="'
					//JSDP-108 fengguoqin  5.12 end
									+ imgpath + '/' + list[i].path + '"><p>'
									+ list[i].no + '</p></li>';
						}
						x++;
						if (x == 2) {
							html += '</ul><ul>';
							x = 0;
						}
					}
					html += "</ul>";
					return new Handlebars.SafeString(html);
				});

/*******************************************************************************
 * 李建云加 提现处理状态
 ******************************************************************************/
Handlebars.registerHelper("drawFormatHandleStatus", function(drawHandleStatus) {
	if (drawHandleStatus == "00") {
		return "申请处理中";
	} else if (drawHandleStatus == "11") {
		return "初审通过";
	} else if (drawHandleStatus == "10") {
		return "初审未通过";
	} else if (drawHandleStatus == "21") {
		return "复审通过";
	} else if (drawHandleStatus == "20") {
		return "复审未通过";
	} else if (drawHandleStatus == "30") {// wcw 新增
		return "提现成功";
	} else if (drawHandleStatus == "41") { // wcw 新增
		return "请求汇潮失败";
	} else if (drawHandleStatus == "42") { // wcw 新增
		return "等待银行转账";
	} else if (drawHandleStatus == "88") {// wcw 新增
		return "银行转账失败";
	} else if (drawHandleStatus == "99") {
		return "取消提现";
	}else if(drawHandleStatus=="0"){
		return "申请异常";
	}else {
		return "错误类型";
	}
});

/*******************************************************************************
 * 冯国琴加 红包使用状态已使用:1 未使用:2 已过期:3 未过期:4
 ******************************************************************************/
Handlebars.registerHelper("awardStatusFormatType", function(awardStatus) {
	if (awardStatus == "1") {
		return "已使用";
	} else if (awardStatus == "2") {
		return "未使用";
	} else if (awardStatus == "3") {
		return "已过期";
	} else if (awardStatus == "4") {
		return "未过期";
	}
});

/*******************************************************************************
 * 冯国琴加 会员等级：普通会员:N1 铜牌VIP:V1 银牌VIP:V2 金牌VIP:V3; 钻石VIP:V4
 ******************************************************************************/
Handlebars.registerHelper("vipLevelFormatType", function(vipLevel) {
	if (vipLevel == "N1") {
		return "普通会员";
	} else if (vipLevel == "V1") {
		return "铜牌VIP";
	} else if (vipLevel == "V2") {
		return "银牌VIP";
	} else if (vipLevel == "V3") {
		return "金牌VIP";
	} else if (vipLevel == "V4") {
		return "钻石VIP";
	} else {
		return "普通会员";
	}
});

/*******************************************************************************
 * 冯国琴加 图片路径
 ******************************************************************************/
Handlebars.registerHelper("picPathCheck", function(picPath) {
	if (picPath == "http://www.tuaniu.com") {
		return "/themes/theme_default/images/header_footer/media_logo.png";
	} else {
		return picPath;
	}
});
/*******************************************************************************
 * 于俊斐加 处理计算器余额
 ******************************************************************************/
Handlebars.registerHelper("getCalcul", function(total, capital, interest) {
	return (total - capital - interest);
});
/*
 * 于俊斐加 可用金额相加
 */
Handlebars.registerHelper("getUseAccountTotal", function(interestUsable,
		awardUsable, rechargeUsable, returnCapitalUsable) {
	var sum1 = interestUsable + awardUsable + rechargeUsable
			+ returnCapitalUsable;
	sum1 = Math.round(sum1 * 100) / 100;
	n = 2;
	sum1 = parseFloat((sum1 + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";

		var l = sum1.split(".")[0].split("").reverse(), r = sum1.split(".")[1];
		t = "";
		for (i = 0; i < l.length; i++) {
			t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
		}
		return t.split("").reverse().join("") + "." + r + "";

});
/*
 * 于俊斐加 借款人炒作金额相加
 */
Handlebars.registerHelper("getOptAccountTotal", function(rechargeMoney,
		awardMoney) {
	var sum1 = rechargeMoney + awardMoney;
	sum1 = Math.round(sum1 * 100) / 100;
	sum1 = parseFloat((sum1 + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
	var l = sum1.split(".")[0].split("").reverse(), r = sum1.split(".")[1];
	t = "";
	for (i = 0; i < l.length; i++) {
		t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
	}
	return t.split("").reverse().join("") + "." + r + "";

});
/*******************************************************************************
 * 投资人我的奖励
 * 
 * 未奖励邀请 实名认证 格式转换显示 李建云加
 ******************************************************************************/
Handlebars.registerHelper("awardFormatRealNameIdentify",
		function(realNameType) {
			if (realNameType == "83") { // 已认证
				return "实名认证通过";
			} else { // 未认证
				return "实名未认证";
			}
		});

/*******************************************************************************
 * 投资人我的奖励
 * 
 * 未奖励邀请 邮箱认证格式转换显示 李建云加
 ******************************************************************************/
Handlebars.registerHelper("awardFormatEmaildentify", function(emailType) {
	if (emailType == "81") { // 已认证
		return "邮箱认证通过";
	} else { // 未认证
		return "邮箱未认证";
	}
});

/*******************************************************************************
 * 李建云加 判断是否是 默认地址
 ******************************************************************************/
// 判断相等
Handlebars.registerHelper("isDefaultEqual", function(v1, options) {
	if (v1 == 1) {
		// 满足添加继续执行
		return options.fn(this);
	} else {
		// 不满足条件执行{{else}}部分
		return options.inverse(this);
	}
});

/*******************************************************************************
 * 冯国琴加 用户名过长时部分隐藏，划过之后显示全部
 ******************************************************************************/
// 判断相等
Handlebars.registerHelper("userNameCheck", function(userName) {
	if (userName.length > 11) {
		var partUserName = userName.substring(0, 7);
		var showUserName = partUserName + "..."
		return showUserName;

	} else {

		return userName;
	}

});
/*******************************************************************************
 * 李建云加 取消提现状态显示判断
 ******************************************************************************/
// 判断相等
Handlebars.registerHelper("cancelDrawEqual", function(v1, options) {
	if (v1 == 00) {
		// 满足添加继续执行
		return options.fn(this);
	} else {
		// 不满足条件执行{{else}}部分
		return options.inverse(this);
	}
});

/*******************************************************************************
 * 于俊斐加 债权转让剩余份数
 ******************************************************************************/
Handlebars.registerHelper("getSubCopies", function(copies, sellcopies) {
	return copies - sellcopies ;
});
/*******************************************************************************
 * 于俊斐加 债权转让剩余份数
 ******************************************************************************/
Handlebars.registerHelper("getSubPeriodnew", function(copies, sellcopies) {
	return copies - sellcopies + 1 ;
});
/*
 * 于俊斐加 double 高精度除法
 */
Handlebars.registerHelper("getCreditCos", function(total, cosp) {
	var t1 = 0, t2 = 0, r1, r2;
	try {
		t1 = total.toString().split(".")[1].length
	} catch (e) {
	}
	try {
		t2 = cosp.toString().split(".")[1].length
	} catch (e) {
	}
	with (Math) {
		r1 = Number(total.toString().replace(".", ""))
		r2 = Number(cosp.toString().replace(".", ""))
		return ((r1 / r2) * pow(10, t2 - t1)).toFixed(2);
	}
});
/*
 * 于俊斐加 double 高精度除法
 */
Handlebars.registerHelper("getCreditScales", function(total, cosp) {
	var t1 = 0, t2 = 0, r1, r2;
	try {
		t1 = total.toString().split(".")[1].length
	} catch (e) {
	}
	try {
		t2 = cosp.toString().split(".")[1].length
	} catch (e) {
	}
	with (Math) {
		r1 = Number(total.toString().replace(".", ""))
		r2 = Number(cosp.toString().replace(".", ""))
		return (((r1 / r2) * pow(10, t2 - t1))*100).toFixed(2);
	}
});
/*
 * 于俊斐加 double 高精度乘法
 */
Handlebars.registerHelper("getAccMul", function(arg1, arg2) {
	var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
	try {
		m += s1.split(".")[1].length
	} catch (e) {
	}
	try {
		m += s2.split(".")[1].length
	} catch (e) {
	}
	return (Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math
			.pow(10, m)).toFixed(2);
});
/*
 * 于俊斐加 double 高精度减法
 */
Handlebars.registerHelper("getSubtr", function(arg1, arg2) {
	var r1, r2, m, n;
	try {
		r1 = arg1.toString().split(".")[1].length
	} catch (e) {
		r1 = 0
	}
	try {
		r2 = arg2.toString().split(".")[1].length
	} catch (e) {
		r2 = 0
	}
	m = Math.pow(10, Math.max(r1, r2));
	// last modify by deeka
	// 动态控制精度长度
	n = (r1 >= r2) ? r1 : r2;
	return ((arg1 * m - arg2 * m) / m).toFixed(2);
});
/*
 * 于俊斐加 double 高精度减法
 */
Handlebars.registerHelper("getSubtrNotDouble", function(arg1, arg2) {
	var r1, r2, m, n;
	try {
		r1 = arg1.toString().split(".")[1].length
	} catch (e) {
		r1 = 0
	}
	try {
		r2 = arg2.toString().split(".")[1].length
	} catch (e) {
		r2 = 0
	}
	m = Math.pow(10, Math.max(r1, r2));
	// last modify by deeka
	// 动态控制精度长度
	n = (r1 >= r2) ? r1 : r2;
	return ((arg1 * m - arg2 * m) / m).toFixed(0);
});
/*
 * 于俊斐加 double 高精度加法
 */
Handlebars.registerHelper("getAccAdd", function(arg1, arg2) {
	try {
		r1 = arg1.toString().split(".")[1].length
	} catch (e) {
		r1 = 0
	}
	try {
		r2 = arg2.toString().split(".")[1].length
	} catch (e) {
		r2 = 0
	}
	m = Math.pow(10, Math.max(r1, r2))
	return ((arg1 * m + arg2 * m) / m).toFixed(2);
});
/*
 * 于俊斐加 获取百分比
 */
Handlebars.registerHelper("getCreditPercent", function(total, cosp) {
	var t1 = 0, t2 = 0, r1, r2;
	try {
		t1 = total.toString().split(".")[1].length
	} catch (e) {
	}
	try {
		t2 = cosp.toString().split(".")[1].length
	} catch (e) {
	}
	with (Math) {
		r1 = Number(total.toString().replace(".", ""))
		r2 = Number(cosp.toString().replace(".", ""))
		return ((r1 / r2) * pow(10, t2 - t1) * 100).toFixed(2);
	}
});
/*
 * 于俊斐加 获取百分比
 */
Handlebars.registerHelper("getCreditDis", function(dis) {
	return dis * 100;
});

/*
 * 李建云加 会员包使用状态状态
 */
Handlebars.registerHelper("vipIsConvertFun", function(v1, options) {
	if (v1 == 1) {
		// 满足添加继续执行
		return options.fn(this);
	} else {
		// 不满足条件执行{{else}}部分
		return options.inverse(this);
	}
});

/*
 * 李建云加 VIP来源类型
 */
Handlebars.registerHelper("awardResourceFun", function(awardResource) {
	if (awardResource == "P1") {
		return '现金购买';
	} else if (awardResource == "P2") {
		return '投资TOP奖励';
	} else if (awardResource == "P3") {
		return '抽奖活动奖励';
	} else if (awardResource == "P4") {
		return '邀请兑换VIP';
	} else if (awardResource == "P5") {
		return '会员升级购买';
	}
})
/*
 * 于俊斐加 首页债权信用等级
 */
Handlebars.registerHelper("indexCreditLeve", function(leve) {
	if (leve == 1) {
		return 'E';
	} else if (leve == 2) {
		return 'D';
	} else if (leve == 3) {
		return 'C';
	} else if (leve == 4) {
		return 'B';
	} else if (leve == 5) {
		return 'A';
	}
});
/*
 * 于俊斐加 首页债权信用等级
 */
Handlebars.registerHelper("getScales", function(sellcopies, totalcopies) {
	var t1 = 0, t2 = 0, r1, r2;
	try {
		t1 = sellcopies.toString().split(".")[1].length
	} catch (e) {
	}
	try {
		t2 = totalcopies.toString().split(".")[1].length
	} catch (e) {
	}
	with (Math) {
		r1 = Number(sellcopies.toString().replace(".", ""))
		r2 = Number(totalcopies.toString().replace(".", ""))
		return ((r1 / r2) * pow(10, t2 - t1) * 100).toFixed(0);
	}
});
Handlebars.registerHelper("getStatus", function(status, id) {
	// 00发布，01审核通过，02审核未通过，03复审通过，04复审不能过，05撤回
	var html = "";
	if (status == "01") {
		html = '<a href="/credit/index/creditDetail.html?id=' + id
				+ '">立即认购</a>';
	}
	if (status == "02") {
		html = '<a href="/credit/index/creditDetail.html?id=' + id
				+ '">初审不通过</a>';
	}
	if (status == "03") {
		html = '<a href="/credit/index/creditDetail.html?id=' + id
				+ '" class="y_100as">已满额</a>';
	}
	if (status == "04") {
		html = '<a href="/credit/index/creditDetail.html?id=' + id
				+ '" class="y_100as">复审不通过</a>';
	}
	if (status == "05") {
		html = '<a href="/credit/index/creditDetail.html?id=' + id
				+ '" class="y_100as">已撤销</a>';
	}
	if (status == "06") {
		html = '<a href="/credit/index/creditDetail.html?id=' + id
				+ '" class="y_100as">待复审</a>';
	}
	if(status=="07"){
		html = '<a href="/credit/index/creditDetail.html?id=' + id
		+ '" class="y_100as">已结束</a>';
	}
	return new Handlebars.SafeString(html);
});

/*
 * 李建云加 红包来源类型
 */
Handlebars.registerHelper("rpDynamicResFun", function(rpDynamicRes) {
	if (rpDynamicRes == "dynamic_rp_invest") {
		return '投资成功';
	} else if (rpDynamicRes == "static_rp_identify") {
		return '注册认证通过';
	}else if(rpDynamicRes == "static_rp_invited_first_invest"){
		return "被邀请人首次投标超过一定金额"
	}else if(rpDynamicRes == "static_rp_recommend"){
		return "邀请好友成功"
	}
	
})

/*
 * 冯国琴加 媒体报道简介字数控制
 */
Handlebars.registerHelper("introduceCheck", function(introduction, showWay) {
	if (showWay == 1) {
		if (introduction.length > 35) {
			return introduction.substr(0, 32) + "..."
		} else {
			return introduction;
		}
	} else {
		if (introduction.length > 111) {
			return introduction.substr(0, 108) + "..."
		} else {
			return introduction;
		}
	}

})

/*
 * 冯国琴加关于我们简介字数控制
 */
Handlebars.registerHelper("introduceCheckJsCulture", function(introduction) {
		if (introduction.length > 111) {
			return introduction.substr(0, 108) + "..."
		} else {
			return introduction;
		}

})
  /*775 fgq 2015-03-7 start
    775 fgq 2015-03-7 end

 * 冯国琴分期宝首付金额(全额付款)
 */
Handlebars.registerHelper("onePayCheck", function(payway ,stagePay,onePay) {
		if (payway == 11) {
			return stagePay;
		} else {
			return onePay;
		}

})
  /*775 fgq 2015-03-7 start
    775 fgq 2015-03-7 end

 * 冯国琴分期宝借款金额
 */
Handlebars.registerHelper("stagePayCheck", function(payway ,stagePay,onePay) {
		if (payway == 11) {
			return 0;
		} else {
			return stagePay;
		}

})

/*
 * 775 fgq 2015-03-7 start
    775 fgq 2015-03-7 end
 * 冯国琴 付款方式
 */
Handlebars.registerHelper("payWayInfo", function(payway) {
		if (payway == 11) {
			return "首付全部金额";
		} else if(payway == 12){
			return "首付+分期 ";
		}else{
			return "零首付";
		}

})


/*
 *4.2
 * 冯国琴 可债转   不可债转  isSwingout ;  // 1 可以转出  0 不可以转出   
 */
Handlebars.registerHelper("isSwingOutCheck", function(isSwingout,ist) {
		if (isSwingout == 1) {
			return (ist==1?"24小时":"3个月")+"可债转";
		} else if(isSwingout == 0){
			return "不可债转 ";
		}else{
			return isSwingout;
		}

})

/*
 *4.11
 * 冯国琴 提现的备注信息   初审不通过、复审不通过两个字段  drawCashRemark   firstTrialFailRemark recheckFailRemark
 */
Handlebars.registerHelper("drawCashRemark", function(firstTrialFailRemark,recheckFailRemark) {
		if(firstTrialFailRemark!=null){
			return firstTrialFailRemark;
		}else  if(recheckFailRemark!=null){
			return recheckFailRemark;
		}

})


/*
 *4.13
 * 冯国琴 转账资金记录   
 */
Handlebars.registerHelper("transferStatus", function(status) {
		if(status=="00"){
			return "转账成功";
		}else  if(status=="99"){
			return "转账失败";
		}else  if(status=="66"){
			return "转账申请中";
		}else  if(status=="01"){
			return "其他异常";
		}else  if(status=="02"){
			return "交易订单号重复";
		}

})
/*
 *4.13
 * 冯国琴 转账资金记录   
 */
Handlebars.registerHelper("tenderStatus", function(status) {
		if(status=="0"){
			return "待处理";
		}else if(status=="1"){
			return "成功";
		}else if(status=="2"){
			return "失败";
		}else{
			return "未知";
		}
});

/*
 *6.3
 * JSDP-35 2015-6-3 gjh  根据指定长度格式化长度   
 */
Handlebars.registerHelper("stringFormatToLength", function(str,length) {
	str = "" + str;
	if(str.length >= length){
		return str.substring(0,length-2) + '...';
	}else{
		return str;
	}
});
Handlebars.registerHelper("borrowNameStr",function(str){
	var splitstr= new Array();
	splitstr=str.split(",");
	return splitstr[0];
});
Handlebars.registerHelper("borrowAprStr",function(str){
	var splitstr= new Array();
	splitstr=str.split(",");
	return splitstr[1];
});
/*
 *6.17
 * gjh  云购卡有效时间  
 */
Handlebars.registerHelper("validDateFormat", function(date,validTime) {
	function formatDate(now,end) {
		var year = now.getFullYear();
		var month = now.getMonth() + 1;
		var date = now.getDate();
		var hour = now.getHours();
		var minute = now.getMinutes();
		var second = now.getSeconds();
		var endYear = end.getFullYear();
		var endMonth = end.getMonth() + 1;
		var endDate = end.getDate();
		var endHour = end.getHours();
		var endMinute = end.getMinutes();
		var endSecond = end.getSeconds();
		return year + '-' + month + '-' + date + " "+ hour + ":" + minute + ":" + second + 
		"至" + endYear +"-" + endMonth +"-" + endDate + " " + endHour + ":" + endMinute + ":" + endSecond;
	}
	if (date == null || date == '') {
		return '';
	}
	var d = new Date(date);
	var endd = new Date(date);
	endd.setDate(endd.getDate() + validTime);
	return formatDate(d,endd);
});
/*
 *6.19
 * gjh  云购卡失效时间  
 */
Handlebars.registerHelper("yungouOverdueDateFormat", function(date,validTime) {
	function formatDate(now,end) {
		var year = now.getFullYear();
		var month = now.getMonth() + 1;
		var date = now.getDate();
		var endYear = end.getFullYear();
		var endMonth = end.getMonth() + 1;
		var endDate = end.getDate();
		return endYear +"年" + endMonth +"月" + endDate + "日";
	}
	if (date == null || date == '') {
		return '';
	}
	var d = new Date(date);
	var endd = new Date(date);
	endd.setDate(endd.getDate() + validTime);
	return formatDate(d,endd);
});

Handlebars.registerHelper("borrowNameStr",function(str){
	var splitstr= new Array();
	splitstr=str.split(",");
	return splitstr[0];
});
Handlebars.registerHelper("borrowAprStr",function(str){
	var splitstr= new Array();
	splitstr=str.split(",");
	return splitstr[1];
});
