//Layout configuration
Router.configure({
	layoutTemplate:'main'
});
//Home routes
Router.route('/',{
	name:'home',
	template:'home'
});
//login routes
Router.route('/login');
//DOM container route
Router.route('/domElem/:_id',{
	path:'/domElem/:_id',
	template:'domElem',
	onBeforeAction: [function(){
		this.next();
	}],
	data: function(){
		var user = this.params._id;
		var query = this.params.query;
		return {_id: user, prm: query};
	},
	action: function(){
		this.render();
	}
});
//scrapper route
Router.route('/scrape',{
	name:'scrape',
	template:'scrapper'
});
//myTrackedList route
Router.route('/mytrackedlist',{
	name:'mytrackedlist',
	template:'mytrackedlist'
});