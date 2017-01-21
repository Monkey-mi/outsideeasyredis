package usercenter.saleManage.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usercenter.saleManage.data.AccessApplicationMetarialMapper;
import usercenter.saleManage.model.AccessApplicationMetarial;

@Service
public class AccessApplicationMaterialService {
	@Autowired
	private AccessApplicationMetarialMapper mapper;
	
	public List<AccessApplicationMetarial> getAccessApplicationMetarialList(Map<String, Object>params){
		return mapper.getAccessApplicationMetarialList(params);
	}
	public void addAccessApplicationMaterial(Map<String, Object>params){
		mapper.addAccessApplicationMetarial(params);
	}
	public void updateAccessApplicationMaterial(Map<String, Object>params){
		mapper.updateAccessApplicationMetarial(params);
	}
	public void deleteAccessApplicationMaterial(Map<String, Object>params){
		mapper.deleteAccessApplicationMetarial(params);
	}	
	public void deleteAccessApplicationMetarialByRI(Map<String, Object>params){
		mapper.deleteAccessApplicationMetarialByRI(params);
	}	
	public void deleteAccessApplicationMaterials(Map<String, Object>params){
		Map<String, Object> map1=new HashMap<String, Object>();
		if (!"".equals(params.get("mateial_ids").toString())) {
			String arrayStr=params.get("mateial_ids").toString();
			String[] arrayId=arrayStr.split(",");
			for(int i=0;i<arrayId.length;i++){
				map1.put("materialId", arrayId[i]);
				mapper.deleteAccessApplicationMetarial(map1);
			}
		}
	}
	@SuppressWarnings("unchecked")
	public void addOrUpdateAccessApplicationMaterial(String materialInfo,Integer recordId,Integer access_status,Integer supplier_id) throws Exception{
		//java json字符创解析为json对象
		materialInfo = "["+ materialInfo +"]";
		JSONArray materialArray = JSONArray.fromObject(materialInfo);
		for(int i = 0; i<materialArray.size(); i++){
			Map<String, Object> addParams = new HashMap<String, Object>();//新增的数据集合
			Map<String, Object> updateParams = new HashMap<String, Object>();//新增的数据集合
			JSONObject materialJsonObject = materialArray.getJSONObject(i);
			if("".equals(materialJsonObject.get("materialBrand").toString()) && "".equals(materialJsonObject.get("materialName").toString())){
				if(!"-1".equals(materialJsonObject.get("materialId").toString())){//原有的记录，置为空，则将此条记录删除
					deleteAccessApplicationMaterial(materialJsonObject);
				}
			}else if("-1".equals(materialJsonObject.get("materialId").toString())||access_status==0){
				addParams = materialJsonObject;//将数据添加到map中  JSONObject为实现了Map接口，所以直接上转型赋值即可
				addParams.put("record_id", recordId);
				addParams.put("supplier_id", supplier_id);
				addAccessApplicationMaterial(addParams);
			}else{
				updateParams=materialJsonObject;
				updateParams.put("record_id", recordId);
				updateAccessApplicationMaterial(updateParams);
			}
		}
	}
}
