Ext.define('srm.user.model.UserModule',{
    extend:'Ext.data.Model',
    idProperty:'id',
    identifier:'negative',
    fields:[
    {name:'id',type:'int'},
    {name:'u_id',type:'int'},
    {name:'mod_id',type:'int'},
    {name:'ou_id',type:'int'}
    ]
});