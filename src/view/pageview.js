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
		
		this._saveHTML( opts, action );
		
		this._recycle();
		
		Chassis.PageView.AllPageView = 
			Chassis.PageView.AllPageView ? Chassis.PageView.AllPageView : [];
		
		Chassis.PageView.AllPageView.push( this );

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
    },
	
	_saveHTML : function( opts, action ) {
	
		var me = this;
		
		Chassis.PageView.AllPageViewBox = 
			Chassis.PageView.AllPageViewBox || {};
		
		Chassis.PageView.AllPageViewBox[ me.$el.selector ] = 
			$( '<div>' ).append( me.$el.clone() ).html();

	},
	
	_recycle : function() {
		var me = this,
			max = 0,
			maxView = null,
			selector = null,
			parent = null,
			recycleKey = null;
		
		if ( !Chassis.PageView.AllPageView ) {
			return;
		}
		
		if ( Chassis.PageView.AllPageView.length < Chassis.View.MaxPageView ) {
			return;
		}
		
		Chassis.$.each( Chassis.PageView.AllPageView, function( k, v ) {
			var len = me._getChildrenLength( v );
			
			if ( (len > max) || (k === 0) ) {
				max = len;
				maxView = v;
				recycleKey = k;
			}
		} );
		
		
		Chassis.PageView.AllPageView.splice( recycleKey, 1 );
		
		selector = maxView.$el.selector;
		
		parent = maxView.$el.parent();
		
		maxView.destroy();
		
		// 重新回归
		
		parent.append( Chassis.PageView.AllPageViewBox[ selector ] );
		
		// 被删除后，再重新调用时需要重新create
		
	},
	
	_getChildrenLength : function( child ) {
		
		var me = this, 
			len = 0,
			keys = Object.keys( child.children || {} );
		
		len = keys.length;
		
		Chassis.$.each( keys, function( k, v ) {
			var _cur = child.children[ v ],
				_keys = Object.keys( _cur.children || {} );
				
			if ( _keys.length ) {
				len += me._getChildrenLength( _cur );
			}
		} );
		
		// 循环计算子节点
		
		
		return len;
	}
});