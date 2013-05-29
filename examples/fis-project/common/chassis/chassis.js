(function(){
/**
 * @fileOverview 命名空间初始化
 */

/**
 * 命名空间
 * @class Chassis
 */
var root = this,
	exportName = 'Chassis',
	_Chassis = root[ exportName ],
	Chassis;

if ( typeof exports !== 'undefined' ) {
	Chassis = exports;
} else {
	Chassis = root[ exportName ] = {};
}

/**
 * 版本号
 * @property VERSION
 * @static
 * @type string
 */
Chassis.VERSION = '0.1.0';

/**
 * 页面切换动画命名空间
 * @property FX
 * @static
 * @type string
 */
Chassis.FX = {}; 

/**
 * $
 * @property $
 * @type jQuery|Zepto|ender
 */
Chassis.$ = root.jQuery || root.Zepto || root.ender;


/**
 * 获取无冲突命名空间
 * @method noConflict
 * @static
 * @return Chassis
 */
Chassis.noConflict = function() {
	root[ exportName ] = _Chassis;
	return this;
};
 /*jshint camelcase:false*/
 /**
 * @fileOverview 语言增强
 */

var proto = Array.prototype,
    nativeForEach = proto.forEach,
    breaker = {},
    toString = proto.toString,
    nativeIsArray = Array.isArray;

Chassis.mixin = $.extend;

/**
 * 实现类继承
 * @method extend
 * @static
 * @param  {object} protoProps  原型属性或方法
 * @param  {object} staticProps 类属性或方法
 * @return {function}
 */
Chassis.extend = function( protoProps, staticProps ) {
    var parent = this,
        Proxy,
        child;

    // 构造函数
    if ( protoProps && protoProps.hasOwnProperty( 'constructor' ) ) {
        child = protoProps.constructor;
    } else {
        child = function() {
            return parent.apply( this, arguments );
        };
    }

    // 静态方法
    Chassis.mixin( child, parent, staticProps );

    // 原型链处理
    Proxy = function() {
        this.constructor = child;
    };

    Proxy.prototype = parent.prototype;
    child.prototype = new Proxy();

    if ( protoProps ) {
        Chassis.mixin( child.prototype, protoProps );
    }

    child.__super__ = parent.prototype;

    return child;

};




      
      
Chassis._once = function( func ) {
    var me = this,
        ran = false, 
        memo;

    return function() {
        
        if ( ran ) {
            return memo;
        }
        
        ran = true;
        memo = func.apply( me, arguments );
        func = null;
        return memo;
    };
};

Chassis.has = function( obj, key ) {
    return hasOwnProperty.call( obj, key );
};

Chassis.keys = function( obj ) {
    var keys = [];
    
    if ( obj !== Object( obj ) ) {
        throw new TypeError( 'Invalid object' );
    }
    
    Chassis.$.each( obj, function( key, item ) {
        if ( Chassis.has( obj, key ) ) {
            keys[ keys.length ] = key;
        }
    } );
    
    return keys;
};
    
Chassis.uniqueId = (function() {
    var idCounter = 0;

    return function( prefix ) {
        var id = ++idCounter + '';
        return prefix ? prefix + id : id;
    };
})();

    

Chassis.isArray = Chassis.$.isArray;

Chassis.isObject = function( obj ) {
    return obj === Object( obj );
};

Chassis.isFunction = Chassis.$.isFunction;

Chassis.clone = function( obj ) {
    if ( !Chassis.isObject( obj ) ) {
        return obj;
    }
    return Chassis.isArray( obj ) ? obj.slice() : Chassis.mixin( {}, obj );
};

Chassis.result = function( object, property ) {
    var value;

    if ( object === null ) {
        return null;
    }
    
    value = object[ property ];
    return Chassis.isFunction( value ) ? value.call( object ) : value;
};

Chassis.escape = function( str ) {
    return str ?
        str.replace( /\&/g, '&amp;' )
            .replace( /</g, '&lt;' )
            .replace( /\>/g, '&gt;' )
            .replace( /\"/g, '&quot;' )
            .replace( /\'/g, '&#x27' )
            .replace( /\//g, '&#x2F' ):
        str;

};

Chassis.proxy = $.proxy;

Chassis.object = function( list, values ) {
    var result = {};

    if ( list === null ) {
        return {};
    }
    
    Chassis.$.each( list, function( key, item ) {
        if ( values ) {
            result[ item ] = values[ key ];
        } else {
            result[ item[ 0 ] ] = item[ 1 ];
        }
    } );

    return result;
};

$.support = Chassis.mixin( $.support || {}, {
    has3d: 'WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix()
} );

Chassis.Undefined;
/**
 * @fileOverview 事件机制
 */

/**
 * Chassis Events模块
 *
 * @module Events
 *
 */
var Events = Chassis.Events = {
    
    /**
     * on
     *
     * @param {string} name
     * @param {function} callback
     * @param {object} context
     * @example
     * var obj = _.extend({},Chassis.Events);
     * obj.on("a b c",callback);
     * obj.on({a:callback, b:callback, c:callback},obj);
     */
    on: function( name, callback, context ) {
        var events;
        
        if ( !eventsApi( this, 'on', name, [ callback, context ] ) ||
                !callback ) {
            return this;
        }
        
        if ( !this._events ) {
            this._events = {};
        }
        
        events = this._events[ name ] || (this._events[ name ] = []);
        events.push({
            callback: callback,
            context: context,
            ctx: context || this
        });
        
        return this;
    },

    /**
     * once
     *
     * @param {string} name
     * @param {function} callback
     * @param {object} context
     * @example
     * var obj = _.extend({},Chassis.Events);
     * obj.once("a b c",callback);
     * obj.once({a:callback, b:callback, c:callback},obj);
     */
    once: function( name, callback, context ) {
        var me = this,
            once;
        
        if ( !eventsApi( this, 'once', name, [ callback, context ] ) ||
                !callback ) {
            return this;
        }
        

        once = Chassis._once(function() {
            me.off( name, once );
            callback.apply( me, arguments );
        });
        
        once._callback = callback;

        return this.on( name, once, context );
    },

    /**
     * off
     *
     * @param {string} name
     * @param {function} callback
     * @param {object} context
     * @example
     * var obj = _.extend({},Chassis.Events);
     * obj.off("a b c",callback);
     * obj.off({a:callback, b:callback, c:callback},obj);
     */
    off: function( name, callback, context ) {
        var me = this,
            retain, 
            ev, 
            events, 
            names, 
            i, 
            l, 
            j, 
            k;
            
        if ( !this._events ||
                !eventsApi( this, 'off', name, [ callback, context ] ) ) {
            return this;
        }
        
        if ( !name && !callback && !context ) {
            this._events = {};
            return this;
        }

        names = name ? [ name ] : Chassis.keys( this._events );
        
        Chassis.$.each( names, function( nKey, nItem ) {
            name = nItem;
            events = me._events[ name ];

            if ( events ) {
                me._events[ name ] = retain = [];

                if ( callback || context ) {
                    Chassis.$.each( events, function( eKey, eItem ) {
                        ev = eItem;
                        if ( (callback && callback !== ev.callback &&
                                callback !== ev.callback._callback) ||
                                (context && context !== ev.context) ) {
                            retain.push( ev );
                        }
                    } );
                    
                }
                if ( !retain.length ) {
                    delete me._events[ name ];
                }
            }
        } );
        
        return this;
    },

    /**
     * trigger
     *
     * @param {string} name
     * @example
     * var obj = _.extend({},Chassis.Events);
     * obj.trigger("a b c");
     */
    trigger: function( name ) {
        var args,
            events,
            allEvents;
        
        if ( !this._events ) {
            return this;
        }
        
        args = [].slice.call( arguments, 1 );
        
        if ( !eventsApi( this, 'trigger', name, args ) ) {
            return this;
        }
        
        events = this._events[ name ];
        allEvents = this._events.all;
        
        if ( events ) {
            triggerEvents( events, args );
        }
        
        if ( allEvents ) {
            triggerEvents( allEvents, arguments );
        }
        
        return this;
    },

    /**
     * stopListening
     *
     * @param {string} name
     * @param {function} callback
     * @param {object} context
     * @example
     * var obj = _.extend({},Chassis.Events);
     * obj.stopListening("a b c",callback);
     */
    stopListening: function( obj, name, callback ) {

        var listeners = this._listeners,
            me = this,
            deleteListener,
            id;
        
        if ( !listeners ) {
            return this;
        }
        
        deleteListener = !name && !callback;
        
        if ( typeof name === 'object' ) {
            callback = me;
        }
        
        if ( obj ) {
            (listeners = {})[ obj._listenerId ] = obj;
        }
        
        Chassis.$.each( listeners, function( key, item ) {

            listeners[ key ].off( name, callback, me );
            
            if ( deleteListener ) {
                delete me._listeners[ key ];
            }
        } );
        
        return this;
    }

};

var eventSplitter = /\s+/;

var eventsApi = function( obj, action, name, rest ) {
    var names,
        i,
        l;

    if ( !name ) {
        return true;
    }

    if ( typeof name === 'object' ) {
        Chassis.$.each( name, function( key, item ) {
            obj[ action ].apply( obj, [ key, item ].concat( rest ) );
        } );
        
        return false;
    }

    if ( eventSplitter.test( name ) ) {
        
        names = name.split( eventSplitter );
        
        Chassis.$.each( names, function( key, item ) {
            obj[ action ].apply( obj, [ item ].concat( rest ) );
        } );
        
        return false;
    }

    return true;
};


var triggerEvents = function( events, args ) {

    var l = events.length, 
        a1 = args[ 0 ], 
        a2 = args[ 1 ], 
        a3 = args[ 2 ], 
        i = -1,
        ev;
    
    switch ( args.length ) {
        case 0: 
            while ( ++i < l ) {
                (ev = events[ i ]).callback.call( ev.ctx ); 
            }
            return;
        case 1: 
            while ( ++i < l ) {
                (ev = events[ i ]).callback.call( ev.ctx, a1 ); 
            }
            return;
        case 2: 
            while ( ++i < l ) {
                (ev = events[ i ]).callback.call( ev.ctx, a1, a2 ); 
            }
            return;
        case 3: 
            while ( ++i < l ) {
                (ev = events[ i ]).callback.call( ev.ctx, a1, a2, a3 ); 
            }
            return;
        default: 
            while ( ++i < l ) {
                (ev = events[ i ]).callback.apply( ev.ctx, args );
            }
    }
};

var listenMethods = { listenTo: 'on', listenToOnce: 'once' };


Chassis.$.each( listenMethods, function( method, implementation ) {
    Events[ method ] = function( obj, name, callback ) {

        var me = this,
            listeners,
            id;
        
        listeners = this._listeners || (this._listeners = {});
        id = obj._listenerId || (obj._listenerId = Chassis.uniqueId( 'l' ));
        listeners[ id ] = obj;
        
        if ( typeof name === 'object' ) {
            callback = me;
        }
        
        obj[ implementation ]( name, callback, this );
        return this;
    };
} );

Events.bind   = Events.on;
Events.unbind = Events.off;

Chassis.mixin( Chassis, Events );
/**
 * @fileOverview Model
 */

var Model = Chassis.Model = function( attributes, opts ) {
    var me = this,
        attrs = attributes || {},
        defaults;

    if ( !opts ) {
        opts = {};
    }

    
    me.attributes = {};
    me.cid = Chassis.uniqueId( 'c' );
    
    
    attrs = Chassis.mixin( {}, me.defaults || {}, attrs );
    me.set( attrs, opts );

    me.init.apply( me, arguments );
};

Chassis.mixin( Model.prototype, Events, {
    
    idAttribute : 'id',
    
    init : function() {},
    
    /**
     * fetch方法获取数据的url。
     * 注意这个方法的意思和backbone是有区别的
     *
     * @method url
     * @return 
     **/
    url : function() {},
    
    /**
     * 从模型获取当前属性值，比如：csser.get("title")
     *
     * @method get
     * @param {string} key
     * @return 
     **/
    get : function( key ) {
        return this.attributes[ key ];
    },
    
    /**
     * 属性值为非 null 或非 undefined 时返回 true
     *
     * @method has
     * @param {string} key
     * @return 
     **/
    has : function( key ) {
        return this.get( key ) !== null;
    },
    
    /**
     * 向模型设置一个或多个散列属性。
     * 如果任何一个属性改变了模型的状态，在不传入 {silent: true} 选项参数的情况下，
     * 会触发 "change" 事件。 
     *
     * @method set
     * @param {string} key
     * @param {*} val
     * @param {object} opts
     * @return 
     **/
    set : function( key, val, opts ) {

        var me = this,
            attr, 
            attrs, 
            unset, 
            changes, 
            silent, 
            changing, 
            prev, 
            current,
            validateResult;
            
        if ( key === null ) {
            return me;
        }

        if ( typeof key === 'object' ) {
            attrs = key;
            opts = val;
        } else {
            (attrs = {})[ key ] = val;
        }
        
        if ( !opts ) {
            opts = {};
        }

        
        // 变更之前先做校验
        validateResult = me.validate.call( me, attrs );
        
        if ( validateResult !== true ) {
            me.trigger( 'error', validateResult );
            return;
        }
        
        me._previousAttributes = Chassis.clone( me.attributes );
        
        if ( me.idAttribute in attrs ) {
            me[ me.idAttribute ] = attrs[ me.idAttribute ];
        }
        
        Chassis.$.each( attrs, function( key, item ) {
            if ( opts.unset ) {
                delete me.attributes[ key ];
            } else {
                me.attributes[ key ] = item;
            }   
        } );
        
        me.trigger( 'change', me );
    },
    
    /**
     * 从内部属性散列表中删除指定属性。 如果未设置 silent 选项，会触发 "change" 事件。
     *
     * @method clear
     * @param {string} attr
     * @param {object} opts
     * @return 
     **/
    unset : function( attr, opts ) {
        return this.set( attr, Chassis.Undefined,
                Chassis.mixin( {}, opts, { unset: true } ) );
    },
    
    /**
     * 从模型中删除所有属性。 如果未设置 silent 选项，会触发 "change" 事件。
     *
     * @method clear
     * @param {object} opts
     * @return 
     **/
    clear : function( opts ) {
        var attrs = {};
        Chassis.$.each( this.attributes, function( key, item ) {
            attrs[ key ] = Chassis.Undefined;
        } );
        
        return this.unset( attrs, opts );
    },
    
    /**
     * 返回模型 attributes 副本的 JSON 字符串化形式。 它可用于模型的持久化、序列化，或者传递到视图前的扩充。
     *
     * @method toJSON
     * @return 
     **/
    toJSON : function() {
        return Chassis.clone( this.attributes );
    },
    
    /**
     * 返回与模型属性一致的新的实例。
     *
     * @method clone
     * @return 
     **/
    clone : function() {
        return new this.constructor( this.attributes );
    },
    
    /**
     * 与 get 类似, 但返回模型属性值的 HTML 转义后的版本。 
     * 如果将数据从模型插入 HTML，使用 escape 取数据可以避免 XSS 攻击.
     *
     * @method escape
     * @param {string} attr
     * @return 
     **/
    escape : function( attr ) {
        return Chassis.escape( this.get( attr ) );
    },
    
    /**
     *在 "change" 事件发生的过程中，本方法可被用于获取已改变属性的旧值。
     *
     * @method previous
     * @param {string} attr
     * @return 
     **/
    previous : function( attr ) {
        return (attr === null || !this._previousAttributes) ?
                null : this._previousAttributes[ attr ];
    },
    
    /**
     * 返回模型的上一个属性散列的副本。
     * 一般用于获取模型的不同版本之间的区别，或者当发生错误时回滚模型状态。
     *
     * @method previousAttributes
     * @return 
     **/
    previousAttributes : function() {
        return Chassis.clone( this._previousAttributes );
    },
    
    /**
     * 模型是否已经保存到服务器。 如果模型尚无 id，则被视为新的。
     *
     * @method isNew
     * @return 
     **/
    isNew : function() {
        return this.id === null;
    },
    
    /**
     * 手动获取数据
     *
     * @method fetch
     * @param {object} opts
     * @return 
     **/
    fetch : function( opts ) {
        var me = this,
            _opt;
        
        opts = opts ? Chassis.clone( opts ) : {};
        
        opts = Chassis.mixin( {}, {
            dataType : 'json',
            success : function() {}
        }, opts );
        
        _opt = Chassis.mixin( {}, opts, {
            url : me.url(),
            success : function( resp ) {
                resp = me.parse( resp, opts );

                opts.success.call( me );
                me.set( resp, opts );
            },
            error : function() {
                me.trigger( 'error' );
            }
        } );
        
        
        me.sync( _opt );
    },
    
    /**
     * 自定义数据解析，建议用自定义的逻辑重载它
     *
     * @method parse
     * @param {object} resp
     * @param {object} opts
     * @return 
     **/
    parse: function( resp, opts ) {
        return resp;
    },
    
    /**
     * 自定义校验，建议用自定义的逻辑重载它
     *
     * @method validate
     * @return 
     **/
    validate : function() {
        return true;
    },
    
    /**
     * 手动触发 "change" 事件。
     *
     * @method change
     * @return 
     **/
    change : function() {
        this.trigger( 'change' );
    },
    
    sync : function( opts ) {
        return Chassis.$.ajax.call( this, opts );
    }
    
    
    
    
    
    // 对服务端做模型操作基本没用，故不做实现
    /*
    ,save : function(){}
    ,destroy : function(){}
    */
    
    
    // 可以全局指定，没什么实际意义
    /*
    ,urlRoot : function(){}
    */
    
    // 数据变更暂不实现(除非实现数据双向绑定)
    /*
    ,hasChanged : function(){}
    ,changedAttributes : function(){}
    */
    
} );


Model.extend = Chassis.extend;
/**
 * @fileOverview 数据缓存
 */
/**
 * @fileOverview Router核心实现
 * @requires Router.History
 */

var Router = Chassis.Router = function( opts ) {
    
    if ( !opts ) {
        opts = {};
    }
    
    /**
     * @property {array|object} routes 路由规则
     * @description
     *      路由规则包括两种配置方式
     *      1. 键值对配置，例如：
     *      {
     *          '': 'index',
     *          'info/:id': 'info'
     *      }
     *      其中的key表示路由解析规则，规则中包括`action`和参数；`action`指定路由的目标
     *      页面；
     *      其中的val表示的是自定义路由处理函数，如果需要自定义路由行为则可以在`Router`类中
     *      定义名称为val的函数，其实参为路由规则解析后得到的参数；如果需要阻止默认路由行为则
     *      需要返回false。
     *
     *      2. 数组配置，例如：
     *      [
     *          'info/:id'
     *      ]
     *      这种配置方式会使用默认的路由行为：路由目标为`Chassis.PageView.info`;
     *      使用这种配置方式时如果路由action为空时会默认路由到`Chassis.PageView.index`,
     *      可以通过`opts.index`来重新设置;
     */
    if ( opts.routes ) {
        this.routes = opts.routes;
    }

    // 默认的路由action
    this._index = opts.index || 'index';

    // 保存的视图列表，对应不同页面
    this.views = {};

    // 记录控制器变化
    this.currentView = null;
    this.previousView = null;
    
    this._bindRoutes();
    
    this.init.apply( this, arguments );
};

Chassis.mixin( Router.prototype, Events, {
    
    /**
     * 实例化一个路由对象
     *
     * @public
     * @method init
     * @return 
     **/
    init : function() {},
    
    /**
     * 为路由对象手动创建路由，route 参数可以是 路由字符串 或 正则表达式。 
     * 每个捕捉到的被传入的路由或正则表达式，都将作为参数传入回调函数（callback）。
     *
     * @public
     * @method route
     * @param {string} route
     * @param {string} name
     * @return 
     **/
    route : function( route, name ) {

        var me = this,
            callback = this._getHandler( name ),
            routeRe = me._routeToRegExp( route ),
            keys = routeRe.exec( route ).slice( 1 );
        
        Chassis.$.each( keys, function( key, item ) {
            keys[ key ] = item.substring( 1 );
        } );
        
        Chassis.history.route( routeRe, function( fragment ) {
        
            var vals, 
                Request;
            
            vals = routeRe.exec( fragment ).slice( 1 );
            Request = Chassis.object( keys, vals );
            
            me.Request = Request;

            callback.call( me );
        
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
     * @property {array} [pageOrder] 页面切换顺序配置
     * 产品线按以下格式配置，使用action名称
     */
    pageOrder: [/*'index', 'search', 'page'*/],

    /**
     * @property {string} [defaultTransition] 默认页面切换动画，合理选择配置
     * @note: slide比较适用于固高切换
     * @note: fade比较适用DOM树较小的两个页面切换
     * @note: simple性能最好，但效果最一般
     * @note: dropdown只能用于固高切换
     */
    defaultTransition: 'slider',

    /**
     * @property {object} [pageTransition] 页面切换动画配置
     * @key {string} actionname-actionname，"-"号分隔的action名称串，不分先后，但支持精确设定
     * @value {string} animation name
     * @note: 以index和search为例，有两种可设定的值：index-search和search-index：
     *     1. 如果只设定了其中一个，则不分先后顺序同时生效。比如'index-search':'fade'，
     *     无论index->search还是search->index，切换动画总是fade
     *     2. 如果两个都设定了，则分别生效。比如'index-search':'fade'，'search-index':
     *     'slide'，那么index->search使用fade动画，search->index使用slide动画
     *     3. 如果两个都没有设定，则都是用默认动画
     */
    pageTransition: {
        
        // 'index-search': 'fade'
        // ,'index-page': 'slide'
    },

    /**
     * 通用切换页面逻辑
     * @method switchPage
     * @param {pageview} from
     * @param {pageview} to
     * @param {object} params
     */
    switchPage: function( from, to, params ) {

        var me = this,
            e = {
                from: from,
                to: to,
                params: params
            },
            dir = 0, 
            order = me.pageOrder, 
            fromAction = from && from.action,
            toAction = to && to.action,
            fromIndex = order.indexOf( fromAction ),
            toIndex = order.indexOf( toAction );

        /**
         * 计算页面切换方向：0-无方向，1-向左，2-向右
         */
        if ( fromAction !== toAction ) {
            if ( -1 !== fromIndex && -1 !== toIndex ) {
                dir = fromIndex > toIndex ? 2 : 1;
            }
        }

        // 记忆位置
        if ( me.enablePositionRestore && from ) {
            from.savePos();
        }
        
        if ( from ) {
            from.trigger( 'beforepageout', e );
        }
        
        if ( to ) {
            to.trigger( 'beforepagein', e );
        }


        /*
        Chassis.each( 
            from == to ? [ from ] : [ from, to ], function( item, key ) {

            item && item.trigger( 'pagebeforechange', {
                from: me.previousView, 
                to: me.currentView,
                params: params 
            });
        });
        */
        
        me._doTransition(
            from,
                to,
                dir,
                function() {
                
                /**
                 * 尽可能等切换稳定了再开始数据请求
                 * 延后一点用户感觉不出来，但能保证页面的稳定性
                 */

                // 恢复位置
                if ( me.enablePositionRestore && to ) {
                    to.restorePos( params );
                }
                

                /*
                $.each(from == to ? [from] : [from, to], function(key, item){
                    // item && console.log('pageafterchange');
                    item && item.trigger(
                        'pageafterchange', {
                            from: me.previousView, 
                            to: me.currentView,
                            params: params 
                        });
                });
                */
                
                if ( from ) {
                    
                    if ( from.trigger( 'afterpageout', e ) ) {
                        from.$el.hide();
                    }
                   
                    
                }
                
                if ( to ) {
                    to.trigger( 'afterpagein', e );
                }

            }
        );

    },

    /**
     * 选择相应切换动画并执行
     *
     * @method _doTransition
     * @private
     * @param {pageview} from
     * @param {pageview} to
     * @param {int} dir
     * @param {function} transitionEnd
     */
    _doTransition: function( from, to, dir, transitionEnd ) {

        var me = this,
            animate;

        // 根据action组合，选择不同切换动画方法
        animate = me._selectTransition( from && from.action, to && to.action );

        animate = animate || Chassis.FX[ me.defaultTransition ].animate; 

        animate(
            from && from.el, 
                to && to.el, 
                dir,
                transitionEnd
        );

    },

    /**
     * 根据action组合选择相应切换动画
     * @param {string} fromAction
     * @param {string} toAction
     * @return {string}
     */
    _selectTransition: function( fromAction, toAction ) {
        var me = this,
            transition,
            fx;
        if ( !fromAction || !toAction ) {
            return;
        }


        // key不分顺序，需要试探两种顺序的配置
        transition = me.pageTransition[ fromAction + '-' + toAction ] ||
                me.pageTransition[ toAction + '-' + fromAction ];

        
        fx = Chassis.FX[ transition ];
        return fx && fx.animate;
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
        
        // 对routes支持数组的处理
        me._routeArray.call( me );
        
        Chassis.$.each( me.routes, function( key, item ) {
            me.route( key, item );
        } );
        
        return me;
    },
    
    /**
     * 当routes为Array时解析为Object
     *
     * @private
     * @method _routeArray
     * @return 
     **/
    _routeArray : function() {
        var me = this,
            _routes = {},
            hasPageOrder = !!me.pageOrder.length;
        
        if ( !Chassis.isArray( me.routes ) ) {
            return me;
        }
        
        
        Chassis.$.each( me.routes, function( key, item ) {
            var first = item.split( /\//g )[ 0 ],
                name = first;

            if ( first.substring( 0, 1 ) === '*' ) {
                name = 'all';
            }
            
            if ( first === '' ) {
                name = me._index;
            }
            
            _routes[ item ] = name;
            
            if ( !hasPageOrder ) {
                me.pageOrder.push( name );
            }
        } );
        
        me.routes = Chassis.clone( _routes );
        
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

            me._doAction( action, me.Request );

        };

    },

    _doAction: function( action, request ) {

        var me = this,
            view = me.views[ action ];

        this._decodeRequest( request );
        
        if ( !view ) {
            view = me.views[ action ]  =
                    new Chassis.PageView[ action ]( request, action ); 
        } 
        
        // 切换视图控制器
        me.previousView = me.currentView;
        me.currentView = view;

        me.trigger( 'routechange', {
            from: me.previousView,
            to: me.currentView
        } );

        me.switchPage(
            me.previousView, 
                me.currentView, 
                request
        );
    },

    _decodeRequest: function( request ) {

        if ( !request ) {
            return;
        }

        Chassis.$.each( request, function( key, val ) {
            request[ key ] = decodeURIComponent( val );
        } );

    }
    
} );

Router.extend = Chassis.extend;
/**
 * @fileOverview history 基类
 */

var History = Chassis.History = function( handler ) {
    this.handler = handler || [];
};

Chassis.mixin( History.prototype, Events, {
    
    /**
     * 为路由对象手动创建路由，route 参数可以是 路由字符串 或 正则表达式。 
     * 每个捕捉到的被传入的路由或正则表达式，都将作为参数传入回调函数(注意和Backbone还是有所不同的)
     *
     * @public
     * @method route
     * @param {object} routeRe
     * @param {Function} callback
     * @return 
     **/
    route: function( routeRe, callback ) {
        this.handler.push({
            reg : routeRe,
            callback : callback
        });
    },
    
    /**
     * 手动到达应用程序中的某个位置 
     * (注意这个方法会被继承类实现)
     *
     * @public
     * @method navigate
     * @return 
     **/
    navigate: function( /*fragment, opts, replace*/ ) {
        return this;
    },
    
    /**
     * 传入url触发对应的事件
     *
     * @private
     * @method _triggerHandle
     * @param {string} fragment
     * @return 
     **/
    _triggerHandle : function( fragment ) {
        var me = this;

        Chassis.$.each( me.handler, function( key, item ) {
            if ( !item.reg.test( fragment ) ) {
                return;
            }

            item.callback.call( me, fragment );
        } );
    },
    
    /**
     * 当所有的 路由 创建并设置完毕，调用 Chassis.history.start() 开始监控 hashchange 事件并分配路由。
     * (注意这是一个会被重写的基类)
     *
     * @public
     * @method start
     * @param {object} opts
     * @return 
     **/
    start : function( opts ) {
        var handler = Chassis.clone( this.handler ),
            type = 'Hash';
        
        if ( !opts ) {
            opts = {};
        }
        
        this.destroy();
        
        if ( opts.pushState ) {
            type = 'Pushstate';
        }
        
        if ( !History[ type ] ) {
            throw new Error( 'History.' + type + ' is not found' );
        }
        Chassis.history = new History[ type ]( handler );
        return Chassis.history.start( opts );
    },

    /**
     * 当所有的 路由 创建并设置完毕，调用 Chassis.history.start() 开始监控 hashchange 事件并分配路由。
     * (注意这个是Backbone没有的，除非单个应用同时使用hash和pushstate才用到这个)
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
/**
 * @fileOverview 浏览器历史管理
 */

History.Hash = History.extend({
    
    /**
     * 当所有的 路由 创建并设置完毕，调用 Chassis.history.start() 开始监控 hashchange 事件并分配路由。
     *
     * @overwrite
     * @public
     * @method start
     * @param {object} opts
     * @return 
     **/
    start : function( opts ) {
        var me = this;

        if ( History.start ) {
            return;
        }
        
        History.start = true;
        
        if ( !opts ) {
            opts = {};
        }
        
        // 开始监听hashchange
        if ( ('onhashchange' in window) &&
                ((typeof document.documentMode === 'undefined') ||
                document.documentMode === 8) ) {

            me._onHashChangeEvent();
            
            // 处理当前hash
            me.navigate( me._getHash(), { trigger: true }, true ); 
            
            return;
        }
        
        throw new Error( 'current browser do not suport hashchange event;' );
    },
    
    /**
     * 手动到达应用程序中的某个位置 
     *
     * @overwrite
     * @public
     * @method navigate
     * @param {string} fragment
     * @param {object} opts
     * @param {boolean} replace
     * @return 
     **/
    navigate : function( fragment, opts, replace ) {
        var me = this;
        
        // 先取消监听，完成后再回来
        me._offHashChangeEvent();
        
        if ( !opts ) {
            opts = { trigger : true };
        }
        
		if ( fragment.indexOf( '#' ) === 0 ) {
			fragment = fragment.substring( 1 );
		}
        
        me._setHash( fragment );
        
        
        if ( opts.trigger ) {
            me._triggerHandle.call( me, fragment );
        }
        
        window.setTimeout( function() {
            me._onHashChangeEvent();
        }, 0 );
        
        

    },
    
    /**
     * 设置hash 
     *
     * @private
     * @method _setHash
     * @param {string} fragment
     * @return 
     **/
    _setHash : function( fragment ) {

        if ( this._getHash() !== fragment ) {
            window.location.hash = '#' + fragment;              
        }

        return this;
    },
    
    /**
     * 获取hash 
     *
     * @private
     * @method _getHash
     * @return 
     **/
    _getHash : function() {
        var match = window.location.href.match( /#(.*)$/ );
        return match ? match[ 1 ] : '';
    },
    
    
    _onHashChangeEvent : function() {
        var me = this;
        $( window ).on( 'hashchange', function( e ) {

            me.navigate( me._getHash(), { trigger: true }, true );
            
        } );
    },
    _offHashChangeEvent : function() {
        var me = this;
        $( window ).off( 'hashchange' );
    }
});
/**
 * @fileOverview 使用pushstate实现的history
 * @requires Router.History
 */

History.Pushstate = History.extend({
    
    /**
     * 当所有的 路由 创建并设置完毕，调用 Chassis.history.start() 开始监控 hashchange 事件并分配路由。
     *
     * @overwrite
     * @public
     * @method start
     * @param {object} opts
     * @return 
     **/
    start : function( opts ) {
        var me = this;

        if ( History.start ) {
            return;
        }
        
        History.start = true;
        
        if ( !opts ) {
            opts = {};
        }
        
        
        if ( opts.root ) {
            me.root = opts.root;
        }
        
        // 当浏览器前进后退时触发
        $( window ).on( 'popstate', function() {
            me._triggerHandle.call( me, me._getFragment() );
        } );
        
        // 处理当前pushState
        me._triggerHandle.call( me, me._getFragment() );
        
        return;
       

    },
    
    /**
     * 手动到达应用程序中的某个位置 
     *
     * @overwrite
     * @public
     * @method navigate
     * @param {string} fragment
     * @param {object} opts
     * @return 
     **/
    navigate : function( fragment, opts/*, replace*/ ) {
        var me = this;
        
        if ( !opts ) {
            opts = {};
        }
        
        
        me._setPushState( fragment );
        
        
        me.cacheOptions = null;
        
        if ( opts.trigger ) {
            me._triggerHandle.call( me, fragment );
        }
    },
    
    /**
     * 设置pushstate 
     *
     * @private
     * @method _setPushState
     * @param {string} fragment
     * @return 
     **/
    _setPushState : function( fragment ) {

        fragment = fragment || this.root;
        history.pushState( {}, document.title, fragment );
        return this;
        
    },
    
    /**
     * 获取当前的fragment
     *
     * @private
     * @method _getFragment
     * @return 
     **/
    _getFragment : function() {
        
        return window.location.href
                .split( /\// )
                .slice( 3 )
                .join( '/' )
                .substring( this.root.length );
    }
    
    
});

History.Pushstate.extend = Chassis.extend;
/**
 * @fileOverview 视图
 * 层级关系管理
 * 事件管理
 */

// View构造函数中的opts参数中需要添加到View实例中的属性列表
var viewOptions = [ 'model', 'el', 'id', 'attributes', 'className',
		'tagName', 'events' ];

var rDelegateEventSplitter = /^(\S+)\s*(.*)$/;

var noop = function() {};

/**
 * 视图类
 * @class View
 * @constructor
 * @namespace Chassis
 * @param {object} opts
 * @param {view} super
 */
var View = Chassis.View = function( opts ) {
	this.cid = Chassis.uniqueId( 'view' );
	this._configure( opts );
	this._ensureElement();
    this._initialize.apply( this, arguments );
    this.delegateEvents();
};

Chassis.mixin( View.prototype, Events, {

	// view默认自动生成的元素的标签为div
	tagName: 'div',

	/**
	 * $
	 * @method $
	 * @param  {mixed} selector
	 * @return {$}
	 */
	$: function( selector ) {
        return this.$el.find( selector );
    },

    /**
     * 完成View的渲染，需子类重载实现。
     * @method render
     */
    render: function() {
        return this;
    },

    /**
     * 移除DOM元素以及清除事件监听
     * @method destroy
     */
    destroy: function() {

        var cld = this.children,
            cid;

        this.onDestroy();

        /**
         * View销毁前触发事件
         * @event beforedestroy
         */
        this.trigger( 'beforedestroy', this );

        // 销毁子视图
        for ( cid in cld ) {
            if ( cld.hasOwnProperty( cid ) ) {
                cld[ cid ].destroy();
                delete cld[ cid ];
            }
        }

        // 解除事件绑定
        this.undelegateEvents();

        // 移除DOM
        this.$el.remove();

        // 移除引用
        this.$el = this.el = null;

        // 如果是子视图则从父视图中删除
        if ( this.parent ) {
            delete this.parent.children[ this.cid ];
        }

        // TODO subpages清除
        /**
         * View销毁后触发事件
         * @event afterdestroy
         */
        this.trigger( 'afterdestroy', this );

        return this;
    },

    /**
     * 设置view所属的元素
     * @method setElement
     * @param  {mixed} el 新元素或者选择符
     * @param  {boolean} delegate 是否需要重新绑定事件
     */
    setElement: function( el, delegate ) {
        if ( this.$el ) {
            this.undelegateEvents();
        }

        this.$el = el instanceof Chassis.$ ? el : Chassis.$( el );
        this.el = this.$el[ 0 ];

        if ( delegate !== false ) {
            this.delegateEvents();
        }

        return this;
    },

    /**
     * 设置需绑定的事件，事件由参数`events`或者`this.events`中的键值对指定。
     * 事件绑定采用代理的方式实现(除了选择符是window和document)，事件回调中的执行上下文为当
     * 前`View`实例。
     * @note 每次调用时都不会自动接绑定之前的事件，因此多次调用会多次绑定；
     * @method delegateEvents
     * @param  {objects} events
     * @example
     *      //格式为 {"event[ selector]": "callback"}
     *      {
     *          'mousedown .title': 'edit',
     *          'click .button': 'save',
     *          'click .open': function( e ){},
     *          'orientationchange window': 'refresh',
     *          'click document': 'close',
     *          'beforepagein view': 'onBeforePageIn',
     *          'change model': 'render'
     *      }
     */
    delegateEvents: function( events ) {

        var key,
            method,
            match,
            eventName,
            selector,
            fullEventName;

        if ( !(events || (events = this.events)) ) {
            return this;
        }

        // 默认undelegate时，对于view/model的事件不好处理，如果view/model的事件直接
        // 解绑定的话将会使外界注册的以及beforepagein/afterpagein失效；因此暂时去掉
        // 自动解绑定功能。
        // this.undelegateEvents();

        for ( key in events ) {

            if ( events.hasOwnProperty( key ) ) {
                method = events[ key ];

                if ( !Chassis.isFunction( method ) ) {
                    method = this[ events[ key ] ];
                }

                if ( !method ) {
                    throw new Error(
                        'Method "' + events[ key ] + '" does not exist' );
                }

                match = key.match( rDelegateEventSplitter );
                eventName = match[ 1 ];
                selector = match[ 2 ];

                method = Chassis.proxy( method, this );

                fullEventName = eventName + '.delegateEvents' + this.cid;

                switch ( selector ) {
                    case 'window':
                    case 'document':
                        Chassis.$(window[ selector ])
                                .on( fullEventName, method );
                        break;
                    case 'view':
                        this.listenTo( this, eventName, method );
                        break;
                    case 'model':
                        if ( this.model ) {
                            this.listenTo( this.model, eventName, method );
                        }
                        break;
                    case '':
                        this.$el.on( fullEventName, method );
                        break;
                    default:
                        this.$el.on( fullEventName, selector, method );
                }
            }
        }

        return this;
    },

    /**
     * 解除view的所有事件绑定
     */
    undelegateEvents: function() {
        var eventName = '.delegateEvents' + this.cid;
        this.$el.off( eventName );

        Chassis.$( window ).off( eventName );
        Chassis.$( document ).off( eventName );

        this.stopListening();

        return this;
    },

    /**
     * 将view作为当前视图的子视图，并将view所属dom元素append父视图所属dom元素
     * @param  {[type]} view
     * @return {[type]}
     */
    append: function( view ) {
        this._addSubview( view );
    },

    /**
     * 将view作为当前视图的子视图，并将view所属dom元素prepend父视图所属dom元素
     * @param  {[type]} view
     * @return {[type]}
     */
    prepend: function( view ) {
        this._addSubview( view, 'PREPEND' );
    },

    /**
     * 将view作为当前视图的子视图（不涉及dom元素的处理）
     * @param  {[type]} view
     * @return {[type]}
     */
    setup: function( view ) {
        this._addSubview( view, 'SETUP' );
    },

    /**
     * 子类初始化
     */
    init: noop,

    /**
     * View销毁时调用，需子类实现。
     * @method onDestroy
     * @override
     */
    onDestroy: noop,

    /**
     * View所在Page即将显示前调用，需子类实现。
     * @method onBeforePageIn
     * @param {object} params
     *      params.from: 当前显示但是即将被替换的视图
     *      params.to: 即将显示的视图
     *      params.params: 路由参数
     * @override
     */
    onBeforePageIn: noop,

    /**
     * View所在Page显示后前调用，需子类实现。
     * @method onAfterPageIn
     * @param {object} params
     *      params.from: 被当前显示视图替换的视图
     *      params.to: 当前显示视图
     *      params.params: 路由参数
     * @override
     */
    onAfterPageIn: noop,

    /**
     * View所在PageView显示前触发
     * @event beforepagein
     * @param {object} params
     *      params.from: 即将被隐藏的视图
     *      params.to: 即将显示的视图
     *      params.params: 路由参数
     */
    _onBeforePageIn: function( params ) {

        this.onBeforePageIn( params );
        
    },

    /**
     * View所在PageView显示后触发
     * @event afterpagein
     * @param {object} params
     *      params.from: 已隐藏的视图
     *      params.to: 当前显示的视图
     *      params.params: 路由参数
     */
    _onAfterPageIn: function( params ) {

        this.onAfterPageIn( params );
    },

    /**
     * 初始化
     * @method initialize
     * @param {object} opts
     */
    _initialize: function( opts ) {

        this.root = this._getRoot();
        this.children = {};

        // 子类初始化
        this.init( opts );

        var listenTarget = this.root || this;

        // 自动监听常用事件
        this.listenTo( listenTarget, 'beforepagein', this._onBeforePageIn );
        this.listenTo( listenTarget, 'afterpagein', this._onAfterPageIn );
    },

    _getRoot: function() {
        var pointer = this;

        while ( pointer.parent ) {
            pointer = pointer.parent;
        }

        return pointer;
    },

	_configure: function( opts ) {

        var len = viewOptions.length,
            i = 0,
            opt,
            val;

        opts = opts || {};

        this.options = opts;

        for ( ; i < len; i++ ) {

            opt = viewOptions[ i ];
            val = this.options[ opt ];

            if ( val ) {
                this[ opt ] = val;
            }
        }
	},

	_ensureElement: function() {

        var attrs,
            $el;

        // 如果未指定DOM元素则自动创建并设置id/className
		if ( !this.el ) {

            // attributes有可能来自原型属性因此需要复制
			attrs = Chassis.mixin( {}, this.attributes || {} );

			if ( this.id ) {
				attrs.id = this.id;
			}

			if ( this.className ) {
				attrs[ 'class' ] = this.className;
			}

			$el = Chassis.$( '<' + this.tagName + '>' ).attr( attrs );
			this.setElement( $el, false );

        // 如果已经指定DOM元素则不会设置id/className
		} else {
			this.setElement( this.el, false );
		}
	},

	_addSubview: function( view, action ) {

		if ( view instanceof Chassis.View ) {
			this.children[ view.cid ] = view;
			view.parent = this;

			switch ( action ) {

				// 不进行DOM处理
				case 'SETUP': 
					break;
				case 'PREPEND':
					this.$el.prepend( view.$el );
					break;
				default:
					this.$el.append( view.$el );
					break;
			}

			view.$el.hide();

		} else {
			throw new Error( 'view is not an instance of Chassis.View.' );
		}
	}
} );

View.extend = Chassis.extend;
/*jshint camelcase:false*/

/**
 * @fileOverview 子视图
 */

/**
 * 子视图控制器
 *
 * @class SubView
 * @namespace Chassis
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

		SubView.__super__._initialize.call( this, opts );
	}

});
/*jshint camelcase:false*/

/**
 * @fileOverview 页面视图控制器
 */

/**
 * 子视图控制器
 *
 * @class PageView
 * @namespace Chassis
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
/*jshint camelcase:false*/

/**
 * @fileOverview 子页面管理
 */

/**
 * 子页面管理器
 * @class SubPageMgr
 * @constructor
 * @namespace View
 * @param  {object} opts
 * opts.owner {view} 子页面所属视图
 * [opts.max] {int} 子页面并存上限，超过此上限将回收
 * opts.kclass {view} 子页面实例对应的视图类
 * [opts.transition] {string|function} 子页面切换效果，如果是字符串则会从
 * `Chassis.FX[transition]`中调用切换方法；如果是函数则直接调用改函数来处理切换。
 * 对于自定义页面切换函数将接收以下参数：
 * fromEl: 待切出视图元素；
 * toEl: 待切入视图元素；
 * dirFn: 切换方向(0-无方向，1-向左，2-向右)；
 * transitionEnd: 切换完成后的回调，必须在自定义函数中调用；
 * [opts.dirFn] {function} 自定义切换方向(-1-默认，0-无方向，1-向左，2-向右)；
 */
var SPM = Chassis.SubPageMgr = View.SubPageMgr = function( opts ) {
	Chassis.mixin( this, {
		max: 3,

		/*owner,*/

		/*klass,*/
		
		/*dirFn,*/
		transition: 'slider'
	}, opts );

	this._init();
};

Chassis.mixin( SPM.prototype, Events, {

	/**
	 * 获取页面内的识别串，用于同一个页面中不同子页面间的识别
	 * @param  {object} params
	 * @return {string}
	 */
	getStamp: function( params ) {
		return Chassis.$.param( params || {} );
	},

	/**
	 * 添加新的子页面
	 * @param  {subview} subview
	 */
	register: function( subview ) {

		var pages = this.pagesMap;

		if ( !pages[ subview.cid ] ) {
			subview.__order__ = this._order++;
			pages[ subview.cid ] = subview;

			this.pagesList.push( subview );
		}

		return this;
	},

	/**
	 * 查找子页面
	 * @param  {string} key
	 * @param  {string} val
	 * @return {subview}
	 * @example
	 * spm.getBy( 'featureString', ft );
	 */
	getBy: function( key, val ) {

		var pages = this.pagesMap,
			subview,
			cid;

		if ( key === 'cid' ) {
			return pages[ val ];
		}

		for ( cid in pages ) {
			if ( pages.hasOwnProperty( cid ) ) {
				subview = pages[ cid ];

				if ( subview[ key ] === val ) {
					return subview;
				}
			}
		}

		return null;
	},

	/**
	 * 页面切换
	 * @param  {view} from subpage
	 * @param  {view} to subpage
	 * @param  {object} params
	 * params.from page
	 * params.to page
	 * params.params 页面切换参数
	 *
	 * @description 处理逻辑
	 *
	 * 1. 页面内部切换（即params.from === params.to，但是参数不同）
	 *  a. 根据params生成识别串并在SPM中查找目标子页面
	 *  b. 如果未找到则自动创建目标子页面并加入SPM
	 *  c. 重新设置current
	 *  d. 调用switch切换
	 *   d1. 显示目标子页面DOM元素
	 *   d2. 调用动画切换
	 *   d3. 隐藏切出子页面DOM元素
	 * 
	 * 2. 页面间切换（即params.from !== params.to)
	 *  a. 根据params生成识别串并在SPM中查找目标子页面
	 *  b. 如果未找到则自动创建目标子页面并加入SPM
	 *  c. 重新设置current
	 *  d. 调用switch切换
	 *   d1. 如果待切出子页面不为空（首次进入params.to时为空）则直接隐藏DOM
	 *   d2. 显示目标子页面DOM元素
	 */
	_switch: function( from, to, params ) {
		var dir = -1,
			fromPage = params.from,
			toPage = params.to,
			me = this;

		// 派发事件
		to.trigger( 'beforeswitchin', params );

		to.$el.show();

		// pageview内部子页面切换
		if ( fromPage === toPage ) {

			if ( this.dirFn ) {
				dir = this.dirFn( from, to );
			}

			if ( dir < 0 ) {
				dir = this._calcDir.apply( this, arguments );
			}


			this._doSwitch( from, to, dir, function() {

				// 隐藏已切出子页面
				if ( from ) {
					from.$el.hide();
				}

				me._setCurrent( to );

				to.trigger( 'afterswtichin', params );

				// 子页面回收
				me.recycle();
			} );

		// 从其他pageview切换到当前pageview: 子页面显示无需动画效果，直接显示即可
		} else {
			if ( from ) {
				from.$el.hide();
			}

			this._setCurrent( to );

			to.trigger( 'afterswtichin', params );

			this.recycle();
		}

		return this;
	},

	/**
	 * 自动判断并回收子页面，先入先出。
	 */
	recycle: function() {
		var list = this.pagesList,
			page;

		while ( list.length > this.max ) {
			page = list.shift();

			if ( page === this.current ) {
				list.push( page );
			} else {
				delete this.pagesMap[ page.cid ];
				page.destroy();
			}
		}
	},

	_init: function() {

		// 子页面列表，key为cid
		this.pagesMap = {};

		// 子页面列表，回收时使用
		this.pagesList = [];

		// 当前可见子页面
		this.current = null;

		// 上一可见子页面
		this.previous = null;

		// 子页面序号
		this._order = 0;

		this._boundToView();
	},

	/**
	 * 监听view的切换事件，判断是否需要处理子页面切换逻辑
	 */
	_boundToView: function() {

		this.listenTo( this.owner, 'beforepagein', this._beforePageIn );
		this.listenTo( this.owner, 'afterpagein', this._afterPageIn );
		this.listenTo( this.owner, 'beforedestroy', this._destroy );

	},

	/**
	 * 计算子页面切换方向，可以在dirFn选项中自定义切换方向
	 * @param {subview} 起始子页面
     * @param {subview} 目标子页面
     * @return {int} 方向参数（含义可扩展）：1-向左，2-向右
	 */
	_calcDir: function( from, to ) {

		if ( !from ) {
			return 0;
		}

		var pages = this.pagesMap,
			fromOrder = pages[ from.cid ].__order__,
			toOrder = pages[ to.cid ].__order__;

		return fromOrder > toOrder ? 2 : 1;
	},

	/**
	 * 处理子页面切换
	 * @param  {subview} from
	 * @param  {subview} to
	 * @param  {int} dir 方向参数（含义可扩展）：1-向左，2-向右
	 * @param  {function} transitionEnd
	 */
	_doSwitch: function( from, to, dir, transitionEnd ) {

		var fxFn;

		if ( Chassis.isFunction( this.transition ) ) {
			fxFn = this.transition;
		} else {
			fxFn = Chassis.FX[ this.transition ].animate;
		}

		if ( !fxFn ) {
			return;
		}

		fxFn( from, to, dir, transitionEnd );
	},

	/**
	 * 销毁子页面管理器，通常只在子页面管理器所在owner被销毁后执行
	 */
	_destroy: function() {
		this.stopListening();

		this.pagesMap =
				this.pagesList =
				this.current =
				this.previous =
				this.owner = null;
	},

	_beforePageIn: function( e ) {
		var from = e.from,
			to = e.to,
			params = e.params,
			stamp = this.getStamp( params );

		// 跨页面切换到子页面时，当前子页面若不是目标子页面，须提前隐藏，保证切换效果
		if (  from !== to &&
				this.current &&
				stamp !== this.current.stamp ) {
			this.current.$el.hide();
		}
	},

	_afterPageIn: function( e ) {

		var params = e.params,
			owner = this.owner,
			stamp = this.getStamp( params ),
			target = this.getBy( 'stamp', stamp ),
			subpage;

		// 如果子页面不存在则自动创建
		if ( !target ) {

			// TODO: 某些数据可能不允许自动生成subview
			subpage = new this.kclass( params || {}, owner );
			subpage.stamp = stamp;

			owner.append( subpage );
			this.register( subpage );

			target = subpage;
		}

		this._switch( this.current, target, e );
	},

	_setCurrent: function( subview ) {
		if ( subview !== this.current ) {
			this.previous = this.current;
			this.current = subview;
		}
	}

	/* TODO

	/**
	 * 从子页面管理器中移除指定页面
	 * @return {[type]}
	 */
	/*
	_remove: function( subview ) {
		var pagesMap = this.pagesMap,
			pagesList = this.pagesList;

		if( pagesMap[ subview.cid ] ) {
			delete pagesMap[ subview.cid ];

			for( var i = 0, len = pagesList.length; i < len; i++ ) {
				if( pagesList[ i ].cid == subview.cid ) {
					pagesList.splice( i, 1 );
					break;
				}
			}

			if( this.current === subview ) {
				//TODO
			}
		}
	}
	*/
} );
/*jshint camelcase:false*/

/**
 * @fileOverview  全局视图控制器
 * 用于管理独立于页面之外，不参与页面事件流的部分，层级上与全局路由同级，能读取全局路由信息
 */

/**
 * 全局视图控制器
 * @class GlobalView
 * @namespace Chassis
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
     * @param params.pageviews 页面视图列表，以action为索引
     */
    _onRouteChange: function( params ) {
        var from = params.from,
            to = params.to,
            pageviews = params.pageviews;
    

        /**
         * 路由事件
         * @event routechange
         * @param {pageview} params.from 起始页面视图
         * @param {pageview} params.to 目标页面视图
         * @param {object} params.pageviews 页面视图列表，以action为索引
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
/**
 * @fileOverview slider 切换效果
 */
Chassis.FX.slider = (function() {

	function generateTransform( x, y, z ) {
        return 'translate' + ($.support.has3d ? '3d' : '') + 
				'(' + x + 'px, ' + y + 'px' +
				($.support.has3d ? (', ' + z + 'px)') : ')');
    }

	return {
		animate: function( fromEl, toEl, dir, transitionEnd ) {

			// 由于多种动画混杂，必须进行位置恢复
			var restore = true,
				clientWidth = document.documentElement.clientWidth;

			if ( dir === 0 ) {
				if ( fromEl !== toEl ) {

					// 先隐藏当前，避免当前页面残留，确保切换效果
					if ( fromEl ) {
						$( fromEl ).hide();
					}
					
					if ( toEl ) {
						$( toEl ).show();
					}

				}

				if ( transitionEnd ) {
					transitionEnd();
				}

				return;
			}

			// 准备位置
			toEl = $( toEl );
			fromEl = $( fromEl );

			fromEl.css({
				'-webkit-transition-property': '-webkit-transform',
				'-webkit-transform': generateTransform( 0, 0, 0 ), 
				'-webkit-transition-duration': '0ms',
				'-webkit-transition-timing-function': 'ease-out',
				'-webkit-transition-delay': 'initial'
			});

			toEl.css({
				'-webkit-transition-property': '-webkit-transform',
				'-webkit-transform': generateTransform( (dir === 1 ?
                        '' : '-') + clientWidth, 0, 0 ), 
				'-webkit-transition-duration': '0ms',
				'-webkit-transition-timing-function': 'ease-out',
				'-webkit-transition-delay': 'initial',
				'display': 'block'
			});

			setTimeout( function() {

				function endAllTransition() {

					// 是否恢复原状，子页面切换使用
					if ( restore ) {
						fromEl.css({
							'display': 'none',
							'-webkit-transform': generateTransform( 0, 0, 0 ), 
							'-webkit-transition-duration': '0ms'
						});

						toEl.css({
							'display': 'block',
							'-webkit-transform': generateTransform( 0, 0, 0 ), 
							'-webkit-transition-duration': '0ms'
						});
					} else {

						fromEl.css({
							'display': 'none'
						});

						toEl.css({
							'display': 'block'
						});
					}
				}

				// 开始动画
				toEl.css({
					'-webkit-transform': generateTransform( 0, 0, 0 ), 
					'-webkit-transition-duration': '350ms'
				});

				fromEl.css({
					'-webkit-transform': generateTransform( (dir === 1 ? '-' :
					'') + clientWidth, 0, 0 ), 
					'-webkit-transition-duration': '350ms'
				});

				setTimeout( function() {
					setTimeout( function() {
						endAllTransition();

						if ( transitionEnd ) {
							transitionEnd();
						}
					}, 0 );
				}, 400 );

			}, 0 );
		}
	};
})();
/**
 * @fileOverview Loading管理
 */

/**
 * Loading管理
 * @class Loading
 * @namespace View
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
		},

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

})()