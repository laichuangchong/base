/**
 * Created by chenzhongying on 16/8/29.
 */
/**
 * Created by chenzhongying on 16/1/12.
 */
/*自定义手机号码格式*/
$.validator.addMethod("mobile", function (value, element) {
    return this.optional(element) || /^(17[0-9]|13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/.test(value);
}, "手机号码格式不正确");

/*自定义座机码格式*/
$.validator.addMethod("telephone", function (value, element) {
    return this.optional(element) || /^\d{3,4}\-\d{7,8}$/.test(value);
}, "座机号码格式不正确");

/*自定义qq格式*/
$.validator.addMethod("qq", function (value, element) {
    return this.optional(element) || /^[1-9][0-9]{4,}$/.test(value);
}, "qq号码格式不正确");

/*自定义总预算50元以,上可保留小数点后两位*/
$.validator.addMethod("budget", function (value, element) {
    return this.optional(element) || (value >= 50 && /^\d+(\.\d{0,2})?$/.test(value));
}, "不可低于50元/可保留小数点后两位");

/*自定义0以上,上可保留小数点后两位*/
$.validator.addMethod("cpm", function (value, element) {
    return this.optional(element) || (value >0 && /^\d+(\.\d{0,2})?$/.test(value));
}, "大于零/可保留小数点后两位");

/*数字在1-20之间保留小数点后两位*/
$.validator.addMethod("lttwenty", function(value, element) {
    return this.optional(element) || ( 20>=value && 0 <= value && /^\d+(\.\d{0,2})?$/.test(value));
}, "数字在1-20之间保留小数点后两位");

$.validator.addMethod("landing_url", function(value, element) {
    if (/^https?:\/\/([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*/i.test(value)) {
        return true;
    } else {
        try {
            var res = JSON.parse(value);
            return typeof res == 'object';
        } catch (e) {
            return false;
        }
    }
}, "不是合法的 json 格式");

jQuery.validator.addMethod("isAlpha", function(value, element) {
    var tel = /^[a-zA-Z]{1,50}$/;
    return this.optional(element) || (tel.test(value));
}, "请输入正确格式的用户名");

if($('#fullConfig_switch').length) {
    jQuery.validator.addMethod("required", function(value, element) {
        return this.optional(element) || ( value && $('#fullConfig_switch').prop('checked'));
    }, "必选/填字段");
}

/*非汉字*/
$.validator.addMethod("noChinese", function(value, element) {
    return this.optional(element) || /^[^\u4e00-\u9fa5]+$/g.test(value);
}, "不能出现汉字");

$.extend($.validator.messages, {
    required: "必选/填字段",
    remote: "请修正该字段",
    email: "请输入正确格式的电子邮件",
    url: "请输入合法的网址",
    date: "请输入合法的日期",
    dateISO: "请输入合法的日期 (ISO).",
    number: "数字格式不正确",
    digits: "只能输入整数",
    creditcard: "请输入合法的信用卡号",
    equalTo: "请再次输入相同的值",
    accept: "请输入拥有合法后缀名的字符串",
    maxlength: $.validator.format("输入不可超过 {0} 个字"),
    minlength: $.validator.format("输入不可少于 {0} 个字"),
    rangelength: $.validator.format("请输入一个长度介于 {0} 和 {1} "),
    range: $.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
    max: $.validator.format("请输入一个最大为 {0} 的值"),
    min: $.validator.format("请输入一个最小为 {0} 的值")
});
