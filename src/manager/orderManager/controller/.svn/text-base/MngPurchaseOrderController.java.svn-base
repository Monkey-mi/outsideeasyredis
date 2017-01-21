package manager.orderManager.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import manager.orderManager.service.MngCommunicationService;
import manager.orderManager.service.MngOrderAgreementFileService;
import manager.orderManager.service.MngOrderAttchedFileService;
import manager.orderManager.service.MngOrderDeliveryNoticedetailsService;
import manager.orderManager.service.MngPurchaseOrderDetailsService;
import manager.orderManager.service.MngPurchaseOrderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import util.WebUtil;

@Controller
@RequestMapping("mngPurchaseOrder")
public class MngPurchaseOrderController {
	@Autowired
	private MngPurchaseOrderService purchaseOrderService;
	@Autowired
	private MngPurchaseOrderDetailsService purchaseOrderDetailsService;
	@Autowired
	private MngOrderAttchedFileService orderAttchedFileService;
	@Autowired
	private MngOrderAgreementFileService orderAgreementFileService;
	@Autowired
	private MngOrderDeliveryNoticedetailsService  orderDeliveryNoticedetailsService;
	@Autowired
	private MngCommunicationService  communicationService;
	
	@RequestMapping(value="/mngPurchaseOrder.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> mngPurchaseOrder(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,purchaseOrderService);
	}
	@RequestMapping(value="/mngPurchaseOrderDetails.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> mngPurchaseOrderDetails(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,purchaseOrderDetailsService);
	}
	@RequestMapping(value="/mngOrderAttchedFile.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> mngOrderAttchedFile(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,orderAttchedFileService);
	}
	@RequestMapping(value="/mngOrderAgreementFile.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> mngOrderAgreementFile(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,orderAgreementFileService);
	}
	@RequestMapping(value="/mngOrderDeliveryNoticedetails.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> mngOrderDeliveryNoticedetails(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,orderDeliveryNoticedetailsService);
	}
	@RequestMapping(value="/mngOrderCommunication.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> mngOrderCommunication(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,communicationService);
	}
}
