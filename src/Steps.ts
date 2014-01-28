module SmParser {
  export class Steps {
    stepsMetadata: IStepsMetadata;
    steps: any;

    constructor(public stepsString: string) {
      this.stepsString = Helpers.preprocessSongFile(stepsString);
      this.initializeStepsMetadata();
      this.initializeSteps();
    }

    asJson() {
      return {
        metadata: this.stepsMetadata.asJson(),
        steps: Helpers.map(this.steps, (song) => {
          return song.asJson();
        })
      }
    }

    isValid() {
      return this.stepsMetadata.isValid() && Helpers.all(this.steps, (song) => {
        return song.isValid();
      });
    }

    private initializeStepsMetadata() {
      var stepMetadataString = this.stepsString.split(/#NOTES/)[0];
      this.stepsMetadata = new StepsMetadata(stepMetadataString);
    }

    private initializeSteps() {
      this.steps = [];
      var songs = this.stepsString.split(/#NOTES:/);
      songs.shift();
      for(var i = 0; i < songs.length; i++) {
        this.steps.push(new Song(songs[i]));
      }
    }
  }
}
