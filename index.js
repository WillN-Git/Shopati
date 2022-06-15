// Libraries
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const multer = require('multer')
require('dotenv/config')

// Helpers
const authJwt = require('./helpers/jwt')
const errorHandler = require('./helpers/error-handler')

// Environment vars
const { 
    API_URL, 
    PORT, 
    DBTEST,
    DBNAME, 
    DBUSER, 
    DBPSW 
} = process.env


const app = express()
const uri = `mongodb+srv://${DBUSER}:${DBPSW}@market.vxvvjnf.mongodb.net/${DBNAME}?retryWrites=true&w=majority`


app.use(cors())
app.options('*', cors())

// Middleware
app.use(express.json())
app.use(morgan('tiny'))
app.use(authJwt())
app.use('/public/uploads', express.static( __dirname + '/public/uploads'))
app.use(errorHandler)


// Routes
const { 
    categoriesRoutes,
    ordersRoutes, 
    productsRoutes, 
    usersRoutes 
} = require('./routes').routes

app.use(`${API_URL}/categories`, categoriesRoutes)
app.use(`${API_URL}/products`, productsRoutes)
app.use(`${API_URL}/users`, usersRoutes)
app.use(`${API_URL}/orders`, ordersRoutes)


// Database connection
mongoose.connect(uri)
        .then(() => {
            console.log('Database connection is ready...')
        })
        .catch((err) => {
            console.log(err)
        })

// Server
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})