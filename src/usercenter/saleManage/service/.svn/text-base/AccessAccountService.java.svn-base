package usercenter.saleManage.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usercenter.saleManage.data.AccessAccountMapper;
import usercenter.saleManage.model.AccessAccount;
@Service
public class AccessAccountService {
	@Autowired
	private AccessAccountMapper mapper;
	
	
	public List<AccessAccount> getAccessAccountList(Map<String, Object>params) {
		return mapper.getAccessAccountList(params);
	}
	
	public void addAccessAccount(Map<String, Object>params){
		 mapper.addAccessAccount(params);
	}
	public void deleteAccessAccount(Map<String, Object>params){
		 mapper.deleteAccessAccount(params);
	}
	public void deleteAccessAccountByRI(Map<String, Object>params){
		mapper.deleteAccessAccountByRI(params);
	}
	public void updateAccessAccount(Map<String, Object>params){
		 mapper.updateAccessAccount(params);
	}
	public void deleteAccessAccounts(Map<String, Object>params){
		String arrayStr=params.get("account_ids").toString();
		String[] arrayaccount_id=arrayStr.split(",");
		for(int i=0;i<arrayaccount_id.length;i++){
			params.put("account_id", arrayaccount_id[i]);
			mapper.deleteAccessAccount(params);
		}
	}
}
