module SmParser {
  export interface ISongMetadata {
    isValid(): boolean;
  }

  export class SongMetadata implements ISongMetadata {
    MetadataSectionRegex = new RegExp('#[^;]+;', 'gm');
    MetadataLineRegex = new RegExp('#([a-z]+):([^;]+)?;$', 'i');
    NumericMetadata = ['offset', 'samplestart', 'samplelength'];
    StringMetadata = ['title', 'subtitle', 'artist',
      'titletranslit', 'subtitletranslit', 'artisttranslit',
      'genre', 'credit', 'banner', 'background',
      'lyricspath', 'cdtitle', 'music'];

    constructor(public metadata: string) {
      var metadataSections = metadata.match(this.MetadataSectionRegex);
      for(var i = 0; i < metadataSections.length; i++) {
        var normalizedMetadata = this.normalizeMetadata(metadataSections[i]);
        this.setMetadataProperty(normalizedMetadata);
      }
    }

    isValid() {
      return true; // TODO - implement
    }

    private normalizeMetadata(metadataSection: string) {
      var metadataLines = metadataSection.split("\n");
      // Remove comments and trim
      for(var i = 0; i < metadataLines.length; i++) {
        metadataLines[i] = metadataLines[i].replace(/\/\/.*$/, "");
        metadataLines[i] = metadataLines[i].replace(/^\s+|\s+$/g, "");
      }
      return metadataLines.join("");
    }

    private setMetadataProperty(metadataLine: string) {
      var metadataMatches = metadataLine.match(this.MetadataLineRegex);
      if(!metadataMatches) {
        return;
      }
      var propertyName = metadataMatches[1];
      var propertyValue = metadataMatches[2];
      if(!propertyName || !propertyValue) {
        return;
      }
      propertyName = propertyName.toLocaleLowerCase();

      if (this.StringMetadata.indexOf(propertyName) >= 0) {
        this[propertyName] = propertyValue;
      }
      else if (this.NumericMetadata.indexOf(propertyName) >= 0) {
        var numericPropertyValue = parseFloat(propertyValue);
        if (!isNaN(numericPropertyValue)) {
          this[propertyName] = numericPropertyValue;
        }
      }
      else if (propertyName === "selectable") {
        // Default value should be `true`
        this[propertyName] = propertyValue !== "NO";
      }
    }
  }
}
