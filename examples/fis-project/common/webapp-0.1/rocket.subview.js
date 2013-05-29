/**
 * subview类，页面子视图控制器
 */
(function($) {

app.subview = app.baseview.extend({

    // 初始化函数
    initialize: function(options, parentView){
        if(parentView instanceof app.baseview){
            app.baseview.prototype.initialize.call(this, options, parentView);
        }
        else{
            throw Error('app.subview creation: must supply parentView, which is an instance of app.baseview');
        }
    }

});

})(Zepto);




