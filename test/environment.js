(function() {

  var Environment = this.Environment = function(){};

  _.extend(Environment.prototype, {

    ajax: Chassis.ajax,

    sync: Chassis.sync,

    emulateHTTP: Chassis.emulateHTTP,

    emulateJSON: Chassis.emulateJSON,

    setup: function() {
      var env = this;

      // Capture ajax settings for comparison.
      Chassis.ajax = function(settings) {
        env.ajaxSettings = settings;
      };

      // Capture the arguments to Chassis.sync for comparison.
      Chassis.sync = function(method, model, options) {
        env.syncArgs = {
          method: method,
          model: model,
          options: options
        };
        env.sync.apply(this, arguments);
      };
    },

    teardown: function() {
      this.syncArgs = null;
      this.ajaxSettings = null;
      Chassis.sync = this.sync;
      Chassis.ajax = this.ajax;
      Chassis.emulateHTTP = this.emulateHTTP;
      Chassis.emulateJSON = this.emulateJSON;
    }

  });

})();
