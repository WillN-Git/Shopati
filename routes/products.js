// Import
const { Product } = require('../models/product')
const express = require('express')
const { Category } = require('../models/category')
const { default: mongoose } = require('mongoose')
const router = express.Router()
const multer = require('multer')


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(' ').join('-')

        cb(null, fileName + '-' + uniqueSuffix + Date.now())
    }
})

const uploadOptions = multer({ storage })

//======================= Route

// Root
router.route('/')
    .get(async (req, res) => {
        // localhost:3000/api/v1/products?categories=2342342,234234
        let filter = {}

        if(req.query.categories) {
            filter = { category: req.query.categories.split(',') }
        }

        const productList = await Product.find(filter).populate('category')

        if(!productList) {
            res.status(500).json({ success: false })
        }
        
        res.send(productList)
    })
    .post(uploadOptions.single('image'), async (req, res) =>{
        const cat = await Category.findById(req.body.category)
        const fileName = req.file.filename
        const basePath = `${req.protocol}://${req.get('host')}/public/upload/`

        if(!cat) {
            return res.status(400).send('Invalid Category')
        }

        let product = new Product({
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: `${basePath}${fileName}`, // http://localhost:3000/public/uploads/images-2322435
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
        })

        product = await product.save()

        if(!product) {
            return res.status(500).send('The product can\'t be created')
        }

        res.send(product)
    })


// ID
router.route('/:id')
    .get(async (req, res) => {
        const product = await Product.findById(req.params.id)

        if(!product) {
            res.status(500).json({ success: false })
        }

        res.send(product)
    })
    .put(async (req, res) => {
        if(!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).send('Invalid Product Id')
        }
        
        const category = await Category.findById(req.body.category)
        
        if(!category) {
            return res.status(400).send('Invalid Category')
        }
        
        const product = await Product.findByIdAndDelete(
            req.params.id,
            {
                name: req.body.name,
                description: req.body.description,
                richDescription: req.body.richDescription,
                image: req.body.image,
                brand: req.body.brand,
                price: req.body.price,
                category: req.body.category,
                countInStock: req.body.countInStock,
                rating: req.body.rating,
                numReviews: req.body.numReviews,
                isFeatured: req.body.isFeatured,
            },
            { new: true }
        )

        if(!product) {
            return res.status(500).send('The Product can\'t be updated')
        }

        res.send(product)
    })
    .delete((req, res) => {
        Product.findByIdAndUpdate(req.params.id)
                .then(product => {
                    if(product) {
                        return res.status(200).json({ success: true, message: 'The product is deleted' })
                    } else {
                        return res.status(404).json({ success: false, message: 'Product not found' })
                    }
                })
                .catch(err => {
                    res.status(500).json({
                        success: false,
                        error: err
                    })
                })
    })

// Get featured product
router.route('/get/featured/:count')
    .get(async (req, res) => {
        const count = req.params.count ? req.params.count : 0
        const products = await Product.find({ isFeatured: true }).limit(+count)

        if(!products) {
            res.status(500).json({ success: false })
        }

        res.send(products)
    })

    
// Get count
router.route('/get/count')
    .get(async (req, res) => {
        const productCount = await Product.countDocuments((count) => count)

        if(!productCount) {
            res.status(500).json({ success: false })
        } 

        res.send({ productCount })
    })

module.exports = router