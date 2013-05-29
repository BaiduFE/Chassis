require('gmu:uibase');
require('gmu:base');
require('gmu:uibase/widget');
require('gmu:uibase/control');
/**
 * $.ui.suggestion
 * @fileOverview  搜索建议列表组件
 */

(function($, undefined){
    /**
     * @class
     * @name        $.ui.suggestion
     * @param       {Object}     		options             		参数
     * @param       {Selector}     		options.container           (必选)父容器
     * @param       {String}     		options.source       		(必选)请求数据的url
     * @param       {String}     		options.param       		(可选)附加参数
     * @param       {Selector}     		options.appendTo       		(可选)将sug添加到某个容器中
     * @param       {Boolean}     		options.posAdapt       		(可选)是否自动调整位置
     * @param       {Number}     		options.listCount    		(可选)展现sug的条数: 5
     * @param       {Boolean}    		options.isCache      		(可选)是否缓存每一个输入的query: true
     * @param       {Boolean}   		options.isStorage    		(可选)是否本地存储pick的条目: true
     * @param       {Number}   			options.width        		(可选)设置Suggestion框的宽度
     * @param       {Number}     		options.minChars     		(可选)最少输入字符数: 0
     * @param       {Number}     		options.maxChars     		(可选)最多输入字符数: 1000
     * @param       {Object}     		options.offset       		(可选)偏移量{x:0, y:0}
     * @param       {Function}          options.renderList          (可选)自定义渲染下拉列表
     * @param       {Function}          options.renderEvent         (可选)绑定用户事件
     * @param       {Function}          options.sendRequest         (可选)用户自定义发送请求方式
     * @param       {Event}             options.onselect            (可选)选中一条sug的时候触发
     * @param       {Event}             options.onshow              (可选)sug显示时触发
     * @param       {Event}             options.onclose             (可选)sug关闭时触发
     */
	$.ui.create('suggestion', {
		_data: {
			listCount: 10,
			isCache: true,
			isStorage: true,
			minChars: 0,
			maxChars: 1000,
			offset: {x: 0, y: 0}
		},

		_create: function() {
			var me = this,
				expando = +new Date(),
				maskID = 'ui-input-mask-' + expando,
				sugID = me.data('id', "ui-suggestion-" + $.guid()),
				$input = me.data('input', $(me.data('container'))).attr("autocomplete", "off"),
				$maskElem = $input.parent(),
				appendTo = me.data('appendTo');		

			me.data({
				inputWidth: $input.get(0).offsetWidth,
				cacheData: {}
			});

			if ($maskElem.attr('class') != 'ui-input-mask') $maskElem = $('<div id="' + maskID + '" class="ui-input-mask"></div>').appendTo($input.parent()).append($input);
			me.widget($('<div id="' + sugID + '" class="ui-suggestion"><div class="ui-suggestion-content"><div class="ui-suggestion-scroller"></div></div><div class="ui-suggestion-button"></div></div>').appendTo(appendTo ? $(appendTo) : $maskElem));
			me._initSuggestionOffset()._setPos().trigger('create');
		},

		_init: function() {
			var me = this,
				$elem = me.widget(),
				$input = me.data('input'),
				eventHandler = $.bind(me._eventHandler, me);

			$elem.on('touchstart', eventHandler);
			$input.on('focus input', eventHandler).parent().on('touchstart', eventHandler)
			$(window).on('onorientationchange' in window ? 'orientationchange' : 'resize', eventHandler);
			me.on('destroy', function() {
				$elem.off('touchstart', eventHandler);
				$input.off('focus input', eventHandler).parent().off('touchstart', eventHandler);
				$(window).off('onorientationchange' in window ? 'orientationchange' : 'resize', eventHandler);
			}).trigger('init');
		},

		/** 
		 * 初始化属性
		 * @private
		 */
		_initSuggestionOffset: function() {
			var me = this, width, additionWidth,
			    $elem = me.widget(),
				$input = me.data('input'),
				customOffset = me.data('offset'),
				border = 2 * parseInt($elem.css("border-left-width") || 0);
				
			me.data('pos', $input.height() + (customOffset.y || 0));
			me.data('realWidth', (me.data('width') || $input.width()) - border);
			$elem.css({
				position: 'absolute',
				left: customOffset.x || 0
			});
			return me;
		},

		/** 
		 * 设置size
		 * @private
		 */
		_setSize: function() {
			var me = this,
				width = me.data('realWidth'),
				additionWidth = me.data('input').parent().width() - me.data('inputWidth');

			me.widget().css('width', width + additionWidth);
			return me;
		},

		/**
		 * 适配位置
		 * @private
		 */
		_posAdapt: function(dps) {
			var me = this;

			dps ? me._setPos().data('timeId', $.later(function() {
				me._setPos();
			}, 200, true)) : clearInterval(me.data('timeId'));
			return me;
		},

		/**
		 * 设置位置
		 * @private
		 */
		_setPos: function() {
			var me = this,
				appendTo = me.data('appendTo'),
				$elem = me.widget(),
				$input = me.data('input'),
				height = parseFloat($elem.height()),
				customOffset = me.data('offset'),
				pos = parseFloat(me.data('pos')),
				uVal = $input.offset(true).top,
				dVal = $(window).height() - $input.offset(true).bottom;

			if (dVal < height && uVal > height) $elem.css('top', '-' + height - customOffset.y || 0 + 'px');
			else $elem.css('top', pos);
			appendTo && $elem.css('top', '0px');
			return me;
		},

	
		/** 
		 * input输入处理
		 * @private
		 */
		_change: function(query) {
			var me = this,
				data = me._cacheData(query),
				isCache = me.data('isCache'),
				source = me.data('source');

			return data && isCache ? me._render(query, data) : me._sendRequest(query);
		},

		/** 
		 * 事件管理器
		 * @private
		 */
		_eventHandler: function(e) {
			var me = this,
				type = e.type,
				target = e.target;

			switch (type) {
				case 'focus':
					me._setSize()._showList().trigger('open');
					break;
				case 'touchstart':
				case 'mousedown':
					if (!e.formDelete) break;
					e.preventDefault();
				case 'input':
					me._showList();
					break;
				case 'orientationchange':
				case 'resize':
					$.later(function() {
						me._setSize().trigger('resize');
					}, 400);
					break;
			}
		},

		/** 
		 * 显示下拉浮层
		 * @private
		 */
		_showList: function() {
			var me = this,
				query = me._getValue(),
				data = me._localStorage();

			if (query.length < parseFloat(me.data('minChars')) || query.length > parseFloat(me.data('maxChars'))) {
				return me.hide();
			}

			return query ? me._change(query) : data ? me._render(null, {s: data.split(",")}) : me.hide();
		},
		
        /** 
         * 绑定下拉浮层中的事件
         * @private
         */
		_bindSuggestionListEvent: function() {
			var me = this;

			me.widget().find(".ui-suggestion-scroller li").each(function(index, item) {
				$(item).on("click", function(e) {
					e.originalEvent && e.originalEvent.preventDefault();
					me._select(this);
				});
			});

			return me;
		},

        /** 
         * 绑定关闭按钮事件
         * @private
         */
		_bindCloseEvent: function() {
			var me = this;

			$(".ui-suggestion-button span:first-child").on("click", function(e) {
				me.clearHistory();
			});

			$(".ui-suggestion-button span:last-child").on("click", function(e) {
				me.hide().leaveInput().trigger('close');
			});

			return me;
		},	

		/** 
		 * 发送异步请求
		 * @private
		 */
		_sendRequest: function(query) {
			var me = this,
				url = me.data('source'),
				param = me.data('param'),
				cb = "suggestion_" + (+new Date()),
				sendRequest = me.data('sendRequest');

			if ($.isFunction(sendRequest)) {
				sendRequest(query, function(data) {
					me._render(query, data)._cacheData(query, data);
				});

			} else if (query) {
				url += (url.indexOf("?") === -1 ? "?" : "") + "&wd=" + encodeURIComponent(query);
				url.indexOf("&cb=") === -1 && (url += "&cb=" + cb);
				param && (url += '&' + param);

				window[cb] = function(data) {
					me._render(query, data)._cacheData(query, data);
					$('[src="' + url + '"]').remove();
					delete window[cb];
				};

				$.ajaxJSONP({url: url, dataType: "json"});
			}
			return me;
		},
        
		/** 
		 * 获取input值
		 * @private
		 */
        _getValue: function() {
            return $.trim(this.data('input').val());
        },

		/** 
		 * 渲染下拉浮层
		 * @private
		 */
        _render: function(query, data) {
            var me = this, html,
            	$elem = me.widget(),
            	$content = $elem.find('.ui-suggestion-content'),
            	$button = $elem.find('.ui-suggestion-button'),
            	renderList = me.data('renderList'),
            	renderEvent = me.data('renderEvent'),
                clearBox = '<span style="display:none;"></span><span>关闭</span>';

            query === null && (clearBox = '<span>清除历史记录</span><span>关闭</span>');     
	    	html = renderList ? renderList.apply(me, [query, data]) : me._renderList(query, data);

	    	if(html){
		        $content.find('.ui-suggestion-scroller').html(html);  
	            $button.html(clearBox);
	    		renderEvent ? renderEvent.apply(me) : me._bindSuggestionListEvent();
	            me._bindCloseEvent()._show();
			} else me.hide();

            return me;
        }, 

		/** 
		 * 创建Suggestion list HTML内容
		 * @private
		 */
		_buildHTML: function(list) {
			var me = this,
				html = "";

			html = list.join('</div></li><li><div class="ui-suggestion-result">');
			return html = '<ul><li><div class="ui-suggestion-result">' + html + '</div></li></ul>';
		},       

		/** 
		 * 渲染list HTML片段
		 * @private
		 */
        _renderList: function(query, data) {
            var me = this,
            	$elem = me.widget(),
                listCount = me.data('listCount'),
                items = [], html = "",
                sugs = data.s;

            if (!data || !sugs || !sugs.length) {
            	me.hide();
            	return;
            }

            sugs = sugs.slice(0, listCount);
            $.each(sugs, function(index, item) {
                $.trim(item) && items.push(query != '' ? item.replace(query, "<span>" + query + "</span>") : item);
            });

            return me._buildHTML(items);
        },  

        /** 
         * 选择搜索提示
         * @private
         */
		_select: function(target) {
			var me = this,
				isStorage = me.data('isStorage'),
				targetContent = target.textContent;

			me.data('input').val(targetContent);
			isStorage && me._localStorage(targetContent);
			return me.trigger("select", target).hide();
		},		

        /** 
         * 缓存搜索提示
         * @private
         */
		_cacheData: function(key, value) {
			var me = this;
			return value !== undefined ? me.data('cacheData')[key] = value : me.data('cacheData')[key];
		},	

        /** 
         * 操作历史记录
         * @private
         */
		_localStorage: function(value) {
			var id = this.data('id'),
				ret;

			try {
				if (value === null) window.localStorage[id] = "";
				else if (value !== undefined) {
					var localdata = window.localStorage[id],
						data = localdata ? localdata.split(",") : [];

					if ($.inArray(value, data) != -1) return;
					data.unshift(value);
					window.localStorage[id] = data.join(",");
				}
				ret = window.localStorage[id];
			} catch (e) {}

            return ret;
		},

		/** 
		 * 显示suggestion
		 * @private
		 */
		_show: function() {
			var me = this;
			me.widget().css("display", "block");
			me.data('posAdapt') && !me.data('appendTo') && me._posAdapt(1);
			return me.trigger('show');
		},	

		/** 
		 * 隐藏suggestion
		 * @function
		 * @name  $.ui.suggestion.hide
		 */
		hide: function() {
			var me = this;
			$.later(function(){
                me.widget().css("display", "none").trigger('hide');
            }, 20);
			return me._posAdapt(0);
		},	

		/** 
		 * 清除历史记录
		 * @function@function
		 * @name  $.ui.suggestion.clearHistory
		 */
		clearHistory: function() {
			var me = this;
			if (window.confirm('清除全部查询历史记录？')) {
				me._localStorage(null);
				me.hide();
			}
		},

        /**
         * 设置|获取历史记录
         * @function
         * @name     $.ui.suggestion.histroy
         * @param    {String}   query   搜索条件
         * @returns  {String}   历史记录字符串
         */
        history: function(query) {
            return this._localStorage(query);
        },

        /**
         * input获得焦点
         * @function
         * @name   $.ui.suggestion.focusInput
         */
        focusInput: function() {
    		this.data('input').get(0).focus();
        	return this;
        },

        /**
         * input失去焦点
         * @function
         * @name   $.ui.suggestion.leaveInput
         */
        leaveInput: function() {
        	this.data('input').get(0).blur();
        	return this;
        }
	});

 	$(document).on('pageInit', function() {
 		// role: data-widget = suggestion.
 		$('[data-widget=suggestion]').each(function(i, elem) {
 			var $elem = $(elem),
 				source = $elem.attr('data-source'),
 				count = $elem.attr('data-listCount');

 			$.ui.suggestion({
 				container: elem,
 				source: source,
 				listCount: count
 			});
 		});
 	});

})(Zepto);


exports = Zepto.ui.suggestion;
