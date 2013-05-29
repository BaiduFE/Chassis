/*jshint camelcase:false*/

/**
 * @fileOverview  全局视图控制器
 * 用于管理独立于页面之外，不参与页面事件流的部分，层级上与全局路由同级，能读取全局路由信息
 */

/**
 * 全局视图控制器
 * @class GlobalView
 * @namespace __Chassis__
 * @constructor
 * @param {object} opts
 * @param {router} router
 */
var GlobalView = Chassis.GlobalView = View.GlobalView = View.extend({

	_initialize: function( opts, router ) {

		this.router = router;
		this.listenTo( router, 'routechange', this._onRouteChange );

		GlobalView.__super__._initialize.call( this, opts );
	},

    /** 
     * 默认路由事件响应函数
     * @param params.from 起始页面视图
     * @param params.to 目标页面视图
     * @param params.views 页面视图列表，以action为索引
     * @param params.params 路由中的参数
     */
    _onRouteChange: function( params ) {
        
        /**
         * 路由事件
         * @event routechange
         * @param {pageview} params.from 起始页面视图
         * @param {pageview} params.to 目标页面视图
         * @param {object} params.views 页面视图列表，以action为索引
         * @param {object} params.params 路由中的参数
         */
        this.trigger( 'routechange', Chassis.mixin( {}, params ) );
    },

    /**
     * 触发页面事件
     * @method triggerPageEvent
     * @param action 页面action名称，多个action可由逗号分隔
     * @param eventName 事件名
     * @params params 事件参数
     */
    triggerPageEvent: function( action, eventName, params ) {
        var me = this,
            actions = action.split( /\s*,\s*/ ),
            pageView;

        Chassis.$.each( actions, function( index, item ) {
            pageView = me.router.views[ item ];

            if ( pageView ) {
                pageView.trigger( eventName, params );
            }
            
        } );
    },

    /**
     * 获取当前活动action
     * @method getCurrentAction
     * @return {string}
     */
    getCurrentAction: function() {
        return this.router && this.router.currentView.action || '';        
    }

});