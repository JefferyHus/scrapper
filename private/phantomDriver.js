var system = require('system');
if (system.args.length === 1) {
    console.log('Try to pass some args when invoking this script!');
    phantom.exit();
}

var url = system.args[1];
var xpath = system.args[2];

var page = require('webpage').create();
page.open(url, function () {
    var nodeElem = page.evaluate(function(path) {
	  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML;;
	},xpath);
	console.log(nodeElem);
    phantom.exit();
});