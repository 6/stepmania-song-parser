describe("Bpm", function() {
  context("with valid properties", function() {
    var subject;
    beforeEach(function() {
      subject = new SmParser.Bpm("48.000", "320.123");
    });

    it("converts properties correctly", function() {
      expect(subject.beat).toEqual(48);
      expect(subject.value).toEqual(320.123);
    });

    it("returns `true` for #isValid", function() {
      expect(subject.isValid()).toBe(true);
    });
  });

  context("with invalid properties", function() {
    it("returns `false` for #isValid", function() {
      var subject = new SmParser.Bpm(null, "130");
      expect(subject.isValid()).toBe(false);

      subject = new SmParser.Bpm("-1", "130");
      expect(subject.isValid()).toBe(false);
    });
  });
});
