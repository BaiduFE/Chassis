<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Weather For Chassis</title>

  <meta name="description" content="Full-featured, global weather service, complete with 7-day forecasts that cover world, beautiful weather visualizations, and a time machine for exploring the weather in the past and far future.">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <meta name="format-detection" content="telephone=no">
  <meta name="viewport" content="width=320.1, initial-scale=1, user-scalable=no">
  <link rel="stylesheet" href="/static/css/mobile.css?rel=1375213701785">
  
  <link rel="apple-touch-icon-precomposed" href="http://forecast.io/images/icons/54.png?2">
  <link rel="apple-touch-icon-precomposed" sizes="72x72" href="http://forecast.io/images/icons/72.png?2">
  <link rel="apple-touch-icon-precomposed" sizes="114x114" href="http://forecast.io/images/icons/114.png?2">
  <link rel="apple-touch-icon-precomposed" sizes="144x144" href="http://forecast.io/images/icons/144.png?2">

  <link rel="apple-touch-startup-image" href="http://forecast.io/images/startup-ipad-landscape-retina.png" media="screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation:landscape) and (min-device-pixel-ratio: 2)">
  <link rel="apple-touch-startup-image" href="http://forecast.io/images/startup-ipad-portrait-retina.png" media="screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation:portrait) and (min-device-pixel-ratio: 2)">
  <link rel="apple-touch-startup-image" href="http://forecast.io/images/startup-ipad-landscape.png" media="screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation:landscape)">
  <link rel="apple-touch-startup-image" href="http://forecast.io/images/startup-ipad-portrait.png" media="screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation:portrait)">
  <link rel="apple-touch-startup-image" href="http://forecast.io/images/startup-568h-retina.png" media="screen and (device-height: 568px)">
  <link rel="apple-touch-startup-image" href="http://forecast.io/images/startup-retina.png" media="screen and (device-height: 480px) and (min-device-pixel-ratio: 2)">
  <link rel="apple-touch-startup-image" href="http://forecast.io/images/startup.png" media="screen and (device-height: 480px)">
  <style>
  #index_page,
  #f_page {
	display:none;
  }
  </style>
</head>
<body class="mobile desktop chrome forecast">
	<div id="loading" class="revealed">
        <span class="pictos">.</span>
    </div>
	<div class="inner" style="display:none">
		<!-- Install to Home Screen display -->
		<div id="install">
		  <div class="top">
			<h2>Install <span class="bold">Weather</span></h2>
			<h3>Download the most advanced weather app for your iPhone today.</h3>
		  </div>
		  
		  <div class="chrome_instructions">
			To download Forecast, open weather123.duapp.com in Safari and "Add to Home Screen".
		  </div>
		  
		  <div class="instructions">
			Tap the icon below to "<span class="bold">Add to Home Screen</span>"
			<span class="pictos">}</span>
		  </div>
		</div>
	</div>

	<!----->
	
	<div id="main">
	<div id="forecast">
		<div id="index_page">
		
		</div>
		<div id="f_page">

			<div id="sidebar">
				<div class="inner">

					<form id="forecast_form">
						<!--<input id="forecast_location_field" type="search">-->
						<div class="clear pictos">*</div>
					</form>
        
					<ul class="top_buttons">
						<!--<li id="add_location_button">Save This Location</li>-->
						<li id="current_location_entry" class="saved_forecast permanent">
							Go to Current Location
						</li>
					</ul>

					<div id="saved_forecasts">
						<h1>Saved Locations <!--<div id="edit_forecasts_button">Edit</div><div id="done_forecasts_button">Done</div>--></h1>
          
						<ul id="location_list">
							<li class="saved_forecast editable" data-lat="40.7142" data-lon="-74.0064">
								<a class="forecast_name">New York, NY</a>
								<span class="delete_button_container">
									<span class="delete_button_dash"> </span>
									<span class="delete_button"></span>
								</span>
								<span class="delete_confirm_button">Delete</span>
							</li>
							<li class="saved_forecast editable" data-lat="51.5171" data-lon="-0.1062">
								<a class="forecast_name">London, UK</a>
								<span class="delete_button_container">
									<span class="delete_button_dash"> </span>
									<span class="delete_button"></span>
								</span>
								<span class="delete_confirm_button">Delete</span>
							</li>
							<li class="saved_forecast editable" data-lat="-33.8683" data-lon="151.2086">
								<a class="forecast_name">Sydney, Australia</a>
								<span class="delete_button_container">
									<span class="delete_button_dash"> </span>
									<span class="delete_button"></span>
								</span>
								<span class="delete_confirm_button">Delete</span>
							</li>
						</ul>
					</div>
				</div>
      
				<div class="si_toggle">
					<span class="label_f">°F</span>
					<div class="wheel">
						<span class="line"></span>
					</div>
					<span class="label_c">°C</span>
				</div>
			</div>
			<div id="forecastMain">
				<div id="map_area" style="display:block;">
					<div id="map">
						<div class="top_bar">
							<div class="global">Global</div>
							<ul class="levels segmented-control"></ul>
						</div>
					
						<div class="global_shadow"></div>
					
						<div class="map_container">
							<canvas width="500" height="500" style="width:500px; height: 500px"></canvas>
							<div class="cities"></div>
							<div class="location">
								<span class="pointer"></span>
								<span class="shadow"></span>
							</div>
							<div class="loading">LOADING</div>
							<div class="disabled">NO RADAR AVAILABLE AT THIS TIME</div>
							<div id="#fps"></div>
						</div>
					
						<div id="fps"></div>
					
						<div class="controls">
							<div class="timeline">
								<div class="progress">
									<span class="pre"></span>
									<span class="post"></span>
								</div>
								<div class="labels"></div>
							</div>
						</div>
					
						<div class="slider">
							<div class="handle minimized">
								<span class="line"></span>
							</div>
						</div>
					
						<div class="load_animation">
							<span class="pictos">9</span>
							<span>Click to load animation</span>
						</div>
					
						<div class="load_animation_small">
							<span class="pictos">9</span>
						</div>
					
					</div>
				  
					<div class="time"></div>
				</div>
				<div id="mainBox" class="overview_container clear clear-day">
					<div class="inner">
						<div id="search_area">
							<div class="inner">
								<div class="list">l</div>
								<div class="refresh">
									<span class="pictos icon">1</span>
									<span class="pictos dotdotdot">.</span>
								</div>
							
								<div class="location_controls">
									<span class="location_field">Current Location</span>
								</div>
								<div class="map">MAP</div>
							</div>
						</div>

						<div class="sections">
							<section class="currently section">
								<div class="inner">
									<span class="more_button pictos">+</span>
									<div class="current_container">
										<div class="less">
											<div class="row" id="current_day">
												<div class="cell">
													<canvas id="icon_current" width="82" height="82" style="width:82px; height: 82px"></canvas>
												</div>
												<div class="cell">
													<div class="temp"><span>86°</span></div>
													<div class="desc">Clear</div>
												</div>
											</div>
										</div>
							
										<div class="more">
											<div class="temps">
												<div class="dir m">Temp is steady. Pressure is falling.</div>
												<div class="high_low">Low, <span class="m">75°</span> at <span class="m">2AM</span>,<br>High, <span class="m">87°</span> at <span class="m">5PM</span>.</div>
											</div>
							  
											<div class="table">
												<div class="wind">
													<span class="label">Wind:</span>
													<span class="val">2 mph<div class="windicator frame_3" "="" title="2 mph winds from the SE"></div></span>
												</div>
												<div class="humidity">
													<span class="label">Humidity:</span>
													<span class="val">71%</span>
												</div>
												<div class="dewpoint">
													<span class="label">Dew Pt:</span>
													<span class="val">75</span>
												</div>
												<div class="visibility">
													<span class="label">Visibility:</span>
													<span class="val">1 mi</span>
												</div>
												<div class="pressure">
													<span class="label">Pressure:</span>
													<span class="val">1000 mb</span>
												</div>
											</div>
										</div>
									</div>

								</div>
							</section>
					
							<section class="next_hour section">
								<div class="inner">
									<h2>NEXT HOUR</h2>
									<div class="desc">Clear</div>
								</div>
							</section>
					  
							<section class="next_24_hours section">
								<div class="inner">
									<h2>NEXT 24 HOURS</h2>
									<div class="desc">Light rain starting this afternoon.</div>
								</div>
							</section>
					  
							<section id="current_timeline" class="timeline_scroll section">
								<div class="inner">
									<div class="fade"></div>
									<div class="scroll" id="current_scroll">            
										<div class="timeline_container">              
											<div class="timeline">
												<div class="stripes"></div>
												<div class="hour_ticks"></div>
												<div class="hours"></div>
												<div class="temps"></div>
											</div>
										</div>
									</div>
								</div>
							</section>
						</div>
						<div class="grippy">
							<span>NEXT 7 DAYS</span>
						</div>
					</div>
				</div>
				<div id="outlook"></div>
			</div>
		</div>
	</div>
	</div>
	
	<script type="text/template" id="weekday">
		<% for(var i = 0,j = data.length; i < j; i++){ %>
		<%
			var weekName = function( key ){
				var map  = ['Sun.','Mon.','Tues.','Wed.','Thur.','Fri.','Sat.'];
				return i == 0 ? 'TODAY' : map[ key ];
			}( new Date( data[ i ][ 'time' ] * 1000 ).getDay() );
		%>
		<div data-time="<%= data[i][ 'time' ] %>" class="day panel rain">
			<% if( i > 6 ){ %>
				<% break; %>
			<% } %>
			<div class="top"  data-index="<%= i %>">
				<div class="summary">
					<div class="day_icon"><canvas id="day_icon<%= i %>" style="width:36px; height:36px" width="36" height="36"></canvas></div>
					<div class="day_name"><%= weekName %></div>
				</div>
		  
				<div class="temperature_range">
					<div class="ranger" style="left: <%= Math.round(data[i][ 'temperatureMin' ]) %>%; right: <%= Math.round(50 - data[i][ 'temperatureMax' ]) %>%; background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, 0.0235294), rgba(0, 0, 0, 0.243137));">
						<span class="temperature_min"><%= Math.round(data[i][ 'temperatureMin' ]) %>°</span>  
						<span class="temperature_max"><%= Math.round(data[i][ 'temperatureMax' ]) %>°</span>
					</div>
				</div>
		  
				<div class="reveal_button"><span class="pictos">+</span></div>
			</div>
			<div class="loading pictos" style="display:none">
              .
            </div>
            
            <div class="details" style="display:none">
				<div class="text_summary"></div>
				<section class="timeline_scroll section">
					<div class="inner">
						<div class="fade"></div>
						<div class="scroll" id="day_<%= i %>">
							<div class="timeline_container">              
								<div class="timeline">
									<div class="stripes"></div>
									<div class="hour_ticks"></div>
									<div class="hours"></div>
									<div class="temps"></div>
								</div>
							</div>
						</div>
					</div>
				</section>
            </div>
		</div>
		<% } %>
	</script>
	
	<script src="/static/js/lib2.js"></script>
	<script src="/static/js/map.js"></script>
	<script src="/static/js/skycons.js"></script>
	<script src="/static/js/timeline.js"></script>
	<script src="/static/js/sea.js"></script>
	<script src="/static/js/baidutemplate.js"></script>
	<script src="/static/js/chassis.js"></script>
	<script src="/static/js/iscroll.js"></script>
	<script src="/static/js/app.js"></script>
</body>
</html>