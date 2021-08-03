
require('./index.css');

//登录退出逻辑
var _mm = require('until/mm.js');
var _user = require('service/user-server.js');
var _cart = require('service/cart.js');

var nav = {
    init: function(){
        this.BindEvent();
        this.LoadUserInfo();
        this.loadCartCount();
        return this;
    },
    BindEvent: function(){
        //登录
        $('.js-login').on('click',function(){
            _mm.doLogin();
        });
        // 注册点击事件
        $('.js-register').click(function(){
            window.location.href = './user-register.html';
        });
        //退出
        $('.js-logout').on('click',function(){
            //后端删除登录状态
            _user.logout(function(res){
                window.location.reload();
            },function(err){
                _mm.errorTips(errMsg);
            });
        });
    },
    //加载用户信息
    LoadUserInfo: function(){
        _user.checkLogin(function(res){
            $('.user.not-login').hide().siblings('.user.login').show()
            .find('.username').text(res.username);
        },function(err){
            //do nothing;
        }); 
    },
    loadCartCount: function(){
        _cart.getCartCount(function(res){
            $('.nav .cart-count').text(res || 0);
        }, function(errMsg){
            $('.nav .cart-count').text(0);
        });
    }
}

module.exports = nav.init();