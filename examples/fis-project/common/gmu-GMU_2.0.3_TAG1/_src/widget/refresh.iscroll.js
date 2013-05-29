/**
 * @file 加载更多组件 － iScroll版
 * @name Refresh.iscroll
 * @short Refresh.iscroll
 * @import core/zepto.iscroll.js, widget/refresh.js
 */

(function($, undefined) {
    /**
     * @name 说明
     * @desc Refresh iscroll插件，支持拉动加载，内滚采用iscroll方式，体验更加贴近native。
     * **Demo**
     * <codepreview href="../gmu/_examples/widget/refresh/refresh_iscroll.html">
     * ../gmu/_examples/widget/refresh/refresh_iscroll.html
     * </codepreview>
     */
    $.ui.refresh.register(function () {
        return {
            pluginName: 'iscroll',
            _init: function () {
                var me = this,
                    data = me._data,
                    $el = me.root(),
                    wrapperH = $el.height();

                me._initOrg();
                $.extend(data, {
                    useTransition: true,
                    speedScale: 1,
                    topOffset: data['$upElem'] ? data['$upElem'].height() : 0,
                    threshold: 0
                });

                $el.wrapAll($('<div class="ui-refresh-wrapper"></div>').height(wrapperH)).css('height', 'auto');
                me._loadIscroll();
            },
            _changeStyle: function (dir, state) {
                var me = this,
                    data = me._data,
                    refreshInfo = data.refreshInfo[dir];

                me._changeStyleOrg(dir, state);
                switch (state) {
                    case 'loaded':
                        refreshInfo['$icon'].addClass('ui-refresh-icon');
                        break;
                    case 'beforeload':
                        refreshInfo['$label'].html('松开立即加载');
                        refreshInfo['$icon'].addClass('ui-refresh-flip');
                        break;
                    case 'loading':
                        refreshInfo['$icon'].removeClass().addClass('ui-loading');
                        break;
                }
                return me;
            },
            _loadIscroll: function () {
                var me = this,
                    data = me._data,
                    threshold = data.threshold;

                data.iScroll = new iScroll(me.root().parent().get(0), data.iScrollOpts = $.extend({
                    useTransition: data.useTransition,
                    speedScale: data.speedScale,
                    topOffset: data.topOffset
                }, data.iScrollOpts, {
                    onScrollStart: function (e) {
                        me.trigger('scrollstart', e);
                    },
                    onScrollMove: (function () {
                        var up = data.$upElem && data.$upElem.length ,
                            down = data.$downElem && data.$downElem.length;

                        return function (e) {
                            var upRefreshed = data['_upRefreshed'],
                                downRefreshed = data['_downRefreshed'],
                                upStatus = me.status('up'),
                                downStatus = me.status('down');

                            if (up && !upStatus && down && !downStatus) return;
                            if (downStatus && down && !downRefreshed && this.y < (this.maxScrollY - threshold)) {    //下边按钮，上拉加载
                                me._setMoveState('down', 'beforeload', 'pull');
                            } else if (upStatus && up && !upRefreshed && this.y > threshold) {     //上边按钮，下拉加载
                                me._setMoveState('up', 'beforeload', 'pull');
                                this.minScrollY = 0;
                            } else if (downStatus && downRefreshed && this.y > (this.maxScrollY + threshold)) {      //下边按钮，上拉恢复
                                me._setMoveState('down', 'loaded', 'restore');
                            } else if (upStatus && upRefreshed && this.y < threshold) {      //上边按钮，下拉恢复
                                me._setMoveState('up', 'loaded', 'restore');
                                this.minScrollY = -data.topOffset;
                            }
                            me.trigger('scrollmove', e);
                        };
                    })(),
                    onScrollEnd: function (e) {
                        var actDir = data._actDir;
                        if (actDir) {
                            me._setStyle(actDir, 'loading');
                            me._loadingAction(actDir, 'pull');
                        }
                        me.trigger('scrollend', e);
                    }
                }));
            },
            _setMoveState: function (dir, state, actType) {
                var me = this,
                    data = me._data;

                me._setStyle(dir, state);
                data['_' + dir + 'Refreshed'] = actType == 'pull';
                data['_actDir'] = actType == 'pull' ? dir : '';

                return me;
            },
            afterDataLoading: function (dir) {
                var me = this,
                    data = me._data,
                    dir = dir || data._actDir;

                data.iScroll.refresh();
                data['_' + dir + 'Refreshed'] = false;
                return me.afterDataLoadingOrg(dir);
            }
        }
    });
})(Zepto);