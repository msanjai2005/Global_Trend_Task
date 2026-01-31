import mongoose from 'mongoose';


const TaskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        default:''
    },
    status:{
        type:String,
        enum:['Pending','Completed'],
        default:'Pending'
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},{timestamps:true});



export  const Task = mongoose.model('Task',TaskSchema);