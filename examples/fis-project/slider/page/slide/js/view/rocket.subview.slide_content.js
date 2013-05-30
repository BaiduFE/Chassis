(function($){

rocket.subview.slide_content = rocket.subview.extend({
    
    el: '#slide_page_content'

    ,init: function(options){
        var me = this,
            title = options.title,
            sliderIndex = options.sliderindex,
            subView,
            spm;

        
		
		this.spm = new Chassis.SubPageMgr({
          owner: this,
          max: 15,
          klass: rocket.subview.slide_pageslider
        });
		
		
		/*
		this.subpage = new this.spm.klass(options);
		
		this.append( this.subpage );
		
		this.spm.register( this.subpage );
		*/
		
		this.registerEvents();
		
        
    }

    ,registerEvents: function(){
        var me = this, ec = me.root;

        

        var keydownLocking = false;
        $(document).on('keydown', function(e){
            if(!keydownLocking){
                keydownLocking = true;

                ec.trigger('keydown', {
                    key: e.which
                    ,shiftKey: e.shiftKey
                    ,ctrlKey: e.ctrlKey
                    ,target: me.spm.current
                });

                setTimeout(function(){
                    keydownLocking = false;
                }, 500);
            }
        });

        // global events from sidenav
        ec.on('sidenav:goup', function(){
            ec.trigger('goup', {
                target: me.spm.current
            });        
        }, me);

        ec.on('sidenav:gonext', function(){
            ec.trigger('gonext', {
                target: me.spm.current  
            });        
        }, me);

        ec.on('sidenav:goprev', function(){
            ec.trigger('goprev', {
                target: me.spm.current
            });        
        }, me);

        ec.on('sidenav:increaseimagesize', function(){
            ec.trigger('increaseimagesize', {
                target: me.spm.current
            });        
        }, me);

        ec.on('sidenav:decreaseimagesize', function(){
            ec.trigger('decreaseimagesize', {
                target: me.spm.current
            });        
        }, me);
    }

    

    ,getSubpageSwitchDir: function(fromSubpage, toSubpage){
        var f = fromSubpage, 
            t = toSubpage,
            dir = 0;

        if(!f || !t){
            dir = 0;
        }
        else{
            dir = 
                parseInt(f.options.sliderindex) 
                    < parseInt(t.options.sliderindex)
                ? 1 : 2;
        }

        return dir;
    }

    ,onAfterPageIn: function(params){
        var me = this;
		me.$el.show();
		
        //me.refreshViewHeight();
    }

    ,refreshHeight: function(){
        var me = this;
        window.scrollTo(0, 0);
        me.$el.height($(window).height()); 
    }

    ,onorientationchange: function(from, to){
        var me = this; 
        // @note: 不直接调用refreshHeight，而调用refreshViewHeight，使用其延时
        me.refreshViewHeight();
    }

});

})(Zepto);
