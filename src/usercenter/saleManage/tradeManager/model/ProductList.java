package usercenter.saleManage.tradeManager.model;

import java.io.Serializable;
import java.util.Date;
/**
 * 订单产品明细表
 * @author chenlong
 */
public class ProductList implements Serializable{
	private static final long serialVersionUID = 3759985507466611592L;
	private int			order_detail_id;//主键
	private int			pur_order_id;//订单ID
	private String		product_name;//产品名称
	private String		product_size;//产品规格尺寸
	private float		unit_price;//单价
	private int			number;//数量
	private String		unit;//单位
	private float		money;//金额
	private Date		delivery_date;//交期日期
	private int			Storage_num;//入库数量
	private int         no_delivery_num;//采购未完数量
	private int         delivery_num;//到货数量
	private int			htmx;//po端汇总ID
	private String      product_artno;//产品货号  
	private String      remark;//备注
	private int	        stay_back_num;//待退数量
	private int	        stay_storage_num;//待入数量
	private int	        stay_check_num;//待检数量

	
	public int getStay_back_num() {
		return stay_back_num;
	}
	public void setStay_back_num(int stay_back_num) {
		this.stay_back_num = stay_back_num;
	}
	public int getStay_storage_num() {
		return stay_storage_num;
	}
	public void setStay_storage_num(int stay_storage_num) {
		this.stay_storage_num = stay_storage_num;
	}
	public int getStay_check_num() {
		return stay_check_num;
	}
	public void setStay_check_num(int stay_check_num) {
		this.stay_check_num = stay_check_num;
	}
	public int getNo_delivery_num() {
		return no_delivery_num;
	}
	public void setNo_delivery_num(int no_delivery_num) {
		this.no_delivery_num = no_delivery_num;
	}
	public int getDelivery_num() {
		return delivery_num;
	}
	public void setDelivery_num(int delivery_num) {
		this.delivery_num = delivery_num;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getProduct_artno() {
		return product_artno;
	}
	public void setProduct_artno(String product_artno) {
		this.product_artno = product_artno;
	}
	public int getOrder_detail_id() {
		return order_detail_id;
	}
	public void setOrder_detail_id(int order_detail_id) {
		this.order_detail_id = order_detail_id;
	}
	public int getPur_order_id() {
		return pur_order_id;
	}
	public void setPur_order_id(int pur_order_id) {
		this.pur_order_id = pur_order_id;
	}
	public String getProduct_name() {
		return product_name;
	}
	public void setProduct_name(String product_name) {
		this.product_name = product_name;
	}
	public String getProduct_size() {
		return product_size;
	}
	public void setProduct_size(String product_size) {
		this.product_size = product_size;
	}
	public float getUnit_price() {
		return unit_price;
	}
	public void setUnit_price(float unit_price) {
		this.unit_price = unit_price;
	}
	public int getNumber() {
		return number;
	}
	public void setNumber(int number) {
		this.number = number;
	}
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	public float getMoney() {
		return money;
	}
	public void setMoney(float money) {
		this.money = money;
	}
	public Date getDelivery_date() {
		return delivery_date;
	}
	public void setDelivery_date(Date delivery_date) {
		this.delivery_date = delivery_date;
	}
	public int getStorage_num() {
		return Storage_num;
	}
	public void setStorage_num(int Storage_num) {
		this.Storage_num = Storage_num;
	}
	public int getHtmx() {
		return htmx;
	}
	public void setHtmx(int htmx) {
		this.htmx = htmx;
	}

}
