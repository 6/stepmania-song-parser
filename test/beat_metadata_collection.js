describe("BeatMetadataCollection", function() {
  var subject;

  context("BPM", function() {
    beforeEach(function() {
      var bpmFixture = "0.000=160.000,48.456=320.123";
      subject = new SmParser.BeatMetadataCollection(SmParser.Bpm, bpmFixture);
    });

    it("parses the values correctly", function() {
      expect(subject.size()).toEqual(2);

      expect(subject.at(0).beat).toEqual(0);
      expect(subject.at(0).value).toEqual(160);

      expect(subject.at(1).beat).toEqual(48.456);
      expect(subject.at(1).value).toEqual(320.123);
    });
  });

  context("Stop", function() {
    beforeEach(function() {
      var stopFixture = "194.000=1.000 , 194.500=0.094";
      subject = new SmParser.BeatMetadataCollection(SmParser.Stop, stopFixture);
    });

    it("parses the values correctly", function() {
      expect(subject.size()).toEqual(2);

      expect(subject.at(0).beat).toEqual(194);
      expect(subject.at(0).value).toEqual(1);

      expect(subject.at(1).beat).toEqual(194.5);
      expect(subject.at(1).value).toEqual(0.094);
    });
  });

  context("BackgroundChange", function() {
    beforeEach(function() {
      var bgFixture = "-1.000=Opening.avi=1.000=1=0=0, 99999=-nosongbg-=1.000=0=0=0";
      subject = new SmParser.BeatMetadataCollection(SmParser.BackgroundChange, bgFixture);
    });

    it("parses the values correctly", function() {
      expect(subject.size()).toEqual(2);

      expect(subject.at(0).beat).toEqual(-1);
      expect(subject.at(0).value).toEqual("Opening.avi");

      expect(subject.at(1).beat).toEqual(99999);
      expect(subject.at(1).value).toEqual("-nosongbg-");
    });
  });

  context("DisplayBpm", function() {
    beforeEach(function() {
      var displayBpmFixture = "180.000:120.000:*";
      subject = new SmParser.BeatMetadataCollection(SmParser.DisplayBpm, displayBpmFixture);
    });

    it("parses the values correctly", function() {
      expect(subject.size()).toEqual(3);

      expect(subject.at(0).value).toEqual(180);
      expect(subject.at(0).isRandom()).toBe(false);

      expect(subject.at(1).value).toEqual(120);
      expect(subject.at(1).isRandom()).toBe(false);

      expect(subject.at(2).value).toBeFalsy();
      expect(subject.at(2).isRandom()).toBe(true);
    });
  });
});
