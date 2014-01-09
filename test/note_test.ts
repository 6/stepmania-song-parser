describe("Note", function() {
  context("with a valid note character", function() {
    it("parses the character correctly", function() {
      var subject = new SmParser.Note("0");
      expect(subject.type).toEqual("NoNote");

      subject = new SmParser.Note("1");
      expect(subject.type).toEqual("TapNote");

      subject = new SmParser.Note("2");
      expect(subject.type).toEqual("HoldBeginNote");

      subject = new SmParser.Note("3");
      expect(subject.type).toEqual("HoldEndNote");

      subject = new SmParser.Note("4");
      expect(subject.type).toEqual("RollBeginNote");

      subject = new SmParser.Note("M");
      expect(subject.type).toEqual("Mine");

      subject = new SmParser.Note("L");
      expect(subject.type).toEqual("Lift");

      subject = new SmParser.Note("F");
      expect(subject.type).toEqual("Fake");
    });

    it("returns `true` for #isValid", function() {
      var subject = new SmParser.Note("1");
      expect(subject.isValid()).toBe(true);
    });
  });

  context("with invalid properties", function() {
    it("returns `false` for #isValid", function() {
      var subject = new SmParser.Note("X");
      expect(subject.isValid()).toBe(false);

      subject = new SmParser.Note(null);
      expect(subject.isValid()).toBe(false);
    });
  });
});
