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
};
