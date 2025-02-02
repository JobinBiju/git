
function load(){
	define(function(require,exports,module){
		require('jquery');
		
		
		var validCode=true;//获取验证码状态
		
		//JSDP-223 gjh 2015-7-15 start
		$("#checkPhoneCodeSubmit").click(function(){
			if($("#phoneNo").val()==""){
				alerts("请输入短信验证码","请输入短信验证码",ture);
			}else{
				var getCodeText = "获取短信验证码";
				var time=120;
				if (validCode) {
						getCodeText = "获取短信验证码";
						$.ajax({
							type: "POST",
							url: "/school/sendPhoneCode.html",
							data: "phoneNo=" + $("#phoneNo").val() + "&validCode=" + $("#sendSmsValidCode").val(),
							//data: "userName=" + "gjh123" + "&emom=" + "13643466905",
							success: function(msg){
								if(msg.result == true){
									$(".calculatorCpmBox1").hide();
									$(".calculatorCpmBottom").hide();
									$("#validCode1").val("");
									$("#validCode1").next().find("img").each(function(){$(this).attr("src",'/validimg.html?t=' + Math.random());});
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
		});
		
		//获取手机验证码单击事件
		$("#mobileCode").click(function(){
			if(validCode){
				$(".calculatorCpmBox1").show();
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
		
		// 表单验证及提交
		require.async('/plugins/jquery-validation-1.13.0/jquery.validate.min',function(){
			require.async('/plugins/jquery-validation-1.13.0/additional-methods',function(){
				require.async(['/plugins/poshytip/tip-yellowsimple/tip-yellowsimple.css','/plugins/poshytip/jquery.poshytip.min'],function(){
					$("#phone_form").validate({
					rules:{
						realName:{
							required: true,
							realName: true
						},
						phoneNo:{
							required: true,
							isMobile: true
						},
						mobileCode:{
							required: true
						},
						province:{
							min: 0
						},
						city:{
							min: 0
						},
						school:{
							min: 0
						},
						validCode:{
							required: true
						}
					},
					messages:{
						realName:{
							required: "请输入姓名",
							required: "请输入中文名"
						},
						phoneNo:{
							required: "请输入手机号码",
							isMobile: "请输入正确的手机号码"
						},
						mobileCode:{
							required: "请输入手机验证码"
						},
						province:{
							min: "请选择省"
						},
						city:{
							min: "请选择市"
						},
						school:{
							min: "请选择学校"
						},
						validCode:{
							required: "请选择验证码"
						}
					},
					ignore: ".ignore",
					errorPlacement:function(error,element){
						/*element.poshytip('hide');
							element.attr("title",error.html());
							element.poshytip({
								className: 'tip-yellowsimple',
								showOn: 'none',
								alignTo: 'target',
								alignX: 'right',
								alignY:'center',
								fade:false,
								slide:false,
								offsetX: 5,
								offsetY: 5,
								showTimeout: 100
							});
							element.poshytip('show');*/
						
						if(error.text()==""){
							element.parent().find("p").html("") ;
							element.parent().find("p").hide();
							element.css({border:"1px solid #cccccc"});
						}else{
							element.parent().find("p").html(error.text()) ;
							element.parent().find("p").show();
							element.css({border:"1px solid #FA9494"});
							if(element.attr("name")=='validCode'){
								$("#validCode1").val("");
								$("#validCode1").next().find("img").each(function(){$(this).attr("src",'/validimg.html?t=' + Math.random());});
							}
						}
						
					},
					success:function(element){
						element.poshytip('hide');
					},
					submitHandler:function(form){
						require.async('jquery.form',function(){
							$(form).ajaxSubmit(function(data){
								var resultMsg = data.msg||""; 
								// 引入弹出窗口插件
								require.async(['/plugins/layer-v1.8.4/skin/layer.css','/plugins/layer-v1.8.4/layer.min'],function(){
									if(data.result){ 
										$.layer({
											type: 1,
											closeBtn: false,
											title: false,
											area: ['400px', '110px'],
											shade: [0.5, '#000'],
											border: [10, 0.3, '#ccc'],
											time:2,
											page: {
											html: '<div class="bespeakPop"><h2>谢谢！</h2><p>我们已经收到您发出的申请，会在短时间内给您回复！</p></div>'
										},
										success:function(){
											$("#phone_form")[0].reset();
											var time = 3;
											var t=setInterval(function () {
												time--;
													if (time==0) {
														
														location.reload();
													}
												},1000)
										}
										});	
									}else{
										$("#validCode").val("");
										$("#img").each(function(){$(this).attr("src",'/validimg.html?t=' + Math.random());});
										layer.msg(data.msg, 1, -1);
									}
								});
							}); 
						})
					}  
					});
					
					
				})
			})
		})
		
	})
}
try{
	load();
}catch(e){
	//require('borrowBespeak/bespeak');
	load();
}