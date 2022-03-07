var crossenv = require('cross-env');
var defaultSettings = require('../config/defaultSettings');
var ossPath = 'URL';
var ossRoute = `/${defaultSettings.version}/`;


console.log("build-dev");

crossenv([
    // `PUBLIC_URL=${ossPath}${ossRoute}`,
    "PUBLIC_URL=/",
    "SERVER_ENV=dev",
    "react-app-rewired",
    "build"
]);
