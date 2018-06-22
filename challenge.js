const fs = require('fs');

//Get raw file and specify encoding
fs.readFile('original_msg.txt', 'utf8', (err, data) => {
  if (err) throw err;
  let message = data;

  //call parse function and pass in the data
  parseFile(message);
});

function parseFile(message){
  //use regexp to eliminate empty keys and carriage returns
  //split the string
  let regEx = new RegExp('(\w*): ([^\t\r\n]*)[\t\r\n]*');
  let split = message.split(regEx).filter(x=>x);

  //create a new array that will hold the contents of the email
  let newArray = [];

  //have the even indices be keys and the odds the values
  //return the new object
  for(let i = 0; i < split.length; i +=2){
    let key = split[i];
    let value = split[ i + 1 ];
    let obj = {
      key : key,
      value: value
    };

    //push new object to the array
    newArray.push(obj)
  }

  //return the newArray
  return console.log(newArray);
}

//Steps I would take in the future to further output
// 1) I would break down the email by headers such as "Content-Type" and by their MIME fragments.
// 2) I would then find the the body "Content-Type" and parse the data with RegExp
// 3) Use a recursive function to parse the child data by MIME fragments
