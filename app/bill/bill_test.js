'use strict';

describe('myApp.bill module Bad Data', function() {

  beforeEach(module('myApp.bill'));

  var mockScope, mockService, BillCtrl;

  beforeEach(function() {
  	mockService = {
      // Data has errors in totals - error should be detected
	  	query: function(billId) {
	  		return {
          "statement": {
            "generated": "2015-01-11",
            "due": "2015-01-25",
            "period": {
              "from": "2015-01-26",
              "to": "2015-02-25"
            }
          },
          "total": 136.03,
          "package": {
            "subscriptions": [
              { "type": "tv", "name": "Variety with Movies HD", "cost": 50.00 },
              { "type": "talk", "name": "Sky Talk Anytime", "cost": 5.00 },
              { "type": "broadband", "name": "Fibre Unlimited", "cost": 16.40 }
            ],
            "total": 71.40
          },
          "callCharges": {
            "calls": [
              { "called": "07716393769", "duration": "00:23:03", "cost": 2.13 },
              { "called": "07716393769", "duration": "00:23:03", "cost": 2.13 },
              { "called": "07716393769", "duration": "00:23:03", "cost": 2.13 },
              { "called": "07716393769", "duration": "00:23:03", "cost": 2.13 },
              { "called": "07716393769", "duration": "00:23:03", "cost": 2.13 },
              { "called": "07716393769", "duration": "00:23:03", "cost": 2.13 },
              { "called": "07716393769", "duration": "00:23:03", "cost": 2.13 },
              { "called": "07716393769", "duration": "00:23:03", "cost": 2.13 },
              { "called": "07716393769", "duration": "00:23:03", "cost": 2.13 },
              { "called": "07716393769", "duration": "00:23:03", "cost": 2.13 },
              { "called": "07716393769", "duration": "00:23:03", "cost": 2.13 },
              { "called": "07716393769", "duration": "00:23:03", "cost": 2.13 },
              { "called": "07716393769", "duration": "00:23:03", "cost": 2.13 },
              { "called": "07716393769", "duration": "00:23:03", "cost": 2.13 },
              { "called": "07716393769", "duration": "00:23:03", "cost": 2.13 },
              { "called": "07716393769", "duration": "00:23:03", "cost": 2.13 },
              { "called": "07716393769", "duration": "00:23:03", "cost": 2.13 },
              { "called": "07716393769", "duration": "00:23:03", "cost": 2.13 },
              { "called": "02074351359", "duration": "00:23:03", "cost": 2.13 },
              { "called": "02074351359", "duration": "00:23:03", "cost": 2.13 },
              { "called": "02074351359", "duration": "00:23:03", "cost": 2.13 },
              { "called": "02074351359", "duration": "00:23:03", "cost": 2.13 },
              { "called": "02074351359", "duration": "00:23:03", "cost": 2.13 },
              { "called": "02074351359", "duration": "00:23:03", "cost": 2.13 },
              { "called": "02074351359", "duration": "00:23:03", "cost": 2.13 },
              { "called": "02074351359", "duration": "00:23:03", "cost": 2.13 },
              { "called": "02074351359", "duration": "00:23:03", "cost": 2.13 },
              { "called": "02074351359", "duration": "00:23:03", "cost": 2.13 }
            ],
            "total": 59.64
          },
          "skyStore": {
            "rentals": [
              { "title": "50 Shades of Grey", "cost": 4.99 }
            ],
            "buyAndKeep": [
              { "title": "That's what she said", "cost": 9.99 },
              { "title": "Broke back mountain", "cost": 9.99 }
            ],
            "total": 24.97
          }
        };
	  	}
	  };
  });

  beforeEach(function() {
	  spyOn(mockService, 'query').andCallThrough();
	});

  beforeEach(inject(function($rootScope, $controller) {
  	mockScope = $rootScope.$new();
  	BillCtrl  = $controller('BillCtrl', {
  		$scope: mockScope,
  		BillService: mockService
  	});
  }));

  describe('Bill controller', function(){

    it('Controller should exist', function() {
      //spec body
      expect(BillCtrl).toBeDefined();
    });

    it('Should query BillService', function() {
    	expect(mockService.query).toHaveBeenCalled();
    });

    it('Creates scope variable', function() {
    	expect(mockScope.bill).toBeDefined();
    });

    it('CheckBill should spot errors in Totals', function() {
      mockScope.checkBill();
      expect(mockScope.inError).toEqual(true);
    });

  });
});


// Testing with GOOD DATA
describe('myApp.bill module Good Data', function() {

  beforeEach(module('myApp.bill'));

  var mockScope, mockService, BillCtrl;

  beforeEach(function() {
    mockService = {
      // Data has errors in totals - error should be detected
      query: function(billId) {
        return {
          "statement": {
            "generated": "2015-01-11",
            "due": "2015-01-25",
            "period": {
              "from": "2015-01-26",
              "to": "2015-02-25"
            }
          },
          "total": 156.01,
          "package": {
            "subscriptions": [
              { "type": "tv", "name": "Variety with Movies HD", "cost": 50.00 },
              { "type": "talk", "name": "Sky Talk Anytime", "cost": 5.00 },
              { "type": "broadband", "name": "Fibre Unlimited", "cost": 16.40 }
            ],
            "total": 71.40
          },
          "callCharges": {
            "calls": [
              { "called": "07716393769", "duration": "00:23:03", "cost": 2.13 },
              { "called": "07716393769", "duration": "00:23:03", "cost": 2.13 },
              { "called": "07716393769", "duration": "00:23:03", "cost": 2.13 },
              { "called": "07716393769", "duration": "00:23:03", "cost": 2.13 },
              { "called": "07716393769", "duration": "00:23:03", "cost": 2.13 },
              { "called": "07716393769", "duration": "00:23:03", "cost": 2.13 },
              { "called": "07716393769", "duration": "00:23:03", "cost": 2.13 },
              { "called": "07716393769", "duration": "00:23:03", "cost": 2.13 },
              { "called": "07716393769", "duration": "00:23:03", "cost": 2.13 },
              { "called": "07716393769", "duration": "00:23:03", "cost": 2.13 },
              { "called": "07716393769", "duration": "00:23:03", "cost": 2.13 },
              { "called": "07716393769", "duration": "00:23:03", "cost": 2.13 },
              { "called": "07716393769", "duration": "00:23:03", "cost": 2.13 },
              { "called": "07716393769", "duration": "00:23:03", "cost": 2.13 },
              { "called": "07716393769", "duration": "00:23:03", "cost": 2.13 },
              { "called": "07716393769", "duration": "00:23:03", "cost": 2.13 },
              { "called": "07716393769", "duration": "00:23:03", "cost": 2.13 },
              { "called": "07716393769", "duration": "00:23:03", "cost": 2.13 },
              { "called": "02074351359", "duration": "00:23:03", "cost": 2.13 },
              { "called": "02074351359", "duration": "00:23:03", "cost": 2.13 },
              { "called": "02074351359", "duration": "00:23:03", "cost": 2.13 },
              { "called": "02074351359", "duration": "00:23:03", "cost": 2.13 },
              { "called": "02074351359", "duration": "00:23:03", "cost": 2.13 },
              { "called": "02074351359", "duration": "00:23:03", "cost": 2.13 },
              { "called": "02074351359", "duration": "00:23:03", "cost": 2.13 },
              { "called": "02074351359", "duration": "00:23:03", "cost": 2.13 },
              { "called": "02074351359", "duration": "00:23:03", "cost": 2.13 },
              { "called": "02074351359", "duration": "00:23:03", "cost": 2.13 }
            ],
            "total": 59.64
          },
          "skyStore": {
            "rentals": [
              { "title": "50 Shades of Grey", "cost": 4.99 }
            ],
            "buyAndKeep": [
              { "title": "That's what she said", "cost": 9.99 },
              { "title": "Broke back mountain", "cost": 9.99 }
            ],
            "total": 24.97
          }
        };
      }
    };
  });

  beforeEach(function() {
    spyOn(mockService, 'query').andCallThrough();
  });

  beforeEach(inject(function($rootScope, $controller) {
    mockScope = $rootScope;
    BillCtrl  = $controller('BillCtrl', {
      $scope: mockScope,
      BillService: mockService
    });
  }));

  describe('Bill controller', function(){

    it('CheckBill should spot errors in Totals', function() {
      mockScope.checkBill();
      expect(mockScope.inError).toEqual(false);
    });

  });
});