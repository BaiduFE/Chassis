/**
 * @fileOverview Loading管理
 */

/**
 * Loading管理
 * @class Loading
 * @namespace __Chassis__.View
 */
var Loading = View.Loading = Chassis.Loading = (function() {

	function isExistedDom( el ) {
		return !!Chassis.$( el )[ 0 ].parentNode;
	}

	function setup( el ) {
		var $el = this.$el = Chassis.$( el ).hide();

		if ( !isExistedDom( $el ) ) {
			Chassis.$( 'body' ).append( $el );
		}
	}

	return {

		/**
		 * 设置全局以及页面Loading所对应的元素
		 * @param  {mixed} globalEl 全局Loading元素
		 * @param  {mixed} [viewEl] 页面Loading元素，如果省略则`viewEl=globalEl`
		 */
		setup: function( globalEl, viewEl ) {
			var argLen = arguments.length;

			if ( !argLen ) {
				return;
			}

			if ( argLen === 1 ) {
				viewEl = globalEl;
			}

			Loading.Global.setup( globalEl );
			Loading.View.setup( viewEl );
		},

		/**
		 * 全局Loading
		 * @class Global
		 * @namespace __Chassis__.View.Loading
		 */
		Global: {

			/**
			 * 设置Loading元素，可以是已经存在元素的选择符或HTML结构。
			 * @method setup
			 * @static
			 * @param {mixed} el
			 */
			setup: setup,

			/**
			 * 显示全局Loading
			 * @method show
			 * @static
			 */
			show: function() {
				this.$el.show();
			},

			/**
			 * 隐藏全局Loading
			 * @method hide
			 * @static
			 */
			hide: function() {
				this.$el.hide();
			}
		},

		/**
		 * 视图Loading
		 * @class View
		 * @namespace __Chassis__.View.Loading
		 */
		View: {

			/**
			 * 设置Loading元素，可以是已经存在元素的选择符或HTML结构。
			 * @method setup
			 * @static
			 * @param {mixed} el
			 */
			setup: setup,

			/**
			 * 将Loading元素插入View中并显示（如果不指定View则直接显示）
			 * @method show
			 * @static
			 * @param  {View} [view]
			 */
			show: function( view ) {

				Loading.Global.hide();

				if ( view ) {
					view.$el.append( this.$el );
				}

				this.$el.show();
				
			},

			/**
			 * 隐藏Loading
			 * @method hide
			 * @static
			 */
			hide: function() {

				Loading.Global.hide();
				this.$el.remove();
			}
		},

		/**
		 * 将全局方法添加到view中作为原型方法。
		 * @method mixToView
		 * @static
		 */
		mixToView: function() {

			var GL = Loading.Global,
				VL = Loading.View;

			Chassis.mixin( Chassis.View.prototype, {

				showLoading: function() {
					VL.show( this );
				},

				hideLoading: function() {
					VL.hide();
				},

				showGLoading: function() {
					GL.show();
				},

				hideGLoading: function() {
					GL.hide();
				}
			} );
		}
	};
})();

Loading.mixToView();

