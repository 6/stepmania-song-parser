module SmParser {
  export class Song extends Collection {
    notesType: string;
    description: string;
    difficultyClass: string;
    difficultyMeter: number;
    radarValueVoltage: number;
    radarValueStream: number;
    radarValueChaos: number;
    radarValueFreeze: number;
    radarValueAir: number;

    NotesPerRow = {
      'dance-single': 4,
      'dance-double': 8,
      'dance-couple': 8,
      'dance-solo': 6,
      'pump-single': 5,
      'pump-double': 10,
      'pump-couple': 10,
      'ez2-single': 5,
      'ez2-double': 10,
      'ez2-real': 7,
      'para-single': 5
    };

    NoteTypes = Helpers.objectKeys(this.NotesPerRow);

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
      var noteSections = data.split(/:/g);

      this.notesType = noteSections[0];
      if (this.NoteTypes.indexOf(this.notesType) < 0) {
        this.notesType = this.DefaultNoteType;
      }

      this.description = Helpers.trim(noteSections[1]);

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

      this.values = this.parseMeasures(noteSections[noteSections.length - 1]);
    }

    asJson() {
      return {
        notesType: this.notesType,
        description: this.description,
        difficultyClass: this.difficultyClass,
        difficultyMeter: this.difficultyMeter,
        radarValueVoltage: this.radarValueVoltage,
        radarValueStream: this.radarValueStream,
        radarValueChaos: this.radarValueChaos,
        radarValueFreeze: this.radarValueFreeze,
        radarValueAir: this.radarValueAir,
        measures: this.measuresAsJson()
      }
    }

    isValid() {
      return true; // TODO - implement
    }

    private parseMeasures(rawNotesData: string) {
      var measures = rawNotesData.split(/,/g);
      var parsedMeasures = [];
      var notesPerRow = this.NotesPerRow[this.notesType];
      for(var i = 0; i < measures.length; i++) {
        parsedMeasures.push(new Measure(notesPerRow, measures[i]));
      }
      return parsedMeasures;
    }

    private measuresAsJson() {
      var json = [];
      for(var i = 0; i < this.values.length; i ++) {
        json.push(this.values[i].asJson());
      }
      return json;
    }
  }
}
