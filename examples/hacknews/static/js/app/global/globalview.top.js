Chassis.GlobalView.top = Chassis.GlobalView.extend({

    el: '#globalview-top',

    events: {
		 'click #home' : 'gotoHome'
		, 'click #submit' : 'gotoSubmit'
    },

    init: function( opts ) {
		var me = this,ec = me.root;
		ec.on('routechange', me.onRouteChange, me);
    },

    onBeforePageIn: function() {

    },
	
	onRouteChange : function( args ){
		this._currentAction = args.to.action;
	},
	
	gotoHome : function(e){
		
		if(this._currentAction == ''){
			return;
		}
		Chassis.history.navigate( '' );
	},
	
	gotoSubmit : function(e){
		if(this._currentAction == 'submit'){
			return;
		}
		Chassis.history.navigate( 'submit' );
	}
});