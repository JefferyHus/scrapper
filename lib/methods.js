//My javascript functions
Meteor.functions = {
	//Javascript normal functions
	xpathFunc: function(element) {
	    if (element.id!=='')
	        return 'id("'+element.id+'")';
	    if (element===document.body)
	        return element.tagName;

	    var ix= 0;
	    var siblings= element.parentNode.childNodes;
	    for (var i= 0; i<siblings.length; i++) {
	        var sibling= siblings[i];
	        if (sibling===element)
	            return Meteor.functions.xpathFunc(element.parentNode)+'/'+element.tagName+'['+(ix+1)+']';
	        if (sibling.nodeType===1 && sibling.tagName===element.tagName)
	            ix++;
	    }
	},
	absUri: function(url){
		var r = new RegExp('^(?:[a-z]+:)?//', 'i');

		return r.test(url);
	},
	noscript: function (s) {
	    var div = document.createElement('div');
	    div.innerHTML = s;
	    var scripts = div.getElementsByTagName('script');
	    var i = scripts.length;
	    while (i--) {
	      scripts[i].parentNode.removeChild(scripts[i]);
	    }
	    return div.innerHTML;
  	},
  	x: function(xpath, html){
        var doc = $(opt_startNode).document;
        var result = doc.evaluate(xpath, doc, null, XPathResult.ANY_TYPE, null);
        switch (result.resultType) {
	        case XPathResult.NUMBER_TYPE:
	            return result.numberValue;
	        case XPathResult.STRING_TYPE:
	            return result.stringValue;
	        case XPathResult.BOOLEAN_TYPE:
	            return result.booleanValue;
	        default:
	            var nodes = [];
	            var node;
	            while (node = result.iterateNext())
	                push(nodes, node);
	            return nodes;
        }
    },
    phantomjs: function(xpath, url){
    	command = UrlWatcher.spawn(UrlWatcher.phantomjs.path, ['assets/app/phantomDriver.js', url, xpath]);

		var response = false;
	        
		return command.stdout.on('data', function (data) {
	    	response = data;
		});
		command.stderr.on('data', function (data) {
	    	console.log('stderr: ' + data);
	    	response = data;
		});
		command.on('exit', function (code) {
	    	console.log(code);
		});

    }
}