'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const openInEditor =  require('launch-editor-middleware')



/**
 * 引入本地json文件
 * @type {createApplication}
 */
const express=require('express');
const app=express();
const dataJson=require('../src/sdk/package.json');
const bjxJson=require('../src/sdk/XZQFW.json');
const bjxJson1=require('../src/sdk/XZQFW1.json');
const rsverJson=require('../src/sdk/rsver.json');
const duty=dataJson.duty;
const bjx=bjxJson;
const bjx1=bjxJson1;
const rsver=rsverJson;
const apiRouters=express.Router();
app.use('/api',apiRouters);

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap, usePostCSS: true})
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    disableHostCheck:true,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? {warnings: false, errors: true}
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    before(app){
      /**
       * 值班人员
       */
      app.get('/api/duty',(req,res)=>{
        res.json({
          error:0,
          data:duty
        })
      }),
      /**
       * 边界线
       */
      app.get('/api/bjx',(req,res)=>{
        res.json({
          error:0,
          data:bjx
        })
      }),
      app.get('/api/bjx1',(req,res)=>{
        res.json({
          error:0,
          data:bjx1
        })
      }),
      /**
       * 水库json
       */
      app.get('/api/rsver',(req,res)=>{
        res.json({
          error:0,
          data:rsver
        })
      }),
      app.use(' / __ open-in-editor ',openInEditor())
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
  ]
});

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port;
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port;
      // add port to devServer config
      devWebpackConfig.devServer.port = port;

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
          ? utils.createNotifierCallback()
          : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
