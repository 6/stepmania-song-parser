module SmParser {
  export interface IBeatMetadata {
    beat: number;
    value: any;
    isValid(): boolean;
    asJson(): any;
  }

  export class Bpm implements IBeatMetadata {
    beat: number;
    value: number;

    constructor(beat: string, bpm: string) {
      this.beat = Helpers.parseFloat(beat);
      this.value = Helpers.parseFloat(bpm);
    }

    isValid() {
      return !Helpers.isNaN(this.beat) && !Helpers.isNaN(this.value) && this.beat >= 0 && this.value > 0;
    }

    asJson() {
      return {
        beat: this.beat,
        value: this.value
      }
    }
  }

  export class Stop implements IBeatMetadata {
    beat: number;
    value: number;

    constructor(beat: string, duration: string) {
      this.beat = Helpers.parseFloat(beat);
      this.value = Helpers.parseFloat(duration);
    }

    isValid() {
      return !Helpers.isNaN(this.beat) && !Helpers.isNaN(this.value) && this.beat >= 0 && this.value >= 0;
    }

    asJson() {
      return {
        beat: this.beat,
        value: this.value
      }
    }
  }

  export class BackgroundChange implements IBeatMetadata {
    beat: number;
    value: string;

    constructor(beat: string, backgroundName: string) {
      this.beat = Helpers.parseFloat(beat);
      this.value = backgroundName;
    }

    isValid() {
      return !Helpers.isNaN(this.beat) && Helpers.isPresent(this.value);
    }

    asJson() {
      return {
        beat: this.beat,
        value: this.value
      }
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
        var bpm = Helpers.parseFloat(displayBpm);
        this.beat = bpm;
        this.value = bpm;
      }
    }

    asJson() {
      return {
        isRandom: this.isRandom(),
        beat: this.beat,
        value: this.value
      }
    }

    isRandom() {
      return this.value === null;
    }

    isValid() {
      if (this.isRandom()) {
        return true;
      }
      return !Helpers.isNaN(this.value) && this.value >= 0;
    }
  }
}
