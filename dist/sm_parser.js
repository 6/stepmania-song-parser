var SmParser;
(function (SmParser) {
    var SongMetadata = (function () {
        function SongMetadata(metadata) {
            this.metadata = metadata;
            this.MetadataLineRegex = new RegExp('#([a-z]+):([^;]+)?;$', 'i');
            this.NumericMetadata = ['offset', 'samplestart', 'samplelength'];
            this.StringMetadata = ['title', 'subtitle', 'artist', 'titletranslit', 'subtitletranslit', 'artisttranslit', 'genre', 'credit', 'banner', 'background', 'lyricspath', 'cdtitle', 'music'];
            var metadataLines = metadata.split("\n");

            for (var i = 0; i < metadataLines.length; i++) {
                this.setMetadataProperty(metadataLines[i]);
            }
        }
        SongMetadata.prototype.isValid = function () {
            return true;
        };

        SongMetadata.prototype.setMetadataProperty = function (metadataLine) {
            var metadataMatches = metadataLine.match(this.MetadataLineRegex);
            if (!metadataMatches) {
                return;
            }
            var propertyName = metadataMatches[1];
            var propertyValue = metadataMatches[2];
            if (!propertyName || !propertyValue) {
                return;
            }
            propertyName = propertyName.toLocaleLowerCase();

            if (this.StringMetadata.indexOf(propertyName) >= 0) {
                this[propertyName] = propertyValue;
            } else if (this.NumericMetadata.indexOf(propertyName) >= 0) {
                var numericPropertyValue = parseFloat(propertyValue);
                if (!isNaN(numericPropertyValue)) {
                    this[propertyName] = numericPropertyValue;
                }
            } else {
            }
        };
        return SongMetadata;
    })();
    SmParser.SongMetadata = SongMetadata;
})(SmParser || (SmParser = {}));
