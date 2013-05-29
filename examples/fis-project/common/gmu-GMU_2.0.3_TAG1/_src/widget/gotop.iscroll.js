
/**
 * @file Gotop - 内滚插件
 * @name Gotop － iscroll插件
 * @short Gotop.iscroll
 * @import core/zepto.iscroll.js, widget/gotop.js
 */
(function($, undefined) {
    /**
     * @name 说明
     * @desc 在使用iscroll的页面上使用gotop组件时，需要加入该插件
     *
     * 使用iscroll时需要传入iScroll实例，用来判定显示与隐藏
     *
     * <code>
     * $('#gotop').gotop({
     *     iScrollInstance: iscroll //创建好的iscroll实例
     * });
     * </code>
     * @desc
     * **Demo**
     * <codepreview href="../gmu/_examples/widget/gotop/gotop_iscroll.html">
     * ../gmu/_examples/widget/gotop/gotop_iscroll.html
     * ../gmu/_examples/widget/gotop/gotop_demo.css
     * </codepreview>
     */
    $.ui.gotop.register(function(){
        return {
            pluginName: 'iscroll',
            _init: function () {
                var me = this,
                    o = me._data,
                    root = me.root(),
                    iscroll = o.iScrollInstance;
                var _move = iscroll.options.onScrollMove,       //防止覆写
                    _end = iscroll.options.onScrollEnd;
                iscroll.options.onScrollMove = function() {
                    _move && _move.call(iscroll, arguments);
                    me.hide();
                };
                iscroll.options.onScrollEnd = function() {
                    _end && _end.call(iscroll, arguments);
                    me._check(Math.abs(iscroll.y));
                    if(o._scrollClick) {    //只在click之后的scrollEnd触发afterScroll事件
                        me.trigger('afterScroll');
                        o._scrollClick = false;
                    }
                };
                root.on('click', function() {
                    o._scrollClick = true;
                    iscroll.scrollTo(0, 0);
                });
                me.on('destroy', function() {
                    iscroll.options.onScrollMove = _move;       //恢复引用
                    iscroll.options.onScrollEnd = _end;
                });
                o.useFix && root.fix(o.position);
                o.root = root[0];
                return me;
            }
        }
    });
})(Zepto);