Ext.define('srm.mngOrderManager.view.MngPurchaseOrderManager',{
	extend:'srm.ux.Panel',
	alias:'widget.MngPurchaseOrderManager',	
	initComponent:function(){
		var me=this;
		me.orderStore = Ext.create('srm.mngOrderManager.store.MngPurchaseOrder');
			Ext.apply(this,{
    		layout:{
    			type:'border',
    			padding :2
    		},			
    		items:[
		         {  
		        	region:'center',
		        	split: true,
		        	title:'采购订单列表',		    	 	  				      				    	
	  				xtype:'gridpanel',
	  				itemId:'grid_order',		
	  		  		store: me.orderStore,
	  				columnLines:true,
	  				dockedItems:[{
	   	  	  			xtype:'toolbar',dock:'top',itemId:'top_bar2',
	   	  	  			items:[
	   	  	  			 {xtype:'textfield',itemId:'search',fieldLabel:'快速查询',emptyText:'输入订单编号、采购方公司或者供方公司关键字搜索..',enableKeyEvents:true,labelWidth:60,width:320},
	   	  	  			 {xtype:'combo',itemId:'state_search',fieldLabel:'状态',labelWidth:40,labelAlign:'right',width:180,
			 					store:[[10,'已提交'],[20,'已接单'],[30,'交货完成'],[40,'提出终止'],[50,'终止'],[60,'取消']]
			 				},
	   	   	  		    {text:'查询',glyph:0xf002,itemId:'btn_search'}
	   	  	  			]
	   	  	  			},
			   	  		   {
							    xtype : 'pagingbar',
	                            stateId : "pagingbar"+Ext.id(),
								store : me.orderStore,
								dock : 'bottom',
								defaultPageSize:25,
								displayInfo : true
						    }],
	  				        columns:[
	  							{text:'订单列表主键',dataIndex: 'pur_order_id',flex:1},
	  							{text: '订单编号',dataIndex: 'order_bh',flex:1},
	  							{text: '合同编号',dataIndex: 'agreement_bh',flex:1},
	  							{text: '订单状态',dataIndex: 'order_status',flex:1,
	  								renderer: function(value,metaData,record,colIndex,store,view) { 
	  						            if(value == 10){
	  						            	return '已提交';
	  						            }else if(value == 20){
	  						            	return '已接单';
	  						            }else if(value == 30){
	  						            	return '交货完成';
	  						            }else if(value == 40){
	  						            	return '提出终止';
	  						            }else if(value == 50){
	  						            	return '终止';
	  						            }else if(value == 60){
	  						            	return '取消';
	  						            }}
	  						         },
	  							{text: '采购方公司',dataIndex: 'pur_cpyname_cn',flex:1},
	  							{text: '供方公司',dataIndex: 'sup_cpyname_cn',flex:1},
	  							{text: '订单总金额',dataIndex: 'sum_money',flex:1},
	  							{text:'最早交期日期',dataIndex: 'delivery_date',flex:1,xtype:'datecolumn',format:'Y-m-d'}
	  		           		]	  		           	  					   	  				   
		        }
    	]
    	});
    	this.callParent(arguments);    	
    }
});