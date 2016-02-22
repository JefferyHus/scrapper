UrlWatcher = {};

Meteor.startup(function () {

	UrlWatcher.phantomjs = Meteor.npmRequire('phantomjs-prebuilt');
	UrlWatcher.spawn = Meteor.npmRequire('child_process').spawn;

});