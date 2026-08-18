import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express()
const port = 3000

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Capestone",
  password: "736123",
  port: 5432,
})

db.connect()
app.use(bodyParser.urlencoded({ extended: true }))
app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM todos")
   
    console.log(result.rows)
    res.render("index.ejs",{todos:result.rows})
  } catch (error) {
    console.error(error)
    res.status(500).send("Database query failed")
  }
})
app.post("/add",async(req,res)=>{
 const name=req.body.name
 const depart=req.body.depart
 const cgpa=req.body.cgpa
  const result=await db.query("INSERT INTO todos(name,department,cgpa) VALUES($1,$2,$3);",[name,depart,cgpa])
  res.redirect("/")
})

app.listen(port, () => {
  console.log(`running on ${port}`)
})
