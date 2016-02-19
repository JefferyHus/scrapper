//publish each collection
if (Meteor.isServer) {
	//var userID = this.userId;
  	// This code only runs on the server
  	Meteor.publish("trackedElements", function () {
  		console.log("User ID : ", this.userId);
    	return trackedElements.find(
    		{
    			userId: this.userId
    		}
    	);
  	});
}