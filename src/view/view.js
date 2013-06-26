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
    this._init.apply( this, arguments );
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
     * @method remove
     */
    remove: function() {
        var me = this;

        // 解除事件绑定
        me.undelegateEvents();

        me.stopListening();

        // 移除DOM
        me.$el.remove();

        // 移除引用
        me.$el = me.el = null;

        return me;
    },

    /**
     * 设置view所属的元素
     * @method setElement
     * @param  {mixed} el 新元素或者选择符
     * @param  {boolean} delegate 是否需要重新绑定事件
     */
    setElement: function( el, delegate ) {
        var me = this;

        if ( me.$el ) {
            me.undelegateEvents();
        }

        me.$el = el instanceof Chassis.$ ? el : Chassis.$( el );
        me.el = me.$el[ 0 ];

        if ( delegate !== false ) {
            me.delegateEvents();
        }

        return me;
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
     *          'orientationchange window': 'refresh'
     *      }
     */
    delegateEvents: function( events ) {

        var me = this,
            key,
            method,
            match,
            eventName,
            selector,
            fullEventName;

        if ( !(events || (events = me.events)) ) {
            return me;
        }

        
        me.undelegateEvents();

        for ( key in events ) {

            if ( events.hasOwnProperty( key ) ) {
                method = events[ key ];

                if ( !Chassis.isFunction( method ) ) {
                    method = me[ events[ key ] ];
                }

                if ( !method ) {
                    continue;
                }

                match = key.match( rDelegateEventSplitter );
                eventName = match[ 1 ];
                selector = match[ 2 ];

                method = Chassis.proxy( method, me );

                fullEventName = eventName + '.delegateEvents' + me.cid;

                switch ( selector ) {
                    case '':
                        me.$el.on( fullEventName, method );
                        break;
                    default:
                        me.$el.on( fullEventName, selector, method );
                }
            }
        }

        return me;
    },

    /**
     * 解除view的所有事件绑定
     */
    undelegateEvents: function() {
        var me = this,
            eventName = '.delegateEvents' + me.cid;

        me.$el.off( eventName );

        return me;
    },

    /**
     * 子类初始化
     */
    initialize: noop,

    /**
     * 初始化
     * @method initialize
     * @param {object} opts
     */
    _init: function( opts ) {

        // 子类初始化
        this.initialize( opts );
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

        var me = this,
            attrs,
            $el;

        // 如果未指定DOM元素则自动创建并设置id/className
		if ( !me.el ) {

            // attributes有可能来自原型属性因此需要复制
			attrs = Chassis.mixin( {}, me.attributes || {} );

			if ( me.id ) {
				attrs.id = me.id;
			}

			if ( me.className ) {
				attrs[ 'class' ] = me.className;
			}

			$el = Chassis.$( '<' + me.tagName + '>' ).attr( attrs );
			me.setElement( $el, false );

        // 如果已经指定DOM元素则不会设置id/className
		} else {
			me.setElement( me.el, false );
		}
	}
} );

View.extend = Chassis.extend;