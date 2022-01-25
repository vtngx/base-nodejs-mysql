const express = require('express');
const router = express.Router();
const functions = require('./functions');

router.post('/samplepost', async function (req, res, next) {
    return res.status(200).send(await functions.samplepost(req.body));
});

module.exports = router;