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
}
