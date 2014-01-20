describe("Song", () => {
  context("leafticket", () => {
    var subject;

    beforeEach(() => {
      subject = new SmParser.Song(SongFixtures['leafticket.sm']);
    });

    describe("#isValid", () => {
      it("returns true", () => {
        expect(subject.isValid()).toBe(true)
      });
    });

    describe("#asJson", () => {
      it("returns the correct object", () => {
        expect(subject.asJson()).toEqual(SongsAsJson['leafticket.sm']);
      });
    });
  });
});
