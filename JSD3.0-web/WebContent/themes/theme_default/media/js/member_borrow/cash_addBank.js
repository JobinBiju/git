define(function(require,exports,module){
	
	require('jquery');	
	require('alert');
	/*
	 *初始化省份选择框
	 * */
	$.ajax({
        type:"get",
        url:"/region/regionList.html?id="+Math.random(),
        dataType:"json",
        success:function(json){
        	
        	 for(i=0;i<json.length;i++) {                                                                                                                                                                                        
        		 
        		  var province=json[i];
        		 $("#province_new").append("<option  value="+province.id+">"+province.name+"</option>");
        	 }
        }
    });
	
	//给省份下拉选择框注册change事件 
	 $("#province_new").change(function(){
		 $("#city").empty();
		 $("#city").append("<option value=''>请选择</option>");
		 var id = $(this).val();
		 getCity(id);
	 });
	
	/*省份发生变化
	 *AJAX一步后台获取与此省份关联的城市
	 * 
	 * */
	function  getCity(id){
		//ajax逻辑
		$.ajax({
	        type:"get",
	        url:"/region/regionList.html?id="+Math.random(),
	        dataType:"json",	        
	        data:{
	        	pId:id
	        },
	        success:function(json){
	        	 for(i=0;i<json.length;i++) {                                                                                                                                                                                        
	        		  var city=json[i];
	        		 $("#city_new").append("<option value="+city.id+">"+city.name+"</option>");
	        	 }
	        }
	    });
		
	}
	/*
	 * 点击图片获得开户行
	 * */
	$(".imgBankName").click(function(){		
		
		$("#bank").val($(this).data("val"));
		var bankName  = $(this).next().val();
		$("#openBankName").val(bankName);
	});
	
	/*
	 * 选择其它开户行
	 * */
	$(".bankselect").change(function(){
		$("#bank").val($(this).data("val"));
		
	});
	
	//银行卡格式处理
	function checkBank(BankNo) {
		if (BankNo.value == "")
			return;
		var account = new String(BankNo.value);
		account = account.substring(0, 22); /* 账号的总数, 包括空格在内 */
		if (account.match(".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}") == null) {
			/* 对照格式 */
			if (account.match(".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|"
					+ ".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|"
					+ ".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|"
					+ ".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}") == null) {
				var accountNumeric = accountChar = "", i;
				for (i = 0; i < account.length; i++) {
					accountChar = account.substr(i, 1);
					if (!isNaN(accountChar) && (accountChar != " "))
						accountNumeric = accountNumeric + accountChar;
				}
				account = "";
				for (i = 0; i < accountNumeric.length; i++) { /* 可将以下空格改为-,效果也不错 */
					if (i == 4)
						account = account + " "; /* 账号第四位数后加空格 */
					if (i == 8)
						account = account + " "; /* 账号第八位数后加空格 */
					if (i == 12)
						account = account + " ";/* 账号第十二位后数后加空格 */
					account = account + accountNumeric.substr(i, 1)
				}
			}
		} else {
			account = " " + account.substring(1, 5) + " "
					+ account.substring(6, 10) + " "
					+ account.substring(14, 18) + "-"
					+ account.substring(18, 25);
		}
		if (account != BankNo.value)
			BankNo.value = account;
	}

	//短信验证码处理
	var hq = true;
	//JSDP-223 gjh 2015-7-15 start
	$("#checkPhoneCodeSubmit").click(function(){
		var time = 120;
		if (hq) {
			$.ajax({
		        type:"post",
		        dataType:"json",
		        url:"/member/cash/addBankGetCode.html",
		        data : "?id="+Math.random()  + "&validCode=" + $("#sendSmsValidCode").val(),
		        dataType:"json",
		        success:function(json){
			        if(json.result== true){
			        	$(".calculatorCpmBox1").hide();
						$(".calculatorCpmBottom").hide();
						$("#validCode1").val("");
						$("#validCode1").next().find("img").each(function(){$(this).attr("src",'/validimg.html?t=' + Math.random());});
						$(".verify_y_spans").html("<font style='color:#FC6210'>发送成功</font>");
						hq = false;
						var t = setInterval(function() {
							time--;	
							$(".verify_code").addClass("verify_code_on");
							$(".verify_code_on").removeClass("verify_code");
							$(".verify_code_on").html(time +"秒后重新获取");
							if (time == 0) {
								clearInterval(t);
								$(".verify_code_on").addClass("verify_code");
								$(".verify_code").removeClass("verify_code_on");
								$(".verify_code").html("重新获取");
								$(".verify_y_spans").html("");
								hq = true;
							}
						}, 1000)
			        }else if(json.result== false){
			        	showError(json.msg,$("#sendSmsValidCode"));
			        //$(".verify_y_spans").html("<font style='color:#FC6210'>发送失败，稍后重新获取</font>");	
			        }
			        $("#sendSmsValidCode").val("");
					$("#img0").each(function(){$(this).attr("src",'/validimg.html?t=' + Math.random());});
		        }
		    });
			
		}
	});
	$(".verify_code").click(function() {
		if (hq) {
			$(".calculatorCpmBoxPhone").show();
			$(".calculatorCpmBottom").show();
			$("#sendSmsValidCode").val("");
			$("#img0").each(function(){$(this).attr("src",'/validimg.html?t=' + Math.random());});
		}
	})
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
	//JSDP-223 gjh 2015-7-15 end
	/*
	 * 2014.12.12
	 * 李建云
	 * 表单验证及提交
	 * 
	 * */ 
	require.async('/plugins/jquery-validation-1.13.0/jquery.validate',function(){
		require.async('/plugins/jquery-validation-1.13.0/additional-methods',function(){
			require.async(['/plugins/poshytip/tip-yellowsimple/tip-yellowsimple.css','/plugins/poshytip/jquery.poshytip.min'],function(){
				require.async(['/plugins/layer-v1.8.4/skin/layer.css','/plugins/layer-v1.8.4/layer.min'],function(){
	//表单验证
	$("#addBankForm").validate({
		rules:{
			bank:{
				required:true
			},
			branch:{
				required:true,
				/* JSDP-114 fgq 5.14 start qq浏览器绑定银行卡支行不能输入*/
				checkBranch:true
				/* JSDP-114 fgq 5.14 end qq浏览器绑定银行卡支行不能输入*/
			},
			bankNo:{
				required:true,
				rangelength:[12,19],	
				/*bankaccountFormat:true*/
			},
			province:{
				required:true
			},
			city:{
				required:true
			},
			verifyCode:{
				required:true
			}
		},
		messages:{
			bank:{
				required:"请选择开户行"
			},
			branch:{
				required:"请输入支行名称",
				checkBranch:"请输入正确支行名称"
			},
			bankNo:{
				required:"请输入银行账号",
				rangelength:"请输入{0}或{1}位银行账号",
				/*bankaccountFormat:"银行卡号格式不正确"*/
			},
			province:{
				required:"请选择省或市"
			},
			city:{
				required:"请选择省或市"
			},
			verifyCode:{
				required:"请输入手机验证码"
			}
		},
		   errorPlacement:function(error,element){
			   if(error.text()==""){
					element.parent().find("span").html("") ;
					element.parent().find("span").hide();
					element.css({border:"1px solid #cccccc"});
			}else{
	
				element.parent().find("span").html(error.text());
				element.parent().find("span").show();
				element.parent().find("span").css("display","block");
				element.parent().find("span").css({border:"1px solid #FA9494"});
			}
		},
			success:function(element){
			},
			
			submitHandler:function(form){
		    	require.async('jquery.form',function(){
		    		if($("#province1").val() != -1 && $("#city1").val() != -1){
		    			$("#province1").parent().find("span").html("") ;
	    				$("#province1").parent().find("span").hide();
	    				$("#province1").css({border:"1px solid #cccccc"});
	    				$("#city1").parent().find("span").html("") ;
	    				$("#city1").parent().find("span").hide();
	    				$("#city1").css({border:"1px solid #cccccc"});
			    	$(form).ajaxSubmit(function(data){
			        	
			    		if(data.result==true){
							$.layer({
							    shade: [0],
							  
							    dialog: {
							        msg: '添加成功，是否继续添加银行卡？',
							        btns: 2,                    
							        type: 1,
							        btn: ['是','否'],
							        yes: function(){
							        	location.reload();
							        }, no: function(){
							        	location.href = "/member_borrow/cash/bank.html";
							        }
							    }
							});
						}else{
							//layer.msg(data.msg, 2, -1);
							$.alert(data.msg,"提示",function(){},true);
						}
			    		})
		    		}else{
		    			if($("#province1").val() == -1){
		    				$("#province1").parent().find("span").html("请选择省");
		    				$("#province1").parent().find("span").show();
		    				$("#province1").parent().find("span").css("display","block");
		    				$("#province1").parent().find("span").css({border:"1px solid #FA9494"});
		    			}else{
		    				$("#province1").parent().find("span").html("") ;
		    				$("#province1").parent().find("span").hide();
		    				$("#province1").css({border:"1px solid #cccccc"});
		    			}
		    			if($("#city1").val() == -1){
		    				$("#city1").parent().find("span").html("请选择市");
		    				$("#city1").parent().find("span").show();
		    				$("#city1").parent().find("span").css("display","block");
		    				$("#city1").parent().find("span").css({border:"1px solid #FA9494"});
		    			}else{
		    				$("#city1").parent().find("span").html("") ;
		    				$("#city1").parent().find("span").hide();
		    				$("#city1").css({border:"1px solid #cccccc"});
		    			}
		    		}
		    		})
				}
			});	
	
		});
			});
			
		});
	});
	

});