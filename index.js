const express= require('express');
const bodyParser= require('body-parser');
const cors= require('cors');
const app= express();
const mysql= require('mysql');

const db= mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'product_nodejs'
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
app.use(bodyParser.json());



app.post("/api/insert", (req, res) =>{

    const productName= req.body.productName;
    const productReview= req.body.productReview;

    const sqlInsert= "INSERT INTO product (name, review) VALUES (?, ?)";
    db.query(sqlInsert, [productName, productReview],(err, result)=>{
        console.log(result);
    } )
});

app.get("/api/get", (req, res)=>{
    const sqlSelect= "SELECT * FROM product";
    db.query(sqlSelect, (err, result)=>{
        res.send(result);
    })
})

app.delete("/api/delete/:id", (req, res)=>{
    const {id} = req.params;
    const sqlDelete= "DELETE FROM product WHERE id=?";
    db.query(sqlDelete, id, (err, result)=>{
    })
})

app.put("/api/update", (req, res) =>{

    const productName= req.body.productName;
    const productReview= req.body.productReview;

    const sqlUpdate= "UPDATE product SET review = ? WHERE name = ?";
    db.query(sqlUpdate, [productReview, productName],(err, result)=>{
        console.log(result);
    } )
});

app.listen(3002, ()=>{
    console.log("Running on port 3002.");
})