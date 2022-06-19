// Import
const { Order } = require('../models/order')
const { OrderItem } = require('../models/order-item')
const express = require('express')
const router = express.Router()


// Routes

// Root
router.route('/')
    .get(async (req, res) =>{
        const orderList = await Order.find()
                                    .populate('user', 'name')
                                    .sort({ dateOrdered: -1 })

        if(!orderList) {
            res.status(500).json({ success: false })
        } 
        res.send(orderList)
    })
    .post(async (req, res) => {
        const orderItemsIds = Promise.all(
            req.body.orderItems.map(async (orderitem) => {
              let newOrderItem = new OrderItem({
                quantity: orderitem.quantity,
                product: orderitem.product,
              });
        
              newOrderItem = await newOrderItem.save();
        
              return newOrderItem._id;
            })
          );
        
          const orderItemsIdsResolved = await orderItemsIds;
        
          const totalPrices = await Promise.all(
            orderItemsIdsResolved.map(async (orderItemId) => {
              const orderItem = await OrderItem.findById(orderItemId).populate(
                "product",
                "price"
              );
        
              const totalPrice = orderItem.product.price * orderItem.quantity;
        
              return totalPrice;
            })
          );
        
          const totalPrice = totalPrices.reduce((a, b) => a + b, 0);
        
          console.log(totalPrices);
        
          let order = new Order({
            orderItems: orderItemsIdsResolved,
            shippingAddress1: req.body.shippingAddress1,
            shippingAddress2: req.body.shippingAddress2,
            city: req.body.city,
            zip: req.body.zip,
            country: req.body.country,
            phone: req.body.phone,
            status: req.body.status,
            totalPrice: totalPrice,
            user: req.body.user,
          });
          order = await order.save();
        
          if (!order) return res.status(400).send("the order cannot be created!");
        
          res.status(200).send(order);
    })

// ID
router.route('/:id')
    .get(async (req, res) => {
        const order = await Order.findById(req.params.id)
                                .populate('user', 'name')
                                .populate({
                                    path: 'orderItems',
                                    populate: {
                                        path: 'product',
                                        populate: 'category',
                                    },
                                })
                            
        if(!order) {
            res.status(500).json({ success: false })
        }
        res.send(order)
    })
    .put(async (req, res) => {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        )

        if(!order) {
            return res.status(400).send('The order can\'t be updated!')
        }

        res.send(order)
    })
    .delete((req, res) => {
        Order.findByIdAndRemove(req.params.id)
            .then(async (order) => {

                if(order) {
                    await order.orderItems.map(async (orderItem) => {
                        await OrderItem.findByIdAndRemove(orderItem)
                    })
                    return res.status(200).json({ success: true, message: 'The order is deleted!' })
                } else {
                    return res.status(404).json({ success: false, message: 'Order not found!' })
                }
            })
            .catch(err => {
                return res.status(500).json({ success: false, message: err })
            })
    })


// TOTAL SALES
router.route('/get/totalsales')
    .get(async (req, res) => {
        const totalSales = await Order.aggregate([
            { $group: { _id: null, totalsales: { $sum: '$totalPrice' } } },
          ]);
        
          if (!totalSales) {
            return res.status(400).send('The order sales cannot be generated')
          }
        
          console.log("TOTAL => ", totalSales);

          res.send({ totalsales: totalSales.pop().totalsales })
    })

// Get count
router.route('/get/count')
    .get(async (req, res) => {
        const orderCount = await Order.countDocuments()

        if(!orderCount) {
            res.status(500).json({ success: false })
        }

        res.send({ orderCount })
    })

// Get user orders
router.route('/get/userorders/:id')
    .get(async (req, res) => {
        const userOrderList = await Order.find({ user: req.params.id })
                                        .populate({
                                            path: 'orderItems',
                                            populate: {
                                                path: 'product',
                                                populate: 'category',
                                            },
                                        })
                                        .sort({ dateOrdered: -1 })

        if(!userOrderList) {
            res.status(500).json({ success: false })
        }

        res.send(userOrderList)
    })

module.exports = router