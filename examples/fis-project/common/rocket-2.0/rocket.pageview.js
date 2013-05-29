/**
 * pageview类，页面视图控制器，充当页面事件中心
 */
(function($) {

rocket.pageview = rocket.baseview.extend({

    // 初始化函数
    initialize: function(options, action){
        var me = this;

        // 页面对应action
        if(!action){
            throw Error('pageview creation: must supply non-empty action parameter'); 
        }
        me.action = action;

        // 位置保留相关
        me._tops = {};
        me._currentLogicString = me._getLogicString(options);

        rocket.baseview.prototype.initialize.call(me, options, null);
    }

    ,isActivePage: function(){
        var me = this;
        return me.$el.css('display') == 'block';
    }

    ,_getLogicString: function(params){
        return $.param(params || {}) 
            || '__empty_logic_string__'; 
    }

    ,savePos: function(){
        var me = this;

        // @note: chrome pc (mac or win) 浏览器存在读取值不准确的情况
        me._tops[me._currentLogicString] = window.scrollY;
    }

    ,restorePos: function(params){
        var me = this,
            cls = me._currentLogicString 
                = me._getLogicString(params);

        // @note: iOS4需要延时
        setTimeout(function(){
            window.scrollTo(0, me._tops[cls] || 0);
        }, 0);
    }

});

})(Zepto);




