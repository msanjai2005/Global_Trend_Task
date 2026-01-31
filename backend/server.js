import express from 'express';
import 'dotenv/config';
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import taskRouter from './routes/task.routes.js';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

const PORT = process.env.PORT || 3000;


app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders:["Content-Type","Authorization"]
}));

app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

app.use('/api/auth',authRouter);
app.use('/api/task',taskRouter);


app.listen(PORT,()=>{
    console.log('server is running on http://localhost:3000');
})