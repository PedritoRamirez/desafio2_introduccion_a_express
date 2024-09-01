const express = require('express')
const app = express()
const fs = require('fs')
const cors = require('cors')  //Cors
//Enciende el servidor
app.listen(3000, console.log("¡Servidor encendido!"))

app.use(cors())  //Cors
app.use(express.json()) //Middlewar

//Muestra el JSON
app.get("/canciones", (req, res) => {
  const newCancion = JSON.parse(fs.readFileSync("repertorio.json"))
  res.json(newCancion)
}) 

//Agrega una cancion
app.post("/canciones", (req, res) => {
  const cancion = req.body
  const newCancion = JSON.parse(fs.readFileSync("repertorio.json"))
  newCancion.push(cancion)
  fs.writeFileSync("repertorio.json", JSON.stringify(newCancion))
  res.send("Se ha agregado una cancion!")
})

//Muestra la pagina web
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

//Actualizar
app.put("/canciones/:id", (req, res) => {
  const { id } = req.params
  const cancion = req.body
  const canciones = JSON.parse(fs.readFileSync("repertorio.json"))
  const index = canciones.findIndex(p => p.id == id)
  canciones[index] = cancion
  fs.writeFileSync("repertorio.json", JSON.stringify(canciones))

  res.send("Cancion Editada con éxito")
  })

//Eliminar
app.delete("/canciones/:id", (req, res) => {
  const { id } = req.params;
  const canciones = JSON.parse(fs.readFileSync("repertorio.json"));
  const index = canciones.findIndex((p) => p.id == id);
  canciones.splice(index, 1);
  fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
  res.send("Cancion eliminada con éxito");
}); 



