/**
 * Router类，监听URL变化，并作转发
 * 产品线需继承app.router类
 */
(function($) {

app.router = Backbone.Router.extend({

    // 实例化时自动调用
    initialize: function() {
        // 保存的视图列表，对应不同页面
        this.views = {};

        // 记录控制器变化
        this.currentView = null;
        this.previousView = null;
    },
    
    /**
     * 路由配置
     * 按照Backbone.Router指定方式配置，例子如下，该部分产品线定义
     */
    routes: {
        /*
        "": "index",
        "index/:type": "index",
        "page/:src/:title": "page",
        "search/:word": "search",
        */
    },

    /** 
     * 页面切换顺序配置
     * 产品线按以下格式配置，使用action名称
     */
    pageOrder: [/*'index', 'search', 'page'*/],

    /**
     * Hander，对应action index的处理方法。产品线定义
     * 以下为例子
     */

    /*
    index: function(type) {
        this.doAction('index', {
            type: decodeURIComponent(type)
        });
    },

    page: function(src, title) {
        this.doAction('page', {
            src: decodeURIComponent(src),
            title: decodeURIComponent(title)
        });
    },

    search: function(word) {
        this.doAction('search', {
            word: decodeURIComponent(word)
        });
    },
    */

    /**
     * action通用处理逻辑
     * @{param} action {string} action名称
     * @{param} params {object} action参数
     */
    doAction: function(action, params){
        var me = this, view = me.views[action];
        
        if(!view){
            view = me.views[action] 
                = new app.pageview[action](params, action); 
        } 
        
        // 切换控制器
        me.previousView = me.currentView;
        me.currentView = view;

        me.switchPage(
            me.previousView, 
            me.currentView, 
            params
        );
    },

    /**
     * 通用切换页面逻辑
     * @{param} from {app.pageview}
     * @{param} to {app.pageview}
     * @{param} params {object}
     */
    switchPage: function(from, to, params){
        var me = this;

        var dir = 0, order = me.pageOrder, 
            fromAction = from && from.action || null,
            toAction = to && to.action || null,
            fromIndex, toIndex;

        if(fromAction !== null && null !== toAction && fromAction !== toAction){
            if(-1 != ( fromIndex = order.indexOf( fromAction ) )
                && -1 != ( toIndex = order.indexOf( toAction ) ) ){
                dir = fromIndex > toIndex ? 2 : 1;
            }
        }

        // console.log([fromAction, toAction, dir].join(' | '));

        $.each(from == to ? [from] : [from, to], function(key, item){
            item && item.trigger('pagebeforechange', {
                from: me.previousView, 
                to: me.currentView,
                params: params 
            });
        });
        
        app.util_slide.screenTransition(
            from && from.el, 
            to && to.el, 
            dir,
            false,
            function(){
                /**
                 * 尽可能等切换稳定了再开始数据请求
                 * 延后一点用户感觉不出来，但能保证页面的稳定性
                 */
                $.each(from == to ? [from] : [from, to], function(key, item){
                    item && item.trigger(
                        'pageafterchange subpagebeforechange subpageafterchange', {
                            from: me.previousView, 
                            to: me.currentView,
                            params: params 
                        });
                });
            }
        );
    }

}); 

})(Zepto);



