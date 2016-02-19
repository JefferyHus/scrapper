//Template events
Template.login.events({
	'click .btn': function(e){
		//Prevent the default action of the button
		e.preventDefault();
		//login the user via linkedin
		Meteor.loginWithLinkedin({requestPermissions:['r_basicprofile']});
	}
});