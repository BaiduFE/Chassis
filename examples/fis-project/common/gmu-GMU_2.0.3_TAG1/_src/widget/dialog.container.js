/**
 * @file Dialog － 父容器插件
 * @name Dialog － 父容器插件
 * @short Dialog.container
 * @import widget/dialog.js
 */
(function ($, undefined) {
    $.ui.dialog.register(function () {
        return {
            pluginName: 'container',
            _getContainer: function(){
                var data = this._data;
                if (data.container && (data.container = $(data.container)) && !data.container.is('body')) {
                    data._flag = true;
                    data.scrollMove = false;
                    return data.container.css('position', 'relative');
                }
                return this._getContainerOrg();
            },
            /**
             * @name 说明
             * @desc 无此插件dialog的container只能是body, 加此插件后，可以是body下的其他容器，由于定位方式不一样，所以以插件的形式来实现此功能。
             *
             * **Demo**
             * <codepreview href="../gmu/_examples/widget/dialog/dialog_container.html">
             * ../gmu/_examples/widget/dialog/dialog_container.html
             * </codepreview>
             */
            _calculate:function () {
                var me = this, data = me._data, pos, css, size, result;
                if (!data._flag) return this._calculateOrg(); //如果container是body则调用原来的方法
                pos = data._pos;
                result = {};
                data._mask && (result.mask = {
                    width:'100%',
                    height:'100%'
                });

                css = {};
                size = data._size;
                if (pos.x == 'center') {
                    css['left'] = '50%';
                    css['margin-left'] = -size.width / 2 + 'px';
                } else {
                    css['left'] = pos.x;
                    css['margin-left'] = '0';
                }
                if (pos.y == 'center') {
                    css['top'] = '50%';
                    css['margin-top'] = -size.height / 2 + 'px';
                } else {
                    css['top'] = pos.y;
                    css['margin-top'] = '0';
                }
                result.wrap = css;
                return result;
            }
        }
    });
})(Zepto);
