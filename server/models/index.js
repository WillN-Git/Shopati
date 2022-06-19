const { User } = require('./user')
const { Product } = require('./product')
const { Category } = require('./category')
const { Order } = require('./Order')

exports.models = {
    User,
    Product,
    Category,
    Order
}