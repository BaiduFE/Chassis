/**
 * @fileOverview 视图
 * 层级关系管理
 * 事件管理
 */

// View构造函数中的opts参数中需要添加到View实例中的属性列表
var viewOptions = [ 'model', 'el', 'id', 'attributes', 'className',
		'tagName', 'events' ],
    rDelegateEventSplitter = /^(\S+)\s*(.*)$/,
    noop = function() {};

/**
 * 视图类
 * @class View
 * @constructor
 * @namespace __Chassis__
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
                        Chassis.$( window[ selector ] )
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
    append: function( view, opts ) {
        this._addSubview( view, '', opts );
    },

    /**
     * 将view作为当前视图的子视图，并将view所属dom元素prepend父视图所属dom元素
     * @param  {[type]} view
     * @return {[type]}
     */
    prepend: function( view, opts ) {
        this._addSubview( view, 'PREPEND', opts );
    },

    /**
     * 将view作为当前视图的子视图（不涉及dom元素的处理）
     * @param  {[type]} view
     * @return {[type]}
     */
    setup: function( view, opts ) {
        this._addSubview( view, 'SETUP', opts );
    },

    /**
     * 子类初始化
     */
    init: noop,
    
    /**
     * subview异步加载记录
     *
     */
    
    _asyncSubView : {
        'global'  : [],
        'subview' : {}
    },

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
        
        this._asyncSubView.global = [ { 
                event  : 'beforepagein', 
                params : params 
            } 
        ];
        
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
        
        this._asyncSubView.global.push({ 
                event  : 'afterpagein', 
                params : params 
            } 
        );
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
	
	_removeRecycleView : function() {
		var me = this;
		
		Chassis.$.each( me.children, function( k, v ) {
			if ( !v.$el ) {
				delete me.children[ v.cid ];
			}
		} );
		
		
	},
	
	_addSubview: function( view, action, opt, async, trigger ) {
        var me = this,
			oldView = view,
            pid,
            pe,
            viewElement,
			_subView;
		
		me._removeRecycleView();
		
        if ( (!Chassis.isObject( view )) &&  (!Chassis.SubView[ view ]) ) {
            me._addAsyncSubview.call( me, view, action, opt );
            return;
        }

        // TODO 已经加载，而且还是个字符串，那么可以重用
        // 乾坤大挪移
        if ( !Chassis.isObject( view ) ) {
            
            viewElement = '<div class="__common_subview__" data=' + 
                                view + '></div>';
            
            view = Chassis.commonView[ view ];
            
			// 被销毁了
			if ( !view || !view.$el ) {

				_subView = new Chassis.SubView[ oldView ]( opt, me );
				Chassis.commonView[ oldView ] = _subView;
				
				return me._addSubview( _subView, action, opt, false, true );
			}
			
            switch ( action ) {

                // 不进行DOM处理
                case 'SETUP': 
                    break;
                case 'PREPEND':
                    view.$el.after(  viewElement );
                    this.$el.prepend( view.$el );
                    
                    break;
                default:
                    view.$el.after( viewElement );
                    this.$el.append( view.$el );
                    break;
            }
            return;
        }
        
		if ( view instanceof Chassis.View ) {
			this.children[ view.cid ] = view;
			view.parent = this;
            
            if ( !async ) {
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
            }

			

            if ( trigger ) {
                me._triggerAsyncSubviewEvent.call( me, view );
            }
		} else {
			throw new Error( 'view is not an instance of Chassis.View.' );
		}
	},
    
    _addAsyncSubview : function( view, action, opt, async ) {
        var me = this,
            pid,
            pe;
            
        pid = Chassis.uniqueId( 'subview-placeholder-' );
        pe = $( '<div id="' + pid + '"></div>' );
        
        me._asyncSubView.subview[ view ] = {
            id : pid,
            event : []
             
        };
        
        switch ( action ) {
            case 'SETUP' : 
                break;
            case 'PREPEND' :
                me.$el.prepend( pe );
                break;
            default :
                me.$el.append( pe );
                break;
        }
        
        Chassis.View.getSubViewSource( view, function() {
		
			me._renderAsyncSubViewStack[ view ] = function() {
				var placeHolder = me.$el.find( '#' + pid  ),
					subView;
				
				if ( !Chassis.SubView[ view ] ) {
					return;
				}
				subView = new Chassis.SubView[ view ]( opt, me );
				Chassis.commonView[ view ] = subView;
				switch ( action ) {
					case 'SETUP': 
						break;
					case 'PREPEND':
						placeHolder.replaceWith( subView.$el );
						break;
					default:
						placeHolder.replaceWith( subView.$el );
						break;
				}
				
				me._addSubview.call( me, subView, action, opt, true, true );
			};
			
			if ( me._renderAsyncSubViewStart ) {
				
				if ( me._renderAsyncSubViewCall === '*' ) {
					me.renderAsyncSubView( view );
					
				} else {
					(view in me._renderAsyncSubViewCall) &&
							me.renderAsyncSubView( view );
				}
				
				me._renderAsyncSubViewStack[ view ] = null;
			}
			
        } );
        
    },
    
    _triggerAsyncSubviewEvent : function( view ) {
        var me = this;
        
        Chassis.$.each( me._asyncSubView.global, function( key, value ) {
            view.trigger( value.event, value.params );
        } );
    },
    
    _repairCommonSubView : function() {
        var me = this;
        
        me.$el.find( '.__common_subview__' ).each(function( k, v ) {
        
            var subviewName = $( v ).attr( 'data' ),
                subView = Chassis.commonView[ subviewName ],
                cloneView = subView.$el.clone();
            
            cloneView.attr( 'shadow', subviewName );
            
            if ( subView.$el.next().attr( 'shadow' )  !== subviewName ) {
                subView.$el.after( cloneView );
				subView.parent = me;
            }
            
            subView.$el.after( '<div class="__common_subview__" data=' + 
                                subviewName + '></div>' );
            $( v ).replaceWith( subView.$el );
            
            me.$el.find( '[shadow=' + subviewName + ']' ).remove();
            
        });
    },
	
	_renderAsyncSubViewStack : {},
	
	_renderAsyncSubViewStart : false,
	
	_renderAsyncSubViewCall : {},
	
    /**
     * render async view
	 * 异步加载的模块并不是自动添加到视图中的
     * @method renderAsyncView
	 * @param  {string} [subView]     subView的name
     */
	renderAsyncSubView : function( subView, callback ) {
		var me = this,
			oldcallback;
		
		me._renderAsyncSubViewStart = true;
		
		oldcallback =  callback || function() { };
		
		callback = function() {
			window.setTimeout( function() {
				oldcallback.call( me );
			}, 20 );
		};

		if ( !subView ) {
			me._renderAsyncSubViewCall = '*';
			Chassis.$.each( me._renderAsyncSubViewStack, 
					function( key, value ) {
						value && value.call( me );
						me._renderAsyncSubViewStack[ key ] = null;
					} 
			);
			callback.call( me );
			return;
		}
		
		if ( !Chassis.isArray( subView ) ) {
			subView = [ subView ];
		}
		
		subView = Chassis.object( subView, subView );
		
		if ( me._renderAsyncSubViewCall !== '*' ) {
			me._renderAsyncSubViewCall = 
				Chassis.mixin( {}, me._renderAsyncSubViewCall, subView );
		}
		
		Chassis.$.each( me._renderAsyncSubViewStack, function( key, value ) {
			if ( value && (key in subView) ) {
				value.call( me );
				me._renderAsyncSubViewStack[ key ] = null;
			}
		} );
		
		callback.call( me );
	}
    
} );

// 引入view.loading.js后会在view的原型增加以下方法

/**
 * 显示页面Loading
 * @method showLoading
 */

/**
 * 隐藏页面Loading
 * @method hideLoading
 */

/**
 * 显示全局Loading
 * @method showGLoading
 */

/**
 * 隐藏全局Loading
 * @method hideGLoading
 */

Chassis.mixin( View, {

    /**
     * 创建自定义视图类，Chassis.View的子类中可用。
     * @method define
     * @param  {string} viewId      视图ID，确保在相同类型视图下是唯一的。
     * @param  {object} protoProps  视图原型方法和属性。
     * @param  {object} staticProps 视图静态方法和属性。
     * @static
     * @example
     *     // 定义PageView
     *     Chassis.PageView.define( 'home', {} );
     *
     *     // 定义PageView下面的SubView（SubView ID建议加上所属PageView的ID）
     *     Chassis.SubView.define( 'home.banner', {} );
     */
    define: function( viewId, protoProps, staticProps ) {
        
        /*
        if ( this[ viewId ] ) {
            throw new Error( 'View ' + viewId + ' exists already.' );
        }
        */

        this[ viewId ] = this.extend( protoProps, staticProps );

    },

    /**
     * 获取自定义视图类，Chassis.View的子类中可用。
     * @method get
     * @static
     * @param  {string} viewId 视图ID
     * @return {view}
     */
    get: function( viewId ) {
        return this[ viewId ];
    },

    /**
     * 创建自定义视图类实例，Chassis.View的子类中可用。
     * @method create
     * @static
     * @param  {string} viewId 视图ID
     * @param  {object} opts1  创建实例参数（不同类型的视图类具有不同的参数）
     * @param  {object} opts2  创建实例参数（不同类型的视图类具有不同的参数）
     * @return {view}
     */
    create: function( viewId, opts1, opts2  ) {

        var klass = this.get( viewId );

        return klass ? (new klass( opts1, opts2 )) : null;
    },
	
	/**
     * 根据字符串获取View实例
     * @method getViewInstance
     * @static
     * @param  {string} action 
     * @param  {object} request  请求参数
     * @return {view}
     */
	getViewInstance : function( action, request ) {
		var me = this,
			view;
		view = new Chassis.PageView[ action ]( request, action );
		
		return view;
	},


    extend: Chassis.extend
} );