<ul>
	<li class="record_conss_title">
		<dl>
			<dd class="record_dds1">消费</dd>      
			<dd class="record_dds1">消费时间</dd>
			<dd class="record_dds1">金额(元)</dd>
		</dl>
	</li>
</ul>

{{#each data.list}}
<ul class="record_conssin_num record_conssin_num1" style="display:block;">
	<li>
		<dl>
			<dd class="record_dds1">{{hideBorrowName borrowName}}</dd>
			<dd class="record_dds1">{{transFormatDate addTime}}</dd>
			<dd class="record_dds4" style='margin-left: 27px;'>¥{{account}}</dd>
		</dl>
	</li>							
</ul>						
{{/each}}	