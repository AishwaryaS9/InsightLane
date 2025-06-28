import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/db.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';
import userRouter from './routes/userRoutes.js';
import newsLetterRouter from './routes/newsLetterRoutes.js';
import './schedulers/newLetterScheduler.js';

const app = express();

await connectDB()

//Middlewares
app.use(cors())
app.use(express.json())


//Routes
app.get('/', (req, res) => res.send("API is Working"))
app.use('/api/admin', adminRouter)
app.use('/api/user', userRouter);
app.use('/api/blog', blogRouter);
app.use("/api/newsletter", newsLetterRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT)
})

export default app;