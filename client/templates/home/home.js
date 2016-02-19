Template.home.events({
	"click .atk": function(e){
		//Prevent the default action of the event
		e.preventDefault();

		Meteor.call("getAccessToken", function(err, accessToken){
			if(err)
				console.log(err);
			else{
				Meteor.call('getProfileFields',function(err, result){
					if(err)
						console.log(err);
					else
						console.log(result);
				})
			}
		});
	},
	"submit .searchCompany": function(e){
		e.preventDefault();//prevent the default submit action

		var companyName = $('[name="company"]').val(); //company's name to search for
		
		Meteor.call('companySearchByKeyWord',companyName,function(err, result){
			if(err)
				console.log(err);
			else{
				companies = result.data.companies.values;
				for(let cmp of companies){
					var company_id = cmp.id;
					break;
				}
				Meteor.call('getCompanyUpdates',company_id,function(err, result){
					if(err)
						console.log(err);
					else
						console.log(result);
				})
			}
		});
	}
});