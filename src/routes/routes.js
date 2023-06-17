const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middlewares/authMiddleware');
const journalController = require('../controllers/journalController2');

// Apply the authentication middleware to all routes in this router
router.use(authenticateJWT);

// Define your journal routes
router.get('/', journalController.getJournals);
router.post('/', journalController.createJournal);
router.put('/:id', journalController.updateJournal);
router.delete('/:id', journalController.deleteJournal);
router.put('/:id/publish', journalController.publishJournal);
router.get('/teachers-feed', authenticateJWT, journalController.getTeachersFeed);

// GET route to fetch the student's feed
router.get('/students-feed', authenticateJWT, journalController.getStudentsFeed);

module.exports = router;
