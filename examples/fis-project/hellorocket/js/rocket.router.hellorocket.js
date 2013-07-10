(function($) {

Chassis.load.config.ruler = function( pkg ){
    return 'hellorocket_' + pkg;
};

Chassis.PageView._TRANSITION_ = Chassis.PageView.extend({
    
    el : '#_common__page',
    
    init : function(){
        this.on('pageloadsuccess',this.onPageLoadSuccess);
        this.on('pageloaderror',this.onPageLoadError);
    },
    
    
    onBeforePageIn : function(){
        this.$el.html( 'page loading...' );
    },
    
    onPageLoadError : function(){
        this.$el.html( 'page loade error!<div><a href="#">GO Home!</a></div>' );
    },
    
    onPageLoadSuccess : function(){
        this.$el.hide();
    }
});

rocket.router.hellorocket = rocket.router.extend({

    // 路由配置
    routes: {
        '': 'index'
        ,'index': 'index'
        ,'sayhello': 'sayhello'
        ,'say/:id' : 'say'
        ,'error' : 'error'
    }

    // 页面切换顺序配置
    ,pageOrder: [
          'index'
        , 'sayhello'
        , 'say'
    ]

    // 位置记忆，默认为false，不进行位置记忆
    ,enablePositionRestore: true

    // 默认页面切换动画
    ,defaultPageTransition: 'simple'

    // 页面切换动画配置
    ,pageTransition: {
        /**
         * @note: slide比较适用于固高切换，fade比较适用DOM树较小的两个页面切换，simple性能最好，但效果最一般，合理选择配置
         */
        'index-sayhello': 'slide' 

    }

    ,index: function(title) {
        //this.doAction('index', {});
    }

    ,sayhello: function(title) {
        //this.doAction('sayhello', {});
    }

}); 

})(Zepto);




