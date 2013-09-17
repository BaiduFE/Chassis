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

  <link rel="stylesheet" href="http://forecast.io/css/mobile.css?rel=1375213701785">
  
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
</head>
<body class="mobile">
  
  <div class="inner">

    <div id="sidebar" style="display:none">
      <div class="inner">

        <form id="forecast_form">
          <input id="forecast_location_field" type="search" />
          <div class="clear pictos">*</div>
        </form>
        
        <ul class="top_buttons">
          <li id="add_location_button">Save This Location</li>
          <li id="current_location_entry" class="saved_forecast permanent">
            Go to Current Location
          </li>
        </ul>

        <div id="saved_forecasts">
          <h1>Saved Locations <div id="edit_forecasts_button">Edit</div><div id="done_forecasts_button">Done</div></h1>
          
          <ul id="location_list"></ul>
        </div>

      </div>
      
      <div class="si_toggle">
        <span class="label_f">&deg;F</span>
        <div class="wheel">
          <span class="line"></span>
        </div>
        <span class="label_c">&deg;C</span>
      </div>
    </div>
    
    
    <div id="map_area">
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
    
  
    <div id="main">
      
      <!-- Loading screen -->
      <div id="loading" class="revealed">
        <span class="pictos">.</span>
      </div>
      
      <!-- The main forecast page, including current conditions, radar, and 7 day outlook -->
      <div id="forecast" class="page" style="display:none">
        
        <div class="pull_to_refresh_background"></div>
        <div class="pull_to_refresh_indicator">
          <span class="pictos">
            <span>{</span>
          </span>
        </div>
        
        <div class="overview_container clear">
          <div class="inner">
          
            <div id="sidebar_grippy"></div>
            
            <div id="search_area">
              <div class="inner">
                
                <div class="list">l</div>
                
                <div class="refresh loading">
                  <span class="pictos icon">1</span>
                  <span class="pictos dotdotdot">.</span>
                </div>
                
                <div class="location_controls">
                  <span class="location_field" />
                </div>
                
                <div class="map">MAP</div>
              </div>
            </div>
            
            <div class="sections">

              <div id="alerts" style="display:none">
                <div class="inner"></div>
                
                <div class="pagination">
                  <a href="javascript:;" onclick="UIManager.next_alert()">
                    <span class="num">1 of 2</span>
                    <span class="pictos">]</span>
                  </a>
                </div>
              </div>

              <section class="currently section">
                <div class="inner">
                  <span class="more_button pictos">+</span>
                  
                  <div class="current_container">
                    
                    <div class="less">
                      <div class="row">
                        <div class="cell">
                          <canvas id="icon_current" width="82" height="82" style="width:82px; height: 82px"></canvas>
                        </div>
                        <div class="cell">
                          <div class="temp"></div>
                          <div class="desc"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div class="more">
                      <div class="temps">
                        <div class="dir m"></div>
                        <div class="high_low"></div>
                      </div>
                      
                      <div class="table">
                        <div class="wind">
                          <span class="label">Wind:</span>
                          <span class="val"></span>
                        </div>
                        <div class="humidity">
                          <span class="label">Humidity:</span>
                          <span class="val"></span>
                        </div>
                        <div class="dewpoint">
                          <span class="label">Dew Pt:</span>
                          <span class="val"></span>
                        </div>
                        <div class="visibility">
                          <span class="label">Visibility:</span>
                          <span class="val"></span>
                        </div>
                        <div class="pressure">
                          <span class="label">Pressure:</span>
                          <span class="val"></span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </section>
            
              <section class="next_hour section">
                <div class="inner">
                  <h2>NEXT HOUR</h2>
                  <div class="desc"></div>
                </div>
              </section>
              
              <section class="next_24_hours section">
                <div class="inner">
                  <h2>NEXT 24 HOURS</h2>
                  <div class="desc"></div>
                </div>
              </section>
              
              <section class="timeline_scroll section">
                <div class="inner">
                  <div class="fade"></div>
                
                  <div class="scroll">            
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
        
        <div style="clear: left"></div>
  
        
        <div id="outlook">
          <div class="days"></div>
        </div>
        
        <div id="day_timeline" class="timeline_scroll">
          <div class="fade"></div>
          
          <div class="scroll">            
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
        
      </div>
      
      <!-- Error page -->
      <div id="error" class="page" style="display:none">
        
        <div class="location error" style="display:none">
          <h2>Cannot find that location</h2>
          <div>Sorry about that! Make sure it is spelled correctly, or try some alternatives.</div>
        </div>
        
        <div class="forecast error" style="display:none">
          <h2>No forecast for this location</h2>
          <div>Looks like we don't have a forecast for this location. Make sure it is spelled correctly, or try some alternatives.</div>
        </div>
        
        <div class="time_machine error" style="display:none">
          <h2>No data found</h2>
          <div>Looks like we don't have historical data for this location at the given time. Sorry about that! Perhaps try a different time or place.</div>
        </div>

        <div class="beta_ie error" style="display:none">
          <h2>Sorry, the Forecast beta does not support Internet Explorer</h2>
        </div>

        <div class="old_firefox error" style="display:none">
          <h2>I'm sorry, but you'll need to <a href='https://www.mozilla.org/firefox' target='_blank'>update your version of Firefox</a></h2>
        </div>

        <div class="old_safari error" style="display:none">
          <h2>I'm sorry, but your version of Safari is too old, please run Software Update</h2>
        </div>

        <div class="beta_mobile_support error" style="display:none">
          <h2>Sorry, the Forecast beta does not yet work on mobile devices</h2>
        </div>

        <div class="not_online error" style="display:none">
          <h2>Oops, but it looks like you aren't connected to the Internet</h2>
        </div>

        <div class="old_android error" style="display:none">
          <h2>Forecast currently only support Android phones and tablets that are running Android 4.0 or higher</h2>
        </div>
        
      </div>
      
      
      <!-- Footer content -->
      <div id="footer" style="display:none;">
        © 2013, The Dark Sky Company
      </div>
    </div>
    
    
    <!-- Time Machine -->
    <div id="time_machine_view">
      <h2>Time Machine</h2>
      <p>
      The time machine lets you explore the weather in both the past and future. See what happened the day you were born, or what is likely to happen a year from now.
      </p>
      <p>
      Coming soon to mobile.
      </p>
      <div class="coming_soon">COMING SOON</div>
    </div>
    
    
    <!-- Install to Home Screen display -->
    <div id="install" style="display:none">
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

	<script id="saved_forecast_template" type="text/x-handlebars-template">
        <li class="saved_forecast editable" data-lat="{{lat}}" data-lon="{{lon}}">
            <a class="forecast_name">{{name}}</a>
            <span class="delete_button_container">
                <span class="delete_button_dash"> </span>
                <span class="delete_button"></span>
            </span>
            <span class="delete_confirm_button">Delete</span>
        </li>
    </script>
	
	<script id="day_template" type="text/x-handlebars-template">
        <div data-time="{{date}}" class="day panel {{conditions}}">
            <div class="top">
              
              <div class="summary">
                <div class="day_icon"></div>
                <div class="day_name">{{name}}</div>
              </div>
              
              <div class="temperature_range">
                <div class="ranger">
                  <span class="temperature_min">{{temperature_min}}&deg;</span>  
                  <span class="temperature_max">{{temperature_max}}&deg;</span>
                </div>
              </div>
              
              <div class="reveal_button"><span class="pictos">+</span></div>
            </div>
            
            <div class="loading pictos" style="display:none">
              .
            </div>
            
            <div class="details" style="display:none">
              <div class="text_summary"></div>
              <div class="text"></div>
            </div>
            
        </div>
    </script>
	<script src="/static/js/sea.js"></script>	
	<script src="/static/js/lib.js?rel=121212"></script>
	<script src="/static/js/chassis.js"></script>
	<script src="/static/js/mobile.min.js?rel=121212"></script>
	
	

  
</body>
</html>