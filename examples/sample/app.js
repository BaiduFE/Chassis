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
    $('#example').html('home!');
};

var InfoView = function( Request ) {
    var Model = Chassis.Model.extend({
        initialize: function(attributes, options) {

        },
        
        url : function(){
            return 'data.php';
        },
        
        parse : function(resp){
            return resp.data;
        }
    });

    var model = new Model();

    model.on('change',function(){
        $('#example').html(this.get('one'));
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

