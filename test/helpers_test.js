describe("Helpers", function() {
  var subject;
  beforeEach(function() {
    subject = new SmParser.Helpers();
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
});
