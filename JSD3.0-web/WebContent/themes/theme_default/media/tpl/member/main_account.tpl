<div class="MemberCenter_con2_left" style="background:#FF7800;width:160px;padding-left:20px;">
			<h4>累计收益</h4>
			<span>{{moneyFormat sumInterest}}元</span>
</div>
<div class="MemberCenter_con2_right" style="width:auto;">
			<ul class="y_ullefts" style="width:259px;padding-left:35px;">
				<li class="y_con2_lis">
				    <i></i>
					<span>账户总额</span>
					<span class="y_con2_spans_rights"><em>{{moneyFormat  account.accountTotal}}元</em></span>
					<div class="y_tooltips" style="display: none;">
						 可用总额：{{moneyFormat usableTotal}}元<br>
						 冻结总额：{{moneyFormat freezeTotal}}元<br>
						 待收总额：{{moneyFormat account.collectionTotal}}元<br>
					</div>
				</li>
				<li class="y_con2_lis">
				    <i></i>
					<span>可用总额</span>
					<span class="y_con2_spans_rights"><em>{{moneyFormat usableTotal}}元</em></span>
					<div class="y_tooltips" style="display: none;">
					    充值可用：{{moneyFormat account.rechargeUsable}}元<br>
						奖励可用：{{moneyFormat account.awardUsable}}元<br>
						利息可用：{{moneyFormat account.interestUsable}}元<br>
						回款本金可用：{{moneyFormat account.returnCapitalUsable}}元
					</div>
				</li>
				<li class="y_con2_lis">
				    <d></d>
					<span>待收总额</span>
					<span class="y_con2_spans_rights"><em>{{moneyFormat account.collectionTotal}}元</em></span>
					<div class="y_tooltips" style="display: none;">
						<em></em>
					</div>
				</li>
				<li class="y_con2_lis">
				    <i></i>
					<span>体验卡总额</span>
					<span class="y_con2_spans_rights"><em>{{moneyFormat ptAccountAll}}元</em></span>
					<div class="y_tooltips" style="display: none;">
						冻结体验卡金额：{{moneyFormat ptAccountFzen}}元<br>
						已用体验卡金额：{{moneyFormat ptAccountUsed}}元
					</div>
				</li>
			</ul>
			<ul class="y_ulrights" style="width:259px;padding-left:35px;">
				<li class="y_con2_lis">
				    <i></i>
					<span>冻结总额</span>
					<span class="y_con2_spans_rights"><em>{{moneyFormat freezeTotal}}元</em></span>
					<div class="y_tooltips" style="display: none;">
						冻结可用充值：{{moneyFormat account.freezeUseRecharge}}元<br>
						冻结可用奖励：{{moneyFormat account.freezeUseAward}}元<br>
						冻结可用利息：{{moneyFormat account.freezeUseInterest}}元<br>
						冻结可用回款本金：{{moneyFormat account.freezeUseReturnCapital}}元
					</div>
				</li>
				<li class="y_con2_lis">
				    <d></d>
					<span>充值总额</span>
					<span class="y_con2_spans_rights"><em>{{moneyFormat rechargeAmount}}元</em><span>
					<div class="y_tooltips" style="display: none;">
						<em></em>
					</div>
				</li>
				<li class="y_con2_lis">
				    <i></i>
					<span>积分总额</span>
					<span class="y_con2_spans_rights"><em>{{score.totalScore}}分</em></span>
					<div class="y_tooltips" style="display: none;">
						有效积分：{{score.validScore}}分<br>
						消费积分：{{score.expenseScore}}分<br>
						冻结积分：{{score.freezeScore}}分<br>
					</div>
				</li>
				<li class="y_con2_lis">
				    <d></d>
					<span>体验卡可用</span>
					<span class="y_con2_spans_rights"><em>{{moneyFormat ptAccountUnuse}}元</em></span>
					<div class="y_tooltips" style="display: none;">
					</div>
				</li>
			</ul>
			<div class="sign" style="margin-right:26px;background:#ff7800;">
			{{#equal isSignIn 0}}
						 <span class="sp1">点击签到</span>
			             <div class="sign_d">已经累计签到{{totalDays}}天</div>
			{{else}}
						 <span class="sp2">今日已签到</span>
						  <div class="sign_d2" style="color:#fff;line-height:34px;">累计签到得<b style="font-weight:bold;">{{totalDays}}</b>积分</div> 
			{{/equal}}
        </div>
</div>
