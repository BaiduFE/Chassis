(function($){

rocket.subview.say_header = rocket.subview.extend({

    el: '#say_page_header'

    ,events: {
        'click .say-page-header-backbtn': 'onbackbtn'
    }

    ,init: function(options){
        var me = this;

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
