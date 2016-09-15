var app = angular.module('hackathon2016.KnowB4UGo', []);

app.controller('BathroomCtrl', ['$scope', '$timeout', '$http', 'DashboardStats', 'CleaningStats', 
			function($scope, $timeout, $http, DashboardStats, CleaningStats) {
    
	$scope.data = { "floor": "4", "gender":"1", "bathroomId": "3"};
	$scope.floorOptions = [ { "code": "3", "description": "3rd Floor"},
									{ "code": "2", "description": "4th Floor"},
									{ "code": "1", "description": "5th Floor"},
									{ "code": "4", "description": "12th Floor"},
									{ "code": "5", "description": "13th Floor"},
									{ "code": "6", "description": "14th Floor"}];

	$scope.genderOptions = [{"code": "1", "description":"Women"}, {"code": "2", "description": "Men"}]

    // get bathroom id when floor changes
	$scope.$watch("data.floor", function(newVal, oldVal){
		getBathroomId();
	})
	
	// get bathroom id when gender changes
	$scope.$watch("data.gender", function(newVal, oldVal){
		getBathroomId();
	})
		
    pollData();
    pollCleaningData();


    function pollData() {
    	DashboardStats.poll($scope.data.bathroomId).then(function(data) {
            $scope.statusData = data;
            $timeout(pollData, 1000);
        });
    }

    function pollCleaningData() {
    	CleaningStats.poll($scope.data.bathroomId).then(function(data) {
            $scope.cleaningStatusData = data;
            $timeout(pollCleaningData, 1000);
        });
    }
	
	function getBathroomId(){
        $http({ method: 'GET',
			url: 'https://hackathonservice.herokuapp.com/bathroom?floorId=' + $scope.data.floor + '&genderId=' + $scope.data.gender 
			}).then(function successCallback(response){
				$scope.data.bathroomId = response.data[0].bathroomId;
				}, function errorCallback(response){
		});		
	}

}]);

app.factory('DashboardStats', ['$http', '$timeout', function($http, $timeout) {
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

    var data = { response: { }, calls: 0 };

    var poller = function (bathroomId) {
		var url = 'https://hackathonservice.herokuapp.com/status/' + bathroomId
        return $http.get(url).then(function (responseData) {
            data.calls++;
            data.response = responseData.data[0];

            return data;
        });
    };

    return {
        poll: poller
    }
}]);

app.factory('CleaningStats', ['$http', '$timeout', function($http, $timeout) {
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

    //var bathroomId = 8;
    //var url = 'https://hackathonservice.herokuapp.com/status/' + bathroomId
    //var params = { "Command": "GetDashboardStats" };
    var data = { response: { }, calls: 0 };

    var poller = function (bathroomId) {
		var url = 'https://hackathonservice.herokuapp.com/cleaningstatus/' + bathroomId
        return $http.get(url).then(function (responseData) {
            data.calls++;
            data.response = responseData.data[0];

            return data;
        });
    };

    return {
        poll: poller
    }
}]);


app.controller('CleaningCtrl', ['$scope', '$timeout', '$http', function($scope, $timeout, $http) {

    $scope.data = { "floor": "4", "gender":"1", "bathroomId": "3"};
    $scope.floorOptions = [ { "code": "3", "description": "3rd Floor"},
        { "code": "2", "description": "4th Floor"},
        { "code": "1", "description": "5th Floor"},
        { "code": "4", "description": "12th Floor"},
        { "code": "5", "description": "13th Floor"},
        { "code": "6", "description": "14th Floor"}];

    $scope.genderOptions = [{"code": "1", "description":"Women"}, {"code": "2", "description": "Men"}]
    $scope.toggle = false;
    $scope.buttonText = $scope.toggle ? 'Open' : 'Closed for Cleaning';

    $scope.setCleaningStatus = function(){
        $scope.toggle = !$scope.toggle;
        var status = ($scope.toggle) ? 0 : 1;

        $http({ method: 'POST',
            url: 'https://hackathonservice.herokuapp.com/updatecleaning?id=3&status=' + status})
            .then(function successCallback(response){}, function errorCallback(response){});
    }
}]);