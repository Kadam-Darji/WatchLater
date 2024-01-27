const express = require('express');
const router = express.Router();
const {Client} = require('pg');
require('dotenv').config();
const client = new Client({
    user:process.env.USER,
    host:"localhost",
    database:process.env.DATABASE,
    password:process.env.PASSWORD,
    port:process.env.PORT
})
client.connect();
router.get("/",async (req,res)=>{
    try{
        const records = await client.query('select * from "Records"."Items"');
        res.send(records.rows);
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error!");
    }
})

router.post("/add",async(req,res)=>{
    try{
        const {Name,Platform,Genre,Link} = req.body;

        await client.query('INSERT INTO "Records"."Items" VALUES ($1,$2,$3,$4)',[Name,Platform,Genre,Link]);
        res.json({
            "success":true
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            "success":false
        })
    }
})

router.put("/modify",async (req,res)=>{
    const {Id,Name,Platform,Genre,Link} = req.body;
    try{
        await client.query('UPDATE "Records"."Items" SET "Name"=$1, "Platform"=$2, "Genre"=$3, "Link"=$4 WHERE "ID"=$5',[Name,Platform,Genre,Link,Id]);
        res.json({
            "success":true
        })
    }
    catch(err){
        console.log(err);
        res.json({
            "success":false
        })
    }
})

router.delete("/delete",async(req,res)=>{
    try{
        const {Name,Platform} = req.body;
        await client.query('DELETE FROM "Records"."Items" WHERE "Name"=$1 AND "Platform"=$2',[Name,Platform]);
        res.json({
            "success":true
        })
    }
    catch(err){
        console.log(err);
        res.json({
            "success":false
        })
    }
})

module.exports = router;