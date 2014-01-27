module SmParser {
  export class Steps {
    songMetadata: ISongMetadata;
    notes: any;

    constructor(public songString: string) {
      this.songString = Helpers.preprocessSongFile(songString);
      this.initializeSongMetadata();
      this.initializeNotes();
    }

    asJson() {
      var notesJson = [];
      for(var i = 0; i < this.notes.length; i++) {
        notesJson.push(this.notes[i].asJson());
      }
      return {
        metadata: this.songMetadata.asJson(),
        notes: Helpers.map(this.notes, (noteRows) => {
          return noteRows.asJson();
        })
      }
    }

    isValid() {
      return this.songMetadata.isValid() && Helpers.all(this.notes, (noteRows) => {
        return noteRows.isValid();
      });
    }

    private initializeSongMetadata() {
      var songMetadataString = this.songString.split(/#NOTES/)[0];
      this.songMetadata = new SongMetadata(songMetadataString);
    }

    private initializeNotes() {
      this.notes = [];
      var notesSections = this.songString.split(/#NOTES:/);
      notesSections.shift();
      for(var i = 0; i < notesSections.length; i++) {
        this.notes.push(new Song(notesSections[i]));
      }
    }
  }
}
