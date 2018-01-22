function Common() {

    /**
     * @param  width 必选 width为宽度
     * @param  type  必选 type可选值为1、2，1代表主宽度，2代表为主宽度外两边的宽度
     * 设计edm辅助器（输出百分比） arg1,arg2均为number 
     */
    this.edm = function (width, type) {
        var width = parseInt(width)
        if (typeof width != 'number' || Number.isNaN(width)) {
            alert('输入值必须为数字');
            return;
        }
        if (width < 0 || width > 640) {
            alert('输入值范围在0~640');
            return;
        }
        var base_ = width / 640 * 100
        return type == 2 ? (100 - base_) / 2 + '%' : base_ + '%';
    }
}

//这个方法可以替换es2015api - Object.assign(target,scource[,,,,])(IE不支持)
Common.prototype.$merge_ = function (target) {
    for (var i = 1; i < arguments.length; i++) {
        let source = arguments[i] || {};
        for (var key in source) {
            if (source.hasOwnProperty(key) && source[key] !== undefined) {
                target[key] = source[key]
            }
        }
    }
    return target;
}

//遍历字符串数组匹配起始位置与str相同的字符串，arg1-字符串数组匹配规则，arg2-待匹配的字符串
Common.prototype.$match_ = function (array, str) {
    var flag = false;
    array.forEach(function (val) {
        if (new RegExp("^(" + val + ')').test(str)) {
            flag = true;
        }
        // if (str.indexOf(val) > -1) {
        //   str.indexOf(val) == 0 && (flag = true);
        // }
    })
    return flag;
}

//标签过滤器
Common.prototype.$tag_fliter_ = function (str) {
    return val.replace(/(\<\/?\w+\>)/g, '');
}

//常用的密码正则验证 返回布尔
Common.prototype.$password_regex_ = function (val) {
    return new RegExp(/^(?=.*[A-Za-z])(?=.*[0-9])([A-Za-z0-9]|[\~\!\@\#\$\%\^\&\*\(\_\+\-\=\]\[\{\}\\\|\;\'\:\"\<\>\?\,\.\/\)\`]){8,16}$/).test(val);
}

//替换es2015的Array.copyWithin(target, start, end)---不支持IE
Common.prototype.$copyWithin_ = function (arr, target, start, end) {
    var target_ = (target < 0 ? arr.length + target : target) || 0,
        start_ = (start < 0 ? arr.length + start : start) || 0,
        end_ = (end < 0 ? arr.length + end : end) || arr.length;

    var nagative_flag = start < 0 && end < 0 ? true : false;
    var target_reactive = target < 0 ? 1 : -1;

    if (Math.abs(target_) > arr.length) {
        throw new TypeError(target_ + 'must less than length of Array');
    }

    arr[target_] = arr[start_];

    if (!nagative_flag) {
        for (var i = start_, j = 1; i < end_; i++, j++) {
            arr[target_ + j] = arr[i + 1]
        }
    } else {
        for (var i = start_, j = target_reactive; i > end_; i--, j += target_reactive) {
            arr[target_ - j] = arr[i - 1]
        }
    }

    return arr;
}

var dz = new Common()
var dj = [1, 2, 3, 4, 5]
console.log(dz.$copyWithin_(dj, -1, -2, 3))
console.log(dj.copyWithin(-1, -2, 3))