var crossenv = require('cross-env');
var defaultSettings = require('../config/defaultSettings');
var ossPath = 'URL';
var ossRoute = `/${defaultSettings.version}/`;


console.log("build-prod");

crossenv([
    // `PUBLIC_URL=${ossPath}${ossRoute}`,
    "PUBLIC_URL=/",
    "SERVER_ENV=prod",
    "react-app-rewired",
    "build"
]);
