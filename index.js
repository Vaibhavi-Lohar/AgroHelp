import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pkg from 'pg';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import { body, validationResult } from 'express-validator';

const { Pool } = pkg;
dotenv.config();

const app = express();
const port = 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

app.use(cors());
app.use(express.json());

const upload = multer();

// PostgreSQL connection
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

// Test DB connection
app.get('/api/ping', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ status: 'success', time: result.rows[0].now });
  } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
  }
});

// --- AUTH ---
app.post('/api/signup',
  [body('email').isEmail(), body('password').isLength({ min: 6 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      // Check for duplicate email
      const check = await pool.query('SELECT id FROM users1 WHERE email = $1', [email]);
      if (check.rows.length > 0) {
        return res.status(409).json({ error: 'Email already registered.' });
      }
      const hashed = await bcrypt.hash(password, 10);
      const result = await pool.query(
        'INSERT INTO users1 (email, password_hash) VALUES ($1, $2) RETURNING id, email',
        [email, hashed]
      );
      res.status(201).json({ user: result.rows[0] });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

app.post('/api/login',
  [body('email').isEmail(), body('password').exists()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const userRes = await pool.query('SELECT * FROM users1 WHERE email = $1', [email]);
      if (!userRes.rows.length) return res.status(401).json({ error: 'Invalid credentials' });
      const user = userRes.rows[0];
      const match = await bcrypt.compare(password, user.password_hash);
      if (!match) return res.status(401).json({ error: 'Invalid credentials' });
      const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '2h' });
      res.json({ token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// --- WORKERS ---
app.post('/api/workers', upload.single('photo'), async (req, res) => {
  try {
    const { name, adhar_no, daily_rate, specifications, language_known, experience, provider_id } = req.body;
    const photo = req.file ? req.file.buffer : null;
    const result = await pool.query(
      'INSERT INTO workers1 (provider_id, name, adhar_no, daily_rate, specifications, language_known, experience, photo) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
      [provider_id, name, adhar_no, daily_rate, specifications, language_known, experience, photo]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/workers', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, provider_id, name, adhar_no, daily_rate, specifications, language_known, experience FROM workers1 ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/workers/:id/photo', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT photo FROM workers1 WHERE id = $1', [id]);
    if (!result.rows.length || !result.rows[0].photo) return res.status(404).send('No photo');
    res.set('Content-Type', 'image/jpeg');
    res.send(result.rows[0].photo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- EQUIPMENT ---
app.post('/api/equipment', upload.single('photo'), async (req, res) => {
  try {
    const { provider_id, equipment_name, type, manufacturer, model, year, condition, rental_price, availability, description, specifications, insurance_details } = req.body;
    const photo = req.file ? req.file.buffer : null;
    const result = await pool.query(
      'INSERT INTO equipment1 (provider_id, equipment_name, type, manufacturer, model, year, condition, rental_price, availability, description, specifications, insurance_details, photo) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *',
      [provider_id, equipment_name, type, manufacturer, model, year, condition, rental_price, availability, description, specifications, insurance_details, photo]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/equipment', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, provider_id, equipment_name, type, manufacturer, model, year, condition, rental_price, availability, description, specifications, insurance_details FROM equipment1 ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/equipment/:id/photo', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT photo FROM equipment1 WHERE id = $1', [id]);
    if (!result.rows.length || !result.rows[0].photo) return res.status(404).send('No photo');
    res.set('Content-Type', 'image/jpeg');
    res.send(result.rows[0].photo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- DASHBOARD METRICS ---
app.get('/api/provider/:provider_id/metrics', async (req, res) => {
  try {
    const { provider_id } = req.params;
    const result = await pool.query(
      'SELECT * FROM provider_metrics1 WHERE provider_id = $1',
      [provider_id]
    );
    if (!result.rows.length) return res.status(404).json({ error: 'No metrics found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
