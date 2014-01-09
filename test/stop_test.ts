describe("Stop", () => {
  context("with valid properties", () => {
    var subject;
    beforeEach(() => {
      subject = new SmParser.Stop("48.000", "320.123");
    });

    it("converts properties correctly", () => {
      expect(subject.beat).toEqual(48);
      expect(subject.value).toEqual(320.123);
    });

    it("returns `true` for #isValid", () => {
      expect(subject.isValid()).toBe(true);
    });
  });

  context("with invalid properties", () => {
    it("returns `false` for #isValid", () => {
      var subject = new SmParser.Stop(null, "130");
      expect(subject.isValid()).toBe(false);

      subject = new SmParser.Stop("48", "-1");
      expect(subject.isValid()).toBe(false);
    });
  });
});
