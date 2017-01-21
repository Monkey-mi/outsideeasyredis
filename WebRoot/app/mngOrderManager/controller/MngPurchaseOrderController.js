Ext.define('srm.mngOrderManager.controller.MngPurchaseOrderController', {
	extend : 'Ext.app.Controller',
	requires : [
				'srm.ux.PagingBar'		
				],
	views:[
			'srm.mngOrderManager.view.MngPurchaseOrderManager',
			'srm.mngOrderManager.view.MngPurchaseOrderMainInfo'
		],
	refs:[
		{ref:'MngPurchaseOrderManager',selector:'MngPurchaseOrderManager'}
		],
	init : function() {
		// controller只初始化一次
		var me = this;
		if (me.isInited)
			return;
		me.control({
			/*
			 *主账户grid的初始化 
			 */
			'MngPurchaseOrderManager':{
				afterrender:function(cmp){					
					me.orderStore = cmp.orderStore;
					me.orderStore.load();																							
				}
			},
			'MngPurchaseOrderManager #grid_order':{
				itemdblclick : function(grid, rec) {
					var win=Ext.widget('MngPurchaseOrderMainInfo',{
						//新增、修改页面
						itemId:'MngPurchaseOrderMainInfo',
						title:'查看订单',
						glyph:0xf0f0,
						rec:rec,
						//store:grid.getStore(),
						closable:true
					});
					win.show();
				}
			},
			'MngPurchaseOrderManager button':{
				click:me.doAction
			}
		});
		me.isInited=true;
	},
	doAction:function(btn){
		var me = this;
		me.panel=me.getMngPurchaseOrderManager();
		switch(btn.itemId){
		case 'btn_search':
			var condition=me.panel.down('#search').getValue();
			var apply_stsSearch=me.panel.down('#state_search').getValue();
			me.orderStore.proxy.extraParams.condition=condition;
			me.orderStore.proxy.extraParams.status=apply_stsSearch;
			me.orderStore.loadPage(1); 	
			break;
		};
	}
});