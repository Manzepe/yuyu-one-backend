const express = require('express')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 10000

app.use(express.static(path.join(__dirname, '../public')))

// ✅ RUTA API BENEFICIOS (ESTO FALTABA)
app.get('/api/beneficios', (req, res) => {
  res.json([
    { id: 1, nombre: "Seguro de Pantalla", activo: true },
    { id: 2, nombre: "Descuentos Locales", activo: true },
    { id: 3, nombre: "Ahorro en Viajes", activo: true }
  ])
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`)
})
