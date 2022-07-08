const express = require('express');
const router = express.Router();

const {createTransaction} = require('../controllers/payment');

router.route('/').post(createTransaction);


module.exports = router;