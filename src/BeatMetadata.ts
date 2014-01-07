module SmParser {
  export interface IBeatMetadata {
    beat: number;
    value: any;
    isValid(): boolean;
  }

  export class Bpm implements IBeatMetadata {
    beat: number;
    value: number;

    constructor(beat: string, bpm: string) {
      this.beat = parseFloat(beat);
      this.value = parseFloat(bpm);
    }

    isValid() {
      return !isNaN(this.beat) && !isNaN(this.value) && this.beat >= 0 && this.value > 0;
    }
  }

  export class Stop implements IBeatMetadata {
    beat: number;
    value: number;

    constructor(beat: string, duration: string) {
      this.beat = parseFloat(beat);
      this.value = parseFloat(duration);
    }

    isValid() {
      return !isNaN(this.beat) && !isNaN(this.value) && this.beat >= 0 && this.value >= 0;
    }
  }

  export class BackgroundChange implements IBeatMetadata {
    beat: number;
    value: string;

    constructor(beat: string, backgroundName: string) {
      this.beat = parseFloat(beat);
      this.value = backgroundName;
    }

    isValid() {
      return !isNaN(this.beat) && Helpers.isPresent(this.value);
    }
  }

  export class DisplayBpm implements IBeatMetadata {
    beat: number;
    value: number;

    constructor(displayBpm: string) {
      if (displayBpm === "*") {
        this.beat = null;
        this.value = null;
      }
      else {
        var bpm = parseFloat(displayBpm);
        this.beat = bpm;
        this.value = bpm;
      }
    }

    isRandom() {
      return this.value === null;
    }

    isValid() {
      if (this.isRandom()) {
        return true;
      }
      return !isNaN(this.value) && this.value >= 0;
    }
  }
}
