var ticketControllers = angular.module('ticketControllers', ['ngStorage', 'ngSanitize', "firebase", 'ngFileUpload', 'ngImgCrop', 'slick', 'ngAnimate']);

ticketControllers.controller('TicketController', ['$rootScope', '$scope', '$http', '$localStorage', '$sce', 'Upload', '$timeout', 'analytics', '$firebaseObject', '$firebaseArray', '$firebaseAuth', 'shareDataService', '$location',
    function ($rootScope, $scope, $http, $localStorage, $sce, Upload, $timeout, analytics, $firebaseObject, $firebaseArray, $firebaseAuth, shareDataService, $location) {

        $scope.$storage = $localStorage.$default({
            ticket: $scope.ticketdata,
        });

        var ss = $scope.$storage;


        $scope.ticketOrder = 'ticketTitle';
        $scope.ticketSearch = '';

        $scope.bc = 10;

        $scope.showTicket = function (ind) {
            for (var i; i < ss.length; i++) {
                if (i == ind) {
                    $scope.show = true;
                } else {
                    $scope.show = false;
                }
            }
        };

        $scope.ticketBackground = function (color) {
            ss.ticketText = ss.ticketText;
            ss.ticketBgColor = color;
            $scope.userFillColor = ss.ticketBgColor;
        };

        $scope.ticketTxtColor = function (color) {
            ss.ticketBgColor = ss.ticketBgColor;
            ss.ticketText = color;
            $scope.userTextColor = ss.ticketText;
        }

        $scope.previewStyle = function () {
            return "background-color: " + ss.ticketBgColor + "!important;" + "color: " + ss.ticketText + "!important;";
        }

        $scope.previewStyleInverse = function () {
            return "color: " + ss.ticketBgColor + "!important;" + "background-color: " + ss.ticketText + "!important;";
        }

        $scope.previewStyleBg = function () {
            return "background-color: " + ss.ticketBgColor + "!important;";
        }

        $scope.previewStyleTxt = function () {
            return "color: " + ss.ticketText + "!important;";
        }

        $scope.previewStyleInverseBg = function () {
            return "color: " + 'white' + "!important;" + "background-color: " + ss.ticketText + "!important;";
        }
        var ticketColorFilter = function (givenCol) {
            var col = givenCol;
            if (col != undefined) {
                col = col.replace('#', '');
            }
            return col;
        };

        $scope.barcodeSrc = function (tNum, bColor, tColor) {
            var useQR = true;
            var userBarcode = false;
            bColor = ticketColorFilter(bColor);
            tColor = ticketColorFilter(tColor);
            var final = "";
            var base = "";
            if (useQR) {
                var foreGroundColor = tColor;
                base = "http://generator.barcodetools.com/barcode.png?gen=3";
                final = base + "&data=" + tNum + "&bcolor=" + bColor + "&fcolor=" + foreGroundColor;
            }
            if (userBarcode) {
                base = "http://api-bwipjs.rhcloud.com/?bcid=code128";
                final = base + "&text=" + tNum + "&includetext" + "&scale=1";
            }
            return final;
        };

        ss.sampleView = false;

        $scope.textBtnStyle = function (bg) {
            return {
                'background': bg
            };
        };

        ss.user = ss.user != undefined ? ss.user : {};
        ss.user.styles = ss.user.styles != undefined ? ss.user.styles : {};
        if (ss.user.styles.selectedTicFormat == undefined && ss.user.styles.selectedTicFormatPre == undefined) {
            ss.user.styles.selectedTicFormat = 'partials/tickets/t1.html';
        }

        ss.user.styles.ticketFormats = {
            'formats': ['partials/tickets/t1.html', 'partials/tickets/t2.html', 'partials/tickets/t3.html']
        };

        // Limit number of badges and tickets to 10 because of the way this works
        ss.user.styles.setSelectedInd = function () {
            ss.user.styles.selectedInd = undefined;
            if ($('.choices').find('.slick-active')[1] != undefined) {
                ss.user.styles.selectedInd = Number($('.choices').find('.slick-active')[1].getAttribute('id').slice(-1));
            }
        };

        $scope.setListToPrint = function (list) {
            if (list.constructor === Array) {
                ss.user.print.BToPrint = list;
            } else {
                ss.user.print.BToPrint = [list];
            }
        };

        $scope.changeLan = function (lan) {
            console.log("lan");
            $rootScope.$storage.lan = lan;
            // location.reload();
        };

        calendarOps($rootScope, $scope, $http, $localStorage, analytics);
        dealOps($rootScope, $scope, $http, $localStorage, $firebaseObject, $firebaseArray, $firebaseAuth, $location), analytics;
        var userLang = navigator.language || navigator.userLanguage;

        $rootScope.$storage.en = en;
        $rootScope.$storage.ch = ch;
        if ($rootScope.$storage.lan == undefined) {
            $rootScope.$storage.lan = userLang.includes("en") ? $rootScope.$storage.en : $rootScope.$storage.ch;
        }
    }]);

