package util.web;

import java.io.IOException;
import java.util.Date;
import java.util.List;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.StaticApplicationContext;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import util.CacheData;
import util.Const;
import util.SRMStringUtil;
import util.SessionUtil;
import util.WebUtil;

import common.user.model.LoginAccount;
import common.visitrecord.model.VisitRecord;
import common.visitrecord.service.VisitRecordService;

@Component
public class HtmlFilter implements Filter{
	@Autowired
	private RedisTemplate redisTemplate;
	/*@Autowired
	private VisitRecordService visitRecordService;*/
	@Autowired
	private MongoTemplate mongoTemplate;
	private static String lastUri = "";//上一次访问路径
	
	protected FilterConfig filterConfig;
	
	protected boolean limitAccess;
	protected List<String> noFilerList =null;
	public HtmlFilter() {
		this.filterConfig = null;
		this.limitAccess=true;
	}
	@Override
	public void destroy() {
		
	}

	@SuppressWarnings("unchecked")
	@Override
	public void doFilter(ServletRequest req, ServletResponse resp,FilterChain chain) throws IOException, ServletException {
			HttpServletRequest httpReq = (HttpServletRequest)req;
			HttpServletResponse httpResp = (HttpServletResponse)resp;
			String ctxPath = httpReq.getContextPath();    		
			Cookie[] htmlCookies = httpReq.getCookies();		
			String requestUri = httpReq.getRequestURI();		//请求的全路径,比如:		 
			String uri = requestUri.substring(ctxPath.length());//全路径除去ctxPath
			String tarUri = uri.trim();
			String defalutLink = Const.INDEX_PAGE;
			if(htmlCookies != null){
				for(int i = 0;i < htmlCookies.length; i++){//mishengliang 2016-10-13
					if("isVip".equals(htmlCookies[i].getName()) && "true".equals(htmlCookies[i].getValue())){//vip登录
						defalutLink = Const.VIP_LOGIN_PAGE;
					}
				}
			}
			if(!this.isInNoFilerList(tarUri)){
				//RegAccout regAccout=SessionUtil.getAttribute(Const.SESSION_PLATFORM_USER)!=null?(RegAccout)SessionUtil.getAttribute(Const.SESSION_PLATFORM_USER):null;
				//Const.SESSION_PLATFORM_LOGIN_USER
				LoginAccount regAccout=SessionUtil.getCurrentPlateLoginAccount();//SessionUtil.getAttribute(Const.SESSION_PLATFORM_LOGIN_USER)!=null?(LoginAccount)SessionUtil.getAttribute(Const.SESSION_PLATFORM_LOGIN_USER):null;
				if(regAccout==null){//平台账号未登录
					HttpSession currentSession=httpReq.getSession(false);
					if(currentSession!=null && currentSession.getAttribute("beKick") != null && "1".equals(currentSession.getAttribute("beKick").toString())){//被T下线
						httpResp.sendRedirect(ctxPath+"/error/beKick.html");
						return;
					}
					if(tarUri.endsWith(".html")||tarUri.endsWith(".htm")){
						//httpResp.sendRedirect(ctxPath+"/"+Const.INDEX_PAGE);
						httpResp.sendRedirect(ctxPath+"/"+ defalutLink);//不同的登录方式，刷新的默认页面不同
						return;
					}
				}else{//平台账号登录
					if(tarUri.endsWith(".html")||tarUri.endsWith(".htm")){
						addVisitRecord(tarUri,regAccout.getLogin_id(),regAccout.getLogin_name(),0);
						//对.htm结尾的请求路径进行处理
						String parttarUri=tarUri.endsWith(".htm")?SRMStringUtil.getPartPathFromUrl(tarUri):tarUri;
						if(limitAccess){//已经登录
							List<String> hplist=(SessionUtil.getAttribute(Const.SESSION_URL_LIST)!=null)?(List<String>)SessionUtil.getAttribute(Const.SESSION_URL_LIST):null;
							boolean flag=false;//不匹配
							if(hplist!=null){
								for(String hp:hplist){
									if(parttarUri.indexOf(hp)!=-1){
									//if(parttarUri.equalsIgnoreCase(hp)){
										flag=true;
										break;
									}
								}
							}
							if(!flag){
								httpResp.sendRedirect(ctxPath+"/error/noSecurity.jsp");
								return;
							}
							
						}
					}
				}				
				
			}
		
		chain.doFilter(req, resp);
	}

	@SuppressWarnings("unchecked")
	@Override
	public void init(FilterConfig cfg) throws ServletException {
		this.filterConfig = cfg;
		
		this.limitAccess=true;
		this.noFilerList = (List<String>)CacheData.getInstance().get("SysFilter");
		
		//取limitAccess
		String paramValue = filterConfig.getInitParameter("limitAccess");
		if(!WebUtil.isEmpty(paramValue)&&paramValue.equalsIgnoreCase("false")){
			this.limitAccess = false;
		}
	}
	
	//在过滤列表中
	private boolean isInNoFilerList(String uri){
		if(this.noFilerList != null){
			for (String str : this.noFilerList) {
				if(str.equals(uri))
					return true;
			}
		}
		return false;
	}
	
	/**
	* @Description:
	* RequestFilter
	* addVisitRecord
	* @param uri 访问的请求路径
	* @param accountId 账号id
	* @param accountName 账号名
	* @param plateType 登录类型 0：平台 1：后台 
	* @author mishengliang
	* 2017-1-18 上午10:50:13
	*/
	@SuppressWarnings("unchecked")
	private void addVisitRecord(String uri,Integer accountId,String accountName,Integer plateType){
		if(lastUri.equals(uri)){
			return;
		}
		Integer limiteCountInteger = 1;//超过100条写入一次
		VisitRecord visitRecord = new VisitRecord();
		visitRecord.setUri(uri);
		visitRecord.setAccount_id(accountId);
		visitRecord.setAccount_name(accountName);
		visitRecord.setPlate_type(plateType);
		visitRecord.setVisit_dt(new Date());
		redisTemplate.opsForList().leftPush("visitRecord", visitRecord);
		Long visitCountLong = redisTemplate.opsForList().size("visitRecord");
		if(visitCountLong >= limiteCountInteger){
			List<VisitRecord> recordsList = redisTemplate.opsForList().range("visitRecord", 0, -1);
			//visitRecordService.addVisitRecord(recordsList); //写入关系型数据库
			mongoTemplate.insertAll(recordsList); //写入mongo数据库
			redisTemplate.opsForList().trim("visitRecord", 1, 0);//将redis中数据清空
		}
		lastUri = uri;
	}
}
