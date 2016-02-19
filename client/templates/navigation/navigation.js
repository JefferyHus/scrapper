Template.navigation.events({
	'click .logout':function(e){
		//prevent default action of the event
		e.preventDefault();
		//logout the user
		Meteor.logout(function(err){
			if(err)
				console.log(err);
			else
				Router.go('home');
		});

	}
});