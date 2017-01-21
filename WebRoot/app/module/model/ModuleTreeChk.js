Ext.define('srm.module.model.ModuleTreeChk', {
	extend: 'Ext.data.Model',
	requires: ['srm.def.Const'],
	fields: [
	            {name:'id'          ,type:'int'},
				{name:'parentId'    },
				{name:'checked'		,	type:'boolean',	defaultValue:null},
				{name:'mod_type'    ,	defaultValue:srm.Const.MODULE_TYPE_APP},
				{name:'mod_code'    },
				{name:'text'        }, 
				{name:'textCls'     },
				{name:'expanded'    ,type:'boolean',	defaultValue:srm.Const.YESNO_TYPE_NO},
				{name:'leaf'        ,type:'boolean',	defaultValue:srm.Const.YESNO_TYPE_YES},
				{name:'isvalid'     ,type:'boolean',	defaultValue:srm.Const.YESNO_TYPE_YES},
				{name:'urltype'		,	defaultValue:srm.Const.URL_TYPE_MODULE},
				{name:'url'         },
				{name:'urltarget'   },
				{name:'icon'        },
				{name:'iconCls'     },
				{name:'qtip'        },
				{name:'qtitle'      },
				{name:'order_seq'   ,   type:'int'},
				{name:'remark'      },
				{name:'create_date' ,   type:'date',	dateFormat: 'Y-m-d H:i:s'},
				{name:'modify_date' ,   type:'date',	dateFormat: 'Y-m-d H:i:s'},
				{name:'ctrller'},
				{name:'view'},
				{name:'extraCfg'}
	        ]
});