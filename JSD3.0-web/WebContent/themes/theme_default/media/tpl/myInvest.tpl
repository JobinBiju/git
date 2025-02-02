<dl class="c_data_title">
	<dd class="record_dd1">交易时间</dd>
	<dd style="width: 120px;">借款标名</dd>
	<dd>交易金额（元）</dd>
	<dd>完成比例</dd>
	<dd>投标状态</dd>
	<dd class="record_dd2">交易对方</dd>
	<dd>标的状态</dd>
	<dd style="width: 80px">协议下载</dd>
	<div class="c_clear"></div>
</dl>
{{#each data.list}}
<dl>
	<dd class="record_dd1">{{transFormatDate addTime}}</dd>
	<dd class="tender_name" style="width: 120px;">{{{logBorrowNameFun borrowName borrowId addTime}}}</dd>
	<dd>{{moneyFormat account}}</dd>
	<dd>{{scales}}%</dd>
	
	<dd>{{tenderStatus status}}</dd>
	
	<dd class="record_dd2">{{userName}}</dd>
	<dd>{{logBorrowStatusFun borrowStatus scales type flow}}</dd>
	
	<dd class="record_dds6 protocolDown" style="width: 80px;">
		{{{protocolTenderOperateFun borrowStatus id type}}}
	</dd>
	<div class="c_clear"></div>
</dl>
{{/each}}

