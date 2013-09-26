/*!Extend touch.js*/
/**
 * @import core/zepto.js
 */
//     Zepto.js
//     (c) 2010-2012 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.

;(function($){
  var touch = {},
    touchTimeout, tapTimeout, swipeTimeout,
    longTapDelay = 750, longTapTimeout

  function parentIfText(node) {
    return 'tagName' in node ? node : node.parentNode
  }

  function swipeDirection(x1, x2, y1, y2) {
    var xDelta = Math.abs(x1 - x2), yDelta = Math.abs(y1 - y2)
    return xDelta >= yDelta ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
  }

  function longTap() {
    longTapTimeout = null
    if (touch.last) {
      touch.el.trigger('longTap')
      touch = {}
    }
  }

  function cancelLongTap() {
    if (longTapTimeout) clearTimeout(longTapTimeout)
    longTapTimeout = null
  }

  function cancelAll() {
    if (touchTimeout) clearTimeout(touchTimeout)
    if (tapTimeout) clearTimeout(tapTimeout)
    if (swipeTimeout) clearTimeout(swipeTimeout)
    if (longTapTimeout) clearTimeout(longTapTimeout)
    touchTimeout = tapTimeout = swipeTimeout = longTapTimeout = null
    touch = {}
  }

  $(document).ready(function(){
    var now, delta

    $(document.body)
      .bind('touchstart', function(e){
        now = Date.now()
        delta = now - (touch.last || now)
        touch.el = $(parentIfText(e.touches[0].target))
        touchTimeout && clearTimeout(touchTimeout)
        touch.x1 = e.touches[0].pageX
        touch.y1 = e.touches[0].pageY
        if (delta > 0 && delta <= 250) touch.isDoubleTap = true
        touch.last = now
        longTapTimeout = setTimeout(longTap, longTapDelay)
      })
      .bind('touchmove', function(e){
        cancelLongTap()
        touch.x2 = e.touches[0].pageX
        touch.y2 = e.touches[0].pageY
        if (Math.abs(touch.x1 - touch.x2) > 10)
          e.preventDefault()
      })
      .bind('touchend', function(e){
         cancelLongTap()

        // swipe
        if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > 30) ||
            (touch.y2 && Math.abs(touch.y1 - touch.y2) > 30))

          swipeTimeout = setTimeout(function() {
            touch.el.trigger('swipe')
            touch.el.trigger('swipe' + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)))
            touch = {}
          }, 0)

        // normal tap
        else if ('last' in touch)

          // delay by one tick so we can cancel the 'tap' event if 'scroll' fires
          // ('tap' fires before 'scroll')
          tapTimeout = setTimeout(function() {

            // trigger universal 'tap' with the option to cancelTouch()
            // (cancelTouch cancels processing of single vs double taps for faster 'tap' response)
            var event = $.Event('tap')
            event.cancelTouch = cancelAll
            touch.el.trigger(event)

            // trigger double tap immediately
            if (touch.isDoubleTap) {
              touch.el.trigger('doubleTap')
              touch = {}
            }

            // trigger single tap after 250ms of inactivity
            else {
              touchTimeout = setTimeout(function(){
                touchTimeout = null
                touch.el.trigger('singleTap')
                touch = {}
              }, 250)
            }

          }, 0)

      })
      .bind('touchcancel', cancelAll)

    $(window).bind('scroll', cancelAll)
  })

  ;['swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown', 'doubleTap', 'tap', 'singleTap', 'longTap'].forEach(function(m){
    $.fn[m] = function(callback){ return this.bind(m, callback) }
  })
})(Zepto);

/*!Extend zepto.extend.js*/
/**
 * @name zepto.extend
 * @file 对Zepto做了些扩展，以下所有JS都依赖与此文件
 * @desc 对Zepto一些扩展，组件必须依赖
 * @import core/zepto.js
 */

(function($){
    $.extend($, {
        contains: function(parent, node) {
            /**
             * modified by chenluyang
             * @reason ios4 safari下，无法判断包含文字节点的情况
             * @original return parent !== node && parent.contains(node)
             */
            return parent.compareDocumentPosition
                ? !!(parent.compareDocumentPosition(node) & 16)
                : parent !== node && parent.contains(node)
        }
    });
})(Zepto);


//Core.js
;(function($, undefined) {
    //扩展在Zepto静态类上
    $.extend($, {
        /**
         * @grammar $.toString(obj)  ⇒ string
         * @name $.toString
         * @desc toString转化
         */
        toString: function(obj) {
            return Object.prototype.toString.call(obj);
        },

        /**
         * @desc 从集合中截取部分数据，这里说的集合，可以是数组，也可以是跟数组性质很像的对象，比如arguments
         * @name $.slice
         * @grammar $.slice(collection, [index])  ⇒ array
         * @example (function(){
         *     var args = $.slice(arguments, 2);
         *     console.log(args); // => [3]
         * })(1, 2, 3);
         */
        slice: function(array, index) {
            return Array.prototype.slice.call(array, index || 0);
        },

        /**
         * @name $.later
         * @grammar $.later(fn, [when, [periodic, [context, [data]]]])  ⇒ timer
         * @desc 延迟执行fn
         * **参数:**
         * - ***fn***: 将要延时执行的方法
         * - ***when***: *可选(默认 0)* 什么时间后执行
         * - ***periodic***: *可选(默认 false)* 设定是否是周期性的执行
         * - ***context***: *可选(默认 undefined)* 给方法设定上下文
         * - ***data***: *可选(默认 undefined)* 给方法设定传入参数
         * @example $.later(function(str){
         *     console.log(this.name + ' ' + str); // => Example hello
         * }, 250, false, {name:'Example'}, ['hello']);
         */
        later: function(fn, when, periodic, context, data) {
            return window['set' + (periodic ? 'Interval' : 'Timeout')](function() {
                fn.apply(context, data);
            }, when || 0);
        },

        /**
         * @desc 解析模版
         * @grammar $.parseTpl(str, data)  ⇒ string
         * @name $.parseTpl
         * @example var str = "<p><%=name%></p>",
         * obj = {name: 'ajean'};
         * console.log($.parseTpl(str, data)); // => <p>ajean</p>
         */
        parseTpl: function(str, data) {
            var tmpl = 'var __p=[],print=function(){__p.push.apply(__p,arguments);};' + 'with(obj||{}){__p.push(\'' + str.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/<%=([\s\S]+?)%>/g, function(match, code) {
                return "'," + code.replace(/\\'/g, "'") + ",'";
            }).replace(/<%([\s\S]+?)%>/g, function(match, code) {
                    return "');" + code.replace(/\\'/g, "'").replace(/[\r\n\t]/g, ' ') + "__p.push('";
                }).replace(/\r/g, '\\r').replace(/\n/g, '\\n').replace(/\t/g, '\\t') + "');}return __p.join('');";
            var func = new Function('obj', tmpl);
            return data ? func(data) : func;
        },

        /**
         * @desc 减少执行频率, 多次调用，在指定的时间内，只会执行一次。
         * **options:**
         * - ***delay***: 延时时间
         * - ***fn***: 被稀释的方法
         * - ***debounce_mode***: 是否开启防震动模式, true:start, false:end
         *
         * <code type="text">||||||||||||||||||||||||| (空闲) |||||||||||||||||||||||||
         * X    X    X    X    X    X      X    X    X    X    X    X</code>
         *
         * @grammar $.throttle(delay, fn) ⇒ function
         * @name $.throttle
         * @example var touchmoveHander = function(){
         *     //....
         * }
         * //绑定事件
         * $(document).bind('touchmove', $.throttle(250, touchmoveHander));//频繁滚动，每250ms，执行一次touchmoveHandler
         *
         * //解绑事件
         * $(document).unbind('touchmove', touchmoveHander);//注意这里面unbind还是touchmoveHander,而不是$.throttle返回的function, 当然unbind那个也是一样的效果
         *
         */
        throttle: function(delay, fn, debounce_mode) {
            var last = 0,
                timeId;

            if (typeof fn !== 'function') {
                debounce_mode = fn;
                fn = delay;
                delay = 250;
            }

            function wrapper() {
                var that = this,
                    period = Date.now() - last,
                    args = arguments;

                function exec() {
                    last = Date.now();
                    fn.apply(that, args);
                };

                function clear() {
                    timeId = undefined;
                };

                if (debounce_mode && !timeId) {
                    // debounce模式 && 第一次调用
                    exec();
                }

                timeId && clearTimeout(timeId);
                if (debounce_mode === undefined && period > delay) {
                    // throttle, 执行到了delay时间
                    exec();
                } else {
                    // debounce, 如果是start就clearTimeout
                    timeId = setTimeout(debounce_mode ? clear : exec, debounce_mode === undefined ? delay - period : delay);
                }
            };
            // for event bind | unbind
            wrapper._zid = fn._zid = fn._zid || $.proxy(fn)._zid;
            return wrapper;
        },

        /**
         * @desc 减少执行频率, 在指定的时间内, 多次调用，只会执行一次。
         * **options:**
         * - ***delay***: 延时时间
         * - ***fn***: 被稀释的方法
         * - ***t***: 指定是在开始处执行，还是结束是执行, true:start, false:end
         *
         * 非at_begin模式
         * <code type="text">||||||||||||||||||||||||| (空闲) |||||||||||||||||||||||||
         *                         X                                X</code>
         * at_begin模式
         * <code type="text">||||||||||||||||||||||||| (空闲) |||||||||||||||||||||||||
         * X                                X                        </code>
         *
         * @grammar $.debounce(delay, fn[, at_begin]) ⇒ function
         * @name $.debounce
         * @example var touchmoveHander = function(){
         *     //....
         * }
         * //绑定事件
         * $(document).bind('touchmove', $.debounce(250, touchmoveHander));//频繁滚动，只要间隔时间不大于250ms, 在一系列移动后，只会执行一次
         *
         * //解绑事件
         * $(document).unbind('touchmove', touchmoveHander);//注意这里面unbind还是touchmoveHander,而不是$.debounce返回的function, 当然unbind那个也是一样的效果
         */
        debounce: function(delay, fn, t) {
            return fn === undefined ? $.throttle(250, delay, false) : $.throttle(delay, fn, t === undefined ? false : t !== false);
        }
    });

    /**
     * 扩展类型判断
     * @param {Any} obj
     * @see isString, isBoolean, isRegExp, isNumber, isDate, isObject, isNull, isUdefined
     */
    /**
     * @name $.isString
     * @grammar $.isString(val)  ⇒ Boolean
     * @desc 判断变量类型是否为***String***
     * @example console.log($.isString({}));// => false
     * console.log($.isString(123));// => false
     * console.log($.isString('123'));// => true
     */
    /**
     * @name $.isBoolean
     * @grammar $.isBoolean(val)  ⇒ Boolean
     * @desc 判断变量类型是否为***Boolean***
     * @example console.log($.isBoolean(1));// => false
     * console.log($.isBoolean('true'));// => false
     * console.log($.isBoolean(false));// => true
     */
    /**
     * @name $.isRegExp
     * @grammar $.isRegExp(val)  ⇒ Boolean
     * @desc 判断变量类型是否为***RegExp***
     * @example console.log($.isRegExp(1));// => false
     * console.log($.isRegExp('test'));// => false
     * console.log($.isRegExp(/test/));// => true
     */
    /**
     * @name $.isNumber
     * @grammar $.isNumber(val)  ⇒ Boolean
     * @desc 判断变量类型是否为***Number***
     * @example console.log($.isNumber('123'));// => false
     * console.log($.isNumber(true));// => false
     * console.log($.isNumber(123));// => true
     */
    /**
     * @name $.isDate
     * @grammar $.isDate(val)  ⇒ Boolean
     * @desc 判断变量类型是否为***Date***
     * @example console.log($.isDate('123'));// => false
     * console.log($.isDate('2012-12-12'));// => false
     * console.log($.isDate(new Date()));// => true
     */
    /**
     * @name $.isObject
     * @grammar $.isObject(val)  ⇒ Boolean
     * @desc 判断变量类型是否为***Object***
     * @example console.log($.isObject('123'));// => false
     * console.log($.isObject(true));// => false
     * console.log($.isObject({}));// => true
     */
    /**
     * @name $.isNull
     * @grammar $.isNull(val)  ⇒ Boolean
     * @desc 判断变量类型是否为***null***
     * @example console.log($.isNull(false));// => false
     * console.log($.isNull(0));// => false
     * console.log($.isNull(null));// => true
     */
    /**
     * @name $.isUndefined
     * @grammar $.isUndefined(val)  ⇒ Boolean
     * @desc 判断变量类型是否为***undefined***
     * @example
     * console.log($.isUndefined(false));// => false
     * console.log($.isUndefined(0));// => false
     * console.log($.isUndefined(a));// => true
     */
    $.each("String Boolean RegExp Number Date Object Null Undefined".split(" "), function( i, name ){
        var fn;

        if( 'is' + name in $ ) return;//already defined then ignore.

        switch (name) {
            case 'Null':
                fn = function(obj){ return obj === null; };
                break;
            case 'Undefined':
                fn = function(obj){ return obj === undefined; };
                break;
            default:
                fn = function(obj){ return new RegExp(name + ']', 'i').test( toString(obj) )};
        }
        $['is'+name] = fn;
    });

    var toString = $.toString;

})(Zepto);

//Support.js
(function($, undefined) {
    var ua = navigator.userAgent,
        na = navigator.appVersion,
        br = $.browser;

    /**
     * @name $.browser
     * @desc 扩展zepto中对browser的检测
     *
     * **可用属性**
     * - ***qq*** 检测qq浏览器
     * - ***chrome*** 检测chrome浏览器
     * - ***uc*** 检测uc浏览器
     * - ***version*** 检测浏览器版本
     *
     * @example
     * if ($.browser.qq) {      //在qq浏览器上打出此log
     *     console.log('this is qq browser');
     * }
     */
    $.extend( br, {
        qq: /qq/i.test(ua),
        uc: /UC/i.test(ua) || /UC/i.test(na)
    } );

    br.uc = br.uc || !br.qq && !br.chrome && !br.firefox && !/safari/i.test(ua);

    try {
        br.version = br.uc ? na.match(/UC(?:Browser)?\/([\d.]+)/)[1] : br.qq ? ua.match(/MQQBrowser\/([\d.]+)/)[1] : br.version;
    } catch (e) {}


    /**
     * @name $.support
     * @desc 检测设备对某些属性或方法的支持情况
     *
     * **可用属性**
     * - ***orientation*** 检测是否支持转屏事件，UC中存在orientaion，但转屏不会触发该事件，故UC属于不支持转屏事件(iOS 4上qq, chrome都有这个现象)
     * - ***touch*** 检测是否支持touch相关事件
     * - ***cssTransitions*** 检测是否支持css3的transition
     * - ***has3d*** 检测是否支持translate3d的硬件加速
     *
     * @example
     * if ($.support.has3d) {      //在支持3d的设备上使用
     *     console.log('you can use transtion3d');
     * }
     */
    $.support = $.extend($.support || {}, {
        orientation: !(br.uc || (parseFloat($.os.version)<5 && (br.qq || br.chrome))) && !($.os.android && parseFloat($.os.version) > 3) && "orientation" in window && "onorientationchange" in window,
        touch: "ontouchend" in document,
        cssTransitions: "WebKitTransitionEvent" in window,
        has3d: 'WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix()
    });

})(Zepto);

//Event.js
(function($) {
    /**
     * @name $.matchMedia
     * @grammar $.matchMedia(query)  ⇒ MediaQueryList
     * @desc 是原生的window.matchMedia方法的polyfill，对于不支持matchMedia的方法系统和浏览器，按照[w3c window.matchMedia](http://www.w3.org/TR/cssom-view/#dom-window-matchmedia)的接口
     * 定义，对matchMedia方法进行了封装。原理是用css media query及transitionEnd事件来完成的。在页面中插入media query样式及元素，当query条件满足时改变该元素样式，同时这个样式是transition作用的属性，
     * 满足条件后即会触发transitionEnd，由此创建MediaQueryList的事件监听。由于transition的duration time为0.001ms，故若直接使用MediaQueryList对象的matches去判断当前是否与query匹配，会有部分延迟，
     * 建议注册addListener的方式去监听query的改变。$.matchMedia的详细实现原理及采用该方法实现的转屏统一解决方案详见
     * [GMU Pages: 转屏解决方案($.matchMedia)](https://github.com/gmuteam/GMU/wiki/%E8%BD%AC%E5%B1%8F%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88$.matchMedia)
     *
     * **MediaQueryList对象包含的属性**
     * - ***matches*** 是否满足query
     * - ***query*** 查询的css query，类似\'screen and (orientation: portrait)\'
     * - ***addListener*** 添加MediaQueryList对象监听器，接收回调函数，回调参数为MediaQueryList对象
     * - ***removeListener*** 移除MediaQueryList对象监听器
     *
     * @example
     * $.matchMedia('screen and (orientation: portrait)').addListener(fn);
     */
    $.matchMedia = (function() {
        var mediaId = 0,
            cls = 'gmu-media-detect',
            transitionEnd = $.fx.transitionEnd,
            cssPrefix = $.fx.cssPrefix,
            $style = $('<style></style>').append('.' + cls + '{' + cssPrefix + 'transition: width 0.001ms; width: 0; position: relative; bottom: -999999px;}\n').appendTo('head');

        return function (query) {
            var id = cls + mediaId++,
                $mediaElem = $('<div class="' + cls + '" id="' + id + '"></div>').appendTo('body'),
                listeners = [],
                ret;

            $style.append('@media ' + query + ' { #' + id + ' { width: 100px; } }\n') ;   //原生matchMedia也需要添加对应的@media才能生效
            // if ('matchMedia' in window) {
            //     return window.matchMedia(query);
            // }

            $mediaElem.on(transitionEnd, function() {
                ret.matches = $mediaElem.width() === 100;
                $.each(listeners, function (i,fn) {
                    $.isFunction(fn) && fn.call(ret, ret);
                });
            });

            ret = {
                matches: $mediaElem.width() === 100 ,
                media: query,
                addListener: function (callback) {
                    listeners.push(callback);
                    return this;
                },
                removeListener: function (callback) {
                    var index = listeners.indexOf(callback);
                    ~index && listeners.splice(index, 1);
                    return this;
                }
            };

            return ret;
        };
    }());

    $(function () {
        var handleOrtchange = function (mql) {
                if ( state !== mql.matches ) {
                    $( window ).trigger( 'ortchange' );
                    state = mql.matches;
                }
            },
            state = true;
        $.mediaQuery = {
            ortchange: 'screen and (width: ' + window.innerWidth + 'px)'
        };
        $.matchMedia($.mediaQuery.ortchange).addListener(handleOrtchange);
    });

    /**
     * @name Trigger Events
     * @theme event
     * @desc 扩展的事件
     * - ***scrollStop*** : scroll停下来时触发, 考虑前进或者后退后scroll事件不触发情况。
     * - ***ortchange*** : 当转屏的时候触发，兼容uc和其他不支持orientationchange的设备，利用css media query实现，解决了转屏延时及orientation事件的兼容性问题
     * @example $(document).on('scrollStop', function () {        //scroll停下来时显示scrollStop
     *     console.log('scrollStop');
     * });
     *
     * $(window).on('ortchange', function () {        //当转屏的时候触发
     *     console.log('ortchange');
     * });
     */
    /** dispatch scrollStop */
    function _registerScrollStop(){
        $(window).on('scroll', $.debounce(80, function() {
            $(document).trigger('scrollStop');
        }, false));
    }
    //在离开页面，前进或后退回到页面后，重新绑定scroll, 需要off掉所有的scroll，否则scroll时间不触发
    function _touchstartHander() {
        $(window).off('scroll');
        _registerScrollStop();
    }
    _registerScrollStop();
    $(window).on('pageshow', function(e){
        if(e.persisted) {//如果是从bfcache中加载页面
            $(document).off('touchstart', _touchstartHander).one('touchstart', _touchstartHander);
        }
    });
})(Zepto);

/*!Extend zepto.ui.js*/
/**
 * @file 所有UI组件的基类，通过它可以简单的快速的创建新的组件。
 * @name zepto.ui
 * @short zepto.ui
 * @desc 所有UI组件的基类，通过它可以简单的快速的创建新的组件。
 * @import core/zepto.js, core/zepto.extend.js
 */
(function($, undefined) {
    var id = 1,
        _blankFn = function(){},
        tpl = '<%=name%>-<%=id%>',
        record = (function(){
            var data = {},
                id = 0,
                iKey = "GMUWidget"+(+ new Date()); //internal key.

            return function( obj, key, val){
                var dkey = obj[ iKey ] || ( obj[ iKey ] = ++id ),
                    store = data[dkey] || (data[dkey] = {});

                !$.isUndefined(val) && (store[key] = val);
                $.isNull(val) && delete store[key];

                return store[ key ];
            }
        })();
        
    $.ui = $.ui || {
        version: '2.0.5',

        guid: _guid,

        /**
         * @name $.ui.define
         * @grammar $.ui.define(name, data[, superClass]) ⇒ undefined
         * @desc 定义组件,
         * - ''name'' 组件名称
         * - ''data'' 对象，设置此组件的prototype。可以添加属性或方法
         * - ''superClass'' 基类，指定此组件基于哪个现有组件，默认为Widget基类
         * **示例:**
         * <code type="javascript">
         * $.ui.define('helloworld', {
         *     _data: {
         *         opt1: null
         *     },
         *     enable: function(){
         *         //...
         *     }
         * });
         * </code>
         *
         * **定义完后，就可以通过以下方式使用了**
         *<code type="javascript">
         * var instance = $.ui.helloworld({opt1: true});
         * instance.enable();
         *
         * //或者
         * $('#id').helloworld({opt1:true});
         * //...later
         * $('#id').helloworld('enable');
         * </code>
         *
         * **Tips**
         * 1. 通过Zepto对象上的组件方法，可以直接实例话组件, 如: $('#btn').button({label: 'abc'});
         * 2. 通过Zepto对象上的组件方法，传入字符串this, 可以获得组件实例，如：var btn = $('#btn').button('this');
         * 3. 通过Zepto对象上的组件方法，可以直接调用组件方法，第一个参数用来指定方法名，之后的参数作为方法参数，如: $('#btn').button('setIcon', 'home');
         * 4. 在子类中，如覆写了某个方法，可以在方法中通过this.$super()方法调用父级方法。如：this.$super('enable');
         */
        define: function(name, data, superClass) {
            if(superClass) data.inherit = superClass;
            var Class = $.ui[name] = _createClass(function(el, options) {
                var obj = _createObject(Class.prototype, {
                    _id: $.parseTpl(tpl, {
                        name: name,
                        id: _guid()
                    })
                });

                obj._createWidget.call(obj, el, options,Class.plugins);
                return obj;
            }, data);
            return _zeptoLize(name, Class);
        },

        /**
         * @name $.ui.isWidget()
         * @grammar $.ui.isWidget(obj) ⇒ boolean
         * @grammar $.ui.isWidget(obj, name) ⇒ boolean
         * @desc 判断obj是不是widget实例
         *
         * **参数**
         * - ''obj'' 用于检测的对象
         * - ''name'' 可选，默认监测是不是''widget''(基类)的实例，可以传入组件名字如''button''。作用将变为obj是不是button组件实例。
         * @param obj
         * @param name
         * @example
         *
         * var btn = $.ui.button(),
         *     dialog = $.ui.dialog();
         *
         * console.log($.isWidget(btn)); // => true
         * console.log($.isWidget(dialog)); // => true
         * console.log($.isWidget(btn, 'button')); // => true
         * console.log($.isWidget(dialog, 'button')); // => false
         * console.log($.isWidget(btn, 'noexist')); // => false
         */
        isWidget: function(obj, name){
            return obj instanceof (name===undefined ? _widget: $.ui[name] || _blankFn);
        }
    };
        
    /**
     * generate guid
     */
    function _guid() {
        return id++;
    };

    function _createObject(proto, data) {
        var obj = {};
        Object.create ? obj = Object.create(proto) : obj.__proto__ = proto;
        return $.extend(obj, data || {});
    }

    function _createClass(Class, data) {
        if (data) {
            _process(Class, data);
            $.extend(Class.prototype, data);
        }
        return $.extend(Class, {
            plugins: [],
            register: function(fn) {
                if ($.isObject(fn)) {
                    $.extend(this.prototype,fn);
                    return;
                }
                this.plugins.push(fn);
            }
        });
    }

    /**
     * handle inherit & _data
     */
    function _process(Class, data) {
        var superClass = data.inherit || _widget,
            proto = superClass.prototype,
            obj;
        obj = Class.prototype = _createObject(proto, {
            $factory: Class,
            $super: function(key) {
                var fn = proto[key];
                return $.isFunction(fn) ? fn.apply(this, $.slice(arguments, 1)) : fn;
            }
        });
        obj._data = $.extend({}, proto._data, data._data);
        delete data._data;
        return Class;
    }

    /**
     * 强制setup模式
     * @grammar $(selector).dialog(opts);
     */
    function _zeptoLize( name ) {
        $.fn[ name ] = function(opts) {
            var ret,
                obj,
                args = $.slice(arguments, 1);

            $.each( this, function( i, el ){

                obj = record( el, name ) || $.ui[name]( el, $.extend( $.isPlainObject(opts) ? opts : {}, {
                    setup: true
                } ) );
                if ($.isString( opts )) {
                    if (!$.isFunction( obj[ opts ] ) && opts !== 'this') {
                        throw new Error(name + '组件没有此方法');    //当不是取方法是，抛出错误信息
                    }
                    ret = $.isFunction( obj[ opts ] ) ? obj[opts].apply(obj, args) : undefined;
                }
                if( ret !== undefined && ret !== obj || opts === "this" && ( ret = obj ) ) {
                    return false;
                }
                ret = undefined;
            });
            //ret 为真就是要返回ui实例之外的内容
            //obj 'this'时返回
            //其他都是返回zepto实例
            //修改返回值为空的时，返回值不对的问题
            return ret !== undefined ? ret : this;
        };
    }
    /**
     * @name widget
     * @desc GMU所有的组件都是此类的子类，即以下此类里面的方法都可在其他组建中调用。
     */
    var _widget = function() {};
    $.extend(_widget.prototype, {
        _data: {
            status: true
        },

        /**
         * @name data
         * @grammar data(key) ⇒ value
         * @grammar data(key, value) ⇒ value
         * @desc 设置或者获取options, 所有组件中的配置项都可以通过此方法得到。
         * @example
         * $('a#btn').button({label: '按钮'});
         * console.log($('a#btn').button('data', 'label'));// => 按钮
         */
        data: function(key, val) {
            var _data = this._data;
            if ($.isObject(key)) return $.extend(_data, key);
            else return !$.isUndefined(val) ? _data[key] = val : _data[key];
        },

        /**
         * common constructor
         */
        _createWidget: function(el, opts,plugins) {

            if ($.isObject(el)) {
                opts = el || {};
                el = undefined;
            }

            var data = $.extend({}, this._data, opts);
            $.extend(this, {
                _el: el ? $(el) : undefined,
                _data: data
            });

            //触发plugins
            var me = this;
            $.each( plugins, function( i, fn ){
                var result = fn.apply( me );
                if(result && $.isPlainObject(result) ){
                    var plugins = me._data.disablePlugin;
                    if( !plugins || $.isString(plugins) && !~plugins.indexOf(result.pluginName) ){
                        delete result.pluginName;
                        $.each(result,function( key, val ){
                            var orgFn;
                            if((orgFn = me[key]) && $.isFunction( val ) ){
                                me[key] = function(){
                                    me[key + 'Org'] = orgFn;
                                    return val.apply(me,arguments);
                                }
                            }else
                                me[key] = val;
                        });
                    }
                }
            });
            // use setup or render
            if(data.setup) this._setup(el && el.getAttribute('data-mode'));
            else this._create();
            this._init();

            var me = this,
                $el = this.trigger('init').root();
            $el.on('tap', function(e) {
                (e['bubblesList'] || (e['bubblesList'] = [])).push(me);
            });

            record( $el[0], me._id.split('-')[0], me );
        },

        /**
         * @interface: use in render mod
         * @name _create
         * @desc 接口定义，子类中需要重新实现此方法，此方法在render模式时被调用。
         *
         * 所谓的render方式，即，通过以下方式初始化组件
         * <code>
         * $.ui.widgetName(options);
         * </code>
         */
        _create: function() {},

        /**
         * @interface: use in setup mod
         * @name _setup
         * @desc 接口定义，子类中需要重新实现此方法，此方法在setup模式时被调用。第一个行参用来分辨时fullsetup，还是setup
         *
         * <code>
         * $.ui.define('helloworld', {
         *     _setup: function(mode){
         *          if(mode){
         *              //为fullsetup模式
         *          } else {
         *              //为setup模式
         *          }
         *     }
         * });
         * </code>
         *
         * 所谓的setup方式，即，先有dom，然后通过选择器，初始化Zepto后，在Zepto对象直接调用组件名方法实例化组件，如
         * <code>
         * //<div id="widget"></div>
         * $('#widget').widgetName(options);
         * </code>
         *
         * 如果用来初始化的element，设置了data-mode="true"，组件将以fullsetup模式初始化
         */
        _setup: function(mode) {},

        /**
         * @name root
         * @grammar root() ⇒ value
         * @grammar root(el) ⇒ value
         * @desc 设置或者获取根节点
         * @example
         * $('a#btn').button({label: '按钮'});
         * console.log($('a#btn').button('root'));// => a#btn
         */
        root: function(el) {
            return this._el = el || this._el;
        },

        /**
         * @name id
         * @grammar id() ⇒ value
         * @grammar id(id) ⇒ value
         * @desc 设置或者获取组件id
         */
        id: function(id) {
            return this._id = id || this._id;
        },

        /**
         * @name destroy
         * @grammar destroy() ⇒ undefined
         * @desc 注销组件
         */
        destroy: function() {
            var me = this,
                $el;
            $el = this.trigger('destroy').off().root();
            $el.find('*').off();
            record( $el[0], me._id.split('-')[0], null);
            $el.off().remove();
            this.__proto__ = null;
            $.each(this, function(key) {
                delete me[key];
            });
        },

        /**
         * @name on
         * @grammar on(type, handler) ⇒ instance
         * @desc 绑定事件，此事件绑定不同于zepto上绑定事件，此On的this只想组件实例，而非zepto实例
         */
        on: function(ev, callback) {
            this.root().on(ev, $.proxy(callback, this));
            return this;
        },

        /**
         * @name off
         * @grammar off(type) ⇒ instance
         * @grammar off(type, handler) ⇒ instance
         * @desc 解绑事件
         */
        off: function(ev, callback) {
            this.root().off(ev, callback);
            return this;
        },

        /**
         * @name trigger
         * @grammar trigger(type[, data]) ⇒ instance
         * @desc 触发事件, 此trigger会优先把options上的事件回调函数先执行，然后给根DOM派送事件。
         * options上回调函数可以通过e.preventDefaualt()来组织事件派发。
         */
        trigger: function(event, data) {
            event = $.isString(event) ? $.Event(event) : event;
            var onEvent = this.data(event.type),result;
            if( onEvent && $.isFunction(onEvent) ){
                event.data = data;
                result = onEvent.apply(this, [event].concat(data));
                if(result === false || event.defaultPrevented){
                    return this;
                }
            }
            this.root().trigger(event, data);
            return this;
        }
    });
})(Zepto);
/*!Widget slider.js*/

/**
 * @file 图片轮播组件
 * @name Slider
 * @desc <qrcode align="right" title="Live Demo">./_examples/widget/slider/slider.html</qrcode>
 * 图片轮播组件
 * @import core/touch.js, core/zepto.extend.js, core/zepto.ui.js
 */

(function($, undefined) {
    /**
     * @name       $.ui.slider
     * @grammar    $.ui.slider(el [,options]) => instance
     * @desc **el**
     * css选择器, 或者zepto对象
     * **Options**
     * - ''container'' {selector|zepto}: (可选)放置的父容器
     * - ''content'' {Array}: (必选)内容,格式为：\[ {href:'图片跳转URL', pic:'图片路径', title:'图片下方文字'}, {...}\]
     * - ''viewNum'' {Number}: (可选, 默认:1) 可以同时看到几张图片
     * - ''imgInit'' {Number}: (可选, 默认:2)初始加载几张图片
     * - ''itemRender'' {Function}: (可选)render模式时，使用的自定义内容构造函数，接受一个从0开始的index参数，返回空值时构造结束
     * - ''imgZoom'' {Boolean}: (可选, 默认:false)是否缩放图片,设为true时可以将超出边界的图片等比缩放
     * - ''loop'' {Boolean}: (可选, 默认:false)设为true时,播放到最后一张时继续正向播放第一张(无缝滑动)，设为false则反向播放倒数第2张
     * - ''stopPropagation'' {Boolean}: (可选, 默认:false)是否在横向滑动的时候阻止冒泡(慎用,会导致上层元素接受不到touchMove事件)
     * - ''springBackDis'' {Number}: (可选, 默认:15)滑动能够回弹的最大距离
     * - ''autoPlay'' {Boolean}: ((可选, 默认:true)是否自动播放
     * - ''autoPlayTime'' {Number}: (可选, 默认:4000ms)自动播放的间隔
     * - ''animationTime'' {Number}: (可选, 默认:400ms)滑动动画时间
     * - ''showArr'' {Boolean}: (可选, 默认:true)是否展示上一个下一个箭头
     * - ''showDot'' {Boolean}: (可选, 默认:true)是否展示页码
     * - ''slide'' {Function}: (可选)开始切换页面时执行的函数,第1个参数为Event对象,第2个参数为滑动后的page页码
     * - ''slideend'' {Function}: (可选)页面切换完成(滑动完成)时执行的函数,第1个参数为Event对象,第2个参数为滑动后的page页码
     *
     * **Demo**
     * <codepreview href="./_examples/widget/slider/slider.html">
     * ./_examples/widget/slider/slider.html
     * </codepreview>
     */
    $.ui.define('slider', {
        _data:{
            viewNum:                1,
            imgInit:                2,
            itemRender:             null,
            imgZoom:                false,
            loop:                   false,
            stopPropagation:        false,
            springBackDis:          15,
            autoPlay:               true,
            autoPlayTime:           4000,
            animationTime:          400,
            showArr:                true,
            showDot:                true,
            slide:                  null,
            slideend:               null,
            index:                  0,
            _stepLength:            1,
            _direction:             1
        },

        _create:function() {
            var me = this,
                i = 0, j, k = [],
                content = me.data('content');
            me._initConfig();
            (me.root() || me.root($('<div></div>'))).addClass('ui-slider').appendTo(me.data('container') || (me.root().parent().length ? '' : document.body)).html(
            '<div class="ui-slider-wheel"><div class="ui-slider-group">' +
            (function() {
                if(me.data('itemRender')) {
                    var render = me.data('itemRender');
                    while(j = render.call(me, i++)) k.push('<div class="ui-slider-item">' + j + '</div>');
                } else {
                    while(j = content[i++]) k.push('<div class="ui-slider-item"><a href="' + j.href + '"><img lazyload="' + j.pic + '"/></a>' + (j.title ? '<p>' + j.title + '</p>': '') + '</div>');
                }
                k.push(me.data('loop') ? '</div><div class="ui-slider-group">' + k.join('') + '</div></div>' : '</div></div>');
                return k.join('');
            }()));
            me._addDots();
        },

        _setup: function(mode) {
            var me = this,
                root = me.root().addClass('ui-slider');
            me._initConfig();
            if(!mode) {
                var items = root.children(),
                    group = $('<div class="ui-slider-group"></div>').append(items.addClass('ui-slider-item'));
                root.empty().append($('<div class="ui-slider-wheel"></div>').append(group).append(me.data('loop') ? group.clone() : ''));
                me._addDots();
            } else me.data('loop') && $('.ui-slider-wheel', root).append($('.ui-slider-group', root).clone());
        },

        _init:function() {
            var me = this,
                index = me.data('index'),
                root = me.root(),
                _eventHandler = $.proxy( me._eventHandler, me );
            me._setWidth();
            $(me.data('wheel')).on('touchstart touchmove touchend touchcancel webkitTransitionEnd', _eventHandler);
            $(window).on('ortchange', _eventHandler);
            $('.ui-slider-pre', root).on('tap', function() { me.pre() });
            $('.ui-slider-next', root).on('tap', function() { me.next() });
            me.on('destroy',function() {
                clearTimeout(me.data('play'));
                $(window).off('ortchange', _eventHandler);
            });
            me.data('autoPlay') && me._setTimeout();
        },

        /**
         * 初始化参数配置
         */
        _initConfig: function() {
            var o = this._data;
            if(o.viewNum > 1) {
                o.loop = false;
                o.showDot = false;
                o.imgInit = o.viewNum + 1;
            }
        },

        /**
         * 添加底部圆点及两侧箭头
         */
        _addDots:function() {
            var me = this,
                root = me.root(),
                length = $('.ui-slider-item', root).length / (me.data('loop') ? 2 : 1),
                html = [];
            if(me.data('showDot')) {
                html.push('<p class="ui-slider-dots">');
                while(length--) html.push('<b></b>');
                html.push('</p>');
            }
            me.data('showArr') && (html.push('<span class="ui-slider-pre"><b></b></span><span class="ui-slider-next"><b></b></span>'));
            root.append(html.join(''));
        },
        /**
         * 设置轮播条及元素宽度,设置选中dot,设置索引map,加载图片
         */
        _setWidth:function(){
            var me = this,
                o = me._data,
                root = me.root(),
                width = Math.ceil(root.width() / o.viewNum),
                height = root.height(),
                loop = o.loop,
                items = $('.ui-slider-item', root).toArray(),
                length = items.length,
                wheel = $('.ui-slider-wheel', root).width(width * length)[0],
                dots = $('.ui-slider-dots b', root).toArray(),
                allImgs = $('img', root).toArray(),
                lazyImgs = allImgs.concat(),
                dotIndex = {}, i, j,
                l = o.imgInit || length;
            o.showDot && (dots[0].className = 'ui-slider-dot-select');
            if(o.imgZoom) $(lazyImgs).on('load', function() {
                var h = this.height,
                    w = this.width,
                    min_h = Math.min(h, height),
                    min_w = Math.min(w, width);
                if(h/height > w/width) this.style.cssText += 'height:' + min_h + 'px;' + 'width:' + min_h/h * w + 'px;';
                else this.style.cssText += 'height:' + min_w/w * h + 'px;' + 'width:' + min_w + 'px';
                this.onload = null;
            });
            for(i = 0; i < length; i++) {
                items[i].style.cssText += 'width:'+ width + 'px;position:absolute;-webkit-transform:translate3d(' + i * width + 'px,0,0);z-index:' + (900 - i);
                dotIndex[i] = loop ? (i > length/2 - 1 ? i - length/2 : i) : i;
                if(i < l) {
                    j = lazyImgs.shift();
                    j && (j.src = j.getAttribute('lazyload'));
                    if(o.loop) {
                        j = allImgs[i + length/2];
                        j && (j.src = j.getAttribute('lazyload'));
                    }
                }
            }
            me.data({
                root:           root[0],
                wheel:          wheel,
                items:          items,
                lazyImgs:       lazyImgs,
                allImgs:        allImgs,
                length:         length,
                width:          width,
                height:         height,
                dots:           dots,
                dotIndex:       dotIndex,
                dot:            dots[0]
            });
            return me;
        },

        /**
         * 事件管理函数
         */
        _eventHandler:function(e) {
            var me = this;
            switch (e.type) {
                case 'touchmove':
                    me._touchMove(e);
                    break;
                case 'touchstart':
                    me._touchStart(e);
                    break;
                case 'touchcancel':
                case 'touchend':
                    me._touchEnd();
                    break;
                case 'webkitTransitionEnd':
                    me._transitionEnd();
                    break;
                case 'ortchange':
                    me._resize.call(me);
                    break;
            }
        },

        /**
         * touchstart事件
         */
        _touchStart:function(e) {
            var me = this;
            me.data({
                pageX:      e.touches[0].pageX,
                pageY:      e.touches[0].pageY,
                S:          false,      //isScrolling
                T:          false,      //isTested
                X:          0           //horizontal moved
            });
            me.data('wheel').style.webkitTransitionDuration = '0ms';
        },

        /**
         * touchmove事件
         */
        _touchMove:function(e) {
            var o = this._data,
                X = o.X = e.touches[0].pageX - o.pageX;
            if(!o.T) {
                var index = o.index,
                    length = o.length,
                    S = Math.abs(X) < Math.abs(e.touches[0].pageY - o.pageY);
                o.loop && (o.index = index > 0 && (index < length - 1) ? index : (index === length - 1) && X < 0 ? length/2 - 1 : index === 0 && X > 0 ? length/2 : index);
                S || clearTimeout(o.play);
                o.T = true;
                o.S = S;
            }
            if(!o.S) {
                o.stopPropagation && e.stopPropagation();
                e.preventDefault();
                o.wheel.style.webkitTransform = 'translate3d(' + (X - o.index * o.width) + 'px,0,0)';
            }
        },

        /**
         * touchend事件
         */
        _touchEnd:function() {
            var me = this,
                o = me._data;
            if(!o.S) {
                var distance = o.springBackDis,
                stepLength = o.X <= -distance ? Math.ceil(-o.X / o.width) : (o.X > distance) ? -Math.ceil(o.X / o.width) : 0;
                o._stepLength = Math.abs(stepLength);
                me._slide(o.index + stepLength);
            }
        },

        /**
         * 轮播位置判断
         */
        _slide:function(index, auto) {
            var me = this,
                o = me._data,
                length = o.length,
                end = length - o.viewNum + 1;
            if(-1 < index && index < end) {
                me._move(index);
            } else if(index >= end) {
                if(!o.loop) {
                    me._move(end - (auto ? 2 : 1));
                    o._direction = -1;
                } else {
                    o.wheel.style.cssText += '-webkit-transition:0ms;-webkit-transform:translate3d(-' + (length/2 - 1) * o.width + 'px,0,0);';
                    o._direction =  1;
                    $.later(function() {me._move(length/2)}, 20);
                }
            } else {
                if(!o.loop) me._move(auto ? 1 : 0);
                else {
                    o.wheel.style.cssText += '-webkit-transition:0ms;-webkit-transform:translate3d(-' + (length/2) * o.width + 'px,0,0);';
                    $.later(function() {me._move(length/2 - 1)}, 20);
                }
                o._direction =  1;
            }
            return me;
        },

        /**
         * 轮播方法
         */
        _move:function(index) {
            var o = this._data,
                dotIndex = o.dotIndex[index];
            this.trigger('slide', dotIndex);
            if(o.lazyImgs.length) {
                var j = o.allImgs[index];
                j && j.src || (j.src = j.getAttribute('lazyload'));
            }
            if(o.showDot) {
                o.dot.className = '';
                o.dots[dotIndex].className = 'ui-slider-dot-select';
                o.dot = o.dots[dotIndex];
            }
            o.index = index;
            o.wheel.style.cssText += '-webkit-transition:' + o.animationTime + 'ms;-webkit-transform:translate3d(-' + index * o.width + 'px,0,0);';
        },

        /**
         * 滑动结束
         */
        _transitionEnd:function() {
            var me = this,
                o = me._data;
            me.trigger('slideend', o.dotIndex[o.index]);
            if(o.lazyImgs.length){
                for(var length = o._stepLength, i = 0; i< length; i++) {
                    var j = o.lazyImgs.shift();
                    j && (j.src = j.getAttribute('lazyload'));
                    if(o.loop) {
                        j = o.allImgs[o.index + o.length / 2];
                        j && !j.src && (j.src = j.getAttribute('lazyload'));
                    }
                }
                o._stepLength = 1;
            }
            me._setTimeout();
        },

        /**
         * 设置自动播放
         */
        _setTimeout:function() {
            var me = this, o = me._data;
            if(!o.autoPlay) return me;
            clearTimeout(o.play);
            o.play = $.later(function() {
                me._slide.call(me, o.index + o._direction, true);
            }, o.autoPlayTime);
            return me;
        },

        /**
         * 重设容器及子元素宽度
         */
        _resize:function() {
            var me = this,
                o = me._data,
                width = o.root.offsetWidth / o.viewNum, //todo 添加获取隐藏元素大小的方法
                length = o.length,
                items = o.items;
            if(!width) return me;
            o.width = width;
            clearTimeout(o.play);
            for(var i = 0; i < length; i++) items[i].style.cssText += 'width:' + width + 'px;-webkit-transform:translate3d(' + i * width + 'px,0,0);';
            o.wheel.style.removeProperty('-webkit-transition');
            o.wheel.style.cssText += 'width:' + width * length + 'px;-webkit-transform:translate3d(-' + o.index * width + 'px,0,0);';
            o._direction = 1;
            me._setTimeout();
            return me;
        },

        /**
         * @desc 滚动到上一张
         * @name pre
         * @grammar pre() => self
         *  @example
         * //setup mode
         * $('#slider').slider('pre');
         *
         * //render mode
         * var demo = $.ui.slider();
         * demo.pre();
         */
        pre:function() {
            var me = this;
            me._slide(me.data('index') - 1);
            return me;
        },

        /**
         * @desc 滚动到下一张
         * @name next
         * @grammar next() => self
         *  @example
         * //setup mode
         * $('#slider').slider('next');
         *
         * //render mode
         * var demo = $.ui.slider();
         * demo.next();
         */
        next:function() {
            var me = this;
            me._slide(me.data('index') + 1);
            return me;
        },

        /**
         * @desc 停止自动播放
         * @name stop
         * @grammar stop() => self
         *  @example
         * //setup mode
         * $('#slider').slider('stop');
         *
         * //render mode
         * var demo = $.ui.slider();
         * demo.stop();
         */
        stop:function() {
            var me = this;
            clearTimeout(me.data('play'));
            me.data('autoPlay', false);
            return me;
        },

        /**
         * @desc 恢复自动播放
         * @name resume
         * @grammar resume() => self
         *  @example
         * //setup mode
         * $('#slider').slider('resume');
         *
         * //render mode
         * var demo = $.ui.slider();
         * demo.resume();
         */
        resume:function() {
            var me = this;
            me.data('_direction',1);
            me.data('autoPlay', true);
            me._setTimeout();
            return me;
        }

        /**
         * @name Trigger Events
         * @theme event
         * @desc 组件内部触发的事件
         * ^ 名称 ^ 处理函数参数 ^ 描述 ^
         * | init | event | 组件初始化的时候触发，不管是render模式还是setup模式都会触发 |
         * | slide | event | 开始切换页面时执行的函数，参数为滑动后的page页码 |
         * | slideend | event | 页面切换完成(滑动完成)时执行的函数，参数为滑动后的page页码 |
         * | destroy | event | 组件在销毁的时候触发 |
         */
    });
})(Zepto);

