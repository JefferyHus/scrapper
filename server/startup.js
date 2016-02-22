UrlWatcher = {};

Meteor.startup(function () {

	UrlWatcher.phantomjs = Meteor.npmRequire('phantomjs');
	UrlWatcher.spawn = Meteor.npmRequire('child_process').spawn;

});