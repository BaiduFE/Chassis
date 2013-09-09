/**
 * @fileOverview history 基类
 */

/**
 * History
 * @class History
 * @namespace __Chassis__
 * @constructor
 * @param {object} handler
 */

var History = Chassis.History = function( handler ) {
    this.handler = handler || [];
};

Chassis.mixin( History.prototype, Events, {
    
    /**
     * 为路由对象手动创建路由
	 * > route 参数可以是 路由字符串 或 正则表达式。 
     * > 每个捕捉到的被传入的路由或正则表达式，都将作为参数传入回调函数
     *
     * @public
     * @method route
     * @param {object} routeRe
     * @param {Function} callback
     * @return 
     **/
    route: function( routeRe, callback ) {

        this.handler.unshift({
            reg : routeRe,
            callback : callback
        });
    },
    
    /**
     * 手动到达应用程序中的某个位置
     *
     * @public
     * @method navigate
	 * @param {string} fragment hash字符串
	 * @param {object} opts 配置，opts.trigger指定是否触发事件
     * @return 
     **/
    navigate: function() {
        return this;
    },
    

    
    /**
     * 当所有的 路由 创建并设置完毕，调用 Chassis.history.start() 开始监控路由变化事件并分发事件。
     * @public
     * @method start
     * @param {object} opts (optional) 
	 * opts.trigger 是否触发事件;
	 * opts.pushState 是否使用pushState;
	 * opts.root 使用pushState时配置的相对路径;
     * @return 
     **/
    start : function( opts ) {
        var handler = {},
            type = 'Hash',
			router;
        
        if ( !opts ) {
            opts = {};
        }
		
		
		
		if ( opts.router ) {
			
			opts.trigger = (opts.trigger === false) ? false : true;
			router = Chassis.Router.extend( opts.router );
			new router();
		}
        opts.trigger = (opts.trigger === false) ? false : true;
		handler = Chassis.clone( this.handler );
		
        this.destroy();
		
        if ( opts.pushState && history.pushState ) {
            type = 'Pushstate';
        }
        
        if ( !History[ type ] ) {
            throw new Error( 'History.' + type + ' is not found' );
        }
        Chassis.history = new History[ type ]( handler );
        return Chassis.history.start( opts );
    },

    loadUrl: function( fragmentOverride ) {
        var i = 0,
            fragment = this.getFragment( fragmentOverride ),
            len = this.handler.length,
            handler;

        for ( ; i < len; i++ ) {
            handler = this.handler[ i ];
			
			if ( handler.reg.test( fragment ) ) {
                handler.callback.call( this, fragment );
                break;
            }
			
        }
    },
	
	reload : function() {
		return this.loadUrl( this.getFragment() );
	},

    /**
     * 销毁当前的history实例，并重新生成新的History实例。
     * > 当应用的路由配置在hash和pushState之间来回切换时尤其有用。
     *
     * @public
     * @method destroy
     * @return 
     **/
    destroy : function() {
        this.pushState = false;
        this.root = '/';
        this.handler = [];
        this.cacheOptions = null;
        $( window ).off( 'hashchange' );
        $( window ).off( 'popstate' );
        History.start = false;
        
        // 销毁后重新指向原始的History，方便重新调用
        Chassis.history = new History();
    }
} );


History.extend = Chassis.extend;

Chassis.history = new History();