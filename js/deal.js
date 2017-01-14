function dealOps($rootScope, $scope, $http, $localStorage, $firebaseObject, $firebaseArray, $firebaseAuth, $location) {

	var urlStrArr = $location.path().split("/");

	var ss = $scope.$storage;

	ss.options = ss.options ? ss.options : {};

	var dealsRef = firebase.database().ref();

	var myDeals = $firebaseObject(dealsRef);

	ss.deals = myDeals;

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
	if (myDeals.$loaded) {
		$http.get(apiUrl + parsedString + ".json").then(function(response) {
			ss.loadedDeal = response.data;
			// success callback
		}, function(response) {
			// failure callback
			console.log(response.data);
		});
	}

	var hostingUrl = "http://calcreator.me/";

	$scope.dealUrl = function() {
		return hostingUrl + '%23!/d/' + ss.options.BizName + "/";
	};
}
