//update the provider datain the database
Meteor.startup(function(){
	ServiceConfiguration.configurations.update(
		{"service":"linkedin"},
		{
			$set: {
				"clientId":"77mlhvx32p8hl1",
				"secret":"LworKKiZht8Y0sdj"
			}
		},
		{upsert:true}
	);
});