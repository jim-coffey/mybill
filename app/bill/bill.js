'use strict';

angular.module('myApp.bill', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/bill', {
    templateUrl: 'bill/bill.html',
    controller: 'BillCtrl'
  });
}])

.controller('BillCtrl', ['$scope', 'BillService', function($scope, BillService) {
	$scope.inError = false;
	$scope.bill    = BillService.query();

	$scope.$watch('bill.$resolved', function(resolved) {
		if (resolved) {
			$scope.checkBill();
		}
	});

	$scope.checkBill = function() {
		var calculatedTotal = $scope.bill.package.total + 
		                      $scope.bill.callCharges.total + 
		                      $scope.bill.skyStore.total;

		calculatedTotal = +calculatedTotal.toFixed(2);
		if (calculatedTotal != $scope.bill.total) {
			// Rather than displaying error to customer
			// Could have ajax call to flag the bill as in error on the server
			$scope.inError = true;
		}
	}
}]);