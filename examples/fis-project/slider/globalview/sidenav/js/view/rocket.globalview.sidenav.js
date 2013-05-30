(function($){
 
rocket.globalview.sidenav = rocket.globalview.extend({
     
    el: '#sidenav_globalview'

    ,init: function(options){
        var me = this;
        me.showNav = false;
        $.each(['common', 'outline', 'slide'], function(index, item){
            me.setup(new rocket.subview['sidenav_' + item + 'btns'](
                $.extend({}, options)
                ,me
            ));
        });

        me.heightConfig = {
            'outline': {
                'show': 164
                ,'hide': 40
            }
            ,'slide': {
                'show': 369
                ,'hide': 40
            }
        };
		
		me.registerEvents();
    }

    ,registerEvents: function(){
        var me = this, ec = me.root;

        ec.on('routechange', me.onroutechange, me);
        ec.on('shownav', me.onshownav, me);
        ec.on('hidenav', me.onhidenav, me);
    }

    ,onroutechange: function(params){
        var me = this,
            from = params.from || null,
            to = params.to || null,
            fromAction = from && from.action || null,
            toAction = to && to.action || null,
            pageviews = params.pageviews;

        me.$el.show();
        me.refreshHeight(
            me.heightConfig[me.root.getCurrentAction()][me.showNav?'show':'hide']        
        );
    }

    ,refreshHeight: function(height){
        var me = this;

        // @note: 避免一开始auto高度，自动撑开高度
        me.$el.height(me.$el.height());

        if(height != undefined){
            me.$el.animate({
                height: height + 'px'
            }, 300, 'ease-out');
        }
    }

    ,onshownav: function(){
        var me = this;
        me.showNav = true;
        me.refreshHeight(
            me.heightConfig[me.root.getCurrentAction()][me.showNav?'show':'hide']        
        );
    }

    ,onhidenav: function(){
        var me = this;
        me.showNav = false;
        me.refreshHeight(
            me.heightConfig[me.root.getCurrentAction()][me.showNav?'show':'hide']        
        );
    }

});

 })(Zepto);
