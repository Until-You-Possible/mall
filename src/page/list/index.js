require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm             = require('until/mm.js');
var _product        = require('service/product.js');
var Pagination      = require('until/pagination/index.js');
var templateIndex   = require('./index.string');
var pagination   = require('./index.string')

var page = {
    data : {
        listParam : {
            keyword         : _mm.getUrlParama('keyword')    || '',
            categoryId      : _mm.getUrlParama('categoryId') || '',
            orderBy         : _mm.getUrlParama('orderBy')    || 'default',
            pageNum         : _mm.getUrlParama('pageNum')    || 1,
            pageSize        : _mm.getUrlParama('pageSize')   || 20
        }
    },
    init: function(){
        this.bindEvent();
        this.onload();
    },
    onload: function(){
        this.loadList();
    },
    bindEvent: function(){
        //排序点击
        var _this = this;
        $(".sort-item").on("click",function(){
            var typeFirst = $(this).data('default');
            _this.data.listParam.pageNum = 1;
            var $this = $(this);
            if(typeFirst == 'default'){
                if($this.hasClass("active")){
                    return
                }else{
                    $this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
                    _this.data.listParam.orderBy = 'default';
                }
                //点击价格排序
            }else if($this.data('type') === 'price'){
                  // active class 的处理
                  $this.addClass('active').siblings('.sort-item')
                  .removeClass('active asc desc');
               // 升序、降序的处理  接口定义orderBy的class;
                if(!$this.hasClass('asc')){
                    $this.addClass('asc').removeClass('desc');
                    _this.data.listParam.orderBy = 'price_asc';
                }else{
                    $this.addClass('desc').removeClass('asc');
                    _this.data.listParam.orderBy = 'price_desc';
                }
            }
            //重新加载列表
            _this.loadList();
        });
    },
    loadList: function(){
        var that = this;
        var listHtml= '';
        var listParam = this.data.listParam;
        var $pListCon   = $('.p-list-con');
        $pListCon.html('<div class="loading"></div>');
        listParam.categoryId? (delete listParam.keyword) : (delete listParam.categoryId)
        _product.getProductList(listParam,function(res){
         listHtml=_mm.renderHtml(templateIndex,{
             list: res.list
         });
         $(".p-list-con").html(listHtml);
         that.loadPagination({
            hasPreviousPage : res.hasPreviousPage,
            prePage         : res.prePage,
            hasNextPage     : res.hasNextPage,
            nextPage        : res.nextPage,
            pageNum         : res.pageNum,
            pages           : res.pages
        });
        }, function(errMsg){
            _mm.errMsg(errMsg);
        });
 
     },
     //加载分页信息
     loadPagination(pageInfo){
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container : $('.pagination'),
            onSelectPage : function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadList();
            }
        }));
     }
}

$(function(){
    page.init();
});