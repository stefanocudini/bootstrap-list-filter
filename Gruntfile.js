'use strict';

module.exports = function(grunt) {

grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	meta: {
		banner:
		'/* \n'+
		' * <%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> \n'+
		' * \n'+
		' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> \n'+
		' * <%= pkg.author.email %> \n'+
		' * <%= pkg.author.url %> \n'+
		' * \n'+
		' * Licensed under the <%= pkg.license %> license. \n'+
		' * \n'+
		' * Demos: \n'+
		' * <%= pkg.homepage %> \n'+
		' * \n'+
		' * Source: \n'+
		' * <%= pkg.repository.url %> \n'+
		' * \n'+
		' */\n'
	},
	clean: {
		dist: {
			src: ['index.html','bootstrap-list-filter.min.js']
		}
	},
	jshint: {
		options: {
			globals: {
				console: true,
				module: true
			},
			"-W099": true,	//ignora tabs e space warning
			"-W033": true,
			"-W044": true	//ignore regexp
		},
		files: ['bootstrap-list-filter.src.js']
	},
	uglify: {
		options: {
			banner: '<%= meta.banner %>'
		},
		dist: {
			files: {
				'bootstrap-list-filter.min.js': ['bootstrap-list-filter.src.js']
			}
		}
	},
	markdown: {
		readme: {
			files: {
				'index.html': ['README.md']
			},
			options: {
				template: 'index.tmpl.html',
				templateContext: function() {
					var cfg = grunt.config();
					cfg.title = cfg.pkg.name.replace(/-/g,' ');
					cfg.ribbonurl = 'http://ghbtns.com/github-btn.html?user=stefanocudini&amp;repo='+cfg.pkg.name+'&amp;type=watch&amp;count=true';
					cfg.giturl = 'https://github.com/stefanocudini/'+cfg.pkg.name;
					cfg.biturl = 'https://bitbucket.org/zakis_/'+cfg.pkg.name;
					cfg.npmurl = 'https://npmjs.org/package/'+cfg.pkg.name;
					cfg.atmurl = 'http://atmospherejs.com/package/'+cfg.pkg.name;
					cfg.examples = grunt.file.expand('examples/*.html');
					cfg.image = grunt.file.expand('images/'+cfg.pkg.name+'.png');
					//console.log(cfg);
					return cfg;
				},
				markdownOptions: {
					gfm: true,
					highlight: 'manual',
					codeLines: {
						before: '<div>',
						after: '</div>'
					}
				}
			}			
		}
	}
});

grunt.registerTask('default', [
	'clean',
	'jshint',
	'uglify',
	'markdown'
]);

grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-markdown');
};