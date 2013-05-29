



/**
 * @fileOverview   suggestion  组件
 * @description     默认使用jsonp请求数据，可以通过传入sendRequest(query, callback)来自定义请求方式
 */

(function($, undefined) {
    /**
     * @description   refresh 组件
     * @class
     * @name    $.ui.refresh
     * @grammar $.ui.refresh(el[,options])
     * @mode render模式、暂时不支持auto-init模式
     * @param    {selector|zepto}       el                      父容器选择器或者对象
     * @param    {Object}               options                 参数
     * @param   {Selector}             options.container       (必选)渲染到哪个元素 || document.body
     * @param   {String}               options.pullUpText      (可选)上拉加载更多文字
     * @param   {String}               options.pullReleaseText (可选)松开立即加载
     * @param   {String}               options.loadingText     (可选)加载中
     * @param   {String}               options.clickText       (可选)点击加载更多
     * @param   {String}               options.type            (可选)refresh类型(click or pullup)，默认为click
     * @param   {String}               options.direction       (可选)上拉加载或下拉加载，默认为up
     * @param   {Boolean}              options.isShow          (可选)是否默认显示
     * @param   {String}               options.hotArea         (必填)加载热区
     * @param   {Object}               options.onReady         (可选)加载成功后调用函数
     */
    $.ui.create('refresh', {
        _data:{
            container: "",
            instanceId: "",
            pullUpText:"加载更多",
            pullReleaseText:"松开立即加载",
            loadingText:'加载中...',
            clickText:"点击加载更多",
            type: 'click',
            direction: "up",       //加载方向，上拉加载
            isShow: true,
            onReady: null
        },

        _create: function() {
            var me = this;

            me._createButtonUI();    //创建refresh button的UI

            me.trigger('create');
        },

        _init: function() {
            var me = this,
                type = me.data("type"),
                $el = me.widget();

            //目前只支持上拉和点击
            if ($.inArray(me.data('type'), ['click','pullup']) == -1) return;

            me.data({
                range: 150,
                _isOk: true,              //加载是否完成
                refreshing: false,
                list: $el.parent().parent(),
                maxHeight: $el.parent().parent().height() || 200,
                maxTop: parseInt($el.parent().parent().get(0).getBoundingClientRect().top)
            });

            type == "click" ? me._clickAction() : me._pullUpAction();
            
            if (!me.data('isShow')) $el.hide();

            me.trigger('init');
        },

        /**
         * 创建下拉或点击的按钮UI
         * @private
         */
        _createButtonUI: function() {
            var me = this,
                $el = me.widget(),
                pullUpTpl = [],
                direction = me.data("direction"),
                container = $(me.data('container') || document.body)[0];// , //只处理第一个元素

            if ($.inArray(me.data('direction'), ['up','down']) == -1) {    //设置direction的默认值
                direction = "up";
            }
            //设定默认el
            if (!$el) {
                $el = me.widget($('<div></div>')).appendTo(container);
            }
            pullUpTpl.push('<span class="ui-refresh-pullup-icon"></span>');
            pullUpTpl.push('<span class="ui-refresh-pullup-label">' + (me.data('type') == 'pullup' ? me.data('pullUpText') : me.data('clickText')) + '</span>');
            $el.html(pullUpTpl.join(''));

            if (!$el.parent().length) {
                direction == "up" ? $el.appendTo(container): $el.prependTo(container);
            } else if (container !== document.body) {
                direction == "up" ? $el.appendTo(container) : $el.prependTo(container)
            }

            me.data({
                pullUpLabel: $el.find('.ui-refresh-pullup-label'),
                pullUpIcon: $el.find(".ui-refresh-pullup-icon"),
                dir: direction
            });

            me.data("pullUpIcon").hide();    //lite版箭头默认不显示

            $el.addClass(me.data("instanceId") || "ui-refresh");    //处理多实例
        },

        /**
         * 点击操作
         * @private
         */
        _clickAction: function () {
            var me = this,
                $el = me.widget(),
                eventHandler = $.bind(me._eventHandler, me);

            $el.on("click", eventHandler);      //tap改成click，解决穿透问题

        },

        /**
         * 上拉操作
         * @private
         */
        _pullUpAction: function () {
            var me = this,
                $list = me.data("list"),
                eventHandler = $.bind(me._eventHandler, me);

            $list.on("touchstart touchmove touchend", eventHandler);
            me.widget().on("click", eventHandler);      //点击和上拉同时存在，tap改成click，解决穿透问题
        },

        /**
         * 点击方式事件
         * @private
         */
        _tapHandler: function (e) {
            var me = this;
            
            if (!me.data("_isOk")) {
                return;
            }

            var $el = me.widget(),
                $pullUpLabel = me.data("pullUpLabel"),
                $pullUpIcon = me.data("pullUpIcon"),
                type = me.data("type");

            $el.addClass('ui-refresh-loading');
            $pullUpIcon.show();      //icon转化为loading图标
            $pullUpLabel.html(me.data('loadingText'));

            me.data('onReady').call(this, function() {      //数据加载完成后的默认执行函数
                $el.removeClass('ui-refresh-loading');
                $pullUpIcon.hide();
                $pullUpLabel.html(type == "click" ? me.data('clickText') : me.data("pullUpText"));
            });

            me.data("_isOk", false);
        },

        /**
         * touchstart事件
         * @private
         */
        _touchStartHandler: function (e) {
            if (!e.targetTouches[0]) {
                return;
            }

            var me = this,
                $list = me.data("list"),
                direction = me.data("dir"),
                maxTop = me.data("maxTop"),
                range = me.data("range"),
                touchY = e.targetTouches[0].pageY;

            //方向向上或向下且在拉动可加载的范围内
            if ((direction == "up" && touchY > ($list.height() + maxTop - range)) || (direction == "down" && touchY < (maxTop + me.widget().height() + range))) {
                me.data("startY", touchY);
            }
        },

        /**
         * touchmove事件
         * @private
         */
        _touchMoveHandler: function (e) {
            var me = this,
                moveY = e.targetTouches[0].pageY,
                startY = me.data("startY"),
                direction = me.data("dir"),
                thisMoveY = moveY - startY;

            //不需要执行的条件
            if (!e.targetTouches[0] || !me.data("_isOk") || !startY || (direction == "up" && thisMoveY > 0) || (direction == "down" && thisMoveY < 0)) {
                return;
            }

            var $pullUpLabel = me.data("pullUpLabel"),
                range = me.data("range"),
                maxTop = me.data("maxTop");

            if (Math.abs(thisMoveY) < me.data("maxHeight") && !me.data("refreshing")) {    //判断点击区域
                $pullUpLabel.html(me.data('pullReleaseText'));
                me.data("refreshing", true);
            }

            me.data("allMoveY", thisMoveY);
        },

        /**
         * touchend事件
         * @private
         */
        _touchEndHandler: function() {
            var me = this,
                $el = me.widget(),
                $pullUpIcon = me.data("pullUpIcon"),
                $pullUpLabel = me.data("pullUpLabel");

            if (me.data("refreshing")) {
                $el.addClass('ui-refresh-loading');
                $pullUpIcon.show();
                $pullUpLabel.html(me.data('loadingText'));

                me.data('onReady').call(this, function() {      //数据加载完成后的默认执行函数
                    $pullUpIcon.hide();
                    $el.removeClass('ui-refresh-loading');
                    $pullUpLabel.html(me.data('pullUpText'));
                });

                me.data({
                    refreshing: false,
                    _isOk: false
                });
            }
            me.data("startY", 0);     //重置startY的值
        },

        /**
         * @description 设定状态
         * @function
         * @name $.ui.refresh.setStatus
         * @param {Boolean} status 是否加载，true为加载，false为不加载
         * @return {undefined} this
         */
        setStatus: function(status) {
            var me = this;

            me.data("_isOk", !!status ? true : false);
        },

        /**
         * @description 隐藏refresh按钮
         * @function
         * @name $.ui.refresh.hide
         * @param {Boolean} isOpen 是否加载，true为加载，false为不加载，不传为不加载
         * @return {undefined} this
         */
        hide: function(isOpen) {
            var me = this,
                $el = me.widget(),
                open = isOpen ? true : false;

            me.setStatus(open);

            if (me.data('isShow')) {
                me.data('isShow', false);
                $el.hide();
            }
        },

        /**
         * @description 显示refresh按钮
         * @function
         * @name $.ui.refresh.show
         * @param {Boolean} isOpen 是否加载，true为加载，false为不加载，不传为不加载
         * @return {undefined} this
         */
        show: function(isOpen) {
            var me = this,
                $el = me.widget(),
                open = isOpen || isOpen == undefined ? true : false;

            me.setStatus(open);

            //修改代码格式 - by gsl
            if (!me.data('isShow')) {
                me.data('isShow', true);
                $el.show();
            }
        },

        /**
         * @description 设置加载完成后的button的内容
         * @function
         * @name $.ui.refresh.setLoadEndText
         * @param {String} text 文案
         * @param {Boolean} isOpen 是否还可以加载
         * @return {undefined} this
         */
        setLoadEndText: function (text, isOpen) {
            var me = this,
                pullUpLabel = me.data("pullUpLabel"),
                pullUpIcon = me.data("pullUpIcon"),
                defText = me.data("type") == "click" ? me.data("clickText") : me.data("pullUpText"),
                cont = !text ? defText : text,
                open = isOpen ? true : false;

            pullUpLabel.html(cont);
            pullUpIcon && pullUpIcon.hide();
            me.setStatus(open);
        },

        /**
         * 事件处理中心
         * @private
         */
        _eventHandler: function(e) {
            var me = this;

            switch (e.type) {
                case 'click':
                    me._tapHandler(e);
                    break;
                case 'touchstart':
                    me._touchStartHandler(e);
                    break;
                case 'touchmove':
                    me._touchMoveHandler(e);
                    e.target.nodeType == 3 && $.os.ios && me._touchEndHandler(e);      //在ios4下，touchmove改变了target的内容，会导致touchend不触发
                    $.os.android && me.data('touchMoveTimer', setTimeout(function () {      //在android下，touchmove没有preventDefault时，touchend不触发
                        me._touchEndHandler();
                    }, 1000));
                    break;
                case 'touchend':
                    me.data('touchEndTimer', setTimeout(function () {me._touchEndHandler(e);}, 0));
                    break;
            }
        },

        /**
         * @description 销毁组件
         * @function
         * @name $.ui.refresh.destory
         */
        destroy: function () {
            var me = this,
                touchMoveTimer = me.data('touchMoveTimer'),
                touchEndTimer = me.data('touchEndTimer');

            me.widget().off('click');
            me.data('list').off('touchstart touchmove touchend');
            touchMoveTimer && clearTimeout(touchMoveTimer);
            touchEndTimer && clearTimeout(touchEndTimer);

            me._super();
        }

    });
})(Zepto);

