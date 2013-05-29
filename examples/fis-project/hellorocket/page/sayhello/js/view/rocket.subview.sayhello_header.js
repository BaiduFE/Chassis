(function($){

rocket.subview.sayhello_header = rocket.subview.extend({

    el: '#sayhello_page_header'

    ,events: {
        'click .sayhello-page-header-backbtn': 'onbackbtn'
    }

    ,init: function(options){
        var me = this;

        // todo
    }

    ,render: function(sections){
        var me = this;
        // todo
        me.hideLoading();
    }

    , onBeforePageIn : function(){
		this.$el.show();
	}

    ,onbackbtn: function(e){
        rocket.history.navigate('#');
    }
});

})(Zepto);
