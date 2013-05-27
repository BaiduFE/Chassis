/**
 * @fileOverview Loading管理
 */

/**
 * Loading管理
 * @class Loading
 * @namespace View
 */
var Loading = View.Loading = (function() {

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
		 * 全局Loading
		 * @class Global
		 * @namespace Loading
		 */
		Global: {

			/**
			 * 设置Loading元素，可以是已经存在元素的选择符或HTML结构。
			 * @method setup
			 * @param {mixed} el
			 */
			setup: setup,

			/**
			 * 显示全局Loading
			 * @method show
			 */
			show: function() {
				this.$el.show();
			},

			/**
			 * 隐藏全局Loading
			 * @method hide
			 */
			hide: function() {
				this.$el.hide();
			}
		},

		/**
		 * 视图Loading
		 * @class View
		 * @namespace Loading
		 */
		View: {

			/**
			 * 设置Loading元素，可以是已经存在元素的选择符或HTML结构。
			 * @method setup
			 * @param {mixed} el
			 */
			setup: setup,

			/**
			 * 将Loading元素插入View中并显示（如果不指定View则直接显示）
			 * @method show
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
			 */
			hide: function() {

				Loading.Global.hide();
				this.$el.remove();
			}
		}
	};
})();