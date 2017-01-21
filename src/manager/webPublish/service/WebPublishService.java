package manager.webPublish.service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import common.mongodb.service.FileOptService;

import util.Const;
import util.SessionUtil;

import manager.common.user.model.UserInfo;
import manager.webPublish.data.WebContentFileMapper;
import manager.webPublish.data.WebPublishMapper;
import manager.webPublish.model.WebContentFile;
import manager.webPublish.model.WebPublish;


@Service
public class WebPublishService {
	@Autowired
	private WebPublishMapper mapper;
	@Autowired
	private WebContentFileMapper webContentFileMapper;
	@Autowired
	private FileOptService fileOptService;

	public List<WebPublish> getWebPublishList(Map<String,Object> params) {
		return mapper.getWebPublishList(params);
	}
	public void addWebPublish(Map<String,Object> params) {
		mapper.addWebPublish(params);
	}
	public void updateWebPublish(Map<String,Object> params) {
		params.put("update_dt",new Date());
		mapper.updateWebPublish(params);
	}
	public void deleteWebPublish(Map<String,Object> params) {
		List<WebContentFile> files=webContentFileMapper.getWebContentFileList(params);
		if (files.size()>0) {
			for (WebContentFile file : files) {
				fileOptService.deleteFileByName(file.getMogodb_id());
				webContentFileMapper.deleteWebContentFile(file);
			}
		}
		mapper.deleteWebPublish(params);
	}
	public String getHtml(Map<String, Object> params) throws Exception {
		String string="";
		List<WebPublish> list=getWebPublishList(params);
		if (list.size()>0) {
			string=list.get(0).getContent();
		}
		return string;
	}
}
