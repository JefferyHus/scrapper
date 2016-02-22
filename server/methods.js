//linked in after login method
Meteor.methods({
	//get the accessToken
	getAccessToken: function(){
		try{
			var accessToken = Meteor.user().services.linkedin.accessToken;
			//return the accessToken
			return accessToken;
		}catch(e){
			return null;
		}
	},
	getProfileFields: function(accessToken = Meteor.user().services.linkedin.accessToken){
		try{
			//create the fields of the request people
			var basicProfileFields = ['id','first-name', 'last-name', 'maiden-name', 'formatted-name', 'phonetic-first-name',
			      'phonetic-last-name', 'formatted-phonetic-name', 'headline', 'location',
			      'industry', 'num-connections', 'num-connections-capped', 'summary',
			      'specialties', 'positions', 'picture-url', 'picture-urls::(original)', 'site-standard-profile-request'],
			    emailFields = ['email-address'],
			    fullProfileFields = ['last-modified-timestamp', 'proposal-comments', 'associations', 'interests', 'publications',
			      'patents', 'languages', 'skills', 'certifications', 'educations',
			      'courses', 'volunteer', 'three-current-positions', 'three-past-positions', 'num-recommenders',
			      'recommendations-received', 'following', 'job-bookmarks', 'suggestions', 'date-of-birth'],
			    contactInfoFields = ['phone-numbers', 'bound-account-types', 'im-accounts', 'main-address', 'twitter-accounts', 'primary-twitter-account'];
			
			//build the Url end point
			var requestUrl = 'https://api.linkedin.com/v1/people/~:(' + _.union(basicProfileFields, emailFields, fullProfileFields, contactInfoFields).join(',') + ')';
			//send the request, method 'get'
			var response = HTTP.get(requestUrl,{
				params:{
					oauth2_access_token: accessToken,
					format:'json'
				}
			});
			//return the result
			return response ? response : null;
		}catch(e){
			return null;
		}
	},
	companySearchByKeyWord: function(keyword, accessToken = Meteor.user().services.linkedin.accessToken){
		try{
			//build the search Url
			var requestUrl = "https://api.linkedin.com/v1/company-search";
			//get the company fields
			var company = HTTP.get(requestUrl,{
				params:{
					oauth2_access_token: accessToken,
					format: 'json',
					keywords: {keyword}
				}
			});
			//return the result
			return company ? company : null;
		}catch(e){
			return e;
		}
	},
	getCompanyUpdates: function(id, accessToken = Meteor.user().services.linkedin.accessToken){
		try{
			//build the url
			var requestUrl = "https://api.linkedin.com/v1/companies/"+id+"/updates";

			var companyUpdates = HTTP.get(requestUrl,{
				params:{
					oauth2_access_token: accessToken,
					format:'json',
					count: 10,
					'event-type':'job-posting'
				}
			});

			return companyUpdates ? companyUpdates : accessToken;
		}catch(e){
			return e;
		}
	},
	scrapeThisUrl: function(url){
		try{
			var cheerio = Meteor.npmRequire('cheerio'); //scrape the whole html
			x = cheerio.load(Meteor.http.get(url).content);

			return x.html();
		}catch(e){
			return e;
		}
	},
	scrapeThisUrlByXpath: function(url, xpath, id = null){
		try{
			//call Async function
			var result = Meteor.functions.phantomjs(xpath, url);
		}catch(e){
			return e;
		}
	},
	addNewTrackedElement: function(nodeName, idName, className, value, xpath, urlFromScrape){
		//check if the user is logged in
		if(! Meteor.userId())
			throw new Meteor.error('access-denied');

		//in case the user is connected and chosed an element, the data should be saved
		return trackedElements.insert({
			nodeName: nodeName,
			idName: idName,
			className: className,
			value: value,
			urlFromScrape: urlFromScrape,
			xpath: xpath,
			createdAt: new Date(),
			userId: Meteor.userId()
		},function(err, _id){
			if(err)
				return err;
			else
				return _id;
		});
	},
	findAllTrackedElements: function(){
		//check if the user is logged in
		if(! Meteor.userId() )
			throw new Meteor.error('access-denied');

		//return results
		return trackedElements.find({userId: Meteor.userId()});
	},
	runTest: function (options) {
        var result = testing();
        console.log(result);
        return result;
    },
});

// For testing
testing = function() {
	var getResult = function(url, xpath, callback) {
		command = UrlWatcher.spawn(UrlWatcher.phantomjs.path, ['assets/app/phantomDriver.js', url, xpath]);
	    command.stdout.on('data', function (data) {
	        // Return here
	        callback && callback ( null, data.toString() );
	    });
	    command.stderr.on('data', function (data) {
	    	// Error return here
	        callback && callback ( data.toString(), null );
	    });
	    command.on('exit', function (code) {
	        console.log('child process exited with code ' + code);
	    });
	};

	var url = "https://developer.mozilla.org/en-US/docs/Introduction_to_using_XPath_in_JavaScript";
	var xpath = '//*[@id="wikiArticle"]/ul[1]/li[3]/ul/li[3]/a';

	var getResultSynchronously =  Meteor.wrapAsync(getResult); 
	var result = getResultSynchronously(url, xpath);
	return result;
};