/**
 * @fileOverview Router核心实现
 * @requires Router.History
 */

/**
 * 路由
 * @class Router
 * @namespace __Chassis__
 * @constructor
 * @param {object} opts
 */
var Router = Chassis.Router = function( opts ) {
    
    if ( !opts ) {
        opts = {};
    }

    if ( opts.routes ) {
        this.routes = opts.routes;
    }
    
    this._bindRoutes();
    
    this.initialize.apply( this, arguments );
	
	if ( opts.start ) {
        Chassis.history.start();
    }
};

Chassis.mixin( Router.prototype, Events, {
    
    /**
     * 实例化一个路由对象
     *
     * @public
     * @method initialize
	 * @optional
     * @return 
     **/
    initialize : function() {},
    
    /**
     * 为路由对象手动创建路由，route 参数可以是 路由字符串 或 正则表达式。 
     * 每个捕捉到的被传入的路由或正则表达式，都将作为参数传入回调函数（callback）。
     *
     * @public
     * @method route
     * @param {string} route
     * @param {string} name
     * @param {function} callback
     * @return 
     **/
    route : function( route, name, callback ) {

        var me = this,
            routeRe = me._routeToRegExp( route );

        if ( Chassis.isFunction( name ) ) {
            callback = name;
            name = '';
        }

        if ( !callback ) {
            callback = this._getHandler( name );
        }
        
        Chassis.history.route( routeRe, function( fragment ) {

            callback.apply( me, routeRe.exec( fragment ).slice( 1 ) );
        
        } );

    },
    
    /**
     * 手动路由
     *
     * @private
     * @method navigate
     * @param {string} fragment
     * @param {object} opts
     * @return 
     **/
    navigate : function( fragment, opts ) {
        return Chassis.history.navigate( fragment, opts );
    },

    
    /**
     * 批量绑定路由事件
     *
     * @private
     * @method _bindRoutes
     * @return 
     **/
    _bindRoutes : function() {
        var me = this;

        Chassis.$.each( me.routes, function( key, item ) {
            me.route( key, item );
        } );
		
        return me;
    },
    
    /**
     * 将路由规则解析为正则
     *
     * @private
     * @method _routeToRegExp
     * @param {string} route
     * @return 
     **/
    _routeToRegExp : function( route ) {

        var optionalParam = /\((.*?)\)/g,
            namedParam    = /(\(\?)?:\w+/g,
            splatParam    = /\*\w+/g,
            escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;
            
        route = route.replace( escapeRegExp, '\\$&' )
                .replace( optionalParam, '(?:$1)?' )
                .replace( namedParam, function( match, optional ) {
                    return optional ? match : '([^\/]+)';
                } )
                .replace( splatParam, '(.*?)' );
        return new RegExp( '^' + route + '$' );
    },

    _getHandler: function( action ) {
        var me = this;

        return function() {
            var fn = me[ action ];

            // 先执行自定义路由行为
            if ( Chassis.isFunction( fn ) &&
                    fn.apply( this, arguments ) === false ) {
                return;
            }

        };

    }
    
} );

Router.extend = Chassis.extend;