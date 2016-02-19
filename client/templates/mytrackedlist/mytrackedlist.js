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

		$(e.currentTarget).html("<i class='fa fa-spinner fa-spin'>");
		
		Meteor.call('scrapeThisUrlByXpath', url, xpath,function(err, result){
			if(err)
				console.log(err);
			else{
				$(e.currentTarget).html('<i class="fa fa-line-chart"></i>');
				template.elemStats.set(result);
				console.log(result);
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