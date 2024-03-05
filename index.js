const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require("dotenv").config()

const app = express()
const port = 5000

// Middleware
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })

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
    try {
        const projects = await Projects.find()
        res.json(projects)

    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error')
    }
})

app.post('/', async (req, res) => {
    try {
        const { id, name, budget } = req.body
        const project = new Projects({ id, name, budget })

        console.log("Project created")

        await project.save()
        res.json(project)

    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error')
    }
})

app.put("/:id", async (req, res) => {
    try {
        const { id, name, budget, costs } = req.body
        const project = await Projects.findByIdAndUpdate(req.params.id, { id, name, budget, costs }, { new: true })

        res.json(project)
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error')
    }
})

app.delete('/:id', async (req, res) => {
    try {
        const project = await Projects.findByIdAndDelete(req.params.id)
        res.json(project)
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error')
    }
})

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})