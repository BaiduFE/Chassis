/*jshint camelcase:false*/

/**
 * @fileOverview 页面视图控制器
 */

/**
 * 子视图控制器
 *
 * @class PageView
 * @namespace __Chassis__
 * @constructor
 * @param {object} opts
 * @param {string} action
 */
var PageView = Chassis.PageView = View.PageView = View.extend({

	_initialize: function( opts, action ) {

		this.action = action;

		this._tops = {};
		this._logicString = this._getLogicString( opts );

		PageView.__super__._initialize.call( this, opts );
	},

	isActive: function() {
        var display = this.$el.css( 'display' );
		return  display !== 'none' && display !== '';
	},

	_getLogicString: function( opts ) {
        return Chassis.$.param( opts || {} ) || '__empty_logic_string__'; 
    },

    savePos: function() {

        // @note: chrome pc (mac or win) 浏览器存在读取值不准确的情况
        this._tops[ this._logicString ] = window.scrollY;
    },

    restorePos: function( opts ) {
        var me = this,
            cls = me._logicString = me._getLogicString( opts );

        // @note: iOS4需要延时
        setTimeout( function() {
            window.scrollTo( 0, me._tops[ cls ] || 0 );
        }, 0 );
    }
});