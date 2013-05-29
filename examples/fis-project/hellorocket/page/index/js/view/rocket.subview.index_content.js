(function($){

rocket.subview.index_content = rocket.subview.extend({

    el: '#index_page_content'

    ,events: {
        'click a': 'onclick'
    }

    ,init: function(options){
        var me = this;

        me.showLoading();
        me.render();
    }

    ,render: function(sections){
        this.hideLoading();
    }

    ,onclick: function(e){
		rocket.history.navigate('#sayhello'); 
    }
	
	, onBeforePageIn : function(){
		this.$el.show();
	}

});

})(Zepto);
