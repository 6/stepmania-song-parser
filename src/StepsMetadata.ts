module SmParser {
  export interface IStepsMetadata {
    isValid(): boolean;
    asJson(): any;
    title: string;
    subtitle: string;
    artist: string;
    titletranslit: string;
    subtitletranslit: string;
    artisttranslit: string;
    genre: string;
    credit: string;
    banner: string;
    background: string;
    lyricspath: string;
    cdtitle: string;
    music: string;
    offset: number;
    samplestart: number;
    samplelength: number;
    selectable: boolean;
    bgchanges: any;
    displaybpm: any;
    stops: any;
    bpms: any;
  }

  export class StepsMetadata implements IStepsMetadata {
    title: string;
    subtitle: string;
    artist: string;
    titletranslit: string;
    subtitletranslit: string;
    artisttranslit: string;
    genre: string;
    credit: string;
    banner: string;
    background: string;
    lyricspath: string;
    cdtitle: string;
    music: string;
    offset: number;
    samplestart: number;
    samplelength: number;
    selectable: boolean;
    bgchanges: any;
    displaybpm: any;
    stops: any;
    bpms: any;

    MetadataSectionRegex = new RegExp('#[^;]+;', 'g');
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
    RequiredFields = [
      'title', 'offset', 'samplestart', 'selectable'
    ];

    constructor(public metadata: string) {
      var metadataSections = metadata.match(this.MetadataSectionRegex);
      for(var i = 0; i < metadataSections.length; i++) {
        this.setMetadataProperty(metadataSections[i]);
      }
    }

    isValid() {
      for(var key in this.CollectionMetadata) {
        if (Helpers.isPresent(this[key]) && !this[key].isValid()) {
          return false;
        }
      }
      return Helpers.all(this.RequiredFields, (field) => {
        return Helpers.isPresent(this[field]);
      });
    }

    beatsPerSecond(beat: number) {
      var sortedBpms = this.bpms.values.sort(function(a, b) {
        return a.beat - b.beat;
      });
      for(var i = 0; i < sortedBpms.length; i++) {
        if (sortedBpms[i].beat <= beat) {
          return sortedBpms[i].value;
        }
      }
      return sortedBpms[0].value;
    }

    asJson() {
      var json = {
        title: this.title,
        subtitle: this.subtitle,
        artist: this.artist,
        titletranslit: this.titletranslit,
        subtitletranslit: this.subtitletranslit,
        artisttranslit: this.artisttranslit,
        genre: this.genre,
        credit: this.credit,
        banner: this.banner,
        background: this.background,
        lyricspath: this.lyricspath,
        cdtitle: this.cdtitle,
        music: this.music,
        offset: this.offset,
        samplestart: this.samplestart,
        samplelength: this.samplelength,
        selectable: this.selectable
      }
      for(var key in this.CollectionMetadata) {
        if (Helpers.isPresent(this[key])) {
          json[key] = this[key].asJson();
        }
      }
      return json;
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
