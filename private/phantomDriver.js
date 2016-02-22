var system = require('system');
if (system.args.length === 1) {
    console.log('Try to pass some args when invoking this script!');
    phantom.exit();
}

var url = system.args[1];

var page = require('webpage').create();
page.open(url, function () {
    console.log('Page Loaded');
    page.render('github.png');
    phantom.exit();
});