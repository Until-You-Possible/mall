
var webpack           = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 环境变量配置，dev / online
var WEBPACK_ENV         = process.env.WEBPACK_ENV || 'dev';

//对html模板的处理 把html页面打包到dist文件夹下  总方法
var getHtmlConfig     = function (name, title) {
    return {
        template : './src/view/' + name + '.html',
        filename : 'view/' + name + '.html',
        inject   : true,
        hash     : true,
        title    : title,
        chunks   : ['common', name]
    }
}

var config = {
    entry: {
        'common'              : ['./src/page/common/index.js'],
        'index'               : ['./src/page/index/index.js'],
        'list'                : ['./src/page/list/index.js'],
        'detail'              : ['./src/page/detail/index.js'],
        'order-confirm'       : ['./src/page/order-confirm/index.js'],
        'order-detail'        : ['./src/page/order-detail/index.js'],
        'cart'                : ['./src/page/cart/index.js'],
        'user-login'          : ['./src/page/user-login/index.js'],
        'user-register'       : ['./src/page/user-register/index.js'],
        'user-pass-reset'     : ['./src/page/user-pass-reset/index.js'],
        'user-center'         : ['./src/page/user-center/index.js'],
        'user-center-update'  : ['./src/page/user-center-update/index.js'],
        'user-pass-update'    : ['./src/page/user-pass-update/index.js'],
        'result'              : ['./src/page/result/index.js'],
        'payment'             : ['./src/page/payment/index.js'],
        'order-list'          : ['./src/page/order-list/index.js'],
        'about'               : ['./src/page/about/index.js'],
        
    },
    output: {
        path        : __dirname + '/dist/',
        publicPath  : 'dev' === WEBPACK_ENV ? '/dist/' : '//s.happymmall.com/mall/dist/',
        filename    : 'js/[name].js'
    },
    externals  : {
        'jquery': 'window.jQuery'
    },
    resolve    : {
        alias: {
            until           : __dirname + '/src/until',
            page            : __dirname + '/src/page',
            service         : __dirname + '/src/service',
            image           : __dirname + '/src/image',
            node_modules    : __dirname + '/node_modules',
        }
    },
    module     : {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
            {
                test: /\.string$/, 
                loader: 'html-loader',
                query : {
                    minimize : true,
                    removeAttributeQuotes : false
                }
            }
        ]
    },
    plugins: [
        //独立通用的js模块
        new webpack.optimize.CommonsChunkPlugin({
            name     : 'common',
            filename : 'js/base.js'
        }),
        //把css文件单独打包到dist文件中
        new ExtractTextPlugin("css/[name].css"),
        new HtmlWebpackPlugin(getHtmlConfig('index' , '主页')),
        new HtmlWebpackPlugin(getHtmlConfig('list' , '商品列表')),
        new HtmlWebpackPlugin(getHtmlConfig('detail' , '商品详情页面')),
        new HtmlWebpackPlugin(getHtmlConfig('cart' , '购物车页面')),
        new HtmlWebpackPlugin(getHtmlConfig('order-confirm' , '订单确认页')),
        new HtmlWebpackPlugin(getHtmlConfig('order-detail' , '订单详情页面')),
        new HtmlWebpackPlugin(getHtmlConfig('payment', '订单支付')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login' , '登陆页面')),
        new HtmlWebpackPlugin(getHtmlConfig('order-list', '订单列表')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register' , '注册页面')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset' , '找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center' , '个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update' , '修改个人信息')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update' , '修改密码')),
        new HtmlWebpackPlugin(getHtmlConfig('result' , '操作结果')),
        new HtmlWebpackPlugin(getHtmlConfig('about', '关于MMall')),
    ]
};

if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8080/');
}

module.exports = config;