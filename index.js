const express = require("express")
const app = express()
const PORT = 3001
const cors = require('cors')

app.use(cors()) 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import Routes
const authRoutes = require("./routes/blog-stats");

app.use("/api", authRoutes, ()=>{
    console.log("Blog-stats")
});

const server = app.listen(PORT, () =>
  console.log(`Server Connected to port ${PORT}`)
)
// Handling Error
process.on("unhandledRejection", err => {
  console.log(`An error occurred: ${err.message}`)
  server.close(() => process.exit(1))
})

