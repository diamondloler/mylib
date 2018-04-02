var input_ = document.querySelector('input[name=edm]');
var btn = document.querySelector('button');
var select_ = document.querySelector('select[name=xixi]');
var content = document.querySelector('span');
btn.onclick = function () {
    var sum = dz.edm(input_.value, select_.value);
    sum && (content.innerHTML = sum);
}

var a = {
    a: 1,
    b: 12,
    c: 213
}

console.log(a.length)