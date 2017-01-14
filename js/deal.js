function dealOps($rootScope, $scope, $http, $localStorage, $firebaseObject, $firebaseArray, $firebaseAuth, $location) {

	var urlStrArr = $location.path().split("/");

	var ss = $scope.$storage;

	ss.options = ss.options ? ss.options : {};

	var dealsRef = firebase.database().ref();

	var myDeals = $firebaseObject(dealsRef);

	ss.deals = myDeals;

	console.log(ss.deals);

	$scope.deleteAllDeals = function() {

	};

	var apiUrl = "https://calcreator-d490f.firebaseio.com/";

	$scope.updateDeal = function(bizName, dealDescription, savings, dealStart, dealEnd) {
		console.log(ss.deals);
		var newDeal = {
			"description" : dealDescription,
			"savings" : savings,
			"start" : dealStart,
			"end" : dealEnd,
			"phone" : ss.options.pNum,
			"name" : ss.options.BizName
		};
		firebase.database().ref(bizName).set(newDeal);
	};

	var parsedString = urlStrArr[urlStrArr.length - 1];
	parsedString = decodeURIComponent(parsedString);
	console.log(parsedString);
	console.log(ss.deals);
	if (myDeals.$loaded) {
		$http.get(apiUrl + parsedString + ".json" ).then(function(response) {
			ss.loadedDeal = response.data;
			console.log(ss.loadedDeal);
			// success callback
		}, function(response) {
			// failure callback
			console.log(response.data);
		});
	}
}
