const express = require('express')
const path = require('path')
const { Pool } = require('pg')

const app = express()
const PORT = process.env.PORT || 10000

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})

/* CARPETA PUBLIC CORRECTA */
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

/* API BENEFICIOS */
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

/* RESET BASE */
app.get('/api/reset', async (req, res) => {
  try {
    await pool.query('DELETE FROM beneficios')

    await pool.query(`
      INSERT INTO beneficios (nombre, activo) VALUES
      ('Seguro de Pantalla', true),
      ('Descuentos Locales', true),
      ('Ahorro en Viajes', true)
    `)

    res.send('Base reiniciada correctamente')
  } catch (err) {
    res.status(500).send('Error reiniciando base')
  }
})

app.listen(PORT, () => {
  console.log('Servidor corriendo en puerto ' + PORT)
})
