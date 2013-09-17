var app = {};
Chassis.load.config.ruler = function( pkg ){
	return '/static/js/' + pkg.replace(/\-/g,'.');
};
        
Chassis.F = {
	load : seajs.use
};


Chassis.PageView.index = Chassis.PageView.extend({
	el : '#index_page',
	
	init : function(){
		$.ajax({
			url : '/proxy/ip/ip.php',
			type : 'get',
			dataType : 'jsonp',
			success : function(t) {
				app.location = t.latitude + ',' + t.longitude;
				Chassis.history.navigate( 'f/' + app.location  );
				
			}
		});
	}
});

Chassis.Model.f = Chassis.Model.extend({
	url : function(){
		return '/proxy/forecast.php';
	},
	
	parse : function( resp ){
		return resp;
	}
});



Map.initialize();
	
Chassis.history.start( {
	router:{
	
		routes : {
			''             : 'index',
			'f/:location'  : 'f'
		}
	}
	
} );

				
