/**
 * @author wanggang
 * @Date: 2017-12-25
 */

var Hogan = require('hogan.js');
var conf = {
    serverHost: ''
}
 var _mm = {
     request : function(param){
         var _this = this;
         $.ajax({
            type       : param.method || 'GET',
            url        : param.url  || '',
            dataType   : param.type || 'json',
            data       : param.data || '',
            success    : function(res){
                //请求成功
                if(res.status === 0){               
                    // typeof success === 'function' && param.success(res.data, res.msg);
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                }
                //如果没有登录，强制进行登录；
                else if(res.status === 10){
                    _this.doLogin();
                }
                 // 请求数据错误
                else if(res.status === 1){
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error      :function(res){
                typeof param.error === 'function' && param.error(res.statusText);
            }    
         });
     },
     doLogin      : function(){
         window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
     },
     //获取服务器地址
     getServerUrl : function(path){
         return conf.serverHost + path;
     },
     //获取URL参数
     getUrlParama : function(name){
         //先截取所有参数   ?k=X&l=X;
         var reg     = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
         var result  = window.location.search.substr(1).match(reg);
         return result ? decodeURIComponent(result[2]) : null;
     },
     //渲染html模板
     renderHtml : function(htmlTemplete, data){
         var templete = Hogan.compile(htmlTemplete);
         var result   = templete.render(data);
         return result;
     },
    //  成功提示
    successTips: function(msg){
        alert(msg || "操作成功");
    },
    errorTips: function(msg){
        alert(msg || "哪里不对了~~");
    },
    //验证规则，支持非空
    validate :  function(value, type){
        var value = $.trim(value);
        if('require' === type){
            return !! value;
        }
        //手机号验证
        if('phone'=== type){
            return /^1\d{10}$/.test(value);
        }
        //邮箱验证
        if('email'=== type){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    goHome: function(){
        window.location.href = './index.html';
    }
     
 }

 module.exports = _mm;