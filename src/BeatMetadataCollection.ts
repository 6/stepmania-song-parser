module SmParser {
  export interface IBeatMetadataCollection extends ICollection {
    isValid(): boolean;
    asJson(): any;
    model: any;
  }

  export class BeatMetadataCollection extends Collection {
    constructor(public model: any, valuesString: string) {
      super(model);
      if(new this.model() instanceof SmParser.DisplayBpm) {
        this.values = this.parseDisplayBpms(valuesString);
      }
      else {
        this.values = this.parseValuesString(valuesString);
      }
    }

    isValid() {
      return Helpers.all(this.values, (value) => {
        return value.isValid();
      });
    }

    asJson() {
      var json = [];
      for(var i = 0; i < this.values.length; i++) {
        json.push(this.values[i].asJson());
      }
      return json;
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

    private parseDisplayBpms(valuesString: string) {
      var parsedValues = [];
      var bpms = valuesString.split(/\s*:\s*/g);
      for(var i = 0; i < bpms.length; i++) {
        var metadata = new this.model(bpms[i]);
        if (metadata.isValid()) {
          parsedValues.push(metadata);
        }
      }

      return parsedValues;
    }
  }
}
