var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope,$http){
	console.log('Hello World');

	var refresh = function(){
		//the /contactList is the route where we are putting our data
		//this is also the get request to the server for /contactList 
		$http.get('/contactList').success(function(response){
			console.log('I got the data I requested');
			//this contactList variable is bound to the scope in the html file. Its the same variable
			//the response from the server is going to be the data for the contactList
			$scope.contactList = response;
			//this will clear the input boxes
			$scope.contact = "";
		});
	};

	//actually calling the refresh function which has the get request in it asking for the data from the server
	refresh();

	$scope.addContact = function() {
		console.log($scope.contact);
		//this post the data from the route /contactList (the scope.contact)  
		$http.post('/contactList', $scope.contact).success(function(response){
			console.log(response);
			refresh();
		});
	};

	$scope.remove = function(id){
		console.log(id);
		//deletes the id from the route as /contactList/id
		$http.delete('/contactList/' + id).success(function(response){
			refresh();
		});
	};

	$scope.edit = function(id) {
		console.log(id);
		$http.get('/contactList/' + id).success(function(response){
			$scope.contact = response;
		});
	};

	$scope.update = function() {
		console.log($scope.contact._id);
		$http.put('/contactList/' + $scope.contact._id, $scope.contact).success(function(response){
				refresh(); 
		});
	};

	$scope.deselect = function(){
			$scope.contact = "";
	};
	
}]);
