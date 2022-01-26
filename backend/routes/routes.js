const express = require('express');
const router = express.Router();
const userDetails = require('../models/userDetails')


router.post('/fetch_device_details', async (req, res) => {
    const user_data = new userDetails(req.body)

    try {
        const a1 = await user_data.save()
        res.json(a1)
    } catch (err) {
        res.send('Error')
    }
})

module.exports = router;