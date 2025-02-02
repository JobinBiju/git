<div class="y_details_con1">
		<div class="calculatorCpmBox1" style="display: none;">
			<h1>确认支付<img src="{{imagepath}}/images/bid/cpm.png" /></h1>
			{{#with borrow}}
			<form class="payformcpm" action="/invest/tender.html" name="form1" id="invest_detail_form1" method="post"  onkeydown="if(event.keyCode==13) return false; " >
					<input type="hidden" id="bid_id" name="id" value="{{id}}"/>
					<input type="hidden" id="isDirectional" name="isDirectional" value="{{../isDirectional}}"/>
					<input type="hidden" id="remoney" name="money" value=""/>
					<input type="checkbox" name="mdAccountUse" value="1" id="moneypurses"/>
					<label for="moneypurses" style="font-size:16px;">可用钱袋</label>
					<span class="y_spanspay_usable">本次可用钱袋  <em class="mdaClass">0</em> 元</span><br/>
					<label style="font-size:16px;">实际支付</label><span class="y_moneypaycpm"></span><i class="y_mycunit">元</i><br/>
						{{#if ../isDirectional}}
						<div style="margin-bottom:3px;">
			                <label style="font-size:16px;">定向密码</label>
			                <input type="password" id="pwd" autocomplete="off" name="pwd" size="11" placeholder="输入定向密码" style="width:207px;height:38px;border:1px solid #c9c9cf;margin-top:20px;margin-left:4px;padding-left:10px;" />
		                </div>
		           		 {{/if}}
		                <span class="pay_cpmerror pay_cpmerror1" style="display:none;"></span>
		                <div style="clear:both;"></div>
						<label style="font-size:16px;">交易密码</label>
						{{#if ../IsPayPwdNull}}
							<input style="width:207px;height:38px;border:1px solid #c9c9cf;margin-top:20px;margin-left:8px;padding-left:10px;margin-bottom:6px;" id="paypwd" type="password" placeholder="请输入交易密码"/>
							<a href="/member/useridentify/identify.html?flag=findpaypwd" target="_black" style="font-size:12px;color:#005ea7;margin-left:14px;" >忘记密码？</a><br/>
						{{else}}
							<input style="width:207px;height:38px;border:1px solid #c9c9cf;margin-top:20px;margin-left:8px;padding-left:10px;margin-bottom:6px;" id="paypwd" type="hidden" value="noset" placeholder="请输入交易密码"/>
							<a href="/member/useridentify/identify.html?flag=setpaypwd" target="_black" style="font-size:12px;color:#005ea7;margin-left:14px;line-height: 60px;" >设置交易密码</a><br/>
						{{/if}}
						<span class="pay_cpmerror" style="display:none;"></span>
						<a class="change_true">确认投标</a>
						<!--JSDBET-894 gjh 2015-3-30 start-->
						<input type="hidden" name="tenderToken" value="{{../tenderToken}}"/>
						<!--JSDBET-894 gjh 2015-3-30 end-->
						<input type="hidden" id="resultFlag" name="resultFlag" value="{{../resultFlag}}"/>
				</form>
			{{/with}}
		</div>
		<div class="calculatorCpmBottom" style="height: 900px; display: none;">
		</div>
		<div class="y_details_con1left">
				{{#with borrow}}
					
			<div class="y_details_con1leftin" style="width:100%;">
				<h1><span style='background: url("{{../path}}/images/index/fen.png") no-repeat scroll  0 6px transparent;padding-left: 27px;font-size:22px;'>{{name}}<span></h1>
				
				<div class="c_clear"></div>
				<ul class="y_details_con1leftul1" style="background:#f2f3f5;height:84px;padding:18px 0;width:96%;margin:10px auto 0;">
					<li style="border:0;height:90px;padding:0 40px;">
						
							<div class="myStat4" data-dimension="88" data-text="{{scales}}%" data-percent="{{scales}}" data-info="New Clients" data-width="8" data-fontsize="18"  data-fgcolor="#3ca0eb" data-bgcolor="#dddddd"></div>
						
					</li>
					<li style="height:90px;padding:0 40px;">
						<span style="position:relative;top:8px;">
							年化收益<br/>
							<em  style="font-size:38px;line-height: 70px;font-weight:bold;">{{apr}}</em>%
						</span>
					</li>
					<li style="height:90px;padding:0 40px;">
						<span style="position:relative;top:8px;">
							项目期限<br/>
							{{borrowLimitTime borrowTimeType timeLimit}}
						</span>
					</li>
					<li style="height:90px;padding:0 40px;">
						<span style="position:relative;top:8px;">
							金额<br/>
							<em  style="font-size:35px;line-height: 70px;font-weight:bold;">{{moneyFormatNew account}}</em>万元
						</span>
					</li>
				</ul>
				<ul class="y_details_con1leftul2" style="margin-top: 10px;width: 97%;">
					<li>
						<label>审核时间：</label>
						<span>{{ startTime}}</span>
					</li>
					<li>
						<label class="hintems">截止时间：</label>
						<span>{{ endTime}}</span>
						<div class="y_tooltips">剩余：1天12小时30分40秒
						<i></i>
						</div>
					</li>
					<li>
						<label>还款方式：</label>
						<span>{{transFormatStyle style}}</span>
					</li>
					<li>
						<label>剩余金额：</label>
						<span>{{subAccNum account accountYes}}元</span>
					</li>
					<li>
						<label>计息方式：</label>
						<span>{{planBreathWay type}}</span>
					</li>
					<li>
						<label>投资有奖：</label>
						<span style="color:#12adff;">{{investPrizeWay type}}</span>
					</li>
				</ul>
			</div>
			{{/with}}
		</div>
		<div class="y_details_con1right" style="padding-left:0;width:280px;">
			{{#if borrowPreview}}
		    	{{#equal userType 10}}
		    		{{#inequality borrow/scales 100}}
							<form style="position:relative;margin-left:16px;">
								{{#with borrow}}
								<p class="y_money_ps">剩余可投：<span>{{subAccNum account accountYes}}</span>元</p>
								<input type="text" id="money" name="money" size="11" onkeyup="this.value=this.value.replace(/[^\d]/g,'') "  onafterpaste="this.value=this.value.replace(/[^\d]/g,'') " class="y_detailsinputs" value="1"/><span class="y_subtracts"></span><span class="y_pluss"></span><label style="position:absolute;left: 180px;top: 48px;">元</label>
								<div class="reminderss">投资金额最少500元</div>
								<p class="y_money_ps y_money_inv">到期收益：<span>0</span>元</p>
								<input type="hidden" id="bid_id" name="id" value="{{id}}"/>
								{{/with}}
								{{#with account}}
									<div class="y_details_registerps" style="width:100%;border:0;background:none;padding:0;"><input type="checkbox" id="isAllUseTend" style="margin-right:4px;position: relative;top: 2px;">可用余额全投(<span>{{getUseAccountTotal interestUsable awardUsable rechargeUsable returnCapitalUsable}}</span>元)[  <a href="/member/recharge/newRecharge.html">充值</a> ] </div>
								{{/with}}
								<a href="javascript:;"  class="y_details_logas" style="height: 46px;margin-top:14px;">立即投资</a>
							</form>
					{{else}}
					      {{#with borrow}}
						           <p style="font-size:14px;color:#555555;line-height:40px;text-align:center;margin-top: 30px;">投标已满额
						           <br/>融资笔数：<span style="font-size:18px;color:#ff9000;">{{../data.page.total}}</span>笔
						           <br/>当前状态：<span style="color:#ff9000;">{{logBorrowStatusFun status scales type flow}}</span></p>
								   <a href="/invest/index.html" class="y_details_btn" style="margin-left:16px;margin-top: 30px;">查看其他项目</a>
					      {{/with}}
					      <input type="hidden" id="bid_id" value="{{../borrow/id}}" />
			     	{{/inequality}}
		      {{else}}
			      <div class="borrow_user_st">
			        <dl style="background:none;padding-left:0px;">
			          <dt style="text-align:center;">对不起！</dt>
			          <dd>您当前登录的不是投资账户，不能进行投资。</dd>
			        </dl>
			        <a class="login_account" style="margin-top:60px;" href="/member/main.html">进入账户中心</a>
			      </div>
			      <input type="hidden" id="bid_id" value="{{../borrow/id}}"/>
		      {{/equal}}
		  {{else}}
		  		{{#if borrowFiexed}}
		  			<form style="position:relative;margin-left:16px;">
						{{#with borrow}}
						<p class="y_money_ps">剩余可投：<span>{{subAccNum account accountYes}}</span>元</p>
						<input type="text" id="money" name="money" size="11" onkeyup="this.value=this.value.replace(/[^\d]/g,'') "  onafterpaste="this.value=this.value.replace(/[^\d]/g,'') " class="y_detailsinputs" value="500"/><span class="y_subtracts"></span><span class="y_pluss"></span><label style="position:absolute;left: 180px;top: 48px;">元</label>
						<div class="reminderss">投资金额最少500元</div>
						<p class="y_money_ps y_money_inv">到期收益：<span>0</span>元</p>
						<input type="hidden" id="bid_id" name="id" value="{{id}}"/>
						{{/with}}
						{{#with account}}
							<div class="y_details_registerps" style="width:100%;border:0;background:none;"><input type="checkbox" id="isAllUseTend" style="margin-right:4px;position: relative;top: 2px;">可用余额全投（<span>{{ getUseAccountTotal interestUsable awardUsable rechargeUsable returnCapitalUsable}}</span>元） [  <a href="/member/recharge/newRecharge.html">充值</a> ] </div>
						{{/with}}
						{{#with borrow}}
							<div class="y_show_showNew" style="padding-left:35px;padding-top:10px;display:none;">
								<span></span>倒计时{{inverstcountdown fixedTime}}
							</div>
							<div class="y_show_hiddens" style="display:none">
								<a href="javascript:;" class="y_details_logas">立即投资</a>
							</div>
						{{/with}}
						
					</form>
		  		{{else}}
		  			 <div class="borrow_user_st">
				        <dl style="background:none;padding-left:0px;">
				          <dt style="text-align:center;">对不起！</dt>
				          <dd>您当前登录的是客服账号，不能进行投资。</dd>
				        </dl>
				      </div>
		  		{{/if}}
		       <input type="hidden" id="bid_id" value="{{../borrow/id}}" />
		  {{/if}}
	</div>
</div>
	<!-- con2   left  start -->
	<div class="y_details_con2">
		<div class="y_details_con2left">
			<ul class="y_details_con2leftTitle">
				<li class="y_details_clicksli" style="width:173px;">
					<span style="width:173px;">项目详情</span>
				</li>
				<li style="width:173px;">
					<span style="width:173px;">风险控制</span>
				</li>
				<li style="width:174px;">
					<span style="width:174px;">投资列表</span>
				</li>
				<li style="width:174px;">
					<span style="border:0;width: 174px;">还款计划</span>
				</li>
				
			</ul>
			<!-- 项目详情 -->
			
			<div class="y_projectDetails y_detailscon2leftcon" style="display:block;">
				<h3>用户信息</h3>
				{{#with uc}}
				<ul id="detail-login-ul">
					<li>用户昵称：<span>{{../nickName}}</span></li>
					<li>所属行业：<span>{{professional}}</span></li>
					<li>出生年月：<span>{{../birthYM}}</span></li>
					<li>用户性别：<span>{{sex}}</span></li>
					<li>婚姻状况：<span>{{maritalStatus}}</span></li>
					<li>岗位职位：<span>{{position}}</span></li>
					<li>居&nbsp;&nbsp;住&nbsp;地：<span>{{provinceName}}{{cityName}}{{areaName}}</span></li>
					<li>还款来源：<span>{{sourceRepay}}</span></li>
				</ul>
				<h3 style="margin-top:20px;">审核状态</h3>
				<table border="0" cellpadding="0" cellspacing="0" id="detail-login-table">
					<tr>
						<th>审核项目</th>
						<th>审核项目</th>
						<th>通过日期</th>
					</tr>
					<tr class="y-tr-dark">
						<td>信用报告</td>
						<td class="cons-td-bjb"></td>
						<td>{{noticeNewDateFormat ../addTime}}</td>
					</tr>
					<tr>
						<td>身份认证</td>
						<td class="cons-td-bjb"></td>
						<td>{{noticeNewDateFormat ../addTime}}</td>
					</tr>
					<tr class="y-tr-dark">
						<td>工作认证</td>
						<td class="cons-td-bjb"></td>
						<td>{{noticeNewDateFormat ../addTime}}</td>
					</tr>
					<tr>
						<td>收入认证</td>
						<td class="cons-td-bjb"></td>
						<td>{{noticeNewDateFormat ../addTime}}</td>
					</tr>
					<tr class="y-tr-dark">
						<td>实地认证</td>
						<td class="cons-td-bjb"></td>
						<td>{{noticeNewDateFormat ../addTime}}</td>
					</tr>
					<tr>
						<td>机构担保</td>
						<td class="cons-td-bjb"></td>
						<td>{{noticeNewDateFormat ../addTime}}</td>
					</tr>
				</table>
				<ul style="padding:15px 0;border-bottom:1px solid #e0e0e0;">
					<li style="list-style: disc outside;margin-left:27px;color:#808080;"><p class="y_h3_color"  style="padding-left:0;">晋商贷及其合作机构将始终秉持客观公正的原则，严控风险，最大程度的尽力确保借入者信息的真实性，但不保证审核信息100%无误。</p></li>
					<li style="list-style: disc outside;margin-left:27px;color:#808080;"><p class="y_h3_color" style="padding-left:0;">借入者若长期逾期，其个人信息将被公布。</p></li>
				</ul>
				<h3>借款描述</h3>
				<div style="padding-right:30px;padding-left:10px;color:#666;">
				<p class="y_h3_color">{{companyDesc}}</p>
				</div>
				{{/with}}
			</div>
			<div class="y_riskDetails y_detailscon2leftcon c_risk">
			<!--  -->
				<div class="c_risk_title">
					<ul class="c_risk_list">
						{{#with borrow}}
							{{#if vouchFirm}}
								<li class="c_risk_this">担保机构</li>
							{{else}}
								<li class="c_risk_this">风险备用金</li>
							{{/if}}
						{{/with}}
					</ul>
				</div>
				<div class="c_risk_shadow"></div>
				<div class="c_risk_detail">
					{{#with borrow}}
						
						{{#if vouchFirm}}
						<!-- 担保 -->
						<div class="c_risk_guarantee">
							<p class="y_h3_color"><span class="namespan">担保方</span><em>{{vouchFirm.userCache.companyName}}</em></p>
							<p class="y_h3_color"><span class="namespan">担保情况</span><em>{{vouchFirm.userCache.companyName}}提供本息担保。</em><br/><em class="em1t">{{vouchFirm.userCache.companyName}}提供再担保。</em></p>
							<p class="riskscheme">项目风险保障方案</p>
							<div class="imaginaryy_h3_color">
								<p class="y_h3_color y_h3_colormb">360度实地尽调 - 大数据思维保障项目质量</p>
								<p class="y_h3_color y_h3_colormb">专业尽调团队对核心企业和必要的融资项目进行360度实地尽职调查，调查报告的数据包括实地调查数据、人民银行征信系统数据、公安部居民身份系统数据、税务系统数据、工商局系统数据、车辆管理系统数据、房屋管理系统数据、法院系统数据、银行流水数据等。对融资项目实现立体化多层级的数据采集，以确保项目及融资需求真实、合法，为风险把控提供可信依据。风控团队会在这些数据的基础上进行评审，筛选出符合标准的项目上线融资</p>
							</div>
							<div class="imaginaryy_h3_color">
								<p class="y_h3_color y_h3_colormb">担保+再担保 - 双层担保方案实现加倍保护</p>
								<p class="y_h3_color y_h3_colormb">由大型担保集团或产业体系项下担保公司提供担保，同时由其所在集团或者产业体系中有资质的再担保公司作为再担保方提供再担保，当项目出现风险后，首先由担保方履行代偿义务，担保方未能及时履行情况下将由再担保方再担保代偿。</p>
								<p class="y_h3_color">该措施局限性：担保方及再担保方均已破产，清算后仍不足代偿。</p>
							</div>
						</div>
						{{else}}
							<!-- 风险备用金 -->
					<div class="c_risk_guarantee">
						<!-- 2015.4.7 start -->
						<div class="c_cliam_tender c_cliam_bot c_risk_table">
							<table border="0" cellpadding="0" cellspacing="0">
								<tr><th class="c_cliam_num" style="color:#fff;">产品类型</th><th class="c_tender_man">计提比例</th><th>偿付范围</th><th>偿付资金来源</th></tr>
								<tr><td>能源宝</td><td>1.0%</td><td class="c_tender_money">未还本金</td><td class="c_tender_time">风险备用金</td></tr>
								<tr><td>微商贷</td><td>1.0%</td><td class="c_tender_money">未还本金</td><td class="c_tender_time">风险备用金</td></tr>
								<tr><td>分期宝</td><td>1.0%</td><td class="c_tender_money">未还本金</td><td class="c_tender_time">风险备用金</td></tr>
								<tr><td>车贷宝</td><td>0.5%</td><td class="c_tender_money">未还本金</td><td class="c_tender_time">风险备用金</td></tr>
							</table>
						</div>
						<p class="c_risk_intro">为充分保障用户的利益，更好的进行自律监管， 山西新晋商电子商务股份有限公司 （以下简称“晋商贷”）与晋城银行就晋商贷风险备用金托管问题正式签署协议。晋城银行会对晋商贷的风险备用金专户资金进行认真独立的托管并针对风险备用金专户资金的实际进出情况每月出具托管报告。晋商贷将每月公布风险备用金的情况，供用户监督。</p>
						<div class="c_fund_report">
							<dl>
								<dd>晋商贷风险备用金《资金托管报告》（2015年4月）<span class="c_risk_time">2015-04-09</span></dd>
								<dd>晋商贷风险备用金《资金托管报告》（2015年5月）<span class="c_risk_time">2015-05-08</span></dd>
							</dl>
						</div>
						<!--<ul class="y_PageNums" style="margin:30px 0 0 130px;">
							<li class="y_previousPage">上一页</li>
							<li class="y_PageNumsclick y_linums">1</li>
							<li class="y_linums">2</li>
							<li class="y_linums">3</li>
							<li class="y_linums">4</li>
							<li class="y_linums">...</li>
							<li class="y_linums">25</li>
							<li class="y_nextPage">下一页</li>
						</ul>-->
						<!-- 2015.4.7 end -->
					</div>
						{{/if}}
					{{/with}}
				</div>
			<!--  -->
				
			</div>
			<!-- 投资列表 -->
			<div class="y_InvestmentDetails y_detailscon2leftcon">
				<h2>投资列表</h2>
				<ul class="y_details_con2rightscrollt">
					<li style="padding:0;">
						<dl>
							<dd style="width:40px;padding:0;">序号</dd>
							<dd style="width:160px;padding:0;">时间</dd>
							<dd style="width:160px;padding:0;">投资人</dd>
							<dd style="width:140px;padding:0;">投标金额(元)</dd>
							<dd style="width:140px;padding:0;">实际投标金额(元)</dd>
						</dl>
					</li>
				</ul>
				<div class="y_details_con2rightscroll investRecord" style="padding-right:20px;">
					<ul>
						{{#if data.list}}
				            {{#each data.list}}
				            	<li style="padding:0;">
									<dl>
									    <dd style="width:40px;padding:0;">{{id}}</dd>
										<dd class="y_dd_times" style="width:160px;padding:0;">
											<span>{{transFormatDate addTime}}</span>
										</dd>
										<dd style="width:160px;padding:0;">{{userName}}{{#equal tenderType 1}}
											<span style="color:#7C7C7C;">（自）</span>
										{{/equal}}
										{{#equal tenderType 2}}
											 <span class="{{dataSource tenderType}}"></span>
										{{/equal}}</dd>
										<dd style="width:140px;padding:0;">￥{{money}}</dd>
										<dd style="width:140px;padding:0;">￥{{account}}</dd>
									</dl>
								</li>
				            {{/each}}
			            {{else}}
			            	<li>
								<dl>
									<dd class="y_dd_times"></dd>
				            		<dd><div class='c_nodata' style="margin-left: 150px;margin-top: 140px;"> </div></dd>
				            		<dd></dd>
			            		</dl>
			            	</li>
			            {{/if}}
					</ul>
				</div>
				<div id="tenderkkpager" style="margin-right:10px;"></div>
			</div>
			<!-- 还款计划 -->
			<div class="y_InvestmentDetails y_detailscon2leftcon">
				<h2>还款计划</h2>
				<ul class="y_details_con2rightscrollt">
					<li style="padding:0;">
						<dl>
							<dd style="width:206px;">预期还款时间</dd>
							<dd style="width:206px;">类型</dd>
							<dd style="width:206px;">还款金额(元)</dd>
						</dl>
					</li>
				</ul>
				<div class="y_details_con2rightscroll invet_repayment" style="padding-right:20px;">
					<ul>
						{{#if repment.list}}
				            {{#each repment.list}}
				            	<li style="padding:0;">
									<dl>
										<dd class="y_dd_times" style="width:206px;">
											<span>{{transFormatDate repaymentTime}}</span>
										</dd>
										<dd style="width:206px;padding:0;">{{transFormatStyle ../borrow.style}}</dd>
										<dd style="width:206px;padding:0;">￥{{repaymentAccount}}</dd>
									</dl>
								</li>
				            {{/each}}
			            {{else}}
			            	<li>
								<dl>
									<dd class="y_dd_times"></dd>
				            		<dd><div class='c_nodata' style="margin-left: 150px;margin-top: 140px;"> </div></dd>
				            		<dd></dd>
			            		</dl>
			            	</li
			            {{/if}}
					</ul>
				</div>
				<div id="repaymentkkpager" class="kkpager" style="margin-right:10px;text-align:right;"></div>
			</div>
		</div>
		<div class="y_details_con2right">
			<h2>风险评估</h2>
			<dl class="y_assessmentdls">
				{{#with borrow}}
				<dd>
					<span class="y_assessmentdlstitle">客户等级<em class="hintems"></em></span>
					<span class="startspans startspans{{star}}"><i></i></span>
					<div class="y_tooltips"><在不考虑担保和其他增信措施的前提下，对借款人自身偿债能力和意愿的综合评价，最高★★★★★级、最低☆级，等级越高表示借款人违约概率越小。
						<i></i>
					</div>
				</dd>
				<dd>
					<span class="y_assessmentdlstitle">财务实力<em class="hintems"></em></span>
					<span class="y_assessmentrate"><i style="width:{{financeScore}}%"></i></span>
					<span>{{financeScore}}分</span>
					<div class="y_tooltips"><在不考虑担保和其他增信措施的前提下，对借款人自身偿债能力和意愿的综合评价，最高100分、最低0分，等级越高表示借款人违约概率越小。
						<i></i>
					</div>
				</dd>
				<dd>
					<span class="y_assessmentdlstitle">经营状况<em class="hintems"></em></span>
					<span class="y_assessmentrate"><i style="width:{{statusScore}}%"></i></span>
					<span>{{statusScore}}分</span>
					<div class="y_tooltips"><在不考虑担保和其他增信措施的前提下，对借款人自身偿债能力和意愿的综合评价，最高100分、最低0分，等级越高表示借款人违约概率越小。
						<i></i>
					</div>
				</dd>
				<dd>
					<span class="y_assessmentdlstitle">偿债保障<em class="hintems"></em></span>
					<span class="y_assessmentrate"><i style="width:{{sinkScore}}%"></i></span>
					<span>{{sinkScore}}分</span>
					<div class="y_tooltips"><在不考虑担保和其他增信措施的前提下，对借款人自身偿债能力和意愿的综合评价，最高100分、最低0分，等级越高表示借款人违约概率越小。
						<i></i>
					</div>
				</dd>
				{{/with}}
			</dl>
			<p class="y_assessmentdlsbottom">晋商贷提醒您：投资有风险<a href="javascript:;" class="fengdetail">[详情]</a></p>
			<img src="{{imagepath}}/images/account/weixins.jpg" style="margin-top:22px;margin-bottom:34px;" />
			<h2>积分获奖名单  <a href="/scoreAward/index.html?id={{ruleAward.id}}" target="_blank">活动详情&gt;&gt;</a></h2>
			<ul class="y_details_con2rightscrollt">
					<li>
						<dl>
							<dd>时间</dd>
							<dd>名单</dd>
							<dd>奖品</dd>
						</dl>
					</li>
				</ul>
			<div class="y_details_con2rightscroll">
				<ul>
				
				</ul>
			</div>
		</div>
		<!-- con2   right  end -->
		<div class="c_clear"></div>
	</div>
<!-- 资金托管弹窗 start-->
	<div class="c_similar">
		<div class="c_report_detail">
				<div class="c_risk_descrip">
					<ul class="riskPic">
						
						<div style="clear:both;"></div>
					</ul>
					<div class="c_risk_left"></div>
					<div class="c_risk_right"></div>
				</div>
				<div class="c_risk_close"></div>
			</div>
		<!-- 1 -->
		<div class="c_report_detail">
			<div class="c_risk_descrip">
				<ul class="riskPic">
					
					<div style="clear:both;"></div>
				</ul>
				<div class="c_risk_left"></div>
				<div class="c_risk_right"></div>
			</div>
			<div class="c_risk_close"></div>
		</div>
		<div class="c_report_detail">
			<div class="c_risk_descrip">
				<ul class="riskPic">
					
					<div style="clear:both;"></div>
				</ul>
				<div class="c_risk_left"></div>
				<div class="c_risk_right"></div>
			</div>
			<div class="c_risk_close"></div>
		</div>
		<div class="c_report_detail">
			<div class="c_risk_descrip">
				<ul class="riskPic">
					
					<div style="clear:both;"></div>
				</ul>
				<div class="c_risk_left"></div>
				<div class="c_risk_right"></div>
			</div>
			<div class="c_risk_close"></div>
		</div>
		<div class="c_report_detail">
			<div class="c_risk_descrip">
				<ul class="riskPic">
					
					<div style="clear:both;"></div>
				</ul>
				<div class="c_risk_left"></div>
				<div class="c_risk_right"></div>
			</div>
			<div class="c_risk_close"></div>
		</div>
	</div>
	<div class="c_risk_bj"></div>
	<!-- 资金托管弹窗 end-->