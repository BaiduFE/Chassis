/**
 * @fileOverview Router核心实现
 * @requires Router.History
 */

var Router = Chassis.Router = function( options ) {
    
    options || (options = {});
    
    if( options.routes ) {
        this.routes = options.routes;
    }
    
    this._bindRoutes();
    
    this.initialize.apply(this, arguments);
    
    
};

Chassis.mixin(Router.prototype, Events, {
    
    /**
     * 实例化一个路由对象
     *
     * @public
     * @method initialize
     * @return 
     **/
    initialize : function() {},
    
    /**
     * 为路由对象手动创建路由，route 参数可以是 路由字符串 或 正则表达式。 
     * 每个捕捉到的被传入的路由或正则表达式，都将作为参数传入回调函数（callback）。
     *
     * @public
     * @method route
     * @return 
     **/
    route : function(route, name) {
        var self = this,
            callback = self[ name ],
            routeRe = self._routeToRegExp(route),
            keys = routeRe.exec(route).slice(1);
        
        Chassis.each(keys,function(item,key){
            keys[ key ] = item.substring(1);
        });
        
        Chassis.history.route(routeRe,function( fragment ){
        
            var vals,Request;
            
            vals = routeRe.exec( fragment ).slice(1);
            Request = Chassis.object(keys,vals);
            
            self.Request = Request;

            callback.call(self);
        
        });

    },
    
    /**
     * 批量绑定路由事件
     *
     * @private
     * @method _bindRoutes
     * @return 
     **/
    _bindRoutes : function() {
        var self = this;
        
        Chassis.each(self.routes,function(item,key) {
            self.route(key,item);
        });
        
        return self;
    },
    
    /**
     * 将路由规则解析为正则
     *
     * @private
     * @method _routeToRegExp
     * @return 
     **/
    _routeToRegExp : function(route){
        var optionalParam = /\((.*?)\)/g,
            namedParam    = /(\(\?)?:\w+/g,
            splatParam    = /\*\w+/g,
            escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;
            
        route = route.replace(escapeRegExp, '\\$&')
               .replace(optionalParam, '(?:$1)?')
               .replace(namedParam, function(match, optional){
                 return optional ? match : '([^\/]+)';
               })
               .replace(splatParam, '(.*?)');
        return new RegExp('^' + route + '$');
    },
    
    /**
     * 手动路由
     *
     * @private
     * @method navigate
     * @return 
     **/
    navigate : function(fragment, options){
        return Chassis.history.navigate(fragment, options);
    }
    
});

Router.extend = Chassis.extend;