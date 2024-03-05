const express = require('express')
const mongoose = require('mongoose')
const port = 5000
const cors = require('cors');
const app = express()

require("dotenv").config()

app.use(cors());
app.use(express.json())


const Projects = mongoose.model('Projects', { 
    id: String,
    name: String,
    // history: String, //array
    budget: Number,
    // category: String, //array
    // costs: Number,
    // services: String //array

})

app.get('/', async (req, res) => {
    const projects = await Projects.find()
    res.send('Hello World!')
})

app.post('/', async (req, res) => {
    const project = new Projects({
        id: req.body.id,
        name: req.body.name,
        budget: req.body.budget,
        // costs: req.body.costs,
    })

    console.log("criado")

    await project.save()
    res.send(project)
})

app.put("/:id", async (req, res) => {
    const project = await Projects.findByIdAndUpdate(req.params.id, {
        id: req.body.id,
        name: req.body.name,
        budget: req.body.budget,
        costs: req.body.costs,
    }, {
        new: true
    })

    return res.send(project)
})

app.delete('/:id', async (req, res) => {
    const project = await Projects.findByIdAndDelete(req.params.id)
    return res.send(project)
})

app.listen(port, () => {
    mongoose.connect(MONGODB)
    console.log(`App running on port ${port}`)
})

tesdte