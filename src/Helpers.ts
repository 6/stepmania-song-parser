module SmParser {
  export interface IHelpers {
    trim(value: string): string;
    presence(value: any): any;
    isPresent(value: any): boolean;
  }

  // TODO - make this static class
  export class Helpers implements IHelpers {
    trim(value: string) {
      if(!value) return "";
      return String(value).replace(/^\s+|\s+$/g, "");
    }

    presence(value: any) {
      if (value === null) return;
      if (typeof value === "undefined") return;
      if (String(value).match(/^\s*$/)) return;
      return value;
    }

    isPresent(value: any) {
      return typeof this.presence(value) !== "undefined";
    }
  }
}
