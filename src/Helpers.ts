module SmParser {
  export class Helpers {
    static trim(value: string) {
      if(!value) return "";
      return String(value).replace(/^\s+|\s+$/g, "");
    }

    static presence(value: any) {
      if (value === null) return;
      if (typeof value === "undefined") return;
      if (String(value).match(/^\s*$/)) return;
      return value;
    }

    static isPresent(value: any) {
      return typeof Helpers.presence(value) !== "undefined";
    }

    static parseNumber(value: any, defaultValue: number, parseFn: any) {
      if (!Helpers.isPresent(value)) {
        return defaultValue;
      }
      value = parseFn(value);
      return isNaN(value) ? defaultValue : value;
    }
  }
}
