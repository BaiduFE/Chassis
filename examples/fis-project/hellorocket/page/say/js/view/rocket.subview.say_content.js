(function($){

rocket.subview.say_content = rocket.subview.extend({

    className: 'say_page_content'

    ,init: function(options){
        var me = this,
            title = options.title,
            subView,
            spm;
        
        this.spm = new Chassis.SubPageMgr({
          owner: this,
          max: 15,
          
          
          klass: 'say_content_detail' //rocket.subview.say_content_detail
        });
    }

    


	
	, onBeforePageIn : function(){
		this.$el.show();

	}

});

})(Zepto);
