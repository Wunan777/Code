// Input
// 单调递减或递增序列，求最宽的高峰
var n = 10;
var arr = '1 3 1 2 5 4 3 1 9 10';

// Output
// 1 2 5 4 3 1

var res = cal(arr.split(' '));
console.log(res);

function cal(arr) {

    var upArr = [];
    var downArr = [];
    var max = [];

    for (var i = 0, len = arr.length; i < len; i ++) {
        if (i + 1 < len) {
            var type = downOrUP(arr[i], arr[i+1]);
            if (type === 'up') {

                if (downArr.length != 0) {
                    max.push(countMax(upArr, downArr));
                    downArr = [];
                    upArr = [];
                    upArr.push(arr[i]);
                }
                else {
                    upArr.push(arr[i]);
                }
            }
            else {

                if (upArr.length != 0) {
                    downArr.push(arr[i]);
                }
                else {
                    downArr = [];
                }
            }
        }
        else {
            // 最后一个点
            if (downArr.length !=0 && upArr.length != 0){
                max.push(countMax(upArr, downArr));
            }
        }
    }

    if (max.length === 0) {
        return -1
    }
    else {
        return max.sort(function (a, b) {
            return a.length - b.length;
        });
    }
}

function downOrUP(curPoint, nextPoint) {
    return (curPoint - nextPoint > 0 ? 'down' : 'up');
}

function countMax(upArr, downArr) {
    var len = upArr.length + downArr.length + 1;

    return {
        length: len,
        a: upArr,
        b: downArr
    }
}