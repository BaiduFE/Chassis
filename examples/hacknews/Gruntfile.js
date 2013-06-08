module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON( 'package.json' ),

    concat: {
      build: {
        src: [
          'static/js/app/router.js',
		  'static/js/app/index/model.index.js',
		  'static/js/app/index/pageview.index.js',
		  'static/js/app/info/model.info.js',
		  'static/js/app/info/subview.info-content-info.js',
		  'static/js/app/info/subview.info-content.js',
		  'static/js/app/info/pageview.info.js',
		  'static/js/app/submit/model.submit.js',
		  'static/js/app/submit/pageview.submit.js',
		  'static/js/app/global/globalview.top.js',
		  'static/js/app/app.js'
        ],
        dest: 'static/js/app.js'
      }
    },

    uglify: {
      options: {
        mangle: true
      },
      build: {
        src: 'static/js/app.js',
        dest: 'static/js/app.min.js'
      }
    }
  });

  grunt.loadNpmTasks( 'grunt-contrib-concat' );

  grunt.loadNpmTasks( 'grunt-contrib-uglify' );

  // Default task(s).
  grunt.registerTask( 'default', [ 'concat', 'uglify' ] );

};