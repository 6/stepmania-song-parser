describe("Song", () => {
  context("leafticket", () => {
    var subject;

    beforeEach(() => {
      subject = new SmParser.Steps(SongFixtures['leafticket.sm']);
    });

    describe("#isValid", () => {
      it("returns true", () => {
        expect(subject.isValid()).toBe(true)
      });
    });

    describe("#asJson", () => {
      it("returns the correct object", () => {
        var json = subject.asJson(),
            expectedJson = SongsAsJson['leafticket.sm'];
        expect(json.metadata).toEqual(expectedJson.metadata);
        expect(json.notes.length).toEqual(expectedJson.notes.length);
      });
    });
  });
});
