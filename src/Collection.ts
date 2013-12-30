module SmParser {
  export interface ICollection {
    values: any;
    size(): number;
    isEmpty(): number;
    at(index: number): any;
  }

  export class Collection {
    public values: any;

    constructor() {
    }

    size() {
      if (this.values) {
        return this.values.length;
      }
      return 0;
    }

    isEmpty() {
      return this.size() === 0;
    }

    at(index: number) {
      return this.values[index];
    }
  }
}
