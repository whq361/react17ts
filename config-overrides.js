var {
  override,
  addLessLoader,
  addWebpackAlias,
  fixBabelImports,
  addPostcssPlugins,
  addWebpackPlugin,
} = require('customize-cra');
var path = require('path');
var paths = require('react-scripts/config/paths');
var defaultSettings = require('./config/defaultSettings');
var WebpackAliOss = require('webpack-alioss-plugin');
var CopyPlugin = require('copy-webpack-plugin');
const { DefinePlugin } = require('webpack');


// var ossConfig = {
//   bucket: process.env.WEBPACK_ALIOSS_PLUGIN_BUCKET,
//   region: process.env.WEBPACK_ALIOSS_PLUGIN_REGION,
//   accessKeyId: process.env.WEBPACK_ALIOSS_PLUGIN_ACCESS_KEY_ID,
//   accessKeySecret: process.env.WEBPACK_ALIOSS_PLUGIN_ACCESS_KEY_SECRET,
// }

var { SERVER_ENV } = process.env;
var environment = ''
if (SERVER_ENV) {
  environment = `${SERVER_ENV}/${defaultSettings.version}`
}
var ossPathMap = [
  'URL',
  'URL'
];
var cdnPath = '/';

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    libraryDirectory: 'es',
    style: true,
  }),
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {
        "@hd": "2px",
        "@primary-color": "#1DA57A", // for example, you use Ant Design to change theme color.
      },
      cssLoaderOptions: {}, // .less file used css-loader option, not all CSS file.
      cssModules: {
        localIdentName: "[path][name]__[local]--[hash:base64:5]", // if you use CSS Modules, and custom `localIdentName`, default is '[local]--[hash:base64:5]'.
      },
    },
  }),
  addPostcssPlugins([
    require('postcss-px-to-viewport')({
      unitToConvert: 'px',
      viewportWidth: 750,
      unitPrecision: 3,
      propList: ['*'],
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      selectorBlackList: ['.ignore'],
      minPixelValue: 1,
      mediaQuery: false,
      replace: true,
      exclude: undefined,
      include: undefined,
      landscape: false,
      landscapeUnit: 'vw',
      landscapeWidth: 568,
    })
  ]),
  addWebpackPlugin(new DefinePlugin({
    VERSION: JSON.stringify(defaultSettings.version),
  })),
  // (config) => { //暴露webpack的配置 config ,env
  //   if (SERVER_ENV) {
  //     paths.appBuild = path.join(path.dirname(paths.appBuild), 'dist');
  //     config.output.path = path.join(path.dirname(config.output.path), 'dist');
  //     var ossRoute = `/xiaoxiong/parent-child/h5/${SERVER_ENV}/${defaultSettings.version}/`;
  //     cdnPath = `${ossPathMap[0]}${ossRoute}`;
  //     if (SERVER_ENV === 'prod' || SERVER_ENV === 'live') {
  //       cdnPath = `${ossPathMap[1]}${ossRoute}`;
  //     }
  //     config.output.publicPath = cdnPath;
  //     process.env.PUBLIC_URL = cdnPath;
  //     console.log(`正在打包并上传静态资源到 : xiaoxiong/parent-child/h5/${SERVER_ENV}/${defaultSettings.version}/ ...`)
  //     config.plugins = [...config.plugins,
  //     new CopyPlugin({
  //       patterns: [
  //         { from: "./public/logo.png", to: "./logo.png" },
  //         { from: "./public/favicon.ico", to: "./favicon.ico" },
  //         { from: "./public/manifest.json", to: "./manifest.json" },
  //       ],
  //     }),
  //     new WebpackAliOss({
  //       ossBaseDir: 'xiaoxiong/parent-child/h5/',
  //       project: environment,
  //       auth: ossConfig,
  //       removeMode: false,
  //       existCheck: false,
  //       // exclude: /.*\.mainfest$/,
  //     })
  //     ];
  //   }

  //   return config;
  // }
)