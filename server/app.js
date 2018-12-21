var express = require('express');

var app = express();

var sql = require('./rules');


//解决跨域
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.get('/getList',function(req,res){   // 主页显示，查询信息
  let writebuyer = req.query.writebuyer,
      writebookname = req.query.writebookname,
      writestate = req.query.state,
      sqlString = '',
      normalYearSqlStringFront = '',
      normalYearSqlStringEnd = '',
      leapYearSqlStringFront = '',
      leapYearSqlStringEnd = '',
      signal = '';

  let date = new Date(); //获取时间，判断是否为闰年
  let currentYear = date.getFullYear(),
      currentMonth = date.getMonth() + 1,
      currentDate = date.getDate();
      console.log(writebuyer);
      console.log(writebookname)
      console.log(writestate);

  sqlString = "SELECT * FROM booktables";

  normalYearSqlStringFront = sqlString + " where bookbuytime ";
  normalYearSqlStringEnd = " '" + (currentYear-3) + "-" + currentMonth + "-" + currentDate + "' and bookbuyer like '%"+ writebuyer +"%' and bookname like '%" + writebookname + "%'";

  leapYearSqlStringFront = sqlString + " where bookbuytime ";
  leapYearSqlStringEnd = " '" + (currentYear-3) + "-2-28' and bookbuyer like '%"+ writebuyer +"%' and bookname like '%" + writebookname + "%'";

  if(writestate == "在录"){
      sqlString = sqlString + " where bookbuyer like '%"+ writebuyer +"%' and bookname like '%" + writebookname + "%'";
  }
  if((currentYear % 4 == 0 && currentYear % 100 !== 0) || currentYear % 400 == 0){  //闰年判断
    if(currentMonth == "2" && currentDate == "29"){
      if(writestate == "过期"){
        signal = "<";
        sqlString = leapYearSqlStringFront + signal + normalYearSqlStringEnd;
      }
      if(writestate == "未过期"){
        signal = ">";
        sqlString = leapYearSqlStringFront + signal + normalYearSqlStringEnd;
      }
    }else{

      if(writestate == "过期"){
        signal = "<";
        sqlString = normalYearSqlStringFront + signal + normalYearSqlStringEnd;
        console.log(sqlString)
      }
      if(writestate == "未过期"){
        signal = ">";
        sqlString = normalYearSqlStringFront + signal + normalYearSqlStringEnd;
      }
    //  sqlString = normalYearSqlString;
    }
  }else{
    if(writestate == "过期"){
      signal = "<";
      sqlString = normalYearSqlStringFront + signal + normalYearSqlStringEnd;
    }
    if(writestate == "未过期"){
      sqlString = normalYearSqlStringFront + signal + normalYearSqlStringEnd;
    }
  }

  let booklist = [];
  sql.searchData(sqlString,function(results){ //数据库返回数据
    booklist = results;
    console.log(results)
    res.send(booklist);
  })
  //返回的json对象
  //  var booklist =[{"bookname":"普通高等教育物联网工程专业规划用书：物联网技术概论","bookbuytime": "2016-05-04","bookbuyer": "李晓月","bookborrower": "王小虎","bookvolume":"2"},{"bookname":"区块链革命：比特币底层技术如何改变货币、商业和世界","bookbuytime": "2016-05-04","bookbuyer": "李晓月","bookborrower": "李小虎","bookvolume":"1"},{"bookname":"大家一起学配色：数学色彩设计全能书","bookbuytime": "2017-12-04","bookbuyer": "张晓月","bookborrower": "王而虎","bookvolume":"1"}];

});

app.post('/addBookData',function(req,res){
//  let addFrontData = req.query
console.log(req.query)
    let addFrontData = req.query;
    // { '0':'{"bookname":"从VS的","bookbuytime":"2018-12-16","bookbuyer":"胜多负少","bookborrower":"手动阀","bookvolume":1}','1':'{"bookname":"手动阀","bookbuytime":"2018-11-04","bookbuyer":"算法","bookborrower":"手动阀","bookvolume":2}','2':'{"bookname":"二太太","bookbuytime":"2011-07-11","bookbuyer":"王飒","bookborrower":"李萨芬","bookvolume":1}' };
  //  console.log(addFrontData)

    let sqlParams = [];
    for(let key in addFrontData){
      let keycontent = JSON.parse(addFrontData[key]);
      let arrLevel2 = [];
      for(let key2 in keycontent){
        arrLevel2.push(keycontent[key2])
       console.log()
      }
      sqlParams.push(arrLevel2)
    }
    console.log(JSON.stringify(sqlParams))
  //  let convertData = [['从VS的','1','wang','ad',2015-01-09],['从VS的','1','li','wang',2018-8-12]]
    sql.addData(addFrontData,function(results){ // 添加数据，返回内容
      console.log(results)

      res.send("添加成功");
      res.end();
    })
})

app.listen(3030,()=>{
  console.log("success")
});
