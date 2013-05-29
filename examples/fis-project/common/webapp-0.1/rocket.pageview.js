/**
 * pageview类，页面视图控制器，充当页面事件中心
 */
(function($) {

app.pageview = app.baseview.extend({

    // 初始化函数
    initialize: function(options, action){
        var me = this;

        // 页面对应action
        if(!action){
            throw Error('pageview creation: must supply non-empty action parameter'); 
        }
        me.action = action;

        app.baseview.prototype.initialize.call(me, options, null);
    }

});

})(Zepto);




