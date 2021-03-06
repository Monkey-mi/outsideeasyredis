package usercenter.externalTask.TaskResponse;

import java.util.Date;
/**
 * 质检信息的列表
 * @author chenlong
 *
 */
public class QcVo {
	private int			qc_id;//质检信息主键
	private int			t_id;//任务列表主键
	private int			record_id;//物流记录主键
	private String			qc_goods;//质检货物
	private String			qc_operator;//质检方
	private double		unqualified_no;//不合格品数量
	private String			qc_remark;//质检说明
	private String			is_product;//是否产成品
	private String			qc_file;//附件
    private Date            qc_time;//质检时间
    private String            send_id;//批次号
    private double        qc_count;//质检数量
    private double        qc_true;//质检合格
    private double    arrived_no;//实际到货量
  
	public double getArrived_no() {
		return arrived_no;
	}
	public void setArrived_no(double arrived_no) {
		this.arrived_no = arrived_no;
	}
	public double getQc_true() {
		return qc_true;
	}
	public void setQc_true(double qc_true) {
		this.qc_true = qc_true;
	}
	public String getSend_id() {
		return send_id;
	}
	public void setSend_id(String send_id) {
		this.send_id = send_id;
	}
	public double getQc_count() {
		return qc_count;
	}
	public void setQc_count(double qc_count) {
		this.qc_count = qc_count;
	}
	public Date getQc_time() {
		return qc_time;
	}
	public void setQc_time(Date qc_time) {
		this.qc_time = qc_time;
	}
	public int getQc_id() {
		return qc_id;
	}
	public void setQc_id(int qc_id) {
		this.qc_id = qc_id;
	}
	public int getT_id() {
		return t_id;
	}
	public void setT_id(int t_id) {
		this.t_id = t_id;
	}
	public int getRecord_id() {
		return record_id;
	}
	public void setRecord_id(int record_id) {
		this.record_id = record_id;
	}
	public String getQc_goods() {
		return qc_goods;
	}
	public void setQc_goods(String qc_goods) {
		this.qc_goods = qc_goods;
	}
	public String getQc_operator() {
		return qc_operator;
	}
	public void setQc_operator(String qc_operator) {
		this.qc_operator = qc_operator;
	}
	
	public double getUnqualified_no() {
		return unqualified_no;
	}
	public void setUnqualified_no(double unqualified_no) {
		this.unqualified_no = unqualified_no;
	}
	public String getQc_remark() {
		return qc_remark;
	}
	public void setQc_remark(String qc_remark) {
		this.qc_remark = qc_remark;
	}
	
	public String getIs_product() {
		return is_product;
	}
	public void setIs_product(String is_product) {
		this.is_product = is_product;
	}
	public String getQc_file() {
		return qc_file;
	}
	public void setQc_file(String qc_file) {
		this.qc_file = qc_file;
	}
}
