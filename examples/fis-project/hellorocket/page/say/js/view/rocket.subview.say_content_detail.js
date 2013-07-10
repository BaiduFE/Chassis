(function($){

rocket.subview.say_content_detail = rocket.subview.extend({

    className: 'say_page_content_detail'
    
    // 配置事件
    ,events: {
        // 监听model change
        'change model': 'onModelChange'
    }
    
    ,init: function(options){
        var me = this;
        me.options = options;
        me.showLoading();
        
        
        me.model = new Chassis.Model.Detail();
        
    }

	
	, onBeforeSwitchIn : function(){
        var me = this;
		this.$el.show();
        
        
        // 获取数据
        me.model.fetch({
            data : {
                id : me.options.id
            }
        });
	}
    
    , onAfterSwitchIn : function(){
        var me = this;
		this.$el.show();
        
	}
    
    ,onModelChange : function(){
        var me = this;
        me.$el.html( me.model.get('info') + '<div><a href="#sayhello">hello!</a></div>');
    }

});

})(Zepto);
