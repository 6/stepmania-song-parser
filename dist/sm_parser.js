var SmParser;
(function (SmParser) {
    var SongMetadata = (function () {
        function SongMetadata(title, artist, subtitle) {
            this.title = title;
            this.artist = artist;
            this.subtitle = subtitle;
        }
        SongMetadata.fromString = function (metadata) {
            return new SongMetadata("Song title", "Song artist");
        };

        SongMetadata.prototype.isValid = function () {
            return true;
        };
        return SongMetadata;
    })();
    SmParser.SongMetadata = SongMetadata;
})(SmParser || (SmParser = {}));
