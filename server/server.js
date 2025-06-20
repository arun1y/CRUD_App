import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';

const app=express();
const port=5000;

app.use(express.json());
app.use(cors());

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Mysql123",
    database:"student"
});

db.connect((err)=>{
    if(err){
        console.log("DB connection failed:",err);
    } else{
        console.log("Connected to MySQL");
    }
});

app.get("/",(req,res)=>{
    const query="select * from student_details";
    db.query(query,(err,results)=>{
        if(err) return res.status(500).json({error:err.message});
        return res.send(results);
    });
});

app.post('/student',(req,res)=>{
    const sql="insert into student_details(`name`,`age`,`email`,`gender`) values (?)";
    const values=[
        req.body.name,
        req.body.age,
        req.body.email,
        req.body.gender
    ]
    db.query(sql,[values],(err,result)=>{
        if(err) return res.json(err);
        return res.json(result);
    })
})

app.get("/read/:id",(req,res)=>{
    const query="select * from student_details where id=?";
    const {id}=req.params;
    db.query(query,[id],(err,results)=>{
        if(err) return res.json({error:err.message});
        return res.json(results[0]);
    });
});

app.put('/update/:id',(req,res)=>{
    const sql='update student_details SET `name`=?,`age`=?,`email`=?,`gender`=? WHERE id=?';
    const id=req.params.id;
    db.query(sql,[req.body.name, req.body.age, req.body.email, req.body.gender, id], (err,result)=>{
                if(err) return res.json({error:err.message});
        return res.json(result);
    })
})

app.delete('/delete/:id',(req,res)=>{
    const sql="DELETE FROM student_details WHERE id=?";
    const {id}=req.params;
    db.query(sql,[id],(err,result)=>{
        if(err) return res.json({Message:"Error inside server"});
        return res.json(result);
    })
})

app.listen(port,()=>{
    console.log(`App is running in port ${port}`);
});
