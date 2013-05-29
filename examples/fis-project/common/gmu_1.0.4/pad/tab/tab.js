require('gmu:uibase');
require('gmu:base');
require('gmu:uibase/widget');
require('gmu:uibase/control');
/**
 * $.ui.tab
 * @fileOverview  tab切换组件
 */

(function ($) {
    /**
     * @class
     * @name      $.ui.tab
     * @param     {Selector|Zepto}       el                          根元素，tab内容在页面上模板的父容器，与children二选一
     * @param     {Object}               options                     可配置的参数
     * @param     {Selector|Zepto}       options.container           (可选)父容器，默认值为document.body
     * @param     {Array}                options.children            (可选)tab内容，与页面提供模板方式二选一
     * @param     {Number}               options.defTab              (可选)默认选中tab的索引，默认选中第一项
     * @param     {Boolean}              options.isSwipe             (可选)tab内容是否可滑动
     * @param     {Selector|Zepto}       options.instanceId          (可选)多实例的类名
     * @param     {Event}                options.onselect            (可选)选中tab时触发的事件
     */
    $.ui.create("tab", {
        _data: {
            container: "",
            defTab: 0,
            isSwipe: true,
            instanceId: "",
            onselect: function (obj) {}
        },

        _create: function () {
            var me = this,
                $el = me.widget(),
                $container = $(me.data("container") || document.body),
                children = me.data("children"),
                isSwipe = me.data("isSwipe"),
                navArr = [], contArr = [];

            if ($el) {    //通过页面模板方式创建tab
                $el.css("display", "block");
                if (!$el.parent().length) {
                    $el.appendTo($container);
                }else if ($container[0] !== document.body){
                    $el.appendTo($container);
                }
            }else {   //通过children方式创建tab
                $.each(children, function (index, item) {
                    navArr.push("<li><a href='javascript:;'>" + item["label"] + "</a></li>");
                    contArr.push("<div class='ui-tab-pannel'>" + item["content"] + "</div> ");
                });
                $el = me.widget($("<div></div>").append("<ul class='ui-tab-nav'>" + navArr.join("") + "</ul>").append("<div class='ui-tab-cont'>" + contArr.join("") + "</div>")).appendTo($container);
            }

            $el.addClass(me.data("instanceId") || "ui-tab");

            me.trigger("create");
        },

        _init: function () {
            var me = this,
                $el = me.widget(),
                isSwipe = me.data("isSwipe"),
                defTab = parseInt(me.data("defTab")),
                $navList = $el.find(".ui-tab-nav li"),
                $contList = $el.find(".ui-tab-cont .ui-tab-pannel");

            //为可滑动的tab创建外围容器
            isSwipe && $contList.wrapAll("<div class='ui-tab-contwrap'></div>") && $(".ui-tab-contwrap", $el).css("display", "-webkit-box");
            
            $navList.each(function (index) {    //为所有的tab nav添加index属性
                this.index = index;
            });
            $contList.each(function (index) {    //为所以有的tab cont添加index属性
                this.index = index;
                !isSwipe && $(this).css("display", "none");
            });

            me.data({
                navList: $navList,
                contList: $contList,
                contWrap: $el.find(".ui-tab-contwrap"),
                lastIndex: -1
            });

            defTab != undefined && me.switchTo(defTab);    //默认选中tab项

            $navList.on("tap", function (e) {me._eventHandler(e)});
            me.on("destroy", function () {
                $navList.off('tap');
            });

            me.trigger("init");
        },

        /**
         * 切换到某个tab
         * @function
         * @name   $.ui.tab.switchTo
         * @param  {Number}  index  切换到的tab的索引
         */
        switchTo: function (index) {
            var me = this,
                $navList = me.data("navList"),
                $contList = me.data("contList"),
                isSwipe = me.data("isSwipe"),
                lastIndex = me.data("lastIndex"),
                curIndex = parseInt(index),
                swipeDis = 0;

            if (lastIndex > -1) {
                $($navList[lastIndex]).removeClass("cur");
                !isSwipe && $($contList[lastIndex]).css("display", "none");
            }

            $($navList[curIndex]).addClass("cur");

            if (isSwipe) {
                curIndex && (swipeDis = $contList[curIndex].offsetLeft - $contList.parent().get(0).offsetLeft);    //获取滑动距离
                me.data("contWrap").css("-webkit-transform", "translate(" + -swipeDis + "px,0)");
            }else {
                $($contList[curIndex]).css("display", "block");
            }

            me.data("lastIndex", curIndex);

            me.trigger("select", {tab: $navList[curIndex], cont: $contList[curIndex]});
        },

        /**
         * tab切换事件eventhandle
         * @private
         */
        _switchEventHandle: function (e) {
            var me = this,
                $target = $(e.target);

            $target.pluck("nodeName") == "A" && me.switchTo($target.parent().attr("index"));
        },

        /**
         * 销毁组件
         * @function
         * @name  $.ui.tab.destroy
         */
        destroy: function () {
            this._super();
        },

        /**
         * 事件处理中心
         * @private
         */
        _eventHandler: function (e) {
            var me = this;

            switch (e.type) {
                case "click":
                case "tap":
                    me._switchEventHandle(e);
                    break;
            }
        }
    });

})(Zepto);
exports = Zepto.ui.tab;
