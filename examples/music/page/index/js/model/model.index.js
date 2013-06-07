Chassis.Model.define( 'index', {

    url : function() {
        return 'data/albums.php';
    },
    
    parse : function( resp ) {
        var album_list = resp.plaze_album_list.RM.album_list,
            list = album_list.list;

        for( var i = 0, len = list.length; i < len; i++ ) {
            list[ i ].rank = i + 1;
        }

        return album_list;
    }
} );
