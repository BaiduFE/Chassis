Chassis.Model.Detail = Chassis.Model.extend( {

    url : function() {
        return '/articles/data/info.php';
    },
    
    parse : function( resp ) {
        var albumInfo = resp.albumInfo;



        return albumInfo;
    }
} );