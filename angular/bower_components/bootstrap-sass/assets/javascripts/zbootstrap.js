/**
 * Created by chenzhongying on 16/8/10.
 */
$.fn.extend({
    homeMenu: function(){ //导航
        var _this = this;
        nav();
        function nav(){
            _this.find('.nav-one').on("click",function(){
                $(this).parent().addClass('active').children('.nav-two').slideDown();
                $(this).parent().siblings().removeClass('active').children(".nav-two").slideUp();
            });
        };
        _this.find('#menu-flex-btn').on("click",function(){
            var ones = $(".nav-one");
            var wrap = $('.nav-wrap');
            _this.toggleClass("active");
            if(_this.hasClass('active')) {
                $(this).addClass('flex-left').removeClass('flex-right');
                wrap.removeClass('active').find(".nav-two").hide();
                ones.unbind("click");
                wrap.on('mouseenter', function(){
                    $(this).addClass('active').children('.nav-two').show();
                }).on('mouseleave',function(){ $(this).removeClass('active').children(".nav-two").hide()});

            }else{
                $(this).addClass('flex-right').removeClass("flex-left");
                wrap.unbind('mouseenter').unbind('mouseleave');
                nav();
            }
        });
        return this;
    },
    check: function(){ //表单单选复选
        $(this).find("[type='checkbox'],[type='radio']").on("change",function(event){
            var $target =$(event.target);
            if(event.target.type == 'checkbox') {
                $target.prev().toggleClass('checked',$target.prop('checked'));
                var className = event.target.className;
                if(className == 'check-all') {
                    $("."+event.target.id).prop('checked',event.target.checked).prev().toggleClass('checked',event.target.checked);
                }else{
                    var mark = false;
                    $("."+className).each(function(){
                        if(!$(this).prop('checked')) {
                            mark = true;
                        }
                    });
                    $("#"+className).prop("checked",!mark).prev().toggleClass('checked',!mark);
                }
            }else if(event.target.type == 'radio') {
                $target.prev().addClass('checked').parent('label').siblings().find('i').removeClass('checked');
            }
        });
        return this;
    }
});