define(function(require,exports,modlue){
	require('jquery');
	
	//获取当前类别
	var arcType = $(".arcList").attr("data-val");
	//文章列表
	$.ajax({
		url:"/article/list.html?nid="+arcType,
		type:"post",
		dataType:"json",
		success:function(data){
			/*for(i=0;i<data.data.list.length;i++){
				
				alert(data.data.list[i].addTime);
			}*/
			
			require.async('/plugins/handlebars-v1.3.0/handlebars-v1.3.0',function(){
				require.async('/plugins/handlebars-v1.3.0/transFormatJson',function(){
					var tpl = require('/themes/theme_default/media/tpl/faquestions.tpl');//载入tpl模板
					var template = Handlebars.compile(tpl);
					var html = template(data);
					
					$(".c_question_answer").html(html);
					$(".c_comm_question").height($(".c_questions").height()+"px");
					$(".c_comm_question").css({minHeight:"600px"});
					$(".c_question_list").toggle(function(){
							$(".c_answer_list").slideUp("fast",function(){$(".c_comm_question").height($(".c_questions").height()+"px");});
							$(".c_question_list span").css({backgroundPosition:"0 0"});
							$(this).next().slideDown("fast",function(){$(".c_comm_question").height($(".c_questions").height()+"px");});
							$(this).children("span").css({backgroundPosition:"0 -20px"});
						},function(){
							$(this).next().slideUp("fast",function(){$(".c_comm_question").height($(".c_questions").height()+"px");});
							$(this).children("span").css({backgroundPosition:"0 0"});
						})
				});
			});
			//分页插件
			if(data.data.page.pages > 0)
			{
				require.async(['/plugins/pager/pager.css','/plugins/pager/pager'],function(){
					kkpager.generPageHtml({
							pno : data.data.page.currentPage,//当前页码
							total : data.data.page.pages,//总页码
							totalRecords : data.data.page.total,//总数据条数
							isShowFirstPageBtn	: false, 
							isShowLastPageBtn	: false, 
							isShowTotalPage 	: false, 
							isShowTotalRecords 	: false, 
							isGoPage 			: false,
							lang:{
								prePageText				: '上一页',
								nextPageText			: '下一页'
							},
							mode:'click',//click模式匹配getHref 和 click
							click:function(n,total,totalRecords){
					        	$.ajax({
					        		type:"get",
					        		url:"/article/list.html?nid="+arcType+"&page="+n,
					        		dataType:"json",//这个必不可少，如果缺少，导致传回来的不是json格式
					        		success:function(json){
					        			require.async(['/plugins/handlebars-v1.3.0/handlebars-v1.3.0.js','/plugins/handlebars-v1.3.0/transFormatJson'],function(){
											var tpl = require('/themes/theme_default/media/tpl/faquestions.tpl');
											var template = Handlebars.compile(tpl);
											var html    = template(json);
											$(".c_question_answer").html(html);
											$(".c_comm_question").height($(".c_questions").height()+"px");
											$(".c_comm_question").css({minHeight:"600px"});
											$(".c_question_list").toggle(function(){
													$(".c_answer_list").slideUp("fast",function(){$(".c_comm_question").height($(".c_questions").height()+"px");});
													$(".c_question_list span").css({backgroundPosition:"0 0"});
													$(this).next().slideDown("fast",function(){$(".c_comm_question").height($(".c_questions").height()+"px");});
													$(this).children("span").css({backgroundPosition:"0 -20px"});
												},function(){
													$(this).next().slideUp("fast",function(){$(".c_comm_question").height($(".c_questions").height()+"px");});
													$(this).children("span").css({backgroundPosition:"0 0"});
												})
										});
					        		}
					        	});
								this.selectPage(n); //处理完后可以手动条用selectPage进行页码选中切换
							}
					});
				});
				
					
				
			}else{
				$("#kkpager").html('暂无数据');
			}
			
		}
		
	});

});
