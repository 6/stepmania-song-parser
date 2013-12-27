var fs = require('fs'),
    glob = require('glob');

module.exports = function(grunt) {
  var wrapJS = function(jsString) {
    return "(function() { "+ jsString +" })();\n";
  };

  grunt.registerTask('songFixturesToJs', function() {
    var fixturePaths = glob.sync('test/fixtures/**/*.sm');
    var fixtures = {};
    for (var i = 0; i < fixturePaths.length; i++) {
      var fixtureString = grunt.file.read(fixturePaths[i]);
      var fixturePathParts = fixturePaths[i].split("/");
      var fixtureName = fixturePathParts[fixturePathParts.length - 1];
      fixtures[fixtureName] = fixtureString;
    }
    var fixturesJs = wrapJS("window.SongFixtures = " + JSON.stringify(fixtures));
    fs.writeFileSync('test/fixtures/song_fixtures.js', fixturesJs, 'utf-8', {flags: 'w+'});
  });

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    ts: {
      options: {
        compile: true,
        comments: false,
        target: 'es3',
        module: 'amd',
        sourceMap: false,
        declaration: false
      },
      code: {
        src: ["src/**/*.ts"],
        out: "dist/sm_parser.dev.js"
      }
    },

    uglify: {
      code: {
        files: {
          'dist/sm_parser.js': ['dist/sm_parser.dev.js']
        },
        options: {
          compress: true,
          mangle: false,
          preserveComments: false
        }
      }
    },

    watch: {
      code: {
        files: ['src/**/*.ts'],
        tasks: ['ts:code', 'uglify']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-ts');

  grunt.registerTask('compileTs', ['ts:code', 'uglify']);
  grunt.registerTask('default', ['compileTs', 'watch']);
};
