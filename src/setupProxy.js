const createProxyMiddleware = require('http-proxy-middleware');

const targetMap = [
    'https://zlsy-dev.xiaoxiongyinyue.com',
    'https://zlsy-test.xiaoxiongyinyue.com',
    'https://zlsy-prod.xiaoxiongyinyue.com',
    'https://zlsy.xiaoxiongyinyue.com',
];

module.exports = function (app) {
    app.use(
        '/music',
        createProxyMiddleware({
            target: targetMap[0],
            changeOrigin: true,
        })
    );
};
