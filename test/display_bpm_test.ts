describe("DisplayBpm", function() {
  context("with valid properties", function() {
    var subject;
    beforeEach(function() {
      subject = new SmParser.DisplayBpm("320.123");
    });

    it("converts properties correctly", function() {
      expect(subject.value).toEqual(320.123);
    });

    it("returns `true` for #isValid", function() {
      expect(subject.isValid()).toBe(true);
    });

    it("return `false for #isRandom", function() {
      expect(subject.isRandom()).toBe(false);
    });
  });

  context("with a random display bpm", function() {
    var subject;
    beforeEach(function() {
      subject = new SmParser.DisplayBpm("*");
    });

    it("doesn't set a value", function() {
      expect(subject.value).toBeFalsy();
    });

    it("returns `true` for #isValid", function() {
      expect(subject.isValid()).toBe(true);
    });

    it("return `true` for #isRandom", function() {
      expect(subject.isRandom()).toBe(true);
    });
  });

  context("with invalid properties", function() {
    it("returns `false` for #isValid", function() {
      var subject = new SmParser.DisplayBpm(null);
      expect(subject.isValid()).toBe(false);

      subject = new SmParser.DisplayBpm("NaN");
      expect(subject.isValid()).toBe(false);
    });
  });
});
