Chassis.PageView.info = Chassis.PageView.extend( {
	el: '#info',

    init: function( opts ) {
		var me = this;
        me.setup(new Chassis.SubView.info_content(
            Chassis.mixin({}, opts), 
            me
        ));
    },

	onAfterPageIn : function(){
		this.$el.show();
	}
});
