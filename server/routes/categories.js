// Import
const { Category } = require('../models/category')
const express = require('express')
const router = express.Router()


//=============== Routes

// Root
router.route('/')
    .get(async (req, res) => {
        const categoryList = await Category.find()

        if(!categoryList) {
            res.status(500).json({ success: false })
        }
        res.send(categoryList)
    })
    .post(async (req, res) => {
        const { name, icon, color } = req.body
        let category = new Category({ name, icon, color })

        category = await category.save()

        if(!category) {
            return res.status(404).send('The category can\'t be created')
        }
        
        res.send(category)
    })


// ID
router.route('/:id')
    .get(async (req, res) => {
        const category = await Category.findById(req.params.id)

        if(!category) {
            res.status(500).json({ message: 'The category couldn\'t found.' })
        }
        res.status(200).send(category)
    })
    .put(async (req, res) => {
        const { name, icon, color } = req.body
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            { name, icon, color },
            { new: true }
        )

        if(!category) {
            return res.status(400).send('Unable to create the category')
        }

        res.send(category)
    })
    .delete((req, res) => {
        Category.findByIdAndDelete(req.params.id)
                .then(category => {
                    if(category) {
                        return res.status(200).json({ success: true, message: 'The category is deleted!' })
                    } else {
                        return res.status(500).json({ success: false, message: 'Category not found' })
                    }
                })
                .catch(err => {
                    return res.status(500).json({ success: false, error: err })
                })
    })


module.exports = router