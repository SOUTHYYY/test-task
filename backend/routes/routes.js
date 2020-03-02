const express = require('express')
const router = express.Router()
const Item = require('../schema/item-schema')


router.post('/', async (req, res) => {
    const post = new Item({
        gps: req.body.gps,
        country: Buffer.from(req.body.country).toString('base64'),
        timezone: Buffer.from(req.body.timezone).toString('base64'),
    })
    try {
        if (post.gps.length > 2) return res.status(400).send('Incorrect gps data')

        const gpsExist = await Item.findOne({gps: req.body.gps})
        if (gpsExist) return res.status(400).send('This data already exists')

        const savedPost = await post.save()
        res.json(savedPost)
    } catch (err) {
        res.json({message: err})
    }
})


router.get('/', async (req, res) => {
    try {
        const posts = await Item.find()
        let data = []
        posts.map(el => {
            let decodedCountry = Buffer.from(el.country, 'base64').toString('ascii')
            let decodedTimezone = Buffer.from(el.timezone, 'base64').toString('ascii')
            let item = {
                date: el.date,
                gps: el.gps,
                _id: el._id,
                country: decodedCountry,
                timezone: decodedTimezone,
                __v: el.__v
            }
            data = [...data, item]
        })
        res.json(data)
    } catch (err) {
        res.json({message: err})
    }
})


module.exports = router
