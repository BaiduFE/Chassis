//创建Router
var Router = Chassis.Router.extend({
    
    routes : {
        '' : 'home',
        'info/:id'  : 'info'
    },
    
    home : function(){
        new HomeView( this.Request );
    },
    
    info : function(){
        
        new InfoView( this.Request );
        
    }
    
});

var HomeView = function( Request ) {
    var Model = Chassis.Model.extend({
        initialize: function(attributes, options) {

        },
        
        url : function(){
            return 'lib/albums.php';
        },
        
        parse : function(resp){
            return resp.plaze_album_list.RM.album_list;
        }
    });

    var model = new Model();

    model.on('change',function(){
        $('#example').html(baidu.template($('#albumlist').html() ,this.toJSON()));
    });

    model.on('error',function(){
        $('#example').html('something is wrong');
    });
    
    model.fetch();
};

var InfoView = function( Request ) {
    var Model = Chassis.Model.extend({
        initialize: function(attributes, options) {

        },
        
        url : function(){
            return 'lib/info.php';
        },
        
        parse : function(resp){
            return resp;
        }
    });

    var model = new Model();

    model.on('change',function(){
        $('#example').html(baidu.template($('#albuminfo').html() ,this.toJSON()));
    });

    model.on('error',function(){
        $('#example').html('something is wrong');
    });
    
    model.fetch({
        data : {
            id : Request.id
        }
    });
};


var router = new Router;

Chassis.history.start();

