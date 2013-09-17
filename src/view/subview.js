/*jshint camelcase:false,undef:false*/

/**
 * @fileOverview 子视图
 */

/**
 * 子视图控制器
 *
 * @class SubView
 * @namespace __Chassis__
 * @constructor
 * @param {object} opts
 * @param {view} parent 子视图的父级视图
 */

/**
 * 当前子视图所在子页面即将切入时触发
 * @event beforeswitchin
 * @param {object} e
 */

/**
 * 当前子视图所在子页面即将切入时触发
 * @event afterswitchin
 * @param {object} e
 */

var SubView = Chassis.SubView = View.SubView = View.extend({

	_initialize: function( opts, parent ) {

		this.parent = parent;

        // 自动监听SUBPAGE事件
        this.listenTo( this, 'beforeswitchin', this.onBeforeSwitchIn );
        this.listenTo( this, 'afterswitchin', this.onAfterSwitchIn );
        
        this.listenTo( this, 'beforepagein', this.onBeforePageIn );
        this.listenTo( this, 'afterpagein', this.onAfterPageIn );

		SubView.__super__._initialize.call( this, opts );
	},

    /**
     * View所属SubPage即将显示前调用，需子类实现。
     * @method onBeforeSwitchIn
     * @param {object} e
     *      e.from: 当前显示但是即将被替换的子页面
     *      e.to: 即将显示的子页面
     *      e.params: 路由参数
     *          e.params.from: 路由切换时的源页面
     *          e.params.to: 路由切换时的目标页面
     *          e.params.params: 路由参数
     * @override
     */
    onBeforeSwitchIn: noop,

    /**
     * View所属SubPage显示后前调用，需子类实现。
     * @method onAfterSwitchIn
     * @param {object} e
     *      e.from: 当前显示但是即将被替换的子页面
     *      e.to: 即将显示的子页面
     *      e.params: 路由参数
     *          e.params.from: 路由切换时的源页面
     *          e.params.to: 路由切换时的目标页面
     *          e.params.params: 路由参数
     * @override
     */
    onAfterSwitchIn: noop

});