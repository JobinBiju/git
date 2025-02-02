
//菜单树-表单增、删、查、改处理方法
$.fn.treeGridOptions = function(){}
//菜单树选中节点id返回
$.fn.treeGridOptions.doNode = function(){  
     var c="";  
     var p="";  
     $(".tree-checkbox1").parent().children('.tree-title').each(function(){  
         c+=$(this).parent().attr('node-id')+",";  
     });  
     $(".tree-checkbox2").parent().children('.tree-title').each(function(){  
           p+=$(this).parent().attr('node-id')+",";  
     });  
     var str=(c+p);  
     str=str.substring(0,str.length-1);  
     return(str);  
}
//菜单树节点选中
$.fn.treeGridOptions.nodeChk = function (treeObj,id){
	    var node = treeObj.tree('find', id);
		if (node) {
		     var isLeaf = treeObj.tree('isLeaf', node.target);
			 if (isLeaf)  treeObj.tree('check', node.target);					 
		}
	} 


//初始化左侧导航栏
function InitLeftMenu() {
	$("#nav").accordion({fit:true,border:false});	
	var selectedPanelname = '';
    $.each(_menus, function(i, n) {
		var menulist ='';
		menulist +='<ul class="navlist">';
        $.each(n.children, function(j, o) {
			menulist += '<li><div ><a ref="'+o.id+'" href="#" rel="' + o.attributes.href + '" ><span class="icon '+o.iconCls+'" >&nbsp;</span><span class="nav">' + o.text + '</span></a></div> ';
			if(o.children && o.children.length>0)
			{
				menulist += '<ul class="third_ul">';
				$.each(o.children,function(k,p){
					menulist += '<li><div><a ref="'+p.id+'" href="#" rel="' + p.attributes.href + '" ><span class="icon '+p.iconCls+'" >&nbsp;</span><span class="nav">' + p.text + '</span></a></div> </li>'
				});
				menulist += '</ul>';
			}

			menulist+='</li>';
        })
		menulist += '</ul>';

		$('#nav').accordion('add', {
            title: n.text,
            content: menulist,
				border:false,
            iconCls: 'icon ' + n.iconCls
        });

		if(i==0)
			selectedPanelname =n.text;

    });
	$('#nav').accordion('select',selectedPanelname);

	$('.navlist li a').click(function(){
		var tabTitle = $(this).children('.nav').text();
		var url = $(this).attr("rel");
		var icon = $(this).find('.icon').attr('class');
		if($(this).parent().siblings().html())
		{
			$('.third_ul').slideUp();
			var ul =$(this).parent().next();
			if(ul.is(":hidden"))
				ul.slideDown();
			else
				ul.slideUp();
		}
		else{
			addTab(tabTitle,url,icon);
			$('.navlist li div').removeClass("selected");
			$(this).parent().addClass("selected");
		}
	}).hover(function(){
		$(this).parent().addClass("hover");
	},function(){
		$(this).parent().removeClass("hover");
	});
}
//数据编辑
$.fn.treeGridOptions.editFun = function (id,title,width,height,url){
		if (id == undefined) {
			var rows = treeGrid.treegrid('getSelections');
			id = rows[0].id;
		} else {
			treeGrid.treegrid('unselectAll').treegrid('uncheckAll');
		}
		parent.$.modalDialog({
			title : title,
			width : width,
			height : height,
			href : url+'?id=' + id,
			buttons : [ {
				text : '确定',
				handler : function() {
					parent.$.modalDialog.openner_treeGrid = treeGrid;//因为添加成功之后，需要刷新这个treeGrid，所以先预定义好
					var f = parent.$.modalDialog.handler.find('#form');
					f.submit();
				}
			} ]
		});
}

//数据添加
$.fn.treeGridOptions.addFun = function(id,title,width,height,url) {
		if (id == undefined) {
			var rows = treeGrid.treegrid('getSelections');
			id = rows[0].id;
		} else {
			treeGrid.treegrid('unselectAll').treegrid('uncheckAll');
		}
		parent.$.modalDialog({
			title : title,
			width : width,
			height : height,
			href : url+'?id='+id,
			buttons : [ {
				text : '添加',
				handler : function() {
					
					parent.$.modalDialog.openner_treeGrid = treeGrid;//因为添加成功之后，需要刷新这个treeGrid，所以先预定义好
					var f = parent.$.modalDialog.handler.find('#form');
					f.submit();
				}
			} ]
		});
}

//提示信息
$.fn.treeGridOptions.tips = function(){
	parent.$.messager.confirm('提示', '请选择条件进行导出！', function(b) {
		
	});
}

//单条数据删除
$.fn.treeGridOptions.deleteFun = function(id,url) {
		if (id == undefined) {//点击右键菜单才会触发这个
			var rows = treeGrid.treegrid('getSelections');
			id = rows[0].id;
		} else {//点击操作里面的删除图标会触发这个
			treeGrid.treegrid('unselectAll').treegrid('uncheckAll');
		}
		parent.$.messager.confirm('询问', '您是否要删除当前记录？', function(b) {
			if (b) {
				var currentUserId = '0';/*当前登录用户的ID*/
				if (currentUserId != id) {
					parent.$.messager.progress({
						title : '提示',
						text : '数据处理中，请稍后....'
					});
					$.post(url, {
						id : id
					}, function(result) {
						if (result.result) {
							parent.$.messager.alert('提示', result.msg, 'info');
							treeGrid.treegrid('reload');
						}else{
							parent.$.messager.alert('提示', result.msg, 'info');
						}
						parent.$.messager.progress('close');
					}, 'JSON');
				} else {
					parent.$.messager.show({
						title : '提示',
						msg : '不可以删除自己！'
					});
				}
			}
		});
	}
//批量数据删除
$.fn.treeGridOptions.batchDeleteFun = function(url) {
		var rows = treeGrid.treegrid('getChecked');
		var ids = [];
		if (rows.length > 0) {
			parent.$.messager.confirm('确认', '您是否要删除当前选中的记录？', function(r) {
				if (r) {
					parent.$.messager.progress({
						title : '提示',
						text : '数据处理中，请稍后....'
					});
					var currentUserId = '0';/*当前登录用户的ID*/
					var flag = false;
					for ( var i = 0; i < rows.length; i++) {
						if (currentUserId != rows[i].id) {
							ids.push(rows[i].id);
						} else {
							flag = true;
						}
					}
					$.getJSON(url, {
						ids : ids.join(',')
					}, function(result) {
						if (result.success) {
							treeGrid.treegrid('load');
							treeGrid.treegrid('uncheckAll').treegrid('unselectAll').treegrid('clearSelections');
						}
						if (flag) {
							parent.$.messager.show({
								title : '提示',
								msg : '不可以删除自己！'
							});
						} else {
							parent.$.messager.alert('提示', result.msg, 'info');
						}
						parent.$.messager.progress('close');
					});
				}
			});
		} else {
			parent.$.messager.show({
				title : '提示',
				msg : '请勾选要删除的记录！'
			});
		}
}

//数据表单提交
$.fn.treeGridOptions.formSubFun = function(formId,url,successMsg,failMsg){
     var successMsg = successMsg||"操作成功!";
	 var failMsg = failMsg||"操作失败!";
     $(formId).form({
            url : url,
            onSubmit : function() {
                parent.$.messager.progress({
                    title : '提示',
                    text : '数据处理中，请稍后....'
                });
                var isValid = $(this).form('validate');
                if (!isValid) {
                    parent.$.messager.progress('close');
                }
                return isValid;
            },
            success : function(result) {
                parent.$.messager.progress('close');
                result = $.parseJSON(result);
                if (result.result) {
                    parent.$.modalDialog.openner_treeGrid.treegrid('reload');
                    parent.$.modalDialog.handler.dialog('close');
                    $.messager.alert('提示', result.msg, 'info');
                }else{
				    $.messager.alert('提示', result.msg, 'warning');
				}
            }
       });
}
/*结束*/
//表格-表单增、删、查、改处理方法
$.fn.dataGridOptions = function(){}
//数据编辑
$.fn.dataGridOptions.editFun = function (id,title,width,height,url,text){
		if(text==null || text == ''){
			text='确定';
		}
		if (id == undefined) {
			var rows = dataGrid.datagrid('getSelections');
			id = rows[0].id;
		} else {
			dataGrid.datagrid('unselectAll').datagrid('uncheckAll');
		}
		if (url.indexOf("?")==-1) {
			url = url+'?id=' + id;
		} else {
			url = url+'&id=' + id;
		}
		parent.$.modalDialog({
			title : title,
			width : width,
			height : height,
			href : url,
			buttons : [ {
				text : text,
				handler : function() {
					parent.$.modalDialog.openner_dataGrid = dataGrid;//因为添加成功之后，需要刷新这个dataGrid，所以先预定义好
					var f = parent.$.modalDialog.handler.find('#form');
					f.submit();
				}
			} ]
		});
}


//充值转账中的初审方法
$.fn.dataGridOptions.editFunTransfer = function (tradeNo,title,width,height,url,text){
	if(text==null || text == ''){
		text='确定';
	}
	if (tradeNo == undefined) {
		var rows = dataGrid.datagrid('getSelections');
		tradeNo = rows[0].tradeNo;
	} else {
		dataGrid.datagrid('unselectAll').datagrid('uncheckAll');
	}
	if (url.indexOf("?")==-1) {
		url = url+'?tradeNo=' + tradeNo;
	} else {
		url = url+'&tradeNo=' + tradeNo;
	}
	parent.$.modalDialog({
		title : title,
		width : width,
		height : height,
		href : url,
		buttons : [ {
			text : text,
			handler : function() {
				parent.$.modalDialog.openner_dataGrid = dataGrid;//因为添加成功之后，需要刷新这个dataGrid，所以先预定义好
				var f = parent.$.modalDialog.handler.find('#form');
				f.submit();
			}
		} ]
	});
}

//JSDP-159 XINGJIA 2015-05-25 START
//转账查询中的对账
$.fn.dataGridOptions.editFunTransfer2 = function (tradeNo,title,width,height,url,text){
	if(text==null || text == ''){
		text='确定';
	}
	if (tradeNo == undefined) {
		var rows = dataGrid.datagrid('getSelections');
		tradeNo = rows[0].tradeNo;
	} else {
		dataGrid.datagrid('unselectAll').datagrid('uncheckAll');
	}
	if (url.indexOf("?")==-1) {
		url = url+'?transferNo=' + tradeNo;
	} else {
		url = url+'&transferNo=' + tradeNo;
	}
	parent.$.modalDialog({
		title : title,
		width : width,
		height : height,
		href : url,
		buttons : [ {
			text : text,
			handler : function() {
				parent.$.modalDialog.openner_dataGrid = dataGrid;//因为添加成功之后，需要刷新这个dataGrid，所以先预定义好
				var f = parent.$.modalDialog.handler.find('#form');
				f.submit();
			}
		} ]
	});
}
//JSDP-159 XINGJIA 2015-05-25 END

//数据查看
$.fn.dataGridOptions.closeFun = function (id,title,width,height,url){
	if (id == undefined) {
		var rows = dataGrid.datagrid('getSelections');
		id = rows[0].id;
	} else {
		dataGrid.datagrid('unselectAll').datagrid('uncheckAll');
	}
	if (url.indexOf("?")==-1) {
		url = url+'?id=' + id;
	} else {
		url = url+'&id=' + id;
	}
	parent.$.modalDialog({
		title : title,
		width : width,
		height : height,
		href : url,
		buttons : [ {
			text : '关闭',
			handler : function() {
				parent.$.modalDialog.handler.dialog('close');
                parent.$.modalDialog.openner_dataGrid.datagrid('reload');
			}
		} ]
	});
}
//数据添加
$.fn.dataGridOptions.addFun = function(id,title,width,height,url) {
		if (id == undefined) {
			var rows = dataGrid.datagrid('getSelections');
			id = rows[0].id;
		} else {
			dataGrid.datagrid('unselectAll').datagrid('uncheckAll');
		}
		if (url.indexOf("?")==-1) {
			url = url+'?id=' + id;
		} else {
			url = url+'&id=' + id;
		}
		parent.$.modalDialog({
			title : title,
			width : width,
			height : height,
			href : url,
			buttons : [ {
				text : '添加',
				handler : function() {
					parent.$.modalDialog.openner_dataGrid = dataGrid;//因为添加成功之后，需要刷新这个dataGrid，所以先预定义好
					var f = parent.$.modalDialog.handler.find('#form');
					f.submit();
				}
			} ]
		});
}


//数据添加
$.fn.dataGridOptions.addFunRechargeTransfer = function(id,title,width,height,url) {

		if (url.indexOf("?")==-1) {
			url = url+'?id=' + id;
		} else {
			url = url+'&id=' + id;
		}
		parent.$.modalDialog({
			title : title,
			width : width,
			height : height,
			href : url,
			buttons : [ {
				text : '添加',
				handler : function() {
					parent.$.modalDialog.openner_dataGrid = dataGrid;//因为添加成功之后，需要刷新这个dataGrid，所以先预定义好
					var f = parent.$.modalDialog.handler.find('#form');
					f.submit();
				}
			} ]
		});
}
//授权管理
$.fn.dataGridOptions.grantFun = function(id,title,width,height,url) {
		dataGrid.datagrid('unselectAll').datagrid('uncheckAll');
		parent.$.modalDialog({
			title : title,
			width : width,
			height : height,
			href : url +"?id="+ id,
			buttons : [ {
				text : '授权',
				handler : function() {
					parent.$.modalDialog.openner_dataGrid = dataGrid;//因为授权成功之后，需要刷新这个dataGrid，所以先预定义好
					var f = parent.$.modalDialog.handler.find('#form');
					f.submit();
				}
			} ]
		});
	}
//审核确认操作
$.fn.dataGridOptions.selectFun = function(id,title,width,height,url) {
    if (id == undefined) {
		  var rows = dataGrid.datagrid('getSelections');
		  id = rows[0].id;
	  }
	  parent.$.modalDialog({
			title : title,
			width : width,
			height : height,
			href : url+'?id='+id
		});
}
$.fn.dataGridOptions.confirmFun = function(id,title,width,height,url) {
      if (id == undefined) {
		  var rows = dataGrid.datagrid('getSelections');
		  id = rows[0].id;
	  }
	  parent.$.modalDialog({
			title : title,
			width : width,
			height : height,
			href : url+'?id='+id,
			buttons : [ {
				text : '确定',
				handler : function() {
					 parent.$.modalDialog.openner_dataGrid = dataGrid;//因为添加成功之后，需要刷新这个dataGrid，所以先预定义好
					 f = parent.$.modalDialog.handler.find('#form');
					 isValid = f.form('validate');
					 if(isValid){
						 top.$.messager.confirm(title,"真的决定了吗?",function(r){
							if(r){
							   f.submit();
							}
						 });
					 }					
				}
			} ]
		});
}
//单条数据删除
$.fn.dataGridOptions.deleteFun = function(id,url,msg) {
        var dfMsg = "您是否要删除当前记录？";
		msg = msg || dfMsg;
		if (id == undefined) {//点击右键菜单才会触发这个
			var rows = dataGrid.datagrid('getSelections');
			id = rows[0].id;
		} else {//点击操作里面的删除图标会触发这个
			dataGrid.datagrid('unselectAll').datagrid('uncheckAll');
		}
		parent.$.messager.confirm('询问', msg, function(b) {
			if (b) {
				var currentUserId = '0';/*当前登录用户的ID*/
				if (currentUserId != id) {
					parent.$.messager.progress({
						title : '提示',
						text : '数据处理中，请稍后....'
					});
					$.post(url, {
						id : id
					}, function(result) {
						parent.$.messager.alert('提示', result.msg, 'info');
						dataGrid.datagrid('reload');						
						parent.$.messager.progress('close');
					}, 'JSON');
				} else {
					parent.$.messager.show({
						title : '提示',
						msg : '不可以删除自己！'
					});
				}
			}
		});
	}

//单条数据删除(操作员客服，风控)
$.fn.dataGridOptions.deleteOptorFun = function(id,url,msg) {
        var dfMsg = "您是否要删除当前记录？删除后用户对应的客服或风控也会删除！";
		msg = msg || dfMsg;
		if (id == undefined) {//点击右键菜单才会触发这个
			var rows = dataGrid.datagrid('getSelections');
			id = rows[0].id;
		} else {//点击操作里面的删除图标会触发这个
			dataGrid.datagrid('unselectAll').datagrid('uncheckAll');
		}
		parent.$.messager.confirm('询问', msg, function(b) {
			if (b) {
				var currentUserId = '0';/*当前登录用户的ID*/
				if (currentUserId != id) {
					parent.$.messager.progress({
						title : '提示',
						text : '数据处理中，请稍后....'
					});
					$.post(url, {
						id : id,
						roleId : 2
					}, function(result) {
						parent.$.messager.alert('提示', result.msg, 'info');
						dataGrid.datagrid('reload');						
						parent.$.messager.progress('close');
					}, 'JSON');
				} else {
					parent.$.messager.show({
						title : '提示',
						msg : '不可以删除自己！'
					});
				}
			}
		});
	}

//确认函数
$.fn.dataGridOptions.sureFun = function(id,url,msg,params) {
        var dfMsg = "您确认了吗？";
		msg = msg || dfMsg;
		if (typeof(params)!="object") params = eval("("+params+")");//转换字符串成对象
		if (id == undefined) {//点击右键菜单才会触发这个
			var rows = dataGrid.datagrid('getSelections');
			id = rows[0].id;
		} else {//点击操作里面的删除图标会触发这个
			dataGrid.datagrid('unselectAll').datagrid('uncheckAll');
		}
		parent.$.messager.confirm('询问', msg, function(b) {
			if (b) {
				if (id) {
					parent.$.messager.progress({
						title : '提示',
						text : '数据处理中，请稍后....'
					});
					$.post(url, {
						id : id
					}, function(result) {
					    if(result.success){
							parent.$.messager.alert('提示', result.msg, 'info');
							dataGrid.datagrid('reload');
						}else{						    
						    parent.$.messager.confirm('提示', result.msg, function(b){
							     if(b){
							        var type = result.reType;
							        dataGrid.datagrid('reload');
							        $.fn.dataGridOptions.addFun(id,params.title[type],params.width,params.height,params.url[type]);
								  }
							})
						}
						parent.$.messager.progress('close');
					}, 'JSON');
				}
			}
		});
	}
//批量数据删除
$.fn.dataGridOptions.batchDeleteFun = function(url) {
		var rows = dataGrid.datagrid('getChecked');
		var ids = [];
		if (rows.length > 0) {
			parent.$.messager.confirm('确认', '您是否要删除当前选中的记录？', function(r) {
				if (r) {
					parent.$.messager.progress({
						title : '提示',
						text : '数据处理中，请稍后....'
					});
					var currentUserId = '0';/*当前登录用户的ID*/
					var flag = false;
					for ( var i = 0; i < rows.length; i++) {
						if (currentUserId != rows[i].id) {
							ids.push(rows[i].id);
						} else {
							flag = true;
						}
					}
					$.getJSON(url, {
						ids : ids.join(',')
					}, function(result) {
						if (result.success) {
							dataGrid.datagrid('load');
							dataGrid.datagrid('uncheckAll').datagrid('unselectAll').datagrid('clearSelections');
						}
						if (flag) {
							parent.$.messager.show({
								title : '提示',
								msg : '不可以删除自己！'
							});
						} else {
							parent.$.messager.alert('提示', result.msg, 'info');
						}
						parent.$.messager.progress('close');
					});
				}
			});
		} else {
			parent.$.messager.show({
				title : '提示',
				msg : '请勾选要删除的记录！'
			});
		}
}
//数据查询
$.fn.dataGridOptions.searchFun = function (formId) {
	dataGrid.datagrid('load', $.serializeObject($(formId)));
}
//JSDP-98 gjh 2015-5-12 start
//账户数据对账数据查询
$.fn.dataGridOptions.compareSearchFun = function (url,username,realname,collectionTotal,compareResult,userType,element) {
	var onclickStr = $(element).attr("onclick");
	$(element).attr("onclick", "");
	$(element).html("对账中...");
	$(element).css({backgroundColor:"#ababab"});
	$.getJSON(url, {
		username:$(username).val(),
		realname:$(realname).val(),
		collectionTotal:$(collectionTotal).val(),
		compareResult:$(compareResult).val(),
		userType:userType
	}, function(data) {
		$(element).css({backgroundColor:"#4b93cf"});
		$(element).attr("onclick", onclickStr);
		$(element).html("对账");
		if (data.result) {
			dataGrid.datagrid('load');
			parent.$.messager.alert('提示', data.msg, 'info');
		}else{
			parent.$.messager.alert('提示', data.msg, 'info');
		}
	});
}
//JSDP-98 gjh 2015-5-12 end
//JSDP-85 gjh 2015-5-7 start
//还款代收对账
$.fn.dataGridOptions.collectionContrastSearchFun = function (url,borrowName,borrowId,investUserName,contractNo,startTime,endTime,registerStartTime,registerEndTime,status,element) {
	var onclickStr = $(element).attr("onclick");
	$(element).attr("onclick", "");
	$(element).html("对账中...");
	$(element).css({backgroundColor:"#ababab"});
	//alert($(element).attr("onclick"));
	$.getJSON(url, {
		borrowName:$(borrowName).val(),
		borrowId:$(borrowId).val(),
		investUserName:$(investUserName).val(),
		contractNo:$(contractNo).val(),
		startTime:$(startTime).val(),
		endTime:$(endTime).val(),
		registerStartTime:$(registerStartTime).val(),
		registerEndTime:$(registerEndTime).val(),
		status:$(status).val()
	}, function(data) {
		$(element).css({backgroundColor:"#4b93cf"});
		$(element).attr("onclick", onclickStr);
		$(element).html("对账");
		if (data.result) {
			dataGrid.datagrid('load');
			parent.$.messager.alert('提示', data.msg, 'info');
		}else{
			parent.$.messager.alert('提示', data.msg, 'info');
		}
	});
}
//还款待还对账
$.fn.dataGridOptions.repaymentContrastSearchFun = function (url,userName,borrowId,startTime,endTime,contractNo,borrowName) {
	$.getJSON(url, {
		username:$(username).val(),
		borrowId:$(borrowId).val(),
		startTime:$(startTime).val(),
		endTime:$(endTime).val(),
		endTime:$(endTime).val(),
		contractNo:$(contractNo).val(),
		borrowName:$(borrowName).val()
	}, function(data) {
		if (data.result) {
			dataGrid.datagrid('load');
			parent.$.messager.alert('提示', data.msg, 'info');
		}else{
			parent.$.messager.alert('提示', data.msg, 'info');
		}
	});
}
//JSDP-85 gjh 2015-5-7 end

//JSDP-98 gjh 2015-5-12 start
//满标复审对账数据查询
$.fn.dataGridOptions.repaireSearchFun = function (id,tradeNo,url,element) {
	var onclickStr = $(element).attr("onclick");
	var srcStr =  $(element).attr("src");
	var titleStr =  $(element).attr("title");
	$(element).attr("onclick", "");
	$(element).attr("src","/themes/theme_default/css/images/extjs_icons/loading_min.gif");
	$(element).attr("title","补单中...");
	//$(element).css({backgroundColor:"#ababab"});
	$.getJSON(url,{
		id:id,
		tradeNo:tradeNo
	}, function(data) {
		//$(element).css({backgroundColor:"#4b93cf"});
		$(element).attr("onclick", onclickStr);
		$(element).attr("src",srcStr);
		$(element).attr("title",titleStr);
//JSDP-98 gjh 2015-5-12 start
		if (data.result) {
			dataGrid.datagrid('load');
			parent.$.messager.alert('提示', data.msg, 'info');
		}else{
			parent.$.messager.alert('提示', data.msg, 'info');
		}
	});
}

//JSDP-98 gjh 2015-5-12 start 
//标对账数据查询
$.fn.dataGridOptions.repaireBorrowSearchFun = function (id,url,element) {
	var onclickStr = $(element).attr("onclick");
	var srcStr =  $(element).attr("src");
	var titleStr =  $(element).attr("title");
	$(element).attr("onclick", "");
	$(element).attr("src","/themes/theme_default/css/images/extjs_icons/loading_min.gif");
	$(element).attr("title","对账中...");
	$.getJSON(url,{
		id:id
	}, function(data) {
		$(element).attr("onclick", onclickStr);
		$(element).attr("src",srcStr);
		$(element).attr("title",titleStr);
		if (data.result) {
			dataGrid.datagrid('load');
			parent.$.messager.alert('提示', data.msg, 'info');
		}else{
			parent.$.messager.alert('提示', data.msg, 'info');
		}
	});
}
//投标记录对账数据查询
$.fn.dataGridOptions.repaireBorrowTenderSearchFun = function (id,url,element) {
	var onclickStr = $(element).attr("onclick");
	$(element).attr("onclick", "");
	$(element).html("对账中...");
	$(element).css({backgroundColor:"#ababab"});
	$.getJSON(url,{
		id:$(id).val()
	}, function(data) {
		$(element).css({backgroundColor:"#4b93cf"});
		$(element).attr("onclick", onclickStr);
		$(element).html("对账");
//JSDP-98 gjh 2015-5-12 end 
		if (data.result) {
			dataGrid.datagrid('load');
			parent.$.messager.alert('提示', data.msg, 'info');
		}else{
			parent.$.messager.alert('提示', data.msg, 'info');
		}
	});
}
//投标记录对账数据查询
$.fn.dataGridOptions.repaireBorrowTenderAllSearchFun = function (userName,borrowType,status,customerUserId,tenderType,borrowId,compareResult,startTime,endTime,url,element) {
	var onclickStr = $(element).attr("onclick");
	$(element).attr("onclick", "");
	$(element).html("对账中...");
	$(element).css({backgroundColor:"#ababab"});
	$.getJSON(url,{
		userName:$(userName).val(),
		borrowType:$(borrowType).val(),
		status:$(status).val(),
		customerUserId:$(customerUserId).val(),
		tenderType:$(tenderType).val(),
		borrowId:$(borrowId).val(),
		compareResult:$(compareResult).val(),
		startTime:$(startTime).val(),
		endTime:$(endTime).val()
	}, function(data) {
		$(element).css({backgroundColor:"#4b93cf"});
		$(element).attr("onclick", onclickStr);
		$(element).html("对账");
//JSDP-98 gjh 2015-5-12 end 
		if (data.result) {
			dataGrid.datagrid('load');
			parent.$.messager.alert('提示', data.msg, 'info');
		}else{
			parent.$.messager.alert('提示', data.msg, 'info');
		}
	});
}

//查询文件清除
$.fn.dataGridOptions.cleanFun = function(formId) {
	$(".type").each(function(){
		$(this).children().eq(0).attr("selected","selected");
	});
	$(".status").each(function(){
		$(this).children().eq(1).attr("selected","selected");
	});
	$(formId+' input').val('');
	
	dataGrid.datagrid('load', {});
}
//清空发标页面
$.fn.dataGridOptions.cleanBorrowFun = function(formId) {
	/*$(".type").each(function(){
		$(this).children().eq(0).attr("selected","selected");
	});
	$(".status").each(function(){
		$(this).children().eq(1).attr("selected","selected");
	});*/
	//$(formId+' input').val('');
	
	// ----添加-----------------
	$(formId+' textarea').val('');
	$(formId+' select').val('1');
	//$(formId+' select').romoveAttr('disabled');
	$(".pulldown").each(function(){
		$(this).children().eq(1).attr("selected","selected");
		$(this).children().eq(1).attr("disabled",false);
	});
	$(".textarea").each(function(){
		$(this).children().eq(1).val('');
	});
	$(".addPic").each(function(){
		$(formId+' .addPic').val('');
		$(this).children().eq(1).val('');
		$(this).children().eq(1).html('');
	});
	/*$("#isDXB").each(function(){
		$(this).children().eq(1).attr("disabled",false);
	});
	$("#isTest").each(function(){
		$(this).children().eq(1).attr("disabled",false);
	});*/
	
	//dataGrid.datagrid('load', {});
}
//数据表单提交
$.fn.dataGridOptions.formSubFun = function(formId,url,successMsg,failMsg){
     var successMsg = successMsg||"操作成功!";
	 var failMsg = failMsg||"操作失败!";
     $(formId).form({
            url : url,
            onSubmit : function() {
            	
            	//后台管理员添加校验
            	//管理员用户名
            	if($('.adminUserName').val() !=undefined){
            		
            		if($('.adminUserName').val().toLowerCase().indexOf("select") >= 0 
            				|| $('.adminUserName').val().toLowerCase().indexOf("update") >= 0  
            				|| $('.adminUserName').val().toLowerCase().indexOf("insert") >= 0  
            				|| $('.adminUserName').val().toLowerCase().indexOf("delete") >= 0
            		){
            			$.messager.alert('提示','输入用户名不合理，请重新输入！', 'info');
            			
            			$('.adminUserName').val("");
            			return false;
            		}
            	}
            	//管理员密码
            	if($('.adminPwd').val() !=undefined){
            		
            		if($('.adminPwd').val().toLowerCase().indexOf("select") >= 0 
            				|| $('.adminPwd').val().toLowerCase().indexOf("update") >= 0  
            				|| $('.adminPwd').val().toLowerCase().indexOf("insert") >= 0  
            				|| $('.adminPwd').val().toLowerCase().indexOf("delete") >= 0
            		){
            			$.messager.alert('提示','输入密码不合理，请重新输入！', 'info');
            			
            			$('.adminPwd').val("");
            			$('.adminPwdTwo').val("");
            			return false;
            		}
            	}
            	
            	
            	
            	//验证省市县的下拉框是否可以为空
            	var province = $('#province').val();
            	var city = $('#city').val();
            	var country = $('#county').val();
            	if(province =="" && province != undefined){
            		$.messager.alert('提示', "省下拉框不能为空", 'warning');
            		return false;
            	}
            	if(city == "" && city != undefined){
            		$.messager.alert('提示', "市下拉框不能为空", 'warning');
            		return false;
            	}
            	if(country == "" && country != undefined){
            		$.messager.alert('提示', "县下拉框不能为空", 'warning');
            		return false;
            	}
            	
            	
            	/*for(var i = 0;i < $(".realPhotosList").length;i++){
            		if($(".realPhotosList").eq(i).children().length == 1)
            			{
	            			$.messager.alert('提示', "至少上传一张实物照", 'warning');
	                    	return false;
            			}
            	}*/
            	
            	/*for(var j = 0;j < $(".filePhotoList").length;j++){
            		if($(".filePhotoList").eq(j).children().length == 1)
            			{
	            			$.messager.alert('提示', "至少上传一张档案照", 'warning');
	                    	return false;
            			}
            	}*/
            	
            	
            	
            	/*if ($("#uploadPiclist2") && $("#uploadPiclist2").children().length == 1) {
            		$.messager.alert('提示', "至少上传一张担保函", 'warning');
            		return false;
            	}
            	*/
                /*if ($("#uploadPiclist3") && $("#uploadPiclist3").children().length == 1) {
                	$.messager.alert('提示', "至少上传一张公司照", 'warning');
                	return false;
                }*/
                
                /*if ($("#uploadPiclist4") && $("#uploadPiclist4").children().length == 1) {
                	$.messager.alert('提示', "至少上传一张身份照", 'warning');
                	return false;
                }*/
                
                /*if($("#uploadPiclist5") && $("#uploadPiclist5").children().length == 1){
                	$.messager.alert('提示', "至少上传一张借款合同", 'warning');
                	return false;
                }*/
                
                if($("#uploadPiclistGoods") && $("#uploadPiclistGoods").children().length == 1){
                	$.messager.alert('提示', "至少上传一张商品图片", 'warning');
                	return false;
                }
                
                if($("#uploadPiclistRiskMoney") && $("#uploadPiclistRiskMoney").children().length == 1){
                	$.messager.alert('提示', "至少上传一张风险备用金图片", 'warning');
                	return false;
                }
                parent.$.messager.progress({
                    title : '提示',
                    text : '数据处理中，请稍后....'
                });				
                var isValid = $(this).form('validate');
                if (!isValid) {
                    parent.$.messager.progress('close');
                }
                return isValid;
            },
            success : function(result) {
                parent.$.messager.progress('close');
                result = $.parseJSON(result);	
                if (result.result) {
                    $.messager.alert('提示', result.msg, 'info');
                    parent.$.modalDialog.handler.dialog('close');
                    parent.$.modalDialog.openner_dataGrid.datagrid('reload');
                    parent.$.modalDialog.openner_dataGrid.datagrid('clearChecked');
                }else{
				    $.messager.alert('提示', result.msg, 'warning');
				}
            }
       });
}
//数据表单提交(用于借款人开户)
$.fn.dataGridOptions.formSubFun2 = function(formId,url,successMsg,failMsg){
     var successMsg = successMsg||"操作成功!";
	 var failMsg = failMsg||"操作失败!";
	 $(formId).form({
	            url : url,
	            onSubmit : function() {
	            	
	            	
	            	//验证省市县的下拉框是否可以为空
	            	/*var province = $('#province').val();
	            	var city = $('#city').val();
	            	var country = $('#county').val();
	            	if(province =="" && province != undefined){
	            		$.messager.alert('提示', "省下拉框不能为空", 'warning');
	            		return false;
	            	}
	            	if(city == "" && city != undefined){
	            		$.messager.alert('提示', "市下拉框不能为空", 'warning');
	            		return false;
	            	}
	            	if(country == "" && country != undefined){
	            		$.messager.alert('提示', "县下拉框不能为空", 'warning');
	            		return false;
	            	}*/
	            	
	                /*if ($("#uploadPiclist3") && $("#uploadPiclist3").children().length == 1) {
	                	$.messager.alert('提示', "至少上传一张公司照", 'warning');
	                	return false;
	                }*/
	                
	                /*if ($("#uploadPiclist4") && $("#uploadPiclist4").children().length == 1) {
	                	$.messager.alert('提示', "至少上传一张身份照", 'warning');
	                	return false;
	                }*/
	               
	                parent.$.messager.progress({
	                    title : '提示',
	                    text : '数据处理中，请稍后....'
	                });				
	                var isValid = $(this).form('validate');
	                if (!isValid) {
	                    parent.$.messager.progress('close');
	                }
	                return isValid;
	            },
	            success : function(result) {
	                parent.$.messager.progress('close');
	                result = $.parseJSON(result);	
	                if (result.result) {
	                    $.messager.alert('提示', result.msg, 'info');
	                    parent.$.modalDialog.handler.dialog('close');
	                    parent.$.modalDialog.openner_dataGrid.datagrid('reload');
	                    parent.$.modalDialog.openner_dataGrid.datagrid('clearChecked');
	                }else{
					    $.messager.alert('提示', result.msg, 'warning');
					}
	            }
	       });
	
}


//JSDP-159 XINGJIA 2015-05-25 START
//数据表单提交
$.fn.dataGridOptions.formSubTransferFun = function(formId,url,successMsg,failMsg){
	var successMsg = successMsg||"操作成功!";
	 var failMsg = failMsg||"操作失败!";
     $(formId).form({
            url : url,
            onSubmit : function() {

                return true;
            },
            success : function(result) {
                parent.$.messager.progress('close');
                result = $.parseJSON(result);	
                if (result.result) {
                    $.messager.alert('提示', result.msg, 'info');
                    parent.$.modalDialog.handler.dialog('close');
                    parent.$.modalDialog.openner_dataGrid.datagrid('reload');
                    parent.$.modalDialog.openner_dataGrid.datagrid('clearChecked');
                }else{
				    $.messager.alert('提示', result.msg, 'warning');
				}
            }
       });
	 
}
//JSDP-159 XINGJIA 2015-05-25 START


//满标复审成功数据表单提交
$.fn.dataGridOptions.fullVerifyFormSubFun = function(formId,url,url2,successMsg,failMsg){
     var successMsg = successMsg||"操作成功!";
	 var failMsg = failMsg||"操作失败!";
     $(formId).form({
            url : url,
            onSubmit : function() {
            	
            	for(var i = 0;i < $(".realPhotosList").length;i++){
            		if($(".realPhotosList").eq(i).children().length == 1)
            			{
	            			$.messager.alert('提示', "至少上传一张实物照", 'warning');
	                    	return false;
            			}
            	}
            	
            	for(var j = 0;j < $(".filePhotoList").length;j++){
            		if($(".filePhotoList").eq(j).children().length == 1)
            			{
	            			$.messager.alert('提示', "至少上传一张档案照", 'warning');
	                    	return false;
            			}
            	}
            	
                if ($("#uploadPiclist3") && $("#uploadPiclist3").children().length == 1) {
                	$.messager.alert('提示', "至少上传一张公司照", 'warning');
                	return false;
                }
                
                if ($("#uploadPiclist4") && $("#uploadPiclist4").children().length == 1) {
                	$.messager.alert('提示', "至少上传一张身份照", 'warning');
                	return false;
                }
                parent.$.messager.progress({
                    title : '提示',
                    text : '数据处理中，请稍后....'
                });				
                var isValid = $(this).form('validate');
                if (!isValid) {
                    parent.$.messager.progress('close');
                }
                return isValid;
            },
            success : function(result) {
                result = $.parseJSON(result);	
                if (result.result) {
                	setTimeout(returnResult(),10000);
                	
                }else{
				    $.messager.alert('提示', result.msg, 'warning');
				}
            }
       });
}
function returnResult(){
	var resultFlag=$("#resultFlag").val();
	$.fn.dataGridOptions.selectSubFun(resultFlag,"/public/ymd/getResult.html");
}

$.fn.dataGridOptions.selectSubFun = function(resultFlag,url){
	$.getJSON("/public/ymd/getResult.html", {
		resultFlag : resultFlag
	}, function(data) {
		if(data.msg_data!=null){
			parent.$.messager.alert('提示', data.msg_data, 'info');		
			parent.$.messager.progress('close');
			parent.$.modalDialog.openner_dataGrid.datagrid('reload');
			parent.$.modalDialog.handler.dialog('close');
		}else{
			setTimeout(returnResult(),5000);
			//parent.$.modalDialog.openner_dataGrid.datagrid('reload');
		}
	});
}
$.fn.dataGridOptions.picFormSubFun = function(formId,url){
    $(formId).form({
           url : url,
           onSubmit : function() {        	   
              /* if ($("#uploadPiclist") && $("#uploadPiclist").children().length == 1) {
	              $.messager.alert('提示', "至少上传一张实物照", 'warning');
	              return false;
	           }
	           if ($("#uploadPiclist1") && $("#uploadPiclist1").children().length == 1) {
	              $.messager.alert('提示', "至少上传一张档案照", 'warning');
	              return false;
	           }*/
           },
           success : function(result) {
               parent.$.messager.progress('close');
               result = $.parseJSON(result);	
               if (result.result) {
               	   $.messager.alert('提示', result.msg, 'info');
                   parent.$.modalDialog.handler.dialog('close');
                   parent.$.modalDialog.openner_dataGrid.datagrid('reload');
               }else{
				    $.messager.alert('提示', result.msg, 'warning');
			   }
           }
      });
}
/*结束*/
/*表格处理*/
//数据表单提交
$.fn.formOptions = function(){};
$.fn.formOptions.viewFunUserSource = function(sourceURL,startTime,endTime,title,width,height,url){
	if (sourceURL == undefined) {//点击右键菜单才会触发这个
		var rows = dataGrid.datagrid('getSelections');
		sourceURL = rows[0].sourceURL;
	 }
	 
	//JSDP-166 xingjia 20150611 start
	var s;
	var p;
	if (url.indexOf("?")==-1) {
		p = sourceURL.replace("?","XINGJIA");
		s = p.replace("&", "JIAJIA");
		url = url+'?sourceURL=' + s ;
	} else {
		p = sourceURL.replace("?","XINGJIA");
		s = p.replace("&", "JIAJIA");
		
		url = url+'&sourceURL=' + s ;
	}
	//JSDP-166 xingjia 20150611 end
	parent.$.modalDialog({
		title : title,
		width : width,
		height : height,
		href : url+'&startTime='+startTime+'&endTime='+endTime
	});
}
$.fn.formOptions.viewFun =  function(id,title,width,height,url){
     if (id == undefined) {//点击右键菜单才会触发这个
		var rows = dataGrid.datagrid('getSelections');
		id = rows[0].id;
	 }
     parent.$.modalDialog({
		title : title,
		width : width,
		height : height,
		href : url+'?id='+id
	});
}
//红包中查看个人的详细记录 JSDP-167 xingjia 2015-05-28 start
 $.fn.formOptions.viewFunRp = function(userName,startTime,endTime,type,title,width,height,url){
	 if (userName == undefined) {//点击右键菜单才会触发这个
			var rows = dataGrid.datagrid('getSelections');
			userName = rows[0].userName;
	}
	if (url.indexOf("?")==-1) {
		url = url+'?userName=' + userName;
	} else {
		url = url+'&userName=' + userName;
	}

	parent.$.modalDialog({
		title : title,
		width : width,
		height : height,
		href : url+'&startTime='+startTime+'&endTime='+endTime+'&type='+type
	});
}

//JSDP-167 xingjia 2015-05-28 end

$.fn.formOptions.viewFunCompair =  function(outTradeNo,title,width,height,url){
    if (outTradeNo == undefined) {//点击右键菜单才会触发这个
		var rows = dataGrid.datagrid('getSelections');
		outTradeNo = rows[0].outTradeNo;
	 }
    parent.$.modalDialog({
		title : title,
		width : width,
		height : height,
		href : url+'?outTradeNo='+outTradeNo
	});
}


$.fn.formOptions.btnSubFun = function(formId,url,successMsg,failMsg){
     var successMsg = successMsg||"操作成功!";
	 var failMsg = failMsg||"操作失败!";	 
     $(formId).form('submit',{
            url : url,
            onSubmit : function() {
                parent.$.messager.progress({
                    title : '提示',
                    text : '数据处理中，请稍后....'
                });				
                var isValid = $(this).form('validate');
                if (!isValid) {
                    parent.$.messager.progress('close');
                }
                return isValid;
            },
            success : function(result) {
                parent.$.messager.progress('close');
                result = $.parseJSON(result);
                if (result.success) {
					$.messager.alert('提示', successMsg, 'info');
                }else{
				    $.messager.alert('提示', failMsg, 'warning');
				}
            }
       });
}

//options控制区块显示、隐藏
$.fn.formOptions.optionsCtl = function(obj){
    var childLab = obj.parent().next(".child-options");
	var type = obj.val();
	    if(type==1){
	      childLab.show();
		  childLab.find("input").addClass("easyui-validatebox validatebox-text");
		}else{
	      childLab.hide();
		  childLab.find("input").removeClass("easyui-validatebox validatebox-text validatebox-invalid");
		}
}
//平滑数据格式转换
$.fn.treeConvert = function(){}
//菜单平滑数据格式转换
$.fn.treeConvert.menu = function(rows){
		function exists(rows, parentId){
			for(var i=0; i<rows.length; i++){
				if (rows[i].id == parentId) return true;
			}
			return false;
		}		
		var nodes = [];
		// 获取顶级菜单
		for(var i=0; i<rows.length; i++){
			var row = rows[i];
			if (!exists(rows, row.parentId)){
				nodes.push({id:row.id,text:row.name,iconCls:row.iconCls,attributes:{href:row.href}});
			}
		}
		var toDo = [];
		for(var i=0; i<nodes.length; i++){
			toDo.push(nodes[i]);
		}
	
		while(toDo.length){
			var node = toDo.shift();	// 父级节点
			// 获取子级节点
			for(var i=0; i<rows.length; i++){
				var row = rows[i];
				if (row.parentId == node.id){
					var child = {id:row.id,text:row.name,iconCls:row.iconCls,attributes:{href:row.href}};					
					if (node.children){
						node.children.push(child);
					} else {
						node.children = [child];
					}					
					toDo.push(child);
				}
			}
		}
		return nodes;
}
//iframe 页面最小宽度设置
$.fn.iframeWidthResize = function(width){
    $("body",parent.document).find('iframe').each(function(i){
	    var thisUrl = window.location.href;
		var frameUrl = $(this).attr('src');
	    if(thisUrl.indexOf(frameUrl)>0||thisUrl == frameUrl){
		   $(this).css({"min-width":width});
		}
	});
}
//文件下载
$.fn.downloadFun = function(id,url){
   if (id == undefined) {
	   var rows = dataGrid.datagrid('getSelections');
	   id = rows[0].id;
   } 
   url = url+"id="+id
   $.ajax({
	  "url": url,
	  "type": "GET",
	  "success": function(data){
		  window.location.href = url;
	  },
	  "error": function(){
		  $.messager.alert("消息提醒：","文件下载失败，请稍候再试！","warning");		
	 }
  });
}
//数据类型转字符串
var typeToStr = function(data,type,status){
   var result = '';
   $.each(data,function(index,item){
	  if(type == parseInt(item.value)&&item.type== status)		   result =  item.name;
   });
   return result;
}
//浏览小图标
var showIcons = function() {
	var dialog =  parent.sy.modalDialog({
			title : '浏览小图标',
			width:520,
			height:398,
			url : '/icons.html',
			buttons : [{
				text : '确定',
				handler : function() {
					dialog.find('iframe').get(0).contentWindow.selectIcon(dialog, $('#iconCls'));
				}
			}]
	});
};

//添加tab页   
function addTab(subtitle,url,icon){
	if(!$('#index_tabs').tabs('exists',subtitle)){
		$('#index_tabs').tabs('add',{
			title:subtitle,
			content:createFrame(url),
			closable:true
			//closable:true,
			//icon:icon
		});
	}else{
		$('#index_tabs').tabs('select',subtitle);
	}
}

function addCollateralPage(id,title,url){
	if(!parent.$('#index_tabs').tabs('exists',title)){
		var url = url+'?id=' + id;
		parent.$('#index_tabs').tabs('add',{
			title:title,
			content:createFrame(url),
			closable:true
		});
	}else{
		parent.$('#index_tabs').tabs('select',title);
		var url = url+'?id=' + id;
		var tab = parent.$('#index_tabs').tabs('getSelected'); 
		parent.$('#index_tabs').tabs('update', {
			tab: tab,
			options: {
				title:title,
				content:createFrame(url),
				closable:true
			}
		});
		tab.panel('refresh');
	}
	
}

//财务管理中的比对tab
function comparisons(id,title,url){
	if(!parent.$('#index_tabs').tabs('exists',title)){
		var url = url+'?id=' + id;
		parent.$('#index_tabs').tabs('add',{
			title:title,
			content:createFrame(url),
			closable:true
		});
	}else{
		parent.$('#index_tabs').tabs('select',title);
		var url = url+'?id=' + id;
		var tab = parent.$('#index_tabs').tabs('getSelected'); 
		parent.$('#index_tabs').tabs('update', {
			tab: tab,
			options: {
				title:title,
				content:createFrame(url),
				closable:true
			}
		});
		tab.panel('refresh');
	}
	
}



function createFrame(url){
	var s = '<iframe allowtransparency="true" scrolling="auto" frameborder="0"  src="'+url+'" style="width:100%;height:100%;"></iframe>';
	return s;
}

//调用方法 addGoodsTab（{title：参数值,url：参数值,iconCls:参数值}）
var addGoodsTab = function(params) {
   	var iframe = '<iframe src="' + params.url + '" frameborder="0" style="border:0;width:100%;height:100%;"></iframe>';
	var t = parent.$('#index_tabs');
	var opts = {
		title : params.title,
		closable : true,
		content : iframe,
		border : false,
		fit : true
	};
	if (t.tabs('exists', opts.title)) {
		t.tabs('select', opts.title);
		parent.$.messager.progress('close');
	} else {
		t.tabs('add', opts);
	}
}
//从grid列表页添加tab页   
var gridAddTab = function(params,id,borrowNo) {
    if(typeof(params)!="object") params = eval("("+params+")");
   	var iframe = '<iframe  allowtransparency="true" src="' + params.url + id+'" frameborder="0" style="border:0;width:100%;height:98%;"></iframe>';
	var t = parent.$('#index_tabs');
	var opts = {
		title : params.title.replace("{$borrowNo}",borrowNo),
		closable : true,
		iconCls : params.iconCls,
		content : iframe,
		border : false,
		fit : true
	};
	if (t.tabs('exists', opts.title)) {
		t.tabs('select', opts.title);
		parent.$.messager.progress('close');
	} else {
		t.tabs('add', opts);
	}
}
//时间戳转换
var getLocalTime = function(value,type) {
    if (value == null || value == '') {
        return '';
    }
	var dt;
	if (value instanceof Date) {
	    dt = value;
	}
	else {
	    dt = new Date(value);
	    if (isNaN(dt)) {
	        value = value.replace(/\/Date\((-?\d+)\)\//, '$1'); //将那个长字符串的日期值转换成正常的JS日期格式
	        dt = new Date();
	        dt.setTime(value);
	    }
	}
	 switch (type){
	 case 1:
		 return dt.format("yyyy年MM月dd日");   //这里用到一个javascript的Date类型的拓展方法
		 break;
	 case 2:
		 return dt.format("yyyy年MM月dd日 hh:mm:ss");   //这里用到一个javascript的Date类型的拓展方法
		 break;
	 case 3:
		 return dt.format("yyyy-MM-dd");   //这里用到一个javascript的Date类型的拓展方法
		 break;
	 case 4:
		 return dt.format("yyyy-MM-dd hh:mm:ss");   //这里用到一个javascript的Date类型的拓展方法
		 break;
	 }

}
// 日期显示的格式化	
Date.prototype.format = function (format) 
{
    var o = {
        "M+": this.getMonth() + 1, //month 
        "d+": this.getDate(),    //day 
        "h+": this.getHours(),   //hour 
        "m+": this.getMinutes(), //minute 
        "s+": this.getSeconds(), //second 
        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter 
        "S": this.getMilliseconds() //millisecond 
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
    (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
      RegExp.$1.length == 1 ? o[k] :
        ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}

/*
 * MAP对象，实现MAP功能
 *
 * 接口：
 * size()     获取MAP元素个数
 * isEmpty()    判断MAP是否为空
 * clear()     删除MAP所有元素
 * put(key, value)   向MAP中增加元素（key, value) 
 * remove(key)    删除指定KEY的元素，成功返回True，失败返回False
 * get(key)    获取指定KEY的元素值VALUE，失败返回NULL
 * element(index)   获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL
 * containsKey(key)  判断MAP中是否含有指定KEY的元素
 * containsValue(value) 判断MAP中是否含有指定VALUE的元素
 * values()    获取MAP中所有VALUE的数组（ARRAY）
 * keys()     获取MAP中所有KEY的数组（ARRAY）
 *
 * 例子：
 * var map = new Map();
 *
 * map.put("key", "value");
 * var val = map.get("key")
 * ……
 *
 */
function Map() {
    this.elements = new Array();

    //获取MAP元素个数
    this.size = function() {
        return this.elements.length;
    };

    //判断MAP是否为空
    this.isEmpty = function() {
        return (this.elements.length < 1);
    };

    //删除MAP所有元素
    this.clear = function() {
        this.elements = new Array();
    };

    //向MAP中增加元素（key, value) 
    this.put = function(_key, _value) {
        this.elements.push( {
            key : _key,
            value : _value
        });
    };

    //删除指定KEY的元素，成功返回True，失败返回False
    this.remove = function(_key) {
        var bln = false;
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].key == _key) {
                    this.elements.splice(i, 1);
                    return true;
                }
            }
        } catch (e) {
            bln = false;
        }
        return bln;
    };

    //获取指定KEY的元素值VALUE，失败返回NULL
    this.get = function(_key) {
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].key == _key) {
                    return this.elements[i].value;
                }
            }
        } catch (e) {
            return null;
        }
    };

    //获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL
    this.element = function(_index) {
        if (_index < 0 || _index >= this.elements.length) {
            return null;
        }
        return this.elements[_index];
    };

    //判断MAP中是否含有指定KEY的元素
    this.containsKey = function(_key) {
        var bln = false;
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].key == _key) {
                    bln = true;
                }
            }
        } catch (e) {
            bln = false;
        }
        return bln;
    };

    //判断MAP中是否含有指定VALUE的元素
    this.containsValue = function(_value) {
        var bln = false;
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].value == _value) {
                    bln = true;
                }
            }
        } catch (e) {
            bln = false;
        }
        return bln;
    };

    //获取MAP中所有VALUE的数组（ARRAY）
    this.values = function() {
        var arr = new Array();
        for (i = 0; i < this.elements.length; i++) {
            arr.push(this.elements[i].value);
        }
        return arr;
    };

    //获取MAP中所有KEY的数组（ARRAY）
    this.keys = function() {
        var arr = new Array();
        for (i = 0; i < this.elements.length; i++) {
            arr.push(this.elements[i].key);
        }
        return arr;
    };
}
//标类型
var borrowType = function(value){
	switch(value){
		case 101:
			return '秒还标';
			break;
		case 102:
			return '信用标';
			break;
		case 103:
			return '抵押标(车贷宝)';
			break;
		case 104:
			return '净值标';
			break;
		case 110:
			return '流转标';
			break;
		case 112:
			return '担保标';
			break;
		case 113:
			return '担保标(能源宝)';
			break;
		default:
			return "";
			break;
	}
}



var returnStatus = function(value){
	switch(value){
		case 1:
			return '回款续投奖励等待审核';
			break;
		case 2:
			return '续投奖励审核成功';
			break;
		case 3:
			return '续投奖励审核失败';
			break;
		case 4:
			return '提现回款使用成功';
			break;
		case 5:
			return '提现回款使用失败';
			break;
		default:
			return "错误状态";
			break;
	}
}

//标类型
var borrowStatus = function(value){
	switch(value){
		case 101:
			return '秒还标';
			break;
		case 102:
			return '信用标';
			break;
		case 103:
			return '抵押标';
			break;
		case 104:
			return '净值标';
			break;
		case 110:
			return '流转标';
			break;
		case 112:
			return '担保标';
			break;
		default:
			return "";
			break;
	}
}
//审核状态
var verifyStatus = function(value){
	switch(value){
		case 0:
			return '待审核';
			break;
		case 1:
			return '审核通过';
			break;
		case 2:
			return '审核未通过';
			break;
		default:
			return "";
			break;
	}
}

//还款方式
var borrowStyle = function(value){
	switch(value){
	case 1:
		return '等额本息';
		break;
	case 2:
		return '一次性还';
		break;
	case 3:
		return '每月付息';
		break;
	default:
		return "未指定的还款方式";
		break;
	}	
};

//会员等级
var vipLevel = function(value){
	switch(value){
	case 1:
		return '普通会员';
		break;
	case 2:
		return '银牌会员';
		break;
	case 3:
		return '金牌会员';
		break;
	case 4:
		return "钻石会员";
		break;
	default:
		return "未指定的会员等级";
		break;
	}	
};

//会员等级
var convertVipLevel = function(value){
	if(value == "N1"){
		return '普通会员';
	}else if(value == "V1"){
		return "铜牌会员";
	}else if(value == "V2"){
			return "银牌会员";
	}else if(value == "V3"){
		return "金牌会员";
	}else if(value == "V4"){
		return "钻石会员";
	}else{
		return "未指定的会员等级";
	}
};

//奖品等级
var awardLevel = function(value){
	switch(value){
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
};

//抽奖类型
var scoreAwardType = function(value){
	switch(value){
	case 1:
		return '按积分抽奖';
		break;
	case 2:
		return '按次数抽奖';
		break;
	case 3:
		return '按倍率抽奖';
		break;
	case 4:
		return '按物品数量抽奖';
		break;
	default:
		return "未指定的抽奖类型";
		break;
	}	
};

//隐藏标题名
var hideTitleName = function(name,hideLength){
	if(name.length > hideLength){
		return name.substring(0,hideLength)+"...";
	}else{
		return name+"";
	}
};


//获取抽奖奖品类型
var getScoreAwardType = function(value,vipLevel,vipValidMonth){
	if (value =="1"){
		return '现金';
	}else if(value =="2"){
		return '积分';
	}else if(value =="4"){
		return '实物奖励';
	}else if(value =="3"){
		if(vipLevel=="V1"){
			return vipValidMonth+"个月的"+"铜牌会员奖励";
		}else if(vipLevel=="V2"){
			return vipValidMonth+"个月的"+"银牌会员奖励";
		}else if(vipLevel=="V3"){
			return vipValidMonth+"个月的"+"金牌会员奖励";
		}else if(vipLevel=="V4"){
			return vipValidMonth+"个月的"+"钻石会员奖励";
		}
	}else if(value=="5"){
		return '静态红包';
	}else if(value=="6"){
		return '购物卡';
	}else if(value=="7"){
		return '投资劵';
	}else{
		return "未指定的奖品类型";
	}
};


//转化奖品类型为VIP的奖品
var getVIPScoreAward = function(vipLevel, vipValidMonth){
	if (vipLevel =="V1"){
		return vipValidMonth+'个月的'+'铜牌会员';
	}else if(vipLevel =="V2"){
		return vipValidMonth+'个月的'+'银牌会员';
	}else if(vipLevel =="V3"){
		return vipValidMonth+'个月的'+'金牌会员';
	}else if(vipLevel =="V4"){
		return vipValidMonth+'个月的'+'钻石会员' ;
	}else{
		return "错误的VIP奖品配置";
	}
};


//获取抽奖奖品属性值
var getScoreAwardValue = function(type, value){
	if(type == 1){
		return value+"元";
	}else if(type == 2){
		return value+"积分";
	}else if(type == 3 || type == 4){
		return "实物和虚拟物品价值";
	}
};

//获取规则返现方式
var getRuleAwardBackType = function(value){
	switch(value){
	case 1:
		return '自动返现';
		break;
	case 2:
		return '人工返现';
		break;
	default:
		return "未指定的返现方式";
		break;
	}	
};

//获取规则中奖提醒
var getRuleAwardMsgType = function(value){
	switch(value){
	case 0:
		return '无提醒';
		break;
	case 1:
		return '站内信';
		break;
	case 2:
		return '短信';
		break;
	case 3:
		return '邮件';
		break;
	default:
		return "未指定的中奖提醒类型";
		break;
	}	
};

//获取债权转让等级
var getCaLevel = function(value){
	switch(value){
	case 1:
		return "普通";
		break;
	case 2:
		return "优质";
		break;
	default:
		return "未指定的债权转让等级";
		break;
	}	
};

//获取债权转让等级，根据债权状态值
var getCaLevelByStatus = function(value,status){
	if(status == "00"){
		return "还未初审";
	}else{
		if(value == 1){
			return "普通";
		}else if(value == 2){
			return "优质";
		}else{
			return "未指定的债权转让等级";
		}	
	}
};

//获取债权转让等级，根据债权状态值
var getCaScales = function(value,status){
	if(status == "00"){
		return "还未初审";
	}else if(status == "02"){
		return "初审未通过";
	}else{
		return parseFloat(value*100).toFixed(2)+"%";
	}	
};

//获取债权转让状态
var getCaStatus = function(value){
	if(value == "00"){
		return "发布";
	}else if(value == "01"){
		return "初审通过";
	}else if(value == "02"){
		return "初审未通过";
	}else if(value == "03"){
		return "复审通过";
	}else if(value == "04"){
		return "复审未通过";
	}else if(value == "05"){
		return "撤回";
	}else if(value == "06"){
		return "待复审";
	}else if(value == "07"){
		return "已完成";
	}else if(value == "08"){
		return "撤销申请中";
	}else{
		return "未指定的债权状态";
	}
};

//获取奖品规则中奖率
var getScoreAwardRate = function(value,basePoint){
	if(basePoint<=1000000000 && value>0){
		return (value/basePoint)+"";
	}
};


//登记标
$.fn.dataGridOptions.registerBorrowFun = function (id,url,openUrl){
	//跳转外部链接处理
	window.open(openUrl+"?id="+id);
	parent.$.messager.confirm('提示', "是否登记成功？", function(b) {
		if (b) {
			parent.$.messager.progress({
				title : '提示',
				text : '数据处理中，请稍后....'
			});
			$.post(url, {
				id : id
			}, function(data) {
				if(data.result){
					parent.$.messager.alert('提示', data.msg, 'info');
					dataGrid.datagrid('reload');						
					parent.$.messager.progress('close');
				}else{
					parent.$.messager.alert('提示',data.msg, 'info');
					dataGrid.datagrid('reload');						
					parent.$.messager.progress('close');
				}
				
			}, 'JSON');
		}
	});
}

//登记标--撤回
//登记标--撤回
$.fn.dataGridOptions.registerCancelBorrowFun = function (id,openUrl){
	window.open(openUrl+"?id="+id);
	parent.$.messager.confirm('提示', "是否撤回成功？", function(b) {
		if (b) {
			dataGrid.datagrid('reload');
		}
	});
}

//登记担保方
$.fn.dataGridOptions.registerGuaranteeFun = function (id,url,openUrl){
	//跳转外部链接处理
	window.open(openUrl+"?id="+id);
	parent.$.messager.confirm('提示', "担保方登记是否成功？", function(b) {
		if (b) {
			parent.$.messager.progress({
				title : '提示',
				text : '数据处理中，请稍后....'
			});
			$.post(url, {
				id : id
			}, function(data) {
				if(data.result){
					parent.$.messager.alert('提示', data.msg, 'info');
					dataGrid.datagrid('reload');						
					parent.$.messager.progress('close');
				}else{
					parent.$.messager.alert('提示',data.msg, 'info');
					dataGrid.datagrid('reload');						
					parent.$.messager.progress('close');
				}
				
			}, 'JSON');
		}
	});
}

//确认发标管理-取消标操作
$.fn.dataGridOptions.cancelBorrowFun = function (id,url){
	parent.$.messager.confirm('提示', "是否取消标操作？", function(b) {
		if (b) {
			parent.$.messager.progress({
				title : '提示',
				text : '数据处理中，请稍后....'
			});
			$.post(url, {
				id : id
			}, function(data) {
				if(data.result){
					parent.$.messager.alert('提示', data.msg, 'info');
					dataGrid.datagrid('reload');						
					parent.$.messager.progress('close');
				}else{
					parent.$.messager.alert('提示',data.msg, 'info');
					dataGrid.datagrid('reload');						
					parent.$.messager.progress('close');
				}
				
			}, 'JSON');
		}
	});
}

//取消定向标密码操作
$.fn.dataGridOptions.CancelBorrowPwdFun = function (id,url){
	parent.$.messager.confirm('提示', "是否取消定向密码？", function(b) {
		if (b) {
			parent.$.messager.progress({
				title : '提示',
				text : '数据处理中，请稍后....'
			});
			$.post(url, {
				id : id
			}, function(data) {
				if(data.result){
					parent.$.messager.alert('提示', data.msg, 'info');
					dataGrid.datagrid('reload');						
					parent.$.messager.progress('close');
				}else{
					parent.$.messager.alert('提示',data.msg, 'info');
					dataGrid.datagrid('reload');						
					parent.$.messager.progress('close');
				}
				
			}, 'JSON');
		}
	});
}


//查看抵押物
$.fn.dataGridOptions.CollateralPageFun = function (id,title,width,height,url){
		if (id == undefined) {
			var rows = dataGrid.datagrid('getSelections');
			id = rows[0].id;
		} else {
			dataGrid.datagrid('unselectAll').datagrid('uncheckAll');
		}
		if (url.indexOf("?")==-1) {
			url = url+'?id=' + id;
		} else {
			url = url+'&id=' + id;
		}
		parent.$.modalDialog({
			title : title,
			width : width,
			height : height,
			href : url,
			buttons : [ {
				text:'关闭',
				handler : function() {
					parent.$.modalDialog.handler.dialog('close');
					parent.$.modalDialog.openner_dataGrid = dataGrid;//因为添加成功之后，需要刷新这个dataGrid，所以先预定义好
					
				}
			} ]
		});
}
//更新资产包
$.fn.dataGridOptions.editPicFun = function (id,title,width,height,url){
		if (url.indexOf("?")==-1) {
			url = url+'?ids=' + id;
		} else {
			url = url+'&ids=' + id;
		}
		parent.$('#getMortgagePicPage').dialog({
			title : title,
			width : width,
			height : height,
			href : url,
			buttons : [{
				text : '确定',
				handler : function() {
					$('#form').form({    
					    url:'/modules/loan/borrow/updateBorrowCollateral.html',        
					    success:function(data){
					    	data = $.parseJSON(data);
					    	if (data.result) {
					    		parent.$.messager.alert('提示1',data.msg, 'info');
					    		$.modalDialog.handler.dialog('close');
					    		dataGrid.datagrid('reload');
			                }else{
			                	parent.$.messager.alert('提示2',data.msg, 'info');
			                	dataGrid.datagrid('reload');
							}   
					    }    
					});    
					$('#form').submit();
				}
		} ]
	});
}

//发标相关
$.fn.dataGridOptions.borroweditFun = function (id,title,width,height,url,text){
	if(text==null || text == ''){
		text='确定';
	}
	if (id == undefined) {
		var rows = dataGrid.datagrid('getSelections');
		id = rows[0].id;
	} else {
		dataGrid.datagrid('unselectAll').datagrid('uncheckAll');
	}
	if (url.indexOf("?")==-1) {
		url = url+'?id=' + id;
	} else {
		url = url+'&id=' + id;
	}
	parent.$.modalDialog({
		title : title,
		width : width,
		height : height,
		href : url,
		buttons : [ {
			text : text,
			handler : function() {
				/*if($(".realPhotosList img").length == 0){
					parent.$.messager.alert('提示','请先上传实物照', 'info');
				}else if($(".filePhotoList img").length== 0){
					parent.$.messager.alert('提示','请先上传档案照', 'info');
				}else if($(".editGuaranteeShow img").length == 0){
					parent.$.messager.alert('提示','请先上传担保函', 'info');
				}else {*/
					parent.$.modalDialog.openner_dataGrid = dataGrid;//因为添加成功之后，需要刷新这个dataGrid，所以先预定义好
					var f = parent.$.modalDialog.handler.find('#form');
					f.submit();
				/*}*/
				
			}
		} ]
	});
}

$.fn.dataGridOptions.returneditFun = function (id,title,width,height,url,text){
	if(text==null || text == ''){
		text='确定';
	}
	if (id == undefined) {
		var rows = dataGrid.datagrid('getSelections');
		id = rows[0].id;
	} else {
		dataGrid.datagrid('unselectAll').datagrid('uncheckAll');
	}
	if (url.indexOf("?")==-1) {
		url = url+'?id=' + id;
	} else {
		url = url+'&id=' + id;
	}
	parent.$.modalDialog({
		title : title,
		width : width,
		height : height,
		href : url,
		buttons : [ {
			text : text,
			handler : function() {
				/*if($(".realPhotosList img").length == 0){
					parent.$.messager.alert('提示','请先上传实物照', 'info');
				}else if($(".filePhotoList img").length== 0){
					parent.$.messager.alert('提示','请先上传档案照', 'info');
				}else if($(".editGuaranteeShow img").length == 0){
					parent.$.messager.alert('提示','请先上传担保函', 'info');
				}else {*/
					parent.$.modalDialog.openner_dataGrid = dataGrid;//因为添加成功之后，需要刷新这个dataGrid，所以先预定义好
					var f = parent.$.modalDialog.handler.find('#form');
					f.submit();
				/*}*/
				
			}
		} ]
	});
}






//发标相关
$.fn.dataGridOptions.borrowAddFun = function(id,title,width,height,url,contractNo) {
	if (id == undefined) {
		var rows = dataGrid.datagrid('getSelections');
		id = rows[0].id;
	} else {
		dataGrid.datagrid('unselectAll').datagrid('uncheckAll');
	}
	if (url.indexOf("?")==-1) {
		url = url+'?id=' + id + '&contractNo=' + contractNo;
	} else {
		url = url+'&id=' + id + '&contractNo=' + contractNo;
	}
	parent.$.modalDialog({
		title : title,
		width : width,
		height : height,
		href : url,
		buttons : [ {
			text : '添加',
			handler : function() {
				parent.$.modalDialog.openner_dataGrid = dataGrid;//因为添加成功之后，需要刷新这个dataGrid，所以先预定义好
				var f = parent.$.modalDialog.handler.find('#form');
				f.submit();
			}
		} ]
	});
}






//弹出继续发标页面
var nextBorrow = function(id,formId) {
	var dialog =  parent.sy.modalDialog({
		title : '子合同发标',
		width:900,
		height:650,
		url : '/modules/loan/borrow/borrowAddNextPage.html?id=' + id
	});
};




//浏览借款人邮箱
var showMail = function(userType,borrowType) {
	var urlt = '/modules/loan/borrow/getEmailListPage.html?userType='+ userType+'&borrowType='+ borrowType ;
	var dialog =  parent.sy.modalDialog({
		title : '浏览借款人',
		width:780,
		height:650,
		url : urlt,
		//url : '/modules/loan/borrow/getEmailListPage.html',
		//data: "{type:'" + type + "',borrowType:'" + borrowType + "'}", 
		buttons : [{
			text : '确定',
			handler : function() {
				dialog.find('iframe').get(0).contentWindow.getSelected(dialog, $('#email'));
			}
		}]
	});
};
//查看某时段注册人数
/*var showStatisticsDetailList = function(title,width,height,url,timeType) {
	
	 var dialog =  parent.sy.modalDialog({
			title : title,
			width : width,
			height : height,
			url : url+'?timeType='+timeType,
			buttons : [{
				text : '确定',
				handler : function() {
					dialog.find('iframe').get(0).contentWindow.getSelected(dialog, $('#email'));
				}
			}]
		});
	
	
};*/

/*//浏览轮展图
var showBanner = function(picPath) {
	var dialog =  parent.sy.modalDialog({
		title : '浏览借款人',
		width:780,
		height:650,
		url : '/modules/column/article/getPicPage.html?picPath=' + picPath,
		buttons : [{
			text : '确定',
			handler : function() {
				dialog.find('iframe').get(0).contentWindow.getSelected(dialog, $('#email'));
			}
		}]
	});
};*/
//浏览轮展图
var showBanner = function(id) {
	var dialog =  parent.sy.modalDialog({
		title : '浏览图片',
		width:780,
		height:650,
		url : '/modules/column/article/getPicPage.html?id=' + id,
		buttons : [{
			text : '确定',
			handler : function() {
				dialog.find('iframe').get(0).contentWindow.getSelected(dialog, $('#email'));
			}
		}]
	});
};
//图片预览
$.fn.dataGridOptions.viewFun = function (id,title,width,height,url,text){
		if(text==null || text == ''){
			//text='确定';
		}
		if (id == undefined) {
			var rows = dataGrid.datagrid('getSelections');
			id = rows[0].id;
		} else {
			dataGrid.datagrid('unselectAll').datagrid('uncheckAll');
		}
		if (url.indexOf("?")==-1) {
			url = url+'?id=' + id;
		} else {
			url = url+'&id=' + id;
		}
		parent.$.modalDialog({
			title : title,
			width : width,
			height : height,
			href : url
			/*buttons : [ {
				text : text,
				handler : function() {
					parent.$.modalDialog.openner_dataGrid = dataGrid;//因为添加成功之后，需要刷新这个dataGrid，所以先预定义好
					var f = parent.$.modalDialog.handler.find('#form');
					f.submit();
				}
			} ]*/
		});
}

//浏览商户信息
var showUser = function(userType) {
	var dialog =  parent.sy.modalDialog({
		title : '浏览商户',
		width:780,
		height:650,
		url : '/modules/goods/goodsMessage/getUserListPage.html?userType=' + userType,
		buttons : [{
			text : '确定',
			handler : function() {
				dialog.find('iframe').get(0).contentWindow.getSelected(dialog, $('#userName'),$('#userId'));
				//dialog.find('iframe').get(1).contentWindow.getSelected(dialog, $('#userId'));
			}
		}]
	});
};


//活动关联红包时，红包的展示
var showRedPacket = function(){
	var dialog = parent.sy.modalDialog({
		title:'浏览红包',
		width:600,
		height:400,
		url:'/modules/reward/redPackPageList.html',
		buttons:[{
			text:'确定',
			handler:function(){
				dialog.find('iframe').get(0).contentWindow.getSelected(dialog, $('#redPackName'),$('#validtime'),$('#redId'));
			}
		}]
		
	});
}

//后台展示其他收货地址
var showOtherAddress = function(id){
	var dialog = parent.sy.modalDialog({
		title:'其他地址',
		width:800,
		height:500,
		url:'/modules/user/receipt/otherAddressManage.html?id='+id
		
	});
}


//提现管理 设置为提现不通过
$.fn.dataGridOptions.cancelCashFun = function (id,url){
	parent.$.messager.confirm('提示', "是否设置为提现失败？", function(b) {
		if (b) {
			parent.$.messager.progress({
				title : '提示',
				text : '数据处理中，请稍后....'
			});
			$.post(url, {
				id : id
			}, function(data) {
				if(data.result){
					parent.$.messager.alert('提示', data.msg, 'info');
					dataGrid.datagrid('reload');						
					parent.$.messager.progress('close');
				}else{
					parent.$.messager.alert('提示',data.msg, 'info');
					dataGrid.datagrid('reload');						
					parent.$.messager.progress('close');
				}
				
			}, 'JSON');
		}
	});
}
//提现管理 设置为提现通过
$.fn.dataGridOptions.verifyCashFun = function (id,url){
	parent.$.messager.confirm('提示', "是否设置为提现成功？", function(b) {
		if (b) {
			parent.$.messager.progress({
				title : '提示',
				text : '数据处理中，请稍后....'
			});
			$.post(url, {
				id : id
			}, function(data) {
				if(data.result){
					parent.$.messager.alert('提示', data.msg, 'info');
					dataGrid.datagrid('reload');						
					parent.$.messager.progress('close');
				}else{
					parent.$.messager.alert('提示',data.msg, 'info');
					dataGrid.datagrid('reload');						
					parent.$.messager.progress('close');
				}
				
			}, 'JSON');
		}
	});
}

//提现管理 提现补单
$.fn.dataGridOptions.repairCashFun = function (tradeStatus,resultCode,ymdAmount,ymdOutTradeNo,outTradeNo,drawHandleStatus,drawSupplementSingle,url){
	parent.$.messager.confirm('提示', "是否设置为提现补单成功？", function(b) {
		if (b) {
			parent.$.messager.progress({
				title : '提示',
				text : '数据处理中，请稍后....'
			});
			$.post(url, {
				tradeStatus:tradeStatus,
				resultCode:resultCode,
				ymdAmount:ymdAmount,
				ymdOutTradeNo:ymdOutTradeNo,
				drawTradeNo:outTradeNo,
				drawHandleStatus:drawHandleStatus,
				drawSupplementSingle:drawSupplementSingle
			}, function(data) {
				if(data.result){
					parent.$.messager.alert('提示', data.msg, 'info');
					//dataGrid.datagrid('reload');						
					parent.$.messager.progress('close');
				}else{
					parent.$.messager.alert('提示',data.msg, 'info');
					//dataGrid.datagrid('reload');						
					parent.$.messager.progress('close');
				}
				
			}, 'JSON');
		}
	});
}
//充值管理 设置为充值不通过
$.fn.dataGridOptions.cancelRechargeFun = function (id,url){
	parent.$.messager.confirm('提示', "是否设置为充值失败？", function(b) {
		if (b) {
			parent.$.messager.progress({
				title : '提示',
				text : '数据处理中，请稍后....'
			});
			$.post(url, {
				id : id
			}, function(data) {
				if(data.result){
					parent.$.messager.alert('提示', data.msg, 'info');
					dataGrid.datagrid('reload');						
					parent.$.messager.progress('close');
				}else{
					parent.$.messager.alert('提示',data.msg, 'info');
					dataGrid.datagrid('reload');						
					parent.$.messager.progress('close');
				}
				
			}, 'JSON');
		}
	});
}
//充值管理 设置为充值通过
$.fn.dataGridOptions.verifyRechargeFun = function (id,url){
	parent.$.messager.confirm('提示', "是否设置为充值成功？", function(b) {
		if (b) {
			parent.$.messager.progress({
				title : '提示',
				text : '数据处理中，请稍后....'
			});
			$.post(url, {
				tradeNo : id
			}, function(data) {
				if(data.result){
					parent.$.messager.alert('提示', data.msg, 'info');
					dataGrid.datagrid('reload');						
					parent.$.messager.progress('close');
				}else{
					parent.$.messager.alert('提示',data.msg, 'info');
					dataGrid.datagrid('reload');						
					parent.$.messager.progress('close');
				}
				
			}, 'JSON');
		}
	});
}

//充值补单
$.fn.dataGridOptions.repairRechargeFun = function (outTradeNo,ymdOutTradeNo,resultCode,ymdAmount,tradeStatus,ymdTradeStatus,repairRecharge,url){
	parent.$.messager.confirm('提示', "是否设置为充值补单成功？", function(b) {
		if (b) {
			parent.$.messager.progress({
				title : '提示',
				text : '数据处理中，请稍后....'
			});
			$.post(url, {
				outTradeNo : outTradeNo,
				ymdOutTradeNo:ymdOutTradeNo,
				resultCode:resultCode,
				ymdAmount:ymdAmount,
				tradeStatus:tradeStatus,
				ymdTradeStatus:ymdTradeStatus,
				repairRecharge:repairRecharge
			}, function(data) {
				if(data.result){
					parent.$.messager.alert('提示', data.msg, 'info');
					//dataGrid.datagrid('reload');						
					parent.$.messager.progress('close');
				}else{
					parent.$.messager.alert('提示',data.msg, 'info');
					//dataGrid.datagrid('reload');						
					parent.$.messager.progress('close');
				}
				
			}, 'JSON');
		}
	});
}
//即投即生息标投标记录补单
$.fn.dataGridOptions.repairBorrowTenderFun = function (id,outTradeNo,ymdOutTradeNo,resultCode,ymdAmount,tradeStatus,ymdTradeStatus,repairBorrowTender,url){
	parent.$.messager.confirm('提示', "是否设置为即投即生息投标记录补单成功？", function(b) {
		if (b) {
			parent.$.messager.progress({
				title : '提示',
				text : '数据处理中，请稍后....'
			});
			$.post(url, {
				id:id,
				tenderBilNo : outTradeNo,
				ymdOutTradeNo:ymdOutTradeNo,
				resultCode:resultCode,
				ymdAmount:ymdAmount,
				tradeStatus:tradeStatus,
				ymdTradeStatus:ymdTradeStatus,
				repairBorrowTender:repairBorrowTender
			}, function(data) {
				if(data.result){
					parent.$.messager.alert('提示', data.msg, 'info');
					//dataGrid.datagrid('reload');						
					parent.$.messager.progress('close');
				}else{
					parent.$.messager.alert('提示',data.msg, 'info');
					//dataGrid.datagrid('reload');						
					parent.$.messager.progress('close');
				}
				
			}, 'JSON');
		}
	});
}

//晋商贷卡中奖时间补单 JSDP171 xingjia 20150610 start
$.fn.dataGridOptions.supplyWinTimeFun = function (cardNo,winTime,url){
	parent.$.messager.confirm('提示', "是否设置为补单成功？", function(b) {
		if (b) {
			parent.$.messager.progress({
				title : '提示',
				text : '数据处理中，请稍后....'
			});
			$.post(url, {
				cardNo:cardNo,
				winTime:winTime
			}, function(data) {
				if(data.result){
					parent.$.messager.alert('提示', data.msg, 'info');
					//dataGrid.datagrid('reload');						
					parent.$.messager.progress('close');
				}else{
					parent.$.messager.alert('提示',data.msg, 'info');
					//dataGrid.datagrid('reload');						
					parent.$.messager.progress('close');
				}
				
			}, 'JSON');
		}
	});
}
//JSDP171 xingjia 20150610 end

//更新资产包
$.fn.dataGridOptions.upDataMortgageFun = function (id,title,width,height,url){
	if (url.indexOf("?")==-1) {
		url = url+'?ids=' + id;
	} else {
		url = url+'&ids=' + id;
	}
	parent.$.modalDialog({
			title : title,
			width : width,
			height : height,
			href : url,
			buttons : [{
				text : '确定',
				handler : function() {
					parent.$.modalDialog.openner_dataGrid = dataGrid;//因为添加成功之后，需要刷新这个dataGrid，所以先预定义好
					var f = parent.$.modalDialog.handler.find('#form');
					f.submit();
				}
		} ]
	});
}
//更新资产包图片
$.fn.dataGridOptions.upDataMortgagePicFun = function (id,title,width,height,url){
	if (url.indexOf("?")==-1) {
		url = url+'?ids=' + id;
	} else {
		url = url+'&ids=' + id;
	}
	parent.$.modalDialog({
			title : title,
			width : width,
			height : height,
			href : url,
			buttons : [{
				text : '确定',
				handler : function() {
					parent.$.modalDialog.openner_dataGrid = dataGrid;//因为添加成功之后，需要刷新这个dataGrid，所以先预定义好
					var f = parent.$.modalDialog.handler.find('#form');
					f.submit();
				}
		} ]
	});
}
//添加资产包图片
$.fn.dataGridOptions.addMortgagePicFun = function (id,title,width,height,url){
	url = url+'?id=' + id;
	parent.$.modalDialog({
			title : title,
			width : width,
			height : height,
			href : url,
			buttons : [{
				text : '确定',
				handler : function() {
					parent.$.modalDialog.openner_dataGrid = dataGrid;//因为添加成功之后，需要刷新这个dataGrid，所以先预定义好
					var f = parent.$.modalDialog.handler.find('#form');
					f.submit();
				}
		} ]
	});
}
//批量更新资产包
function outBound(){
	var id = $("#borrowId").val();
	var ids = [];
	var rows = dataGrid.datagrid('getSelections');
	if(rows.length!=0){
		for(var i=0;i<rows.length;i++){
    		ids.push(rows[i].id);
    	}
    	var param = "?id="+id;
    	for (var i = 0;i < ids.length;i++){
    		param += "&ids="+ids[i];	
    	}
    	update(param);
	}else{
		parent.$.messager.alert('提示','请先选择资产包', 'info');
	}
}
function update(id){
	parent.$.modalDialog({
		title : '更新资产包',
		width : 800,
		height : 400,
		href : '/modules/loan/borrow/getUpdateMortgageListPage.html'+id,
		buttons : [{
			text : '确定',
			handler : function() {
				parent.$.modalDialog.openner_dataGrid = dataGrid;//因为添加成功之后，需要刷新这个dataGrid，所以先预定义好
				var f = parent.$.modalDialog.handler.find('#form');
				f.submit();
			}
		} ]
	})
}
//预览标
$.fn.dataGridOptions.viewBorrowFun = function (id,openUrl){
	//跳转外部链接处理
	window.open(openUrl+"&id="+id);
}
//预览商品
$.fn.dataGridOptions.viewGoodsFun = function (id,openUrl){
	window.open(openUrl+"?id="+id);
}


//预览标
$.fn.dataGridOptions.viewArticleFun = function (id,openUrl,nid){
	//跳转外部链接处理
	/*if(nid=="questions"){
		var arr = openUrl.split('/article');
		window.open(arr[0]+"/common/faquestions.html");/common/faquestions.html?type=investQuestions
	}else */
	
	if(nid=="media"){
		window.open(openUrl+"?nid="+nid);//媒体报道
	}else if(nid == "bondQuestions" ||  nid == "loginQuestions" ||  nid == "investQuestions" || nid == "borrowQuestions" || nid == "qualiQuestions"){
		window.open(openUrl+"?type="+nid);//常见问题
	}else{
		window.open(openUrl+"?nid="+nid+"&id="+id);
		//window.open(openUrl+"?nid="+nid);
	}
}

//下载平台借款协议
$.fn.dataGridOptions.manageProtocolFun = function (id,openUrl){
	//跳转外部链接处理
	window.open(openUrl+"?borrowId="+id);
}



//
var showDetailAccountLog = function(userId,logId) {
	var urlt = '/modules/account/accountlog/showDetailAccountLog.html?userId='+userId+'&id='+logId;
	var dialog =  parent.sy.modalDialog({
		title : '资金详细日志',
		width:790,
		height:550,
		url : urlt
		//url : '/modules/loan/borrow/getEmailListPage.html',
		//data: "{type:'" + type + "',borrowType:'" + borrowType + "'}", 
//		buttons : [{
//			text : '确定',
//			handler : function() {
//				dialog.find('iframe').get(0).contentWindow.getSelected(dialog, $('#email'));
//			}
//		}]
	});
};
