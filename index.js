const express = require ('express');

const mongoose = require ('mongoose');

const app = express();

const port = 3000;

app.use(express.json());

app.listen(port, () => {
    console.log (`Server is running on port ${port} `);

});

const {orders} = require (`./models/orders`);

app.get(`/orders`, (req,res) => {
    res.send(orders);
})

const { connect } = require( './db/connection');

app.listenerCount(port, () => {
    connect ()
    console.log(`Server is running on port ${port}`);

});

const { OrderModel } = require('./mongo/Order.js');

// get all user using OrderModel 

app.get('/orders', async (req, res) => {
  const orders = await OrderModel.find({}).exec();
  if(orders.length === 0) {
    return res.status(404).send('No orders found');
  }
  return res.send(orders);
});

//update order by id using OrderModel 

app.put('/orders/:id', async(req, res) => {
    const order = await OrderModel.findByIdAndUpdate(req.params.id).exec();
    if(!order) {
        return res.status(404).send('ORder not found');
    
    }
    return res.send(order);
});

//delete order by using OrderModel

app.delete('/orders/:id', async (req,res) => {
    const order = await OrderModel.findByIdAndDelete(req.params.id).exec();
    if(!order) {
        return res.status(404).send('Order not found');
    }
    return res.send(order);
});