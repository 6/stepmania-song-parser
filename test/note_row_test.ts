describe("NoteRow", function() {
  context("for a valid set of notes that isn't empty", function() {
    var subject;
    beforeEach(function() {
      subject = new SmParser.NoteRow("10M2");
    });

    it("parses the notes correctly", function() {
      expect(subject.left.type).toEqual("TapNote");
      expect(subject.down.type).toEqual("NoNote");
      expect(subject.up.type).toEqual("Mine");
      expect(subject.right.type).toEqual("HoldBeginNote");
    });

    it("returns `true` for #isValid", function() {
      expect(subject.isValid()).toBe(true);
    });

    it("returns `false` for #isEmpty", function() {
      expect(subject.isEmpty()).toBe(false);
    });
  });

  context("with invalid properties", function() {
    it("returns `false` for #isValid", function() {
      var subject = new SmParser.NoteRow("10X0");
      expect(subject.isValid()).toBe(false);

      subject = new SmParser.NoteRow(null);
      expect(subject.isValid()).toBe(false);
    });
  });

  context("for an empty row", function() {
    var subject;
    beforeEach(function() {
      subject = new SmParser.NoteRow("0000");
    });

    it("returns `true` for #isValid", function() {
      expect(subject.isValid()).toBe(true);
    });

    it("returns `true` for #isEmpty", function() {
      expect(subject.isEmpty()).toBe(true);
    });
  });
});
