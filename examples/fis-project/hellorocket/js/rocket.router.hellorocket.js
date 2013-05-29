(function($) {

rocket.router.hellorocket = rocket.router.extend({

    // 路由配置
    routes: {
        '': 'index'
        ,'index': 'index'
        ,'sayhello': 'sayhello'
    }

    // 页面切换顺序配置
    ,pageOrder: [
        'index'
        ,'sayhello'
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




