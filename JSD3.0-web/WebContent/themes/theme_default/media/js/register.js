define(function(require, exports,module){
	require('jquery');
	require('alertNew');
	
	//注册页红包奖励规则
	$.ajax({
		url:"/user/getRedPacketProduceRule.html",
		type:"post",
		success:function(data){
			require.async('/plugins/handlebars-v1.3.0/handlebars-v1.3.0.js',function(){
				require.async('/plugins/handlebars-v1.3.0/transFormatJson',function(){
				var tpl = require('/themes/theme_default/media/tpl/registerRedPacket.tpl');//载入tpl模板
				var template = Handlebars.compile(tpl);
				var html = template(data);
				$("#red_packet").html(html);
				})
			})
		}
	});
	//协议弹窗
	$("#service_contract").click(function(){
		require.async("/plugins/layer-v1.8.4/layer.min",function(){
			var i = $.layer({
				type :1,
				title : "协议内容",
				closeBtn :[0,true],
				border : [10 , 0.3 , '#000', true],
				area :['auto','550px'],
				page : {dom:'#modal_dialog'}
			});
		})
	});
	if(window.location.search != null && window.location.search != ""){
		$.ajax({
			type: "POST",
			url: "/user/referrer.html" + window.location.search,
			//data: "userName=" + $("#email_userName").val() + "&emom=" + $("#mobile").val(),
			//data: "userName=" + "gjh123" + "&emom=" + "13643466905",
			success: function(data){
				if(data.referrer != undefined && data.referrer != "" && data.referrer != "undefined"){
					$("#referrer").val(data.referrer);
					$("#referrer").attr("disabled",true);
					var inviteContent = $("#referrer").val();
					if(inviteContent.length>20){
						$("#referrer").val("推荐人手机号/用户名 (选填）");
					}
				}
				//alert(data.referrer);
			}
		});
	}
	
	//邮箱调用
	require.async('commonJS/jquery.mailAutoComplete',function(){
		$("#customTest").mailAutoComplete({
			boxClass: "out_box",
			listClass: "list_box",
			focusClass: "focus_box",
			markCalss: "mark_box",
			autoClass: false,
			textHint: true,
			hintText: ""
		});
	})
	
	//推荐人收起拉下
	$(".c_protocol").toggle(function(){
		$(".c_recommend").slideDown();
		//$(".c_protocol").attr({style:("border-bottom:'0',margin-bottom:0")});
		$(".c_protocol").animate({borderBottom:"1px solid #EBEBEB",marginBottom:0});
		$(".c_protocol b").html("收起");
	},function(){
		$(".c_recommend").slideUp();
		//$(".c_protocol").css({border-bottom:("1px solid #EBEBEB"),margin-bottom:("20px")});
		$(".c_protocol").animate({marginBottom:"20px"});
		$(".c_protocol b").html("选填");
	})
	
	$(".c_loginContent .user #mobile").focus(function(){
		$(".c_loginContent .user #mobile").css({color:"#333"});
		if($(".c_loginContent .user #mobile").val()=="请输入手机号码"){
			$(".loginContent .user #mobile").val("");
		}
	})
	$(".c_loginContent .user #mobile").blur(function(){
		if($(".c_loginContent .user #mobile").val()==""){
			$(".loginContent .user #mobile").val("请输入手机号码").css({color:"#ababab"});
		}
	})
	$(".c_loginContent .user #email").focus(function(){
		$(".c_loginContent .user #email").css({color:"#333"});
		if($(".c_loginContent .user #email").val()=="请输入邮箱号码"){
			$(".loginContent .user #email").val("");
		}
	})
	$(".c_loginContent .user #email").blur(function(){
		if($(".c_loginContent .user #email").val()==""){
			$(".loginContent .user #email").val("请输入邮箱号码").css({color:"#ababab"});
		}
	})
	var validCode=true;//获取验证码状态
	var emailValidCode=true;//获取邮箱验证码状态
	//注册时修改获取验证码按钮状态
	function mobileVaildBtn(){
		var getCodeText = "获取短信验证码";
		var time=120;
		if (validCode) {
			getCodeText = "获取短信验证码";
			validCode=false;
			var t=setInterval(function () {
			time--;
				$("#mobileCode").html(time+"秒后重新获取");
				if (time==0) {
					clearInterval(t);
					$("#mobileCode").html(getCodeText);
					validCode=true;
				}
			},1000)
		}
	}
	//JSDP-223 gjh 2015-7-15 start
	$("#checkPhoneCodeSubmit").click(function(){
		if($(".c_loginContent .user #mobileValidCode").val()=="" || $(".c_loginContent .user #mobileValidCode").val()=="短信验证码"){
			alerts("请输入短信验证码","请输入短信验证码",true);
		}else{
			var getCodeText = "获取短信验证码";
			var time=120;
			if (validCode) {
				if($("#mobileCode").html() == "获取短信验证码"){
					getCodeText = "获取短信验证码";
					$.ajax({
						type: "POST",
						url: "/user/sendActivateOrCode.html",
						data: "userName=" + $("#email_userName").val() + "&emom=" + $("#mobile").val() + "&validCode=" + $("#sendSmsValidCode").val(),
						//data: "userName=" + "gjh123" + "&emom=" + "13643466905",
						success: function(msg){
							if(msg.result == true){
								$(".calculatorCpmBoxPhone").hide();
								$(".calculatorCpmBottom").hide();
								showError("",$("#sendSmsValidCode"));
								validCode=false;
								var t=setInterval(function () {
								time--;
									$("#mobileCode").html(time+"秒后重新获取");
									if (time==0) {
										clearInterval(t);
										$("#mobileCode").html(getCodeText);
										validCode=true;
									}
								},1000)
							}else{
								showError(msg.msg,$("#sendSmsValidCode"));
							}
							$("#sendSmsValidCode").val("");
							$("#img0").each(function(){$(this).attr("src",'/validimg.html?t=' + Math.random());});
						}
						});
				}
				
			}
		}
	});
	//获取手机验证码单击事件
	$("#mobileCode").click(function(){
		if(validCode){
			$(".calculatorCpmBoxPhone").show();
			$(".calculatorCpmBottom").show();
			$("#sendSmsValidCode").val("");
			$("#img0").each(function(){$(this).attr("src",'/validimg.html?t=' + Math.random());});
		}
		
	})
	//JSDP-223 gjh 2015-7-15 end
	$("#activate_email").click(function(){
		$("#email_box").attr({style: "padding:0px;"});
  		$("#activate_box").attr({ style: "display:none;"});
	})
	$("#checkEmailCodeSubmit").click(function(){
		if($(".c_loginContent .user #email").val()=="" || $(".c_loginContent .user #email").val()=="请输入邮箱号码"){
			showError("请输入邮箱号码",$("#email"));
			//alerts("请输入邮箱号码","请输入邮箱号码",true);
		}else{
			if (emailValidCode) {
			$.ajax({
				   type: "POST",
				   url: "/user/sendActivateOrCode.html",
				 //JSDBET-822 gjh 2015-3-19 start
				   data: "userName=" + $("#email_userName").val() + "&emom=" + $("#email").val() + "&mobile=" + $("#mobilePhone1").val()+ "&validCode=" + $("#sendEmailValidCode").val(),
				 //JSDBET-822 gjh 2015-3-19 end
				   success: function(msg){
					  if(msg.result == true){
						  
						  $(".calculatorCpmBoxEmail").hide();
							$(".calculatorCpmBottom").hide();
							showError("",$("#sendEmailValidCode"));
						  
						  var time=120;
						  
								emailValidCode=false;
								var t=setInterval(function  () {
									time--;
									$("#emailCode").html(time+"秒后重新获取");
									if (time==0) {
										clearInterval(t);
										$("#emailCode").html("重新获取");
										emailValidCode=true;
									}
								},1000)
							
						  
					  }else{
						  $("#sendEmailValidCode").val("");
						  $("#img00").each(function(){$(this).attr("src",'/validimg.html?t=' + Math.random());});
						 // $("#emailCode").parent().parent().find("p").eq(0).html(msg.msg) ;
						  //$("#emailCode").parent().parent().find("p").eq(0).show();
					  }
				  }
				
				});
			}
		}
	});
	$("#emailCode").click(function(){
		if($(".c_loginContent .user #email").val()=="" || $(".c_loginContent .user #email").val()=="请输入邮箱号码"){
			showError("请输入邮箱号码",$("#email"));
			//alerts("请输入邮箱号码","请输入邮箱号码",true);
		}else{
			if (emailValidCode) {
				$(".calculatorCpmBoxEmail").show();
				$(".calculatorCpmBottom").show();
				$("#sendEmailValidCode").val("");
				$("#img00").each(function(){$(this).attr("src",'/validimg.html?t=' + Math.random());});
			}
		}
	})
	
	$(".c_loginContent .c_user input").focus(function(){
		$(".c_loginContent .c_user input").css({color:"#333"});
		if($(".c_loginContent .c_user input").val()=="请输入用户名")
			$(".loginContent .c_user input").val("");
	})
	$(".c_loginContent .c_user input").blur(function(){
		if($(".c_loginContent .c_user input").val()==""){
			$(".loginContent .c_user input").val("请输入用户名").css({color:"#ababab"});
		}
	})
	$(".c_loginContent .validCode #validCode").focus(function(){
		$(".c_loginContent .validCode #validCode").css({color:"#333"});
		if($(".c_loginContent .validCode #validCode").val()=="验证码")
			$(".c_loginContent .validCode #validCode").val("");
	})
	$(".c_loginContent .validCode #validCode").blur(function(){
		if($(".c_loginContent .validCode #validCode").val()==""){
			$(".c_loginContent .validCode #validCode").val("验证码").css({color:"#ababab"});
		}
	})
	$(".c_loginContent .validCode #mobileValidCode").focus(function(){
		$(".c_loginContent .validCode #mobileValidCode").css({color:"#333"});
		if($(".c_loginContent .validCode #mobileValidCode").val()=="手机验证码")
			$(".c_loginContent .validCode #mobileValidCode").val("");
	})
	$(".c_loginContent .validCode #mobileValidCode").blur(function(){
		if($(".c_loginContent .validCode #mobileValidCode").val()==""){
			$(".c_loginContent .validCode #mobileValidCode").val("手机验证码").css({color:"#ababab"});
		}
	})
	$(".c_loginContent .validCode #emailValidCode").focus(function(){
		$(".c_loginContent .validCode #emailValidCode").css({color:"#333"});
		if($(".c_loginContent .validCode #emailValidCode").val()=="邮箱验证码")
			$(".c_loginContent .validCode #emailValidCode").val("");
	})
	$(".c_loginContent .validCode #emailValidCode").blur(function(){
		if($(".c_loginContent .validCode #emailValidCode").val()==""){
			$(".c_loginContent .validCode #emailValidCode").val("邮箱验证码").css({color:"#ababab"});
		}
	})
	$(".c_loginContent .c_email input").focus(function(){
		$(".c_loginContent .c_email input").css({color:"#333"});
		if($(".c_loginContent .c_email input").val()=="请输入邮箱号码")
			$(".c_loginContent .c_email input").val("");
	})
	$(".c_loginContent .c_email input").blur(function(){
		if($(".c_loginContent .c_email input").val()==""){
			$(".c_loginContent .c_email input").val("请输入邮箱号码").css({color:"#ababab"});
		}
	})
	
	$(".c_loginContent .c_mobile_tel input").focus(function(){
		$(".c_loginContent .c_mobile_tel input").css({color:"#333"});
		if($(".c_loginContent .c_mobile_tel input").val()=="请输入手机号码")
			$(".c_loginContent .c_mobile_tel input").val("");
	})
	$(".c_loginContent .c_mobile_tel input").blur(function(){
		if($(".c_loginContent .c_mobile_tel input").val()==""){
			$(".c_loginContent .c_mobile_tel input").val("请输入手机号码").css({color:"#ababab"});
		}
	})
	$("#referrer").focus(function(){
		$("#referrer").css({color:"#333"});
		if($("#referrer").val()=="推荐人手机号/用户名 (选填）")
			$("#referrer").val("");
	})
	$("#referrer").blur(function(){
		if($("#referrer").val()==""){
			$("#referrer").val("推荐人手机号/用户名 (选填）").css({color:"#ababab"});
		}
	})
	$("#repassword").val("");
	$("#password").val("");
	$(".repassword").focus(function() {
		var text_value = $(this).val();
		if (text_value == this.defaultValue) {
		$(".repassword").hide();
			if($(this).parent().find("p").html()!=""){
				$("#repassword").parent().height("72px");
			}else{
				$("#repassword").parent().height("46px");
			}
			$(this).parent().find("p").css({bottom: "-46px",position: "relative"});
			$("#repassword").show().css({opacity:1,color:"#333"}).focus();
		}
	});
	$("#repassword").blur(function() {
		var text_value = $(this).val();
		if (text_value == "") {
			if($(this).parent().find("p").html()!=""){
				$("#repassword").parent().height("72px");
				$(".password").css({border:"1px solid #FA9494"});
			}else{
				$("#repassword").parent().height("46px");
			}
			$(this).parent().find("p").css({bottom: "-2px",position: "relative"});
			$("#repassword").show().css({opacity:0});
			$(".repassword").show().css({color:"#ababab"});
		}
	});
	$(".password").focus(function() {
		var text_value = $(this).val();
		if (text_value == this.defaultValue) {
		$(".password").hide();
		if($(this).parent().find("p").html()!=""){
			$("#password").parent().height("72px");
		}else{
			$("#password").parent().height("46px");
		}
		$(this).parent().find("p").css({bottom: "-46px",position: "relative"});
		$("#password").show().css({opacity:1,color:"#333"}).focus();
		}
	});
	$("#password").blur(function() {
		var text_value = $(this).val();
		if (text_value == "") {
			
			if($(this).parent().find("p").html()!=""){
				$("#password").parent().height("72px");
				$(".password").css({border:"1px solid #FA9494"});
			}else{
				$("#password").parent().height("46px");
			}
			$(this).parent().find("p").css({bottom: "-2px",position: "relative"});
			$("#password").show().css({opacity:0});
			$(".password").show().css({color:"#ababab"});
		}
	});
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
	function WidthCheck(str, min , max){ 
		var w = 0; 
		for (var i=0; i<str.length; i++) { 
		   var c = str.charCodeAt(i); 
		   //单字节加1 
		   if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) { 
		    w++; 
		   } 
		   else { 
		    w+=2; 
		   } 
		} 
		if (w > max) { 
		   return false; 
		}
		if (w < min){
			return false; 
		}
		return true; 
	}
	//表单验证
	require.async('/plugins/jquery-validation-1.13.0/jquery.validate',function(){
		require.async('/plugins/jquery-validation-1.13.0/additional-methods',function(){
			jQuery.validator.addMethod("emomc", function(value, element) {       
				  var length = value.length;   
				   var mobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|(17[0-9]{1}))+\d{8})$/;   
				   var email = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/ ;
				   var username = /^([a-zA-Z0-9_]|[\u0391-\uFFE5]){2,15}$/;
				   //return this.optional(element) || (length == 11 && mobile.test(value) || email.test(value));       
				   return this.optional(element) || (length == 11 && mobile.test(value) && value != "请输入手机号码");       
			}, "请填写正确的手机号码"); 
			
			jQuery.validator.addMethod("checkUserName", function(value, element) {       
				var flag;
				var length = value.length;   
				var username = /^([a-zA-Z0-9_]){4,16}$/;
				var number =/^[0-9]{4,16}$/;
				/*if(WidthCheck(value,4 ,15)){
					if((value != "请输入用户名") && username.test(value) && !number.test(value) && value != "请输入用户名"){
						flag = true;	
					}
				}else{
					flag = false;	
				}
				//flag = WidthCheck(value, 15) && (value != "请输入用户名") && username.test(value);
				return flag; */
				return (value != "请输入用户名") && username.test(value) && !number.test(value);
				//return this.optional(element) || (length == 11 && mobile.test(value));       
			}, "用户名格式错误,长度为4到16位,由英文、数字、_组成,且不能为纯数字"); 
			jQuery.validator.addMethod("vcodenovalue", function(value, element) {    
				   return this.optional(element) || !(value == "验证码");       
			}, "验证码不能为空"); 
			$("#signupForm").validate({
				rules: {
					userName:{
				  		required:true,
				  		checkUserName:true,
						remote:{
								type: "POST",
								url: "/user/checkUsername.html",
								dataType: "json",
								data:{userName: function(){return $("#username").val();}}
							}
						},
						emom: {
							required: true,
							emomc:true,
							remote:{
								type: "POST",
								url: "/user/checkUserNameType.html",
								dataType: "json",
								data:{emom: function(){return $("#mobile").val();}}
							}
				   		},
				   password: {
							required: true,
							regexPassword:true
				   },
					confirmPassword: {
						required: true,
						equalTo: "#password"
				   },
				   validCode:{
				   		required:true,
				   		vcodenovalue:true 
				   },
				   agree:{
				   		required:true
				   },
				   referrer:{
					   required:true
				   }
				},
				messages:{
				   	userName:{
							required:"用户名不能为空",
							regexUserName:"用户名格式错误,长度为4到16位,由英文、数字、_组成,且不能为纯数字",
							remote:"该用户名已经存在"
					   },
				    emom: {
							required: "手机号不能为空",
							emomc: "请输入正确的手机号",
							remote:"手机号已存在"
						   },
					password: {
							required: "密码不能为空" ,
							regexPassword:'密码格式错误,长度为8到16位,必须包含英文、数字'
						},
				   confirmPassword: {
							required: "请输入确认密码",
							equalTo: "两次输入密码不一致"
						},
					validCode:{
				   			required:"请输入验证码",
				   			vcodenovalue:"验证码不能为空"
				   	},
					agree:{
					   	required:"请勾选服务协议条款"
					},
					referrer:{
				   		required:"请勾选服务协议条款"
				   	}
				},
				errorPlacement:function(error, element){
					//element.next().html(error.text()) ;
					/*alert(element.attr("name"));*/
					
					if(error.text()==""){
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
						element.parent().find("p").html(error.text()) ;
						element.parent().find("p").show();
						element.css({border:"1px solid #FA9494"});
					}
				},
				success:function(element){
				},
				submitHandler: function(form,event,validator) 
				{     
				   	require.async('jquery.form',function(){
				   		$(form).ajaxSubmit(function(data){
					    	  if(data.result == true)
				    		  {
					    		  $("#showCookie").css({display:"none"});
					    		  //mobileVaildBtn();
				    		  		//$("#mobile_box").attr({style: ""});
				    		  		$("#mobile_box").attr({style: "padding:0px;"});
				    		  		$("#register_box").attr({ style: "display:none;"});
				    		  		$("#login2").attr({style: ""});
				    		  		$("#login1").attr({ style: "display:none;"});
				    		  		$("#mobile_phone").html($("#mobile").val());
				    		  		$("#mobilePhone").val($("#mobile").val());
				    		  		$("#valid_btn").attr({href:"${webroot}/validimg.html"});
				    		  		$("#addReferrer").val($("#referrer").val());
				    		  } else {
				    			  //alerts(data.msg,data.msg,true);
				    			  $("#showCookie").css({display:"none"});
				    		  		$("input[name='validCode']").val('');
					    		  	if(data.msg == "用户名格式错误！")
					    		  	{
					    		  		showError("请输入长度为4到15位的用户名，由英文字母、数字、中文组成,且不能为纯数字,一个中文占长度为2",$("#username"));
					    		  	}
					    		  	else if(data.msg == "验证码错误！")
					    		  	{
					    		  		showError(data.msg,$("#validCode"));
					    		  	}
					    		  	else if(data.msg == "用户名长度必须是4-16位！"){
					    		  		showError(data.msg,$("#username"));
					    		  	}
					    		  	else if(data.msg == "手机已经被使用")
					    		  	{
					    		  		showError(data.msg,$("#mobile"));
					    		  	}else if(data.code == "00"){
					    				  $("#showCookie").css({display:"block"});
					    			}else if(data.code == "006"){
					    				mobileVaildBtn();
					    		  		//$("#mobile_box").attr({style: ""});
					    		  		$("#mobile_box").attr({style: "padding:0px;"});
					    		  		$("#register_box").attr({ style: "display:none;"});
					    		  		$("#login2").attr({style: ""});
					    		  		$("#login1").attr({ style: "display:none;"});
					    		  		$("#mobile_phone").html($("#mobile").val());
					    		  		$("#mobilePhone").val($("#mobile").val());
					    		  		$("#valid_btn").attr({href:"${webroot}/validimg.html"});
					    		  		$("#addReferrer").val($("#referrer").val());
					    				showError(data.msg,$("#mobileValidCode"));
					    			}
					    		  	$("#validCode").val("");
					    			$("#img").each(function(){$(this).attr("src",'/validimg.html?t=' + Math.random());});
				    		  }
				        });
				   	})
				}  
			});
		})
	})
	$("#noCookie").click(function(){
		 alerts("如何开启","<p>1. ie浏览器：点击浏览器“工具”——“internet选项”——“隐私”——将“阻止所有cookie”调低级别——点击“保存”" +
			 		"——重启浏览器即可正常登录。</p><p>2. chrome浏览器：点击浏览器“设置”——“显示高级设置”——“隐私设置”——“内容设置”——取消" +
			 		"“阻止第三方cookie和网站数据”——选择“允许设置本地数据（推荐）”——点击“完成”——重启浏览器即可正常登录。</p>" +
			 		"<p>3. 火狐浏览器：点击浏览器“选项”——选择“隐私”——“自定义历史记录设置”，取消“" +
			 		"始终使用隐私浏览模式”，勾选“接受来自站点的cookie”——点击“确定”——重启浏览器即可生效。</p>",600,300);
		});
	//手机验证码表单提交
	require.async('/plugins/jquery-validation-1.13.0/jquery.validate',function(){
		require.async('/plugins/jquery-validation-1.13.0/additional-methods',function(){
			
			$("#checkMobileForm").validate({
				rules: {
				   validCode:{
				   		required:true,
				   		vcodenovalue:true 
				   },
				   agree:{
				   		required:true
				   }
				},
				messages:{
					validCode:{
		   				required:"请输入验证码",
		   				vcodenovalue:"验证码不能为空"
					},
					agree:{
					   	required:"请勾选服务协议条款"
					}
				},
				errorPlacement:function(error, element){
					//element.next().html(error.text()) ;
					/*alert(element.attr("name"));*/
					
					if(error.text()==""){
						if(element.attr("name")=='pwd'){
							$("#password").parent().height("46px");
						}
						if(element.attr("name")=='confirmPassword'){
							$("#repassword").parent().height("46px");
						}
						element.parent().find("p").html("") ;
						element.parent().find("p").hide();
						element.css({border:"1px solid #cccccc"});
					}else{
						if(element.attr("name")=='pwd'){
							$("#password").parent().height("72px");
						}
						if(element.attr("name")=='confirmPassword'){
							$("#repassword").parent().height("72px");
						}
						element.parent().find("p").html(error.text()) ;
						element.parent().find("p").show();
						element.css({border:"1px solid #FA9494"});
					}
				},
				success:function(element){
				},
				submitHandler: function(form,event,validator) 
				{      
				   	require.async('jquery.form',function(){
				   		$(form).ajaxSubmit(function(data){
					    	  if(data.result == true)
				    		  {
					    		  	$(".js_sucEmail").text(data.email);
						    		$(".js_resetEmail").val(data.email);
						    		$(".js_userid").val(data.userId);
					    		  	$(".reg_process li:eq(1)").addClass("hover").siblings().removeClass("hover");
					    		  //JSDBET-822 gjh 2015-3-19 start
					    		  	$("#mobilePhone1").val(data.mobile);
					    		  //JSDBET-822 gjh 2015-3-19 end
					    		  	if(data.retype=="mobile"){
					    		  	/*	location.href = "/user/login.html";*/
					    		  		location.href = "/user/registertoOnly.html";
					    		  		/*$("#activate_box").attr({style: "padding:0px;"});
					    		  		$("#mobile_box").attr({ style: "display:none;"});*/
					    		  		//$("#mobile_phone").html($("#mobile").val());
					    		  		//$("#valid_btn").attr({href:"${webroot}/validimg.html"});
					    		  		//$(".reg_content").slideUp();
					    		  		//$(".remobile").slideDown();
					    		  	}
					    		  	if(data.retype=="email"){
					    		  		$(".reg_content").slideUp();
					    		  		$(".reemail").slideDown();
					    		  	}
					    		  	//loginEmail(data.email);
				    		  } else {
				    			  showError(data.msg,$("#mobileValidCode"));
				    		  		//alerts(data.msg,data.msg,false);
				    		  }
				        });
				   	})
				}  
			});
		})
	})
	//邮箱验证码表单提交
	require.async('/plugins/jquery-validation-1.13.0/jquery.validate',function(){
		require.async('/plugins/jquery-validation-1.13.0/additional-methods',function(){
			jQuery.validator.addMethod("email", function(value, element) {       
				   var length = value.length; 
				   var mobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|(17[0-9]{1}))+\d{8})$/;   
				   var email = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/ ;
				   return this.optional(element) || email.test(value);     
			}, "请填写正确的邮箱号码"); 
			jQuery.validator.addMethod("vcodenovalue", function(value, element) {    
				   return this.optional(element) || !(value == "验证码");       
			}, "验证码不能为空"); 
			$("#checkEmailForm").validate({
				rules: {
				validCode:{
				required:true,
				vcodenovalue:true 
				},
				agree:{
					required:true
				},emom: {
					required: true,
					email:true,
					remote:{
						type: "POST",
						url: "/user/checkUserNameType.html",
						dataType: "json",
						data:{emom: function(){return $("#email").val();}}
					}
		   		}
			},
			messages:{
				validCode:{
				required:"请输入验证码",
				vcodenovalue:"验证码不能为空"
				},
				agree:{
					required:"请勾选服务协议条款"
				},
			    emom: {
					required: "邮箱号不能为空",
					email: "请输入正确的邮箱号",
					remote:"邮箱号已存在"
				}
			},
			errorPlacement:function(error, element){
				//element.next().html(error.text()) ;
				/*alert(element.attr("name"));*/
				
				if(error.text()==""){
					if(element.attr("name")=='pwd'){
						$("#password").parent().height("46px");
					}
					if(element.attr("name")=='confirmPassword'){
						$("#repassword").parent().height("46px");
					}
					element.parent().find("p").html("") ;
					element.parent().find("p").hide();
					element.css({border:"1px solid #cccccc"});
				}else{
					if(element.attr("name")=='pwd'){
						$("#password").parent().height("72px");
					}
					if(element.attr("name")=='confirmPassword'){
						$("#repassword").parent().height("72px");
					}
					element.parent().find("p").html(error.text()) ;
					element.parent().find("p").show();
					element.css({border:"1px solid #FA9494"});
				}
			},
			success:function(element){
			},
			submitHandler: function(form,event,validator) 
			{      
				require.async('jquery.form',function(){
					$(form).ajaxSubmit(function(data){
						if(data.result == true)
						{
							location.href = "/member/main.html";
						} else {
							showError(data.msg,$("#emailValidCode"));
						}
					});
				})
			}  
			});
		})
	})
	
	
	//密码强弱判断
	$("#password").keyup(function(){
		var strongRegex = new RegExp("^(?=.{8,})(?=.*[a-zA-Z])(?=.*[0-9])(?=.*\\W).*$", "g"); 
		var mediumRegex = new RegExp("^(?=.{8,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g"); 
		var enoughRegex = new RegExp("(?=.{8,}).*", "g"); 
		var $pw = $(".passwordStrength");
		if (false == enoughRegex.test($(this).val())) { 
			$pw.removeClass('level1 level2 level3').addClass('level0'); 
			//密码小于八位的时候，密码强度图片都为灰色 
		} 
		else if (strongRegex.test($(this).val())) {
			$pw.removeClass('level1 level2 level3').addClass('level3');
			//密码为八位及以上并且字母数字特殊字符三项都包括,强度最强 
		} 
		else if (mediumRegex.test($(this).val())) { 
			$pw.removeClass('level1 level2 level3').addClass('level2');
			//密码为八位及以上并且字母、数字、特殊字符三项中有两项，强度是中等 
		} 
		else { 
			$pw.removeClass('level1 level2 level3').addClass('level1');
			//如果密码为8为及以下，就算字母、数字、特殊字符三项都包括，强度也是弱的 
		} 
		return true; 
	});
	//邮件再次发送
	$("#reset_email").click(function(){
	    	var  that = $(this)
	    	var EmailVal = $(".js_sucEmail").text();
	    	var userid = $(".js_userid").val();
	    	var timeNum = 60;
	    	resttEmailUrl = "/user/sentActivationEmail.html?userId="+userid;
	    	$.ajax({
	    		url:resttEmailUrl,
	    		type:"post",
	    		data:{email:EmailVal},
	    		success:function(data){
	    			var result = data.result;
	    			var Time = "";
	    			if(result==true)
    				{
    					Time = setInterval(function(){
    						timeNum--;
    						if(timeNum>0){
    							that.val(timeNum+"秒后重发").addClass("disabled");
    						}
    						else{
    							clearInterval(Time);
    							that.val("重新发送").removeAttr("disabled");
    						}
    					},1000)
    				}
	    		}
	    	});
	    });
	
		//["qq.com","gmail.com","126.com","163.com","hotmail.com","yahoo.com","yahoo.com.cn","live.com","sohu.com","sina.com"]	
		//点击登录邮箱地址
	    function loginEmail(emailValue){
	    	var loginEmailBox = $("#loginEmail");
	    	var loginEmailValue = "";
	    	emailValue = (emailValue.split("@"))[1];
	    	switch (emailValue)
	    	{
	    		case "qq.com":
	    			loginEmailValue = "mail.qq.com";
	    			break;
	    		case "gmail.com":
	    			loginEmailValue = "mail.google.com";
	    			break;
	    		case "126.com":
	    			loginEmailValue = "mail.126.com";
	    			break;
	    		case "163.com":
	    			loginEmailValue = "mail.163.com";
	    			break;
	    		case "hotmail.com":
	    			loginEmailValue = "login.live.com";
	    			break;
	    		case "yahoo.com":
	    			loginEmailValue = "login.yahoo.com";
	    			break;
	    		case "live.com":
	    			loginEmailValue = "login.live.com";
	    			break;
	    		case "sohu.com":
	    			loginEmailValue = "mail.sohu.com";
	    			break;
	    		case "sina.com":
	    			loginEmailValue = "mail.sina.com";
	    			break;	
	    	}
	    	loginEmailBox.attr("href","http://"+loginEmailValue);
	    } 

	    //邮箱倒计时
	    var time = parseInt($(".remain_time").text())
	    if(time > 0)
	    {
	    	var t = setInterval(function(){
	    		time --;
	    		$(".remain_time").text(time);
	    		if(time <= 1)
	    		{	
	    			window.location.href = $(".reg_link").attr("href");
	    		}
	    	},1000);
	    }
	    $("#resetPhoneCode").click(function(){
			var that = $(this);
			var setUrl = "/user/getRegisterCode.html?mobilePhone="+$('input[name="mobilePhone"]').val();
			var dataTime = 60;
			var Timer;
			$.ajax({
				url:setUrl,
				type:"post",
				success:function(data){
					var result = data.result;
					if(result == true)
					{
						Timer = setInterval(function(){
							dataTime--;
							if(dataTime>0)
							{
								that.val(dataTime+"秒后重新发送").attr("disabled","disabled");
							}
							else{
								clearInterval(Timer);
								that.val("重新发送").removeAttr("disabled");
							}
						},1000)
					}
				}
			})
		})
		
		$(".modal-backdrop").hide();
		$(".register").hover(function(){
			$(".c_register_protocal").show();
		})
		$(".c_register_protocal").mouseleave(function(){
			$(".c_register_protocal").hide();
		})
		$(".c_register_protocal a").click(function(){
			$(".modal-backdrop").fadeIn();
			$("#Contract").slideDown(600);
		})
		$(window).resize(function(){
			$("#Contract").css({left:($(window).width()-$("#Contract").width())/2})
		})
		$(window).resize();
		$(".close").click(function(){
			$("#Contract").slideUp(600);
			$(".modal-backdrop").fadeOut();
		})
		$(".btn-primary").click(function(){
			$("#Contract").slideUp(600);
			$(".modal-backdrop").fadeOut();
		})
	
		
		//注册活动页添加 gjh
		if($("#activity").val() == "register"){
			$("#mobile").val($("#a_mobile").val());
			//alert($("#mobile").val());
			//$("#mobile_phone").html($("#a_mobile").val());
			//$("#mobilePhone").val($("#a_mobile").val());
			//alert($("#mobile_phone").html());
			$("#showCookie").css({display:"none"});
			//mobileVaildBtn();
			//$("#mobile_box").attr({style: ""});
			$("#mobile_box").attr({style: "padding:0px;"});
			$("#register_box").attr({ style: "display:none;"});
			$("#login2").attr({style: ""});
			$("#login1").attr({ style: "display:none;"});
			$("#mobile_phone").html($("#mobile").val());
			$("#mobilePhone").val($("#mobile").val());
			$("#valid_btn").attr({href:"${webroot}/validimg.html"});
			$("#addReferrer").val($("#referrer").val());
		}
	    
});
