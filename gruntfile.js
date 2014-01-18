module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		 pkg: grunt.file.readJSON('package.json'),
		  //jsmin 
		  uglify: {
		    static_mappings: {
		      files: [
		        {src: '<%= pkg.src %>/admin/js/admin-268xue.js', dest: '<%= pkg.target %>/admin/js/admin-268xue.js'},
		        {src: '<%= pkg.src %>/js/commonJs.js', dest: '<%= pkg.target %>/js/commonJs.js'},
		        {src: '<%= pkg.src %>/js/webutils.js', dest: '<%= pkg.target %>/js/webutils.js'}
		      ]
		    },
		    dynamic_mappings: {
		      files: [
		        {
		          expand: true,     
		          cwd: '<%= pkg.src%>/',
		          src: ['js/blog/*.js',
		                'js/discuss/*.js',
		                'js/friend/*.js',
		                'js/header/*.js',
		                'js/letter/*.js',
		                'js/suggest/*.js',
		                'js/weibo/*.js',
		                'js/weibo/*.js',
		                ], 
		          dest: '<%= pkg.target %>/',
		          ext: '.js'
		        }
		      ]
		    }
		  },
		  //cssmin
		  cssmin: {
			    dynamic_mappings: {
			      files: [
			        {
			          expand: true,
			          cwd: '<%= pkg.src%>/',
			          src: ['css/*.css'], 
			          dest: '<%= pkg.target %>/',
			          ext: '.css'
			        }
			      ]
			    }
		 },
		  
		 //htmlmin
		  
		});

  // Load the plugin HTML/CSS/JS/IMG min
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
	
  // build task(s).grunt build
  grunt.registerTask('build', ['uglify','cssmin']);
  
 
};