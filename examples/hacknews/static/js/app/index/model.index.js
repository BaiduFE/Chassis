var IndexModel = Chassis.Model.extend( {
	
	defaults : {
		page : 1
	},
	
    url : function() {
        return '/?m=Index&a=recordlist&page=' + this.get('page');
    },
    
    parse : function(resp) {
        return resp;
    }
} );
