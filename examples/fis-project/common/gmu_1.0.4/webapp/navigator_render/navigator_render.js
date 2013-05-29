



/**
 * @fileOverview
 * @author: zhoumeimei@baidu.com
 * @description   navigator render组件
 */

(function ($, undefined) {
    /**
     * @description navigator组件
     * @class
     * @name     $.ui.navigator
     * @grammar  $.ui.navigator(el[,options])
     * @param    {String|zepto}       el                        (可选)根元素选择器或者对象
     * @param    {Object}             options                   可配置的参数项
     * @param    {String|zepto}       options.container         (可选)渲染到哪个元素， 默认值：document.body
     * @param    {Object}             options.content           (必选)导航tab项的内容
     * @param    {Object}             options.fixContent        (可选)固定tab项的内容
     * @param    {String}             options.instanceId        (可选)多实例的类名选择器
     * @param    {Boolean}            options.isSwipe           (可选)是否滑动
     * @param    {Number}             options.defTab            (必选)默认选中的导航tab项的索引，第一个从0开始
     * @param    {Function}           options.onverticalswipe   (可选)竖滑触发的事件
     * @param    {Function}           options.ontabselect       (可选)tab选中时触发的事件
     */

    $.ui.create("navigator", {
        _data: {
            container: "",
            defTab: 0,
            isSwipe: true,
            onverticalswipe: function (e) {},
            ontabselect: function (e) {}
        },

        _create: function () {
            var me = this,
                $fixContent = $(me.data("fixContent"));

            me._createNavUI();

            if ($fixContent) {
                me._createFixTab();
            }

            me.trigger("create");
        },

        _init: function () {
            var me = this,
                $el = me.widget(),
                $navList = me.data("navList"),
                $listWrap = me.data("listWrap"),
                $fixElem = me.data("fixElem"),
                defTab = me.data("defTab"),
                tabNum = me.data("tabNum"),
                tabWidthSumArr = [];

            //为固定tab添加index属性
            if (me.data("fixNum") && $fixElem) {
                $fixElem.each(function (index) {
                    this.index = index + tabNum;
                });
            }

            //为每个固定tab添加index属性并计算所有tab总长度
            $navList.each(function (index) {
                this.index = index;
                if (!index) {
                    tabWidthSumArr[index] = parseInt(this.offsetWidth);
                }else {
                    tabWidthSumArr[index] = tabWidthSumArr[index-1] + parseInt(this.offsetWidth);     //记录tab累加的宽度
                }
            });

            me.data("lastTabIndex", -1);
            me.data("tabWidthSumArr", tabWidthSumArr);
            $listWrap.css("width", tabWidthSumArr[tabNum - 1] + "px");

            //加载iScroll对象
            me._loaded();

            me.data("wrapOffsetWidth", me.data("myScroll").scrollerW - tabWidthSumArr[tabNum - 1]);

            //设置默认选中的tab
            if (me.data("defTab") != undefined) {
                me.data("isDefTab", true);       //modified by zmm 默认选中标识，修改url跳转方式，半个tab跳动距离不对的问题
                me.switchTo(parseInt(defTab));
            }

            //事件绑定
            if ($fixElem) {
                $fixElem.on('tap', function (e) {me._eventHandler(e);});
            }
            $el.on('touchmove', function (e) {me._eventHandler(e)});
            $(window).on('onorientationchange' in window ? 'orientationchange' : 'resize', function (e) {me._eventHandler(e)});

            me.trigger("init");
        },

        /**
         * 创建导航tab的UI
         * @private
         */
        _createNavUI: function () {
            var me = this,
                $el = me.widget(),
                $container = $(me.data("container") || document.body)[0],
                $content = $(me.data("content")),
                instanceId = me.data("instanceId");

            me.data("screenWrap", $content);
            me.data("listWrap", $content.children("ul"));
            me.data("navList", me.data("listWrap").children("li"));
            me.data("tabNum", me.data("navList").length);

            //创建多个实例时样式处理
            //$el.addClass(instanceId || "ui-navigator");
        },

        /**
         * 创建导航栏中固定的tab项
         * @private
         */
        _createFixTab: function () {
            var me = this,
                $fixContent = $(me.data("fixContent"));

            me.data("fixNum", $fixContent.length);
            me.data("fixElem", $fixContent);
        },

        /**
         * @description 切换到某一个tab项
         * @function
         * @name $.ui.navigator.switchTo
         * @param {number} index 导航tab项的索引，从0开始，若存在固定tab项，则固定tab项的索引从所有非固定项tab索引的最后一个加1开始
         * @return {Object} this
         */
        switchTo: function (index) {
            var me = this,
                tabNum = me.data("tabNum"),
                curIndex = parseInt(index),
                $fixElem = me.data("fixElem"),
                $navList = me.data("navList"),
                myScroll = me.data("myScroll"),
                lastIndex = me.data("lastTabIndex"),
                $content = $(me.data("content")).find("a"),
                $fixContent = $(me.data("fixContent")).find("a"),
                href = "", linkEle;
            
            if (curIndex >= tabNum) {     //当前选中的是固定的tab
                linkEle = $($fixElem[curIndex - tabNum]).children("a")[0];
                if (lastIndex == curIndex) {          //modified by zmm 当选中的是同一个tab时，将其href置为javascript:;
                    linkEle.href = "javascript:;";
                    return me;
                }
                $($fixElem[curIndex - tabNum]).addClass("fix-cur");
                href = $fixContent[curIndex - tabNum]["href"];
            }else {        //当前选中的是可滑动的tab
                linkEle = $($navList[curIndex]).children("a")[0];
                if (lastIndex == curIndex) {         //modified by zmm 当选中的是同一个tab时，将其href置为javascript:;
                    linkEle.href = "javascript:;";
                    return me;
                }
                $($navList[curIndex]).addClass("cur");
                href = $content[curIndex]["href"];
                me.data("isSwipe") && myScroll.hScroll && me._swipeNextPre(curIndex, me._screenPos(curIndex));
            }

            if (lastIndex >= tabNum) {   //上次选中的是固定的tab
                $($fixElem[lastIndex - tabNum]).removeClass("fix-cur");
            } else if (lastIndex >= 0) {   //上次选中的是可滑动的tab
                $($navList[lastIndex]).removeClass("cur");
            }

            if (href.indexOf("#") != -1 || lastIndex == -1) {    //modified by zmm，修改默认选中时刷新的bug
                linkEle.href = href;
            } else if (!/javascript/.test(href)) {
                location.href = href;
            }

            me.data("lastTabIndex", curIndex);
            me.trigger("tabselect");    //触发ontabselect事件

            return me;
        },

        /**
         * @description 返回当前选中tab项的信息
         * @function
         * @name $.ui.navigator.getCurTab
         * @return {Object} {index, info} 当前选中tab的信息,index指当前tab的索引，info指当前tab包含的信息
         */
        getCurTab: function () {
            var me = this,
                lastTabIndex = me.data("lastTabIndex"),
                content = me.data("content"),
                fixContent = me.data("fixContent"),
                tabNum = me.data("tabNum"),
                curTab = lastTabIndex >= tabNum ? fixContent[lastTabIndex - tabNum] : content[lastTabIndex];

            return {
                index: lastTabIndex,
                info: {
                    text: curTab["text"],
                    url: curTab["url"]
                }
            }
        },

        /**
         * 切换到某个tab的事件处理
         * @private
         *
         * @param {object} e 事件对象
         */
        _switchEventHandle: function (e) {
            var me = this,
                obj = e.target.tagName == "LI" ? $(e.target)[0] : $(e.target).parents("li").get(0) || $(e.target).parents("div").get(0);

            if (obj && obj.index != undefined) {
                me.switchTo(obj.index);
            }

        },

        /**
         * 加载iScroll对象
         * @private
         */
        _loaded: function () {
            var me = this,
                screenWrap = me.data("screenWrap")[0],
                isSwipe = me.data("isSwipe") ? true : false,
                myScroll = {};

            myScroll = new iScroll (screenWrap, {
                hScroll: isSwipe,
                vScroll: false,
                hScrollbar: false,
                vScrollbar: false,
                onScrollMove: function () {
                    setTimeout($.bind(me._setShadow, me), 1);
                },
                onScrollEnd: function (e) {
                    if (this.absDistY > this.absDistX ) {
                        me.trigger("verticalswipe", e);
                    }
                },
                onTouchEnd: function (e) {
                    if (!this.moved && !this.absDistY && !this.isStopScrollAction) {    //未触发scrollmove并且也没有竖滑操作
                        me._switchEventHandle(e);
                    }
                }
            });

            me.data("myScroll", myScroll);

        },

        /**
         * 设置滚动tab两边出现阴影
         * @private
         */
        _setShadow: function () {
            var me = this,
                $screenWrap = me.data("screenWrap"),
                myScroll = me.data("myScroll"),
                maxOffsetWidth = Math.abs(myScroll.maxScrollX);

            if (myScroll.x < 0) {
                $screenWrap.addClass("ui-navigator-shadowall");
                if (Math.abs(myScroll.x) >= maxOffsetWidth) {
                    $screenWrap.removeClass("ui-navigator-shadowall");
                    $screenWrap.addClass("ui-navigator-shadowleft");
                    $screenWrap.removeClass("ui-navigator-shadowright");
                }
            } else {
                $screenWrap.removeClass("ui-navigator-shadowall");
                
                $screenWrap.removeClass("ui-navigator-shadowleft");
                $screenWrap.addClass("ui-navigator-shadowright");
            }
        },

        /**
         * touchmove事件
         * @private
         *
         * @parm {Object} e 事件对象
         */
        _touchMoveHandle: function (e) {
            e.preventDefault();
        },

        /**
         * 当切换至可显示范围内的最后一个tab时，自动将该tab置为倒数第二个；当切换至可显示范围内的第一个tab时，自动将该tab置为第二个
         * 注：若出现半个tab，则半个tab及其前一个或者后一个tab也算第一个或最后一个tab
         * @private
         *
         * @parm {Object} elem 原生dom节点
         * @parm {String/Number} 当前dom节点的位置
         */
        _swipeNextPre: function (index, pos) {
            var me = this,
                thisMoveX = 0,
                tabNum = me.data("tabNum"),
                $navList = me.data("navList"),
                myScroll = me.data("myScroll"),
                isDefTab = me.data("isDefTab"),
                scrollX = myScroll.x || 0;
            
            switch (pos) {
                case "defTab":
                    thisMoveX = me.data("defTabMoveX") || 0;               //modified by zmm 默认选中tab跳动的距离
                    myScroll.scrollTo(thisMoveX, 0, 400);
                    if (isDefTab) {
                        me.data("isDefTab", false);
                        me.data("defTabMoved", true);
                    }
                    break;
                case 0 :         //点击列表第一个tab项
                    thisMoveX = 0;
                    myScroll.scrollTo(thisMoveX, 0, 400);
                    if (isDefTab) {
                        me.data("isDefTab", false);
                        me.data("defTabMoved", true);
                    }
                    break;
                case (tabNum - 1) :       //点击列表最后一个tab项
                    thisMoveX = myScroll.wrapperW - myScroll.scrollerW;
                    myScroll.scrollTo(thisMoveX, 0, 400);
                    if (isDefTab) {
                        me.data("isDefTab", false);
                        me.data("defTabMoved", true);
                    }
                    break;
                case "first" :      //可视区域第一个tab
                    if (index == 1 && !scrollX) {    //还未滚动，并且点击的是第二个tab
                        return;
                    }
                    thisMoveX = scrollX + parseInt($navList[index - 1].offsetWidth);
                    myScroll.scrollTo(thisMoveX, 0, 400);
                    break;
                case "last" :       //可视区域最后一个tab
                    if (index == tabNum - 2 && Math.abs(scrollX) == Math.abs(myScroll.maxScrollX)) {//列表已滚动到头，并且点击的是倒数第二个tab
                        return;
                    }
                    thisMoveX = scrollX - parseInt($navList[index - 1].offsetWidth);
                    myScroll.scrollTo(thisMoveX, 0, 400);
                    break;
                case "middle" :    //点周中间的tab
                    break;
            }

            me.data("isDefTab", false);
            setTimeout($.bind(me._setShadow, me), 1);
        },

        /**
         * 定位当前tab在屏幕中的位置，第一个，最后一个或者中间
         * @private
         *
         * @parm {Object} elem 原生dom节点
         */
        _screenPos: function (index) {
            var me = this,
                lastIndex = me.data("tabNum") - 1;

            if (!index || index == lastIndex) {      //若是列表中的第一个或者最后一个，直接返回其索引
                return index;
            }

            var $navList = me.data("navList"),
                tabWidthSumArr = me.data("tabWidthSumArr"),
                lastAbsMoveXDis = Math.abs(me.data("myScroll").x) || 0,
                wrapOffset = $navList[0].offsetLeft - me.data("screenWrap")[0].offsetLeft,    //第一个tab相对于wrap的偏移
                thisOffsetDis = tabWidthSumArr[index] + wrapOffset - lastAbsMoveXDis,
                preOffsetDis = tabWidthSumArr[index - 1] + wrapOffset - lastAbsMoveXDis,
                nextOffsetDis = tabWidthSumArr[index + 1] + wrapOffset - lastAbsMoveXDis,
                screenWidth = me.data("myScroll").wrapperW,
                thisWidth = parseInt($navList[index].offsetWidth),
                preWidth = parseInt($navList[index - 1].offsetWidth),
                screenPos = "middle";

            if (me.data("isDefTab")) {              //modified by zmm 默认选中的tab单独处理
                screenPos = "defTab";
                me.data("defTabMoveX", screenWidth - thisOffsetDis);
                return screenPos;
            }

            if (preOffsetDis < preWidth && nextOffsetDis > screenWidth) {     //当前tab的前一个tab出现半个同时其后一个tab也出现半个时
                screenPos = "middle";
            }else if (thisOffsetDis <= thisWidth || preOffsetDis < preWidth) {    //当前tab为半个或者其前面的tab是半个，则视为可显示区的第一个
                screenPos = "first";
            }else if (thisOffsetDis >= screenWidth || nextOffsetDis > screenWidth) {    //当前tab为半个tab或者其下一个tab为半个，则视为可显示区的最后一个
                screenPos = "last";
            }else {
                screenPos = "middle";
            }

            return screenPos;
                
        },

        /**
         * 转屏处理事件，主要针不滑动的导航栏
         * @private
         */
        _orientationEvent: function () {
            var me = this,
                myScroll = me.data("myScroll"),
                androidV = parseFloat($.os.version),
                wrapOffsetWidth = me.data("wrapOffsetWidth"),   //相对于所有tab宽度的差值
                defTab = me.data("defTab"),
                $navList = me.data("navList"),
                wrapOffset = $navList[0].offsetLeft - me.data("screenWrap")[0].offsetLeft,
                delayTime = 0;

            if ($.os.android) {
                delayTime = androidV >= 4 ? 800 : 200
            }else if ($.os.ios) {
                delayTime = 0;
            }else {
                delayTime = 800;
            }

            setTimeout(function () {
                if (delayTime == 800) {
                    myScroll.refresh();
               }

                if (!me.data("isSwipe")) {
                    me.data("listWrap").css("width", myScroll.wrapperW - wrapOffsetWidth + "px");
                }

                if (!me.data("isDefTab") && me.data("defTabMoved")) {
                    myScroll.scrollTo(myScroll.wrapperW - me.data("tabWidthSumArr")[defTab] - wrapOffset, 0, 400);
                    me.data("defTabMoved", false);
                }
                
            }, delayTime);   //重新设置
        },

        /**
         * 事件处理中心
         * @private
         *
         * @param {object} e 事件对象
         */
        _eventHandler: function(e) {
            var me = this;

            switch (e.type) {
                case 'tap':
                    me._switchEventHandle(e);
                    break;
                case 'touchmove':
                    me._touchMoveHandle(e);
                    break;
                case 'orientationchange':
                    me._orientationEvent(e);
                    break;
                case 'resize':
                    me._orientationEvent(e);
                    break;
            }
        }
    }).attach('control.fix');
    
})(Zepto);


