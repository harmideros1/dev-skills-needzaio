const express = require("express")
const bodyParser = require("body-parser");

const app = express()

app.use(bodyParser.json());

let port = process.env.PORT || 3000

app.get("/", (req, res) => {
    res.json({
        message: "Test for Needzaio",
        version: "1.0.0",
        author: "Harold Mideros"
    })
})


app.post('/:route', (req, res) => {

    try {
      const module = require(`./src/handlers/${req.params.route}`);
      if (!module) return res.status(404).json({message: `not found`});
      return module.handler(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({message: `An error has ocurred!`});
    }
  
});

app.listen(port, () => {
    console.log(`Test for Needzaio on http://localhost:${port}` );
})