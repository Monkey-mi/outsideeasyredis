package common.visitrecord.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import common.visitrecord.data.VisitRecordMapper;
import common.visitrecord.model.VisitRecord;


@Service
public class VisitRecordService {
	@Autowired
	private VisitRecordMapper mapper;


	public List<VisitRecord> getVisitRecordList(Map<String,Object> params) {
		return mapper.getVisitRecordList(params);
	}
	public void addVisitRecord(List<VisitRecord> recordList) {
		for(VisitRecord obj: recordList) {
			mapper.addVisitRecord(obj);
		}
	}
	public void updateVisitRecord(VisitRecord[] arr) {
		for(VisitRecord obj: arr) {
			mapper.updateVisitRecord(obj);
		}
	}
	public void deleteVisitRecord(VisitRecord[] arr) {
		for(VisitRecord obj: arr) {
			mapper.deleteVisitRecord(obj);
		}
	}
}
