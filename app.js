var app = angular.module('myApp', []);

app.controller('movieCtrl', function($scope, $http) {

$scope.submitSearch = function (isValid){

$scope.searchHeader = "";
//Get the current date, don't let the user submit a year after that or a year before 1900
var currentTime = new Date();
var year = currentTime.getFullYear();
if ($scope.birthyear < 1900 || $scope.birthyear > year){
  isValid = false;
}
//If the data is valid...
if (isValid){
	  //this url is the omdbapi with my key, the t command is designed to search the movie database and return a single movie based on the title
	  $scope.urlsearch = "http://www.omdbapi.com/?t="+$scope.search+"&apikey=c2609f89";
	  //we use angulars $http.get to return a promise after trying to GET data from our api query containing the user's search
	  $http.get($scope.urlsearch).then(function (response) {
      //myData refers to the json that is returned from the API
	  $scope.myData = response.data;
	  //year is a field in the JSON that contains the year the movie was released, subtract that from the birthyear
      $scope.calculate = $scope.myData.Year - $scope.birthyear;
	  //title is a field in the JSON containing the movie's title
      $scope.searchHeader = "IMDB Search Result: " + $scope.myData.Title;  
      if ($scope.calculate >= 0){
      $scope.display = "You were " + $scope.calculate + " when it came out";
      }
	  //if subtracting the title year from your birthyear is negative then the movie came out 
	  //before you were born so take the absolute value to make it positive and change the display text
      else if ($scope.calculate < 0){
      $scope.calculate= abs($scope.calculate);
      $scope.display = "This movie came out " + $scope.calculate + " years before you were born!"; 
      }	
	  //a catch all for if the returned JSON is undefined or has an error
      else {
      $scope.display = "Invalid search, no results!";
      $scope.searchHeader = "";  
      }
      
  });
}
else{
  $scope.display = "Invalid birthyear entered. Enter a year from 1900 to the current year";
}
};
});