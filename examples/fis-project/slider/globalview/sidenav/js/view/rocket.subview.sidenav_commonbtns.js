(function($){

rocket.subview.sidenav_commonbtns = rocket.subview.extend({

    el: '#sidenav_globalview_commonbtngroup'

    ,events: {
        'click .sidenav-globalview-btn-info': 'oninfobtnclick'
        ,'click .sidenav-globalview-btn-leave': 'onleavebtnclick'
        ,'click .sidenav-globalview-btn-shutdown': 'onshutdownbtnclick'
    }

    ,init: function(options){
        var me = this;

        me.showNav = false;

        me.infoBtn = me.$('.sidenav-globalview-btn-info');
        me.leaveBtn = me.$('.sidenav-globalview-btn-leave');
        me.shutdownBtn = me.$('.sidenav-globalview-btn-shutdown');
		
		me.registerEvents();
    }

    ,registerEvents: function(){
        var me = this,
            ec = me.root;

        ec.on('routechange', me.onroutechange, me);
    }

    ,render: function(){
        var me = this;

        if(me.showNav){
            me.infoBtn.hide();            
            me.leaveBtn.show();            
            me.shutdownBtn.show();            
        }
        else{
            me.infoBtn.show();            
            me.leaveBtn.hide();            
            me.shutdownBtn.hide();            
        }

    }

    ,onroutechange: function(params){
        var me = this,
            from = params.from || null,
            to = params.to || null,
            fromAction = from && from.action || null,
            toAction = to && to.action || null,
            pageviews = params.pageviews;

        // common buttons总是显示
        me.$el.show();
        me.render();
    }

    ,onleavebtnclick: function(e){
        var me = this;

        if('' != document.referrer){
            document.location.href = document.referrer;
        }
    } 

    ,oninfobtnclick: function(e){
        var me = this;
        me.showNav = true;
        me.render();
        me.root.trigger('shownav', {
            targetAction: me.root.getCurrentAction()
        });
    } 

    ,onshutdownbtnclick: function(e){
        var me = this;
        me.showNav = false;
        me.render();
        me.root.trigger('hidenav', {
            targetAction: me.root.getCurrentAction()
        });
    } 

});

})(Zepto);
