(function($){

rocket.subview.sayhello_content = rocket.subview.extend({

    el: '#sayhello_page_content'

    ,init: function(options){
        var me = this;

        me.showLoading();
        me.render();
    }

    

    ,render: function(sections){
        var me = this;
        me.hideLoading();
    }
	
	, onBeforePageIn : function(){
		this.$el.show();
	}

});

})(Zepto);
