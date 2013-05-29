require('gmu:uibase');
require('gmu:base');
require('gmu:uibase/widget');
require('gmu:uibase/control');
/**
 * $.ui.pager
 * @fileOverview  分页组件
 */
(function($) {
    /**
     * @class
     * @name     $.ui.pager
     * @param    {Object}     options                参数.
     * @param    {Selector}   options.container      (必选)容器选择器
     * @param    {Function}   options.transPage      (必选)数据转换函数，需要产品线提供
     * @param    {Number}     options.totalPage      (必选)总页数
     * @param    {Number}     options.viewPage       (必选)每页显示多少页码
     * @param    {Number}     options.currentPage    (必选)当前页号
     * @param    {String}     options.actionUrl      (可选)跳转url
     * @param    {String}     options.params         (可选)需要传递的参数
     * @param    {String}     options.cls            (可选)custom样式
     * @param    {String}     options.topLabel       (可选)首页文字，传null不显示: '首页'
     * @param    {String}     options.endLabel       (可选)尾页文字，传null不显示: '尾页'
     * @param    {String}     options.preLabel       (可选)上页文字，传null不显示: '上一页'
     * @param    {String}     options.nxtLabel       (可选)下页文字，传null不显示: '下一页'
     * @param    {String}     options.pageTpl        (可选)页码模版: <%=pageTxt%>
     * @param    {String}     options.currTpl        (可选)当前页模版: <%=pageTxt%>
     * @param    {Event}      options.pageChange     (可选)点击页码时触发
     */
    $.ui.create('pager', {
        _data: {
            actionUrl: 'javascript:;',
            topLabel: '首页',
            endLabel: '尾页',
            preLabel: '上一页',
            nxtLabel: '下一页',
            pageTpl: '<%=pageTxt%>',
            currTpl: '<%=pageTxt%>',
            transPage: function(num) {
                return 'currentPage=' + num;
            }
        },

        _create: function() {
            var me = this;
            me.widget($('<div class="ui-pager">' + me._page() +'</div>').addClass(me.data('cls') || '').appendTo(me.data('container') || document.body));
            me.trigger('create');
        },

        _init: function() {
            var me = this,
                $elem = me.widget(),
                eventHandler = $.bind(me._eventHandler, me);

            $elem.on('tap', eventHandler);
            me.on('destroy', function() {
                $elem.off('tap', eventHandler);
            }).trigger('init');
        },

        /**
         * 创建page
         * @private
         */
        _page: function() {
            var me = this,
                totalPage = parseInt(me.data('totalPage')),
                currentPage = parseInt(me.data('currentPage')),
                viewPage = parseInt(me.data('viewPage')),
                topLabel = me.data('topLabel'),
                endLabel = me.data('endLabel'),
                preLabel = me.data('preLabel'),
                nxtLabel = me.data('nxtLabel'),
                offset = Math.ceil(viewPage / 1.9),
                min = currentPage <= offset-- ? 1 : currentPage - offset,
                max = min + viewPage - 1,
                pageList = [];

            if (max > totalPage) {
                min += totalPage - max;
                max = totalPage;
            }
            min < 1 && (min = 1);

            topLabel && currentPage > 1 && pageList.push(me._createPage(1, topLabel, true));
            currentPage > 1 && preLabel && pageList.push(me._createPage(currentPage - 1, preLabel, true));

            for (var i = min; i <= max; i++) {
                if (i == min && i != currentPage) {
                    pageList.push(me._createPage(1));
                    continue;
                }

                if (min + 1 == i && max > viewPage) {
                    pageList.push(me._createPage('dot'));
                    continue;
                }

                pageList.push(me._createPage(i));
            }

            currentPage < totalPage && nxtLabel && pageList.push(me._createPage(currentPage + 1, nxtLabel, true));
            endLabel && currentPage != totalPage && pageList.push(me._createPage(totalPage, endLabel, true));

            return pageList.join('');
        },

        /**
         * 生成页码
         * @private
         */
        _createPage: function(num, txt, internal) {
            var me = this,
                tpl = '<a href="<%=pageUrl%>" class="<%=pageClass%>">' + (internal ? '<%=pageTxt%>' : me.data('pageTpl')) + '</a>',
                actionUrl = me.data('actionUrl'),
                params = me.data('params'),
                totalPage = parseInt(me.data('totalPage')),
                currentPage = parseInt(me.data('currentPage')),
                flag = /\?/.test(actionUrl),
                url, pageClass;

            !txt && (txt = num);
            switch (num) {
                case 'dot':
                    tpl = '<a href="javascript:;" class="dot">...</a>';
                    break;
                case currentPage:
                    tpl = '<a href="javascript:;" class="current">' + me.data('currTpl') + '</a>';
                    break;
                default:
                    url = actionUrl + (flag ? '&' : '?') + (params ? encodeURIComponent(params) + '&amp;' : '') + me.data('transPage')(num);
            }

            return $.parseTpl(tpl, {
                pageUrl: url,
                pageTxt: txt,
                pageClass: pageClass || ''
            });
        },

        /**
         * 事件管理函数
         * @private
         */
        _eventHandler: function(e) {
            var me = this;

            if (!me.data('status')) return e.preventDefault();
            switch (e.type) {
                case 'click':
                case 'tap':
                    me.trigger('pageChange', e);
                    break;
            }
        },

        /**
         * 销毁组件
         * @function
         * @name  $.ui.pager.destroy
         */
        destroy: function() {
            this._super();
        }

    });

})(Zepto);

exports = Zepto.ui.pager;
