/**    
 * 文件名：SaleManageTest.java    
 *    
 * 版本信息：    
 * 日期：2016-7-28    
 * Copyright 足下 Corporation 2016     
 * 版权所有    
 *    
 */
package test.usercenter.saleManage;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import test.base.BaseTest;
import usercenter.saleManage.data.CheckfactoryReportMapper;
import usercenter.saleManage.model.AccessApplicationCategory;
import usercenter.saleManage.model.CheckfactoryReport;
import usercenter.saleManage.service.AccessApplicationCategoryService;
import usercenter.saleManage.service.AccessTempletHeadService;
import usercenter.saleManage.tradeManager.service.OrderDeliveryNoticeService;
import usercenter.supplierFiles.data.SupplierTagInfoMapper;
import usercenter.supplierFiles.data.SupplierTagMapper;
import usercenter.supplierFiles.model.SupplierTagInfo;

/**    
 *     
 * 项目名称：outsideeasy    
 * 类名称：SaleManageTest    
 * 创建人：mishengliang    
 * 创建时间：2016-7-28 下午2:52:46    
 * 修改人：mishengliang 
 * 修改时间：2016-7-28 下午2:52:46    
 *     
 */
public class SaleManageTest extends BaseTest {
	@Autowired
	private CheckfactoryReportMapper checkFackMapper;
	@Autowired
	private SupplierTagMapper tagMapper;
	@Autowired
	private SupplierTagInfoMapper tagSupplierMapper;
	@Autowired
	private AccessTempletHeadService accessTempletHeadService;
	@Autowired
	private AccessApplicationCategoryService accessApplicationCategoryService;
	@Autowired
	private OrderDeliveryNoticeService orderDeliveryNoticeService;
	
	/**
	 * 获取验厂报告
	*getCheckfactoryReportList
	*void
	*@author mishengliang
	*2016-7-28下午2:56:45
	 */
	@Test
	public void getCheckfactoryReportList(){
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("supplier_id", 6);
		//params.put("limit_num", 1);
		
		List<Map<String, Object>> checkFacList = checkFackMapper.getCheckfactoryReportAndcheckCycleList(params);
		logger.debug("message:" + checkFacList);
	}
	
	/**
	 * @Description: 账号下的标签内容
	 * SaleManageTest
	 * getTagContentList void
	 * @author mishengliang
	 * 2016-8-5 上午10:23:48
	 */
	@Test
	public void getTagContentList(){
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("accountId", 10000);
		
		List<Map<String, Object>> list = tagMapper.getSupplierTagListForAccount(params);
		logger.debug(list);
	}
	
	/**
	 * @Description: 供应商拥有的标签内容
	 * SaleManageTest
	 * getSupplierTag void
	 * @author mishengliang
	 * 2016-8-5 上午10:23:45
	 */
	@Test
	public void getSupplierTag(){
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("supplierId", 6);
		
		List<SupplierTagInfo> list = tagSupplierMapper.getSupplierTag(params);
		logger.debug(list);
	}
	
	@Test
	public void getHid(){
		Integer hid = accessTempletHeadService.getHID(9999);
		logger.debug("wuli:"+hid);
	}
	
	@Test
	public void getAccessApplicationCategoryListTest(){
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("record_id", 130);
		params.put("supplier_id", 198);
		List<AccessApplicationCategory> list = accessApplicationCategoryService.getAccessApplicationCategoryList(params);
		logger.debug("*******************"+list);
	}
	
	@Test
	public void orderDeliveryNoticeService(){
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("noticeId", 24);
		Integer mStatu = orderDeliveryNoticeService.getDeliveryStatu(params);
		logger.debug("******"+mStatu);
	}
}
