/*jshint camelcase:false, undef:false*/

/**
 * @fileOverview 将其他UI库组件封装成ChassisUI组件的基类
 */
var UI = Chassis.UI = {},
    widgetEventPrefix = 'widget.',
    WidgetView = UI.WidgetView = Chassis.SubView.extend({
    _initialize: function( opts, parent ) {
        this._applyProtocol();
        WidgetView.__super__._initialize.apply( this, arguments );
    },

    /**
     * 创建具体的UI组件实例
     * @return {[type]} [description]
     */
    createWidget: noop,

    
    bindEvents: function() {
        var events = this.protocol.events,
            me = this;

        Chassis.$.each( events, function( idx, event ) {
            me.widget.on( event, function() {
                var args = [].slice.call( arguments );
                
                // 区分widget事件与其他事件，加上widget前缀
                args.unshift( widgetEventPrefix + event );

                me.trigger.apply( me, args );
            } );
        } );
    },

    _applyProtocol: function() {
        var me = this,
            methods = this.protocol.methods,
            options = this.protocol.options,
            widgetOptions = {},
            viewOptions = this.options,
            model = this.model,
            events = this.protocol.events,
            _on = this.on;

        // 处理options
        Chassis.$.each( options, function( idx, optionName ) {
            if ( model && optionName in model ) {
                widgetOptions[ optionName ] = model[ optionName ];
            }
        } );

        this.widgetOptions = widgetOptions;

        // 注册方法
        // 如果是字符串则为方法名，直接赋值默认方法
        // 如果是对象则表示将该方法直接代理到widget上
        Chassis.$.each( methods, function( idx, methodName ) {
            var isString = typeof(methodName) === 'string';

            if ( isString && !(methodName in me) ) {
                me[ methodName ] = function() {
                    throw new Error( 
                        methodName + ' is not implmented.' );
                };
            }

            /*
            else {
                for( var widgetViewMethodName in methodName ) {
                    var widgetMethodName = methodName[ widgetViewMethodName ];
                    me[ widgetViewMethodName ] = function() {
                        return me.widget[ widgetMethodName ].apply( 
                            me.widget, arguments );
                    }
                }
            }
            */
        } );

        // 处理events，只能listenTo protocol中的事件
        this.on = function( eventName, callback, context ) {
            var isWidgetEvent = 
                (eventName.indexOf( widgetEventPrefix ) === 0);

            if ( isWidgetEvent && events.indexOf( eventName ) === -1 ) {
                throw new Error( 
                    eventName.substring( widgetEventPrefix.length ) +
                    ' is not a protocol event.' );
            }
            else {
                _on.apply( me, arguments );
            }
        };
        
    },
    onBeforePageIn : function() {
        this.widget = this.createWidget( this.widgetOptions );
        this.bindEvents();
        this.$el.show();
    },
    protocol: {

        /**
         * 方法列表，具体UI类中需实现的方法
         * @type {Array}
         */
        methods: [

            /*
            'method1', 'method2'
            */
        ],

        /**
         * 事件列表
         * @type {Array}
         */
        events: [],

        /**
         * 配置项(从model中获取具体的值)
         * @type {Array}
         */
        options: []
    }
});

View.Plugin.add( 'widgetView', {
    delegateEvents: function( eventName, selector, method ) {
        var widgetId,
            widgetView;

        if ( selector.indexOf( 'widget#' ) === 0 ) {
            widgetId = selector.substring( 7 );
            selector = 'widget';

            widgetView = this.widgets[ widgetId ];

            if ( !widgetView ) {
                throw new Error( 
                    'widgetview#' + widgetId + ' does not exists.' );
            }

            this.listenTo( 
                widgetView, widgetEventPrefix + eventName, method );

            return false;
        }

        return true;
    }
} );