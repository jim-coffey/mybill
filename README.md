# My Bill

Angular.js application presenting a Sky Bill from json data.

Server : node http-server.

Unit Testing : Karma

E2E Testing : Protractor

## Requirements

Must have Node.js, npm, and bower installed

## Install
```
npm install
```
This will install all required node_modules;
And will also run 'bower install' to the directory app/bower_components

(Preferably you should run `npm run update-webdriver` from the command line also prior to running any Protractor tests)

## Running the Application
```
npm start
```
Then use a browser to navigate to :
```
http://localhost:8088/app
```
N.B. : The warning is intended.

## Runnng Unit Tests
```
npm test
```
Unit tests for the application are in app/bill/bill_test.js
karma.conf.js is in the root

Controller checks that bill totals add up, and we unit test with both good and bad data.

## Running End-to-End Tests
```
npm run protractor
```
End to end configuration and scenarios are in the e2e-tests/ directory

These tests expect good data and will fail if bill totals don't add up
