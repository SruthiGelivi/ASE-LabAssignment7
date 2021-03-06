// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('Application', ['ionic', ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})


.controller('TodoCtrl', function ($scope, $ionicModal, $http) {

    $scope.getAnalysis = function () {


                        var text1 = document.getElementById('text_input').value; 
                        var callback = $http.get("https://api.uclassify.com/v1/prfekt/mood/Classify?readkey=LBjvgm3r7lHZ&text="+text1);
                        callback.success(function (data) {
                            if(data!=null)
                            {
                                $scope.ReviewWithSentiment = {
                                                            "happy":data.happy,
                                                             "upset":data.upset  };
                                document.getElementById('div_ReviewList').style.display = 'block';


                            }
                        });


            }

    $scope.getData = function () {

                        var text1 = document.getElementById('text_input').value; 


                        var callback = $http.get("http://api.pearson.com/v2/dictionaries/entries?headword="+text1);
                        callback.success(function (data) {
                            if(data!=null)
                            {
                              console.log(data.results[0].headword);
                                var result1=data.results[0];
                               console.log(result1.senses[0]); 
                              $scope.ReviewWithData = {
                                                            "text":data.results[2].senses[0].definition,
                                                             "definition": data.results[2].senses[0].examples[0].text };



                            }
                        });


            }
});

