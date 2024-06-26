import express from 'express'
import mongoose from 'mongoose'
import TaskModel from './taskModels/tasksmodel.js'

const app = express()
const port = 2222

//si loogu badalo data JSon
app.use(express.json())


//si aad databaseka ugu xirmatid
mongoose.connect('mongodb+srv://mohamedamiinabdi12:mohamedamiinabdi12@mytasks.tdo44ij.mongodb.net/Tasksdatabase?retryWrites=true&w=majority&appName=Mytasks').then(()=>{
    console.log("connected to the database")
}).catch((eror)=>{
    console.log(eror)
})

app.get('/get', async(req,res)=>{
    const task = await TaskModel.find()
    res.status(200).json(task)
})

app.post('/post', async(req,res)=>{
    const {title,date,finished} = req.body
    const newTask = new TaskModel({
        title,date,finished
    })

    const task = await newTask.save()
    res.status(201).json(task)
})

app.put('/update/:id', async(req,res)=>{
    const {title,date,finished} = req.body
    const task = await TaskModel.findById(req.params.id)
    if(task){
        task.title = title
        task.date = date
        task.finished = finished
        const updatedtask = await task.save()
        res.status(200).json(updatedtask)
    }
    
})

app.delete('/delete/:id', async(req,res)=>{
    const task = await TaskModel.findByIdAndDelete(req.params.id)
    res.status(200).json({message: "task deleted succesfully!"})
})

//serverka kici
app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})
