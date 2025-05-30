const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// SQLite setup
const dbPath = path.join(__dirname, 'reminders.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS reminders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    time TEXT NOT NULL,
    slot TEXT NOT NULL,
    pet INTEGER NOT NULL,
    category INTEGER NOT NULL,
    frequency TEXT NOT NULL,
    status TEXT NOT NULL,
    notes TEXT,
    startDate TEXT,
    endDate TEXT
  )`);
});

// GET all reminders
app.get('/reminders', (req, res) => {
  db.all('SELECT * FROM reminders', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST a new reminder
app.post('/reminders', (req, res) => {
  const { title, time, slot, pet, category, frequency, status, notes, startDate, endDate } = req.body;
  db.run(
    `INSERT INTO reminders (title, time, slot, pet, category, frequency, status, notes, startDate, endDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [title, time, slot, pet, category, frequency, status, notes, startDate, endDate],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      db.get('SELECT * FROM reminders WHERE id = ?', [this.lastID], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json(row);
      });
    }
  );
});

// PUT (update) a reminder
app.put('/reminders/:id', (req, res) => {
  const { id } = req.params;
  const { title, time, slot, pet, category, frequency, status, notes, startDate, endDate } = req.body;
  db.run(
    `UPDATE reminders SET title=?, time=?, slot=?, pet=?, category=?, frequency=?, status=?, notes=?, startDate=?, endDate=? WHERE id=?`,
    [title, time, slot, pet, category, frequency, status, notes, startDate, endDate, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      db.get('SELECT * FROM reminders WHERE id = ?', [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
      });
    }
  );
});

// DELETE a reminder
app.delete('/reminders/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM reminders WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

app.listen(PORT, () => {
  console.log(`Reminders API server running on http://localhost:${PORT}`);
}); 