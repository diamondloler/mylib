"use strict"

var asf = function (a, b, c) {
    this.abc = function () {

    }

    this.asd = function () {

    }

    this.fgh = 2

    this.sadfs = [1, 2, 3]
}

// console.log(a)

asf.prototype.aasd = function() {

}

asf.prototype.abb = function() {
    
}

asf.prototype.cdd = function() {
    
}

var Ddd = function () {
    this.hehe = function () {
        
    }
    this.hihe = function () {

    }
    this.hide = function () {

    }
    //寄生式继承
    asf.call(this)
}

Ddd.prototype.xixi = function () {
    
}
Ddd.prototype.didi = function () {

}

//setter 在原型链上会引用其他对象，但不会重写本对象的原型对象（原型链继承）
Ddd.prototype.__proto__ = asf 

// //直接把本对象的原型对象引用其他对象
// Ddd.prototype = asf 

//原型链 + 寄生式 继承的 结果
var niu = new Ddd()
console.log(niu)


var data = {
    val1: 1,
    val2: 2,
    val3: 3
}

function defineReactive(obj, key, val) {
    var property = Object.getOwnPropertyDescriptor(obj, key);
    if (property.configurable === false) {
        return
    }

    var setter = property && property.set
    var getter = property && property.get
    
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function getter() {
            var value = getter ? getter.call(obj) : val;
            return value
        },
        set: function setter(newVal) {
            var value = getter ? getter.call(obj) : val;
            if (newVal === value || (newVal !== newVal && value !== value)) {
                return;
            }
            console.log(`我是新值：${newVal}`)
            console.log(`我是缓存值：${val}`)
            val = newVal; //记录该值，在下次数据更新时利用          
            //mvvm框架的核心逻辑在此展开，在这与虚拟dom建立关系
        }
    })
}

function renderData(obj) {
    var keys = Object.keys(obj);
    var i = keys.length;
    while (i--) {
        defineReactive(obj, keys[i], obj[keys[i]])
    }
}
renderData(data)
data.val1 = 666
data.val1 = 123
data.val1 = 654
