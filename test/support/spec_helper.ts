/// <reference path="jasmine.d.ts" />
/// <reference path="../../src/Application.ts" />

window['context'] = function() {
  window['describe'].apply(this, arguments);
};

window['ccontext'] = function() {
  window['ddescribe'].apply(this, arguments);
};
