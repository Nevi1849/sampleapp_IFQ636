
const express = require('express');
const { protect, requireRole } = require('../middleware/authMiddleware');
const { createIdea, getIdeas, reviewIdea, updateIdeaStatus }
 = require('../controllers/ideaController');

const router = express.Router();

router.post('/', protect, requireRole('Founder'), createIdea);
router.get('/', protect, getIdeas);
router.put('/:id/review', protect, requireRole('Reviewer'), reviewIdea);
router.put('/:id/status', protect, requireRole('Reviewer'), updateIdeaStatus);

module.exports = router;
