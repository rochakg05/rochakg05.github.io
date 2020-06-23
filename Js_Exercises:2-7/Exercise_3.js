var personalinfo = {
    'name': 'Rochak Gautam',
    'address': 'Kathmandu',
    'emails': ['gautam.rochak.5@gmail.com', 'rochakg.05@gmail.com'],
    'interests':['Politics'],
    'education': [
      {
        'name': 'NIST',
        'enrolledDate': '2014'
      },
      {
        'name': 'KU',
        'enrolledDate': '2016'
      }
    ]
  }
  
  personalinfo.education.forEach(function(value) {
    console.log('Name:' + value.name + ', Date:' + value.enrolledDate);
  });