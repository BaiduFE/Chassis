/*jshint camelcase:false*/

/**
 * @fileOverview 子页面管理
 */

/**
 * 子页面管理器
 * @class SubPageMgr
 * @constructor
 * @namespace __Chassis__.View
 * @param  {object} opts
 * opts.owner {view} 子页面所属视图
 * [opts.max] {int} 子页面并存上限，超过此上限将回收
 * opts.klass {view} 子页面实例对应的视图类
 * [opts.transition] {string|function} 子页面切换效果，如果是字符串则会从
 * `Chassis.FX[transition]`中调用切换方法；如果是函数则直接调用改函数来处理切换。
 * 对于自定义页面切换函数将接收以下参数：
 * fromEl: 待切出视图元素；
 * toEl: 待切入视图元素；
 * dirFn: 切换方向(0-无方向，1-向左，2-向右)；
 * transitionEnd: 切换完成后的回调，必须在自定义函数中调用；
 * [opts.dirFn] {function} 自定义切换方向(-1-默认，0-无方向，1-向左，2-向右)；
 */
var SPM = Chassis.SubPageMgr = View.SubPageMgr = function( opts ) {
	Chassis.mixin( this, {
		max: 3,

		/*owner,*/

		/*klass,*/
		
		/*dirFn,*/
		transition: 'slider'
	}, opts );

	this._init();
};

Chassis.mixin( SPM.prototype, Events, {

	/**
	 * 获取页面内的识别串，用于同一个页面中不同子页面间的识别
	 * @param  {object} params
	 * @return {string}
	 */
	getStamp: function( params ) {
		return Chassis.$.param( params || {} );
	},

	/**
	 * 添加新的子页面
	 * @param  {subview} subview
	 */
	register: function( subview ) {

		var pages = this.pagesMap;

		if ( !pages[ subview.cid ] ) {
			subview.__order__ = this._order++;
			pages[ subview.cid ] = subview;

			this.pagesList.push( subview );
		}

		return this;
	},

	/**
	 * 查找子页面
	 * @param  {string} key
	 * @param  {string} val
	 * @return {subview}
	 * @example
	 * spm.getBy( 'featureString', ft );
	 */
	getBy: function( key, val ) {

		var pages = this.pagesMap,
			subview,
			cid;

		if ( key === 'cid' ) {
			return pages[ val ];
		}

		for ( cid in pages ) {
			if ( pages.hasOwnProperty( cid ) ) {
				subview = pages[ cid ];

				if ( subview[ key ] === val ) {
					return subview;
				}
			}
		}

		return null;
	},

	/**
	 * 页面切换
	 * @param  {view} from subpage
	 * @param  {view} to subpage
	 * @param  {object} params
	 * params.from page
	 * params.to page
	 * params.params 页面切换参数
	 *
	 * @description 处理逻辑
	 *
	 * 1. 页面内部切换（即params.from === params.to，但是参数不同）
	 *  a. 根据params生成识别串并在SPM中查找目标子页面
	 *  b. 如果未找到则自动创建目标子页面并加入SPM
	 *  c. 重新设置current
	 *  d. 调用switch切换
	 *   d1. 显示目标子页面DOM元素
	 *   d2. 调用动画切换
	 *   d3. 隐藏切出子页面DOM元素
	 * 
	 * 2. 页面间切换（即params.from !== params.to)
	 *  a. 根据params生成识别串并在SPM中查找目标子页面
	 *  b. 如果未找到则自动创建目标子页面并加入SPM
	 *  c. 重新设置current
	 *  d. 调用switch切换
	 *   d1. 如果待切出子页面不为空（首次进入params.to时为空）则直接隐藏DOM
	 *   d2. 显示目标子页面DOM元素
	 */
	_switch: function( from, to, params ) {
		var dir = -1,
			fromPage = params.from,
			toPage = params.to,
			me = this,
			evt = {
				from: from,
				to: to,
				params: params
			};

		// 派发事件
		to.trigger( 'beforeswitchin', evt );

		to.$el.show();

		// pageview内部子页面切换
		if ( fromPage === toPage ) {

			if ( this.dirFn ) {
				dir = this.dirFn( from, to );
			}

			if ( dir < 0 ) {
				dir = this._calcDir.apply( this, arguments );
			}


			this._doSwitch( from, to, dir, function() {

				// 隐藏已切出子页面
				if ( from ) {
					from.$el.hide();
				}

				me._setCurrent( to );

				to.trigger( 'afterswitchin', evt );

				// 子页面回收
				me.recycle();
			} );

		// 从其他pageview切换到当前pageview: 子页面显示无需动画效果，直接显示即可
		} else {
			if ( from ) {
				from.$el.hide();
			}

			this._setCurrent( to );

			to.trigger( 'afterswitchin', evt );

			this.recycle();
		}

		return this;
	},

	/**
	 * 自动判断并回收子页面，先入先出。
	 */
	recycle: function() {
		var list = this.pagesList,
			page;

		while ( list.length > this.max ) {
			page = list.shift();

			if ( page === this.current ) {
				list.push( page );
			} else {
				delete this.pagesMap[ page.cid ];
				page.destroy();
			}
		}
	},

	_init: function() {

		// 子页面列表，key为cid
		this.pagesMap = {};

		// 子页面列表，回收时使用
		this.pagesList = [];

		// 当前可见子页面
		this.current = null;

		// 上一可见子页面
		this.previous = null;

		// 子页面序号
		this._order = 0;

		this._boundToView();
	},

	/**
	 * 监听view的切换事件，判断是否需要处理子页面切换逻辑
	 */
	_boundToView: function() {

		var listenTarget = this.owner.root || this.owner;

		// 监听PageView的beforepagein和afterpagein事件
		this.listenTo( listenTarget, 'beforepagein', this._beforePageIn );
		this.listenTo( listenTarget, 'afterpagein', this._afterPageIn );
		
		this.listenTo( this.owner, 'beforedestroy', this._destroy );

	},

	/**
	 * 计算子页面切换方向，可以在dirFn选项中自定义切换方向
	 * @param {subview} 起始子页面
     * @param {subview} 目标子页面
     * @return {int} 方向参数（含义可扩展）：1-向左，2-向右
	 */
	_calcDir: function( from, to ) {

		if ( !from ) {
			return 0;
		}

		var pages = this.pagesMap,
			fromOrder = pages[ from.cid ].__order__,
			toOrder = pages[ to.cid ].__order__;

		return fromOrder > toOrder ? 2 : 1;
	},

	/**
	 * 处理子页面切换
	 * @param  {subview} from
	 * @param  {subview} to
	 * @param  {int} dir 方向参数（含义可扩展）：1-向左，2-向右
	 * @param  {function} transitionEnd
	 */
	_doSwitch: function( from, to, dir, transitionEnd ) {

		var toEl = to.$el,
			fromEl,
			fxFn;

		if ( Chassis.isFunction( this.transition ) ) {
			fxFn = this.transition;
		} else {
			fxFn = Chassis.FX[ this.transition ].animate;
		}

		if ( !fxFn ) {
			return;
		}

		if ( from ) {
			fromEl = from.$el;
		}

		fxFn( fromEl, toEl, dir, transitionEnd );
	},

	/**
	 * 销毁子页面管理器，通常只在子页面管理器所在owner被销毁后执行
	 */
	_destroy: function() {
		this.stopListening();

		this.pagesMap =
				this.pagesList =
				this.current =
				this.previous =
				this.owner = null;
	},

	_beforePageIn: function( e ) {
		var from = e.from,
			to = e.to,
			params = e.params,
			stamp = this.getStamp( params );

		// 跨页面切换到子页面时，当前子页面若不是目标子页面，须提前隐藏，保证切换效果
		if (  from !== to &&
				this.current &&
				stamp !== this.current.stamp ) {
			this.current.$el.hide();
		}
	},

	_afterPageIn: function( e ) {

		var params = e.params,
			owner = this.owner,
			stamp = this.getStamp( params ),
			target = this.getBy( 'stamp', stamp ),
			subpage;

		// 如果子页面不存在则自动创建
		if ( !target ) {

			// TODO: 某些数据可能不允许自动生成subview
			subpage = new this.klass( params || {}, owner );
			subpage.stamp = stamp;

			owner.append( subpage );
			this.register( subpage );

			target = subpage;
		}

		this._switch( this.current, target, e );
	},

	_setCurrent: function( subview ) {
		if ( subview !== this.current ) {
			this.previous = this.current;
			this.current = subview;
		}
	}

	/* TODO

	/**
	 * 从子页面管理器中移除指定页面
	 * @return {[type]}
	 */
	/*
	_remove: function( subview ) {
		var pagesMap = this.pagesMap,
			pagesList = this.pagesList;

		if( pagesMap[ subview.cid ] ) {
			delete pagesMap[ subview.cid ];

			for( var i = 0, len = pagesList.length; i < len; i++ ) {
				if( pagesList[ i ].cid == subview.cid ) {
					pagesList.splice( i, 1 );
					break;
				}
			}

			if( this.current === subview ) {
				//TODO
			}
		}
	}
	*/
} );