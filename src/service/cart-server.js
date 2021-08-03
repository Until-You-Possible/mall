
var _mm = require('until/mm.js');

var _cart = {
    //退出
    getCartCount: function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/get_cart_product_count.do'),
            success : resolve,
            error   : reject
        })
    }
}
module.exports = _cart;