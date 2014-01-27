module SmParser {
  export class Measure extends Collection {
    constructor(notesPerRow: number, measure: string) {
      super(SmParser.Note);
      this.values = [];
      var notesRegex = new RegExp(".{"+notesPerRow+"}", "g");
      var noteRows = measure.match(notesRegex);
      for(var i = 0; i < noteRows.length; i++) {
        var row = [];
        var rowString = noteRows[i];
        for(var j = 0; j < rowString.length; j++) {
          row.push(new Note(rowString[j], i, j));
        }
        this.values.push(row);
      }
    }

    resolution() {
      return 1 / this.values.length;
    }

    isValid() {
      for(var i = 0; i < this.values.length; i++) {
        var row = this.values[i];
        for(var j = 0; j < row.length; j++) {
          if(!row[j].isValid()) {
            return false;
          }
        }
      }
      return true;
    }

    asJson() {
      var json = [];
      for(var i = 0; i < this.values.length; i++) {
        var row = this.values[i];
        for(var j = 0; j < row.length; j++) {
          json.push(row[j].asJson());
        }
      }
      return json;
    }
  }
}
