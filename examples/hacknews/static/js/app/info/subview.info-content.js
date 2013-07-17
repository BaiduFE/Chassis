Chassis.SubView.info_content = Chassis.SubView.extend( {
	el: '#info-content',

    init: function( opts ) {
		var me = this;
		
		me.spm = new Chassis.SubPageMgr({
          owner: me,
          max: 15,
          klass: Chassis.SubView.info_content_info
        });
		
    },

    onBeforePageIn: function( arg ) {
    },
	
	onAfterPageIn: function() {
		this.$el.show();
    }
});
