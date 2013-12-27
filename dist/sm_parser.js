var SmParser;
(function (SmParser) {
    var SongMetadata = (function () {
        function SongMetadata(metadata) {
            this.metadata = metadata;
            this.MetadataSectionRegex = new RegExp('#[^;]+;', 'gm');
            this.MetadataLineRegex = new RegExp('#([a-z]+):([^;]+)?;$', 'i');
            this.NumericMetadata = ['offset', 'samplestart', 'samplelength'];
            this.StringMetadata = [
                'title', 'subtitle', 'artist',
                'titletranslit', 'subtitletranslit', 'artisttranslit',
                'genre', 'credit', 'banner', 'background',
                'lyricspath', 'cdtitle', 'music'];
            var metadataSections = metadata.match(this.MetadataSectionRegex);
            for (var i = 0; i < metadataSections.length; i++) {
                var normalizedMetadata = this.normalizeMetadata(metadataSections[i]);
                this.setMetadataProperty(normalizedMetadata);
            }
        }
        SongMetadata.prototype.isValid = function () {
            return true;
        };

        SongMetadata.prototype.normalizeMetadata = function (metadataSection) {
            var metadataLines = metadataSection.split("\n");

            for (var i = 0; i < metadataLines.length; i++) {
                metadataLines[i] = metadataLines[i].replace(/\/\/.*$/, "");
                metadataLines[i] = metadataLines[i].replace(/^\s+|\s+$/g, "");
            }
            return metadataLines.join("");
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
            } else if (propertyName === "selectable") {
                this[propertyName] = propertyValue !== "NO";
            }
        };
        return SongMetadata;
    })();
    SmParser.SongMetadata = SongMetadata;
})(SmParser || (SmParser = {}));
