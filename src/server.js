const express = require('express')
const path = require('path')
const { Pool } = require('pg')

const app = express()
const PORT = process.env.PORT || 10000

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})

app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.get('/api/beneficios', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM beneficios WHERE activo = true ORDER BY id'
    )
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: 'Error base de datos' })
  }
})

app.listen(PORT, () => {
  console.log('Servidor corriendo en puerto ' + PORT)
})
