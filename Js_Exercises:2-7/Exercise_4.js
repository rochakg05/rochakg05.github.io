var fruits = [
    {id: 1, name: 'Banana', color: 'Yellow'},
    {id: 2, name: 'Apple', color: 'Red'}
  ]
  
  function searchByName(Name, Term){
    console.log('Search By Name');
    Name.forEach(
      function(value){
        if(value.name.toLowerCase() == Term.toLowerCase()){
          console.log(value);
        }
      }
    );
  }
  
  searchByName(fruits, 'apple');
  
  function searchByKey(Name, Key, Term){
    console.log('Search By Key');
    Name.forEach(
      function(value){
        if(value[Key.toLowerCase()].toLowerCase() == Term.toLowerCase()){
          console.log(value);
        }
      }
    );
  }
  
  searchByKey(fruits, 'name', 'apple');