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