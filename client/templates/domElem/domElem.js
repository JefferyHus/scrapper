//Template helpers
Template.domElem.helpers({
	newTemplate: function(){
		//start scrapping
		var vHtml = Template.instance().newHtml.get();
		var self = this;
		var re = new RegExp(/^.*\//);

		return Meteor.functions.noscript(vHtml);
	}
});
//Template events
Template.domElem.events({
	"click": function(e){
		e.preventDefault();

		if(e.currentTarget.id == "subButton"){
			return;
		}else{
			//highlight current element
			$('.highlight').removeClass('highlight');
			$(e.currentTarget).addClass('highlight');

			var nodeName 		= e.currentTarget.nodeName;
			var elemID 			= $(e.currentTarget).attr('id');
			var elemClassName 	= $(e.currentTarget).attr('class');
			var elemValue		= $(e.currentTarget).text().trim();
			var xpath			= Meteor.functions.xpathFunc(e.currentTarget);

			$('.subscribe').data('nodename', nodeName);
			$('.subscribe').data('id', elemID);
			$('.subscribe').data('classname', elemClassName);
			$('.subscribe').data('value', elemValue);
			$('.subscribe').data('xpath', xpath);
		}
	},
	"click .subscribe": function(e){
		e.preventDefault();//prevent default click event

		//get the data attributes
		var nodeName 		= $(e.currentTarget).data('nodename');
		var elemID 			= $(e.currentTarget).data('id');
		var elemClassName 	= $(e.currentTarget).data('classname');
		var elemValue		= $(e.currentTarget).data('value');
		var xpath			= $(e.currentTarget).data('xpath');
		var urlFromScrape	= this.prm.q;

		//save the data into our collection trackedelements
		Meteor.call('addNewTrackedElement', nodeName, elemID, elemClassName, elemValue, xpath, urlFromScrape,function(err, result){
			if(err)
				console.log(err);
			else
				console.log(result);
		});
	}
});
//Template onCreated
Template.domElem.onCreated(function(){
	var self = this;

	self.newHtml = new ReactiveVar("");

	Meteor.call('scrapeThisUrl', self.data.prm.q, function(err, result){
		if(err)
			self.newHtml.set(err);
		else
			self.newHtml.set(result);
	});
});
//Template onRendered
Template.domElem.onRendered(function(){
	var self = this;

	$(self.vHtml).find('link[rel="stylesheet"]').each(function(i){
		$(this).prop('href', function(i, oHref){
			oHref = oHref.split('/');
			return re.exec(self.prm.q) + oHref[3] + '/' + oHref[4];
		});
	});

	// get the value of the bottom of the .domElemContainer element by adding the offset of that element plus its height, set it as a variable
	var mainbottom = $('.domElemContainer').offset().top + $('.domElemContainer').height();

	// on scroll, 
	$(window).on('scroll',function(){

	    // we round here to reduce a little workload
	    var stop = Math.round($(window).scrollTop());

	    if (stop > mainbottom) {
	        $('.savedata').addClass('top');
	    } else {
	        $('.savedata').removeClass('top');
	    }

	});
});