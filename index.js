import connectDB from "./data/data.js";
import app from "./app.js";
const port = process.env.PORT || 3000
await connectDB();
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})