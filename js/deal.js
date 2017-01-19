function dealOps($rootScope, $scope, $http, $localStorage, $firebaseObject, $firebaseArray, $firebaseAuth, $location) {
	const apiUrl = "https://calcreator-d490f.firebaseio.com/";
	const hostingUrl = "http://calcreator.me/";
	const storageRef = firebase.storage().ref();

	var urlStrArr = $location.path().split("/");

	const ss = $scope.$storage;

	ss.options = ss.options ? ss.options : {};

	var dealsRef = firebase.database().ref();

	var myDeals = $firebaseObject(dealsRef);

	$scope.deals = myDeals;

	$scope.dealImages = $scope.dealImages ? $scope.dealImages : [];

	function downloadImages(pos, dealsPage) {
		// Create a reference to the file we want to download
		if (dealsPage) {
			// 5 is the number of supported images
			for (var i = 1; i <= 5; i++) {
				var userImagesRefHead = storageRef.child(pos + i);
				// Get the download URL
				userImagesRefHead.getDownloadURL().then(function(url) {
					$scope.dealImages.push(url);
				}).catch(function(error) {
					console.log(error);
				});
			}
		} else {
			var userImagesRefHead = storageRef.child(pos);
			// Get the download URL
			userImagesRefHead.getDownloadURL().then(function(url) {
				ss.options.logo = url;
			}).catch(function(error) {
				console.log(error);
			});
		}
	};

	$scope.logo = function() {
		return ss.options.logo;
	};

	ss.options.bizNameFromUrl = decodeURIComponent(urlStrArr[urlStrArr.length - 1]);
	var nameToUse = ss.options.BizName;
	downloadImages(nameToUse + '/logo', false);
	downloadImages(nameToUse + '/gal/', true);
	if (urlStrArr[urlStrArr.length - 1] === 'make') {
		if (ss.options.BizName) {
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
		$http.get(apiUrl + nameToUse + ".json").then(function(response) {
			$scope.loadedDeal = response.data;
		}, function(response) {
			// failure callback
			console.log(response.data);
		});
	}

	$scope.dealUrl = function() {
		return hostingUrl + '%23!/d/' + encodeURIComponent(ss.options.BizName) + "/";
	};
	ss.options.uploading = false;
	$scope.uploadFiles = function(file, errFiles, pos) {
		ss.options.uploading = true;
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

				var uploadTask = firebase.storage().ref(pos).putString(cleaned, 'base64');

				uploadTask.on('state_changed', function(snapshot) {
					// Observe state change events such as progress, pause, and resume
					// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
					$scope.uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log('Upload is ' + $scope.uploadProgress + '% done');
					switch (snapshot.state) {
					case firebase.storage.TaskState.PAUSED:
						// or 'paused'
						console.log('Upload is paused');
						break;
					case firebase.storage.TaskState.RUNNING:
						// or 'running'
						console.log('Upload is running');
						break;
					}
				}, function(error) {
					// Handle unsuccessful uploads
				}, function() {
					console.log('Uploaded a base64 string!');
					location.reload();
					ss.options.uploading = false;
					var downloadURL = uploadTask.snapshot.downloadURL;
				});

				var lRef = firebase.database().ref(ss.options.BizName);
				var lDeals = $firebaseObject(lRef);
				$scope.loadedDeal = lDeals;
			};
			img.src = url;
		}, 2000);
	};

	$scope.deleteAllDeals = function() {

	};

	$scope.updateDeal = function(dealDescription, savings, dealStart, dealEnd) {
		var newDeal = {
			"description" : dealDescription,
			"savings" : savings,
			"start" : dealStart,
			"end" : dealEnd,
			"phone" : ss.options.pNum,
			"name" : ss.options.BizName,
			"logo" : ss.options.logo
		};
		firebase.database().ref(ss.options.BizName).set(newDeal);
	};

	// User details
	// images : logo
	// Add
	// Read
	// Synch

	// User Deal Details
	// images : logo + Company photos
}
