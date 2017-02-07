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
            var targetType = $target.prop('checked');
            switch(event.target.type) {
                case "checkbox":
                    $target.prev().toggleClass('checked',targetType);
                    var className = event.target.className;
                    if(className){
                        if(className.indexOf('check-all') != -1) {
                            console.log($target.prev());
                            $target.prev().removeClass("indeterminate");
                            $("."+event.target.id).prop('checked',targetType).prev().toggleClass('checked',targetType);
                        }else{
                            if($("."+className+":checked").length > 0 && $("."+className+":checked").length < $("."+className).length) {
                                $("#"+className).prop("checked",true).prev().addClass("indeterminate").removeClass("checked");
                            }else if($("."+className+":checked").length == $("."+className).length)
                            {
                                $("#"+className).prop("checked",true).prev().addClass("checked").removeClass("indeterminate");
                            }else if($("."+className+":checked").length == 0){
                                $("#"+className).prop("checked",false).prev().removeClass("indeterminate");
                            }
                        }
                    }
                    break;
                case "radio":
                    $target.prev().addClass('checked').parent('label').siblings().find('i').removeClass('checked');
                    break;

            }

        });
        return this;
    },
    upload: function (config) {
        return this.each(function () {
            $(this).on("change", function () {
                var files = this.files,
                    dataType = $(this).attr("data-type"),
                    multiple = $(this).prop("multiple");
                switch (dataType) {
                    case "image":
                        for (var i = 0; i < files.length; i++) {
                            var name = files[i].name,
                                fileSize = files[i].size;
                            if (!config.fileTypeExts.test(name)) {
                                alert(files[i].name + "文件格式不正确");
                            } else if (fileSize / 1024 / 1024 > config.fileSize) {
                                alert(files[i].name + "文件过大");
                            } else {

                                (function (i) {
                                    var img = new Image();
                                    img.src = window.URL.createObjectURL(files[i]);
                                    console.log(img.src);
                                    img.onload = function () {
                                        if (config.width && (img.width != config.width)) {
                                            alert(files[i].name + "图片宽度不正确");
                                        } else if (config.height && (img.height != config.height)) {
                                            alert(files[i].name + "图片高度不正确");
                                        } else if ((config.maxHeight && (img.height > config.maxHeight)) || (config.maxWidth && (img.width > config.maxWidth))) {
                                            alert(files[i].name + "图片尺寸不正确");
                                        } else {
                                            $xhr(files[i], i + 1, config);
                                        }
                                        window.URL.revokeObjectURL(img.src);
                                    };
                                })(i);
                            }
                        }
                        break;
                    case "doc":
                        for (var i = 0; i < files.length; i++) {
                            var name = files[i].name,
                                fileSize = files[i].size;
                            if (!config.fileTypeExts.test(name)) {
                                alert(name + "文件格式不正确");
                            } else if (fileSize / 1024 / 1024 > config.fileSize) {
                                alert(name + "文件过大");
                            } else {
                                $xhr(files[i], config);
                            }
                        }
                }

            });
        })
    }
});
$(".preview").on("click",".glyphicon-remove-sign",function(){
    $(this).parents(".thumbnail-box").remove();
});
 // 上传文件添加dom树
function thumbnailHtml(data) {
    console.log(data);
    var html = '<div class="col-xs-6 col-md-2 thumbnail-box">\
                    <div class="thumbnail text-danger">\
                    <span class="glyphicon glyphicon-remove-sign"></span>\
                    <img src='+data.responseJSON.icon+' alt="...">\
                    </div>\
                </div>';
    return html;
}
// 根据参数个数判断是上传图片还是文件
function $xhr(arg1, arg2, arg3) {
    var data = new FormData();
    data.append("file", arg1);
    switch (arguments.length) {
        case 3:
            $.ajax({
                processData: false,
                type: "POST",
                contentType: false,
                url: arg3.url,
                data: data,
                complete: function (data) {
                    arg3.preview(data, arg2);
                },
                xhr: function () { //获取ajaxSettings中的xhr对象，为它的upload属性绑定progress事件的处理函数
                    var myXhr = $.ajaxSettings.xhr();
                    if (myXhr.upload) { //检查upload属性是否存在
                        //绑定progress事件的回调函数
                        myXhr.upload.addEventListener('progress', function (e) {
                            if (e.lengthComputable) {
                                var bili = e.loaded / e.total;
                                console.log(bili);
                            }
                        }, false);
                    }
                    return myXhr; //xhr对象返回给jQuery使用
                }
            });
            break;
        case 2:
            $.ajax({
                processData: false,
                type: "POST",
                contentType: false,
                url: arg2.url,
                data: data,
                complete: function (data) {
                    arg2.preview(data);
                },
                xhr: function () { //获取ajaxSettings中的xhr对象，为它的upload属性绑定progress事件的处理函数
                    var myXhr = $.ajaxSettings.xhr();
                    if (myXhr.upload) { //检查upload属性是否存在
                        //绑定progress事件的回调函数
                        myXhr.upload.addEventListener('progress', function (e) {
                            if (e.lengthComputable) {
                                var bili = (e.loaded / e.total).toFixed(2);
                                $("#" + arg2.progress + " .progress-bar").css("width", bili * 100 + "px").text(bili * 100 + "%");
                            }
                        }, false);
                    }
                    return myXhr; //xhr对象返回给jQuery使用
                }
            });
            break;
    }
}