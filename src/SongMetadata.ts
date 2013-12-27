module SmParser {
  export interface ISongMetadata {
    title: string;
    subtitle?: string;
    artist: string;
    isValid(): boolean;
  }

  export class SongMetadata implements ISongMetadata {
    constructor(public title: string,
                public artist: string,
                public subtitle?: string) {
    }

    static fromString(metadata: string) {
      // TODO - parse string here
      return new SongMetadata("Song title", "Song artist");
    }

    isValid() {
      return true; // TODO - implement
    }
  }
}
