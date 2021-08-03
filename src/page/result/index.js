
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm=require('until/mm.js');


$(function(){
    var type        = _mm.getUrlParama('type') || 'default',
        $element    = $('.' + type + '-success');
    if(type === 'payment'){
        var orderNumber  = _mm.getUrlParama('orderNumber'),
            $orderNumber = $element.find('.order-number');
        $orderNumber.attr('href', $orderNumber.attr('href') + orderNumber);
    }
    // 显示对应的提示元素
    $element.show();
})