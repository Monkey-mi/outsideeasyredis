package common.visitrecord.data;

import java.util.List;
import java.util.Map;

import common.visitrecord.model.VisitRecord;


public interface VisitRecordMapper {
	public List<VisitRecord> getVisitRecordList(Map<String,Object> params);
	public void addVisitRecord(VisitRecord obj);
	public void updateVisitRecord(VisitRecord obj);
	public void deleteVisitRecord(VisitRecord obj);
}
