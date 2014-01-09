module SmParser {
  export class Notes extends Collection {
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

    constructor(public data: string) {
      super(SmParser.Note);
      // TODO strip all comments before all parsing
      var noteSections = data.split(/:/gm);


      this.values = this.parseNotes(noteSections[noteSections.length - 1]);
    }

    private parseNotes(rawNotesData: string) {

    }
  }
}
