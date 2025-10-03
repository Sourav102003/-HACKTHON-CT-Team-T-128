const express =require("express")
const app =express()
const db =require("./server/config/db")
app.use(express.urlencoded({extended:false}))
app.use(express.json())
const seeder = require("./server/config/seeder")
seeder.adminreg()

app.use(express.urlencoded({extended:true}));
app.use(express.json({limit:'40mb'}));

const routes = require("./server/routes/studentRoutes")
app.use("/apis",routes)
app.listen(5000,(err)=>{
    if(err)
        {
            console.log("server error",err)
        }

        else{
            console.log("server is connected")
        }
})