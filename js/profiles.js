var App = angular.module('ProfileApp', []);

App.controller("ProfileCtrl", ['$scope','ProfileService', function ($scope, ProfileService){
    $scope.selectedProfileId = null;
	$scope.profiles = [];
    $scope.createdProfiles = [];
    $scope.selectedProfile = {};
    

	  ProfileService.getProfileList().then(function(data) {
      $scope.profiles = data;
          //alert(data);
      }).catch(function() {
        $scope.error = 'unable to get the profiles';
      });
    
    $scope.selectProfile = function() {
        ProfileService.getProfileDetails($scope.selectedProfileId).then(function(data)
        {
            $scope.selectedProfile.name = data.full;
            $scope.selectedProfile.bio = data.bio;
            $scope.selectedProfile.fbprof = data.fbprof;
            
        }).catch(function(){
            $scope.error = 'error receiving profile details';
            alert($scope.error);
        })
    };
    
    $scope.createProfile = function() {
      
				$scope.createdProfiles.push({
					id: $scope.selectedProfileId,
					name: $scope.selectedProfile.name,
					bio: $scope.selectedProfile.bio,
                    fbprof: $scope.selectedProfile.fbprof
				});
    };
		
	}]);


	App.service('ProfileService',['$http',function($http){
        
        // get facebook profile list.
                this.getProfileList = function() {
                    return $http.get('http://duda-api-test.herokuapp.com/profiles').then(function(response) {    
                        return response.data;
                    });
                }
                
                this.getProfileDetails = function(profileid) {
                    return $http.get('http://duda-api-test.herokuapp.com/profile/' + profileid).then(function(response) {    
                        return response.data;
                    });
                }
        
	}]);
