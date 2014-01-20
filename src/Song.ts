module SmParser {
  export class Song {
    songMetadata: ISongMetadata;

    constructor(public songString: string) {
      this.songString = Helpers.preprocessSongFile(songString);
      this.initializeSongMetadata();
    }

    asJson() {
      return {
        metadata: this.songMetadata.asJson()
      }
    }

    isValid() {
      return this.songMetadata.isValid();
    }

    private initializeSongMetadata() {
      var songMetadataString = this.songString.split(/#NOTES/)[0];
      this.songMetadata = new SongMetadata(songMetadataString);
    }
  }
}
