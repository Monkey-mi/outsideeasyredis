package common.visitrecord.model;

import java.io.Serializable;
import java.util.Date;

public class VisitRecord implements Serializable{
	private static final long serialVersionUID = 7351728802006986262L;
	//private Integer			id;
	private String			uri;
	private Integer			account_id;
	private String			account_name;
	private Date			visit_dt;
	private Integer			plate_type;

	/*public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}*/
	public String getUri() {
		return uri;
	}
	public void setUri(String uri) {
		this.uri = uri;
	}
	public Integer getAccount_id() {
		return account_id;
	}
	public void setAccount_id(Integer account_id) {
		this.account_id = account_id;
	}
	public String getAccount_name() {
		return account_name;
	}
	public void setAccount_name(String account_name) {
		this.account_name = account_name;
	}
	public Date getVisit_dt() {
		return visit_dt;
	}
	public void setVisit_dt(Date visit_dt) {
		this.visit_dt = visit_dt;
	}
	public Integer getPlate_type() {
		return plate_type;
	}
	public void setPlate_type(Integer plate_type) {
		this.plate_type = plate_type;
	}
	@Override
	public String toString() {
		return "VisitRecord [uri=" + uri + ", account_id="
				+ account_id + ", account_name=" + account_name + ", visit_dt="
				+ visit_dt + ", plate_type=" + plate_type + "]";
	}
}
