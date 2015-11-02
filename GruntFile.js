module.exports = function(grunt) {

  require('grunt-loadnpmtasks').extend(grunt); // Where `grunt` is an instance of Grunt

  grunt.initConfig({
      uglify: {
        js: {
          src: ['angular-material-table.js'],
          dest: 'angular-material-table.min.js',
        }
      },
      cssmin: {
        my_target: {
          src: 'angular-material-table.css',
          dest: 'angular-material-table.min.css'
        }
      }
  });

  grunt.registerTask('default', ['uglify', 'cssmin']);

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
};
