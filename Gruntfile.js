module.exports = function (grunt) {

	var npmDependencies = require('./package.json').devDependencies;

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		// Watches for changes and runs tasks
		watch: {
			sass: {
				files: ['assets/scss/**/*.scss'],
				tasks: ['sass', 'cssmin'],
				options: {
					livereload: true
				}
			},
			js: {
				files: ['assets/js/theme.js'],
				tasks: ['jshint'],
				options: {
					livereload: true
				}
			},
			php: {
				files: ['**/*.php'],
				options: {
					livereload: true
				}
			}
		},

		// compile your sass
		sass: {
			dev: {
				options: {
					style: 'expanded',
					livereload: true,
					sourcemap: true
				},
				files: {
					'assets/css/theme.css': [
						'assets/scss/theme.scss'
					]
				}
			}
		},

		cssmin: {
			target: {
				files: {
					'assets/css/theme.min.css': [
						'assets/css/bootstrap.min.css',
						'assets/css/bootstrap.min.css.map',
						'assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
						'assets/css/theme.css'
					]
				},
			},
			my_target: {
				files: {
					'assets/css/theme.css': [
						'assets/css/bootstrap.min.css',
						'assets/css/bootstrap.min.css.map',
						'assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
						'assets/css/theme.css'
					]
				},
			},
			helix_target: {
				files: {
					'../public/css/theme.css': [
						'assets/css/bootstrap.min.css',
						'assets/css/bootstrap.min.css.map',
						'assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
						'assets/css/theme.css'
					]
				},
			}
			
		},

		// JsHint your javascript
		jshint: {
			all: [
				'assets/js/theme.js'
			],
			options: {
				asi: true,
				browser: true,
				curly: false,
				eqeqeq: false,
				eqnull: true,
				expr: true,
				immed: true,
				newcap: true,
				noarg: true,
				smarttabs: true,
				sub: true,
				undef: false,
				loopfunc: true
			}
		},

	});

	// Load NPM's via matchdep
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Default task
	grunt.registerTask('default', ['watch']);

	// Build task
	grunt.registerTask('build', [
		'jshint',
		'sass',
		'cssmin'
	]);

};
