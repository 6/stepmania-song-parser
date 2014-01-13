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

    static parseInt(value: any, options: any) {
      return Helpers.parseNumber(value, parseInt, options);
    }

    static parseFloat(value: any, options: any) {
      return Helpers.parseNumber(value, parseFloat, options);
    }

    static isNaN(value: any) {
      return !! (!Helpers.isPresent(value) || isNaN(value));
    }

    static parseNumber(value: any,  parseFn: any, options: any) {
      options = options || {};
      if (!Helpers.isPresent(value)) return options.default;

      value = parseFn(value);

      if (Helpers.isNaN(value)) return options.default;
      if (options.min && value < options.min) return options.default;
      if (options.max && value > options.max) return options.default;

      return value;
    }
  }
}
