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
	$scope.dealUrl = function() {
		return hostingUrl + '%23!/d/' + encodeURIComponent(ss.options.BizName) + "/";
	};

	var hostingUrl = "http://calcreator.me/";

	if (urlStrArr[urlStrArr.length - 2] === 'd') {
		ss.options.bizNameFromUrl = urlStrArr[urlStrArr.length - 1];
		ss.options.bizNameFromUrl = decodeURIComponent(ss.options.bizNameFromUrl);
		if (myDeals.$loaded) {
			$http.get(apiUrl + ss.options.bizNameFromUrl + ".json").then(function(response) {
				ss.loadedDeal = response.data;
				// success callback
			}, function(response) {
				// failure callback
				console.log(response.data);
			});
		}

		ss.loadedDeal = ss.loadedDeal ? ss.loadedDeal : {};
	}
}
