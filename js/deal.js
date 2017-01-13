function dealOps($rootScope, $scope, $http, $localStorage, $firebaseObject, $firebaseArray, $firebaseAuth) {

	var ss = $scope.$storage;

	ss.options = ss.options ? ss.options : {};

	var dealsRef = firebase.database().ref();
	delete ss.deals;

	ss.deals = $firebaseArray(dealsRef);

	console.log(ss.deals);

	$scope.deleteAllDeals = function() {

	};

	$scope.updateDeal = function(bizName, dealDescription, savings, dealStart, dealEnd) {
		console.log(ss.deals);
		var newDeal = {
			"description" : dealDescription,
			"savings" : savings,
			"start" : dealStart,
			"end" : dealEnd
		};
		var newRef = firebase.database().ref().child(encodeURIComponent(bizName));
		newRef.set(newDeal);

	};

	var parsedString = window.location.hash.split("/")[window.location.hash.split("/").length - 1];
	parsedString = decodeURIComponent(parsedString);
	console.log(parsedString);
	if (parsedString) {
		ss.loadedDeal = ss.deals[parsedString];
		console.log(ss.loadedDeal);
	}
	
}
