const express = require("express")
const app = express()

let port = process.env.PORT || 3000

app.get("/", (req, res) => {
    res.json({
        message: "Test for Needzaio",
        version: "1.0.0",
        author: "Harold Mideros"
    })
})

app.listen(port, () => {
    console.log(`Test for Needzaio on http://localhost:${port}` );
})