const knex = require('../db/db'); // Import the db.js file

const getJournals = (req, res) => {
    const user = req.user;
    console.log(req.user);
    if (user === 'teacher1') {
        knex('journals')
            .where('created_by', user)
            .then((teacherJournals) => {
                res.json(teacherJournals);
            })
            .catch((err) => {
                console.error('Error fetching teacher journals:', err);
                res.status(500).json({ message: 'Failed to fetch teacher journals' });
            });
    } else if (user === 'student') {
        knex('journals')
            .where('tagged_students', 'like', `%${user}%`)
            .then((studentJournals) => {
                res.json(studentJournals);
            })
            .catch((err) => {
                console.error('Error fetching student journals:', err);
                res.status(500).json({ message: 'Failed to fetch student journals' });
            });
    } else {
        res.status(403).json({ message: 'Forbidden' });
    }
};


const createJournal = (req, res) => {
    if (req.user !== 'teacher1') {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const { description, tagged_students, published_at, attachment } = req.body;
    const created_by = req.user;

    knex('journals')
        .insert({
            description,
            tagged_students,
            published_at,
            attachment,
            created_by,
        })
        .then((journalId) => {
            res.json({ id: journalId, description, message: 'Journal created successfully' });
        })
        .catch((err) => {
            console.error('Error creating journal:', err);
            res.status(500).json({ message: 'Failed to create journal' });
        });
};

const updateJournal = (req, res) => {
    if (req.user !== 'teacher1') {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const { id } = req.params;
    const { description, tagged_students, published_at, attachment } = req.body;

    knex('journals')
        .where('id', id)
        .update({
            description,
            tagged_students,
            published_at,
            attachment,
        })
        .then((affectedRows) => {
            if (affectedRows > 0) {
                res.json({ message: 'Journal updated successfully' });
            } else {
                res.status(404).json({ message: 'Journal not found' });
            }
        })
        .catch((err) => {
            console.error('Error updating journal:', err);
            res.status(500).json({ message: 'Failed to update journal' });
        });
};

const deleteJournal = (req, res) => {
    if (req.user !== 'teacher1') {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const { id } = req.params;

    knex('journals')
        .where('id', id)
        .del()
        .then((affectedRows) => {
            if (affectedRows > 0) {
                res.json({ message: 'Journal deleted successfully' });
            } else {
                res.status(404).json({ message: 'Journal not found' });
            }
        })
        .catch((err) => {
            console.error('Error deleting journal:', err);
            res.status(500).json({ message: 'Failed to delete journal' });
        });
};

const publishJournal = (req, res) => {
    if (req.user !== 'teacher1') {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const { id } = req.params;

    knex('journals')
        .where('id', id)
        .update({ published: true })
        .then((affectedRows) => {
            if (affectedRows > 0) {
                res.json({ message: 'Journal published successfully' });
            } else {
                res.status(404).json({ message: 'Journal not found' });
            }
        })
        .catch((err) => {
            console.error('Error publishing journal:', err);
            res.status(500).json({ message: 'Failed to publish journal' });
        });
};
const getTeachersFeed = (req, res) => {
    const user = req.user;
    console.log(req.user);

    if (user === 'teacher1') {
        knex('journals')
            .where('created_by', user)
            .orderBy('published_at', 'desc')
            .then((teacherJournals) => {
                res.json(teacherJournals);
            })
            .catch((err) => {
                console.error('Error fetching teacher feed:', err);
                res.status(500).json({ message: 'Failed to fetch teacher feed' });
            });
    } else {
        res.status(403).json({ message: 'Forbidden' });
    }
};

const getStudentsFeed = (req, res) => {
    const user = req.user;
    console.log(req.user);

    if (user === 'student') {
        knex('journals')
            .where('tagged_students', 'like', `%${user}%`)
            .orderBy('published_at', 'desc')
            .then((studentJournals) => {
                res.json(studentJournals);
            })
            .catch((err) => {
                console.error('Error fetching student feed:', err);
                res.status(500).json({ message: 'Failed to fetch student feed' });
            });
    } else {
        res.status(403).json({ message: 'Forbidden' });
    }
};

module.exports = {
    getJournals,
    createJournal,
    updateJournal,
    deleteJournal,
    publishJournal,
    getTeachersFeed,
    getStudentsFeed,
};
