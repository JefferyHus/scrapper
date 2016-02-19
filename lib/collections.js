//collection for the parsed websites, elements to be tracked are saved in this collection
trackedElements = new Mongo.Collection('trackedElements');
//subscribe each collection
if(Meteor.isClient){
	Meteor.subscribe('trackedElements');
}