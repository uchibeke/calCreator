function dealOps($rootScope, $scope, $http, $localStorage, $firebaseObject, $firebaseArray, $firebaseAuth, $location) {

	var urlStrArr = $location.path().split("/");

	var ss = $scope.$storage;

	ss.options = ss.options ? ss.options : {};

	var dealsRef = firebase.database().ref();

	var myDeals = $firebaseObject(dealsRef);

	$scope.deals = myDeals;

	$scope.deleteAllDeals = function() {

	};

	var apiUrl = "https://calcreator-d490f.firebaseio.com/";

	$scope.updateDeal = function(dealDescription, savings, dealStart, dealEnd) {
		var newDeal = {
			"description" : dealDescription,
			"savings" : savings,
			"start" : dealStart,
			"end" : dealEnd,
			"phone" : ss.options.pNum,
			"name" : ss.options.BizName,
			"logo" : $scope.companyLogo
		};
		firebase.database().ref(ss.options.BizName).set(newDeal);
	};

	$scope.dealUrl = function() {
		return hostingUrl + '%23!/d/' + encodeURIComponent(ss.options.BizName) + "/";
	};

	var hostingUrl = "http://calcreator.me/";

	ss.options.bizNameFromUrl = urlStrArr[urlStrArr.length - 1];
	ss.options.bizNameFromUrl = decodeURIComponent(ss.options.bizNameFromUrl);
	var nameToUse = ss.options.BizName;
	if (urlStrArr[urlStrArr.length - 1] === 'make') {
		if (myDeals.$loaded) {
			$http.get(apiUrl + nameToUse + ".json").then(function(response) {
				$scope.loadedDeal = response.data;
				// success callback
			}, function(response) {
				// failure callback
				console.log(response.data);
			});
		}
	} else {
		nameToUse = urlStrArr[urlStrArr.length - 1];
		if (myDeals.$loaded) {
			$http.get(apiUrl + nameToUse + ".json").then(function(response) {
				$scope.loadedDeal = response.data;
				// success callback
			}, function(response) {
				// failure callback
				console.log(response.data);
			});
		}
	}

	$scope.loadedDeal = $scope.loadedDeal ? $scope.loadedDeal : {};

	$scope.uploadFiles = function(file, errFiles) {
		window.setTimeout(function() {
			var url = file["$ngfBlobUrl"];
			console.log(url);

			var img = new Image();

			img.setAttribute('crossOrigin', 'anonymous');

			img.onload = function() {
				var canvas = document.createElement("canvas");
				canvas.width = this.width;
				canvas.height = this.height;

				var ctx = canvas.getContext("2d");
				ctx.drawImage(this, 0, 0);

				var dataURL = canvas.toDataURL("image/png");
				var cleaned = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
				firebase.database().ref(ss.options.BizName + "/logo").set(cleaned);
			};
			img.src = url;
		}, 2000);
	};

}
