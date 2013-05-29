/**
 * globalview类，全局视图控制器
 * 用于管理独立于页面之外，不参与页面事件流的部分，层级上与全局路由同级，能读取全局路由信息
 */
(function($) {

rocket.globalview = rocket.baseview.extend({

    // 初始化函数
    initialize: function(options, router){
        var me = this;

        // 应用程序路由
        if(!router || !router instanceof rocket.router){
            throw Error('globalview creation: must supply an instance of rocket.router'); 
        }
        me.router = router;
        me.router.on('routechange', me._onroutechange, me);

        rocket.baseview.prototype.initialize.call(me, options, null);
    }

    /** 
     * 默认路由事件响应函数
     * @param from 起始页面控制器
     * @param to 目标页面控制器
     * @param pageviews 页面控制器列表，以action为索引
     */
    ,_onroutechange: function(params){
        var me = this,
            from = params.from,
            to = params.to,
            pageviews = params.pageviews;
    
        // console.log(pageviews);
        me.trigger('routechange', $.extend({}, params));
    }

    /**
     * 触发页面事件
     * @param action 页面action名称，多个action可由逗号分隔
     * @param eventName 事件名
     * @params params 事件参数
     */
    ,triggerPageEvent: function(action, eventName, params){
        var me = this,
            actions = action.split(/\s*,\s*/),
            pageView;

        // console.log(actions);

        $.each(actions, function(index, item){
            pageView = me.router.views[item];
            pageView && (pageView.trigger(eventName, params));
        });

    }

    // 获取当前活动action
    ,getCurrentAction: function(){
        return this.router && this.router.currentView.action || '';        
    }

});

})(Zepto);




