module SmParser {
  export interface INoteRow {
    left: Note;
    down: Note;
    up: Note;
    right: Note;
    isValid(): boolean;
    isEmpty(): boolean;
  }

  export class NoteRow implements INoteRow {
    left: Note;
    down: Note;
    up: Note;
    right: Note;

    constructor(data: string) {
      var helpers = new SmParser.Helpers();
      data = helpers.trim(data);
      if(data.length !== 4) {
        return;
      }
      this.left = new Note(data[0]);
      this.down = new Note(data[1]);
      this.up = new Note(data[2]);
      this.right = new Note(data[3]);
    }

    isValid() {
      return !!(this.left &&
        this.down &&
        this.up &&
        this.right &&
        this.left.isValid() &&
        this.down.isValid() &&
        this.up.isValid() &&
        this.right.isValid());
    }

    isEmpty() {
      if(this.isValid()) {
        return this.left.type === "NoNote" &&
          this.down.type === "NoNote" &&
          this.up.type === "NoNote" &&
          this.right.type === "NoNote";
      }
      return false;
    }
  }
}
