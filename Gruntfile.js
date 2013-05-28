module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON( 'package.json' ),

    concat: {
      options: {
        banner: '(function(){\n',
          
        footer: '\n})()',

        process: function( src, filepath ) {
          return src.replace( /__Chassis__/g, 'Chassis' );
        }
      },
      build: {
        src: [
          'src/base/base.js',
          'src/base/lang.js',
          'src/base/event.js',
          'src/model/model.js',
          'src/model/cache.js',
          'src/router/router.js',
          'src/router/history.js',
          'src/router/history.hash.js',
          'src/router/history.pushstate.js',
          'src/view/view.js',
          'src/view/subview.js',
          'src/view/pageview.js',
          'src/view/subpagemanager.js',
          'src/view/globalview.js',
          'src/view/view.fx.slider.js',
          'src/view/view.loading.js'
        ],
        dest: 'build/<%= pkg.name %>.js'
      },
      dist: {
        src: [
          'src/base/base.js',
          'src/base/lang.js',
          'src/base/event.js',
          'src/model/model.js',
          // 'src/model/cache.js',
          'src/router/router.js',
          'src/router/history.js',
          'src/router/history.hash.js',
          // 'src/router/history.pushstate.js',
          'src/view/view.js',
          'src/view/subview.js',
          'src/view/pageview.js',
          // 'src/view/subpagemanager.js',
          // 'src/view/globalview.js',
          // 'src/view/view.loading.js'
        ],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        mangle: true
      },
      build: {
        src: 'dist/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },

    watch: {
      scripts: {
        files: [ 'src/**/*.js' ],
        tasks: [ 'default' ],
        options: {
          nospawn: true,
        },
      },
    },

    jsbint: {
      all: [ 'src/**/*.js' ],
      options: {
        jshintrc: '.jshintrc',
      }
    },

    qunit: {
      all: {
        options: {
          urls: [
            'http://www.chassis.com/test/index.html'
          ]
        }
      }
    }

  });

  grunt.loadNpmTasks( 'grunt-contrib-concat' );

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );

  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.loadNpmTasks('grunt-jsbint');

  grunt.loadNpmTasks('grunt-contrib-qunit');

  // Default task(s).
  grunt.registerTask( 'default', [ 'jsbint', 'concat', 'qunit', 'uglify' ] );

};