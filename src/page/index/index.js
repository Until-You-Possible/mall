

require('./index.css');
require('../modules.js');
require('page/common/nav-simple/index.js');
require('page/common/nav/index.js');
require('page/common/footer/index.js');
require('page/common/header/index.js');
require('page/result/index.js');
var templateBanner  = require('./banner.string');
var navSide = require('page/common/nav-side/index.js');
var _mm  = require("until/mm.js");

navSide.init({
    name : 'user-center'
});

$(function(){

        // 渲染banner的html
        var bannerHtml  = _mm.renderHtml(templateBanner);
        $('.banner-con').html(bannerHtml);
        // 初始化banner
        var $slider     = $('.banner').unslider({
            dots: true
        });
    
})


