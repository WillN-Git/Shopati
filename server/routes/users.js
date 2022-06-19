// Import
const { User } = require('../models/user')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


// Routes

// Root
router.route('/')
    .get(async (req, res) =>{
        const userList = await User.find().select('-passwordHash')

        if(!userList) {
            res.status(500).json({ success: false })
        } 
        res.send(userList)
    })
    .post(async (req, res) => {
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            passwordHash: bcrypt.hashSync(req.body.password, 10),
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            street: req.body.street,
            apartment: req.body.apartment,
            zip: req.body.zip,
            city: req.body.city,
            country: req.body.country,
        })

        user = await user.save()

        if(!user)
            return res.status(400).send('The user can\'t be created!')

        res.send(user)
    })


// ID
router.route('/:id')
    .get(async (req, res) => {
        const user = await User.findById(req.params.id).select('-passwordHash')

        if(!user) {
            res.status(500).json({ message: 'The user with the given ID was not found.' })
        }

        res.status(200).send(user)
    })
    .put(async (req, res) => {
        const userExist = await User.findById(req.params.id)
        let newPassword

        if(req.body.password) {
            newPassword = bcrypt.hashSync(req.body.password, 10)
        } else {
            newPassword = userExist.passwordHash
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                email: req.body.email,
                passwordHash: newPassword,
                phone: req.body.phone,
                isAdmin: req.body.isAdmin,
                street: req.body.street,
                apartment: req.body.apartment,
                zip: req.body.zip,
                city: req.body.city,
                country: req.body.country,
            },
            { new: true }
        )

        if(!user) {
            return res.status(400).send('The user can\'t be created!')
        }

        res.send(user)
    })
    .delete((req, res) => {
        User.findByIdAndRemove(req.params.id).then(user => {
            if(user) {
                return res.status(200).json({ success: true, message: 'The user is deleted!' })
            } else {
                return res.status(404).json({ success: false, message: 'user not found!' })
            }            
        }).catch(err => {
            return res.status(500).json({ success: false, error: err })
        })
    })


// LOGIN
router.route('/login')
    .post(async (req, res) => {
        const user = await User.findOne({ email: req.body.email })
        const secret = process.env.secret

        if(!user) {
            return res.status(400).send('The user not found')
        }

        if(user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
            const token = jwt.sign(
                {
                    userId: user.id,
                    isAdmin: user.isAdmin,
                },
                secret,
                { expiresIn: '1d' }
            )

            res.status(200).send({ user: user.email, token })
        } else {
            res.status(400).send('password is wrong!');
        }
    })

// REGISTER
router.route('/resgister')
    .post(async (req, res) => {
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            passwordHash: bcrypt.hashSync(req.body.password, 10),
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            street: req.body.street,
            apartment: req.body.apartment,
            zip: req.body.zip,
            city: req.body.city,
            country: req.body.country,
        })

        user = await user.save()

        if(!user) {
            return res.status(400).send('The user can\'t be created!')
        }

        res.send(user)
    })

// COUNT
router.route('/get/count')
    .get(async (req, res) => {
        const userCount = await User.countDocuments()

        if(!userCount) {
            res.status(500).json({ success: false })
        }

        // console.log("USER COUNT => ", typeof userCount); => number
        
        res.send({ userCount })
    })

module.exports = router