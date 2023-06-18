const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middlewares/authMiddleware');
const journalController = require('../controllers/journalController2');


// Define your journal routes
router.get('/', authenticateJWT, journalController.getJournals);
router.post('/create', authenticateJWT, journalController.createJournal);
router.put('/update/:id', authenticateJWT, journalController.updateJournal);
router.delete('/delete/:id', authenticateJWT, journalController.deleteJournal);
router.put('/:id/publish', authenticateJWT, journalController.publishJournal);
router.get('/teachers-feed', authenticateJWT, journalController.getTeachersFeed);

// GET route to fetch the student's feed
router.get('/students-feed', authenticateJWT, journalController.getStudentsFeed);

module.exports = router;
