/**
 * subview类，页面子视图控制器
 */
(function($) {

rocket.subview = rocket.baseview.extend({

    // 初始化函数
    initialize: function(options, parentView){
        if(parentView instanceof rocket.baseview){
            rocket.baseview.prototype.initialize.call(this, options, parentView);
        }
        else{
            throw Error('rocket.subview creation: must supply parentView, which is an instance of rocket.baseview');
        }
    }

});

})(Zepto);




