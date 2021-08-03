require('./index.css');

var _mm = require('until/mm.js');

var header = {
    Init: function () {
        this.BindEvent();
        this.OnLoad();
    },
    OnLoad: function () {
        var keyword = _mm.getUrlParama('keyword');
        if (keyword) {
            $('#search-input').val(keyword);
        }
    },
    BindEvent: function () {
        var _this = this;
        $('#search-btn').on('click', function () {
            _this.SearchSubmit();
        });
        $("#search-input").on('click',function(e){
            if(e.keyCode == 13){
                _this.SearchSubmit();
            }
        })
    },
    SearchSubmit: function () {
        var keyword = $.trim($('#search-input').val());
        if (keyword) {
            //根据搜索关键字 跳转到对应的list页面；
            window.location.href = './list.html?keyword=' + keyword
        } else {
            _mm.goHome();
        }
    }
}

header.Init();