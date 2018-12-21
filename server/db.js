let mysql = require('mysql');
let config = require('./config');
let db = {};

//查询操作
db.search = function(connection, sql, callback){
    connection.query(sql, function (error, results, fields) {
        if (error) throw error;
        callback(results);//返回查询到的数据
    });
}
//插入操作
db.insert = function(connection, sql, paras, callback){
  console.log(sql)
    connection.query(sql, paras, function (error, results, fields) {
        if (error) throw error;
        callback(results);//返回插入的id
    });
}
//更新操作
db.update = function(connection, sql, paras, callback){
    connection.query(sql, paras, function (error, results, fields) {
        if (error) throw error;
        callback(results);//返回插入的id
    });
}

//关闭数据库
db.close = function(connection){
    //关闭连接
    connection.end(function(err){
        if(err){
            return;
        }else{
            console.log('关闭连接');
        }
    });
}

//获取数据库连接
db.connection = function(){
    //数据库配置
    let connection = mysql.createConnection(config.mysql);
    //数据库连接
    connection.connect(function(err){
      console.log("连接成功")
        if(err){
            console.log(err);
            return;
        }
    });
    return connection;
}
module.exports = db;
