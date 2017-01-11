var mainControllers = angular.module('mainControllers', ['ngStorage', 'ngSanitize', "firebase", "ui.bootstrap",'ngAnimate']);

mainControllers.controller('MainController', ['$rootScope', '$scope', '$http', '$localStorage', '$timeout', '$interval', '$sce', 'analytics', '$firebaseObject', '$firebaseArray', '$firebaseAuth', 'shareDataService',
function($rootScope, $scope, $http, $localStorage, $timeout, $interval, $sce, analytics, $firebaseObject, $firebaseArray, $firebaseAuth, shareDataService) {
	$scope.guests = [];
	var ss = $scope.$storage;

	ss.options = ss.options ? ss.options : {};
	ss.options.hideCheckin = [];


	var user,
	    allRef,
	    ref,
	    guestRef;
	if (firebase.auth().currentUser) {
		user = firebase.auth().currentUser;
		allRef = firebase.database().ref().child("/users/" + user.uid + "/");
		ss.allEvents = $firebaseArray(allRef);

		ref = firebase.database().ref().child("/users/" + user.uid + "/" + ss.eventName + "/");
		ss.currentEvent = $firebaseArray(ref);

		guestRef = firebase.database().ref().child("/users/" + user.uid + "/" + ss.eventName + "/guests");
		ss.guestsList = $firebaseArray(guestRef);

	}

	$scope.loading = [];

}]);
