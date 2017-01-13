var myApp = angular.module('myApp', ['ngRoute', 'mainControllers', 'ticketControllers', 'loginControllers', 'analytics', 'firebase', 'ngAnimate']);

myApp.config(['$routeProvider',
function($routeProvider) {
	$routeProvider.when('/design', {
		templateUrl : 'partials/design/makeNameBadge.html',
		controller : 'TicketController'
	}).when('', {
		templateUrl : 'partials/home.html',
		controller : 'MainController'
	}).when('/login', {
		templateUrl : 'partials/login.html',
		controller : 'LoginController'
	}).when('/register', {
		templateUrl : 'partials/register.html',
		controller : 'LoginController'
	}).when('/d/:bizName', {
		templateUrl : 'partials/deal.html',
		controller : 'TicketController'
	}).otherwise({
		redirectTo : '/design'
	});
}]);
// Condition base:
// http://stackoverflow.com/questions/11541695/redirecting-to-a-certain-route-based-on-condition

myApp.run(['$rootScope', '$location', '$firebaseAuth', '$localStorage', 'shareDataService',
function($rootScope, $location, $firebaseAuth, $localStorage, shareDataService) {
	$rootScope.$storage = $localStorage.$default({
		g : $rootScope.guests
	});

	// $rootScope.$storage.lan = $rootScope.$storage.lan ? $rootScope.$storage.lan : ch;
	// $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute) {
	// var isAuth = $firebaseAuth().$getAuth();
	// if ($rootScope.$storage.hasOwnProperty('user') && $rootScope.$storage.user.hasOwnProperty('token') && $rootScope.$storage.user.token != undefined) {
	// $location.path(currRoute.originalPath);
	// $rootScope.selectedPage = highlightedNav[$location.path()] ? highlightedNav[$location.path()] : "";
	// // console.log($rootScope.selectedPage);
	// } else {
	// console.log('DENY ');
	// if (currRoute.originalPath == '/login') {
	// $location.path('/login');
	// } else {
	// $location.path('/home');
	// }
	// }
	// shareDataService.setProperty('signedInUser', firebase.auth().currentUser);
	// });
}]);

var highlightedNav = {
	'/' : 'home',
	'/login' : 'login',
	'/new' : 'new',
	'/dashboard' : 'dash',
	'/live' : 'live',
	'/about' : 'about',
};
