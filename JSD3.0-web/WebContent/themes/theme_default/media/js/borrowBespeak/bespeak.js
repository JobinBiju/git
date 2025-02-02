
function load(){
	define(function(require,exports,module){
		require('jquery');
		
		
		// 滚动至在线申请借款
		$(".bespeakNavBdBtn").click(function(){
			$('body,html').animate({scrollTop: $('#bespeakFormBox')[0].offsetTop-50}, 1000);
			return false; 
		});
		
		$(".valicode_img").click(function(){	
			$(this).attr("src",'/validimg.html?t=' + Math.random());		
		});
		
		
		
		//借款金额限制
		$("#money").keyup(function (){
			
			var money = $("#money").val();
			var validMoney = null;
			if(!money.match("^[0-9]{0,10}$")){
				validMoney = money.substr(0,10); 
				$("#money").val(validMoney);
			}
		})
		
		
		//借款期限限制
		$("#limitTime").keyup(function (){
			
			var limitTime = $("#limitTime").val();
			var validlimitTime = null;
			if(!limitTime.match("^[0-9]{0,4}$")){
				validlimitTime = limitTime.substr(0,4); 
				$("#limitTime").val(validlimitTime);
			}
		})
		
		// 表单验证及提交
		require.async('/plugins/jquery-validation-1.13.0/jquery.validate.min',function(){
			require.async('/plugins/jquery-validation-1.13.0/additional-methods',function(){
				require.async(['/plugins/poshytip/tip-yellowsimple/tip-yellowsimple.css','/plugins/poshytip/jquery.poshytip.min'],function(){
					
					$("#bespeakForm").validate({
						rules:{
						companyName:{
						required: true
					},
					name:{
						required: true
					},
					telephone:{
						required: true,
						isMobile: true
					},
					money:{
						required: true,
						number: true
					},
					limitTime:{
						required: true,
						number: true
					},
					borrowUse:{
						required: true	
					},
					province:{
						min: 0
					},
					city:{
						min: 0
					},
					county:{
						min: 0
					},
					validCode:{
						required: true
					}
					},
					messages:{
						companyName:{
						required: "请输入公司名称"
					},
					name:{
						required: "请输入联系人"
					},
					telephone:{
						required: "请输入联系电话",
						isMobile: "手机号码格式错误"
					},
					money:{
						required: "请输入借款金额",
						number  : "请输入正确的借款金额"
					},
					limitTime:{
						required: "请输入借款期限",
						number  : "请输入正确的借款期限"
					},
					borrowUse:{
						required: "请输入借款用途"		
					},
					province:{
						min: "请选择省"
					},
					city:{
						min: "请选择市"
					},
					county:{
						min: "请选择县/区"
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
											$("#bespeakForm")[0].reset();
											var time = 5;
											var t=setInterval(function () {
												time--;
													$("#mobileCode").html(time+"秒后重新获取");
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
					//微商贷
					$("#bespeakForm2").validate({
						rules:{
						companyName:{
						required: true
					},
					name:{
						required: true
					},
					telephone:{
						required: true,
						isMobile: true
					},
					money:{
						required: true,
						number: true
					},
					limitTime:{
						required: true,
						number: true
					},
					borrowUse:{
						required: true	
					},
					province:{
						min: 0
					},
					city:{
						min: 0
					},
					county:{
						min: 0
					},
					validCode:{
						required: true
					}
					},
					messages:{
						companyName:{
						required: "请输入公司名称"
					},
					name:{
						required: "请输入联系人"
					},
					telephone:{
						required: "请输入联系电话",
						isMobile: "手机号码格式错误"
					},
					money:{
						required: "请输入借款金额",
						number  : "请输入正确的借款金额"
					},
					limitTime:{
						required: "请输入借款期限",
						number  : "请输入正确的借款期限"
					},
					borrowUse:{
						required: "请输入借款用途"		
					},
					province:{
						min: "请选择省"
					},
					city:{
						min: "请选择市"
					},
					county:{
						min: "请选择县/区"
					},
					validCode:{
						required: "请选择验证码"
					}
					},
					ignore: ".ignore",
					errorPlacement:function(error,element){
						if(error.text()==""){
							element.parent().find("p").html("") ;
							element.parent().find("p").hide();
							element.css({border:"1px solid #cccccc"});
						}else{
							element.parent().find("p").html(error.text()) ;
							element.parent().find("p").show();
							element.css({border:"1px solid #FA9494"});
							if(element.attr("name")=='validCode'){
								$("#validCode2").val("");
								$("#validCode2").next().find("img").each(function(){$(this).attr("src",'/validimg.html?t=' + Math.random());});
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
											$("#bespeakForm2")[0].reset();
											var time = 5;
											var t=setInterval(function () {
												time--;
													$("#mobileCode").html(time+"秒后重新获取");
													if (time==0) {
														
														location.reload();
													}
												},1000)
										}
										});	
									}else{
										layer.msg(data.msg, 1, -1);
										$("#validCode").val("");
										$("#img").each(function(){$(this).attr("src",'/validimg.html?t=' + Math.random());});
									}
								});
							}); 
						})
					}  
					});
					//车贷宝
					$("#bespeakForm3").validate({
					rules:{
						companyName:{
						required: true
					},
					name:{
						required: true
					},
					telephone:{
						required: true,
						isMobile: true
					},
					money:{
						required: true,
						number: true
					},
					limitTime:{
						required: true,
						number: true
					},
					borrowUse:{
						required: true	
					},
					brandType:{
						required: true	
					},
					originalPrice:{
						required: true,
						number: true
					},
					buyDate:{
						required: true	
					},
					province:{
						min: 0
					},
					city:{
						min: 0
					},
					county:{
						min: 0
					},
					validCode:{
						required: true
					}
					},
					messages:{
						companyName:{
						required: "请输入公司名称"
					},
					name:{
						required: "请输入联系人"
					},
					telephone:{
						required: "请输入联系电话",
						isMobile: "手机号码格式错误"
					},
					money:{
						required: "请输入借款金额",
						number  : "请输入正确的借款金额"
					},
					limitTime:{
						required: "请输入借款期限",
						number  : "请输入正确的借款期限"
					},
					borrowUse:{
						required: "请输入借款用途"		
					},
					brandType:{
						required: "请输入品牌"	
					},
					originalPrice:{
						required: "请输入原购车价",
						number: "请输入正确的原购车价"
					},
					buyDate:{
						required: "请输入购买年月"		
					},
					province:{
						min: "请选择省"
					},
					city:{
						min: "请选择市"
					},
					county:{
						min: "请选择县/区"
					},
					validCode:{
						required: "请选择验证码"
					}
					},
					ignore: ".ignore",
					errorPlacement:function(error,element){
						if(error.text()==""){
							element.parent().find("p").html("") ;
							element.parent().find("p").hide();
							element.css({border:"1px solid #cccccc"});
						}else{
							element.parent().find("p").html(error.text()) ;
							element.parent().find("p").show();
							element.css({border:"1px solid #FA9494"});
							if(element.attr("name")=='validCode'){
								$("#validCode3").val("");
								$("#validCode3").next().find("img").each(function(){$(this).attr("src",'/validimg.html?t=' + Math.random());});
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
											$("#bespeakForm3")[0].reset();
											var time = 5;
											var t=setInterval(function () {
												time--;
													$("#mobileCode").html(time+"秒后重新获取");
													if (time==0) {
														
														location.reload();
													}
												},1000)
										}
										});	
									}else{
										layer.msg(data.msg, 1, -1);
										$("#validCode").val("");
										$("#img").each(function(){$(this).attr("src",'/validimg.html?t=' + Math.random());});
									}
								});
							}); 
						})
					}  
					});
					//分期宝
					$("#bespeakForm4").validate({
						rules:{
						companyName:{
						required: true
					},
					name:{
						required: true
					},
					telephone:{
						required: true,
						isMobile: true
					},
					money:{
						required: true,
						number: true
					},
					limitTime:{
						required: true,
						number: true
					},
					borrowUse:{
						required: true	
					},
					college:{
						required: true	
					},
					major:{
						required: true	
					},
					studentId:{
						required: true,
						number: true
					},
					brandType:{
						required: true	
					},
					stageCycle:{
						required: true	
					},
					province:{
						min: 0
					},
					city:{
						min: 0
					},
					county:{
						min: 0
					},
					validCode:{
						required: true
					}
					},
					messages:{
						companyName:{
						required: "请输入公司名称"
					},
					name:{
						required: "请输入联系人"
					},
					telephone:{
						required: "请输入联系电话",
						isMobile: "手机号码格式错误"
					},
					money:{
						required: "请输入借款金额",
						number  : "请输入正确的借款金额"
					},
					limitTime:{
						required: "请输入借款期限",
						number  : "请输入正确的借款期限"
					},
					borrowUse:{
						required: "请输入借款用途"		
					},
					college:{
						required: "请选择就读大学"	
					},
					major:{
						required: "请选择专业"	
					},
					studentId:{
						required: "请选择学号",
						number: "请输入正确的学号"
					},
					brandType:{
						required: "请选择品牌类型"	
					},
					stageCycle:{
						required: "请选择分期周期"	
					},
					province:{
						min: "请选择省"
					},
					city:{
						min: "请选择市"
					},
					county:{
						min: "请选择县/区"
					},
					validCode:{
						required: "请选择验证码"
					}
					},
					ignore: ".ignore",
					errorPlacement:function(error,element){
						if(error.text()==""){
							element.parent().find("p").html("") ;
							element.parent().find("p").hide();
							element.css({border:"1px solid #cccccc"});
						}else{
							element.parent().find("p").html(error.text()) ;
							element.parent().find("p").show();
							element.css({border:"1px solid #FA9494"});
							if(element.attr("name")=='validCode'){
								$("#validCode4").val("");
								$("#validCode4").next().find("img").each(function(){$(this).attr("src",'/validimg.html?t=' + Math.random());});
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
											$("#bespeakForm4")[0].reset();
											var time = 5;
											var t=setInterval(function () {
												time--;
													$("#mobileCode").html(time+"秒后重新获取");
													if (time==0) {
														
														location.reload();
													}
												},1000)
										}
										});	
									}else{
										layer.msg(data.msg, 1, -1);
										$("#validCode").val("");
										$("#img").each(function(){$(this).attr("src",'/validimg.html?t=' + Math.random());});
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
	alert(111);
	//require('borrowBespeak/bespeak');
	load();
}