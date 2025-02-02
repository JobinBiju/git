﻿define(function(require,exports,module){
	require('jquery');
	require('/plugins/echarts/echarts-all');
	require('formatterFunction');
	
	$.ajax({
	      type:"post",
	      url:"/member/asset/assetEarnInterest.html",
	      dataType:"json",
	      success:function(json){ 
	          //已赚利息
	    	  $("#earnedInterest").html(moneyFormat(json.earnedInterest));
	    	  //已赚奖励
	    	  $("#awardAmount").html(moneyFormat(json.awardAmount));
	    	  //已赚罚息
	    	  $("#defaultInterest").html(moneyFormat(json.defaultInterest));
	    	  //债权转让盈亏
	    	  $("#creditInterest").html(moneyFormat(json.creditInterest));
	    	  //总计
	    	  $("#sum").html(moneyFormat(json.sum));
	    	  //通过晋商贷已赚取
	    	  $("#titleSum").html(moneyFormat(json.sum));
	//已赚取
	 var myChart = echarts.init(document.getElementById('interestCollection')); 
     var option = {
             tooltip: {
                 show: true
             },
             legend: {
                 data:['理财账户收益金额组成']
             },
             xAxis : [
                 {
                     type : 'category',
                     data : ['已赚利息','已赚奖励','已赚罚息','债权转让盈亏']
                 }
             ],
             yAxis : [
                 {
                     type : 'value'
                 }
             ],	
             series : [
                 {
                     "name":"总额",
                     "type":"bar",
                     "data":json.object,
                     barWidth : 50//柱体宽度
                 },
                 
             ],
             color : ["#87cefa"]
         };
       // 为echarts对象加载数据 
       myChart.setOption(option); 
       
	      }
	});
	
	$.ajax({
	      type:"post",
	      url:"/member/asset/assetInvestTotal.html",
	      dataType:"json",
	      success:function(json){
	    	  //总计
	    	  $("#sumInvest").html(moneyFormat(json.sum));
	    	  //累计投资
	    	  $("#titleSumInvest").html(moneyFormat(json.sum));
	    	  //债权金额
	    	  $("#creditBuySum").html(moneyFormat(json.creditBuySum));
	    	  //能源宝
	    	  $("#energyInvestSum").html(moneyFormat(json.energyInvestSum));
	    	  //车贷宝
	    	  $("#mortgageInvestSum").html(moneyFormat(json.mortgageInvestSum));
	    	  //微商贷
	    	  $("#netWorkInvestSum").html(moneyFormat(json.netWorkInvestSum));
	    	  //分期宝
	    	  $("#amortizeInvestSum").html(moneyFormat(json.amortizeInvestSum));
       //累计投资 
       var myChart = echarts.init(document.getElementById('investAmount')); 
       var option = {
               tooltip: {
                   show: true
               },
               legend: {
                   data:['理财账户投资金额组成']
               },
               xAxis : [
                   {
                       type : 'category',
                       data : ['能源宝','车贷宝','微商贷','分期宝','债权转让']
                   }
               ],
               yAxis : [
                   {
                       type : 'value'
                   }
               ],	
               series : [
                   {
                       "name":"总额",
                       "type":"bar",
                       "data":json.object,
                       barWidth : 50//柱体宽度
                   }, 
               ],
               color : ["#87cefa"]
           };
         // 为echarts对象加载数据 
         myChart.setOption(option); 
         
	      }
	});
         
	$.ajax({
	      type:"post",
	      url:"/member/asset/assetInvestProfit.html",
	      dataType:"json",
	      success:function(json){
	    	  //总计
	    	  $("#sumCollect").html(moneyFormat(json.sum));
	    	  //投资待收益为
	    	  $("#titleSumCollect").html(moneyFormat(json.sum));
	    	  //投标收益
	    	  $("#investCollectProfit").html(moneyFormat(json.investCollectProfit));
	    	  //债权收益（能源宝）
	    	  $("#energyCollectProfit").html(moneyFormat(json.energyCollectProfit)); 
	    	  //债权收益（车贷宝）
	    	  $("#mortgageCollectProfit").html(moneyFormat(json.mortgageCollectProfit));
	    	  //债权收益（微商贷）
	    	  $("#netWorkCollectProfit").html(moneyFormat(json.netWorkCollectProfit));
	    	  
         //投资待收收益
         var myChart = echarts.init(document.getElementById('investCollect')); 
         var option = {
                 tooltip: {
                     show: true
                 },
                 legend: {
                     data:['理财账户收益金额组成']
                 },
                 xAxis : [
                     {
                         type : 'category',
                         data : ['投标收益','能源宝','车贷宝','微商贷']
                     }
                 ],
                 yAxis : [
                     {
                         type : 'value'
                     }
                 ],	
                 series : [
                     {
                         "name":"总额",
                         "type":"bar",
                         "data":json.object,
                         barWidth : 50//柱体宽度
                     }, 
                 ],
                 color : ["#87cefa"]
             };
           // 为echarts对象加载数据 
           myChart.setOption(option); 
           
	      }
	});
	
	$.ajax({
	      type:"post",
	      url:"/member/asset/creditProfit.html",
	      dataType:"json",
	      success:function(json){  
	    	$("#titleSumCredit").html(moneyFormat(json.sum));  
	    	$("#sumCredit").html(moneyFormat(json.sum));  
	    	//债券金额(债权人能源宝)
	       $("#energCreditMoney").html(moneyFormat(json.energCreditMoney));
	       //债券金额(债权人车贷宝)
	       $("#mortgageCreditMoney").html(moneyFormat(json.mortgageCreditMoney));
	     //债券金额(债权人微商贷)
	       $("#networkCreditMoney").html(moneyFormat(json.networkCreditMoney));
	       
           //债权金额
           var myChart = echarts.init(document.getElementById('creditCollected')); 
           var option = {
                   tooltip: {
                       show: true
                   },
                   legend: {
                       data:['理财账户收益金额组成']
                   },
                   xAxis : [
                       {
                           type : 'category',
                           data : ['能源宝','车贷宝','微商贷']
                       }
                   ],
                   yAxis : [
                       {
                           type : 'value'
                       }
                   ],	
                   series : [
                       {
                           "name":"总额",
                           "type":"bar",
                           "data":json.object,
                           barWidth : 50//柱体宽度
                       }, 
                   ],
                   color : ["#87cefa"]
               };
             // 为echarts对象加载数据 
             myChart.setOption(option); 
             
	      }
	});
           
});