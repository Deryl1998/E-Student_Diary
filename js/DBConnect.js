const { Client } = require('pg');

const userLogin = "postgres";
const userPassword = "password"


const client = new Client({
    host: "127.0.0.1",
    port: 5433,
    database: "postgres",
    user: userLogin,
    password: userPassword
    });

    function connect(){
        client.connect();
        console.log("login as "+userLogin);
        return 1;
    }

    function disconnect(){
        console.log("logout");
        client.end();
    }
    

