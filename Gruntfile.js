module.exports = function (grunt) {

	var npmDependencies = require('./package.json').devDependencies;

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		// Copy fonts
		copy: {
			options: {
				mode: '0644',
			},
			'font-awesome': {
				expand: true,
				filter: 'isFile',
				cwd: 'node_modules/font-awesome/fonts/',
				src: ['**/*'],
				dest: 'assets/fonts/',
			},
		},

		// JsHint rules
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

		// Concat and minify JS
		uglify: {
			dist: {
				files: {
					'assets/js/vendors.min.js': [
						'node_modules/fastclick/lib/fastclick.js',
					],
					'assets/js/theme.min.js': [
						'node_modules/bootstrap/dist/js/bootstrap.min.js',
						'assets/js/theme.js',
					]
				}
			}
		},

		// Compile Sass and minify CSS
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
						'assets/css/theme.css'
					]
				},
			},
		},

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
				tasks: ['jshint', 'uglify'],
				options: {
					livereload: true
				}
			},
		},

	});

	// Load NPM's via matchdep
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Default task
	grunt.registerTask('default', ['watch']);

	// Build task
	grunt.registerTask('build', [
		'copy',
		'jshint',
		'sass',
		'cssmin',
		'uglify'
	]);

};
