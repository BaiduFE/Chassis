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
     *      这种配置方式会使用默认的路由行为：路由目标为`__Chassis__.PageView.info`;
     *      使用这种配置方式时如果路由action为空时会默认路由到`__Chassis__.PageView.index`,
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
        
        Chassis.each( keys, function( item, key ) {
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
        
        Chassis.each( me.routes, function( item, key ) {
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
        
        
        Chassis.each( me.routes, function( item, key ) {
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

        Chassis.each( request, function( val, key ) {
            request[ key ] = decodeURIComponent( val );
        } );

    }
    
} );

Router.extend = Chassis.extend;