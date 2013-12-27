describe("SongMetadata", function() {
  describe(".fromString", function() {
    it("returns an instance of SongMetadata", function() {
      var subject = SmParser.SongMetadata.fromString(SongFixtures["nipponegaohyakkei_metadata.sm"]);
      expect(subject instanceof SmParser.SongMetadata).toBe(true);
    });
  });
});
