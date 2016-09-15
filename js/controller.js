angular.module('hackathon2016.KnowB4UGo', []);
angular.module('hackathon2016.KnowB4UGo')

	.controller('BathroomCtrl', ['$scope','$http', function ($scope, $http) {
		
			$scope.data = { "floor": "12", "gender":"F", "status": 1};
			$scope.floorOptions = [ { "code": "3", "description": "3rd Floor"},
									{ "code": "4", "description": "4th Floor"},
									{ "code": "5", "description": "5th Floor"},
									{ "code": "12", "description": "12th Floor"},
									{ "code": "13", "description": "13th Floor"},
									{ "code": "14", "description": "14th Floor"}];

			$scope.genderOptions = [{"code": "F", "description":"Female"}, {"code": "M", "description": "Male"}]
			
			
			var floor = $scope.data.floor;
			var gender = $scope.data.gender;
			var bathroomId = 8;
			
			$http({ method: 'GET', 
				url: 'https://hackathonservice.herokuapp.com/status/' + bathroomId
				})
				.then(function successCallback(response){
					$scope.data.status = response.data[0].status;
				}, function errorCallback(response){
					
				});			
			
			
}]);