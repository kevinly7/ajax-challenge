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
        $scope.refreshReviews = function(   ) {
            $scope.loading = true;
            $http.get(reviewsUrl + '?order=-votes')
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
                    $scope.refreshReviews()
                })
                .error(function(err) {
                    $scope.errorMessage = err;
                });
        };

        $scope.deleteReview = function(review) {
            $scope.updating = true;
            $http.delete(reviewsUrl + '/' + review.objectId)
                .success(function (responseData) {
                    $scope.refreshReviews();
                })
                .error(function (err) {
                    console.log(err);
                })
                .finally(function () {
                    $scope.updating = false;
                })
        }

        $scope.incrementVotes = function(review, amount) {
            $scope.updating = true;
            if (!(amount == -1 && review.score == 0)) {
                $http.put(reviewsUrl + '/' + review.objectId, {
                    votes: {
                        __op: 'Increment',
                        amount: amount
                    }
                })
                    .success(function (responseData) {
                        console.log(responseData);
                        review.votes = responseData.votes;
                    })
                    .error(function (err) {
                        console.log(err)
                    })
                    .finally(function () {
                        $scope.updating = false;
                    })
            }
        }
    });