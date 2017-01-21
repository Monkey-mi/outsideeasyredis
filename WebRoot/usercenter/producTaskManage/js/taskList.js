	var pageSize=10;//每页个数
	var currentPage;//当前页码
	var sel_state_index=0;//状态下标:默认刚进入时未全部任务单
	var select_type;//下拉日期类型
	var start_filter_date;//开始日期
	var end_filter_date;//截止日期
	var search_text;//查询文本
	var order_partten = null;//单位排序
	var order_flag = null;//正负排序
	var companyId = getParamFromWindowName("companyIdForAll");//公司ID 切换的公司id
	/**注册监听事件*/
	function initListen(){
		$("#select_date_type").change(function(){
			select_type=$("#select_date_type").val();
		});
		$("#search_text").change(function(){
			search_text=$("#search_text").val().trim();
		});
	}
	function pickedFunc1(){
		start_filter_date=$("#start_filter_date").val();
	}
	function pickedFunc2(){
		end_filter_date=$("#end_filter_date").val();
	}
	function clearingFunc1(){
		start_filter_date=null;
	}
	function clearingFunc2(){
		end_filter_date=null;
	}
	/**初始化输入框等数据*/
	function initInputFileld(){
		currentPage=0;
		select_type=1;
		order_partten = null;//单位排序		
		order_flag = null;//正负排序
		sel_state_index=sel_state_index;
		$("#start_filter_date").val(null);
		$("#end_filter_date").val(null);
		$("#search_text").val(null);
	}
	/**执行查询*/
	function dosearch(allIndex){		
		InitData(0,true);
	}
	/**选择一个新的状态,
	 * 重置分页工具加载数据，并"高亮"选中状态
		index：状态下标
	*/
	function showInfo(index){		
			sel_state_index=index;
			search_text = "";
			end_filter_date ="";
			start_filter_date ="";	
			dosearch();
			initInputFileld();
			reselstate(index);	
			//读取并显示各项任务单的数量
			showCountForEachStateTask();
	}
	/**
    	分页获取数据
    	pageIndex：当前页索引
    	needinit：是否为第一次加载
    */
    function InitData(pageIndex,needinit)
	{
		currentPage=pageIndex;
		var url="externalTask/getTaskListForProducer.do";
		var params={};
		params.state=sel_state_index;
		
		if(select_type!=null){
			params.select_type=select_type;
		}
		if(select_type!=null && start_filter_date!=null ){
			params.start_filter_date=start_filter_date;
		}
		if(select_type!=null && end_filter_date!=null){
			params.end_filter_date=end_filter_date;
		}
		if(order_partten!=null ){
			params.order_partten = order_partten;
		}
		if(order_flag!=null){
			params.order_flag = order_flag;
		}
		params.search_text=search_text;
		params.usePaging=true;
		params.page=pageIndex;
   		params.limit=pageSize;
   		params.company_id = companyId;
   		params.start=parseInt(pageIndex)*pageSize;
   		var fn=function(result){
   			if(pageIndex==0 && needinit){
   				//第一次加载时加载分页控件
   				initPagination(result.total);
   			}
   			//显示数据到表格
   			addItem(result.data);
   			//$("#show_current_task_num").html(result.total+"条记录");
   		};
   		asyncAjaxMethod(url,params,true,fn);
   		
	}
	/**初始化分页控件
	*/
	function initPagination(totalCount){
		$("#pagination").pagination(totalCount, {
             callback: pageselectCallback,
             prev_text: "<",
             next_text: ">",
             items_per_page: pageSize, //每页的数据个数
             num_display_entries: 3, //两侧首尾分页条目数
             current_page: 0,   //当前页码
             num_edge_entries: 2 //连续分页主体部分分页条目数
         });
    }
	/**翻页调用  
	*/
	function pageselectCallback(index,jq)
	{
		InitData(index,false);
	}
	/**按照下标，"高亮"选中状态
	*/
	function reselstate(index){
		$(".tasklist_tab").children(".curr").removeClass("curr");
		$(".tasklist_tab").children().eq(index).addClass("curr");
		$(".tasklist_tab").children().find("span.split").css("display","inline");
//		$(".tasklist_tab").children().eq(index).prev().find("span.split").css("display","none");
	}
	/**显示数据到表格 
	*/
	function addItem(array){
		$("#mainTbody").html("");
		if(array==null || array.length==0){
			return;
		}
		var tableItem="";
		for(var i=0;i<array.length;i++){
			var task=array[i];

			tableItem =tableItem
						+"<tr height='26' bgcolor='#fbebc9'  class='task_num'>"
							+"<td colspan='7'>"
									+"<input type='checkbox' onClick='selectSingle()' value="+task.t_id+"></input>"
									+"<div class='inline_block ml8'>任务单流水号 <span style='color:#0072c4'>"+replaceNullAsStr(task.serial_no)+"</span></div>"
									+"<div class='inline_block ml20'>&nbsp;&nbsp;内部任务单号 <span style='color:#0072c4'>"+replaceNullAsStr(task.rwdh)+"</span></div>"
									+"<div class='inline_block ml20'>&nbsp;&nbsp;订单号 <span style='color:#0072c4' class='mr20'>"+replaceNullAsStr(task.ddh)+"</span>&nbsp;&nbsp;生产单号 <span style='color:#0072c4'>"+replaceNullAsStr(task.scdh)+"</span></div>"
									+"<div class='inline_block ' style='float:right;'>派单时间:"+replaceNullAsStr(task.send_time)+"</div>"
							+"</td>"
						+"</tr>"
						+"<tr height='80' class='task_info'>"
							+"<td class='border_left'>";
							if(task.product_pic != null){
								tableItem =tableItem+"<div class='posR'><span class='inline-block productName' onmouseover='showBigImage(this,\""+replaceNullAsStr(task.product_pic)+"\")'  onmouseout='hideBigImage(this)'>"+replaceNullAsStr(task.product_name)+"</span></div>";
							}else{
								tableItem =tableItem+"<div class='posR'><span class='inline-block' >"+replaceNullAsStr(task.product_name)+"</span></div>";
							}
							tableItem =tableItem+"</td>"
							+"<td class='border_left'>"
								+"<div>总数"
									+task.total_qty+"个<br> <span style='color:#86c610'>"
									+task.produced_qty+"</span> 个完工  <br> <span style='color:#f1af27'>"
									+task.qualified_qty+"</span> 个交货"
								+"</div>"
							+"</td>"
							+"<td class='border_left' >"
								+showBeforeOfDateStr(task.plan_start)
							+"</td>"
							+"<td class='border_left'>"
								+showBeforeOfDateStr(task.plan_complete)
							+"</td>"
							+"<td class='border_left' >"
								+replaceNullAsStr(task.send_company_name)+"<br/><div class='team'>"+replaceNullAsStr(task.bzmc)+"</div>"
							+"</td>"
							+"<td class='border_left'>"
								+showstate(task)
							+"</td>"
							+"<td class='border_left border_right'>"
								+showOperateByTask(task)
							+"</td>"
						+"</tr>";
			
		}
		$("#mainTbody").html(tableItem);
	}
	/**按照状态位显示状态
	*/
	function showstate(task){
		var result;
		switch(task.state){
			case 10:
				result="等待接受";
				break;
			case 15:
				var product = task.produced_qty/task.total_qty*100;
				if(product>100){
					product =100;
				}
				var percent=Math.ceil(product)+"%";
				result="生产中("+percent+")<br/>";
				if(task.unReceivedlogisticsVoCount>0){
					result=result+"来料待收<br/>";
					result=result+"<a class='maincolor' onclick='gologistics("+task.t_id+")'>"+task.unReceivedlogisticsVoCount+"条来料待收</a>";
				}else if(task.ReceivedlogisticsVoCount>0){
					result=result+"来料已收";
				}
				break;
			case 20:
				result="在验收";
				if(task.unReceivedlogisticsVoCount>0){
					result=result+"<br/>来料待收<br/>";
					result=result+"<a class='maincolor' onclick='gologistics("+task.t_id+")'>"+task.unReceivedlogisticsVoCount+"条来料待收</a>";
				}else if(task.ReceivedlogisticsVoCount>0){
					result=result+"<br/>来料已收";
				}
				break;
				break;
			case 25:
				result="已完结";
				break;
			case 40:
				result="已终止";
				break;
			default:
				result="异常";
				break;
		}
		return result;
	}
	/**根据任务单信息，显示可进行的操作
	 *例如：+"<span class='task_link_font'>取消 &nbsp;<a class='task_link_font' href='taskInfo.html'>详情 </a></span>"
	*/
	function showOperateByTask(task){
		var result="";
		switch(task.state){
			case 10://等待接收
				result="<span>"
				+"<a class='task_link_font' href='javascript:void(0)' onclick='acceptOrder("+task.t_id+",\""+task.rwdh+"\")'>接受任务</a>"
				+"<a class='task_link_font ml10' onClick='gotaskinfo("+task.t_id+")'>详情 </a>"
				+"</span>";
				break;
			case 15://在生产
				result="<span>"
					+"<a class='task_link_font' onclick='gologistics("+task.t_id+")'>物料信息</a>"
					+"<a class='task_link_font ml10' onclick='goproducts("+task.t_id+")'>产量录入</a>"
				+"</span><br/>"
				+"<span>"
				+"<a class='task_link_font ' onclick='goQualityControl("+task.t_id+")'>质检信息</a>"
				+"<br/>"
				+"<a class='task_link_font'  onClick='gotaskinfo("+task.t_id+")'>详情 </a>"
				+"<a class='task_link_operate ml30' onClick='downloadAllTaskFileForZip("+task.t_id+",\""+task.scdh+"\")'>一键下载 </a>"
				+"</span>";
				break;
			case 20://在验收
				result="<span>"
				+"<a class='task_link_font' onclick='godelevils("+task.t_id+")'>送货信息</a>"
				+"<a class='task_link_font ml10' onclick='goQualityControl("+task.t_id+")'>质检信息</a>"
				+"<br/>"
				+"<a class='task_link_font ' onClick='gotaskinfo("+task.t_id+")'>详情 </a>"
				+"<a class='task_link_operate ml30' onClick='downloadAllTaskFileForZip("+task.t_id+",\""+task.scdh+"\")'>一键下载 </a>"
				+"</span>";
				break;
			case 25://已完结
				result="<span>"
				+"<a class='task_link_font' onclick='goQualityControl("+task.t_id+")'>质检信息</a>"
				+"<br/>"
				+"<a class='task_link_font ' onClick='gotaskinfo("+task.t_id+")'>详情 </a>"
				+"<a class='task_link_operate ml30' onClick='downloadAllTaskFileForZip("+task.t_id+",\""+task.scdh+"\")'>一键下载 </a>"
				+"</span>";				
				break;
			case 40://已终止
				result="<span>";			
			    result=result+"<a class='task_link_font '  onClick='gotaskinfo("+task.t_id+")'>详情 </a>";
			    result=result+"<a class='task_link_operate ml10' href='javascript:void(0)' onclick='showEndReason("+task.t_id+")'>终止原因</a>";
			    +"</span>";
				break;
			default:
				break;
		}
		return result;
	}
	/**读取并显示各种状态任务单的数量
	 * */
	function showCountForEachStateTask(){
		var url="externalTask/getProducerTaskCountOfAllState.do";
		var params={company_id:companyId};
   		var fn=function(result){
   			var vo=result.data;
   			$(".tasklist_tab").children().eq(0).children().first().html("全部任务单("+(vo.all-vo.toBeSend-vo.stoped)+")");
   			$(".tasklist_tab").children().eq(1).children().first().html("待接收任务("+vo.sended+")");
   			$(".tasklist_tab").children().eq(2).children().first().html("在生产任务("+vo.producting+")");
   			$(".tasklist_tab").children().eq(3).children().first().html("在验收任务("+vo.finishproduct+")");
   			$(".tasklist_tab").children().eq(4).children().first().html("已完结任务("+vo.taskOver+")");
   			$(".tasklist_tab").children().eq(5).children().first().html("异常任务("+vo.ended+")");
   		};
   		asyncAjaxMethod(url,params,true,fn);
	}
	/**接受任务
	 * t_id*/
	function acceptOrder(t_id,rwdh){
		window.wxc.xcConfirm("您是否确认接收任务单"+rwdh, window.wxc.xcConfirm.typeEnum.confirm,
		{
			onOk:function(){
				var url="externalTask/updateTaskState2producting.do";
				var params={};
				params.t_id=t_id;
		   		var fn=function(result){
		   			if(result.message=="任务单当前状态不是等待接收"){
		   				xcconfirm=new window.wxc.xcConfirm(result.message,window.wxc.xcConfirm.typeEnum.infoNobtn);
		   				closeBytimeCount_list(2);	   				
		   			}if(result.message=="任务单当前状态已接收"){
		   				xcconfirm=new window.wxc.xcConfirm(result.message,window.wxc.xcConfirm.typeEnum.infoNobtn);
		   				closeBytimeCount_list(2);	   				
		   			}else if(result.message=="成功"){
		   			//刷新当前页
						InitData(currentPage,false);
						$('#all_select').prop("checked", false);
		   			}
		   			
		   		};
		   		asyncAjaxMethod(url,params,true,fn);
				
			}
		});
	}
	/**一键下载所有任务单的相关文件
	 * t_id*/
	function downloadAllTaskFileForZip(t_id,scdh){	
//		 var form = $("<form>");   //定义一个form表单
//         form.attr('style', 'display:none');   //在form表单中添加查询参数
//         form.attr('target', '');
//         form.attr('method', 'post');
//         form.attr('action', "/QuestionInfo/DowmLoad");
//
//         var input1 = $('<input>');
//         input1.attr('type', 'hidden');
//         input1.attr('name', 'strUrl');
//         input1.attr('value', strUrl);
//         $('body').append(form);  //将表单放置在web中
//         form.append(input1);   //将查询参数控件提交到表单上
//         form.submit(); 
		var url="taskFile/downloadAllTaskFileForZip.do?t_id=";		
		//window.open(getwebroot()+url+t_id+"&scdh="+scdh,"newwindow","height=400,width=400,top=0,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no");
		window.location.href = getwebroot()+url+t_id+"&scdh="+scdh;
	}
	
	/**
	 * 单选
	* selectSingle
	* @return void
	* @author chenlong
	* 2016-9-26
	 */
	function selectSingle() {
		var chknum =  $("#mainTbody").find(":checkbox").size();//选项总个数 
		var chk = 0;
		$("#mainTbody").find(":checkbox").each(function() {
			if ($(this).is(":checked")) {			
				chk++;		
			}
		});
		if (chknum == chk) {//全选 
			$('#all_select').prop("checked", true);
		} else {//不全选 
			$('#all_select').prop("checked", false);
		}	
	}
	/**
	 * 多选
	* selectAll
	* @return void
	* @author chenlong
	* 2016-9-26
	 */
	function selectAll(){
		if($("#all_select")[0].checked){    
	        $("#mainTbody").find(":checkbox").each(function(){
				$(this).prop("checked", true); 
			});   
	    }else{    
	    	$("#mainTbody").find(":checkbox").each(function(){
				$(this).prop("checked", false); 
			});
	    }
	}
	/**
	 * 批量收回任务单
	* recoverOrderLsit
	* @return void
	* @author chenlong
	* 2016-9-26
	 */
	function acceptOrderLsit(){
		var param = [];
		var id = 0;
		var count =0;
		$("#mainTbody").find(":checkbox").each(function(){
				if ($(this).is(":checked")) {
				id = $(this).val();
				param.push(id); 
				count++;
				}
			});
		if(count>0){
			window.wxc.xcConfirm("确认要接收选中的这"+count+"条任务单", window.wxc.xcConfirm.typeEnum.confirm,
			{
			onOk:function(){
		    var tidlist = param.join(",");
		    var url="externalTask/updateTaskState2productingList.do";
			var params={tidlist:tidlist,count:count};
	   		var fn=function(result){
	   			xcconfirm=new window.wxc.xcConfirm(result.message,window.wxc.xcConfirm.typeEnum.infoNobtn);
	   			closeBytimeCount_list(2);
	   		};
	   		asyncAjaxMethod(url,params,true,fn); 
			}								
			});	
		 }else{
		    var option ={title:"提示",btn:parseInt("0001",2)};
		    window.wxc.xcConfirm('未选中一条任务单', window.wxc.xcConfirm.typeEnum.custom,option);
		}
	}
	/**弹框取消原因
	 * t_id
	 */
	function showStopReason(stopreason){
		window.wxc.xcConfirm(stopreason, window.wxc.xcConfirm.typeEnum.info);
	}
	/*
	 * 弹出框两秒后自动关闭效果
	 * params：num 计时器秒数
	 * author：yangliping
	 * create_dt:2016年5月26日11:28:37
	 * */
	function closeBytimeCount_list(num)
	{
		time_c=num;
		time_c=time_c-1;
		if(time_c>=0)
		{
			setTimeout("closeBytimeCount_list(time_c)",1000);
		}
		else
		{
			xcconfirm.xcClose();
			//刷新当前页
			InitData(currentPage,false);
			$('#all_select').prop("checked", false);
		}
	}
	/**
	 * 物流信息的接入
	 * @param id
	 */
	function gologistics(id){
		var param ={"task_id":id};
		addParamsToWindowName(param);
		window.location.href=getwebroot()+"externalTask/producLogisticsInfo/"+id+".htm";
	}
	/**
	 * 任务单页面的接入
	 * @param id
	 */
	function gotaskinfo(id){
		var param ={"task_id":id};
		addParamsToWindowName(param);
		window.location.href=getwebroot()+"externalTask/producTaskInfo/"+id+".htm";
	}
	/**
	 * 生产单页面的接入
	 * @param id
	 */
	function goproducts(id){
		var param ={"task_id":id};
		addParamsToWindowName(param);
		window.location.href=getwebroot()+"externalTask/producProductionInfo/"+id+".htm";
	}
	/**
	 * 质检单页面的接入
	 * @param id
	 */
	function godelevils(id){
		var param ={"task_id":id};
		addParamsToWindowName(param);
		window.location.href=getwebroot()+"externalTask/producDeliveredInfo/"+id+".htm";
	}
	
	/**链接到质检信息页面
	 * goQualityControl
	 * @param id void
	 * @author wangjialin
	 * 2017-1-6 下午2:36:30
	 */
	function goQualityControl(id){
		var param ={"task_id":id};
		addParamsToWindowName(param);
		window.location.href=getwebroot()+"externalTask/producQualityControl/"+id+".htm";
	}
	/**鼠标经过显示大图
	 * showBigImage
	 * @param e void
	 * @author wangjialin
	 * 2016-11-24 下午5:59:24
	 */
	function showBigImage(e,product_pic){
		if(product_pic != ''){
			newsrc=getwebroot()+"taskFile/downLoadFileFormMongoForProducer.do?file="+product_pic;		
			var obj=$("#bigImage");
			obj.find(".imgFrame img").prop("src",replaceNullAsStr(newsrc));
			$(e).parent().append(obj);
			var len=$(e).width();
			$(e).next().css("left",len);
			$(e).next().show();
		}
	}
	/**鼠标离开隐藏大图
	 * hideBigImage
	 * @param e void
	 * @author wangjialin
	 * 2016-11-24 下午5:59:44
	 */
	function hideBigImage(e){
		var obj=$(e).next();
		$("#bigImageWrap").append(obj);
		$(e).next().remove();
	}
	/**
	 * 切换选中的状态
	* byOrderFocus
	* @param flag
	* @param e
	* @param name_flag
	* @return void
	* @author chenlong
	* 2016-11-28
	 */
function byOrderFocus(flag,e,name_flag){	
	order_flag = flag;
	if(flag){
		if($(e).find("img").prop("src").indexOf("/newresources/images/tasks/up-gray.png")>0){
		    $(e).find("img").prop("src","/newresources/images/tasks/up-hover.png");
		    $(e).next().find("img").prop("src","/newresources/images/tasks/down-gray.png");	
		    order_partten = name_flag;
		}else{
			$(e).find("img").prop("src","/newresources/images/tasks/up-gray.png");
			order_partten = null;
		}
	}else{
		if($(e).find("img").prop("src").indexOf("/newresources/images/tasks/down-gray.png")>0){
		    $(e).find("img").prop("src","/newresources/images/tasks/down-hover.png");
		    $(e).prev().find("img").prop("src","/newresources/images/tasks/up-gray.png");
		    order_partten = name_flag;
		}else{
			$(e).find("img").prop("src","/newresources/images/tasks/down-gray.png");
			order_partten = null;
		}
	}
	$(e).parent().parent().siblings().find(".byOrder img:eq(0)").prop("src","/newresources/images/tasks/up-gray.png");
	$(e).parent().parent().siblings().find(".byOrder img:eq(1)").prop("src","/newresources/images/tasks/down-gray.png");
	InitData(currentPage,false);
	$('#all_select').prop("checked", false);
}
	/**
	 * 弹出层效果
	 * pop_div_show
	 * @param id void
	 * @author yangliping
	 * 2016-7-4 10:38:15
	 */
	function pop_div_show(id)
	{
		$("#pop_mask").fadeIn("fast");
		$("#"+id).fadeIn("fast");
	}

	/**
	 * 关闭弹出层
	 * pop_div_close
	 * @param id 
	 * @return void
	 * @author yangliping
	 * 2016-7-4 10:38:15
	 */
	function pop_div_close(id){
		$("#pop_mask").fadeOut("fast");
		$("#"+id).fadeOut("fast");
	}
	function comfirmAbort(id){
		pop_div_show("comfirmAbort");
	}
	/**
	 * 查看终止原因
	* showEndReason
	* @return void
	* @author chenlong
	* 2016-11-25
	 */
	function showEndReason(id){
		var url = "externalTask/getTaskEndRecord.do";
		var params ={t_id:id};
		var fn = function(result){	
			var data = result.data.taskFile;
			var item ="无";
			if(data != null){
				item=data.file_name+data.suffix_name;					
			}	
			pop_div_show("comfirmAbort");
			$("#end_result").html(replaceNullAsStr(result.data.taskEndRecord.end_description));				    
			$("#end_file").html('<a class="blue" onClick = "LoadFileinfo('+data.tf_id+')">'+item+'</a>');	
		};
		asyncAjaxMethod(url,params,true,fn);		
	}
	/**
	 * 下载终止协议
	* LoadFileinfo
	* @param tf_id
	* @return void
	* @author chenlong
	* 2016-8-24
	 */
	function LoadFileinfo(a_id){
		var params = {tf_id:a_id};
		var url = "taskFile/getTaskFileForProducer.do";
		var fn= function(result){
			if(result.data!=null){
				var filename = result.data.object_id;
				window.open(getwebroot()+'taskFile/downLoadFileFormMongoForProducer.do?file='+filename, 'newwindow','height=400,width=400,top=0,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');	
			}else{
				window.wxc.xcConfirm("不存在文件,请联系管理员");
			}	
		};
		asyncAjaxMethod(url,params,true,fn); 		
	}
