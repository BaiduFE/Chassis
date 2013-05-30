(function($){

rocket.subview.sidenav_slidebtns = rocket.subview.extend({

    el: '#sidenav_globalview_slidebtngroup'

    ,events: {
        'click .sidenav-globalview-btn-up': 'onupbtnclick'
        ,'click .sidenav-globalview-btn-prev': 'onprevbtnclick'
        ,'click .sidenav-globalview-btn-next': 'onnextbtnclick'
        ,'click .sidenav-globalview-btn-increasefont': 'onincreasefontbtnclick'
        ,'click .sidenav-globalview-btn-decreasefont': 'ondecreasefontbtnclick'
        ,'click .sidenav-globalview-btn-increaseimage': 'onincreaseimagebtnclick'
        ,'click .sidenav-globalview-btn-decreaseimage': 'ondecreaseimagebtnclick'
    }

    ,init: function(options){
        var me = this;

        me.showNav = false;
        me.action = 'slide';
		
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

        if(me.showNav && action == me.action){
            // @note: 容器显示即可
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
            me.$el.show();
            me.render(toAction);
        }
        else{
            me.$el.hide();
        }

    }

    ,onprevbtnclick: function(e){
        this.root.triggerPageEvent('slide', 'sidenav:goprev');
    } 

    ,onnextbtnclick: function(e){
        this.root.triggerPageEvent('slide', 'sidenav:gonext');
    } 

    ,onupbtnclick: function(e){
        this.root.triggerPageEvent('slide', 'sidenav:goup');
    } 

    ,onincreasefontbtnclick: function(e){
        this.root.triggerPageEvent('slide', 'sidenav:increasefontsize');
    } 

    ,ondecreasefontbtnclick: function(e){
        this.root.triggerPageEvent('slide', 'sidenav:decreasefontsize');
    } 

    ,onincreaseimagebtnclick: function(e){
        this.root.triggerPageEvent('slide', 'sidenav:increaseimagesize');
    } 

    ,ondecreaseimagebtnclick: function(e){
        this.root.triggerPageEvent('slide', 'sidenav:decreaseimagesize');
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
            action = params.targetAction;

        me.showNav = false;
        if(action == me.action){
            me.render(action);
        }
    }

});

})(Zepto);
