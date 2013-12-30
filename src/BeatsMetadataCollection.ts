module SmParser {
  export interface IBeatMetadataCollection extends ICollection {
    type: string;
  }

  export class BeatMetadataCollection extends Collection {
    constructor(public type: string, valuesString: string) {
      super();
      this.values = this.parseValuesString(valuesString);
    }

    private parseValuesString(valuesString: string) {
      var parsedValues = [],
          metadataClass;
      switch(this.type) {
        case "bpm":
          metadataClass = SmParser.Bpm;
          break;
        case "stop":
          metadataClass = SmParser.Stop;
          break;
        case "backgroundChange":
          metadataClass = SmParser.BackgroundChange;
          break;
      }

      var beatPairs = valuesString.split(/\s*,\s*/g);
      for(var i = 0; i < beatPairs.length; i++) {
        var beatPair = beatPairs[i].split(/=/g);
        var metadata = new metadataClass(beatPair[0], beatPair[1]);
        if (metadata.isValid()) {
          parsedValues.push(metadata);
        }
      }

      return parsedValues;
    }
  }
}
