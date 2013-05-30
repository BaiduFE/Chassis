(function($){

rocket.subview.sidenav_outlinebtns = rocket.subview.extend({

    el: '#sidenav_globalview_outlinebtngroup'

    ,events: {
        'click .sidenav-globalview-btn-relayout': 'onrelayoutbtnclick'
        ,'click .sidenav-globalview-btn-down': 'ondownbtnclick'
    }

    ,init: function(options){
        var me = this;

        me.showNav = false;
        me.action = 'outline';
		me.registerEvents();
    }

    ,registerEvents: function(){
        var me = this,
            ec = me.root;

        ec.on('routechange', me.onroutechange, me);
        ec.on('shownav', me.onshownav, me);
        ec.on('hidenav', me.onhidenav, me);
    }

    ,render: function(action){
        var me = this;

        if(me.showNav && me.action == action){
            me.$el.show();
        }
        else{
            me.$el.hide();
        }

    }

    ,onroutechange: function(params){
        var me = this,
            from = params.from || null,
            to = params.to || null,
            fromAction = from && from.action || null,
            toAction = to && to.action || null,
            pageviews = params.pageviews;

        if(me.action == toAction){
            me.render(toAction);
        }
        else{
            me.$el.hide();
        }
    }

    ,onrelayoutbtnclick: function(e){
        // @note: 全局事件名的格式标准：viewname:eventname
        this.root.triggerPageEvent('outline', 'sidenav:relayout');
    } 

    ,ondownbtnclick: function(e){
        this.root.triggerPageEvent('outline', 'sidenav:down');
    } 

    ,onshownav: function(params){
        var me = this,
            action = params.targetAction;

        me.showNav = true;
        if(action == me.action){
            me.render(action);
        }
    }

    ,onhidenav: function(params){
        var me = this,
            action = params.targetAction;;

        me.showNav = false;
        if(action == me.action){
            me.render(action);
        }
    }

});

})(Zepto);
