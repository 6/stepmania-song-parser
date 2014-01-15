module SmParser {
  export class Helpers {
    static trim(value: string) {
      if(!value) return "";
      return String(value).replace(/^\s+|\s+$/g, "");
    }

    static presence(value: any) {
      if (value === null) return;
      if (typeof value === "undefined") return;
      if (String(value).match(/^\s*$/)) return;
      return value;
    }

    static isPresent(value: any) {
      return typeof Helpers.presence(value) !== "undefined";
    }

    static parseInt(value: any, options: any) {
      return Helpers.parseNumber(value, parseInt, options);
    }

    static parseFloat(value: any, options: any) {
      return Helpers.parseNumber(value, parseFloat, options);
    }

    static isNaN(value: any) {
      return !! (!Helpers.isPresent(value) || isNaN(value));
    }

    static parseNumber(value: any,  parseFn: any, options: any) {
      options = options || {};
      if (!Helpers.isPresent(value)) return options.default;

      value = parseFn(value);

      if (Helpers.isNaN(value)) return options.default;
      if (options.min && value < options.min) return options.default;
      if (options.max && value > options.max) return options.default;

      return value;
    }

    static removeComments(song: string) {
      var lines = song.split(/\n/);
      var linesWithoutComments = [];
      for (var i = 0; i < lines.length; i++) {
        var line = lines[i].replace(/\s*\/\/.*$/, "");
        if (Helpers.isPresent(line)) {
          linesWithoutComments.push(line);
        }
      }
      return linesWithoutComments.join("\n");
    }

    // Run this only after stripping all comments
    static flattenSongFile(song: string) {
      var lines = song.split(/\n/);
      var flattenedLines = [];
      for (var i = 0; i < lines.length; i++) {
        var line = Helpers.trim(lines[i]);
        if (Helpers.isPresent(line)) {
          flattenedLines.push(line);
        }
      }
      return flattenedLines.join("");
    }

    static preprocessSongFile(song: string) {
      song = Helpers.removeComments(song);
      return Helpers.flattenSongFile(song);
    }
  }
}
