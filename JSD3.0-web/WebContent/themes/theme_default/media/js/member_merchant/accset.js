define(function(require,exports,module){
	
	var isOver=0;
	require('jquery');
	require('alert');
	//判断邮箱是否已认证
	$(function(){
		if($.trim($("#userEmail").val())==""){
			$(".c_update_detail_upemail").hide();
			$(".chankEmail").append("<div class='updateEmall_div'><a  href='/user/activeEmail.html' id='changeEmailButton'>邮箱认证</a></div><div class='c_clear'></div>");
		}else{
			$(".chankEmail").append("<div class='y_account_div_a'><a href='javascript:void(0);' id='changeEmailButton'>修改</a></div><div class='c_clear'></div>");
		}
	});
	
	// 获取验证信息
	$.ajax({
		type:"post",
		url:"/member_borrow/account/identifyInfo.html",
		dataType:"json",
		async: false,
		success:function(json){
			require.async('/plugins/handlebars-v1.3.0/handlebars-v1.3.0',function(){
	            require.async('/plugins/handlebars-v1.3.0/transFormatJson',function(){
				$(".y_account_right_top").html(Handlebars.compile(require("../../tpl/member_merchant/accset.tpl"))(json));
			  });
            });
			/*826   fgq  3.18   安全等级*/
			if(json.mobilePhoneStatus ==86 && json.emailStatus != 81 &&json.realNameStatus != 83){
				$(".progress-bar-bfind").css({width:"80"});
				$(".progress-bar-ifind").html("低");
			}else  if(json.mobilePhoneStatus ==86 && json.emailStatus == 81 &&json.realNameStatus != 83){
				$(".progress-bar-bfind").css({width:"160"});
				$(".progress-bar-ifind").html("中");
			}else  if(json.mobilePhoneStatus ==86 && json.emailStatus == 81 &&json.realNameStatus == 83){
				$(".progress-bar-bfind").css({width:"240"});
				$(".progress-bar-ifind").html("高");
			}else{
				$(".progress-bar-bfind").css({width:"80"});
				$(".progress-bar-ifind").html("低");
			}
		}
	});
	// 获取找回交易密码的一些数据
	$.ajax({
		type:"post",
		url:"/member_borrow/account/findPaypwd.html",
		dataType:"json",
		async: false,
		success:function(json){
			require.async('/plugins/handlebars-v1.3.0/handlebars-v1.3.0',function(){
	            require.async('/plugins/handlebars-v1.3.0/transFormatJson',function(){
	            //  找回  交易密码内容
				$(".c_find_detail").html(Handlebars.compile(require("../../tpl/member_merchant/accsetFindPayPwd.tpl"))(json));
				//找回密码方式切换
				$(".c_find_way dd").eq(0).children().attr("checked",true);
				$(".c_find_way dd").click(function(){
					var index=$(this).index(".c_find_way dd");
					
					if(index==1){
						if($.trim($("#userEmail").val())==""){

							//alerts("认证信息提示","<div style='display:block;text-align:center;font-size: 18px;'>请先进行邮箱认证</div><br><a href='/user/activeEmail.html'>邮箱验证</a>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<a href='javascript:void(0);' class='y_alertsBoxButton cancelButton'>取消</a>",400,300);
							alerts("认证信息提示","<div style='display:block;text-align:center;font-size: 18px;'>请先进行邮箱认证</div><br><a href='/user/activeEmail.html' style='margin-right:40px;'>邮箱验证</a><a href='javascript:void(0);' class='y_alertsBoxButton cancelButton' style='background:#ddd;color:#333;'>取消</a>",400,200);
							$(".cancelButton").click(function(){
								$(".c_finds").hide();
								$(".c_find_way dd").eq(0).children().attr("checked",true);
								$(".c_finds").eq(0).show();
								
							});

							$(".y_alertsBoxButton").click(function(){
								
								$(".c_find_way dd").eq(0).children().attr("checked",true);
								$(".c_finds").eq(0).show();
								
							});
						}else{
							$(".c_finds").hide();
							$(this).children().attr("checked",true);
							$(".c_finds").eq(index).show();
							}
					}else{
						$(".c_finds").hide();
						$(this).children().attr("checked",true);
						$(".c_finds").eq(index).show();
					}
					
					
					
				});
				$(".ppgetcode").parent().next().hide();
				$(".ppgetcode").parent().next().next().hide();
				// 设置密保链接
				$(".FPPsetQue").click(function(){
            		var $ul = $(this).parent().parent().parent().parent().parent().next('.c_update_detail');
					$(this).parent().parent().parent().parent().parent().next('.c_update_detail').slideUp(500);
					if($ul.is(':visible')){
						$(this).parent().next('.c_update_detail').slideUp(500);
					}else{
						$('.c_update_detail').slideUp();
						$(this).parent().next('.c_update_detail').slideDown(500);
					}
					$(".questiondiv").next().slideDown(500);
				}) ;
				
				// 密保问题回答后提交
				$(".que_one_next").click(function(){
					var answer = $("#queanswer").val() ;
					if(answer!=""){
						$.ajax({
							type:"post" ,
							url:"/member_borrow/account/checkQuestion.html",
							data:{answer:answer},
							datatype:"json",
							success:function(json){
								if(json.result){
									$(".que_one_next").parent().parent().parent().next().show() ;
									$(".que_one_next").parent().parent().parent().next().find(".c_pwd_error").show() ;
									$(".que_one_next").parent().parent().parent().hide();
									//  密保验证通过后，提交新交易密码
									require.async('/plugins/jquery-validation-1.13.0/jquery.validate.min',function(){
										require.async('/plugins/jquery-validation-1.13.0/additional-methods',function(){
											$("#my_que_form").validate({
												rules:{
													newPayPwd:{
														required:true,
														regexPassword:true
													},
													confirmNewPayPwd:{
														required:true,
														equalTo: "#myQcNewPayPwd"
													}
												},
												messages:{
													newPayPwd:{
														required: "至少8到16位英文和数字",
														regexPassword:'至少8到16位英文和数字'
													},
													confirmNewPayPwd: {
														required: "请再输一次新密码",
														equalTo: "两次密码不一致"
													}
												},
												errorElement:'div',
												errorPlacement:function(error,element){
													element.next().html(error);
											    },
											    success:function(label){
											    },  
											    submitHandler:function(form){
									    			require.async('jquery.form',function(){
									    				$(form).ajaxSubmit(function(data){
									    					if(data.result){
									    						/*alert(data.msg);*/
									    					/*	$.alert(data.msg,"提示",function(){},true);*/
									    						$("#my_que_form").parent().parent().next().show();
																$("#my_que_form").parent().parent().hide();
									    					}else{
									    						/*alert(data.msg);*/
									    						$.alert(data.msg,"提示",function(){},true);
									    					}
										    			});
									    			});
										        } 
											});
										});
									}) ;
								}else{
									$(".c_qa_msg").html(json.msg);
								}
							}
						});
					}else{
						$(".c_qa_msg").html("请填写密保问题答案！");
					}
				}) ;
				
				// 手机找回交易密码发送验证码
				
				 $("#myMcNewPayPwd").keyup(checkBlank);
					
				$(".c_mobile_repwd").keyup(checkBlank);
					
				$("#myQcNewPayPwd").keyup(checkBlank);
				var validCode=true;//获取验证码状态
				var smsflag = "sms";
				$(".ppgetcode").click(function(){
					var getCodeText = "获取短信验证码";
					var time=120;
					if (validCode) {
						//JSDP-223 gjh 2015-7-17 start
						$("#checkPhoneCodeSubmit").unbind("click");
						$("#checkPhoneCodeSubmit").click(function(){
							
							if($(".ppgetcode").html() == "获取语音验证码"){
								smsflag = "voice" ;
								getCodeText = "获取短信验证码";
							}else if($(".ppgetcode").html() == "获取短信验证码"){
								smsflag = "sms" ;
								getCodeText = "获取短信验证码";
							}
							$.ajax({
								type:"post",
								url:"/member_borrow/account/sendMobileMsg.html?flag="+smsflag,
								data : {flag:smsflag,validCode:$("#sendSmsValidCode").val()},
								dataType:"json",
								success:function(json){
									//  发送成功
									if(json.result){
										$(".calculatorCpmBoxPhone").hide();
										$(".calculatorCpmBottom").hide();
										showError("",$("#sendSmsValidCode"));
										$(".ppgetcode").parent().find(".c_no_recieve").hide();
										$(".ppgetcode").next().next().hide();
										$(".ppgetcode").parent().find(".c_code_msg").show();
										$(".ppgetcode").parent().next().show();
										$(".ppgetcode").parent().next().next().show();
										// 手机找回交易密码验证码提交
										validCode=false;
										var t=setInterval(function () {
											time--;
											$(".ppgetcode").html(time+"秒后重新获取");
											if (time==0) {
												clearInterval(t);
												$(".ppgetcode").html(getCodeText);
												validCode=true;
											}
										},1000);
									}else{
										//alert(json.msg) ;
										showError(json.msg,$("#sendSmsValidCode"));
										//$.alert(json.msg,"提示",function(){},true);
									}
									$("#sendSmsValidCode").val("");
									$("#img0").each(function(){$(this).attr("src",'/validimg.html?t=' + Math.random());});
								}
							});
						});
						$(".calculatorCpmBoxPhone").show();
						$(".calculatorCpmBottom").show();
						$("#sendSmsValidCode").val("");
						$("#img0").each(function(){$(this).attr("src",'/validimg.html?t=' + Math.random());});
						//JSDP-223 gjh 2015-7-17 end
					}
				});
				//  手机找回交易密码  校验验证码
				$(".mobile_next").click(function(){
					
					var code = $("#mobilecode").val() ;
					var code = $("#mobilecode").val() ;
					if(code==""){
						$(".findpwd_phone").html("请输入验证码！");
					}else{
						$(".findpwd_phone").html("");
					$.ajax({
						type:"get",
						url:"/member_borrow/account/verifyPaypwdMobileCode.html?code="+code,
						dataType:"json",
						success:function(json){
							//  发送成功
							if(json.result){
							// 进入第二步
								$(".mobile_next").parent().parent().parent().next().show();
								$(".mobile_next").parent().parent().parent().hide();
								$(".c_mobile_pwd").next("span").css({display:"inline-block"});
								$(".c_mobile_repwd").next("span").css({display:"inline-block"});
								require.async('/plugins/jquery-validation-1.13.0/jquery.validate.min',function(){
									require.async('/plugins/jquery-validation-1.13.0/additional-methods',function(){
										$("#my_m_form").validate({
											rules:{
												newPayPwd:{
													required:true,
													regexPassword:true
												},
												confirmNewPayPwd:{
													required:true,
													equalTo: "#myMcNewPayPwd"
												}
											},
											messages:{
												newPayPwd:{
													required: "至少8到16位英文和数字",
													regexPassword:'至少8到16位英文和数字'
												},
												confirmNewPayPwd: {
													required: "请再输一次新密码",
													equalTo: "两次密码不一致"
												}
											},
											errorElement:'div',
											errorPlacement:function(error,element){
												element.next().html(error);
										    },
										    success:function(label){
										    },  
										    submitHandler:function(form){
								    			require.async('jquery.form',function(){
								    				$(form).ajaxSubmit(function(data){
								    					if(data.result){
								    						$("#my_m_form").parent().parent().next().show();
															$("#my_m_form").parent().parent().hide();
								    					}else{
								    						/*alert(data.msg);*/
								    						$.alert(data.msg,"提示",function(){},true);
								    					}
									    			});
								    			});
									        } 
										});
									});
								}) ;
							}else{
								/*alert(json.msg);*/
							/*	$.alert(json.msg,"提示",function(){},true);*/
								$(".findpwd_phone").html(json.msg);
							}
						}
					});
				}
				});
				var validEmailCode=true;//获取验证码状态
				// 邮箱找回交易密码发送验证码
				$(".sendemailmsg").click(function(){
					var time=120;
					if (validEmailCode) {
						//JSDP-223 gjh 2015-7-17 start
						$("#checkPhoneCodeSubmit").unbind("click");
						$("#checkPhoneCodeSubmit").click(function(){
							$.ajax({
								type:"post",
								url:"/member_borrow/account/sendEmailMsg.html",
								data : {validCode:$("#sendSmsValidCode").val()},
								dataType:"json",
								success:function(json){
									//  发送成功
									if(!json.result){
										/*	alert(json.msg) ;*/
										showError(json.msg,$("#sendSmsValidCode"));
										//$.alert(json.msg,"提示",function(){},true);
										
									}else{
										$(".calculatorCpmBoxPhone").hide();
										$(".calculatorCpmBottom").hide();
										showError("",$("#sendSmsValidCode"));
										getCodeText = "获取邮件验证码";
										validEmailCode=false;
										var t = setInterval(function () {
											time--;
											$(".sendemailmsg").html(time+"秒后重新获取");
											if (time==0) {
												clearInterval(t);
												$(".sendemailmsg").html(getCodeText);
												validEmailCode=true;
											}
										},1000);
									}
									$("#sendSmsValidCode").val("");
									$("#img0").each(function(){$(this).attr("src",'/validimg.html?t=' + Math.random());});
								}
							});
						});
						$(".calculatorCpmBoxPhone").show();
						$(".calculatorCpmBottom").show();
						$("#sendSmsValidCode").val("");
						$("#img0").each(function(){$(this).attr("src",'/validimg.html?t=' + Math.random());});
						//JSDP-223 gjh 2015-7-17 end
					}
				});
				// 邮箱找回交易密码验证码提交
				$(".email_next").click(function(){
					var code = $("#emailcode").val() ;
					if(code==""){
						$(".findpwd_email").html("请输入验证码");
					}else{
						$(".findpwd_email").html("");
					$.ajax({
						type:"get",
						url:"/member_borrow/account/verifyPaypwdEmailCode.html?code="+code,
						dataType:"json",
						success:function(json){
							//  发送成功
							if(json.result){
								
								//邮箱找回交易密码不允许为空
								$(".c_mobile_repwd").keyup(checkBlank);
								
				            	$("#myEcNewPayPwd").keyup(checkBlank);
				            	
				            	$("#myQcNewPayPwd").keyup(checkBlank);
								// 进入第二步
									$(".email_next").parent().parent().next().show();
									$(".email_next").parent().parent().hide();
									$(".c_mobile_pwd").next("span").css({display:"inline-block"});
									$(".c_mobile_repwd").next("span").css({display:"inline-block"});
									require.async('/plugins/jquery-validation-1.13.0/jquery.validate.min',function(){
										require.async('/plugins/jquery-validation-1.13.0/additional-methods',function(){
											$("#my_e_form").validate({
												rules:{
													newPayPwd:{
														required:true,
														regexPassword:true
													},
													confirmNewPayPwd:{
														required:true,
														equalTo: "#myEcNewPayPwd"
													}
												},
												messages:{
													newPayPwd:{
														required: "至少8到16位英文和数字",
														regexPassword:'至少8到16位英文和数字'
													},
													confirmNewPayPwd: {
														required: "请再输一次新密码",
														equalTo: "两次密码不一致"
													}
												},
												errorElement:'div',
												errorPlacement:function(error,element){
													element.next().html(error);
											    },
											    success:function(label){
											    },  
											    submitHandler:function(form){
									    			require.async('jquery.form',function(){
									    				$(form).ajaxSubmit(function(data){
									    					if(data.result){
									    						$("#my_e_form").parent().parent().next().show();
																$("#my_e_form").parent().parent().hide();
									    					}else{
									    						/*alert(data.msg);*/
									    						$.alert(data.msg,"提示",function(){},true);
									    					}
										    			});
									    			});
										        } 
											});
										});
									}) ;
								}else{
									/*alert(json.msg);*/
									/*$.alert(json.msg,"提示",function(){},true);*/
									$(".findpwd_email").html(json.msg);
								}
						}
					});
				}
				});
			  });
            });
		}
	});
	// 获取密保问题数据
	$.ajax({
		type:"post",
		url:"/member_borrow/security/getQuestion.html",
		dataType:"json",
		async: false,
		success:function(json){
			require.async('/plugins/handlebars-v1.3.0/handlebars-v1.3.0',function(){
	            require.async('/plugins/handlebars-v1.3.0/transFormatJson',function(){
	            	if(json.size>0){ // 修改
	            		$(".questiondiv").append('<div class="y_account_div_a myquestion"><a href="javascript:void(0);">修改</a></div><div class="c_clear"></div>');
	            	}else{  // 设置
	            		$(".questiondiv").append('<div class="y_account_div_a myquestion"><a href="javascript:void(0);">设置</a></div><div class="c_clear"></div>');
	            	}
	            	$(".updateQuestion").html(Handlebars.compile(require("../../tpl/member_merchant/accsetQuestion.tpl"))(json));
	            	isOver++;
	            	/*$('.myquestion').click(function(){
	            		var $ul = $(this).parent().next('.c_update_detail');
						$(this).parent().next('.c_update_detail').slideUp(500);
						if($ul.is(':visible')){
							$(this).parent().next('.c_update_detail').slideUp(500);
						}else{
							$('.c_update_detail').slideUp();
							$(this).parent().next('.c_update_detail').slideDown(500);
						}
					});*/
	            	
	            /*	$('.y_account_div_a').click(function(){
						var $ul = $(this).parent().next('.c_update_detail');
						$(this).parent().next('.c_update_detail').slideUp(500);
						if($ul.is(':visible')){
							$(this).parent().next('.c_update_detail').slideUp(500);
						}else{
							$('.c_update_detail').slideUp();
							$(this).parent().next('.c_update_detail').slideDown(500);
						}
						$("#pwd_forms").parent().next().hide();	
					});*/
	            	//设置密保问题
	            	$(".setque").click(function(){
	            		require.async('jquery.form',function(){
	  	    				$("#setform").ajaxSubmit(function(data){
	  	    					if(data.result){
	  	    						/*alert("设置成功") ;*/
	  	    						/*$.alert("设置成功","提示",function(){},true);
	      							window.location.reload();*/
	  	    						$(".setque").parent().parent().parent().parent().next().show() ;
		            				$(".setque").parent().parent().parent().parent().hide() ;
	  	    					}else{
	  	    						$(".setque").parent().parent().find(".c_qa_msg").html(data.msg) ;
	  	    					}
	  		    			});
	            		});
	            	});
	            	$(".quesub").click(function(){
	            		var cqid = $("#cqueid").val();
	            		var answer = $("#cqanswer").val() ;
	            		if(answer!=""){
	            			$.ajax({
			            		type:"post",
			            		url:"/member_borrow/account/checkNewQuestion.html",
			            		data:{cqid:cqid,answer1:answer},
			            		dataType:"json",
			            		success:function(json){
			            			if(json.result){
			            				$(".quesub").parent().parent().parent().next().show() ;
			            				$(".quesub").parent().parent().parent().hide() ;
			            			}else{
			            				$(".quesub").parent().parent().find(".c_qa_msg").html(json.msg) ;
			            			}
			            		}
			            	});
	            		}else{
	            			$(".quesub").parent().parent().find(".c_qa_msg").html("问题答案不能为空") ;
	            		}
	            	});
	            	var listLiy=$(".loan_typey li");
	            	var flag=true; 
					$(".sely").click(function(){
						if(flag){
							$(".loan_typey").slideDown("fast");
							$(".loan_typey").css("display","block");
							flag=false;
							}
						else{
							$(".loan_typey").slideUp("fast");
							$(".loan_typey").css("display","none");
							flag=true;
						}
					});
					$(".loan_typey li").click(function(){
							var index=$(this).index(".loan_typey li");
							$(".sely").html($(listLiy[index]).html());
							$("#uqueid").val($(this).data("val")) ;
							$(".loan_typey").slideUp("fast");
							flag=true;
					});
	            	$(".uquesub").click(function(){
	            		var cqid = $("#uqueid").val();
	            		var oldid = $("#cqueid").val() ;
	            		var answer = $("#uqanswer").val() ;
	            		if(answer!=""){
	            			$.ajax({
			            		type:"post",
			            		url:"/member_borrow/account/updateQuestion.html",
			            		data:{'oldid':oldid,'cqid':cqid,'answer1':answer},
			            		dataType:"json",
			            		success:function(json){
			            			if(json.result){
			            				$(".uquesub").parent().parent().parent().next().show() ;
			            				$(".uquesub").parent().parent().parent().hide() ;
			            			}else{
			            				$(".uquesub").parent().parent().find(".c_qa_msg").html(json.msg) ;
			            			}
			            		}
			            	});
	            		}else{
	            			$("#uqanswer").next().html("问题答案不能为空") ;
	            		}
	            	});
	            }) ;
			});
		}
	});
	// 获取交易密码是否为空
	$.ajax({
		type:"post",
		url:"/member_borrow/security/getPaypwd.html",
		dataType:"json",
		async: false,
		success:function(json){
			require.async('/plugins/handlebars-v1.3.0/handlebars-v1.3.0',function(){
	            require.async('/plugins/handlebars-v1.3.0/transFormatJson',function(){
				$(".c_update_detail1").html(Handlebars.compile(require("../../tpl/member_merchant/accsetPaypwd.tpl"))(json));
				if(json.result){ // 设置
					$("#paypwdadd_forms").show() ;
					$("#paypwdupdate_forms").hide() ;
					$(".setpaypwd").append('<div class="y_account_div_a  paypwdSet"><a href="javascript:void(0);">设置</a></div><div class="c_clear"></div>');
					
				}else{  // 修改
					$("#paypwdadd_forms").hide() ;
					$("#paypwdupdate_forms").show() ;
					$(".setpaypwd").append('<div class="y_account_div_a"><a href="javascript:void(0);">修改</a></div><div class="c_clear"></div>');
				}
				isOver++;
				$(".c_find").click(function(){
					$(".c_update_detail2").show();
					$(".c_update_detail1").hide();
				});
				if($("#sflag").val()=="findpaypwd"){
					$(".c_update_detail2").show();
					$(".c_update_detail1").hide();
					$(".c_update_detail2").slideDown(500);
				}
				if($("#sflag").val()=="upmobile"){
					$(".c_update_detail_upmobile").show();
					$(".c_update_detail_upmobile").slideDown(500);
				}
				if($("#sflag").val()=="upemail"){
					$(".c_update_detail_upemail").show();
					$(".c_update_detail_upemail").slideDown(500);
				}
				if($("#sflag").val()=="setpaypwd"){
					$.ajax({
						type:"post",
						url:"/member_borrow/security/getQuestion.html",
						dataType:"json",
						success:function(json){
							if(!json.size>0){
								/*alert("为了您账户的安全，设置交易密码之前请先设置密保问题");*/
								$.alert("为了您账户的安全，设置交易密码之前请先设置密保问题","提示",function(){},true);
								$(".paypwdSet").parent().next('.c_update_detail').slideUp(500);
								/*$(".myquestion").click();
								$(".myquestion").parent().parent().find('.c_update_detail').slideDown(500);*/
								$('.y_account_div_a').eq(2).click();
								$('.y_account_div_a').eq(2).parent().parent().find('.c_update_detail').slideDown(500);

								$("#paypwdadd_forms").hide() ;
								$("#paypwdupdate_forms").hide() ;
							}else{
								$(".c_update_detail1").show();
								$(".c_update_detail2").hide();
								$(".c_update_detail1").slideDown(500);
							}
						}
					});
					
				}
				$(".c_back").click(function(){
					$(".c_update_detail1").show();
					$(".c_update_detail2").hide();
				});
				//设置交易密码之前判断是否设置了密保问题
				$(".paypwdSet").click(function(){
						$.ajax({
							type:"post",
							url:"/member_borrow/security/getQuestion.html",
							dataType:"json",
							success:function(json){
								if(!json.size>0){
									/*alert("为了您账户的安全，设置交易密码之前请先设置密保问题");*/
									$.alert("为了您账户的安全，设置交易密码之前请先设置密保问题","提示",function(){},true);
									$(".paypwdSet").parent().next('.c_update_detail').slideUp(500);
									/*$(".myquestion").click();
									$(".myquestion").parent().parent().find('.c_update_detail').slideDown(500);*/
									$('.y_account_div_a').eq(2).click();
									$('.y_account_div_a').eq(2).parent().parent().find('.c_update_detail').slideDown(500);

									$("#paypwdadd_forms").hide() ;
									$("#paypwdupdate_forms").hide() ;
								}
							}
						});
				});
				//修改登录，交易密码时不允许输入空格
				$(".y_input_now").keyup(checkBlank); 
				
				$("#newPwd").keyup(checkBlank); 
				
				$("#newPayPwd").keyup(checkBlank); 
				
				$(".y_input_new_yes").keyup(checkBlank);
				require.async('/plugins/jquery-validation-1.13.0/jquery.validate.min',function(){
					require.async('/plugins/jquery-validation-1.13.0/additional-methods',function(){
					
						//-S交易密码设置验证
						$("#paypwdadd_forms").validate({
							rules:{
								newPayPwd:{
									required:true,
									regexPassword:true
								},
								confirmNewPayPwd:{
									required:true,
									equalTo: "#newPayPwd"
								}
							},
							messages:{
								newPayPwd:{
									required: "至少8到16位英文和数字",
									regexPassword:'至少8到16位英文和数字'
								},
								confirmNewPayPwd: {
									required: "请再输一次新密码",
									equalTo: "两次密码不一致"
								}
							},
							errorElement:'div',
							errorPlacement:function(error,element){
								element.next().html(error);
						    },
						    success:function(label){
						    },  
						    submitHandler:function(form){
				    			require.async('jquery.form',function(){
				    				$(form).ajaxSubmit(function(data){
				    					if(data.result){
				    						$("#paypwdadd_forms")[0].reset();
				    						/*alert(data.msg) ;*/
				    						$.alert(data.msg,"提示",function(){},true);
				    						$("#sflag").val("");
				    						$(".ok_btn").click(function(){
				    							window.location.reload();
				    						});
				    						/*$(".y_account_div_a").parent().next('.c_update_detail').slideUp(500)
				    						window.location.reload();*/
				    					}else{
				    						$("#paypwdadd_forms span:eq(0)").html('<div>'+data.msg+'</div>') ;
				    					}
					    			});
				    			});
					        } 
						});
						//-E交易密码设置验证
						//-S交易密码修改验证
						$("#paypwdupdate_forms").validate({
							rules:{
								paypwd:{
									required:true,
									regexPassword:true
								},
								newPayPwd:{
									required:true,
									regexPassword:true
								},
								confirmNewPayPwd:{
									required:true,
									equalTo: "#newPayPwd"
								}
							},
							messages:{
								paypwd:{
									required: "至少8到16位英文和数字",
									regexPassword:'至少8到16位英文和数字'
								},
								newPayPwd:{
									required: "至少8到16位英文和数字",
									regexPassword:'至少8到16位英文和数字'
								},
								confirmNewPayPwd: {
									required: "请再输一次新密码",
									equalTo: "两次密码不一致"
								}
							},
							errorElement:'div',
							errorPlacement:function(error,element){
								element.next().html(error);
						    },
						    success:function(label){
						    },  
						    submitHandler:function(form){
				    			require.async('jquery.form',function(){
				    				$(form).ajaxSubmit(function(data){
				    					if(data.result){
				    						/*$("#paypwdupdate_forms")[0].reset();
				    						alert(data.msg) ;
				    						$(".y_account_div_a").parent().next('.c_update_detail').slideUp(500)
				    						$("#paypwdupdate_forms span:eq(0)").html('<div>交易密码修改成功</div>') ;*/
				    						$("#paypwdupdate_forms")[0].reset();
				    						$.alert(data.msg,"提示",function(){},true);
				    						$(".y_account_div_a").parent().next('.c_update_detail').slideUp(500);
				    					}else{
				    						$("#paypwdupdate_forms span:eq(0)").html('<div>'+data.msg+'</div>') ;
				    					}
					    			});
				    			});
					        } 
						});
						//-E交易密码修改验证
					});
				});
			  });
	            
            });
		}
	}) ;
	
		
	//登录密码，修改手机和修改邮箱
	$.ajax({
		type:"post",
		url:"/member/account/UserInfo.html",
		dataType:"json",
		async: false,
		success:function(data){
			require.async('/plugins/handlebars-v1.3.0/handlebars-v1.3.0',function(){
	            require.async('/plugins/handlebars-v1.3.0/transFormatJson',function(){
	            	$(".c_update_login_pwd").html(Handlebars.compile(require("../../tpl/member_merchant/updateLoginPwd.tpl"))(data));
	            	$(".c_update_way").html(Handlebars.compile(require("../../tpl/member_merchant/updatePhone.tpl"))(data));
	            	$(".c_update_way2").html(Handlebars.compile(require("../../tpl/member_merchant/updateEmail.tpl"))(data));
	            	$(".y_account_right").show();//加载完模板展示再右侧
	            	
					require.async('/plugins/jquery-validation-1.13.0/jquery.validate.min',function(){
						require.async('/plugins/jquery-validation-1.13.0/additional-methods',function(){
	            	//-S登陆密码修改验证
					$("#pwd_forms").validate({
						rules:{
							password:{
								required:true,
								regexPassword:true
							},
							newPwd:{
								required:true,
								regexPassword:true
							},
							confirmNewPwd:{
								required:true,
								equalTo: "#newPwd"
							}
						},
						messages:{
							password:{
								required:"请输入原密码",
								regexPassword:"原密码格式错误"
							},
							newPwd:{
								required: "至少8到16位英文和数字",
								regexPassword:'至少8到16位英文和数字'
							},
							confirmNewPwd: {
								required: "请再输一次新密码",
								equalTo: "两次密码不一致"
							  }
						},
						errorElement:'div',
						errorPlacement:function(error,element){
							element.next().html(error);
					    },
					    success:function(label){
					    },  
					    submitHandler:function(form){
			    			require.async('jquery.form',function(){
			    				$(form).ajaxSubmit(function(data){
			    					if(data.result){
			    						$("#pwd_forms")[0].reset();
			    						$("#pwd_forms").parent().next().show();	
				    					$("#pwd_forms").parent().hide();	
			    					}else{
			    						$("#pwd_forms span:eq(0)").html('<div>'+data.msg+'</div>') ;
			    					}
				    			});
			    			});
				        } 
					});
						});
					});
					//-E登陆密码修改验证
						

	            	var uvalidCode = true ;
	            	var usmsflag = "sms" ;
	            	
	            	// 通过原手机 更换手机 发送手机验证码  
	            	$(".upgetcode").click(function(){
	            		var getCodeText = "获取短信验证码";
	            		var time=120;
	            		if (uvalidCode) {
	            			//JSDP-223 gjh 2015-7-17 start
							$("#checkPhoneCodeSubmit").unbind("click");
							$("#checkPhoneCodeSubmit").click(function(){
								
								if($(".upgetcode").html() == "获取语音验证码"){
									usmsflag = "voice" ;
									getCodeText = "获取短信验证码";
								}else if($(".upgetcode").html() == "获取短信验证码"){
									usmsflag = "sms" ;
									getCodeText = "获取短信验证码";
								}
								$.ajax({
									type:"post",
									url:"/member_borrow/account/upMByOldMobile.html",
									data : {flag:usmsflag,validCode:$("#sendSmsValidCode").val()},
									dataType:"json",
									success:function(json){
										//  发送成功
										if(json.result){
											$(".calculatorCpmBoxPhone").hide();
											$(".calculatorCpmBottom").hide();
											showError("",$("#sendSmsValidCode"));
											$(".upgetcode").parent().find(".c_code_msg").show();
											$(".c_no_recieve").show();
											$(".upgetcode").parent().next().show();
											$(".upgetcode").parent().next().next().show();
											uvalidCode=false;
											var t=setInterval(function () {
												time--;
												$(".upgetcode").html(time+"秒后重新获取");
												if (time==0) {
													clearInterval(t);
													$(".upgetcode").html(getCodeText);
													uvalidCode=true;
												}
											},1000);
										}else{
											showError(json.msg,$("#sendSmsValidCode"));
											//$(".update_phone_11").html(json.msg) ;
										}
										$("#sendSmsValidCode").val("");
										$("#img0").each(function(){$(this).attr("src",'/validimg.html?t=' + Math.random());});
									}
								});
							});
							$(".calculatorCpmBoxPhone").show();
							$(".calculatorCpmBottom").show();
							$("#sendSmsValidCode").val("");
							$("#img0").each(function(){$(this).attr("src",'/validimg.html?t=' + Math.random());});
							//JSDP-223 gjh 2015-7-17 end
	            		}
	            	});
	            	// 通过原手机手机 找回手机 校验验证码
	            	$(".updatemobile_next").click(function(){
	            		var code = $("#updatemobilecode").val() ;
	            		if(code!=""){
	            			$.ajax({
	            				type:"get",
	            				url:"/member_borrow/account/verifyUMOldMobileCode.html?code="+code,
	            				dataType:"json",
	            				success:function(json){
	            					//  发送成功
	            					if(json.result){
	            					// 进入第二步
	            						$("#updatemobilecode").val("");
	            						$(".c_new_tel").val("");
	            						$(".submobilecode").val("");
	            						$(".updatemobile_next").parent().parent().parent().next().show();
	            						$(".updatemobile_next").parent().parent().parent().hide();
	            					}else{
	            						$(".update_phone_11").html(json.msg);
	            					}
	            				}
	            			});
	            			
	            			
	            		}else{
	            			$(".update_phone_11").html("请输入验证码！");
	            			
	            		}
	            	
	            	});
	            	var newvalidCode = true ;
	            	var newSmsFlag ="sms" ;
	            	// 通过原手机  修改手机  新手机号发送验证码
	            	$(".newmpgetcode").click(function(){
	            		//"更改手机"验证手机号
	            		var reg= /^[1][35876]\d{9}$/; //验证手机号码  
	            		var phone=$(".c_tel_msg").prev().val();
	            		if(phone==""){
	            			$(".c_tel_msg").html("请输入手机号码");
	            		}else{
	            			if(!reg.test(phone)){  
	            				$(".c_tel_msg").html("手机号码格式错误");
	            			}else if(phone == $("#userphone").val()){
	            				$(".c_tel_msg").html("手机号码与原手机号相同，请重新输入");
	            			   }else if(phone != $("#userphone").val()){
	            				   if (newvalidCode) {
	            					 //JSDP-223 gjh 2015-7-17 start
	       							$("#checkPhoneCodeSubmit").unbind("click");
	       							$("#checkPhoneCodeSubmit").click(function(){
	       								//判断手机号码是否被占用，没有则发送验证码
	       								$.ajax({
	       									type:"post",
	       									url:"/member_borrow/account/newPhoneCount.html",
	       									dataType:"json",
	       									data:{phone:phone},
	       									success:function(json){
	       										//  发送成功
	       										if(!json.result){
	       											$(".c_tel_msg").html(json.msg);
	       										}else{
	       											$(".c_tel_msg").html("");
	       											$.ajax({
	       												type:"post",
	       												url:"/member_borrow/account/sendMobileMsgUM.html",
	       												dataType:"json",
	       												data:{phone:phone,flag:newSmsFlag,validCode:$("#sendSmsValidCode").val()},
	       												success:function(json){
	       													//  发送成功
	       													if(json.result){
	       														$(".calculatorCpmBoxPhone").hide();
	       														$(".calculatorCpmBottom").hide();
	       														showError("",$("#sendSmsValidCode"));
	       														$(".newmpgetcode").parent().parent().find(".c_tel_valid_info").show();
	       														// 手机找回交易密码验证码提交
	       														var getCodeText = "获取短信验证码";
	       														var time=120;
	       														if (newvalidCode) {
	       															if($(".newmpgetcode").html() == "获取语音验证码"){
	       																newSmsFlag = "voice" ;
	       																getCodeText = "获取短信验证码";
	       															}else if($(".newmpgetcode").html() == "获取短信验证码"){
	       																newSmsFlag = "sms" ;
	       																getCodeText = "获取短信验证码";
	       															}
	       															newvalidCode=false;
	       															var t=setInterval(function () {
	       																time--;
	       																$(".newmpgetcode").html(time+"秒后重新获取");
	       																if (time==0) {
	       																	clearInterval(t);
	       																	$(".newmpgetcode").html(getCodeText);
	       																	newvalidCode=true;
	       																}
	       															},1000);
	       														}
	       													}else{
	       														showError(json.msg,$("#sendSmsValidCode"));
	       														//$(".update_phone_12").html(json.msg);
	       													}
	       													$("#sendSmsValidCode").val("");
	       													$("#img0").each(function(){$(this).attr("src",'/validimg.html?t=' + Math.random());});
	       												}
	       											});//end innerAjax
	       										}
	       									}
	       								}) ;
	       							});
	            					   $(".calculatorCpmBoxPhone").show();
	       							$(".calculatorCpmBottom").show();
	       							$("#sendSmsValidCode").val("");
	       							$("#img0").each(function(){$(this).attr("src",'/validimg.html?t=' + Math.random());});
	       							//JSDP-223 gjh 2015-7-17 end
	            				   }
				            	}
	            		}
	            	});
	            	
	            	// 通过原手机 更换手机  新手机绑定提交验证
	            	$(".submobile_next").click(function(){
	            		//"更改手机"验证手机号
	            		var reg= /^[1][35876]\d{9}$/; //验证手机号码  
	            		var code = $(".submobilecode").val() ;
	            		var phone=$(".c_tel_msg").prev().val();
	            		if(phone==""){
	            			$(".c_tel_msg").html("请输入手机号码");
	            		}else{
	            			if(!reg.test(phone)){  
	            				$(".c_tel_msg").html("手机号码格式错误");
	            			}else if(phone == $("#userphone").val()){
	            				$(".c_tel_msg").html("手机号码与原手机号相同，请重新输入");
	            			   }else if(phone != $("#userphone").val()){
	            				 //判断手机号码是否被占用，没有则发送验证码
	            					 $.ajax({
	            							type:"post",
	            							url:"/member_borrow/account/newPhoneCount.html",
	            							dataType:"json",
	            							data:{phone:phone},
	            							success:function(json){
	            								//  发送成功
	            								if(!json.result){
	            									$(".c_tel_msg").html(json.msg);
	            								}else{
	            									$(".c_tel_msg").html("");
	            									if(code!=""){
	            										$.ajax({
	            											type:"get",
	            											url:"/member_borrow/account/updateCheckMobile.html?phone="+phone+"&code="+code,
	            											dataType:"json",
	            											success:function(json){
	            												//  发送成功
	            												if(json.result){
	            												// 进入第三步
	            													$("#updatemobilecode").val("");
	            													$(".c_new_tel").val("");
	            													$(".submobilecode").val("");
	            													$(".submobile_next").parent().parent().parent().parent().next().show();
	            													$(".submobile_next").parent().parent().parent().parent().hide();
	            													
	            													$.ajax({
	            														type:"post",
	            														url:"/member/useridentify/identifyData.html",
	            														dataType:"json",
	            														success:function(json){
	            															$(".c_telphone").html(json.user.mobilePhone);
	            															$("#userphone").val(json.user.mobilePhone);
	            														//	$(".userEmail").html(json.user.email);
	            															
	            														}
	            													});
	            												}else{
	            													$(".update_phone_12").html(json.msg);
	            												}
	            											}
	            										});
	            										
	            									}else{
	            										$(".update_phone_12").html("请输入验证码！");
	            									}
	            									}
	            								
	            								}
	            					 });
	            			   }
	            		
	            		}
	            	
	            	});
	            	// 通过邮箱  更换手机  发送邮箱验证码
	            	var uMvalidEmailCode = true ;
	            	$(".upMsendEmail").click(function(){
	            		var time=120;
	            		if (uMvalidEmailCode) {
	            			//JSDP-223 gjh 2015-7-17 start
							$("#checkPhoneCodeSubmit").unbind("click");
							$("#checkPhoneCodeSubmit").click(function(){
								
								$.ajax({
									type:"post",
									url:"/member_borrow/account/upMSendEmailMsg.html",
									data : {validCode:$("#sendSmsValidCode").val()},
									dataType:"json",
									success:function(json){
										if(!json.result){
											showError(json.msg,$("#sendSmsValidCode"));
											$(".update_email_21").html(json.msg) ;
										}else{
											$(".calculatorCpmBoxPhone").hide();
											$(".calculatorCpmBottom").hide();
											showError("",$("#sendSmsValidCode"));
											uMvalidEmailCode=false;
											var t=setInterval(function () {
												time--;
												$(".upMsendEmail").html(time+"秒后重新获取");
												if (time==0) {
													clearInterval(t);
													$(".upMsendEmail").html("获取邮件验证码");
													uMvalidEmailCode=true;
												}
											},1000);
										}
										$("#sendSmsValidCode").val("");
										$("#img0").each(function(){$(this).attr("src",'/validimg.html?t=' + Math.random());});
									}
								});
							});
							$(".calculatorCpmBoxPhone").show();
							$(".calculatorCpmBottom").show();
							$("#sendSmsValidCode").val("");
							$("#img0").each(function(){$(this).attr("src",'/validimg.html?t=' + Math.random());});
							//JSDP-223 gjh 2015-7-17 end
	            		}
	            	});
	            	// 通过邮箱  更换手机  邮箱验证码校验
	            	$(".upMemal_next").click(function(){
	            		var code = $("#upMemailcode").val() ;
	            		if(code!=""){
	            			$.ajax({
	            				type:"get",
	            				url:"/member_borrow/account/verifyUMEmailCode.html?code="+code,
	            				dataType:"json",
	            				success:function(json){
	            					//  发送成功
	            					if(json.result){
	            						// 进入第二步
	            						$("#upMemailcode").val("");
	            						$(".c_new_tel").val("");
	            						$(".subEmobilecode").val("");
	            							$(".upMemal_next").parent().parent().next().show();
	            							$(".upMemal_next").parent().parent().hide();
	            						}else{
	            							$(".update_phone_21").html(json.msg);
	            						}
	            				}
	            			});
	            		}else{
	            			$(".update_phone_21").html("请输入验证码!") ;
	            		}
	            	});
	            	var	newEMPvalidCode = true ;
	            	var newEMPSmsFlag ="sms" ;
	            	//  通过邮箱  更换手机  邮箱认证通过后  发送新手机验证码
	            	$(".newEMPgetcode").click(function(){
	            		//"更改手机"验证手机号
	            		var reg= /^[1][35876]\d{9}$/; //验证手机号码  
	            		var phone=$(".c_tel_msg1").prev().val();
	            		if(phone==""){
	            			$(".c_tel_msg1").html("请输入手机号码");
	            		}else{
	            			if(!reg.test(phone)){  
	            				$(".c_tel_msg1").html("手机号码格式错误");
	            			}else if(phone == $("#userphone").val()){
	            				$(".c_tel_msg1").html("手机号码与原手机号相同，请重新输入");
	            			}else if(phone != $("#userphone").val()){
	            				if (newEMPvalidCode) {
	            					$(".c_tel_msg1").html("");
	            					$(".c_tel_msg1").html("");
	            					//JSDP-223 gjh 2015-7-17 start
	    							$("#checkPhoneCodeSubmit").unbind("click");
	    							$("#checkPhoneCodeSubmit").click(function(){
	    								$.ajax({
	    									type:"post",
	    									url:"/member_borrow/account/newPhoneCount.html",
	    									dataType:"json",
	    									data:{phone:phone},
	    									success:function(json){
	    										//  发送成功
	    										if(!json.result){
	    											$(".c_tel_msg1").html(json.msg);
	    										}else{
	    											$.ajax({
	    												type:"post",
	    												url:"/member_borrow/account/sendMobileMsgUM.html",
	    												dataType:"json",
	    												data:{phone:phone,flag:newEMPSmsFlag,validCode:$("#sendSmsValidCode").val()},
	    												success:function(json){
	    													//  发送成功
	    													if(json.result){
	    														$(".calculatorCpmBoxPhone").hide();
	    														$(".calculatorCpmBottom").hide();
	    														showError("",$("#sendSmsValidCode"));
	    														$(".newEMPgetcode").parent().find(".c_code_msg").show();
	    														$(".newEMPgetcode").parent().find(".c_no_recieve").show();
	    														// 手机找回交易密码验证码提交
	    														var getCodeText = "获取短信验证码";
	    														var time=120;
	    														if (newEMPvalidCode) {
	    															if($(".newEMPgetcode").html() == "获取语音验证码"){
	    																newEMPSmsFlag = "voice" ;
	    																getCodeText = "获取短信验证码";
	    															}else if($(".newEMPgetcode").html() == "获取短信验证码"){
	    																newEMPSmsFlag = "sms" ;
	    																getCodeText = "获取短信验证码";
	    															}
	    															newEMPvalidCode=false;
	    															var t=setInterval(function () {
	    																time--;
	    																$(".newEMPgetcode").html(time+"秒后重新获取");
	    																if (time==0) {
	    																	clearInterval(t);
	    																	$(".newEMPgetcode").html(getCodeText);
	    																	newEMPvalidCode=true;
	    																}
	    															},1000);
	    														}
	    													}else{
	    														showError(json.msg,$("#sendSmsValidCode"));
	    														//$(".update_phone_22").html(json.msg);
	    													}
	    													$("#sendSmsValidCode").val("");
	    													$("#img0").each(function(){$(this).attr("src",'/validimg.html?t=' + Math.random());});
	    												}
	    											});//end innerAjax
	    										}
	    									}
	    								});//end outterAjax
	    							});
	    							$(".calculatorCpmBoxPhone").show();
	    							$(".calculatorCpmBottom").show();
	    							$("#sendSmsValidCode").val("");
	    							$("#img0").each(function(){$(this).attr("src",'/validimg.html?t=' + Math.random());});
	    							//JSDP-223 gjh 2015-7-17 end
	            				}
	            			}
	            		} 
	            	});
	            	// 通过邮箱修改  新手机绑定提交验证
	            	$(".subEmobile_next").click(function(){
	            		var code = $(".subEmobilecode").val() ;
	            		var phone=$(".c_tel_msg1").prev().val();
	            		
	            		//"更改手机"验证手机号
	            		var reg= /^[1][35876]\d{9}$/; //验证手机号码  
	            		var phone=$(".c_tel_msg1").prev().val();
	            		if(phone==""){
	            			$(".c_tel_msg1").html("请输入手机号码");
	            		}else{
	            			if(!reg.test(phone)){  
	            				$(".c_tel_msg1").html("手机号码格式错误");
	            			}else if(phone == $("#userphone").val()){
	            				$(".c_tel_msg1").html("手机号码与原手机号相同，请重新输入");
	            			}else if(phone != $("#userphone").val()){
	            				$(".c_tel_msg1").html("");
	            				 $.ajax({
	            						type:"post",
	            						url:"/member_borrow/account/newPhoneCount.html",
	            						dataType:"json",
	            						data:{phone:phone},
	            						success:function(json){
	            							if(!json.result){
	            								$(".c_tel_msg1").html(json.msg);
	            							}else{
	            								$(".c_tel_msg1").html("");
	            								if(code!=""){
	            									$.ajax({
	            										type:"get",
	            										url:"/member_borrow/account/updateCheckMobile.html?phone="+phone+"&code="+code,
	            										dataType:"json",
	            										success:function(json){
	            											//  发送成功
	            											if(json.result){
	            											// 进入第三步
	            												$("#upMemailcode").val("");
	            												$(".c_new_tel").val("");
	            												$(".subEmobilecode").val("");
	            												$(".subEmobile_next").parent().parent().parent().parent().next().show();
	            												$(".subEmobile_next").parent().parent().parent().parent().hide();
	            												
	            												$.ajax({
	            													type:"post",
	            													url:"/member/useridentify/identifyData.html",
	            													dataType:"json",
	            													success:function(json){
	            														$(".c_telphone").html(json.user.mobilePhone);
	            														$("#userphone").val(json.user.mobilePhone);
	            													//	$(".userEmail").html(json.user.email);
	            														
	            													}
	            												});
	            												
	            											}else{
	            												$(".update_phone_22").html(json.msg);
	            											}
	            										}
	            									});
	            									
	            								}else{
	            									$(".update_phone_22").html("请输入验证码！");
	            									
	            								}
	            								
	            								}
	            							}
	            						
	            				 });
	            			}
	            			}
	            		
	            	
	            	});
	            	
	            	//通过旧邮箱  修改邮箱  发送发送验证码
	            	var uEvalidEmailCode = true ;
	            	$(".oldsendEmail").click(function(){
	            		var time=120;
	            		if (uEvalidEmailCode) {
	            			//JSDP-223 gjh 2015-7-17 start
							$("#checkPhoneCodeSubmit").unbind("click");
							$("#checkPhoneCodeSubmit").click(function(){
								$.ajax({
									type:"post",
									url:"/member_borrow/account/upEOldEmailMsg.html",
									data : {validCode:$("#sendSmsValidCode").val()},
									dataType:"json",
									success:function(json){
									if(!json.result){
										showError(json.msg,$("#sendSmsValidCode"));
										//$(".update_email_11").html(json.msg) ;
									}else{
										$(".calculatorCpmBoxPhone").hide();
										$(".calculatorCpmBottom").hide();
										showError("",$("#sendSmsValidCode"));
										uEvalidEmailCode=false;
										var t=setInterval(function () {
											time--;
											$(".oldsendEmail").html(time+"秒后重新获取");
											if (time==0) {
												clearInterval(t);
												$(".oldsendEmail").html("获取邮件验证码");
												uEvalidEmailCode=true;
											}
										},1000);
									}
									$("#sendSmsValidCode").val("");
									$("#img0").each(function(){$(this).attr("src",'/validimg.html?t=' + Math.random());});
								}
								});
							});
							$(".calculatorCpmBoxPhone").show();
							$(".calculatorCpmBottom").show();
							$("#sendSmsValidCode").val("");
							$("#img0").each(function(){$(this).attr("src",'/validimg.html?t=' + Math.random());});
							//JSDP-223 gjh 2015-7-17 end
	            		}
	            	});
	            	//通过旧邮箱  修改邮箱   校验旧邮箱验证
	            	$(".upemail_next").click(function(){
	            		var code = $("#upemailcode").val() ;
	            		if(code!=""){
	            			$.ajax({
	            				type:"get",
	            				url:"/member_borrow/account/verifyUEOldEmailCode.html?code="+code,
	            				dataType:"json",
	            				success:function(json){
	            					//  发送成功
	            					if(json.result){
	            						// 进入第二步
	            						$(".c_email_number").val("");
	            					    $("#upemailcode").val("");
	            					    $("#newEmailcode").val("");
	            						$(".upemail_next").parent().parent().next().show();
	            						$(".upemail_next").parent().parent().hide();
	            						}else{
	            							$(".update_email_11").html(json.msg);
	            						}
	            				}
	            			});
	            		}else{
	            			$(".update_email_11").html("请输入验证码!") ;
	            		}
	            	});
	            	//通过旧邮箱  修改邮箱   新邮箱发送发送验证码
	            	var uEvalidNewEmailCode = true ;
	            	$(".newsendEmail").click(function(){
	            		// 获取邮箱
	            		$(".c_email_msg").attr("style","float: right;margin-left: 0;margin-right: 240px") ;
	            	/*	var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/ ;*/
	            		var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/ ;
	            		var email=$(".c_email_msg_email").prev().val();
	            		if(email==""){ 
	            			$(".c_email_msg_email").html("请输入邮箱地址");
	            		}else{
	            			if(!reg.test(email)){  
	            				$(".c_email_msg_email").html("邮箱格式错误");
	            			}else if(email==$("#userEmail").val()){
	            				$(".c_email_msg_email").html("新邮箱与旧邮箱一样，请输入不同的邮箱。")	;
	            			}else  if(email!=$("#userEmail").val()){
	            				$(".c_email_msg_email").html("");
	            				if (uEvalidNewEmailCode) {
	            					//JSDP-223 gjh 2015-7-17 start
	    							$("#checkPhoneCodeSubmit").unbind("click");
	    							$("#checkPhoneCodeSubmit").click(function(){
	    								$.ajax({
	    									type:"post",
	    									url:"/member_borrow/account/newEmailCount.html?email="+email,
	    									dataType:"json",
	    									success:function(json){
	    									if(!json.result){
	    										/*$(".c_email_msg").html(json.msg) ;
	            							$(".c_email_msg").attr("style","float: right;margin-left: 0;margin-right: 160px") ;*/
	    										$(".c_email_msg_email").html(json.msg) ;
	    									}else{
	    										$(".c_email_msg_email").html("");
	    										var time=120;
	    										if (uEvalidNewEmailCode) {
	    											$.ajax({
	    												type:"post",
	    												url:"/member_borrow/account/sendEmailMsgNA.html",
	    												data : {email:email,validCode:$("#sendSmsValidCode").val()},
	    												dataType:"json",
	    												success:function(json){
	    												if(!json.result){
	    													showError(json.msg,$("#sendSmsValidCode"));
	    													//$(".update_email_12").html(json.msg) ;
	    												}else{
	    													$(".calculatorCpmBoxPhone").hide();
	    													$(".calculatorCpmBottom").hide();
	    													showError("",$("#sendSmsValidCode"));
	    													uEvalidNewEmailCode=false;
	    													var t=setInterval(function () {
	    														time--;
	    														$(".newsendEmail").html(time+"秒后重新获取");
	    														if (time==0) {
	    															clearInterval(t);
	    															$(".newsendEmail").html("获取邮件验证码");
	    															uEvalidNewEmailCode=true;
	    														}
	    													},1000);
	    												}
	    												$("#sendSmsValidCode").val("");
	    												$("#img0").each(function(){$(this).attr("src",'/validimg.html?t=' + Math.random());});
	    											}
	    											});
	    										}
	    									}
	    								}
	    								});
	    							});
	    							$(".calculatorCpmBoxPhone").show();
	    							$(".calculatorCpmBottom").show();
	    							$("#sendSmsValidCode").val("");
	    							$("#img0").each(function(){$(this).attr("src",'/validimg.html?t=' + Math.random());});
	    							//JSDP-223 gjh 2015-7-17 end
	            				}
	            			}
	            		}
	            	});
	            	
	            	
	            	//通过旧邮箱  修改邮箱   新邮箱绑定
	            	$(".upNewEmail").click(function(){
	            		var code = $("#newEmailcode").val() ;
	            		var email= $(".c_email_number").val() ;
	            		
	            		// 获取邮箱
	            		$(".c_email_msg").attr("style","float: right;margin-left: 0;margin-right: 240px") ;
	            		/*var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/ ;*/
	            		var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/ ;
	            		var email=$(".c_email_msg_email").prev().val();
	            		if(email==""){
	            			$(".c_email_msg_email").html("请输入邮箱地址");
	            		}else{
	            			if(!reg.test(email)){  
	            				$(".c_email_msg_email").html("邮箱格式错误");
	            			}else if(email==$("#userEmail").val()){
	            				$(".c_email_msg_email").html("新邮箱与旧邮箱一样，请输入不同的邮箱。")	;
	            			}else  if(email!=$("#userEmail").val()){
	            				$.ajax({
	            					type:"post",
	            					url:"/member_borrow/account/newEmailCount.html?email="+email,
	            					dataType:"json",
	            					success:function(json){
	            						if(!json.result){
	            							/*$(".c_email_msg").html(json.msg) ;
	            							$(".c_email_msg").attr("style","float: right;margin-left: 0;margin-right: 160px") ;*/
	            							$(".c_email_msg_email").html(json.msg) ;
	            						}else{
	            							$(".c_email_msg_email").html("");
	            							if(code!=""){
	            								$.ajax({
	            									type:"get",
	            									url:"/member_borrow/account/updateCheckEmail.html?email="+email+"&code="+code,
	            									dataType:"json",
	            									success:function(json){
	            										//  发送成功
	            										if(json.result){
	            											// 进入第三步
	            											
	            											    $(".c_email_number").val("");
	            											    $("#upemailcode").val("");
	            											    $("#newEmailcode").val("");
	            												$(".upNewEmail").parent().parent().parent().next().show();
	            												$(".upNewEmail").parent().parent().parent().hide();
	            												
	            												$.ajax({
	            													type:"post",
	            													url:"/member/useridentify/identifyData.html",
	            													dataType:"json",
	            													success:function(json){
	            														$(".userEmail").html(json.user.email);
	            														$("#userEmail").val(json.user.email);
	            														
	            													}
	            												});
	            											}else{
	            												$(".update_email_12").html(json.msg);
	            											}
	            									}
	            								});
	            								
	            							}else{
	            								$(".update_email_12").html("请输入验证码!");
	            							}
	            							
	            							
	            							}
	            						}
	            				});
	            				
	            			}
	            			}
	            		
	            		
	            		
	            	});
	            	var upevalidCode = true ;
	            	var upesmsflag ="sms" ;
	            	//  通过手机  修改邮箱   发送手机验证码
	            	$(".upEgetcode").click(function(){
	            		if (upevalidCode) {
	            			var getCodeText = "获取短信验证码";
		            		//JSDP-223 gjh 2015-7-17 start
							$("#checkPhoneCodeSubmit").unbind("click");
							$("#checkPhoneCodeSubmit").click(function(){
		            			$.ajax({
		            				type:"post",
		            				url:"/member_borrow/account/upESendMobileMsg.html",
		            				data : {flag:upesmsflag,validCode:$("#sendSmsValidCode").val()},
		            				dataType:"json",
		            				success:function(json){
		            					//  发送成功
		            					if(json.result){
		            						$(".calculatorCpmBoxPhone").hide();
											$(".calculatorCpmBottom").hide();
											showError("",$("#sendSmsValidCode"));
		            						$(".upEgetcode").parent().next().show();
		            						var time=120;
		            							if($(".upEgetcode").html() == "获取语音验证码"){
		            								upesmsflag = "voice" ;
		            								getCodeText = "获取短信验证码";
		            							}else if($(".upEgetcode").html() == "获取短信验证码"){
		            								upesmsflag = "sms" ;
		            								getCodeText = "获取短信验证码";
		            							}
		            							upevalidCode=false;
		            							var t=setInterval(function () {
		            							time--;
		            								$(".upEgetcode").html(time+"秒后重新获取");
		            								if (time==0) {
		            									clearInterval(t);
		            									$(".upEgetcode").html(getCodeText);
		            									upevalidCode=true;
		            								}
		            							},1000);
		            					}else{
		            						showError(json.msg,$("#sendSmsValidCode"));
		            						//$(".update_email_21").html(json.msg) ;
		            					}
		            					$("#sendSmsValidCode").val("");
										$("#img0").each(function(){$(this).attr("src",'/validimg.html?t=' + Math.random());});
		            				}
		            			});
							});
							$(".calculatorCpmBoxPhone").show();
							$(".calculatorCpmBottom").show();
							$("#sendSmsValidCode").val("");
							$("#img0").each(function(){$(this).attr("src",'/validimg.html?t=' + Math.random());});
							//JSDP-223 gjh 2015-7-17 end
	            		}
	            	});
	            	// 通过手机手机 找回邮箱 校验验证码
	            	$(".upEmobile_next").click(function(){
	            		var code = $("#upEmobilecode").val() ;
	            		if(code!=""){
	            			$.ajax({
	            				type:"get",
	            				url:"/member_borrow/account/verifyUEMobileCode.html?code="+code,
	            				dataType:"json",
	            				success:function(json){
	            					//  发送成功
	            					if(json.result){
	            						 $("#upEmobilecode").val("");
	            						 $("#upEmailForMA").val("");
	            						 $("#newMEmailcode").val("");
	            					// 进入第二步
	            						$(".upEmobile_next").parent().parent().parent().next().show();
	            						$(".upEmobile_next").parent().parent().parent().hide();
	            					}else{
	            						$(".update_email_21").html(json.msg);
	            					}
	            				}
	            			});
	            		}else{
	            			
	            			$(".update_email_21").html("请输入验证码！");
	            		}
	            	});
	            	var uEvalidNewEmailCode2 = true ;
	            	// 通过手机手机 更改邮箱 校验验证码
	            	$(".newsendEmail3").click(function(){
	            		// 获取邮箱
	            	/*	var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/ ;*/
	            		var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/ ;
	            		$(".c_email_msg1").attr("style","float: right;margin-left: 0;margin-right: 240px") ;
	            		var email=$("#upEmailForMA").val();
	            		if(email==""){
	            			$(".c_email_msg_phone").html("请输入邮箱地址");
	            		}else{
	            			if(!reg.test(email)){  
	            				$(".c_email_msg_phone").html("邮箱格式错误");
	            			}else if(email==$("#userEmail").val()){
	            				$(".c_email_msg_phone").html("新邮箱与旧邮箱一样，请输入不同的邮箱。")	;
	            			}else if(email!=$("#userEmail").val()){
	            				$(".c_email_msg_phone").html("");
	            					$.ajax({
	            						type:"post",
	            						url:"/member_borrow/account/newEmailCount.html?email="+email,
	            						dataType:"json",
	            						success:function(json){
	            							if(!json.result){
	            								$(".c_email_msg_phone").html(json.msg) ;
	            							}else{
	            								$(".c_email_msg_phone").html("");
	            								var time=120;
	            								if (uEvalidNewEmailCode2) {
	            									//JSDP-223 gjh 2015-7-17 start
	            									$("#checkPhoneCodeSubmit").unbind("click");
	            									$("#checkPhoneCodeSubmit").click(function(){
	            										$.ajax({
	            											type:"post",
	            											url:"/member_borrow/account/sendEmailMsgNA.html",
	            											data : {email:email,validCode:$("#sendSmsValidCode").val()},
	            											dataType:"json",
	            											success:function(json){
	            											if(!json.result){
	            												showError(json.msg,$("#sendSmsValidCode"));
	            												//$(".update_email_22").html(json.msg) ;
	            											}else{
	            												$(".calculatorCpmBoxPhone").hide();
	            												$(".calculatorCpmBottom").hide();
	            												showError("",$("#sendSmsValidCode"));
	            												uEvalidNewEmailCode2=false;
	            												var t=setInterval(function () {
	            													time--;
	            													$(".newsendEmail3").html(time+"秒后重新获取");
	            													if (time==0) {
	            														clearInterval(t);
	            														$(".newsendEmail3").html("获取邮件验证码");
	            														uEvalidNewEmailCode2=true;
	            													}
	            												},1000);
	            											}
	            											$("#sendSmsValidCode").val("");
	            											$("#img0").each(function(){$(this).attr("src",'/validimg.html?t=' + Math.random());});
	            										}
	            										});
	            									});
	            									$(".calculatorCpmBoxPhone").show();
	            									$(".calculatorCpmBottom").show();
	            									$("#sendSmsValidCode").val("");
	            									$("#img0").each(function(){$(this).attr("src",'/validimg.html?t=' + Math.random());});
	            									//JSDP-223 gjh 2015-7-17 end
	            								}
	            							}
	            						}
	            					});
	            					
	            			}
	            		}
	            	});
	            	//通过手机 修改邮箱   新邮箱绑定
	            	$(".upMNewEmail").click(function(){
	            		var code = $("#newMEmailcode").val() ;
	            		var email= $("#upEmailForMA").val() ;
	            		
	            		
	            		/*var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/ ;*/
	            		var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/ ;
	            		//$(".c_email_msg1").attr("style","float: right;margin-left: 0;margin-right: 240px") ;
	            		var email=$("#upEmailForMA").val();
	            		if(email==""){
	            			$(".c_email_msg_phone").html("请输入邮箱地址");
	            		}else{
	            			if(!reg.test(email)){  
	            				$(".c_email_msg_phone").html("邮箱格式错误");
	            			}else if(email==$("#userEmail").val()){
	            				$(".c_email_msg_phone").html("新邮箱与旧邮箱一样，请输入不同的邮箱。");	
	            			}else if(email!=$("#userEmail").val()){
	            				$(".c_email_msg_phone").html("");
	            					$.ajax({
	            						type:"post",
	            						url:"/member_borrow/account/newEmailCount.html?email="+email,
	            						dataType:"json",
	            						success:function(json){
	            							if(!json.result){
	            								$(".c_email_msg_phone").html(json.msg) ;
	            							}else{
	            								$(".c_email_msg_phone").html("");
	            								if(code!=""){
	            								$.ajax({
	            									type:"get",
	            									url:"/member_borrow/account/updateCheckEmail.html?email="+email+"&code="+code,
	            									dataType:"json",
	            									success:function(json){
	            										//  发送成功
	            										if(json.result){
	            										// 进入第三步
	            											 $("#upEmobilecode").val("");
	            											 $("#upEmailForMA").val("");
	            											 $("#newMEmailcode").val("");
	            											$(".upMNewEmail").parent().parent().parent().next().show();
	            											$(".upMNewEmail").parent().parent().parent().hide();
	            											
	            											
	            											$.ajax({
	            												type:"post",
	            												url:"/member/useridentify/identifyData.html",
	            												dataType:"json",
	            												success:function(json){
	            													$(".userEmail").html(json.user.email);
	            													$("#userEmail").val(json.user.email);
	            													
	            												}
	            											});
	            											
	            										}else{
	            											$(".update_email_22").html(json.msg);
	            										}
	            									}
	            								});
	            								}else{
	            									$(".update_email_22").html("请输入验证码！");
	            									
	            								}
	            								
	            							}
	            						}
	            					});
	            					
	            			}
	            			
	            		}
	            	});
	            	
	            });
			});
	}
	});
	
	
	// 其他
	$(function(){
		$(".c_find").click(function(){
			$(".c_update_detail2").show();
			$(".c_update_detail1").hide();
		});
		$(".c_back").click(function(){
			$(".c_update_detail1").show();
			$(".c_update_detail2").hide();
		});
		//$(".c_telphone").html($(".c_telphone").html().slice(0,3)+"****"+$(".c_telphone").html().slice(7));
		
		$(".c_mobile_pwd").blur(function(){
			if($(".c_mobile_pwd").val()==""){
				$(this).next("span").css({display:"inline-block"}).html("请输入交易密码");
			}else{
				if($(".c_mobile_pwd").val()!=$(".c_mobile_repwd").val()){
					$(".c_mobile_repwd").next("span").show().css({display:"inline-block"}).html("请再次输入交易密码");
				}
			}
		});
		$(".c_mobile_repwd").blur(function(){
			if($(".c_mobile_repwd").val()==""){
				$(this).next("span").css({display:"inline-block"}).html("请再次输入交易密码");
			}else if($(".c_mobile_repwd").val()!=$(".c_mobile_pwd").val()){
				$(this).next("span").css({display:"inline-block"}).html("两次输入密码不一致");
			}else{
				$(this).next("span").hide();
			}
		});
		$(".y_input_now").val("");
		/*//找回密码方式切换
		$(".c_find_way dd").click(function(){
			var index=$(this).index(".c_find_way dd");
			
			if(index==1){
				if($.trim($("#userEmail").val())==""){

					alerts("认证信息提示","<div style='display:block;text-align:center;font-size: 18px;'>请先进行邮箱认证</div><br><a href='/user/activeEmail.html'>邮箱验证</a><a href='javascript:void(0);' class='y_alertsBoxButton cancelButton' style='background:#ddd;color:#333;'>取消</a>",400,200);
					$(".cancelButton").click(function(){
						$(".c_finds").hide();
						$(".c_find_way dd").eq(0).children().attr("checked",true);
						$(".c_finds").eq(0).show();
					});

					$(".y_alertsBoxButton").click(function(){
						
						$(".c_find_way dd").eq(0).children().attr("checked",true);
						$(".c_finds").eq(0).show();
						
					});
				}else{
					$(".c_finds").hide();
					$(this).children().attr("checked",true);
					$(".c_finds").eq(index).show();
					}
			}else{
				$(".c_finds").hide();
				$(this).children().attr("checked",true);
				$(".c_finds").eq(index).show();
			}
			
		})*/
		//"更改手机"验证手机号
		function checkTelephone(obj){  
			var reg= /^[1][3587]\d{9}$/; //验证手机号码  
			var phone=obj.prev().val();
			if(phone==""){
				obj.html("请输入手机号码");
				return false ;
			}else{
				if(!reg.test(phone)){  
					obj.html("手机号码格式错误");
					return false ;
				}else{
					obj.html("");
					return true ;
				}
			} 
		}
		$(".c_tel_msg").prev().blur(function(){
			checkTelephone($(this).next());
		});
		//更改手机号、邮箱切换方式
		$(".c_update_type dd").eq(0).children().attr("checked",true);
		$(".c_update_type2 dd").eq(0).children().attr("checked",true);
		$(".c_update_type dd").click(function(){
			var index=$(this).index(".c_update_type dd");

			if(index==1){
				if($.trim($("#userEmail").val())==""){

					alerts("认证信息提示","<div style='display:block;text-align:center;font-size: 18px;'>请先进行邮箱认证</div><br><a href='/user/activeEmail.html'>邮箱验证</a>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<a href='javascript:void(0);' class='y_alertsBoxButton cancelButton' style='background:#ddd;color:#333;'>取消</a>",400,200);
					$(".cancelButton").click(function(){
						
						$(".c_mobile_valid").eq(0).show();
						$(".c_update_type dd").eq(0).children().attr("checked",true);
						
					});
					
					
					$(".y_alertsBoxButton").click(function(){
						
						$(".c_mobile_valid").eq(0).show();
						$(".c_update_type dd").eq(0).children().attr("checked",true);
						
					});
				}else{
					$(".c_by_way").hide();
					$(this).children().attr("checked",true);
					$(".c_by_way").eq(index).show();	
				}
			}else{
				$(".c_by_way").hide();
				$(this).children().attr("checked",true);
				$(".c_by_way").eq(index).show();
			}
			
			
			
		});
		$(".c_update_type2 dd").click(function(){
			var index=$(this).index(".c_update_type2 dd");
			$(".c_by_way2").hide();
			$(this).children().attr("checked",true);
			$(".c_by_way2").eq(index).show();
		});
	});
	
	function checkBlank(){
		var pwd = $(this).val().replace(/^ +| +$/g,'');
		$(this).val(pwd);
	}
	
	$(function(){
		var tagger=window.setInterval(function(){
			
			if(isOver==2){
				window.clearInterval(tagger);
				$('.y_account_div_a').click(function(){
					//todo
					var $ul = $(this).parent().next('.c_update_detail');
					$(this).parent().next('.c_update_detail').slideUp(500);
					if($ul.is(':visible')){
						$(this).parent().next('.c_update_detail').slideUp(500);
					}else{
						$('.c_update_detail').slideUp();
						$(this).parent().next('.c_update_detail').slideDown(500);
					}
					$("#pwd_forms").parent().next().hide();	
				});
			
			}
		},500);
		});
		//JSDP-223 gjh 2015-7-17 start
		function showError(error, element){
			//element.next().html(error.text()) ;
			/*alert(element.attr("name"));*/
			if(error==""){
				if(element.attr("name")=='password'){
					$("#password").parent().height("46px");
				}
				if(element.attr("name")=='confirmPassword'){
					$("#repassword").parent().height("46px");
				}
				element.parent().find("p").html("") ;
				element.parent().find("p").hide();
				element.css({border:"1px solid #cccccc"});
			}else{
				if(element.attr("name")=='password'){
					$("#password").parent().height("72px");
				}
				if(element.attr("name")=='confirmPassword'){
					$("#repassword").parent().height("72px");
				}
				element.parent().find("p").html(error) ;
				element.parent().find("p").show();
				element.css({border:"1px solid #FA9494"});
			}
		}
		//JSDP-223 gjh 2015-7-17 end
});