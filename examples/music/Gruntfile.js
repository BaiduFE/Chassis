module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    includereplace: {
      dist: {
          // Files to perform replacements and includes with
          src: 'tpl/index.html',
          // Destination directory to copy files to
          dest: '.'
      }
    },

    concat: {
      css: {
        src: [
          'css/normalize.css',
          'css/main.css',
          'css/globalloading.css',
          'css/pageloading.css',
          'css/app.css',
          'page/*/*/*.css'
        ],
        dest: 'css/all.css'
      },
      js: {
        options: {
          separator: ';'
        },
        src: [
          'js/vendor/zepto.min.js',
          'js/vendor/mustache.js',
          '../../build/chassis.js',
          'page/*/*/*/*.js',
          'js/init.js'
        ],
        dest: 'js/all.js'
      },
      tpl: {
        src: [
          'tpl/globalloading.tpl.html',
          'tpl/pageloading.tpl.html',
          'page/*/*/*.html'
        ],
        dest: 'tpl/all.tpl.html'
      }
    }
  });

  grunt.loadNpmTasks('grunt-include-replace');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask( 'default', [ 'concat', 'includereplace' ] );

};