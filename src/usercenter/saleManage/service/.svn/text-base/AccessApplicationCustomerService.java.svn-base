package usercenter.saleManage.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usercenter.saleManage.data.AccessApplicationCustomerMapper;
import usercenter.saleManage.model.AccessApplicationCustomer;


@Service
public class AccessApplicationCustomerService {
	@Autowired
	private AccessApplicationCustomerMapper mapper;

	public List<AccessApplicationCustomer> getAccessApplicationCustomerList(Map<String,Object> params) {
		return mapper.getAccessApplicationCustomerList(params);
	}
	public void addAccessApplicationCustomer(Map<String,Object> params) {
			mapper.addAccessApplicationCustomer(params);
	}
	public void updateAccessApplicationCustomer(Map<String,Object> params) {
			mapper.updateAccessApplicationCustomer(params);
	}
	public void deleteAccessApplicationCustomer(Map<String,Object> params) {
			mapper.deleteAccessApplicationCustomer(params);
	}
	public void deleteAccessApplicationCustomerByRI(Map<String,Object> params) {
		mapper.deleteAccessApplicationCustomerByRI(params);
	}
	public void deleteAccessApplicationCustomers(Map<String,Object> params) {
		Map<String, Object> map=new HashMap<String, Object>();
		if (!"".equals(params.get("customer_ids").toString())) {
			String arrayStr=params.get("customer_ids").toString();
			String[] arrayId=arrayStr.split(",");
			for(int i=0;i<arrayId.length;i++){
				map.put("customerId", arrayId[i]);
				mapper.deleteAccessApplicationCustomer(map);
			}
		}
	}
	@SuppressWarnings("unchecked")
	public void addOrUpdateAccessApplicationCustomer(String customerInfo,Integer recordId,Integer access_status,Integer supplier_id) throws Exception{
		// TODO Auto-generated method stub
		customerInfo = "["+ customerInfo +"]";
		JSONArray customerArray = JSONArray.fromObject(customerInfo);
		System.out.println(customerArray);
		for(int i = 0; i<customerArray.size(); i++){
			Map<String, Object> addParams = new HashMap<String, Object>();//新增的数据集合
			Map<String, Object> updateParams = new HashMap<String, Object>();//新增的数据集合
			JSONObject customerJsonObject = customerArray.getJSONObject(i);
			if("".equals(customerJsonObject.get("customerName").toString())){
				if(!"-1".equals(customerJsonObject.get("customerId").toString())){//原有的记录，置为空，则将此条记录删除
					deleteAccessApplicationCustomer(customerJsonObject);
				}
			}else if("-1".equals(customerJsonObject.get("customerId").toString())||access_status==0){
				addParams = customerJsonObject;//将数据添加到map中  JSONObject为实现了Map接口，所以直接上转型赋值即可
				addParams.put("record_id", recordId);
				addParams.put("supplier_id", supplier_id);
				addAccessApplicationCustomer(addParams);
			}else{
				updateParams=customerJsonObject;
				updateParams.put("record_id", recordId);
				updateAccessApplicationCustomer(updateParams);
			}
		}
	}
}
