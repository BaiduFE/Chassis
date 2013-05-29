/**
 *  @file 基于Zepto的图片延迟加载插件
 *  @name imglazyload
 *  @desc 图片延迟加载
 *  @import core/zepto.extend.js
 */
(function ($) {
    /**
     * @name imglazyload
     * @grammar  imglazyload(opts)   ⇒ self
     * @desc 图片延迟加载
     * **Options**
     * - ''placeHolder''     {String}:              (可选, 默认值:\'\')图片显示前的占位符
     * - ''container''       {Array|Selector}:      (可选, 默认值:window)图片延迟加载容器
     * - ''threshold''       {Array|Selector}:      (可选, 默认值:0)阀值，为正值则提前加载
     * - ''dataName''        {String}:              (可选, 默认值:data-url)图片url名称
     * - ''eventName''       {String}:              (可选, 默认值:scrollStop)绑定事件方式
     * - ''refresh''         {Boolean}              (可选, 默认值:false)是否是更新操作，若是页面追加图片，可以将该参数设为false
     * - ''startload''       {Function}             (可选, 默认值:null)开始加载前的事件，该事件作为参数，不是trigger的
     *
     *
     * **events**
     * - ''startload'' 开始加载图片
     * - ''loadcomplete'' 加载完成
     * - ''error'' 加载失败
     *
     * @example $('.lazy-load').imglazyload();
     * $('.lazy-load').imglazyload().on('error', function (e) {
     *     e.preventDefault();      //该图片不再加载
     * });
     */
    var pedding;
    $.fn.imglazyload = function (opts) {
        var splice = Array.prototype.splice,
            opts = $.extend({
                threshold:0,
                container:window,
                urlName:'data-url',
                placeHolder:'',
                eventName:'scrollStop',
                startload: null,
                refresh: false
            }, opts),
            $container = $(opts.container),
            cTop = $container.scrollTop(),
            cHeight = $container.height(),
            detect = {
                init:function (top, height) {    //初始条件
                    return cTop >= top - opts.threshold - cHeight && cTop <= top + height + cHeight;
                },
                'default':function (top, height) {      //每次滚动时发生变化，滚动条件
                    var cTop = $container.scrollTop(),
                        cHeight = $container.height();
                    return cTop >= top - opts.threshold - cHeight && cTop <= top + height + cHeight;
                }
            };

        pedding = $.slice(this).reverse();
        if (opts.refresh) return this;      //更新pedding值

        function _load(div, index) {
            var $div = $(div), $img;
            $.isFunction(opts.startload) && opts.startload.call($div);
            $img = $('<img />').on('load',function () {
                $div.trigger('loadcomplete').replaceWith($img);
                $img.off('load');
                splice.call(pedding, index, 1);
            }).on('error',function () {     //图片加载失败处理
                var errorEvent = $.Event('error');       //派生错误处理的事件
                $div.trigger(errorEvent);
                errorEvent.defaultPrevented && splice.call(pedding, index, 1);
                $img.off('error').remove();
            }).attr('src', $div.attr(opts.urlName));
        }

        function _detect(type) {
            var i, $image, offset, div;
            for (i = pedding.length; i--;) {
                $image = $(div = pedding[i]);
                offset = $image.offset();
                detect[type || 'default'](offset.top, offset.height) && _load(div, i);
            }
        }

        $(document).ready(function () {
            opts.placeHolder && $(pedding).append(opts.placeHolder);     //初化时将placeHolder存入
            _detect('init');
        });

        (opts.container === window ? $(document) : $container).on(opts.eventName + ' ortchange', function () {
            _detect();
        });

        return this;
    };
})(Zepto);
