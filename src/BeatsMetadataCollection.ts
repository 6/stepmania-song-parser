module SmParser {
  export interface IBeatMetadataCollection extends ICollection {
    model: any;
  }

  export class BeatMetadataCollection extends Collection {
    constructor(public model: any, valuesString: string) {
      super(model);
      this.values = this.parseValuesString(valuesString);
    }

    private parseValuesString(valuesString: string) {
      var parsedValues = [];
      var beatPairs = valuesString.split(/\s*,\s*/g);
      for(var i = 0; i < beatPairs.length; i++) {
        var beatPair = beatPairs[i].split(/=/g);
        var metadata = new this.model(beatPair[0], beatPair[1]);
        if (metadata.isValid()) {
          parsedValues.push(metadata);
        }
      }

      return parsedValues;
    }
  }
}
