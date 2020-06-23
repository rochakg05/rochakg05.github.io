var numbers = [1, 2, 3, 4];

function transform(collection, tranFunc) {
  var newArr = [];
  collection.forEach(function(value){
    newArr.push(tranFunc(value));
  });
  return newArr;
}

var output = transform(numbers, function(num) {
    return num * 2;
});

console.log(output);