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
          'src/router/router.js',
          'src/router/history.js',
          'src/router/history.hash.js',
          'src/view/view.js'
        ],
        dest: 'build/<%= pkg.name %>.js'
      },
      // {{TMEP
      replace: {
        src: [
          'src/base/base.js',
          'src/base/lang.js',
          'src/base/event.js',
          'src/model/model.js',
          'src/router/router.js',
          'src/router/history.js',
          'src/router/history.hash.js',
          'src/view/view.js'
        ],
        dest: '../../fisprojects/map_webapp/common/ui/libs/backbone/backbone/backbone.js'
      },
      back: {
        src: [
          'build/backbone.js'
        ],
        dest: '../../fisprojects/map_webapp/common/ui/libs/backbone/backbone/backbone.js'
      },
      replaceu: {
        src: [
          'src/base/underscore_adapter.js'
        ],
        dest: '../../fisprojects/map_webapp/common/ui/libs/backbone/underscore/underscore.js'
      },
      backu: {
        src: [
          'build/underscore.js'
        ],
        dest: '../../fisprojects/map_webapp/common/ui/libs/backbone/underscore/underscore.js'
      },
      // TEMP}}
      dist: {
        src: [
          'src/base/base.js',
          'src/base/lang.js',
          'src/base/event.js',
          'src/model/model.js',
          'src/router/router.js',
          'src/router/history.js',
          'src/router/history.hash.js',
          'src/view/view.js'
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
            'http://localhost:8000/test/index.html'
          ]
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 8000,
          base: '.'
        }
      }
    },

    yuidoc: {
      compile: {
        name: '<%= pkg.name %>',
        description: '<%= pkg.description %>',
        version: '<%= pkg.version %>',
        url: '<%= pkg.homepage %>',
        options: {
          paths: 'build/',
          outdir: 'docs/api/'
        }
      }
    },

    size: {
        build: {
            cwd: 'build/',
            src: ['**/*.js']
        },
        dist: {
            cwd: 'dist/',
            src: ['**/*.js']
        },
        all: {
            cwd: 'src/',
            src: ['**/*.js']
        }
    }

  });

  grunt.loadNpmTasks( 'grunt-contrib-concat' );

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );

  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.loadNpmTasks('grunt-jsbint');

  grunt.loadNpmTasks('grunt-contrib-qunit');

  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.loadNpmTasks('grunt-contrib-yuidoc');

  // 负责报告文件大小
  grunt.loadNpmTasks( 'grunt-size' );

  //test
  grunt.registerTask( 'test', [ 'connect', 'qunit' ] );

  // Default task(s).
  grunt.registerTask( 'default', [ 'jsbint', 'concat', 'connect', 'qunit', 'uglify', 'yuidoc' ] );

};