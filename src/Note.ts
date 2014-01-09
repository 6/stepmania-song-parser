module SmParser {
  export interface INote {
    type: string;
    isValid(): boolean;
  }

  export class Note implements INote {
    NoteTypes = {
      "0": "NoNote",
      "1": "TapNote",
      "2": "HoldBeginNote",
      "3": "HoldEndNote",
      "4": "RollBeginNote",
      "M": "Mine",
      "L": "Lift",
      "F": "Fake"
    }

    type: string;

    constructor(public data: string) {
      if (Helpers.presence(data)) {
        this.type = this.NoteTypes[data.toLocaleUpperCase()];
      }
    }

    isValid() {
      return typeof this.type !== "undefined";
    }
  }
}
