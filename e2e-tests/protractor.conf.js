exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    '*.js'
  ],

  directConnect: true,

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:8088/app/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
