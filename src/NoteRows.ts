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

      this.values = this.parseNotes(noteSections[noteSections.length - 1]);
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
        radarValueAir: this.radarValueAir
      }
    }

    isValid() {
      return true; // TODO - implement
    }

    // TODO - refactor this method, it's way too complex
    private parseNotes(rawNotesData: string) {
      var measures = rawNotesData.split(/,/g);
      var notes = [];
      var notesPerRow = this.NotesPerRow[this.notesType];
      var notesRegex = new RegExp(".{"+notesPerRow+"}", "g");
      var holdBeginTime, currentTime;

      for(var noteIndex = 0; noteIndex < notesPerRow; noteIndex++) {
        currentTime = 0;
        for(var measureIndex = 0; measureIndex < measures.length; measureIndex++) {
          var measure = measures[measureIndex];
          for(var rowIndex = 0; rowIndex < measure.length; rowIndex++) {
            var note = new Note(measure[rowIndex][noteIndex]);
            if (!note.isValid() || note.type === "NoNote") {
              continue;
            }
            if (note.type == "HoldBeginNote") {
              holdBeginTime = Number(currentTime);
              continue;
            }
            var noteData;
            if (note.type == "HoldEndNote") {
              noteData = {
                index: noteIndex,
                type: "Hold",
                time: holdBeginTime,
                duration: currentTime - holdBeginTime
              };
            }
            else {
              noteData = {
                index: noteIndex,
                type: note.type,
                time: currentTime,
                duration: 0
              };
            }
            notes.push(noteData);
          }
          currentTime += (1 / measure.length);
        }
      }

      console.log(notes);

      return notes;
    }
  }
}
