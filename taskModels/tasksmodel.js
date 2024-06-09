import mongoose from "mongoose";

const tasksSchema = mongoose.Schema({
    title:{
        type: String,
        require: [true, 'title required']
    },
    date:{
        type: String,
        require: [true, 'date required']
    },
    finished: {
        type:Boolean
    }
})

const TaskModel = mongoose.model('tasks', tasksSchema);

export default TaskModel;