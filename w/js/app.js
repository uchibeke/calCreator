var myApp = angular.module('myApp', ['ngRoute', 'mainController', 'analytics', 'firebase', 'ngAnimate']);

myApp.config(['$routeProvider',
function($routeProvider) {
	$routeProvider.when('/make', {
		templateUrl : 'partials/design/makeDeal.html',
		controller : 'MainController'
	}).when('/start', {
		templateUrl : 'partials/home.html',
		controller : 'MainController'
	}).when('/d/:bizName', {
		templateUrl : 'partials/deal.html',
		controller : 'MainController'
	}).when('/info', {
		templateUrl : 'partials/info.html',
		controller : 'MainController'
	}).otherwise({
		redirectTo : '/info'
	});
}]);

myApp.run(['$rootScope', '$location', '$firebaseAuth', '$localStorage',
function($rootScope, $location, $firebaseAuth, $localStorage) {
	$rootScope.$storage = $localStorage.$default({
		g : $rootScope.guests
	});
}]);