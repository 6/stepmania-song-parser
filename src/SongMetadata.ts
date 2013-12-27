module SmParser {
  export interface ISongMetadata {
    isValid(): boolean;
  }

  export class SongMetadata implements ISongMetadata {
    MetadataLineRegex = new RegExp('#([a-z]+):([^;]+)?;$', 'i');
    NumericMetadata = ['offset', 'samplestart', 'samplelength'];
    StringMetadata = ['title', 'subtitle', 'artist', 'titletranslit', 'subtitletranslit', 'artisttranslit', 'genre', 'credit', 'banner', 'background', 'lyricspath', 'cdtitle', 'music']

    constructor(public metadata: string) {
      var metadataLines = metadata.split("\n");
      // TODO - normalize multi-line properties
      for(var i = 0; i < metadataLines.length; i++) {
        this.setMetadataProperty(metadataLines[i]);
      }
    }

    isValid() {
      return true; // TODO - implement
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
      else {
        // TODO - handle complex properties here
      }
    }
  }
}
