
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm    = require('until/mm.js');
var _user  = require('service/user-server.js');

var formError = {
    show : function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){
        $('.error-item').hide().find('.err-msg').text('');
    }
}
var page = {
    init: function(){
        this.bindEvent();
    },
    bindEvent: function(){
        var _this = this;
        $("#submit").on("click",function(){
            _this.submit();
        });
        //回车判断；
        $('.user-content').keyup(function(e){
            if(e.keyCode ==13){
                _this.submit();
            }
        })
    },
    submit:function(){
        var formData = {
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val()),
        }
        //验证表单结果
        validateresult = this.formValidate(formData);
        if(validateresult.status){
            //成功  提交信息
            _user.login(formData, function(res){
                console.log(_mm.getUrlParama('redirect'));
                window.location.href = _mm.getUrlParama('redirect') || './index.html'
            }, function(errMsg){
                formError.show(errMsg)
            });
        } else {
            //失败  提示信息
            formError.show(validateresult.msg);
        }
    },
    formValidate: function(formData){
        var  result = {
                status  : false,
                msg     : ''
        }
        if(!_mm.validate(formData.username,'require')){
            result.msg = '用户名不能为空';
            return result;
        }
        if(!_mm.validate(formData.password,'require')){
            result.msg = '密码不能为空';
            return result;
        }
        //通过验证
        result.status = true;
        result.msg = '验证通过';
        return result;

    }
}

$(function(){
    page.init();
});