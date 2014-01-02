module SmParser {
  export interface ISongMetadata {
    helpers: IHelpers;
    isValid(): boolean;
  }

  export class SongMetadata implements ISongMetadata {
    helpers: IHelpers;

    MetadataSectionRegex = new RegExp('#[^;]+;', 'gm');
    MetadataLineRegex = new RegExp('#([a-z]+):([^;]+)?;$', 'i');
    NumericMetadata = ['offset', 'samplestart', 'samplelength'];
    StringMetadata = ['title', 'subtitle', 'artist',
      'titletranslit', 'subtitletranslit', 'artisttranslit',
      'genre', 'credit', 'banner', 'background',
      'lyricspath', 'cdtitle', 'music'];
    CollectionMetadata = {
      'bgchanges': SmParser.BackgroundChange,
      'bpms': SmParser.Bpm,
      'displaybpm': SmParser.DisplayBpm,
      'stops': SmParser.Stop
    };

    constructor(public metadata: string) {
      this.helpers = new SmParser.Helpers();
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
        metadataLines[i] = this.helpers.trim(metadataLines[i]);
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
      else if (this.CollectionMetadata[propertyName]) {
        var model = this.CollectionMetadata[propertyName];
        this[propertyName] = new SmParser.BeatMetadataCollection(model, propertyValue);
      }
      else if (propertyName === "selectable") {
        // Default value should be `true`
        this[propertyName] = propertyValue !== "NO";
      }
    }
  }
}
