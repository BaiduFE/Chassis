(function($) {

rocket.router.slider = rocket.router.extend({

    // 路由配置
    routes: {
        '': 'outline'
        ,'outline/:title': 'outline'
        ,'slide/:title/:sliderindex': 'slide'
        // '*defaultUrl': 'defaultRoute'
    }

    // 页面切换顺序配置
    ,pageOrder: [
        'outline'
        , 'slide'
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
        'outline-slide': 'dropdown' 

    }

}); 

})(Zepto);




