var Cricket = Ember.Application.create({
	LOG_TRANSACTIONS: true
});

Cricket.Router = Ember.Router.extend({
	location: 'hash'
});

Cricket.Router.map(function(){
	this.route('index', {path: '/'});
	this.route('login', {path: '/login'});
	this.route('register', {path: '/register'});
	this.route('welcome', {path: '/welcome'});
});

Cricket.IndexRoute = Ember.Route.extend({
	redirect: function(){
		this.transitionTo('login');
	}
});
Cricket.LoginRoute = Ember.Route.extend({
	model: function(){
		console.log('Loaded the login page..');
		return this.store.find('cricketData');
	}
	setupController: function(controller, data){
		controller.set('model', data.get('cricketLogin'));
	}
});
Cricket.RegisterRoute = Ember.Route.extend({
	model: function(){
		console.log('Loaded the register page..');
	}
});
Cricket.WelcomeRoute = Ember.Route.extend({
	model: function(){
		console.log('Loaded the welcome page..');
	}
});
Cricket.RegisterController = Ember.ObjectController.extend({

	actions: {}
});
Cricket.WelcomeController = Ember.ObjectController.extend({

	actions: {}
});
Cricket.LoginController = Ember.ObjectController.extend({
	userEmail: null,
	userPassword: null,
	content: [],
	loginData: Cricket.CricketLogin.find(),
	actions: {
		submitLogin: function(){
		var userId = this.get('userEmail');
		var pwd = this.get('userPassword');
		console.log('User id-->>'+userId+' , Password-->>'+pwd);
		
		//if(userId===this.store.find('cricketLogin').userId && pwd === this.store.find('cricketLogin').password){
		//	console.log('Login successful...!!!!');
		//}
	}
	}
	
});
Cricket.Store = DS.Store.extend({
	adapter: DS.FixtureAdapter
});
Cricket.CricketLogin = DS.Model.extend({
	userId: DS.attr('string'),
	password: DS.attr('string')
});
Cricket.CricketLogin.FIXTURES = {userId: 'sandeep', password: 'Password1'}
Cricket.CricketData = DS.Model.extend({

	postTitle: DS.attr('string'),
	postName: DS.attr('string'),
	postLongIntro: DS.attr('string'),
	postShortIntro: DS.attr('string'),
	postDate: DS.attr('date'),
	formattedDate: function(){
		var date = this.get('postDate');
		if(date){
			return this.get('postDate').getUTCDay() 
				+ "/" + (this.get('postDate').getUTCMonth() + 1) 
					+ "/" + this.get('postDate').getUTCFullYear();

		}
		else{	
			return '';
		}
	}.property('postDate')

});

Cricket.CricketData.FIXTURES = [
	{
	id:1, postTitle: 'Explaining Object equality in scala', 
	postDate: new Date(),
	postName: 'Scala Blog', postShortIntro:'This is Object Equality', 
	postLongIntro:'This is Object Equality', 
	postFileName: 'scala.blog'
	},
	{
	id:2, postTitle: 'Explaining Implicit conversion in scala', 
	postDate: new Date(),
	postName: 'Scala Blog', postShortIntro:'This is Object Equality', 
	postLongIntro:'This is Implicit Conversion', 
	postFileName: 'scala.blog'
	},
	{
	id:3, postTitle: 'Explaining FUnctional Literal in scala', 
	postDate: new Date(),
	postName: 'Scala Blog', postShortIntro:'This is Object Equality', 
	postLongIntro:'This is Function literal', 
	postFileName: 'scala.blog'
	},
	{
	id:4, postTitle: 'Explaining OOP in scala', 
	postDate: new Date(),
	postName: 'Scala Blog', postShortIntro:'This is Object Equality', 
	postLongIntro:'This is OOP in Scala', 
	postFileName: 'scala.blog'
	},
	{
	id:5, postTitle: 'Explaining Actors in scala',
	postDate: new Date(), 
	postName: 'Scala Blog', postShortIntro:'This is Object Equality', 
	postLongIntro:'This is Actors In Scala', 
	postFileName: 'Scala.blog'
	}
];
