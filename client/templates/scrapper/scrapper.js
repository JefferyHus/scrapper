//Template events
Template.scrapper.events({
	'submit form':function(e){
		//prevent default submit action
		e.preventDefault();
		//the url value
		var uri = $('[name="url"]').val();
		//show loading
		Router.go('/domElem/'+Meteor.userId()+'?q='+encodeURI(uri));
	}
});
/*		$('button.btn').html("<i class='fa fa-spinner fa-spin'></i>");
		//start scrapping
		Meteor.call('scrapeThisUrl',uri,function(err,result){
			if(err)
				console.log(err);
			else{
				$('button.btn').html("Scrape it!");

				var newWindow = window.open(Router.current().path, "_parent", "width=600,height=600,scrollbars=yes");
				var html = result;

				$(newWindow.document.body).html(html);
			}
		});*/