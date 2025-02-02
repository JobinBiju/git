define(function(require,exports,module){
  require('jquery');
  require('formatterFunction');
  require('alertNew');
  
  //异步请求标的数据
  $.ajax({
    type:"get",
    url:"/invest/borrowDetail.html"+window.location.search,
    dataType:"json",
    success:function(json){
      $("#loading_tip").slideUp();
      require.async("/plugins/handlebars-v1.3.0/handlebars-v1.3.0",function(){
          require.async("/plugins/handlebars-v1.3.0/transFormatJson",function(){
            $("#invest-main-box").html(Handlebars.compile(require("../../tpl/invest/detail.tpl"))(json));
            $(".c_flow_step li").click(function(){
        		var index=$(this).index(".c_flow_step li");
        		$(this).addClass("c_flow_this").siblings().removeClass("c_flow_this");
        		$(".c_step_detail dd").eq(index).show().siblings().hide();
        	});
        	$(".c_risk_list li").click(function(){
        		var index=$(this).index(".c_risk_list li");
        		$(this).addClass("c_risk_this").siblings().removeClass("c_risk_this");
        		$(".c_risk_guarantee").eq(index).show().siblings().hide();
        	});
        	
        	// JSDP-206  wcw 2015-07-02 start
        	if($(".c_fund_report").html()!=null){
        		$(".riskguarantee").click(function(){
	        		$.ajax({
	        			type:"get",
	        			url:"/article/list.html?nid=riskMoney",
	        			dataType:"json",
	        			success:function(json){
		        			$(".c_fund_report").html(Handlebars.compile(require("../../tpl/invest/risk_guarantee.tpl"))(json));
		        			
		        			$(".c_fund_report dl dd").click(function(){
		        				var index=$(this).index(".c_fund_report dl dd");
		        				//alert(index);
		        				// 将原数据清除，避免重复
		        				$(".riskPic li").remove();
		        				
		        				$(".c_risk_bj").show();
		        				$(".c_report_detail").eq(index).show().siblings().hide();
		        				//alert($(this).parent().attr("data-id"));
		        				
		        				var dataId = $(this).attr("data-id");
		        				// 开始查询图片数据
		            				$.ajax({
		            					type : "post",
		            					url : "/article/riskDetailPic.html?id="+dataId,
		            					data : {
		            						id : dataId
		            					},
		            					// 请求成功后的回调函数有两个参数
		            					success : function(data) {
		            						var obj = eval(data);
		            						var adminurl = $("#adminurl").val();
		            						for(var i=0;i<obj.length;i++){
		            							//$(".riskPic").append("<li class='picdata' style='z-index:10'><img src='http://localhost:8081"+obj[i].picUrl+"' title='"+obj[i].title+"'></li>");
		            							$(".riskPic").append("<li class='picdata' style='z-index:10'><img src='"+adminurl+obj[i].picUrl+"' title='"+obj[i].title+"'></li>");
		            							
		            							// 如果仅一张图片，则不显示左右方向
		            							if(obj.length <= 1){
		            								$(".c_risk_left").hide();
		            								$(".c_risk_right").hide();
		            							}else{
		            								$(".c_risk_left").show();
		            								$(".c_risk_right").show();
		            							}
		            							
		            							// 备注：每条风险保证金至少有一张图片
		            						}
		            						
		            					}
		            				});
		        			})
		        		}
	        		});
	        	});
        	}
        	// JSDP-206  wcw 2015-07-02 end
            //JSDP-131 gjh 2015-5-22 start
        	//2015.4.7
        	//table 奇偶数行颜色
        	var line=$(".c_cliam_tender table tr");
        	for (var i=0; i<line.length; i++){
        	   line[i].style.background=(i%2==1) ? "#e1e4e9" : "#FFFFFF"; 
        	}
        	//资金托管弹窗
        	$(window).resize(function(){
        		$(".c_risk_bj").height($("body").height());
        		$(".c_report_detail").css({left:($(window).width()-$(".c_report_detail").outerWidth())/2+"px",top:($(window).height()-$(".c_report_detail").outerHeight())/2+"px"});
        	})
        	$(window).resize();
        	$(".c_risk_close").click(function(){
        		$(".c_risk_bj").hide();
        		$(".c_report_detail").hide();
        	})
        	$(".c_fund_report dd").click(function(){
        		var index=$(this).index(".c_fund_report dd");
        		$(".c_risk_bj").show();
        		$(".c_report_detail").eq(index).show().siblings().hide();
        	})
        	//托管报告左右滑动
        	$(".c_risk_right").click(function(){
        		var c_pop_list=$(this).siblings("ul");
        		if (!(c_pop_list.is(":animated"))) {
        			if(c_pop_list.position().left<=-(c_pop_list.find("li").outerWidth())*(c_pop_list.find("li").length-1)){
        			}else{
        				c_pop_list.animate({left:c_pop_list.position().left-(c_pop_list.find("li").outerWidth())+"px"},600);
        			}
        		}
        	})
        	$(".c_risk_left").click(function(){
        		var c_pop_list=$(this).siblings("ul");
        		if (!(c_pop_list.is(":animated"))) {
        			if(c_pop_list.position().left>=0){
        			}else{
        				c_pop_list.animate({left:c_pop_list.position().left+(c_pop_list.find("li").outerWidth())+"px"},600);
        			}
        		}
        	})
        	
            //解决IE下不支持placeholder
        	require.async('common1',function(){
        		if($.browser.msie) { 
        			$(":input[placeholder]").each(function(){
        				$(this).placeholder({posL: 15});
        			});
        		}
        	});
        	function refreshPrize(id,type_val){
        		var box = $(id);
        		var ruleId = json.ruleAward.id;
        		var ruleUrl = "";
        		if(type_val ==1 )
        		{
        			ruleUrl = "/scoreAward/getAwardList.html?id="+ruleId+"&randID="+ escape(new Date());
        		}
        		else if(type_val ==2 ){
        			ruleUrl = "/scoreAward/getAwardList.html?id="+ruleId+"&randID="+ escape(new Date())+"&level=level";
        		}
        		else if(type_val ==3 ){
        			ruleUrl = "/scoreAward/getMyAwardList.html?id="+ruleId+"&randID="+ escape(new Date());
        		}
        		var str="";
        		$.ajax({
        			url:ruleUrl,
        			error:function(){
        				
        			},
        			success:function(data){
        				var prize = data.data;
        				var len = prize.length;
        				var newDate = new Date();
        				for( var i = 0 ; i<len ; i++)
        				{
        					var date = prize[i].time.split("&")[0];
        					var time = prize[i].time.split("&")[1];
        					str+="<li id='test"+i+"'><dl><dd><p>"+date+"</p><p class='pmiaos'>"+time+"</p></dd><dd>"+prize[i].userName+ "</dd><dd class='blue-lidds'>"+prize[i].award+"</dd></dl></li>";						
        				}
        				box.html(str);
        				var num = 0;
        				// ul1 li的克隆实现无缝轮转   左侧轮转
        				// 轮转函数  左侧轮转
        				function move() {
        					num = num - 55;
        					if (num > -($(".y_details_con2right .y_details_con2rightscroll ul li").length-10)*55) {
        						//Topss++;
        						//$(".y_details_con2rightscroll ul li").css({display:"none"});
        						//box.find("li").eq(0).css({display:"blak"});
        						//$(li).addClass('selected').siblings().removeClass('selected');
        						//$("#test0").attr({style:"display:none;"});
        						//li.animate({marginLeft:300,opacity:0},1000);
        						//$(".y_details_con2rightscroll ul li").animate({left:300,opacity:0},500);
        						$(".y_details_con2right .y_details_con2rightscroll ul").animate({
        							marginTop: num
        						}, 1000);
        					} else {
        				     $(".y_details_con2right .y_details_con2rightscroll ul").animate({
        				         marginTop: num
        				     }, 1000, function() {
        				         num = 0;
        				         $(".y_details_con2right .y_details_con2rightscroll ul").css({
        				             marginTop: 0
        				        	});
        				    	});
        				 	}
        				};
        				var st=setInterval(move,3000);
        			}	
        		})	
        		
        	}	
        	//JSDBET-799 wcw 2015-3-9 start
        	if(json.ruleAward != undefined){
        		refreshPrize($(".y_details_con2right .y_details_con2rightscroll ul"),1);
        	}
        	//JSDBET-799 wcw 2015-3-9 end
        	//最新广告条的读取
        	$.ajax({
        		url:"/index/newestAd.html?nid=borrowAd",
        		type:"post",
        		success:function(result){
        			if(result.data.length!=0){
        				 var imageUrl = result.data[0].picPath;
        				 $(".y_details_con2right").find("img").before("<a  target='_blank' href='" + result.data[0].content + "'><img style='margin-top:22px;' width='280' src='"+ imageUrl +"'/></a>") ;
        			}
        	    },
        		error:function(){
        			location.reload();
        		}
        	
        	});
        	$(".fengdetail").click(function(){
        		var len = $(".y_details_con2leftTitle li").length-3 ;
        		$(".y_details_con2leftTitle li").removeClass("y_details_clicksli") ;
        		$(".y_details_con2leftTitle li").eq(len).addClass("y_details_clicksli") ;
        		$(".y_detailscon2leftcon").hide();
        		$(".y_detailscon2leftcon").eq(len).show();
        	}) ;
        	//协议弹窗
        	$(".protocolPreview").click(function(){
        		require.async("/plugins/layer-v1.8.4/layer.min",function(){
        			$.layer({
        			    type: 2,
        			    shade: [0],
        			    title : "协议预览",
        			    border : [10 , 0.3 , '#000', true],
        			    iframe: {src : 'iframe.html'},
        			    area: ['1000px' , '500px'],
        			    iframe: {src: '/invest/protocolPreview.html?id='+$("#bid_id").val()}
        			}); 
        		})
        	});
        	// 图片放大
        	$(".y_parlex_top").hover(function(){
				$(this).find("img").stop();
				$(this).find("img").animate({width:"120%",height:"120%",left:"-10%",top:"-10%"},600);
			},function(){
				$(this).find("img").stop();
				$(this).find("img").animate({width:"100%",height:"100%",left:"0",top:"0"},600);
			});
        	// end
        	var  lowestAccount = json.borrow.lowestAccount;
			var  mostAccount = json.borrow.mostAccount;
        	$(".y_detailsinputs").keyup(function(){
        		if(parseInt($(".y_detailsinputs").val())<lowestAccount ||($(".y_detailsinputs").val()=="")){
        			  $('.reminderss').css('height',"28px");
        			$(".reminderss").show().html("最低投资金额"+lowestAccount+"元");
        		}else if(parseInt($(".y_detailsinputs").val())%100!=0){
        			  $('.reminderss').css('height',"28px");
        			$(".reminderss").show().html("投资金额必须为100的整数倍");
        		}else if(mostAccount!=0){
        			if(parseInt($(".y_detailsinputs").val())>mostAccount){
        				  $('.reminderss').css('height',"28px");
        			$(".reminderss").show().html("最高投资金额"+mostAccount+"元");
        		    }
        		}else if(parseInt($(".y_detailsinputs").val())>json.borrow.account){
        			  $('.reminderss').css('height',"28px");
        			$(".reminderss").show().html("投资金额不能超过标总金额");
        		}else{
        			$.ajax({
        				type:"get",
        				url:"/invest/getInv.html?money="+$(".y_detailsinputs").val()+"&id="+$("#bid_id").val(),
        				dataType:"json",
        				success:function(data){
        					if(data.isMach){
        						  $('.reminderss').css('height',"28px");
        						$(".reminderss").show().html("本次最多还能投："+data.maxAcc+"元");
        						$("#money").val(data.maxAcc);
        						$(".y_money_inv").find("span").html(data.inv);
        					}else{
        						$(".y_money_inv").find("span").html(data.inv);
        					}
        				}
        			}) ;
        			$(".reminderss").hide().html("");
        		}
        	})
        	if($(".y_detailsinputs").val()!=null){
        		$.ajax({
    				type:"get",
    				url:"/invest/getInv.html?money="+$(".y_detailsinputs").val()+"&id="+$("#bid_id").val(),
    				dataType:"json",
    				success:function(data){
    					if(data.isMach){
    						  $('.reminderss').css('height',"28px");
    						$(".reminderss").show().html("本次最多还能投："+data.maxAcc+"元");
    						$("#money").val(data.maxAcc);
    						$(".y_money_inv").find("span").html(data.inv);
    					}else{
    						$(".y_money_inv").find("span").html(data.inv);
    					}
    				}
	    	}) ;
        	}
        	$(".y_pluss").click(function(){
        		if (parseInt($(".y_detailsinputs").val())<mostAccount || mostAccount == 0) {
	        		$(".y_detailsinputs").val(parseInt($(".y_detailsinputs").val())+100);
	        		$.ajax({
	    				type:"get",
	    				url:"/invest/getInv.html?money="+$(".y_detailsinputs").val()+"&id="+$("#bid_id").val(),
	    				dataType:"json",
	    				success:function(data){
	    					if(data.isMach){
	    						  $('.reminderss').css('height',"28px");
	    						$(".reminderss").show().html("本次最多还能投："+data.maxAcc+"元");
	    						$("#money").val(data.maxAcc);
	    						$(".y_money_inv").find("span").html(data.inv);
	    					}else{
	    						$(".y_money_inv").find("span").html(data.inv);
	    					}
	    				}
	    			}) ;
	    			$(".reminderss").hide().html("");
        		}
        	})
        	$(".y_subtracts").click(function(){
        		if (parseInt($(".y_detailsinputs").val())>100) {
        			$(".y_detailsinputs").val(parseInt($(".y_detailsinputs").val())-100);
        			$.ajax({
        				type:"get",
        				url:"/invest/getInv.html?money="+$(".y_detailsinputs").val()+"&id="+$("#bid_id").val(),
        				dataType:"json",
        				success:function(data){
        					if(data.isMach){
        						  $('.reminderss').css('height',"28px");
        						$(".reminderss").show().html("本次最多还能投："+data.maxAcc+"元");
        						$("#money").val(data.maxAcc);
        						$(".y_money_inv").find("span").html(data.inv);
        					}else{
        						$(".y_money_inv").find("span").html(data.inv);
        					}
        				}
        			}) ;
        			$(".reminderss").hide().html("");
        		};
        	})
        	$(".y_detailsinputs").blur(function(){
        		if($(".y_detailsinputs").val()==""){
        			  $('.reminderss').css('height',"28px");
        			$(".reminderss").show().html("最低投资金额"+lowestAccount+"元");
        		}else if($(".reminderss").css("display")=="none"){
        			$(".reminderss").hide().html("");
        		}
        	})
        	//alert($(".y_details_registerps span").html());
//        	$(".y_details_registerps span").html(moneyFormat($(".y_details_registerps span").html()));
        	//$(".y_details_registerps span").html(($(".y_details_registerps span").html()).split(".")[0] + "." + ($(".y_details_registerps span").html()).split(".")[1].substring(0,2));
        	
        	$(".y_details_con2leftTitle li").click(function(){
        				 var index=$(this).index(".y_details_con2leftTitle li");
        		$(".y_details_con2leftTitle li").removeClass("y_details_clicksli");
        		$(this).addClass("y_details_clicksli");
        		$(".y_detailscon2leftcon").css("display","none");
        		$($(".y_detailscon2leftcon")[index]).css("display","block");
        	})
        	$(".y_informationDetailsul li").click(function(){
        		var index=$(this).index(".y_informationDetailsul li");
        		$(".y_informationDetailsul li").removeClass("informationliclick");
        		$(this).addClass("informationliclick");
        		if (!($($(".y_sliderin ul")[index]).hasClass("showuls"))) {
        			$(".y_sliderin ul").css("left","0");
        		};
        		$(".y_sliderin ul").removeClass("showuls");
        		$($(".y_sliderin ul")[index]).addClass("showuls");

        	})
        	$(".y_assessmentdls dd .hintems").hover(function(){
        		$(this).parent(".y_assessmentdlstitle").parent("dd").find(".y_tooltips").show();
        	},function(){
        		$(this).parent(".y_assessmentdlstitle").parent("dd").find(".y_tooltips").hide();
        	})
		    $(".y_sliderpre").click(function(){
			    if($(".y_sliderin ul.showuls").position().left<0){
			        if (!($(".y_sliderin ul.showuls").is(":animated"))) {
			            $(".y_sliderin ul.showuls").animate({left:$(".y_sliderin ul.showuls").position().left+$(".y_sliderin ul.showuls li").width()+12+"px"},600);
			        }
			    }
		    })
		    $(".y_slidernext").click(function(){
			    if($(".y_sliderin ul.showuls").position().left>-(($(".y_sliderin ul.showuls li").width()+12)*($(".y_sliderin ul.showuls li").length-3))){
			        if (!($(".y_sliderin ul.showuls").is(":animated"))) {
			            $(".y_sliderin ul.showuls").animate({left:$(".y_sliderin ul.showuls").position().left-$(".y_sliderin ul.showuls li").width()-12+"px"},600);
			        }
			    }
		   })
    		//  标进度那个圈圈特效
    		require.async("jquery.circliful.min",function(){
    			$('.myStat4').circliful();
    			/*$('#banner').flexslider({
    				animation: "slide",
    				direction:"horizontal",
    				easing:"swing"
    			});*/
    		});
        	$(".y_details_con1leftul2 li .hintems").hover(function(){
    			$(this).parent("li").find(".y_tooltips").show();
    		},function(){
    			$(this).parent("li").find(".y_tooltips").hide();
    		})
        	//倒计时处理
			var interval = 1000; 
        	window.setInterval(function(){
				//var s = $(".y_countDownNew") ;
				for(var i=0 ;i<20;i++){
					var nowDate = new Date();
					var endDate = (json.endDate - nowDate);
		    		if(endDate>=0){
						var leftsecond = parseInt(endDate/1000); 
						//var day1=parseInt(leftsecond/(24*60*60*6)); 
						var day1=Math.floor(leftsecond/(60*60*24)); 
						var hour=Math.floor((leftsecond-day1*24*60*60)/3600); 
						var minute=Math.floor((leftsecond-day1*24*60*60-hour*3600)/60); 
						var second=Math.floor(leftsecond-day1*24*60*60-hour*3600-minute*60); 
						//var cc = document.getElementsByClassName(divname); 
						//cc.innerHTML=hour+"小时"+minute+"分"+second+"秒"; 
						$(".y_details_con1leftul2 .y_tooltips").html("剩余："+day1+"天"+hour+"小时"+minute+"分"+second+"秒" + "<i></i>");
						if(hour==0 && minute==0 && second==0){
							//$(divname).eq(i).parent().hide();
							//$(divname).eq(i).parent().next().show();
						}
					}
				}
			}, interval) ;
        	
			window.setInterval(function(){
				var s = $(".y_countDownNew") ;
				for(var i=0 ;i<s.length;i++){
					var fixedTime = s.eq(i).attr("data") ;
					fixedTime = fixedTime.replace(/-/g,"/");
					var divname = ".y_countDownNew" ;
					var endDate= new Date(fixedTime);
					
					var now = new Date(); 
					var leftTime= endDate.getTime()-now.getTime();
					
					if(leftTime>=0){
						$(divname).eq(i).parent().show();
						$(divname).eq(i).parent().next().hide();
						var leftsecond = parseInt(leftTime/1000); 
						//var day1=parseInt(leftsecond/(24*60*60*6)); 
						var day1=Math.floor(leftsecond/(60*60*24)); 
						var hour=Math.floor((leftsecond-day1*24*60*60)/3600); 
						var minute=Math.floor((leftsecond-day1*24*60*60-hour*3600)/60); 
						var second=Math.floor(leftsecond-day1*24*60*60-hour*3600-minute*60); 
						//var cc = document.getElementsByClassName(divname); 
						//cc.innerHTML=hour+"小时"+minute+"分"+second+"秒"; 
						$(divname).eq(i).html(day1+"天"+hour+"小时"+minute+"分"+second+"秒");
						if(hour==0 && minute==0 && second==0){
							$(divname).eq(i).parent().hide();
							$(divname).eq(i).parent().next().show();
						}
					}else{
						$(divname).eq(i).parent().hide();
						$(divname).eq(i).parent().next().show();
					}
				}
			}, interval) ;
    		//  隐藏提交弹出框
    		$(".calculatorCpmBox1 h1 img").click(function(){
    			$(".calculatorCpmBox1").hide();
    			$(".calculatorCpmBottom").hide();
    		})
    		//投标功能是否冻结
    		if(json.tenderFreeze==1){	
    			 $(".y_detailsinputs").attr('disabled',true);
    			 $(".y_details_logas").attr('disabled',true);
    			 $(".y_details_logas").css('background','#ddd	');
    			 $('.reminderss').css('height',"50px");
    			 $(".reminderss").show().html('投标功能已经被后台管理员锁定！请联系客服！');
    		}else{
    		$("#isAllUseTend").click(function(){
    			 var isAccCheck = $("#isAllUseTend").attr("checked") ;
            	 var acc = json.account.interestUsable + json.account.awardUsable +  json.account.rechargeUsable +  json.account.returnCapitalUsable ;
	             if(isAccCheck=="checked"){  // 全投
	            	if(acc < json.borrow.lowestAccount){ // 余额不够最小投资额
	            		  $('.reminderss').css('height',"28px");
	            		  $(".reminderss").show().html('余额小于最小投资额');
	            	}else if(acc > json.borrow.mostAccount){ // 余额大于最大投资
	            		  if(acc > json.accountWait){  // 余额大于最大此标可投
	            			  $('.reminderss').css('height',"28px");
	            			  $(".reminderss").show().html('余额大于最大可投金额，已自动投满');
	            			  $("#money").val(json.accountWait) ;
		            }else if(acc <= json.accountWait){  // 余额小于 最大此标可投
		            	  $('.reminderss').css('height',"28px");
		            		  $(".reminderss").show().html('余额取整后全部投入');
		            		  var uu=Math.floor(acc/100)
		            		  $("#money").val(uu*100) ;
		            	  }
	            	}else{
	            		  if(acc > json.accountWait){  // 余额大于最大此标可投
	            			  $('.reminderss').css('height',"28px");
	            			  $(".reminderss").show().html('余额大于最大可投金额，已自动投满');
	            			  $("#money").val(json.accountWait) ;
		            	  }else if(acc < json.accountWait){  // 余额小于 最大此标可投
		            		  $('.reminderss').css('height',"28px");
		            		  $(".reminderss").show().html('余额全部投入');
		            		  $("#money").val(acc) ;
		            	  }
	            	  }
	              }else{
	            	  $("#money").val(500) ;
	              }
	             if(parseInt($(".y_detailsinputs").val())<lowestAccount ||($(".y_detailsinputs").val()=="")){
       			  $('.reminderss').css('height',"28px");
       			$(".reminderss").show().html("最低投资金额"+lowestAccount+"元");
       		}else if(parseInt($(".y_detailsinputs").val())%100!=0){
       			  $('.reminderss').css('height',"28px");
       			$(".reminderss").show().html("投资金额必须为100的整数倍");
       		}else if(mostAccount!=0){
       			if(parseInt($(".y_detailsinputs").val())>mostAccount){
       				  $('.reminderss').css('height',"28px");
       			$(".reminderss").show().html("最高投资金额"+mostAccount+"元");
       		    }
       		}else if(parseInt($(".y_detailsinputs").val())>json.borrow.account){
       			  $('.reminderss').css('height',"28px");
       			$(".reminderss").show().html("投资金额不能超过标总金额");
       		}else{
       			$.ajax({
       				type:"get",
       				url:"/invest/getInv.html?money="+$(".y_detailsinputs").val()+"&id="+$("#bid_id").val(),
       				dataType:"json",
       				success:function(data){
       					if(data.isMach){
       						  $('.reminderss').css('height',"28px");
       						$(".reminderss").show().html("本次最多还能投："+data.maxAcc+"元");
       						$("#money").val(data.maxAcc);
       						$(".y_money_inv").find("span").html(data.inv);
       					}else{
       						$(".y_money_inv").find("span").html(data.inv);
       					}
       				}
       			}) ;
       			$(".reminderss").hide().html("");
       		}
    		});
            //标投资校验
            $(".y_details_logas").click(function(){
            	$(".change_true").show();
            	$("#moneypurses").attr("checked",false);
            	if(parseInt(json.userInvestIdentify.realNameStatus) == "82") {
            		  $('.reminderss').css('height',"28px");
	            	  $(".reminderss").show().html('为了保证您的安全，请<a href="/member/security/realNameIdentify.html" target="_blank">开通第三方账户</a>再进行投资!');
	            	  return false;
                } else if($("#money").val() == "" || $("#money").val() == 0) {
                	  $('.reminderss').css('height',"28px");
            	  $(".reminderss").show().html('请输入投资金额');
            	  return false;
                }
            	
            	if(parseInt($(".y_detailsinputs").val())<lowestAccount||($(".y_detailsinputs").val()=="")){
            		  $('.reminderss').css('height',"28px");
            		$(".reminderss").show().html("最低投资金额"+lowestAccount+"元");
        			return false;
        		}else if(parseInt($(".y_detailsinputs").val())%100!=0){
        			  $('.reminderss').css('height',"28px");
        			$(".reminderss").show().html("投资金额必须为100的整数倍");
        			return false;
        		}else if(mostAccount!=0){
        			if(parseInt($(".y_detailsinputs").val())>mostAccount){
        				  $('.reminderss').css('height',"28px");
            			$(".reminderss").show().html("最高投资金额"+mostAccount+"元");
            		    }
            	}else if(parseInt($(".y_detailsinputs").val())>json.borrow.account){
            		  $('.reminderss').css('height',"28px");
        			$(".reminderss").show().html("投资金额不能超过标总金额");
        			return false;
        		}else{
        			$.ajax({
        				type:"get",
        				url:"/invest/getInv.html?money="+$(".y_detailsinputs").val()+"&id="+$("#bid_id").val(),
        				dataType:"json",
        				success:function(data){
        					if(data.isMach){
        						  $('.reminderss').css('height',"28px");
        						$(".reminderss").show().html("本次最多还能投："+data.maxAcc+"元");
        						$("#money").val(data.maxAcc);
        						$(".y_money_inv").find("span").html(data.inv);
        					}else{
        						$(".y_money_inv").find("span").html(data.inv);
        					}
        				}
        			}) ;
        			$(".reminderss").hide().html("");
        		}
	            
	             //借款金额 json.borrow.account
	             //可投金额 json.accountWait
	             //账户余额 json.account.useMoney
	             //投资金额 invest_money
	             //最小投标 json.borrow.lowestAccount
	             //最大投标 json.borrow.mostAccount
	             var isAccCheck = $("#isAllUseTend").attr("checked") ;
            	 var acc = json.account.interestUsable + json.account.awardUsable +  json.account.rechargeUsable +  json.account.returnCapitalUsable ;
	             if(isAccCheck=="checked"){  // 全投
	            	  if(acc < json.borrow.lowestAccount){ // 余额不够最小投资额
	            		  $('.reminderss').css('height',"28px");
	            		  $(".reminderss").show().html('余额小于最小投资额');
	            	  }else if(acc > json.borrow.mostAccount){ // 余额大于最大投资
	            		  if(acc > json.accountWait){  // 余额大于最大此标可投
	            			  $('.reminderss').css('height',"28px");
	            			  $(".reminderss").show().html('余额大于最大可投金额，已自动投满');
	            			  $("#money").val(json.accountWait) ;
		            }else if(acc <= json.accountWait){  // 余额小于 最大此标可投
		            	  $('.reminderss').css('height',"28px");
		            		  $(".reminderss").show().html('余额取整后全部投入');
		            		  var uu=Math.floor(acc/100)
		            		  $("#money").val(uu*100) ;
		            	  }
	            	  }else{
	            		  if(acc > json.accountWait){  // 余额大于最大此标可投
	            			  $('.reminderss').css('height',"28px");
	            			  $(".reminderss").show().html('余额大于最大可投金额，已自动投满');
	            			  $("#money").val(json.accountWait) ;
		            	  }else if(acc < json.accountWait){  // 余额小于 最大此标可投
		            		  $('.reminderss').css('height',"28px");
		            		  $(".reminderss").show().html('余额全部投入');
		            		  $("#money").val(acc) ;
		            	  }
	            	  }
	              }
	             var invest_money = parseInt($("#money").val());
	              if(parseInt(json.accountWait) > parseInt(json.borrow.lowestAccount)){
	                  if(invest_money < parseInt(json.borrow.lowestAccount)){
	                	  $('.reminderss').css('height',"28px");
	                     $(".reminderss").show().html('最小投标金额不能小于'+json.borrow.lowestAccount+'元！');
	                    $("#invest_all").click(function(){
	                      $("#money").val(json.borrow.lowestAccount);
	                    });
	                    return false;
	                  }else if(invest_money > parseInt(json.borrow.mostAccount) && parseInt(json.borrow.mostAccount) != 0){
	                	   $('.reminderss').css('height',"50px");
		                    $(".reminderss").show().html('投资金额不能大于最大投标额度,当前可投'+json.borrow.mostAccount+'元!');
		                    $("#invest_all").click(function(){
		                    	$("#money").val(json.borrow.mostAccount);
		                    });
		                    return false;
	                  }else if(invest_money > parseInt(json.accountWait)){
	                	  $('.reminderss').css('height',"28px");
		                    $(".reminderss").show().html('投资金额不能大于可投金额，可点击全部投满剩余金额!');
		                    $("#invest_all").click(function(){
		                        $("#money").val(json.accountWait);
		                    });
		                    return false;
	                  }
	                  if(invest_money > parseInt(json.accountWait)) {
	                	  $('.reminderss').css('height',"28px");
	                	  	$(".reminderss").show().html('投资金额不能大于可投金额，可点击全部投满!');
		                    $("#invest_all").click(function(){
		                        $("#money").val(json.accountWait);
		                    });
	                  }else if(invest_money > parseInt((json.account.interestUsable+json.account.awardUsable+json.account.rechargeUsable+json.account.returnCapitalUsable))){
	                	  $('.reminderss').css('height',"28px");
	                	  $(".reminderss").show().html('账户余额不足，请<a href="/member/recharge/newRecharge.html" style="color: #3CAEE2;">立即充值</a>!');
	                  } else{
		                    if($(".form-group input[type='password']").hasClass("isDirectional")){
			                      if($(".isDirectional").val() == '')
			                      {
			                    	  $('.reminderss').css('height',"28px");
			                         $(".reminderss").show().html('请输入定向密码');
			                        return false;
			                      }
		                    }
		                    var money = $("#money").val();
		        			$.ajax({   // 去获取能够使用的红包
		        				type:"get",
		        				url:"/invest/getUsableRPMD.html?money="+money+"&borrowTimeType="+json.borrow.borrowTimeType+"&timeLimit="+json.borrow.timeLimit,
		        				dataType:"json",
		        				success:function(data){
		        					if(data.result){
		        						$(".calculatorCpmBottom").show() ;
					        			$(".calculatorCpmBox1").show();
					        			$(".y_moneypaycpm").html($("#money").val());
					        			$(".mdaClass").html(data.mdAccount) ;
						      			$("#remoney").val($("#money").val()) ;
						      			//JSDP-228 fengguoqin  2015.07.23  start
						      			$(".srPackClass").html(data.srAccount);//可使用静态红包数量
						      			$("#srAccountUse").attr({checked:"checked"});
						      			//JSDP-228 fengguoqin  2015.07.23  end
						      			//投标时默认选择使用红包  gjh 2015-6-8 start
						      			$("#moneypurses").attr({checked:"checked"});
						      			var money = $("#money").val() ;
										var md = $(".mdaClass").html();
										//JSDP-228 fengguoqin  2015.07.23  start
										$(".y_moneypaycpm").html((money-md-data.srAccount));
										//JSDP-228 fengguoqin  2015.07.23  end
										//投标时默认选择使用红包  gjh 2015-6-8 end
										
					        			$(window).resize(function() {
					        	  			$(".calculatorCpmBox1").css({left:($(window).width()-660)/2+"px",top:($(window).height()-330)/2+"px"});
					        	  			$(".calculatorCpmBottom").css({height:$(window).height()+"px"});
					        			});
					        			$(window).resize();
		        					}
		        				}
		        			})
	                  }
	              }else if(parseInt((json.account.interestUsable+json.account.awardUsable+json.account.rechargeUsable+json.account.returnCapitalUsable)) < parseInt(json.accountWait)){ //账户余额小于可投金额
	            	  $('.reminderss').css('height',"28px");
	            	  $(".reminderss").show().html('账户余额不足，请<a href="/member/recharge/newRecharge.html" style="color: #3CAEE2;" >立即充值</a>!');
	            	  return false ;
	              }else if(invest_money != parseInt(json.accountWait)){
	            	  $('.reminderss').css('height',"28px");
	            	  	$(".reminderss").show().html('由于当前可投金额小于最小投标额度，只能全部投满!');
	                    $("#invest_all").click(function(){
	                    	$("#money").val(json.accountWait);
	                    });
	              }else{
	            	  var money = $("#money").val();
	        			$.ajax({   // 去获取能够使用的红包
	        				type:"get",
	        				url:"/invest/getUsableRPMD.html?money="+money+"&borrowTimeType="+json.borrow.borrowTimeType+"&timeLimit="+json.borrow.timeLimit,
	        				dataType:"json",
	        				success:function(data){
	        					if(data.result){
	        						$(".calculatorCpmBox1").show();
	        						$(".calculatorCpmBottom").show() ;  // 弹出框框
				        			$(".y_moneypaycpm").html($("#money").val());
				        			$(".rpaClass").html(data.rpAccount) ;
				        			$(".mdaClass").html(data.mdAccount) ;
					      			$("#remoney").val($("#money").val()) ;
					      			//JSDP-228 fengguoqin  2015.07.23  start
					      			$(".srPackClass").html(data.srAccount);//可使用静态红包数量
					      			$("#srAccountUse").attr({checked:"checked"});
					      			//JSDP-228 fengguoqin  2015.07.23  end
					      			//投标时默认选择使用红包  gjh 2015-6-8 start
					      			$("#moneypurses").attr({checked:"checked"});
					      			var money = $("#money").val() ;
									var md = $(".mdaClass").html();
									//JSDP-228 fengguoqin  2015.07.23  start
									$(".y_moneypaycpm").html((money-md-data.srAccount));
									//JSDP-228 fengguoqin  2015.07.23  end
									//投标时默认选择使用红包  gjh 2015-6-8 end
									
				        			$(window).resize(function() {   // 
				        	  			$(".calculatorCpmBox1").css({left:($(window).width()-660)/2+"px",top:($(window).height()-330)/2+"px"});
				        	  			$(".calculatorCpmBottom").css({height:$(window).height()+"px"});
				        			});
				        			$(window).resize();
	        					}
	        				}
	        			})
	              }
            });
          }
    		// 添加点击事件  选择红包事件
			$("#moneypurses").click(function(){
			//JSDP-228 fengguoqin  2015.07.23  start
				var money = $("#money").val() ;
				var md = $(".mdaClass").html();
				var srPackClass = $(".srPackClass").html();
				if($(this).attr("checked")=="checked"){
					if($("#srAccountUse").attr("checked")=="checked"){
						$(".y_moneypaycpm").html(money-md-srPackClass);	
					}else{
						$(".y_moneypaycpm").html(money-md);	
					}
				}else{
					if($("#srAccountUse").attr("checked")=="checked"){
						$(".y_moneypaycpm").html(money-srPackClass);	
					}else{
						$(".y_moneypaycpm").html(money);	
					}
				}
			});
			//添加点击事件，选择静态红包
			$("#srAccountUse").click(function(){
				var money = $("#money").val() ;
				var md = $(".mdaClass").html();
				var srPackClass = $(".srPackClass").html();
				if($(this).attr("checked")=="checked"){
					if($("#moneypurses").attr("checked")=="checked"){
						$(".y_moneypaycpm").html(money-md-srPackClass);	
					}else{
						$(".y_moneypaycpm").html(money-srPackClass);	
					}
				}else{
					if($("#moneypurses").attr("checked")=="checked"){
						$(".y_moneypaycpm").html(money-md);	
					}else{
						$(".y_moneypaycpm").html(money);	
					}
				}
			});
			//JSDP-228 fengguoqin  2015.07.23  end
			 $(".change_true").click(function(){
				 $(this).hide();
				 var paypwd = $("#paypwd").val();
				 if(paypwd!="" && paypwd!="noset"){
					
					 // 提交前 验证交易密码
					 $.ajax({
						type:"post",
						url:"/invest/checkPayPwd.html",
						dataType:"json",
						data:{paypwd:paypwd},
						success:function(data){
							
							if(data.result){
								$(".pay_cpmerror").eq(1).hide() ;
								$(".pay_cpmerror").eq(1).html("") ;
							// 判断是否定向标，秘密是否正确
						
								if($("#isDirectional").val()=="true"){
									var pwd = $("#pwd").val() ;
									var bid = $("#bid_id").val() ;
									if(pwd==""){
										$(".pay_cpmerror1").show();
										$(".pay_cpmerror1").html("定向密码不能为空");
									}else{
										
										$.ajax({
											type:"post",
											url:"/invest/checkRpwd.html",
											dataType:"json",
											data:{bid:bid,pwd:pwd},
											success:function(data){
												
												$(".pay_cpmerror1").hide();
												$(".pay_cpmerror1").html("");
												if(data.result){
													
													$(".calculatorCpmBox1").hide();
													$(".calculatorCpmBottom").hide();
													alertNew("<div style='margin:0 100px;'>" +
															"<img width=18 src='../../../themes/theme_default/images/loading.gif'/> " +
															"&nbsp;正在处理请稍候</div>","提示",function(){},false);
													
													$(".pay_cpmerror").eq(1).hide() ;
													$(".pay_cpmerror1").hide() ;
													require.async('jquery.form',function(){
														
									    				$("#invest_detail_form1").ajaxSubmit(function(data){
									    					
									    					if(data.result==null){
									    						// 没有返回数据，后台报异常
									    						/*$(".pay_cpmerror").eq(1).show() ;
									    						$(".pay_cpmerror").eq(1).html("投标失败，，请联系管理员。") ;
									    						$(".change_true").show();*/
									    						//alertNew("投标失败，请联系管理员。","提示",function(){window.location.reload();},true);
									    						alertNew("投标失败，请联系管理员。","提示",function(){window.location.reload();},true);
									    					}else{
										    					if(data.result){
									    							$(".calculatorCpmBox1").hide();
									    							$(".calculatorCpmBottom").hide();
									    							$("#paypwd").val("");
									    							$("#pwd").val("");
									    							
									    							//setTimeout(returnResult(),5000);
									    							//JSDBET-832 gjh 2015-3-23 start
									    							/*alertNew("<div style='margin:0 100px;'>" +
									    									"<img width=18 src='../../../themes/theme_default/images/loading.gif'/> " +
									    									"&nbsp;正在处理请稍候</div>","提示",function(){},false);*/
									    							var falg = false;
									    							var time = 0;
									    							var t=setInterval(function () {
									    								if(falg == false){
									    									returnResult();
									    								}
									    								time = time + 1;
									    								if(time == 30){
									    									alertNew("请求超时，请稍后再试","提示",function(){window.location.reload();},true);
									    								}
									    							},1000)
									    							//JSDBET-832 gjh 2015-3-23 end
									    							//alert(data.msg);
									    							//window.location.reload();
										    					}else{
										    						/*$(".pay_cpmerror").eq(1).show() ;
										    						$(".pay_cpmerror").eq(1).html(data.msg) ;
										    						$(".change_true").show();*/
										    						//alertNew(data.msg,"提示",function(){window.location.reload();},true);
										    						alertNew(data.msg,"提示",function(){window.location.reload();},true);
										    					}
									    					}
										    			});
									    			});
												}else{
													$(".pay_cpmerror1").show();
													$(".pay_cpmerror1").html(data.msg) ;
													$(".change_true").show();
												}
											}
										}) ;
									}
								}else{
								
									$(".pay_cpmerror").eq(1).hide() ;
									$(".calculatorCpmBox1").hide();
									$(".calculatorCpmBottom").hide();
	    							alertNew("<div style='margin:0 100px;'>" +
	    									"<img width=18 src='../../../themes/theme_default/images/loading.gif'/> " +
	    									"&nbsp;正在处理请稍候</div>","提示",function(){},false);
	    							//alerts("投标提示","<div style='margin:0 104px;'><img width=18 src='../../../themes/theme_default/images/loading.gif'/>&nbsp;正在处理请稍候</div>","360","180",true);
									require.async('jquery.form',function(){
										
					    				$("#invest_detail_form1").ajaxSubmit(function(data){
					    					if(data.result==null){
					    						// 没有返回数据，后台报异常
					    						/*$(".pay_cpmerror").eq(1).show() ;
					    						$(".pay_cpmerror").eq(1).html("投标失败，可能被冻结投标，请联系管理员。") ;
					    						$(".change_true").show();*/
					    						//alertNew(data.msg,"提示",function(){window.location.reload();},true);
					    						alertNew(data.msg,"提示",function(){window.location.reload();},true);
					    					}else{
					    						if(data.result){
					    							$(".calculatorCpmBox1").hide();
					    							$(".calculatorCpmBottom").hide();
					    							$("#paypwd").val("");
					    							$("#pwd").val("");
					    							
					    							//setTimeout(returnResult(),5000);
					    							//JSDBET-832 gjh 2015-3-23 start
					    							//alert(flag);
					    							//alertNew(""+flag,"提示",function(){},false);
					    							var flag = false;
					    							var time = 0;
					    							var t=setInterval(function () {
					    								if(flag == false){
					    									flag = returnResult();
					    								}
					    								time = time + 1;
					    								if(time == 30){
					    									alertNew("请求超时，请稍后再试","提示",function(){window.location.reload();},true);
					    								}
					    							},1000)
					    							//returnResult();
					    							//JSDBET-832 gjh 2015-3-23 end
					    							//alert(data.msg) ;
						    					}else{
						    						/*$(".pay_cpmerror").eq(1).show("") ;
						    						$(".pay_cpmerror").eq(1).html(data.msg) ;
						    						$(".change_true").show();*/
						    						//alert(333);
						    						//alertNews(data.msg,"提示",function(){window.location.reload();},true);
						    						alertNew(data.msg_data,"提示",function(){window.location.reload();},true);
						    					}
					    					}
						    			});
					    			});
									
								}
								
							}else{
								$(".pay_cpmerror").eq(1).show() ;
								$(".pay_cpmerror").eq(1).html("交易密码错误!") ;
								$(".change_true").show();
							}
							
						}
					})
				 }else if(paypwd == "noset"){
					 $(".pay_cpmerror").eq(1).show() ;
					 $(".pay_cpmerror").eq(1).html("请设置交易密码!") ;
				 }else{
					 $(".pay_cpmerror").eq(1).show() ;
					 $(".pay_cpmerror").eq(1).html("请输入交易密码!") ;
					 //JSDP-23 gjh 2015-4-16 start
					 $(".change_true").show();
					 //JSDP-23 gjh 2015-4-16 end
				 }
				
	         })
            //fancybox图片展示
            require.async(["/plugins/fancybox/jquery.fancybox.css","/plugins/fancybox/jquery.fancybox.pack"],function(){
              $(".objectImg").attr("rel","gallery").fancybox({
                openEffect    : 'fade',
                prevEffect    : 'fade',
                nextEffect    : 'fade'
              });
              $(".fileImg").attr("rel","gallery").fancybox({
                openEffect    : 'fade',
                prevEffect    : 'fade',
                nextEffect    : 'fade'
              });
            });
            //借款详情图片展示
            require.async("/plugins/jquery.SuperSlide.2.1.1/jquery.SuperSlide.2.1.1",function(){
                $(".album").slide( { mainCell:".img-box",titCell:".hd li",effect:"fade",titOnClassName:"active",autoPlay:"false",trigger:"mouseover",easing:"swing",delayTime:500,mouseOverStop:true,pnLoop:true});
            });
            //借款详情fancybox图片展示
            require.async(["/plugins/fancybox/jquery.fancybox.css","/plugins/fancybox/jquery.fancybox.pack"],function(){
              $(".fancybox").attr("rel","gallery").fancybox({
                openEffect    : 'fade',
                prevEffect    : 'fade',
                nextEffect    : 'fade'
              });
            }); 
         // JSDP-206  wcw 2015-07-02 start  投标记录
            $(".y_details_con2leftTitle .tenderlist").click(function(){
    			//投标记录分页显示
    			  $.ajax({
    		          type:"get",
    		          url:"/invest/detailTenderForJson.html?page=1&id="+$("#bid_id").val(),
    		          dataType:"json",
    		          success:function(json){
    				      if(json.data.page.pages > 0) {
    				    	$('.investRecord').html(Handlebars.compile(require("../../tpl/invest/invest_record.tpl"))(json));
    				        require.async(['/plugins/pager/tenderpager.css','/plugins/pager/tenderpager'],function(){
    				        	tenderkkpager.generPageHtml({
    				        	  pagerid : 'tenderkkpager', //divID
    				              pno : json.data.page.currentPage,//当前页码
    				              total : json.data.page.pages,//总页码
    				              totalRecords : json.data.page.total,//总数据条数
    				              isShowFirstPageBtn  : false, 
    				              isShowLastPageBtn : false, 
    				              isShowTotalPage   : false, 
    				              isShowTotalRecords  : false, 
    				              isGoPage      : false,
    				              lang:{
    				                prePageText       : '上一页',
    				                nextPageText      : '下一页'
    				              },
    				              mode:'click',
    				              click:function(n){
    				                    $.ajax({
    				                      type:"get",
    				                      url:"/invest/detailTenderForJson.html?page="+n+"&id="+$("#bid_id").val(),
    				                      dataType:"json",
    				                      success:function(json){
    				                          $('.investRecord').html(Handlebars.compile(require("../../tpl/invest/invest_record.tpl"))(json));
    				                          var num = 0;
    				                          $(".order").each(function(){
    				                            num = num+1;
    				                            $(this).html((n-1)*10+num);
    				                          })
    				                      }
    				                    });
    				                this.selectPage(n); //处理完后可以手动条用selectPage进行页码选中切换
    				              }
    				          });
    				        });
    				      }
    		          }
    		  });
	        });
         // JSDP-206  wcw 2015-07-02 end
         // JSDP-206  wcw 2015-07-02 start    还款计划
            $(".y_details_con2leftTitle .repaylist").click(function(){
	    		$.ajax({
	                type:"get",
	                url:"/invest/detailRepayForJson.html?page=1&id="+$("#bid_id").val(),
	                dataType:"json",
	                success:function(json){
				          if(json.repment.page.pages > 0) {
	                            $('.invet_repayment').html(Handlebars.compile(require("../../tpl/invest/invest_repayment.tpl"))(json));
					            require.async(['/plugins/pager/creditpager.css','/plugins/pager/pager'],function(){
					            	kkpager.generPageHtml({
					            	  pagerid : 'repaymentkkpager', //divID
					                  pno : json.repment.page.currentPage,//当前页码
					                  total : json.repment.page.pages,//总页码
					                  totalRecords : json.repment.page.total,//总数据条数
					                  isShowFirstPageBtn  : false, 
					                  isShowLastPageBtn : false, 
					                  isShowTotalPage   : false, 
					                  isShowTotalRecords  : false, 
					                  isGoPage      : false,
					                  lang:{
					                    prePageText       : '上一页',
					                    nextPageText      : '下一页'
					                  },
					                  mode:'click',
					                  click:function(n){
				                      $.ajax({
				                        type:"get",
				                        url:"/invest/detailRepayForJson.html?page="+n+"&id="+$("#bid_id").val(),
				                        dataType:"json",
				                        success:function(json){
				                            $('.invet_repayment').html(Handlebars.compile(require("../../tpl/invest/invest_repayment.tpl"))(json));
				                            var num = 0;
				                            $(".order").each(function(){
				                              num = num+1;
				                              $(this).html((n-1)*10+num);
				                            })
				                        }
				                      });
					                    this.selectPage(n); //处理完后可以手动条用selectPage进行页码选中切换
					                  }
					              });
					            });
					          }
				          }
	    		});
    		});
         // JSDP-206  wcw 2015-07-02 end
          })
      })
    }
  });
  
  
  var falg = false;
  function returnResult(){
		var resultFlag=$("#resultFlag").val();
		if(falg == false){
		 $.getJSON("/public/ymd/getResult.html", {
				resultFlag : resultFlag
			}, function(data) {
				if(data.msg_data!=null){
					//alert(data.msg_data);
					//fnShowReturn($("input[type='submit']"),data.msg_data);
					falg =  true;
					if(data.msg_data=="投标成功"){
						alertNew(data.msg_data,"提示",function(){window.location.reload();},true);
						//window.location.reload();
					}else{
						alertNew(data.msg_data,"提示",function(){window.location.reload();},true);
						//fnShowReturn($("input[type='submit']"),data.msg_data);
						//alertNew(data.msg_data,"提示",function(){window.location.reload();},true);
						//alert(data.msg_data);
						//window.location.reload();
						/*$(".pay_cpmerror").eq(1).show() ;
						$(".pay_cpmerror").eq(1).html(data.msg_data) ;*/
					}
				}else{
					//setTimeout(returnResult(),5000);
					//JSDBET-832 gjh 2015-3-23 start
					/*var time = 2;
					var t=setInterval(function () {
						if(time == 0){
							returnResult();
						}
						time--;
					},1000);*/
					//JSDBET-832 gjh 2015-3-23 end
				}
			});
		}
		return falg;
	}
  
  function reload(){
	  window.location.reload();
  }
});

          
