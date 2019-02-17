var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static( __dirname + '/angular-app/dist/angular-app' ));
mongoose.connect('mongodb://localhost/commerceManagerDB');

var ProductSchema = new mongoose.Schema({
    name: { 
        type: String, 
        minlength: [3, "name has to be more than 3 chars"],
        required: [true, "name is required"]
       
    },
    qty: { 
        type: Number, 
        min: [0, "must be more than 0"],
        required: [true, "quantity is required"]
       
    },
    price: { 
        type: Number, 
        min: [0, "price must be more than $0.00"],
        required: [true, "price is required"]
       
    }
    
         
},{timestamps: true});
mongoose.model('Product', ProductSchema); 
var Product = mongoose.model('Product')

app.get('/api/products', function(req,res){
    Product.find(function(err, products){
        if(err){}
        else{
            res.json(products)
        }
    })
})

app.post('/api/products', function(req, res){
    const product_inst = new Product();
    product_inst.name = req.body.name;
    product_inst.qty = req.body.qty;
    product_inst.price = req.body.price;
    product_inst.save(function(err, result){
        if(err){
            res.json({
                status: false,
                err: err
            })
        }
        else{
            console.log("@@@@@ WE ADDED A NEW PRODUCT, server @@@@@@@", product_inst)
            res.json({
                status: true,
                result
            })
        }
    })

})

app.get('/products/:id/edit', function(req, res){
    const id = req.params.id
    Product.findOne({_id:id}, function(err, results){
        if(err){
            res.json({
                status:false,
                err: err
            })
        }
        else{
            res.json({
                status: true,
                results
            })
        }
    })
})

app.put('/api/products/:id', function(req, res){
    Product.update({_id: req.params.id},{$set:{name: req.body.name, price: req.body.price, qty: req.body.qty}}, { runValidators: true }, (err, result) => {
        if(err){
            res.json({
                status: false,
                err: err
            })
        }
        else{
            console.log("@@@@@ WE EDITED A PRODUCT! @@@@@")
            res.json({
                status: true,
                result
            })
        }
    })
})

app.delete('/api/delete/:id', function(req, res){
    Product.remove({_id: req.params.id}, function(err, result){
        if(err){
            console.log("error deleting product")
        } else {
            console.log("we deleted the product form the DB!")
        }
    })
})

app.listen(8000, function() {
    console.log("listening on port 8000");
})