
const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createIdea, getIdeas } = require('../controllers/ideaController');

const router = express.Router();

router.post('/', protect, createIdea);
router.get('/', protect, getIdeas);

module.exports = router;
