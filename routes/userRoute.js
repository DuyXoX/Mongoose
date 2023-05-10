const express = require('express');
const userModel = require('../model/user');
const productModel = require('../model/products');
const app = express();

//add data
app.post('/user', async(req, res) => {
    const u = new userModel(req.body);
    try {
        await u.save();
        res.send(u);
    } catch (error) {
        res.status(500).send(error);
    }
})

app.post('/product', async(req, res) => {
    const pd = new productModel(req.body);
    try {
        await pd.save();
        res.send(pd);
    } catch (error) {
        res.status(500).send(error);
    }
})

//getAll
app.get('/list', async(req, res) =>{
    const users = await userModel.find({})
    try {
        console.log("User" + users);
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
})

app.get('/listProduct', async(req, res) =>{
    const Products = await productModel.find({})
    try {
        res.send(Products);
    } catch (error) {
        res.status(500).send(error);
    }
})

//update
app.patch('/user/:id', async(req, res) => {
    try {
        const user = await userModel.findOneAndUpdate(req.params.id, req.body);
        await userModel.save();
        res.send(user)
    } catch (error) {
        res.status(500).send(error);
    }
})

//delete
app.delete('/user/:id', async(req, res) => {
    try {
        const user = await userModel.findByIdAndDelete(req.params.id, req.body);
        if(!user) res.status(404).send("No item found");
        res.status(200).send();
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = app;