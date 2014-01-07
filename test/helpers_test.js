describe("Helpers", function() {
  var subject;
  beforeEach(function() {
    subject = SmParser.Helpers;
  });

  describe("#trim", function() {
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

  describe("#presence", function() {
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

  describe("#isPresent", function() {
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
});
