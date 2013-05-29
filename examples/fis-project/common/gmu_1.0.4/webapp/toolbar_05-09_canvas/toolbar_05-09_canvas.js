



/**
 * $.ui.toolbar
 * lilide@baidu.com
 */

(function($) {
    /**
     * toolbar组件
     * @mode render模式
     * @param    {selector|zepto}       el                        根元素选择器或者对象
     * @param    {Object}               options                   参数
     * @config   {selector|zepto}       options.container         (必选)渲染到哪个元素 || document.body
     * @config   {String}               options.instanceId        (必选)实例标示
     * @config   {String}               options.titleText         (可选)标题文字
     * @config   {String}               options.buttonText        (可选)返回按钮文字
     * @config   {function}             options.buttonClick       (可选)返回按钮的点击事件
     * @config   {Number}               options.iconMax           (可选)最大icon数目
     * @config   {Number}               options.showMore          (可选)显示类型；1,下拉菜单方式，2，二级工具条
     * @config   {Array}                options.tools             (可选)工具的数组,每个是一个工具
     * @config   {String}               options.tools[x].class    (可选)工具的class（css）名称
     * @config   {function}             options.tools[x].click    (可选)工具的点击事件
     * @config   {Event}                options.onverticalswipe   (可选)组件上竖直方向滑动时触发
     */
    $.ui.create('toolbar', {
        _data: {
            titleText: '',
            buttonText: '返回',
            buttonClick:function() {
                history.back(1)
            },
            buttonCorner:{
                borderColor:"rgb(164, 164, 164)",
                backgroundColor:{from:'#FEFEFE',to:'#ECECEC'}
            },
            iconMax:4,
            showMore:2,
            isShow:true,
            onverticalswipe:function(e) {
            }
        },

        _create: function() {
            var me = this,
                //$elem = me.widget($(el||'<div class="toolbar"></div>')),
                    $elem = me.widget(),
                    rtl = $(me.data('container') || document.body),
                    html = '',
                    toolsA = me.data('tools') || [],
                    maxLength = me.data('iconMax') || 2;
            tmpA = [];
            if ($elem) {
                if (me.data('instanceId')) {
                    $elem.addClass(me.data('instanceId'));
                }
                html += '<div class="ui-toolbar">';//开toolbar
                html += me._createButton();
                html += me._createTitle();
                if (me.data('showMore') == 2) {
                    html += '</div>';//关闭toolbar
                    html += me._createSubTools();
                } else {
                    for (var i = 0; i < toolsA.length; i++) {
                        if (i >= me.data('iconMax')) {
                            tmpA.push(toolsA[i]);
                            if (i == (toolsA.length - 1)) {
                                html += '<div class="ui-toolbar-btn ui-toolbar-more"></div>';
                            }
                        } else {
                            html += '<div data-index="' + i + '" class="ui-toolbar-btn ' + (toolsA[i].classN || '') + '"></div>';
                        }
                        if (tmpA.length) {
                            me.data('moreTools', tmpA)
                        }
                    }
                    html += '</div>';//关闭toolbar
                }
                $elem.html(html);
                if (!$elem.parent().length) $elem.appendTo(rtl);
            } else {}
            if (!me.data('isShow')) {
                $elem.hide();
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
            html += '<div class="ui-toolbar-backbtn">';
            html += '<canvas id="ui-toolbar-leftcorner"></canvas>';
            html += '<span class="ui-toolbar-content">';
            html += me.data('buttonText');
            html += '</span>';
            html += '</div>';
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
            html += '<div class="ui-toolbar-title">';
            if (me.data('titleText')) {
                html += me.data('titleText');
            }
            html += '</div>';
            return html;
        },
        /**
         * 创建subtoolbar的html
         * @private
         */
        _createSubTools:function() {
            var me = this,
                    html = '',
                    toolsA = me.data('tools') || []
            html += '<div class="ui-sub-toolbar">';//开sub-toolbar
            for (var i = 0; i < toolsA.length; i++) {
                //需要扩展，考虑工具多得情况
                html += '<div data-index="' + i + '" class="ui-toolbar-btn ' + (toolsA[i].classN || '') + '"></div>';
            }
            html += '</div>';//关闭sub-toolbar
            return html;
        },
        /**
         * 转换格式，以符合dropmenu使用
         * @private
         */
        _changeFormatForDropMenu:function() {
            var me = this,
                    tmpA = me.data('moreTools'),
                    result = [
                        {text:'<div data-index="more" class="more"></div>'}
                    ];
            if (!tmpA || !tmpA.length) {
                return [];
            }
            ;
            for (var i = 0; i < tmpA.length; i++) {
                var tmpSingle = {
                    text:'<div class="ui-toolbar-btn ' + (tmpA[i].classN || '') + '"></div>',
                    callback:tmpA[i].click
                };
                result.push(tmpSingle);
            }
            return result;
        },
        _init: function() {
            var me = this,
                    toolsA = me.data('tools') || [],
                    $elem = me.widget();
            $('.ui-toolbar-backcon', $elem).on('click', me.data('buttonClick'));
            $(".ui-toolbar-btn", $elem).each(function(index) {
                var tIndex = $(this).attr('data-index');
                var tData = toolsA[tIndex];
                if (tData) {
                    $(this).on('click', tData.click)
                }
            });
            
            $elem.on("touchstart touchmove touchend", function (e) {
                me._eventHandler(e)
            });
            $(document).on("click", function(e) {
                var bubblesList = e['bubblesList'];
                me[!bubblesList || bubblesList.indexOf(me) > -1 ? 'show' : 'hide']();
            });
            me.trigger('init');
        },
        /**
         * 显示toolbar
         * @private
         */
        _eventHandler:function(e) {
            var me = this,
                    elem = me.widget();
            var touch = e.targetTouches[0];
            switch (e.type) {
                case 'touchstart':
                    me.data("touchStartX", touch.pageX || 0);
                    me.data("touchStartY", touch.pageY || 0);
                    break;
                case 'touchmove':
                    var touchMoveXL = touch.pageX - me.data("touchStartX");
                    var touchMoveYL = touch.pageY - me.data("touchStartY");
                    me.data("touchMoveXL", touchMoveXL);  //记录此次移动的距离
                    me.data("touchMoveYL", touchMoveYL);
                    break;
                case 'touchend':
                    if (Math.abs(me.data("touchMoveXL")) < Math.abs(me.data("touchMoveYL"))) {
                        me.trigger("verticalswipe", e);
                    }
                    break;
            }
        },
        /**
         * 画出返回button的corner
         * @private
         */
        _drawReturnLeftCorner:function(){
            var me = this;
            var canvasOpt = {
                height:32,
                width:16,
                lineWidth:2
            };
            var userOpt = me.data('buttonCorner');
            $('#ui-toolbar-leftcorner').attr({
                'height':canvasOpt.height+'px',
                'width':canvasOpt.width+canvasOpt.lineWidth+'px',
                'style':'position:absolute;top:-1px;left:-15px;z-index:-1;'
            });
            var canvas = document.getElementById('ui-toolbar-leftcorner');
            var ctx = canvas.getContext('2d');
            ctx.beginPath();
            ctx.strokeStyle = userOpt.borderColor;
            ctx.lineWidth = canvasOpt.lineWidth;
            ctx.moveTo(canvasOpt.width,0);
            ctx.lineTo(0+canvasOpt.lineWidth,canvasOpt.height/2);
            ctx.lineTo(canvasOpt.width,canvasOpt.height);
            ctx.lineJoin = "round";
            ctx.stroke();
            ctx.closePath();

            var lingrad = ctx.createLinearGradient(0,0,0,canvasOpt.height);
            lingrad.addColorStop(0, userOpt.backgroundColor.from);
            lingrad.addColorStop(1, userOpt.backgroundColor.to);

            ctx.fillStyle = lingrad;
            ctx.fill();
        },
        /**
         * 显示toolbar
         */
        show: function() {
            var me = this,
                    $elem = me.widget();
            if(!me.isDraw){
                me.isDraw = true;
                me._drawReturnLeftCorner();
            }
            if (!me.data('isShow')) {
                me.trigger('beforeshow');
                me.data('isShow', true);
                $elem.show();
                me.trigger('aftershow');
            }
            return me;
        },

        /**
         * 隐藏more面板
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
         * 获取/设置返回按钮的文字
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
         * 获取/设置标题的文字
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
        }

    }).attach('control.fix');
    //注册子组件
    $.ui.register('toolbar',function(){
        var me = this;
            var result = me._changeFormatForDropMenu();
            if (result.length) {
                me.data('dropmenu',$.ui.dropmenu(
                        '<div class="ui-dropmenu"></div>',
                {
                    container:$('.ui-toolbar-more',me.widget()),
                    hasArrow:false,
                    content:result,
                    offset:0
                }));
            }
    });
})(Zepto);


