function make_lazy(func, ...rest) {
    return function () {
        return func(...rest);
    }
}
var double = function (n) {
    console.log();
    return n * 2;
};

var lazy_value = make_lazy(double, 5);
console.log('lazy_value - ', lazy_value());

var add = function (a, b) {
    console.log();
    return a + b;
};

var lazy_sum = make_lazy(add, 2, 3);
console.log('lazy_sum - ', lazy_sum());

// var Calculator = {
//     average: function (...arg) {
//         return arg.length === 0 ? 0 : arg.reduce((acc, crntValue) => acc + crntValue, 0) / arg.length;
//     }
// };
// console.log(Calculator.average(3, 4, 5));
// function add(...arg) {
//     //CODE
//     return arg.length != 0 ? arg.reduce((prev, cur, index) => prev + cur * (index + 1)) : 0;
// }
// console.log(add(3, 4, 5));