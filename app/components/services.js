'use strict';

/* Services */

var myAppServices = angular.module('myAppServices', ['ngResource']);

myAppServices.factory('BillService', ['$resource',
  function($resource){
    return $resource('http://safe-plains-5453.herokuapp.com/bill.json', {}, {
      query: {method:'GET', params:{}, isArray:false}
    });
  }]);