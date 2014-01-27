describe("Song", () => {
  it("parses metadata correctly", () => {
    var subject = new SmParser.Song(SongFixtures['leafticket_notes.sm']);

    expect(subject.notesType).toEqual("dance-single");
    expect(subject.description).toBe("YS Novice-Intermedia");
    expect(subject.difficultyClass).toEqual("beginner");
    expect(subject.difficultyMeter).toEqual(5);
    expect(subject.radarValueVoltage).toEqual(0.343);
    expect(subject.radarValueStream).toEqual(0.343);
    expect(subject.radarValueChaos).toEqual(0.362);
    expect(subject.radarValueFreeze).toEqual(0.167);
    expect(subject.radarValueAir).toEqual(0.036);
  });
});
