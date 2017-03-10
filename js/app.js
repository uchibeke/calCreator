var myApp = angular.module('myApp', ['ngRoute', 'mainControllers', 'ticketControllers', 'loginControllers', 'analytics', 'firebase', 'ngAnimate']);

myApp.config(['$routeProvider',
function($routeProvider) {
	$routeProvider.when('/make', {
		templateUrl : 'partials/design/makeDeal.html',
		controller : 'TicketController'
	}).when('/start', {
		templateUrl : 'partials/home.html',
		controller : 'TicketController'
	}).when('/login', {
		templateUrl : 'partials/login.html',
		controller : 'LoginController'
	}).when('/register', {
		templateUrl : 'partials/register.html',
		controller : 'LoginController'
	}).when('/d/:bizName', {
		templateUrl : 'partials/deal.html',
		controller : 'TicketController'
	}).when('/info', {
		templateUrl : 'partials/info.html',
		controller : 'TicketController'
	}).otherwise({
		redirectTo : '/info'
	});
}]);

myApp.run(['$rootScope', '$location', '$firebaseAuth', '$localStorage', 'shareDataService',
function($rootScope, $location, $firebaseAuth, $localStorage, shareDataService) {
	$rootScope.$storage = $localStorage.$default({
		g : $rootScope.guests
	});
}]);

var highlightedNav = {
	'/' : 'home',
	'/login' : 'login',
	'/new' : 'new',
	'/dashboard' : 'dash',
	'/live' : 'live',
	'/about' : 'about',
};
