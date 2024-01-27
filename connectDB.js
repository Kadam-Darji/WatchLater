const {Client} = require('pg');
require('dotenv').config();
module.exports = async ()=>{
    const client = new Client({
        user:process.env.USER,
        host:"localhost",
        database:process.env.DATABASE,
        password:process.env.PASSWORD,
        port:process.env.PORT
    })
    await client.connect();
    console.log("DB Connected!");
}