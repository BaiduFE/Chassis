



/**
 * @fileOverview toolbar
 * @description  工具栏组件
 */

(function($) {
    /**
     * @description    工具栏组件
     * @class
     * @name     $.ui.toolbar
     * @grammar  $.ui.toolbar(el[,options])
     * @mode render模式
     * @param    {selector|zepto}       el                           根元素选择器或者对象
     * @param    {Object}               options                      参数
     * @param   {selector|zepto}       options.container            (必选)渲染到哪个元素 || document.body
     * @param   {String}               options.instanceId           (必选)实例标示
     * @param   {String}               options.titleText            (可选)标题文字
     * @param   {String}               options.buttonText           (可选)返回按钮文字
     * @param   {function}             options.buttonClick          (可选)返回按钮的点击事件
     * @param   {Number}               options.showType             (可选)显示类型；1,下拉菜单方式，2，二级工具条
     * @param   {Array}                options.tools                (可选)工具的数组,每个是一个工具
     * @param   {String}               options.tools[x].class       (可选)工具的class（css）名称
     * @param   {function}             options.tools[x].click       (可选)工具的点击事件
     * @param   {Event}                options.onverticalswipedown  (可选)组件上向下滑动时触发
     * @param   {Event}                options.onverticalswipeup    (可选)组件上向上滑动时触发
     * @param   {Boolean}              options.isPreventDefault     (可选)是否取消move事件的默认行为
     */
    $.ui.create('toolbar', {
        _data: {
            titleText: '',
            buttonText: '返回',
            buttonClick:function() {
                setTimeout(function(){history.back(1)},200);
            },
            showType:2,
            isShow:false,
            onverticalswipeup:function(e) {},
            onverticalswipedown:function(e){},
            isPreventDefault:true
        },

        _create: function() {
            var me = this,
                    rtl = $(me.data('container') || document.body),
                    html = '',
                    $elem = me.widget(),
                    toolsA = me.data('tools') || [],
                    maxLength = me.data('iconMax') || 2,
                    render = $(me.data('renderId')).parent().length>0?true:false;

            me.data('toolsA',toolsA);
            //如果没有第一个参数,自动创建

            $elem = $elem || me.widget($('<div class="ui-toolbar-container"></div>'));

            if(render){
                $elem = me.widget($(me.data('renderId')));
            }
            if (!me.data('isShow')) {
                $elem.hide();
            }

            tmpA = [];
            if ($elem&&!render) {
                if (me.data('instanceId')) {
                    $elem.addClass(me.data('instanceId'));
                }
                html += '<div class="ui-toolbar">';//开toolbar
                html += me._createButton();
                html += me._createTitle();
                if (me.data('showType') == 2) {
                    html += '<div class="ui-toolbar-toolscon"> </div>';//需要占位
                    html += '</div>';//关闭toolbar
                    html += me._createSubTools();
                } else {
                    html += '<div class="ui-toolbar-toolscon">';
                    for (var i = 0; i < toolsA.length; i++) {
                        html += '<div data-index="' + i + '" class="ui-toolbar-btn ' + (toolsA[i].classN || '') + '">'+(toolsA[i].text||'')+'</div>';
                    }
                    html += '</div>';//关闭toolbar
                    html += '</div>';//关闭toolbar
                }
                $elem.html(html);
                if($elem.parent().length && !me.data('container')){
                    //如果$elem有parent，且没有传入container，不需要appendTo
                }else{
                    if (!$elem.parent().length) $elem.appendTo(rtl);
                }
            } else {
                //获取dom内容
                var buttonText = $('.ui-toolbar-backbtn .ui-toolbar-content', $elem).text();
                me.data('buttonText',buttonText);
                var titleText =  $('.ui-toolbar-title', $elem).text();
                me.data('titleText',titleText);
                var subMenu = ($('.ui-sub-toolbar', $elem).parent().length>0);
                me.data('showType',subMenu==true?2:1);
            }
            me.trigger('create');
        },
        /**
         * 创建返回按钮的html
         * @private
         */
        _createButton:function() {
            var me = this;
            var html = '';
            html += '<div class="ui-toolbar-backcon">';
            html += '<a class="ui-toolbar-backbtn">';
            html += '<span class="ui-toolbar-content">';
            html += me.data('buttonText');
            html += '</span>';
            html += '</a>';
            html += '</div>';
            return html;
        },
        /**
         * 创建标题的html
         * @private
         */
        _createTitle:function() {
            var me = this,
                    html = '';

            if (me.data('titleText')) {
                html += '<span class="ui-toolbar-title">';
                html += me.data('titleText');
                html += '</span>';
            }

            return html;
        },
        /**
         * 创建subtoolbar的html
         * @private
         */
        _createSubTools:function() {
            var me = this,
                    html = '',
                    toolsA = me.data('toolsA');
            html += '<div class="ui-sub-toolbar"><div class="ui-toolbar-toolscon">';//开sub-toolbar
            for (var i = 0; i < toolsA.length; i++) {
                html += '<div data-index="' + i + '" class="ui-toolbar-btn ' + (toolsA[i].classN || '') + '">'+(toolsA[i].text||'')+'</div>';
            }
            html += '</div></div>';//关闭sub-toolbar
            return html;
        },
        _init: function() {
            var me = this,
                    toolsA = me.data('toolsA'),
                    $elem = me.widget();
            
            $('.ui-toolbar-backcon', $elem).on('touchend', me.data('buttonClick'));
            $(".ui-toolbar-btn", $elem).each(function(index) {
                var tIndex = $(this).attr('data-index');
                var tData = toolsA[tIndex];
                if (tData && tData.click) {
                    $(this).on('touchstart', function(e) {
                        var i = $(this).index();
                        tData.click(i, $(this), me);
                    });
                }
            });

            $elem.on("touchstart touchmove touchend", function(e) {
                me._eventHandler(e)
            }, false);
            
            $(window).on('resize', function() {
                me._makeWidthEx()
            });

            me.on('destroy', function() {
                $(window).off();
            }).trigger('init');
        },
        /**
         * 针对android4的转屏处理
         * @private
         */
        _makeWidthEx:function(){
            var me = this,
                    $elem = me.widget(),
                    os = $.os;
            if(os.android && parseInt(os.version)>=4){
                $elem.hide().css('visibility','hidden').show().css('visibility','visible');
            }
        },
        /**
         * 显示toolbar
         * @private
         */
        _eventHandler:function(e) {
            var me = this,
                    elem = me.widget();
                    os = $.os;
             /*|| e.changeTouches[0]*/

            switch (e.type) {
                case 'touchstart':
                    var touch = e.targetTouches[0];
                    me.data("touchStartX", touch.pageX || 0);
                    me.data("touchStartY", touch.pageY || 0);
                    me.data('isVerticalUpTrigger',false);
                    me.data('isVerticalDownTrigger',false);
                    break;
                case 'touchmove':
                    var touch = e.targetTouches[0];
                    if(me.data('isPreventDefault')){e.preventDefault()};
                    var touchMoveXL = touch.pageX - me.data("touchStartX");
                    var touchMoveYL = touch.pageY - me.data("touchStartY");
                    me.data("touchMoveXL", touchMoveXL);  //记录此次移动的距离
                    me.data("touchMoveYL", touchMoveYL);
                    /*android 4.0,touchend 事件未被触发,touchmove中做处理;
                    toolbar太矮，所以一下代码不需要再判断是否android4*/
                    /*if(os.android && parseInt(os.version)>=4){*/
                        if (Math.abs(me.data("touchMoveYL"))<10 ){break;}
                        if (Math.abs(me.data("touchMoveXL")) < Math.abs(me.data("touchMoveYL"))) {
                            if(me.data("touchMoveYL")>0 && !me.data('isVerticalDownTrigger')){
                                me.data('isVerticalDownTrigger',true);
                                me.trigger("verticalswipedown", e);
                            }else if(me.data("touchMoveYL")<0 && !me.data('isVerticalUpTrigger')){
                                me.data('isVerticalUpTrigger',true);
                                me.trigger("verticalswipeup", e);
                            }
                            me.data("touchStartX", 0);
                            me.data("touchStartY", 0);
                            me.data("touchMoveXL", 0);  //清除此次移动的距离
                            me.data("touchMoveYL", 0);
                        }
                    /*}*/
                    break;
                case 'touchend':
                    /*android 4.0,touchend 事件未被触发*/
                    if(Math.abs(me.data("touchMoveYL"))<1){break;}
                    if (Math.abs(me.data("touchMoveXL")) < Math.abs(me.data("touchMoveYL"))) {
                         if(me.data("touchMoveYL")>0 && !me.data('isVerticalDownTrigger')){
                            me.data('isVerticalDownTrigger',true);
                            me.trigger("verticalswipedown", e);
                         }else if(me.data("touchMoveYL")<0 && !me.data('isVerticalUpTrigger')){
                            me.data('isVerticalUpTrigger',true);
                            me.trigger("verticalswipeup", e);
                         }
                        me.data("touchStartX", 0);
                        me.data("touchStartY", 0);
                        me.data("touchMoveXL", 0);  //清除此次移动的距离
                        me.data("touchMoveYL", 0);
                    }
                    break;
            }
        },

        /**
         * @description 显示toolbar
         * @function
         * @name $.ui.toolbar.show
         * @return {Object} this
         */
        show: function() {
            var me = this,
                    $elem = me.widget();
            if (!me.data('isShow')) {
                me.trigger('beforeshow');
                me.data('isShow', true);
                $elem.show();
                me.trigger('aftershow');
            }
            return me;
        },

        /**
         * @description 隐藏toolbar面板
         * @function
         * @name $.ui.toolbar.hide
         * @return {Object} this
         */
        hide: function() {
            var me = this,
                    $elem = me.widget();

            if (me.data('isShow')) {
                me.data('isShow', false);
                me.trigger('beforehide');
                $elem.hide();
                me.trigger('afterhide');
            }
            return me;
        },

        /**
         * @description 隐藏/显示toolbar面板
         * @function
         * @name $.ui.toolbar.toggle
         * @return {Object} this
         */
        toggle:function(){
            var me = this,
                $elem = me.widget();
            if (me.data('isShow')) {
                me.hide();
            }else{
                me.show();
            }
            return me;
        },

        /**
         * @description 获取/设置返回按钮的文字
         * @function
         * @name $.ui.toolbar.buttonText
         * @return {Object/String} this/buttonText
         */
        buttonText: function() {
            var me = this,
                    $elem = me.widget();
            if (arguments[0] != undefined) {
                me.data('buttonText', arguments[0]);
                $('.ui-toolbar-backbtn .ui-toolbar-content', $elem).text(arguments[0]);
                return me;
            } else {
                return me.data('buttonText');
            }
        },

        /**
         * @description 获取/设置标题的文字
         * @function
         * @name $.ui.toolbar.titleText
         * @return {Object/String} this/titleText
         */
        titleText: function() {
            var me = this,
                    $elem = me.widget();
            if (arguments[0] != undefined) {
                me.data('titleText', arguments[0]);
                $('.ui-toolbar-title', $elem).text(arguments[0]);
                return me;
            } else {
                return me.data('titleText');
            }
        },
        /**
         * @description 销毁组件
         * @function
         * @name $.ui.toolbar.destory
         */
        destroy: function () {
            var me = this;

            me.widget().off();

            me._super();
        }

    }).attach('control.fix');
})(Zepto);


