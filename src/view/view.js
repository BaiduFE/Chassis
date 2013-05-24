/**
 * @fileOverview 视图
 * 层级关系管理
 * 事件管理
 */

// View构造函数中的opts参数中需要添加到View实例中的属性列表
var viewOptions = ['model', 'el', 'id', 'attributes', 'className',
		'tagName', 'events'];

var rDelegateEventSplitter = /^(\S+)\s*(.*)$/;

var noop = function(){};

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

        this.onDestroy();

        /**
         * View销毁前触发事件
         * @event beforedestroy
         */
        this.trigger( 'beforedestroy', this );

        var cld = this.children;

        // 销毁子视图
        for( var cid in cld ) {
            cld[ cid ].destroy();
            delete cld[ cid ];
        }

        // 解除事件绑定
        this.undelegateEvents();
        this.stopListening();

        // 移除DOM
        this.$el.remove();

        // 移除引用
        this.$el = this.el = null;

        // 如果是子视图则从父视图中删除
        if( this.parent ) {
            delete this.parent.children[ this.cid ];
        }

        //TODO subpages清除
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
        if( this.$el ) {
            this.undelegateEvents();
        }

        this.$el = el instanceof Chassis.$ ? el : Chassis.$( el );
        this.el = this.$el[0];

        if (delegate !== false) {
            this.delegateEvents();
        }

        return this;
    },

    /**
     * 设置需绑定的事件，事件由参数`events`或者`this.events`中的键值对指定。
     * 事件绑定采用代理的方式实现(除了选择符是window和document)，事件回调中的执行上下文为当
     * 前`View`实例。
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
     *          'set model': 'render'
     *      }
     */
    delegateEvents: function( events ) {
		if( !( events || ( events = this.events ) ) ) {
			return this;
		}

		this.undelegateEvents();

		for( var key in events ) {
			var method = events[ key ];

			if( !Chassis.isFunction( method ) ) {
				method = this[ events[ key ] ];
			}

			if( !method ) {
				throw new Error(
						'Method "' + events[ key ] + '" does not exist' );
			}

			var match = key.match( rDelegateEventSplitter ),
				eventName = match[ 1 ],
				selector = match[ 2 ];

			method = Chassis.proxy( method, this );

			var fullEventName = eventName + '.delegateEvents' + this.cid;

			switch( selector ) {
				case 'window':
				case 'document':
					Chassis.$( window[ selector ] ).on( fullEventName, method );
					break;
				case 'view':
					this.on( eventName, method );
					break;
				case 'model':
					this.model.on( eventName, method );
					break;
				case '':
					this.$el.on( fullEventName, method );
					break;
				default:
					this.$el.on( fullEventName, selector, method );
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
        this.off( eventName );
        this.model.off( eventName );
        Chassis.$( window ).off( eventName );
        Chassis.$( document ).off( eventName );
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

    _onBeforePageIn: function( params ) {

        console.log( 'beforepagein' );
        console.log( params );

        this.onBeforePageIn( params );

        /**
         * View所在PageView显示前触发
         * @event beforepagein
         * @param {object} params
         *      params.from: 即将被隐藏的视图
         *      params.to: 即将显示的视图
         *      params.params: 路由参数
         */
        // pageview是事件触发起点因此无需再次触发
        if( !this.root ) {
            this.trigger( 'beforepagein', params );
        }
        
    },

    _onAfterPageIn: function( params ) {

        console.log( 'afterpagein' ); 
        console.log( params );

        this.onAfterPageIn( params );

        /**
         * View所在PageView显示后触发
         * @event afterpagein
         * @param {object} params
         *      params.from: 已隐藏的视图
         *      params.to: 当前显示的视图
         *      params.params: 路由参数
         */
        // pageview是事件触发起点因此无需再次触发
        if( !this.root ) {
            this.trigger( 'afterpagein', params );
        }
    },

    /**
     * 初始化
     * @method initialize
     * @param {object} opts
     */
    _initialize: function( opts ){

        this.root = this._getRoot();
        this.children = {};

        // 子类初始化
        this.init( opts );

        // 自动监听常用事件
        this.listenTo( this.root || this, 'beforepagein', this._onBeforePageIn );
        this.listenTo( this.root || this, 'afterpagein', this._onAfterPageIn );
    },

    _getRoot: function( ) {
        var pointer = this;

        while( pointer.parent ) {
            pointer = pointer.parent;
        }

        return pointer;
    },

	_configure: function( opts ) {
        opts = opts || {};

        this.options = opts;

        for( var i = 0, len = viewOptions.length; i < len; i++ ) {
            var opt = viewOptions[ i ],
                val = this.options[ opt ];

            if( val ) {
                this[ opt ] = val;
            }
        }
	},

	_ensureElement: function() {
		if ( !this.el ) {
			var attrs = this.attributes || {};

			if( this.id ) {
				attrs.id = this.id;
			}

			if( this.className ) {
				attrs.className = this.className;
			}

			var $el = Chassis.$( '<' + this.tagName + '>' ).attr( attrs );
			this.setElement( $el, false );

		} else {
			this.setElement( this.el, false);
		}
	},

	_addSubview: function( view, action ) {

		if( view instanceof Chassis.View ) {
			this.children[ view.cid ] = view;
			view.parent = this;

			switch( action ) {

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

			// TODO view.$el.hide();

		} else {
			throw new Error("view is not an instance of Chassis.View.");
		}
	}
} );

View.extend = Chassis.extend;