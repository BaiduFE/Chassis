(function($){

rocket.subview.say_header = rocket.subview.extend({

    className: 'say_page_header'

    ,events: {
        'click .say-page-header-backbtn': 'onbackbtn'
    }

    ,template : $( '#template_say_header' ).html()
    
    ,init: function(options){
        var me = this;
        me.render();
    }

    ,render: function(sections){
        var me = this,tpl = baidu.template(me.template, {});
        
        me.$el.html( tpl );
    }

    , onBeforePageIn : function(){
		this.$el.show();

	}

    ,onbackbtn: function(e){
        rocket.history.navigate('#');
    }
});

})(Zepto);
