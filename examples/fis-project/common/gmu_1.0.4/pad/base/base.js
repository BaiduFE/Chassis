require('gmu:uibase');
/**
 * $.ui.ex
 * @fileOverview 对zepto的扩展
 */

(function($, undefined) {
    $.ui.define('ex', function() {
        var class2type = {},
            toString = Object.prototype.toString,
            timer;

        $.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
            class2type["[object " + name + "]"] = name.toLowerCase();
        });

        // 实现zepto接口
        $.implement = function(obj, sm, force) {
            //可以扩展到sm制定的命名空间上
            var proto = $.isObject(sm) ? sm : sm ?  $ : $.fn;
            $.each(obj, function(name, method) {
                var previous = proto[name];
                if (previous == undefined || !previous.$ex || force) {
                    method.$ex = true;
                    proto[name] = method;
                }
            });
            return $;
        };

        //扩展ua,qq,chrome浏览器的识别
        var ua = navigator.userAgent,
            na = navigator.appVersion,
            br = $.browser;


        $.implement({
            android :$.os.android||/HTC/.test(ua)
        }, $.os,true);
        $.implement({
            qq : /qq/i.test(ua),
            chrome : /chrome/i.test(ua) || /CriOS/i.test(ua),
            uc : /UC/i.test(ua) || /UC/i.test(na)
        }, $.browser,true);
        $.browser.uc = $.browser.uc || !$.browser.qq && !$.browser.chrome && !/safari/i.test(ua);

        try {
            $.browser.version = br.uc ? na.match(/UC(?:Browser)?\/([\d.]+)/)[1] :
                br.qq ? ua.match(/MQQBrowser\/([\d.]+)/)[1] :
                    br.chrome ? ua.match(/(?:CriOS|Chrome)\/([\d.]+)/)[1] : br.version;
        } catch (e) {
        }

        $.support = $.support || {};
        $.extend( $.support, {
            orientation: !$.browser.uc && "orientation" in window && "onorientationchange" in window ,
            touch: "ontouchend" in document,
            cssTransitions: "WebKitTransitionEvent" in window,
            has3d: 'WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix()
        });

        $.implement({ // static
            _guid: 0,

            emptyFn: function() {},

            /**
             * 判断类型
             * @name $.type
             */
            type: function(o) {
                return o == null ? String(o) : class2type[toString.call(o)] || "object";
            },

            /**
             * 是否为null
             * @name $.isNull
             */
            isNull: function(o) {
                return o === null;
            },

            /**
             * 是否为undefined
             * @name $.isUndefined
             */
            isUndefined: function(o) {
                return o === undefined;
            },

            /**
             * 截取数组
             * @name $.slice
             */
            slice: function(array, index) {
                return Array.prototype.slice.call(array, index || 0);
            },

            /**
             * 函数绑定
             * @name $.bind
             */
            bind: function(fn, context, args) {
                return function() {
                    var args = (args || []).concat($.slice(arguments));
                    fn.apply(context, args);
                }
            },

            /**
             * 生成唯一id
             * @name $.guid
             */
            guid: function() {
                return this._guid++;
            },

            /**
             * 延迟执行
             * @name $.later
             */
            later: function(fn, when, periodic, context, data) {
                var when = when || 0,
                    f = function() {
                        fn.apply(context, data);
                    };

                return periodic ? setInterval(f, when) : setTimeout(f, when);
            },

            /**
             * 调试alert
             * @name $.alert
             */
            alert: function() {
                var isAlert = false;
                return function(str, once) {
                    if (!isAlert) {
                        window.alert(str);
                        once && (isAlert = true);
                    }
                };
            }(),

            /**
             * 解析模版
             * @name $.parseTpl
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
             * 加载script||css
             * @name $.loadFile
             */
            loadFile: function(url, cb, timeout) {
                var isCSS = /\.css(?:\?|$)/i.test(url),
                    head = document.head || document.getElementsByTagName('head')[0],
                    node = document.createElement(isCSS ? 'link' : 'script'),
                    cb = cb || $.emptyFn,
                    timer, onload;

                if (isCSS) {
                    node.rel = 'stylesheet';
                    node.href = url;
                    head.appendChild(node);
                } else {
                    onload = function() {
                        cb();
                        clearTimeout(timer);
                    };

                    timer = setTimeout(function() {
                        onload();
                        throw new Error('failed to load js file:' + url);
                    }, timeout || 50);

                    node.addEventListener('load', onload, false);
                    node.async = true;
                    node.src = url;
                    head.insertBefore(node, head.firstChild);
                }
            },

            /**
             * 减少执行频率
             * @name $.throttle
             * @param {Number} delay 延迟时间
             * @param {Function} fn
             * @param {Boolean} debounce_mode 非抖动模式
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
             * @name $.debounce
             * @param {Number} delay 延迟时间
             * @param {Function} fn
             * @param {Boolean} t 是否在开始时执行
             */
            debounce: function(delay, fn, t) {
                return fn === undefined ? $.throttle(250, delay, false) : $.throttle(delay, fn, t !== false);
            }

        }, true);

        var $onFn = $.fn.on,
            $offFn = $.fn.off,
            $triggerFn = $.fn.trigger,
            transEvent = {
                touchstart: 'mousedown',
                touchend: 'mouseup',
                touchmove: 'mousemove',
                tap: 'click'
            },
            transFn = function(e) {
                var events = [];
                (e || '').split(' ').forEach(function(type) {
                    events.push(!('ontouchstart' in window) ? (transEvent[type] ? transEvent[type] : type) : type);
                });
                return events.join(' ');
            };

        $.implement({
            /**
             * 注册事件
             * @name $.fn.on
             */
            on: function(event, selector, callback) {
                return $onFn.call(this, transFn(event), selector, callback);
            },

            /**
             * 注销事件
             * @name $.fn.off
             */
            off: function(event, selector, callback) {
                return $offFn.call(this, transFn(event), selector, callback);
            },

            /**
             * 获取offset
             * @name    $.fn.offset
             * @param   {Boolean}   ignoreScroll  是否忽视window滚动距离
             * @todo    ios下safari top值有1-2px的偏差
             */
            offset: function(ignoreScroll) {
                if (this.length == 0) return null;
                var obj = "getBoundingClientRect" in this[0] ? this[0].getBoundingClientRect() : (function(elem) {
                    var top = elem.offsetTop,
                        left = elem.offsetLeft,
                        width = elem.offsetWidth,
                        height = elem.offsetHeight;

                    while (elem.offsetParent) {
                        elem = elem.offsetParent;
                        top += elem.offsetTop;
                        left += elem.offsetLeft;
                    }
                    top -= window.pageYOffset;
                    left -= window.pageXOffset;

                    return {
                        top: top,
                        left: left,
                        right: left + width,
                        bottom: top + height,
                        width: width,
                        height: height
                    }
                })(this[0]);

                return {
                    left: obj.left + (ignoreScroll ? 0 : window.pageXOffset),
                    top: obj.top + (ignoreScroll ? 0 : window.pageYOffset),
                    width: obj.width,
                    height: obj.height,
                    right: obj.right + (ignoreScroll ? 0 : window.pageXOffset),
                    bottom: obj.bottom + (ignoreScroll ? 0 : window.pageYOffset)
                }
            },

            /**
             * 触发事件
             * @name $.fn.trigger
             */
            trigger: function(event) {
                var _args = $.slice(arguments);
                //caller有可能不存在
                if ($.fn.trigger.caller) {
                    var callerArgs = $.fn.trigger.caller.arguments,
                        evtObj;

                    if ($.type(event) == 'string') _args[0] = $.Event(event);
                    if (callerArgs && (evtObj = callerArgs[0]) && /Event\]$/i.test(toString.call(evtObj)) && $.inArray(_args[0].type, ['tap', 'singleTap', 'doubleTap', 'swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown ']) > -1) {
                        //是Event对象才放入
                        _args[0].originalEvent = evtObj;
                    }
                }
                return $triggerFn.apply(this, _args);
            }

        }, false, true);

        /** dispatch scrollStop */
        $(window).on('scroll', $.debounce(function() {
            $(document).trigger('scrollStop');
        }));

        /** detect orientation change */
        $(document).ready(function () {
            var getOrt = function() {
                    var elem = document.documentElement;
                    return elem.clientWidth / elem.clientHeight < 1.1 ? "portrait" : "landscape";
                },
                lastOrt = getOrt(),
                handler = function() {
                    clearInterval(timeId);
                    timeId = $.later(function() {
                        var curOrt = getOrt();
                        if (lastOrt !== curOrt) {
                            lastOrt = curOrt;
                            clearInterval(timeId);
                            $(window).trigger('ortchange')
                        }
                    }, 50, true);
                },
                timeId;
            if (!$.support.orientation) $(window).bind('resize', $.debounce(handler));
            else $(window).bind('orientationchange', $.debounce(handler));
        });
    });
})(Zepto);


//自定义highlight效果
(function($) {
    var id_prefix = 'highlight-',
        lastElem = null,
        highlightTimer = null,
        unHighlightTimer = null,
        highlightInited = false,
        unHover = function(className, later) {
            var $el;
            highlightTimer && clearTimeout(highlightTimer);
            highlightTimer = null;
            if (lastElem) {
                lastElem.off('touchmove', eventHandler);
                unHighlightTimer && clearTimeout(unHighlightTimer);
                $el = lastElem;
                later ? (unHighlightTimer = setTimeout(function() {
                    unHighlightTimer = null;
                    $el.removeClass(className);
                }, 80)) : $el.removeClass(className);
                lastElem = null;
            }
        },
        hover = function($el, className) {
            highlightTimer = setTimeout(function() {
                var className = $el.data(id_prefix + 'className');
                $el.addClass(className);
                highlightTimer = null;
            }, 80);
        },
        eventHandler = function(e) {
            var el = e.currentTarget,
                className = $(el).data(id_prefix + 'className') || lastElem && lastElem.data(id_prefix + 'className');

            switch (e.type) {
            case 'touchstart':
                //如果是多指操作则跳过
                if (e.touches.length > 1) return;
            case 'mousedown':
                if (el !== document) {
                    unHover(className);
                    lastElem = $(el);
                    e._target = el;
                    hover(lastElem, className);
                    lastElem.on('touchmove', eventHandler);
                } else if (!e._target) {
                    unHover(className);
                }
                break;
            case 'touchmove':
            case 'mousemove':
                unHover(className);
                break;
            case 'touchend':
            case 'mouseup':
            case 'touchcancel':
                unHover(className, true);
                break;
            }
        };

    $.implement({
        highlight: function(className, elem) {
            className = className || '';
            elem = $(elem);
            if (!highlightInited) {
                highlightInited = true;
                $.proxy(eventHandler);
                $(document).on('touchstart touchend touchcancel', eventHandler);
            }
            return this.each(function() {
                var $el = $(this),
                    originalClassName = $el.data(id_prefix + 'className') || '', fn;

                lastElem && lastElem[0] == this && lastElem.removeClass(originalClassName) && className && lastElem.addClass(className);
                $el.css('-webkit-tap-highlight-color', 'rgba(255,255,255,0)').data(id_prefix + 'className', className);

                if (!originalClassName && className) {
                    fn = function(e){
                        for(var i= 0, length = elem.length, val; i<length; i++){
                            val = elem[i].compareDocumentPosition(e.target);
                            if( val&16 || val === 0 )return;//如果是本身，或者是孩子
                        }
                        eventHandler.apply(this, arguments);
                    }
                    fn._zid = eventHandler._zid;
                    $el.on('touchstart', fn);
                } else if (originalClassName && !className) {
                    $el.off('touchstart', eventHandler);
                }
            });
        },
        behavior: function() {
            return this.highlight.apply(this, arguments);
        }
    }, false, true);
    
    $.highlight = $.highlight || {};
    $.highlight.checkDOMChanges = true;

    $(function() { //自动对data-highlight的元素绑定这个功能，包括新引进的dom
        var switcher = true,
            init = function() {
                if (!switcher) return;
                switcher = false;

                var elems = $('[data-highlight]').not('[data-highlight-class-name]'),
                    className = elems.attr('data-highlight');

                className && elems.highlight(className);

                switcher = true;
            };
        $.highlight.checkDOMChanges && $(document).bind('DOMSubtreeModified', init);
    });
})(Zepto);
exports = Zepto.ui;
