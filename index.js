// Libraries
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const multer = require('multer')
require('dotenv/config')


// Models
// const { User, Order, Product, Category } = require('./models').models

const { API_URL, PORT, DBTEST, DBNAME, DBUSER, DBPSW } = process.env
const app = express()
const uri = `mongodb+srv://${DBUSER}:${DBPSW}@market.vxvvjnf.mongodb.net/${DBTEST}?retryWrites=true&w=majority`

// Routes
const { 
    categoriesRoutes,
    ordersRoutes, 
    productsRoutes, 
    usersRoutes 
} = require('./routes').routes


// Middleware
app.use(cors())
app.options('*', cors())

app.use(express.json())
app.use(morgan('tiny'))

app.use(`${API_URL}/categories`, categoriesRoutes)
app.use(`${API_URL}/products`, productsRoutes)


mongoose.connect(uri)
        .then(() => {
            console.log('Database connection is ready...')
        })
        .catch((err) => {
            console.log(err)
        })

// Listener
app.listen(PORT, () => {
    console.log(PORT)
    console.log(`server is running on http://localhost:${PORT}`)
})