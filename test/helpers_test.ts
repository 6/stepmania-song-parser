describe("Helpers", function() {
  var subject;
  beforeEach(function() {
    subject = SmParser.Helpers;
  });

  describe(".trim", function() {
    it("trims the whitespace surrounding a string", function() {
      expect(subject.trim("  abc  ")).toEqual("abc");
      expect(subject.trim("abc  ")).toEqual("abc");
      expect(subject.trim(" abc")).toEqual("abc");
      expect(subject.trim("  ")).toEqual("");
      expect(subject.trim("")).toEqual("");
    });

    it("returns empty string for falsy values", function() {
      expect(subject.trim(undefined)).toEqual("");
      expect(subject.trim(false)).toEqual("");
    });
  });

  describe(".presence", function() {
    it("returns the value if present", function() {
      expect(subject.presence("abc")).toEqual("abc");
      expect(subject.presence(false)).toEqual(false);
      expect(subject.presence(123.45)).toEqual(123.45);
    });

    it("returns `undefined` if not present", function() {
      expect(subject.presence("")).toBe(undefined);
      expect(subject.presence("   ")).toBe(undefined);
      expect(subject.presence(null)).toBe(undefined);
      expect(subject.presence(undefined)).toBe(undefined);
    });
  });

  describe(".isPresent", function() {
    it("returns true if present", function() {
      expect(subject.isPresent("abc")).toBe(true);
      expect(subject.isPresent(false)).toBe(true);
      expect(subject.isPresent(123.45)).toBe(true);
    });

    it("returns false if not present", function() {
      expect(subject.isPresent("")).toBe(false);
      expect(subject.isPresent("   ")).toBe(false);
      expect(subject.isPresent(null)).toBe(false);
      expect(subject.isPresent(undefined)).toBe(false);
    });
  });

  describe(".map", () => {
    it("applies the callback function to each element in the list", () => {
      var values = subject.map([1, 2, 3], (value) => {
        return value * 2;
      });
      expect(values).toEqual([2, 4, 6]);
    });
  });

  describe(".all", () => {
    it("returns true if the callback function returns true for all values, and false if it does not", () => {
      var areAllEven = subject.all([2, 6, 4], (value) => {
        return value % 2 == 0;
      });
      expect(areAllEven).toBe(true);

      var areAllEven = subject.all([2, 3, 4], (value) => {
        return value % 2 == 0;
      });
      expect(areAllEven).toBe(false);
    });
  });

  describe(".isNaN", () => {
    it("works better than the native isNaN", () => {
      expect(subject.isNaN(undefined)).toBe(true);
      expect(subject.isNaN("")).toBe(true);
      expect(subject.isNaN("NaN")).toBe(true);
      expect(subject.isNaN(null)).toBe(true);
      expect(subject.isNaN("a1bc")).toBe(true);

      expect(subject.isNaN(123)).toBe(false);
      expect(subject.isNaN(0)).toBe(false);
      expect(subject.isNaN(0.123)).toBe(false);
    });
  });

  describe("number parsing methods", () => {
    it("returns the default value for a non-number", () => {
      expect(subject.parseFloat("NaN")).toEqual(undefined);
      expect(subject.parseFloat("NaN", {default: 123})).toEqual(123);
      expect(subject.parseInt(null, {default: 123})).toEqual(123);
      expect(subject.parseInt(true, {default: 123})).toEqual(123);
    });

    it('returns the default value if value exceeds min/max bounds', () => {
      expect(subject.parseFloat("456.78", {max: 456, default: 123})).toEqual(123);
      expect(subject.parseInt(456, {max: 500, min: 470})).toEqual(undefined);
    });

    it("returns the parsed number value for a number", () => {
      expect(subject.parseFloat("456.78", {default: 123})).toEqual(456.78);
      expect(subject.parseInt(456, {default: 123})).toEqual(456);
      expect(subject.parseInt("0", {default: 123, min: -1, max: 1})).toEqual(0);
      expect(subject.parseFloat("0.123", {default: 123})).toEqual(0.123);
    });
  });

  describe(".removeComments", () => {
    it("strips all comments from the given string", () => {
      expect(subject.removeComments("// comment blah")).toEqual("");
      expect(subject.removeComments("not comment // comment blah")).toEqual("not comment");
      expect(subject.removeComments("not a comment // comment blah\n//another comment\nno comment\n//")).toEqual("not a comment\nno comment");
    });
  });

  describe(".flattenSongFile", () => {
    it("removes all extraneous spaces and newline characters", () => {
      expect(subject.flattenSongFile("#NOTES:\n\tdance-single:\n   :\nEasy:0001\n,\n2021")).toEqual("#NOTES:dance-single::Easy:0001,2021");
    });
  });

  describe(".preprocessSongFile", () => {
    it("removes comments and flattens the song file", () => {
      expect(subject.preprocessSongFile(SongFixtures['leafticket.sm'])).toEqual(SongFixtures['leafticket_flattened.sm']);
    });
  });
});
