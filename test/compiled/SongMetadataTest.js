describe("SongMetadata", function () {
    describe(".fromString", function () {
        it("returns an instance of SongMetadata", function () {
            var subject = window['SongMetadata'].fromString(SongFixtures["nipponegaohyakkei_metadata.sm"]);
            expect(subject instanceof window['SongMetadata']).toBe(true);
        });
    });
});
