
require('./index.css');
var _mm = require('until/mm.js');
var templeteIndex = require('./index.string');

//侧边导航
var navSide = {
    option: {
        name: '',
        navList: [
            {
                name: 'user-center',
                desc: '个人中心',
                href: './user-center.html'
            },
            {
                name: 'order-list',
                desc: '我的订单',
                href: './order-list.html'
            },
            {
                name: 'pass-update',
                desc: '修改密码',
                href: './user-pass-update.html'
            },
            {
                name: 'about',
                desc: '关于MMall',
                href: './about.html'
            },
        ]
    },
    init: function(option){
        //合并选线
        $.extend(this.option, option);
        this.renderNav(option);
    },
    //渲染导航菜单
    renderNav: function(option){
        //计算active的数据
        for(var i=0;i<this.option.navList.length;i++){
            if(this.option.navList[i].name == this.option.name){
                this.option.navList[i].isActive = true;
            }
        }
        //渲染list数据
        var navHtml  = _mm.renderHtml(templeteIndex, {
            navList: this.option.navList
        });
        $(".nav-side").html(navHtml);
    }
}

module.exports = navSide;