package usercenter.saleManage.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usercenter.saleManage.data.AccessInvoiceTitleMapper;
import usercenter.saleManage.model.AccessInvoiceTitle;
@Service
public class AccessInvoiceTitleService {
	@Autowired
	private AccessInvoiceTitleMapper mapper;
	
	public List<AccessInvoiceTitle> getAccessInvoiceTitleList(Map<String, Object>params) {
		return mapper.getAccessInvoiceTitleList(params);
	}
	public void addAccessInvoiceTitle(Map<String, Object>params){
		mapper.addAccessInvoiceTitle(params);
	}
	public void deleteAccessInvoiceTitle(Map<String, Object>params){
		mapper.deleteAccessInvoiceTitle(params);
	}
	public void deleteAccessInvoiceTitleByRI(Map<String, Object>params){
		mapper.deleteAccessInvoiceTitleByRI(params);
	}
	public void deleteAccessInvoiceTitles(Map<String, Object>params){
		String arrayStr=params.get("invoice_title_ids").toString();
		String[] arrayinvoice_title_id=arrayStr.split(",");
		for(int i=0;i<arrayinvoice_title_id.length;i++){
			params.put("invoice_title_id", arrayinvoice_title_id[i]);
			mapper.deleteAccessInvoiceTitle(params);
		}
	}
}
