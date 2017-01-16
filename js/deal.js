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
			"logo" : $scope.loadedDeal.logo ? $scope.loadedDeal.logo : "-"
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
		if (myDeals.$loaded && ss.options.BizName) {
			var lRef = firebase.database().ref(ss.options.BizName);

			var lDeals = $firebaseObject(lRef);

			$scope.loadedDeal = lDeals;

			$scope.loadedDeal = $scope.loadedDeal ? $scope.loadedDeal : {};
		} else {
			$scope.loadedDeal = $scope.loadedDeal ? $scope.loadedDeal : {};
			$scope.loadedDeal["$resolved"] = true;
		}
	} else {
		nameToUse = urlStrArr[urlStrArr.length - 1];
		if (myDeals.$loaded) {
			$http.get(apiUrl + nameToUse + ".json").then(function(response) {
				var gal = $scope.loadedDeal.gal;
				$scope.loadedDeal = response.data;
				$scope.loadedDeal.gal = gal;
				// success callback
			}, function(response) {
				// failure callback
				console.log(response.data);
			});
		}
	}

	$scope.uploadFiles = function(file, errFiles, pos) {
		window.setTimeout(function() {
			var url = file["$ngfBlobUrl"];
			console.log(url);
			console.log(file.size);

			var img = new Image();

			img.setAttribute('crossOrigin', 'anonymous');

			img.onload = function() {
				var canvas = document.createElement("canvas");
				canvas.width = this.width;
				canvas.height = this.height;
				if (file.size > 1000000) {
					canvas.width = this.width / 2;
					canvas.height = this.height / 2;
				}

				var ctx = canvas.getContext("2d");
				ctx.drawImage(this, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);

				var dataURL = canvas.toDataURL("image/png");
				var cleaned = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
				firebase.database().ref(pos).set(cleaned);
				// firebase.database().ref(ss.options.BizName + "/logo").set(cleaned);
				var lRef = firebase.database().ref(ss.options.BizName);
				var lDeals = $firebaseObject(lRef);
				$scope.loadedDeal = lDeals;
			};
			img.src = url;
		}, 2000);
	};

}
