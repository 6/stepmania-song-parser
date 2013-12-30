describe("BackgroundChange", function() {
  context("with valid properties", function() {
    var subject;
    beforeEach(function() {
      subject = new SmParser.BackgroundChange("48.000", "bg.jpg");
    });

    it("converts properties correctly", function() {
      expect(subject.beat).toEqual(48);
      expect(subject.value).toEqual("bg.jpg");
    });

    it("returns `true` for #isValid", function() {
      expect(subject.isValid()).toBe(true);
    });
  });

  context("with invalid properties", function() {
    it("returns `false` for #isValid", function() {
      var subject = new SmParser.BackgroundChange(null, "bg.jpg");
      expect(subject.isValid()).toBe(false);

      subject = new SmParser.BackgroundChange("48", " ");
      expect(subject.isValid()).toBe(false);
    });
  });
});
