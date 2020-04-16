var temp1 = [1,2,3,4,5,6,7,8];
var combs = [];

for (var i = 0; i < temp1.length; i++) {

    for (var j = i + 1; j < temp1.length; j++) {

        for (var k = j + 1; k < temp1.length; k++) {

            //console.log(temp1[i], temp1[j], temp1[k]);
            combs.push([temp1[i], temp1[j], temp1[k]]);

        }

    }

}

console.log(combs.length);