module SmParser {
  export interface IHelpers {
    trim(value: string): string;
  }

  // TODO - make this static class
  export class Helpers implements IHelpers {
    trim(value: string) {
      if(!value) return "";
      return String(value).replace(/^\s+|\s+$/g, "");
    }
  }
}
