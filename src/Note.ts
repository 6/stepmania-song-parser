module SmParser {
  export interface INote {
    type: string;
    index: number;
    position: number;
    typeAbbreviation: string;
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
    };

    typeAbbreviation: string;
    type: string;

    constructor(public data: string, public index?: number, public position?: number) {
      if (Helpers.presence(data)) {
        this.typeAbbreviation = data.toLocaleUpperCase();
        this.type = this.NoteTypes[this.typeAbbreviation];
      }
    }

    isValid() {
      return typeof this.type !== "undefined";
    }

    asJson() {
      return {
        type: this.typeAbbreviation,
        index: this.index,
        position: this.position
      };
    }
  }
}
