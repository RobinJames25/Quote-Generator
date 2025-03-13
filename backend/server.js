import express from 'express'
import cors from 'cors'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config();

const app = express()
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/api/quote', async (req, res) => {
    try {
        const response = await axios.get("https://favqs.com/api/qotd")
        res.json(response.data.quote)
    } catch (error){
        console.error("Error fetching quote:", error.message)
        res.status(500).json({ message: 'Error fetching quote', error: error.message })
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})