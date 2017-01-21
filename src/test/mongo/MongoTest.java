package test.mongo;

import java.util.Date;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;

import test.base.BaseTest;
import usercenter.saleManage.model.AccessAccount;

public class MongoTest extends BaseTest{
	@Autowired
	private MongoTemplate mongoTemplate;
	
	@Test
	public void saveObjectTest(){
		MongoOperations mongoOps = mongoTemplate;
		AccessAccount accessAccount = new AccessAccount();
		accessAccount.setAccount_code("30037");
		accessAccount.setAccount_name("mikeaccname");
		accessAccount.setAccount_sts(32);
		accessAccount.setCreate_dt(new Date());
		accessAccount.setRecord_id(16);
		
		mongoOps.insert(accessAccount);
	}
}
