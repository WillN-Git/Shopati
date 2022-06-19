// Import
const { Product } = require('../models/product')
const express = require('express')
const { Category } = require('../models/category')
const { default: mongoose } = require('mongoose')
const router = express.Router()
const multer = require('multer')


//============================ FILE UPLOADING
const FILE_TYPE_MAP = { // Allowed file upload in the backend
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg'
}

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const isValidFile = FILE_TYPE_MAP[file.mimetype]
        let uploadErr = new Error('Invalid Image type')

        if(isValidFile) {
            uploadErr = null
        }

        cb(uploadErr, 'public/uploads')
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.replace(' ', '-')
        const ext = FILE_TYPE_MAP[file.mimetype]

        cb(null, `${fileName}-${Date.now()}.${ext}`)
    }
})

const uploadOptions = multer({ storage })


//============================ ROUTES

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
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`
        const file = req.file

        if(!file) {
            return res.status(400).send('No image in the request')
        }
        if(!cat) {
            return res.status(400).send('Invalid Category')
        }

        const fileName = req.file.filename

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
        const product = await Product.findById(req.params.id).populate('category');

        if(!product) {
            res.status(500).json({ success: false })
        }

        res.send(product)
    })
    .put(uploadOptions.single('image'), async (req, res) => {
        if(!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).send('Invalid Product Id')
        }
        
        const category = await Category.findById(req.body.category)
        
        if(!category) {
            return res.status(400).send('Invalid Category')
        }

        const oldProd = Product.findById(req.params.id)

        if(!oldProd) {
            return res.status(400).send('Invalid Product ID')
        }

        const file = req.file
        let image = oldProd.image;

        if(file) {
            const fileName = file.filename
            const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`
            image = `${basePath}${fileName}`
        }
        
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                description: req.body.description,
                richDescription: req.body.richDescription,
                image,
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
        Product.findByIdAndDelete(req.params.id)
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
        const productCount = await Product.countDocuments()

        if(!productCount) {
            res.status(500).json({ success: false })
        } 

        res.send({ productCount })
    })

// Gallery images
router.route('/gallery-images/:id')
    .put(uploadOptions.array('images', 10), async (req, res) => {
        if(!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).send('Invalid Product ID')
        }

        let images = []
        const files = req.files
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`

        if(files) {
            files.map(({ filename }) => { 
                images.push(`${basePath}${filename}`) 
            })
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { images },
            { new: true }
        )

        if(!product) {
            return res.status(500).send('The Product can\'t be updated')
        }

        res.send(product)

    })
    

module.exports = router