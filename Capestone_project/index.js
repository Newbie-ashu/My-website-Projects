import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app=express()
const port=3000
const db =new pg.Client({
    user:"postgres",
    host:"localhost",
    database:"school",
    password:"736123",
    port:5432,
});
db.connect();
let users=[
    {id:1,name:"ashu",dept:"EE"},
    {id:2,name:"mohan",dept:"ECE"},
]
// app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",async(req,res)=>{
    res.render("index.ejs")
})
app.post("/redirect",async(req,res)=>{
    res.redirect("/add")
})

app.post("/add",async (req,res)=>{
    const name_d=req.body.name;
    const dept_d=req.body.dept;
    const result=await db.query("INSERT INTO projects(name,depart) VALUES($1,$2)",[name_d,dept_d])
    res.render("index.ejs",{NAME:name_d,DEPARTMENT:dept_d})
})



app.listen(port,(req,res)=>{
    console.log(`listening in http://localhost:${port}`)
})