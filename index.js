const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require("dotenv").config()

const app = express()
const port = 5000

// Middleware
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGODB)

const projectSchema = new mongoose.Schema({
    id: String,
    name: String,
    history: [
        {
            nome: String,
            valor: Number
        }
    ],
    budget: Number,
    category: {
        id: String,
        name: String
    },
    costs: Number,
    services: [
        {
            name: String,
            costs: Number,
            description: String,
            id: String
        }
    ],
})

const Projects = mongoose.model('Projects', projectSchema)

app.get('/project', async (req, res) => {
    try {
        const projects = await Projects.find()
        res.json(projects)

        // console.log(projects)

    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error')
    }
})

app.get('/project/:_id', async (req, res) => {
    try {
        const projects = await Projects.findById(req.params._id)
        res.json(projects)

    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error')
    }
})

app.post('/project', async (req, res) => {
    try {
        const { id, name, history, budget, category, costs, services } = req.body
        const project = new Projects({ 
            id, 
            name, 
            history, 
            budget, 
            category, 
            costs, 
            services 
        })

        // console.log(project)

        await project.save()
        res.json(project)

    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error')
    }
})

app.patch("/project/:_id", async (req, res) => {
    try {
        const { _id, name, history, budget, category, costs, services } = req.body
        const project = await Projects.findByIdAndUpdate(req.params._id, { 
            _id, 
            name, 
            history, 
            budget, 
            category, 
            costs, 
            services 
        }, { 
            new: true 
        })

        res.json(project)
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error')
    }
})

app.delete('/project/:_id', async (req, res) => {
    try {
        const project = await Projects.findByIdAndDelete(req.params._id)
        res.json(project)
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error')
    }
})

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})