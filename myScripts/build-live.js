var crossenv = require('cross-env');
var defaultSettings = require('../config/defaultSettings');
var ossPath = 'URL';
var ossRoute = `/${defaultSettings.version}/`;



crossenv([
    // `PUBLIC_URL=${ossPath}${ossRoute}`,
    "PUBLIC_URL=/",
    "SERVER_ENV=live",
    "react-app-rewired",
    "build"
]);
