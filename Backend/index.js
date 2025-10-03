const express =require("express")
const app =express()
const db =require("./server/config/db")
app.use(express.urlencoded({extended:false}))
app.use(express.json())
const seeder = require("./server/config/seeder")
seeder.adminreg()

app.use(express.urlencoded({extended:true}));
app.use(express.json({limit:'40mb'}));

const adminroutes = require("./server/routes/adminRoutes")
app.use("/adminapis",adminroutes)
const teacherroutes = require("./server/routes/teacherRoutes")
app.use("/teacherapis",teacherroutes)
const studentroutes = require("./server/routes/studentRoutes")
app.use("/studentapis",studentroutes)
app.listen(5000,(err)=>{
    if(err)
        {
            console.log("server error",err)
        }

        else{
            console.log("server is connected")
        }
})