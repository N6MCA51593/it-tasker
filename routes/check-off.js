const express = require('express');
const router = express.Router();
const { db } = require('../db/db');

// @route     POST api/check-off
// @desc      Check off task devices
// @access    Private
router.post('/check-off', async (req, res) => {});

module.exports = router;
