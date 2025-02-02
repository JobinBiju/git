define(function(require,exports,modlue){
	require('jquery');
	require('alertNew');
	var id = $("#dataid").val();
	var collectionId=$("#collectionId").val();
	$.ajax({
		type:"post",
		url:"/credit/index/creditDetailJson.html?id="+id+"&collectionId="+collectionId,
		dataType:"json",
		success:function(json){
			if(json.cso!=null){
				require.async('/plugins/handlebars-v1.3.0/handlebars-v1.3.0',function(){
		            require.async('/plugins/handlebars-v1.3.0/transFormatJson',function(){
		            	$(".c_cliam_intro").html(Handlebars.compile(require("../tpl/credit_Info.tpl"))(json));
		            	getBorrow();
		            	require.async("jquery.circliful.min",function(){
		        			$('.myStat4').circliful();
		        		});
		            })
		        });
			}else{
				$(".y_details_con1").html("<div class='c_nodata'></div>");
			}
		}
	}) ;
	function getBorrow(){
		var id = $("#dataid").val() ;
	// 标信息
		$.ajax({
			type:"post",
			url:"/credit/index/borrowdetail.html?id="+id,
			dataType:"json",
			success:function(json){
				require.async('/plugins/handlebars-v1.3.0/handlebars-v1.3.0',function(){
		            require.async('/plugins/handlebars-v1.3.0/transFormatJson',function(){
					$(".y_details_con2").html(Handlebars.compile(require("../tpl/credit_BorrowInfo.tpl"))(json));
					// 投标记录
					$(".tenderlist").click(function(){
					    var tpl = require('../tpl/credit_tenderlist.tpl');//载入tpl模板
					   	require.async(['./creidtShowDetailTable'],function(showTable){
					   		showTable.ajaxUrl('/credit/index/creditJsonTend.html?id='+id+'&randomTime='+(new Date()).getTime(),tpl,"tender_list");
					   	});
				    });
					$(".repaymentlist").click(function(){
					      var tpl = require('../tpl/credit_repaymentlist.tpl');//载入tpl模板
					   	  require.async(['./creidtShowDetailTable'],function(showTable){
					   		  showTable.ajaxUrl('/credit/index/creditJsonRepayment.html?id='+id+'&randomTime='+(new Date()).getTime(),tpl,"repayment_list");
					   	  });
				    });
				    $(".creditloglist").click(function(){
					      var tpl = require('../tpl/credit_creditloglist.tpl');//载入tpl模板
					   	  require.async(['./creidtShowDetailTable'],function(showTable){
					   		  showTable.ajaxUrl('/credit/index/creditJsonCreditLog.html?id='+id+'&randomTime='+(new Date()).getTime(),tpl,"creditlog_list");
					   	  });
				    });
				    $(".calist").click(function(){
					      var tpl = require('../tpl/credit_creditinfolist.tpl');//载入tpl模板
					   	  require.async(['./creidtShowDetailTable'],function(showTable){
					   		  showTable.ajaxUrl('/credit/index/creditJsonCa.html?id='+id+'&randomTime='+(new Date()).getTime(),tpl,"ca_list");
					   	  });
				    });
				    
					$(".y_details_con2leftTitle li").click(function(){
						 var index=$(this).index(".y_details_con2leftTitle li");
						$(".y_details_con2leftTitle li").removeClass("y_details_clicksli");
						$(this).addClass("y_details_clicksli");
						$(".y_detailscon2leftcon").css("display","none");
						$($(".y_detailscon2leftcon")[index]).css("display","block");
					})
					$(".y_assessmentdlsbottom a").click(function(){
						$(".y_details_con2leftTitle li").removeClass("y_details_clicksli");
						$($(".y_details_con2leftTitle li")[2]).addClass("y_details_clicksli");
						$(".y_detailscon2leftcon").css("display","none");
						$($(".y_detailscon2leftcon")[2]).css("display","block");
					})
					$(".y_detailsinputs").blur(function(){
						if(parseInt($(".y_detailsinputs").val())<1||($(".y_detailsinputs").val()=="")){
							$(".reminderss").show().html("最低投购买1份");
							$(".y_detailsinputs").val(1);
						}else if(parseInt($(".y_detailsinputs").val())>parseInt($(".maxCops").html())||($(".y_detailsinputs").val()=="")){
							$(".reminderss").show().html("最高购买份数为："+parseInt($(".maxCops").html())+" 份");
							$(".y_detailsinputs").val(parseInt($(".maxCops").html()));
						}else{
							$(".reminderss").hide().html("");
						}
					})
					$(".y_pluss").click(function(){
						if (parseInt($(".y_detailsinputs").val())< parseInt($(".maxCops").html())) {
							$(".y_detailsinputs").val(parseInt($(".y_detailsinputs").val())+1);
						}
					})
					$(".y_subtracts").click(function(){
						if (parseInt($(".y_detailsinputs").val())>1) {
							$(".y_detailsinputs").val(parseInt($(".y_detailsinputs").val())-1);
						};
					})
					$(".y_detailsinputs").blur(function(){
						if($(".y_detailsinputs").val()==""){
							$(".reminderss").show().html("最低购买1份");
						}else if($(".reminderss").css("display")=="none"){
							$(".reminderss").hide().html("");
						}
					})
					$(".y_details_con2leftTitle li").click(function(){
								 var index=$(this).index(".y_details_con2leftTitle li");
						$(".y_details_con2leftTitle li").removeClass("y_details_clicksli");
						$(this).addClass("y_details_clicksli");
						$(".y_detailscon2leftcon").css("display","none");
						$($(".y_detailscon2leftcon")[index]).css("display","block");
					})
					$(".y_assessmentdlsbottom a").click(function(){
						$(".y_details_con2leftTitle li").removeClass("y_details_clicksli");
						$($(".y_details_con2leftTitle li")[2]).addClass("y_details_clicksli");
						$(".y_detailscon2leftcon").css("display","none");
						$($(".y_detailscon2leftcon")[2]).css("display","block");
					})
					//table 奇偶数行颜色
					var line=$(".c_cliam_tender table tr");
					for (var i=0; i<line.length; i++){
					   line[i].style.background=(i%2==1) ? "#e1e4e9" : "#FFFFFF"; 
					}
					//显示信息
					$(".c_tender_info i").hover(function(){
						$(this).next().show();
					})
					$(".c_tender_info i").next().mouseleave(function(){
						$(".c_tender_info i").next().hide();
					})
					//protocal
					$(".c_name_protocal em").click(function(){
						$(".c_protocal_bj").show();
						$("#Contract").show();
					})
					$(window).resize(function(){
						$("#Contract").css({left:($(window).width()-$("#Contract").width())/2})
					})
					$(window).resize();
					$(".close").click(function(){
						$("#Contract").slideUp(600);
						$(".c_protocal_bj").fadeOut();
					})
					$(".btn-primary").click(function(){
						$("#Contract").slideUp(600);
						$(".c_protocal_bj").fadeOut();
					})
					$(".y_details_logas").click(function(){
						// 最起码的验证
						if(parseInt($(".y_detailsinputs").val())<1||($(".y_detailsinputs").val()=="")){
							$(".reminderss").show().html("最低投购买1份");
							$(".y_detailsinputs").val(1);
						}else if(parseInt($(".y_detailsinputs").val())>parseInt($(".maxCops").html())||($(".y_detailsinputs").val()=="")){
							$(".reminderss").show().html("最高购买份数为："+parseInt($(".maxCops").html())+" 份");
							$(".y_detailsinputs").val(parseInt($(".maxCops").html()));
						}else{
							$(".reminderss").hide().html("");
							var cops = parseInt($(".y_detailsinputs").val()) ;
							var id = $("#dataid").val() ;
							$.ajax({
								url:"/credit/index/creditBuyJson.html",
								type:"post",
								data:{id:id,cops:cops},
								dataType:"json",
								success:function(json){
									if(json.result){
										
										require.async('/plugins/handlebars-v1.3.0/handlebars-v1.3.0',function(){
								            require.async('/plugins/handlebars-v1.3.0/transFormatJson',function(){
								            	//setTimeout(function(){
									            	$(".c_cofirm_buy").html(Handlebars.compile(require("../tpl/credit_confirmBuy.tpl"))(json))
									            	$(".c_buy_bj").show();
									            	$(".c_cofirm_buy").show();
									            	//确认购买
													$(window).resize(function(){
														$(".c_cofirm_buy").css({left:($(window).width()-$(".c_cofirm_buy").width())/2+"px",top:($(window).height()-$(".c_cofirm_buy").outerHeight())/2+"px"});
														$(".c_buy_success").css({left:($(window).width()-$(".c_buy_success").width())/2+"px",top:($(window).height()-$(".c_buy_success").height())/2+"px"});
													})
													$(window).resize();
									            	$(".c_cliam_close,.truereturn").click(function(){
														$(".c_buy_bj").hide();
														$(".c_cofirm_buy").hide();
													})
													$(".truebutton").click(function(){
														$(".truebutton").hide();
														
														$(".pubErr").html("<div style='margin:0 100px;'>" +
						    									"<img width=18 src='../../../themes/theme_default/images/loading.gif'/> " +
						    									"&nbsp;正在处理请稍候</div>");
														// 验证交易密码
														// 是否同意协议
														var flag = false ;
														if($("#trueconsent").attr("checked")=="checked"){
															flag = true ;
														}else{
															$(".pubErr").html("请同意转让协议！");
															$(".truebutton").show();
														}
														var paypwd = $("#payPwd").val();
														//var resultFlag=$("#resultFlag").val();
														//var creditBuyToken=$("#creditBuyToken").val();
														var resultFlag=json.resultFlag;
														var creditBuyToken=json.creditBuyToken;
														if(paypwd!="" && flag && paypwd!="noSet"){
															 // 提交前 验证交易密码
															 $.ajax({
																type:"post",
																url:"/invest/checkPayPwd.html",
																dataType:"json",
																data:{paypwd:paypwd},
																success:function(data){
																	if(data.result){
																		$.ajax({
																			url:"/credit/index/creditBuy.html",
																			type:"post",
																			data:{id:id,cops:cops,resultFlag:resultFlag,creditBuyToken:creditBuyToken },
																			dataType:"json",
																			success:function(json){
																				$(".c_cofirm_buy").hide();
																				$(".c_buy_bj").hide();
																				if(json.result){
																					//$(".pubErr").html("");
																					//alert(json.msg);
																					//JSDBET-840 gjh 2015-3-23 start
																					alertNew("<div style='margin:0 100px;'>" +
																							"<img width=18 src='../../../themes/theme_default/images/loading.gif'/> " +
																							"&nbsp;正在处理请稍候</div>","提示",function(){},false);
																					$(".pubErr").html("<div style='margin:0 100px;'>" +
													    									"<img width=18 src='../../../themes/theme_default/images/loading.gif'/> " +
													    									"&nbsp;正在处理请稍候</div>");
																					var falg = false;
													    							var t=setInterval(function () {
													    								if(falg == false){
													    									falg=returnResult(resultFlag);
													    								}
													    							},1000)
																					//JSDBET-840 gjh 2015-3-23 end
																				}else{
																					alertNew(json.msg,"提示",function(){window.location.reload();},true);
																					$(".pubErr").html(json.msg);
																				}
																			}
																		});
																	}else{
																		$(".pubErr").html("交易密码不正确！");
																		$(".truebutton").show();
																	}
																}
															});
														 }else{
															 if(flag){
																 if(paypwd=="noSet"){
																	 $(".pubErr").html("请设置交易密码！");
																 }else if(paypwd==""){
																	 $(".pubErr").html("交易密码不能为空！");
																 }
																 $(".truebutton").show();
															 }
															 
														 }
													})
									            //},5000);
								            })
								        }) ;
									}else{
										//alert(json.msg);
										alertNew(json.msg,"提示",function(){},true);
									}
								}
							});
						}
						
					})
					$(".c_cliam_close").click(function(){
						$(".c_buy_bj").hide();
						$(".c_cofirm_buy").hide();
					})
					//购买完成
					$(".c_cliam_close1").click(function(){
						$(".c_buy_bj1").hide();
						$(".c_buy_success").hide();
					})
					$(".c_cliamBT3").click(function(){
						$(".c_buy_success").hide();
						$(".c_buy_bj1").hide();
					})
				  });
	            });
			}
		})
	}
	 var falg = false;
	  function returnResult(resultFlag){
			//var resultFlag=$("#resultFlag").val();
			if(falg == false){
			$.getJSON("/public/ymd/getResult.html", {
				resultFlag : resultFlag
			}, function(data) {
				//alert(data.msg_data);
				if(data.msg_data!=null){
					falg = true;
					$(".pubErr").html(data.msg_data);
					alertNew(data.msg_data,"提示",function(){window.location.reload();},true);
				}/*else{
					var t=setInterval(function () {
						returnResult();
					},1000)
				}*/
			});
		}
		return falg;
	}
});