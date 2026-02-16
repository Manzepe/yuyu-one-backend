const express = require('express')
const path = require('path')
const { Pool } = require('pg')

const app = express()
const PORT = process.env.PORT || 10000

// conexión postgres render
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})

// archivos estáticos (AQUI ESTABA EL ERROR)
app.use(express.static(path.join(__dirname, 'public')))

// index principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

// obtener beneficios activos
app.get('/api/beneficios', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM beneficios WHERE activo = true ORDER BY id'
    )
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error base de datos' })
  }
})

// reset base (borra y vuelve a insertar 3 beneficios)
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
    console.error(err)
    res.status(500).send('Error reiniciando base')
  }
})

// iniciar servidor
app.listen(PORT, () => {
  console.log('Servidor corriendo en puerto ' + PORT)
})
