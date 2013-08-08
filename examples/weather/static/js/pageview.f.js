Chassis.PageView.f = Chassis.PageView.extend({
	
	el : '#f_page',
	
	events : {
		'error model'           : 'onModelError',
		'change model'          : 'onModelChange',
		'click .wheel'          : 'onWheelChange',
		'click .saved_forecast' : 'onLocationChange',
		'click #mainBox .sections .currently .inner' : 'onCurrentMoreChange',
		'click #outlook .panel .top' : 'onDaysInfoShow',
		'click #search_area .map' : 'onMapShow',
		'click .grippy' : 'onDaysShow',
		'click #search_area .list' : 'onSettingShow'
	},
	
	init : function( options ){
		
		if (!ENV.is_homescreen){
			$( '#loading' ).hide();
			$( '#install' ).parent().show();
			Chassis.history.navigate( '',{trigger:false} );
			return false;
		}

		this.options = options;
		
		this.model = new Chassis.Model.f();
		
		this.skycons = new Skycons({"color": "black"});
		

		this.render();
		
		
	},
	
	render : function(){
		var me = this;
		
		me.loadData( me.options );
		
	},
	
	loadData : function( options ){
		var me = this,
			data = {};
		data = {
			q          : me.options.location,
			satellites : ''
		};
		
		if( options.si ){
			data.si = '';
		}
		me.model.fetch({
			data : data
		});
	},
	
	onModelError : function(){
		
		$('#loading').css('font-size','30px').html( "数据获取失败<p><a href='javascript:window.location.reload();'>重新加载</a></p>" );
	},
	
	onModelChange : function(){
		var me = this;
		var t = this.model.toJSON();
		var map = {
			'rain'                : Skycons.RAIN,
			'snow'                : Skycons.SNOW,
			'sleet'               : Skycons.SLEET,
			'hail'                : Skycons.SLEET,
			'wind'                : Skycons.WIND,
			'fog'                 : Skycons.FOG,
			'cloudy'              : Skycons.CLOUDY,
			'partly-cloudy-day'   : Skycons.PARTLY_CLOUDY_DAY,
			'partly-cloudy-night' : Skycons.PARTLY_CLOUDY_NIGHT,
			'clear-day'           : Skycons.CLEAR_DAY,
			'clear-night'         : Skycons.CLEAR_NIGHT
		};
		var getSkyconsType = function( key ){
			return map[ key ] || Skycons.CLOUDY;
		};
		
		
		this.skycons.add("icon_current", getSkyconsType( t.currently.icon ) );
		
		
		$( '#current_day .cell .temp span' ).text( Math.round(t.currently.temperature) );
		$( '#current_day .cell .desc' ).text( t.currently.summary );
		$('.next_hour .inner .desc').text( t.hourly.data[0].summary );
		$('.next_24_hours .inner .desc').text( t.daily.data[0].summary );
		
		
		(new Timeline($("#current_timeline .timeline"), {
			width: 850,
			label_width: 100,
			hour_spacing: 3
		})).load(t);
		
		window.setTimeout(function(){
			var e = $("#mainBox .scroll"),
				endFun = function(){
					e.css("webkitAnimationName", "");
					e.unbind(endFun);
				};
			//e.bind("webkitAnimationEnd", endFun);
			e.css("webkitAnimationName", "timeline_bounce");
			
			//new iScroll( e[0] );
			new iScroll('current_scroll');
			
			
		},100);
		
		var tpl = baidu.template( $( '#weekday' ).html(),t.daily );
		
		$('#outlook').html( tpl );
		
		$.each( t.daily.data, function( k,  v ){
			if ( k > 6 ){
				return;
			}
			me.skycons.add("day_icon" + k, getSkyconsType( v.icon ) );
		} );
		
		
		
		
		this.skycons.play();
		
		
		Map.set( t );
		
		
		
		$('#loading').hide( 'slow' );
		
	},
	
	/**
	 * Setting显示
	 */
	onSettingShow : function( e ){
		var forecastMain = $('#forecastMain');
		
		if ( forecastMain.hasClass('sliderOpen') ) {
			forecastMain
				.removeClass( 'sliderOpen' )
				.addClass( 'sliderClose' );
		} else {
			forecastMain
				.removeClass( 'sliderClose' )
				.addClass( 'sliderOpen' );
		}
	},
	
	/**
	 * 一周列表显示
	 */
	onDaysShow : function( e ){
		var outlook = $( '#outlook' ),
			mainBox = $('#mainBox');
			
		outlook.show();
		
		mainBox
			.removeClass( 'mapDown' )
			.removeClass( 'mapTop' );
		
		
		if ( mainBox.hasClass( 'grippyTop' ) ) {
			mainBox
				.removeClass( 'grippyTop' )
				.addClass( 'grippyDown' );
		} else {
			mainBox
				.removeClass( 'grippyDown' )
				.addClass( 'grippyTop' );
		}
	},
	
	/**
	 * map显示
	 */
	onMapShow : function( e ){
		var 
			me      = this,
			el      = $(e.target),
			hasInit = (el.attr('hasInit') == '1'),
			outlook = $( '#outlook' ),
			mainBox = $('#mainBox');
			
		
		
		outlook.hide();
		
		mainBox
			.removeClass( 'grippyDown' )
			.removeClass( 'grippyTop' );
		
		if ( mainBox.hasClass( 'mapDown' ) ) {
			mainBox
				.removeClass( 'mapDown' )
				.addClass( 'mapTop' );
				
			//Map.stop_animation();
			
		} else {
		
			mainBox
				.removeClass( 'mapTop' )
				.addClass( 'mapDown' );
			
			//Map.start_animation();
		}
	},
	
	/**
	 * 每周详情显示
	 */
	onDaysInfoShow : function( e ){
		var me      = this,
			target  = $(e.target),
			el      = target.parent(),
			loaded  = (el.attr('data-loaded') == '1'),
			index   = parseInt(target.attr( 'data-index' )),
			isOpen  = (el.height() > 80),
			outlook = $( '#outlook' ),
			panel   = outlook.find( '.panel' ),
			t       = me.model.toJSON()
			

		el.attr('data-loaded','1');
		
		panel.find('.loading,.details').hide();
		panel.find( '.reveal_button span' ).html( '+' );
		panel.height(60);
		
		outlook.css('top',11);
		
		if(isOpen){

			return;
		}
		
		
		target.find('.reveal_button span').html( '-' );
		
		if( index > 3 ) {
		
			var _m = -(index - 3)* 60;
			
			outlook
				.css( {
					'top'    : _m,
					'height' : -_m + $('#outlook').height() + 18
				} );
		}

		
		el.animate({height:230},500,function(){
		
		});
		
		el.find( '.loading' ).show();
		
		window.setTimeout(function(){
			var sunrise = new Date( t.daily.data[ index ]['sunriseTime'] * 1000 );
			var sunset = new Date( t.daily.data[ index ]['sunsetTime'] * 1000 );
			
			el.find( '.loading' ).hide();
			el.find( '.details' ).show();
			el.find( '.details .text_summary' ).html('<p>'+ t.daily.data[ index ]['summary'] +'</p><p style="font-size:12px;font-weight:400;font-family:Verdana, sans-serif;line-height:;line-height:24px;">SUNRISE '+ sunrise.getHours() + ':' +  sunrise.getMinutes() +' AM SUNSET '+ (sunset.getHours()-12) + ':' +  sunset.getMinutes() +' PM</p>');
			
			(new Timeline(el.find(".timeline"), {
				width: 850,
				label_width: 100,
				hour_spacing: 3
			})).load( t );
			
			new iScroll( 'day_' + index )
			
		}, 1000);
	},
	
	/**
	 * 当前日期天气详情显示
	 */
	onCurrentMoreChange : function( e ){
		var currently = $('#mainBox .currently'),
			more      = currently.find( '.more' ),
			less      = currently.find( '.less' ),
			opacity   = parseInt( more.css( 'opacity' ) );
		
		more.css( 'opacity', opacity ? 0 : 1 );
		less.css( 'opacity', opacity ? 1 : 0 );
	},
	
	/**
	 * 地址变更
	 */
	onLocationChange : function( e ){
		var me = this,
			el = $(e.target);
			
		$('#search_area .list').click();
		
		if(el.hasClass('permanent')){
			$( '.location_field' ).html( 'Current Location' );
			return;
		}else{
			
			$( '.location_field' ).html( el.find( '.forecast_name' ).html() );
			
		}
		var lat = el.attr( 'data-lat' ),
			lon = el.attr( 'data-lon' );
			
		window.setTimeout(function(){
		
			$('#loading').show( 'slow' );
			
			app.location = lat + ',' + lon;
			me.loadData({
				location : app.location,
				si       : ($( '.wheel' ).attr('m') == '1')
			});

		},500);
	},
	
	/**
	 * 温度单位变更
	 */
	onWheelChange : function( e ){
		var me = this,
			el = $(e.target),
			a = el.attr('m') == 1;
			
		
		if(a){
			el.attr('m','')
		}else{
			el.attr('m','1');
		}
		
		me.loadData({
			location : app.location,
			si       : !a
		});
	}
	
	
	
	
});