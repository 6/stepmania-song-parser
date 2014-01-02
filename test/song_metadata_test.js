describe("SongMetadata", function() {
  describe("initialization", function() {
    it("sets the properties correctly", function() {
      var subject = new SmParser.SongMetadata(SongFixtures["nipponegaohyakkei_song_metadata.sm"]);

      expect(subject.title).toEqual("Nippon Egao Hyakkei");
      expect(subject.subtitle).toEqual("Joshiraku ED (2012)");
      expect(subject.artist).toEqual("Momokurotei Ichimon");
      expect(subject.titletranslit).toBeFalsy();
      expect(subject.subtitletranslit).toBeFalsy();
      expect(subject.artisttranslit).toBeFalsy();
      expect(subject.genre).toBeFalsy();
      expect(subject.credit).toEqual("Yume");
      expect(subject.banner).toEqual("Nippon Egao Hyakkei - bn.png");
      expect(subject.background).toEqual("Nippon Egao Hyakkei - bg.png");
      expect(subject.lyricspath).toBeFalsy();
      expect(subject.cdtitle).toEqual("CDTitle.png");
      expect(subject.music).toEqual("Nippon Egao Hyakkei.mp3");
      expect(subject.offset).toEqual(-0.003);
      expect(subject.samplestart).toEqual(50.603);
      expect(subject.samplelength).toEqual(12.3);
      expect(subject.selectable).toBe(true);
      expect(subject.bgchanges.values.length).toEqual(3);
      expect(subject.displaybpm.values.length).toEqual(3);
      expect(subject.stops.values.length).toEqual(52);
      expect(subject.bpms.values.length).toEqual(10);
    });
  });
});
