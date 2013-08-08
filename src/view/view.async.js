 /*jshint camelcase:false*/
 /**
 * @fileOverview view loader
 */


Chassis.mixin( View, {

	/**
	 * 获取View Instance
	 * @overwrite
	 *
	 */
	getViewInstance : function( action, request ) {
		var 
			me = this,
			view;
		
		if ( Chassis.PageView[ action ] ) {
			view = new Chassis.PageView[ action ]( request, action );
			
			return view;
		}
		
		// 如果pageview没有下载，则先使用通用pageview
		// 同时下载需要加载的pageview，加载成功后再触发对应的事件	
		if ( !Chassis.PageView._transition_ ) {
			
			if ( !Chassis.PageView._TRANSITION_ ) {
				Chassis.PageView._TRANSITION_ = 
					Chassis.PageView.extend({});
			}
			
			Chassis.PageView._transition_ = 
				new Chassis.PageView._TRANSITION_( request, action );
		}
		
		view  = Chassis.PageView._transition_;
		
		Chassis.View.getViewSource( action, function() {
			view.$el.hide();
			
			view = me.views[ action ] = 
				new Chassis.PageView[ action ]( request, action );
			me.previousView = me.currentView;
			me.currentView = view;
			
			view.$el.show();

			view.trigger( 'beforepagein,afterpagein', {
				from: me.previousView,
				to: me.currentView,
				params: request
			} );
		} );

		return view;
	},
	
	/**
	 * 获取View source
	 * @overwrite
	 *
	 */
	getViewSource : function( action, callback ) {
		Chassis.load( 'pageview-' + action, callback );
	},
	
	/**
	 * 获取SubView Instance
	 * @overwrite
	 *
	 */
	getSubViewInstance : function( view, callback ) {
		if ( Chassis.isObject( view ) ) {
			return view;
		}
		
		Chassis.View.getSubViewSource( view, callback );
	},
	
	/**
	 * 获取SubView Source
	 * @overwrite
	 *
	 */
	getSubViewSource : function( action, callback ) {
		Chassis.load( 'subview-' + action, callback );
	},
	
	
	addSubView : function() {
	
	},
	
	MaxPageView : 10

} );

Chassis.mixin( View.prototype, {
	getViewInstance    : View.getViewInstance,
	getViewSource      : View.getViewSource,
	getSubViewInstance : View.getSubViewInstance,
	getSubViewSource   : View.getSubViewSource
	
	// rewrite _addSubview
} );

