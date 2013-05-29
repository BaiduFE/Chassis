/**
 * Router类，监听URL变化，并作转发
 * 产品线需继承rocket.router类
 */
(function($) {

rocket.router = Backbone.Router.extend({

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
     * 默认页面切换动画，合理选择配置
     * @note: slide比较适用于固高切换
     * @note: fade比较适用DOM树较小的两个页面切换
     * @note: simple性能最好，但效果最一般
     * @note: dropdown只能用于固高切换
     */
    defaultPageTransition: 'simple',
    
    /**
     * 页面切换动画配置
     * @key {string} actionname-actionname，"-"号分隔的action名称串，不分先后，但支持精确设定
     * @value {string} animation name
     * @note: 以index和search为例，有两种可设定的值：index-search和search-index：
     *     1. 如果只设定了其中一个，则不分先后顺序同时生效。比如'index-search':'fade'，无论index->search还是search->index，切换动画总是fade
     *     2. 如果两个都设定了，则分别生效。比如'index-search':'fade'，'search-index':'slide'，那么index->search使用fade动画，search->index使用slide动画
     *     3. 如果两个都没有设定，则都是用默认动画
     */
    pageTransition: {
        // 'index-search': 'fade'
        // ,'index-page': 'slide'
    },

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
                = new rocket.pageview[action](params, action); 
        } 
        
        // 切换视图控制器
        me.previousView = me.currentView;
        me.currentView = view;

        me.trigger('routechange', {
            from: me.previousView
            ,to: me.currentView
            // ,pageviews: $.extend({}, me.views)
        });

        me.switchPage(
            me.previousView, 
            me.currentView, 
            params
        );
    },

    /**
     * 通用切换页面逻辑
     * @{param} from {rocket.pageview}
     * @{param} to {rocket.pageview}
     * @{param} params {object}
     */
    switchPage: function(from, to, params){
        var me = this;

        var dir = 0, order = me.pageOrder, 
            fromAction = from && from.action || null,
            toAction = to && to.action || null,
            fromIndex, toIndex;

        /**
         * 计算页面切换方向：0-无方向，1-向左，2-向右
         */
        if(fromAction !== null && null !== toAction && fromAction !== toAction){
            if(-1 != ( fromIndex = order.indexOf( fromAction ) )
                && -1 != ( toIndex = order.indexOf( toAction ) ) ){
                dir = fromIndex > toIndex ? 2 : 1;
            }
        }

        // console.log([fromAction, toAction, dir].join(' | '));

        // 记忆位置
        me.enablePositionRestore && from && (from.savePos());

        $.each(from == to ? [from] : [from, to], function(key, item){
            item && item.trigger('pagebeforechange', {
                from: me.previousView, 
                to: me.currentView,
                params: params 
            });
        });
        
        me.doAnimation(
            from,
            to,
            dir,
            function(){
                /**
                 * 尽可能等切换稳定了再开始数据请求
                 * 延后一点用户感觉不出来，但能保证页面的稳定性
                 */

                // 恢复位置
                me.enablePositionRestore && to && (to.restorePos(params));

                $.each(from == to ? [from] : [from, to], function(key, item){
                    // item && console.log('pageafterchange');
                    item && item.trigger(
                        'pageafterchange', {
                            from: me.previousView, 
                            to: me.currentView,
                            params: params 
                        });
                });
            }
        );

    },

    /**
     * 选择相应切换动画并执行
     * @param fromView
     * @param toView
     * @param direction
     * @param callback
     */
    doAnimation: function(fromView, toView, direction, callback){

        var animate, me = this;

        // 根据action组合，选择不同切换动画方法
        animate = me._selectAnimation(
                fromView && fromView.action || null, 
                toView && toView.action || null
            ) || rocket['pageanimation_' + me.defaultPageTransition].animate; 

        animate(
            fromView && fromView.el, 
            toView && toView.el, 
            direction,
            callback
        );

    },

    /**
     * 根据action组合选择相应切换动画
     * @param fromAction
     * @param toAction
     * @return 切换动画方法 or undefined
     */
    _selectAnimation: function(fromAction, toAction){

        if(null == fromAction || null == toAction){
            return;
        }

        var me = this,
            animateName;

        // key不分顺序，需要试探两种顺序的配置
        animateName = me.pageTransition[fromAction + '-' + toAction]
            || me.pageTransition[toAction + '-' + fromAction];

        return rocket['pageanimation_' + animateName] 
            && rocket['pageanimation_' + animateName].animate;

    }

}); 

})(Zepto);



