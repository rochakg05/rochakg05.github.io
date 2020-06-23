var input = {
    '1': {
      id: 1,
      name: 'John',
      children: [
        { id: 2, name: 'Sally' },
        { id: 3, name: 'Mark', children: [{ id: 4, name: 'Harry' }] }
      ]
    },
    '5': {
      id: 5,
      name: 'Mike',
      children: [{ id: 6, name: 'Peter' }]
    }
  };
  
  
  var Obj = {}
  var Arr = []
  var ArrayN = [];
  
  function normalize(input){
    Arr.push(input);
    if('children' in input){
      ArrayN = [];
      input['children'].forEach(function(value){
        ArrayN.push(value.id);
        input.children = ArrayN;
        normalize(value);
      });
    }
  }
  
  Object.values(input).forEach(function(value){
    normalize(value);
  });
  
  
  var Obj = Arr.reduce(function(a, b, index){
    a[index + 1] = b;
    return a;
  }, {});
  
  console.log(Obj);

  var output = {
    '1': { id: 1, name: 'John', children: [2, 3] },
    '2': { id: 2, name: 'Sally' },
    '3': { id: 3, name: 'Mark', children: [4] },
    '4': { id: 4, name: 'Harry' },
    '5': { id: 5, name: 'Mike', children: [6] },
    '6': { id: 6, name: 'Peter' }
  };