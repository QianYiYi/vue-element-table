var config =
    {
        uploadPath: "./upload/",
        csvDir:"./csv/",
        baseUrl:"http://localhost:3000/",
        mysql:{
            host:'localhost',
            user:'root',
            password:'123456',
            database:'book',
            timezone:"08:00",
            port:3306
        },
        oyente:"/home/proenv/oyente-master/oyente.py"

    };
module.exports = config;
