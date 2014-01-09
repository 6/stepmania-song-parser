var SmParser;!function(SmParser){var Collection=function(){function Collection(model){this.model=model}return Collection.prototype.size=function(){return this.values?this.values.length:0},Collection.prototype.isEmpty=function(){return 0===this.size()},Collection.prototype.at=function(index){return this.values[index]},Collection}();SmParser.Collection=Collection}(SmParser||(SmParser={}));var SmParser;!function(SmParser){var Bpm=function(){function Bpm(beat,bpm){this.beat=parseFloat(beat),this.value=parseFloat(bpm)}return Bpm.prototype.isValid=function(){return!isNaN(this.beat)&&!isNaN(this.value)&&this.beat>=0&&this.value>0},Bpm}();SmParser.Bpm=Bpm;var Stop=function(){function Stop(beat,duration){this.beat=parseFloat(beat),this.value=parseFloat(duration)}return Stop.prototype.isValid=function(){return!isNaN(this.beat)&&!isNaN(this.value)&&this.beat>=0&&this.value>=0},Stop}();SmParser.Stop=Stop;var BackgroundChange=function(){function BackgroundChange(beat,backgroundName){this.beat=parseFloat(beat),this.value=backgroundName}return BackgroundChange.prototype.isValid=function(){return!isNaN(this.beat)&&SmParser.Helpers.isPresent(this.value)},BackgroundChange}();SmParser.BackgroundChange=BackgroundChange;var DisplayBpm=function(){function DisplayBpm(displayBpm){if("*"===displayBpm)this.beat=null,this.value=null;else{var bpm=parseFloat(displayBpm);this.beat=bpm,this.value=bpm}}return DisplayBpm.prototype.isRandom=function(){return null===this.value},DisplayBpm.prototype.isValid=function(){return this.isRandom()?!0:!isNaN(this.value)&&this.value>=0},DisplayBpm}();SmParser.DisplayBpm=DisplayBpm}(SmParser||(SmParser={}));var __extends=this.__extends||function(d,b){function __(){this.constructor=d}for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p]);__.prototype=b.prototype,d.prototype=new __},SmParser;!function(SmParser){var BeatMetadataCollection=function(_super){function BeatMetadataCollection(model,valuesString){_super.call(this,model),this.model=model,this.values=new this.model instanceof SmParser.DisplayBpm?this.parseDisplayBpms(valuesString):this.parseValuesString(valuesString)}return __extends(BeatMetadataCollection,_super),BeatMetadataCollection.prototype.parseValuesString=function(valuesString){for(var parsedValues=[],beatPairs=valuesString.split(/\s*,\s*/g),i=0;i<beatPairs.length;i++){var beatPair=beatPairs[i].split(/=/g),metadata=new this.model(beatPair[0],beatPair[1]);metadata.isValid()&&parsedValues.push(metadata)}return parsedValues},BeatMetadataCollection.prototype.parseDisplayBpms=function(valuesString){for(var parsedValues=[],bpms=valuesString.split(/\s*:\s*/g),i=0;i<bpms.length;i++){var metadata=new this.model(bpms[i]);metadata.isValid()&&parsedValues.push(metadata)}return parsedValues},BeatMetadataCollection}(SmParser.Collection);SmParser.BeatMetadataCollection=BeatMetadataCollection}(SmParser||(SmParser={}));var SmParser;!function(SmParser){var Note=function(){function Note(data){this.data=data,this.NoteTypes={0:"NoNote",1:"TapNote",2:"HoldBeginNote",3:"HoldEndNote",4:"RollBeginNote",M:"Mine",L:"Lift",F:"Fake"},SmParser.Helpers.presence(data)&&(this.type=this.NoteTypes[data.toLocaleUpperCase()])}return Note.prototype.isValid=function(){return"undefined"!=typeof this.type},Note}();SmParser.Note=Note}(SmParser||(SmParser={}));var SmParser;!function(SmParser){var NoteRow=function(){function NoteRow(data){data=SmParser.Helpers.trim(data),4===data.length&&(this.left=new SmParser.Note(data[0]),this.down=new SmParser.Note(data[1]),this.up=new SmParser.Note(data[2]),this.right=new SmParser.Note(data[3]))}return NoteRow.prototype.isValid=function(){return!!(this.left&&this.down&&this.up&&this.right&&this.left.isValid()&&this.down.isValid()&&this.up.isValid()&&this.right.isValid())},NoteRow.prototype.isEmpty=function(){return this.isValid()?"NoNote"===this.left.type&&"NoNote"===this.down.type&&"NoNote"===this.up.type&&"NoNote"===this.right.type:!1},NoteRow}();SmParser.NoteRow=NoteRow}(SmParser||(SmParser={}));var SmParser;!function(SmParser){var SongMetadata=function(){function SongMetadata(metadata){this.metadata=metadata,this.MetadataSectionRegex=new RegExp("#[^;]+;","gm"),this.MetadataLineRegex=new RegExp("#([a-z]+):([^;]+)?;$","i"),this.NumericMetadata=["offset","samplestart","samplelength"],this.StringMetadata=["title","subtitle","artist","titletranslit","subtitletranslit","artisttranslit","genre","credit","banner","background","lyricspath","cdtitle","music"],this.CollectionMetadata={bgchanges:SmParser.BackgroundChange,bpms:SmParser.Bpm,displaybpm:SmParser.DisplayBpm,stops:SmParser.Stop};for(var metadataSections=metadata.match(this.MetadataSectionRegex),i=0;i<metadataSections.length;i++){var normalizedMetadata=this.normalizeMetadata(metadataSections[i]);this.setMetadataProperty(normalizedMetadata)}}return SongMetadata.prototype.isValid=function(){return!0},SongMetadata.prototype.normalizeMetadata=function(metadataSection){for(var metadataLines=metadataSection.split("\n"),i=0;i<metadataLines.length;i++)metadataLines[i]=metadataLines[i].replace(/\/\/.*$/,""),metadataLines[i]=SmParser.Helpers.trim(metadataLines[i]);return metadataLines.join("")},SongMetadata.prototype.setMetadataProperty=function(metadataLine){var metadataMatches=metadataLine.match(this.MetadataLineRegex);if(metadataMatches){var propertyName=metadataMatches[1],propertyValue=metadataMatches[2];if(propertyName&&propertyValue)if(propertyName=propertyName.toLocaleLowerCase(),this.StringMetadata.indexOf(propertyName)>=0)this[propertyName]=propertyValue;else if(this.NumericMetadata.indexOf(propertyName)>=0){var numericPropertyValue=parseFloat(propertyValue);isNaN(numericPropertyValue)||(this[propertyName]=numericPropertyValue)}else if(this.CollectionMetadata[propertyName]){var model=this.CollectionMetadata[propertyName];this[propertyName]=new SmParser.BeatMetadataCollection(model,propertyValue)}else"selectable"===propertyName&&(this[propertyName]="NO"!==propertyValue)}},SongMetadata}();SmParser.SongMetadata=SongMetadata}(SmParser||(SmParser={}));var SmParser;!function(SmParser){var Helpers=function(){function Helpers(){}return Helpers.trim=function(value){return value?String(value).replace(/^\s+|\s+$/g,""):""},Helpers.presence=function(value){return null===value||"undefined"==typeof value||String(value).match(/^\s*$/)?void 0:value},Helpers.isPresent=function(value){return"undefined"!=typeof Helpers.presence(value)},Helpers}();SmParser.Helpers=Helpers}(SmParser||(SmParser={}));