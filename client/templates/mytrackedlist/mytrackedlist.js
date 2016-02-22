//Template helpers
Template.mytrackedlist.helpers({
	trackedlist: function(){
		return trackedElements.find({
			userId: Meteor.userId()
		});
	}
});
Template.trackedelement.helpers({
	isOwner: function(){
		console.log(this.userId);
		return this.userId === Meteor.userId();
	},
	prettifyDate: function(timestamp){
		//format = require('dateformat');
		return moment(timestamp).format("dddd, MMMM Do YYYY, h:mm:ss a");
	}
});
//Template events
Template.trackedelement.events({
	"click .getStats": function(e, template){
		e.preventDefault();

		var xpath 	= $(e.currentTarget).data('xpath');
		var url 	= $(e.currentTarget).data('url');
		//check if the value has been changed
		var value 	= $(e.currentTarget).data('value');

		$(e.currentTarget).html("<i class='fa fa-spinner fa-spin'>");
		
		console.log(xpath, url);

		Meteor.call('scrapeThisUrlByXpath', url, xpath,function(err, result){
			if(err)
				console.log(err);
			else{
				template.elemStats.set(result);
				//show alert of new value
				if(value !== template.elemStats.get())
					console.log("the value has been changed, the new value is: "+template.elemStats.get());
			}
		});
	}
});
//Template onCreated
Template.trackedelement.onCreated(function(){
	var self =  this;
	//the Reactive var to get element
	self.elemStats = ReactiveVar(null);
});
//Template onRendered
Template.trackedelement.onRendered(function(){
	var self = this;

	self.autorun(function(){
		var elemSt = self.elemStats.get();
		if(!jQuery.isEmptyObject(elemSt)){
			$('.getStats').html('<i class="fa fa-line-chart"></i>');
		}
	});
});