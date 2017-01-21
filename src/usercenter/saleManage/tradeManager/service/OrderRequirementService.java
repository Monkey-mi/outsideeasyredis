package usercenter.saleManage.tradeManager.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usercenter.saleManage.tradeManager.data.OrderRequirementMapper;
import usercenter.saleManage.tradeManager.model.OrderRequirement;


@Service
public class OrderRequirementService {
	@Autowired
	private OrderRequirementMapper mapper;


	public List<OrderRequirement> getOrderRequirementList(Map<String,Object> params) {
		return mapper.getOrderRequirementList(params);
	}
	public void addOrderRequirement(OrderRequirement[] arr) {
		for(OrderRequirement obj: arr) {
			mapper.addOrderRequirement(obj);
		}
	}
	public void updateOrderRequirement(OrderRequirement[] arr) {
		for(OrderRequirement obj: arr) {
			mapper.updateOrderRequirement(obj);
		}
	}
	public void deleteOrderRequirement(OrderRequirement[] arr) {
		for(OrderRequirement obj: arr) {
			mapper.deleteOrderRequirement(obj);
		}
	}
}
