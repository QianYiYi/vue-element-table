let db = require('./db');

exports.searchData = function(sqlString,callback){
    let connection = db.connection();
    db.search(connection, sqlString, function(results){
        callback(results);
    });
    db.close(connection);
}

exports.addData = function(addFrontData){
    let connection = db.connection();
    let sqlString = "INSERT INTO booktables(bookname,bookvolume,bookbuyer,bookborrower,bookbuytime) VALUES(?,?,?,?,?)";
console.log(addFrontData);
    for(let key in addFrontData){
      //let paramsArr = [];
      let keycontent = JSON.parse(addFrontData[key]),paramsArr = [];
          console.log(keycontent + "level1")
          console.log(typeof keycontent)
            console.log(JSON.stringify(keycontent))
      for(let key2 in keycontent){

      //  console.log(keycontent["bookname"])
      //  console.log(keycontent[key2])
      console.log(keycontent[key2])
        paramsArr[0] = keycontent['bookname'];
        paramsArr[1] = keycontent['bookvolume'];
        paramsArr[2] = keycontent['bookbuyer'];
        paramsArr[3] = keycontent['bookborrower'];
        paramsArr[4] = keycontent['bookbuytime'];
      }
      console.log(paramsArr)
      db.insert(connection,sqlString,paramsArr,function(results){
          return results;
      });
    }

    db.close(connection);
}

exports.deleteData = function(){

    let connection = db.connection();
    db.query(connection, sqlString, project,function(resultId){
        console.log('inserted id is ' +　resultId);
    });
    db.close(connection);
}
