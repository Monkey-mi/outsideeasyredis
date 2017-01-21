package usercenter.saleManage.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usercenter.saleManage.data.AccessApplicationAttchedMapper;
import usercenter.saleManage.model.AccessApplicationAttched;

import common.mongodb.service.FileOptService;

@Service
public class AccessApplicationAttchedService {
	@Autowired
	private AccessApplicationAttchedMapper mapper;
	@Autowired
	private FileOptService fileService;
	
	public void addAccessApplicationAttched(Map<String, Object>params){
		mapper.addAccessApplicationAttched(params);
	}
	public void deleteAccessApplicationAttchedByRI(Map<String, Object>params){
		mapper.deleteAccessApplicationAttchedByRI(params);
	}
	public void delAccessApplicationAttched(Map<String, Object>params){
		mapper.deleteAccessApplicationAttched(params);
	}
	public List<AccessApplicationAttched> getAccessApplicationAttched(Map<String, Object>params){
		return mapper.getAccessApplicationAttchedList(params);
	}
	public void updateAccessApplicationAttched(Map<String, Object>params){
		mapper.updateAccessApplicationAttched(params);
	}
	public List<AccessApplicationAttched> getAllAccessAttched(
			Map<String, Object> params) {
		return mapper.getAllAccessAttched(params);
	}
	public void delAccessApplicationAttcheds(Map<String, Object> params) {
		Map<String , Object> map=new HashMap<String, Object>();
		if (!"".equals(params.get("delFileIds").toString()) && params.get("delFileIds").toString()!=null) {
			String arrayStr=params.get("delFileIds").toString();
			String[] arrayfile_id=arrayStr.split(",");
			for(int i=0;i<arrayfile_id.length;i++){
				map.put("id", arrayfile_id[i]);
				/*List<AccessApplicationAttched>attcheds=getAccessApplicationAttched(map);
				if (attcheds.size()>0) {
					AccessApplicationAttched attched=attcheds.get(0);
					if(attched.getMogodb_id() != null){
						String filename = attched.getMogodb_id();		
						fileService.deleteFileByName(filename);
					}
				}*/
				delAccessApplicationAttched(map);
			}
		}
	}
	public void delUselessAttched(Map<String, Object> params) {
		List<AccessApplicationAttched>list=getAccessApplicationAttched(params);
		for (AccessApplicationAttched attched : list) {
			if(attched.getMogodb_id() != null){
				String filename = attched.getMogodb_id();		
				fileService.deleteFileByName(filename);
			}
			params.put("id", attched.getId());
			delAccessApplicationAttched(params);
		}
	}
	public void updateAccessApplicationAttchedMogoId(Map<String, Object> params) {
		mapper.updateAccessApplicationAttchedMogoId(params);
	}
}
