Chassis.Model.define( 'detail', {

    url : function() {
        return 'data/info.php';
    },
    
    parse : function( resp ) {
        var list = resp.songlist;

        resp.albumInfo.simpleinfo = resp.albumInfo.info.substring(0, 70) + '...';

        for( var i = 0, len = list.length; i < len; i++ ) {
            list[ i ].rank = i + 1;
        }

        return resp;
    }
} );