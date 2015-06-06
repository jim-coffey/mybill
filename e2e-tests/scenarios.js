'use strict';

describe('My skybill app', function() {

  browser.get('index.html');

  it('Should automatically redirect to /bill when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/bill");
  });

});

describe('Bill view', function() {

  beforeEach(function() {
    browser.get('index.html#/bill');
    browser.waitForAngular();
  });

  it('Should render bill when user navigates to /bill', function() {
    expect(element(by.css('.daterange')).getText()).toMatch(/^statement for period.*/i);
  });

  it('There should not be an error warning', function() {
    expect(element(by.id('in-error')).isPresent()).toEqual(false);
  });



  // The pure javascript named Callback way of doing things
  // to avoid Nestback Hell
  it('Bill totals should add up via named callbacks', function() {
    var grandTotal,
        sumTotal = 0;

    element(by.binding('bill.total')).evaluate('bill.total').then(function(value) {
      grandTotal = value;


      // The pure javascript named Callback way of doing things
      var sumTotal2 = 0;

      var storeTotals = function(value) {
        sumTotal2 += value;
        sumTotal2  = +sumTotal2.toFixed(2);
        expect(sumTotal2).toEqual(grandTotal);
      }

      var callCharges = function(value) {
        sumTotal2 += value;
        element(by.binding('bill.skyStore.total')).evaluate('bill.skyStore.total').then(function(value) {
          storeTotals(value);
        });
      }

      var packageTotals = function(value) {
        sumTotal2 += value;
        element(by.binding('bill.callCharges.total')).evaluate('bill.callCharges.total').then(function(value) {
          callCharges(value);
        });
      }

      element(by.binding('bill.package.total')).evaluate('bill.package.total').then(function(value) {
        packageTotals(value);
      });
      // END of the pure javascript async colution

    });
  });



  // Array of deferred promises - complete when .all() complete
  it('Bill totals should add up via array of promises', function() {
    var grandTotal,
        sumTotal = 0;

    element(by.binding('bill.total')).evaluate('bill.total').then(function(value) {
      grandTotal = value;


      // The protractor way of doing this
      var selectors = [
          'bill.package.total',
          'bill.callCharges.total',
          'bill.skyStore.total'
        ],
        totals = [],
        summed;

      // Build the array of interesting elements based on selectors
      for (var i=0; i<selectors.length; i++) {
        totals.push( element(by.binding(selectors[i])) );
      }

      // map the array of elements to promises that return the bound values
      summed = totals.map(function(total, index) {
        return total.evaluate(selectors[index]).then(function(value) {
          return value;
        });
      });

      // Once all the promises have resolved, total the returned values
      protractor.promise.all(summed).then(function(totals) {
        var sum = 0;

        for (var i=0; i<totals.length; i++) {
          sum += totals[i];
        }

        sum = +sum.toFixed(2);

        expect(sum).toEqual(grandTotal);
      });

    });
    // END of Protractor way to do it

  });



  // Aaahhhh, nested callbacks... use one of the other 2 solutions listed ABOVE this one!
  // This it() test is an example of what NOT to do - antipattern antipattern antipattern
  it('Bill totals should add up via nested callbacks', function() {
    var grandTotal,
        sumTotal = 0;

    element(by.binding('bill.total')).evaluate('bill.total').then(function(value) {
      grandTotal = value;


      // NOT the recommended way - looks neatest and shortest at the moment BUT ...
      // Nesting will get messier the larger the number of elements
      // Code growing horizontally indicates Callback Hell !
      element(by.binding('bill.package.total')).evaluate('bill.package.total').then(function(value) {
        sumTotal += value;
        element(by.binding('bill.callCharges.total')).evaluate('bill.callCharges.total').then(function(value) {
          sumTotal += value;
          element(by.binding('bill.skyStore.total')).evaluate('bill.skyStore.total').then(function(value) {
            sumTotal += value;
            sumTotal = +sumTotal.toFixed(2);
            expect(sumTotal).toEqual(grandTotal);
          });
        });
      });
      // END of NOT the way to do it

    });
  });

});