/*
    app.js, main Angular application script
    define your module and controllers here
*/

"use strict";

var reviewsUrl = 'https://api.parse.com/1/classes/reviews';

angular.module('ReviewsApp', ['ui.bootstrap'])
    .config(function($httpProvider) {
        $httpProvider.defaults.headers.common['X-Parse-Application-Id'] = 'A9EviMjFnquTlmVlRWghAAuOv9YZjnpYjRH6AFbw';
        $httpProvider.defaults.headers.common['X-Parse-REST-API-Key'] = 'G508ig1FqBVtjMXXh4v620ryqNWIJCih302SRQO8';
    })
    .controller('ReviewsController', function($scope, $http) {
        $scope.refreshReviews = function() {
            $scope.loading = true;
            $http.get(reviewsUrl)
                .success(function(data) {
                    $scope.reviews = data.results;
                })
                .error(function(err) {
                    $scope.errorMessage = err;
                })
                .finally(function() {
                    $scope.loading = false;
                });
        };

        $scope.refreshReviews();

        $scope.newReview = {};

        $scope.addReview = function() {
            $http.post(reviewsUrl, $scope.newReview)
                .success(function(responseData) {
                    $scope.newReview.objectId = responseData.objectId;
                    $scope.reviews.push($scope.newReview);
                    $scope.newReview = {};
                })
                .error(function(err) {
                    $scope.errorMessage = err;
                });
        };

        //$scope.incrementVotes = function(comment, amount) {
        //    $scope.updating = true;
        //    if (!(amount == -1 && comment.score == 0)) {
        //
        //        $http.put(commentsUrl + '/' + comment.objectId, {
        //            score: {
        //                __op: 'Increment',
        //                amount: amount
        //            }
        //        })
        //            .success(function (responseData) {
        //                console.log(responseData);
        //                comment.score = responseData.score;
        //            })
        //            .error(function (err) {
        //                console.log(err)
        //            })
        //            .finally(function () {
        //                $scope.updating = false;
        //            })
        //    }
        //}
        //
        //$scope.deleteComment = function(comment) {
        //    $scope.updating = true;
        //    $http.delete(commentsUrl + '/' + comment.objectId)
        //        .success(function (responseData) {
        //            $scope.refreshComments();
        //        })
        //        .error(function (err) {
        //            console.log(err);
        //        })
        //        .finally(function () {
        //            $scope.updating = false;
        //        })
        //}
    });