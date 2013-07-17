var InfoModel = Chassis.Model.extend( {

    url : function() {
        return '/?m=Index&a=recordinfo';
    },
    
    parse : function(resp) {
        return resp;
    }
} );
