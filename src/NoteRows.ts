module SmParser {
  export class NoteRows extends Collection {
    notesType: string;
    description: string;
    difficultyClass: string;
    difficultyMeter: number;
    radarValueVoltage: number;
    radarValueStream: number;
    radarValueChaos: number;
    radarValueFreeze: number;
    radarValueAir: number;

    NoteTypes = [
      'dance-single',
      'dance-double',
      'dance-couple',
      'dance-solo',
      'pump-single',
      'pump-double',
      'pump-couple',
      'ez2-single',
      'ez2-double',
      'ez2-real',
      'para-single'
    ];

    DifficultyClasses = [
      "beginner",
      "easy",
      "medium",
      "hard",
      "challenge"
    ];

    DefaultNoteType = 'dance-single';
    DefaultDifficultyClass = 'beginner';
    DefaultDifficultyMeter = 1;
    DefaultRadarValue = 1;

    constructor(public data: string) {
      super(SmParser.Note);
      // TODO strip all comments before all parsing
      var noteSections = data.split(/:/gm);
      if (noteSections[0].match(/^#NOTES/)) {
        noteSections.shift();
      }

      this.notesType = noteSections[0];
      if (this.NoteTypes.indexOf(this.notesType) < 0) {
        this.notesType = this.DefaultNoteType;
      }

      this.description = noteSections[1];

      this.difficultyClass = noteSections[2];
      if (this.DifficultyClasses.indexOf(this.difficultyClass) < 0) {
        this.difficultyClass = this.DefaultDifficultyClass;
      }

      this.difficultyMeter = Helpers.parseInt(noteSections[3], {default: this.DefaultDifficultyMeter});

      var radars = noteSections[4].split(/,/gm);
      this.radarValueVoltage = Helpers.parseFloat(radars[0], {default: this.DefaultRadarValue});
      this.radarValueStream = Helpers.parseFloat(radars[1], {default: this.DefaultRadarValue});
      this.radarValueChaos = Helpers.parseFloat(radars[2], {default: this.DefaultRadarValue});
      this.radarValueFreeze = Helpers.parseFloat(radars[3], {default: this.DefaultRadarValue});
      this.radarValueAir = Helpers.parseFloat(radars[4], {default: this.DefaultRadarValue});

      this.values = this.parseNotes(noteSections[noteSections.length - 1]);
    }

    private parseNotes(rawNotesData: string) {

    }
  }
}
