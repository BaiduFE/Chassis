(function($){

rocket.subview.index_content = rocket.subview.extend({

    el: '#index_page_content'

    ,events: {
        'click a'  : 'onclick',
        'click dd' : 'ondetail'
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
    
    ,ondetail: function(e){
        var me = this,
            id = $(e.target).attr('data-id')
		rocket.history.navigate('#say/' + id); 
    }
	
	, onBeforePageIn : function(){
		this.$el.show();
	}

});

})(Zepto);
