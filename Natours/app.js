const express = require("express")
const fs = require("fs");

const port = 3000;
const app = express();

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

app.get("/api/v1/tours", (req,res) => {
    res.status(200).json({
        status: "success",
        result: tours.length,
        data: {
            tours: tours
        }
    });
});

app.listen(port, () => {
    console.log("Express app running at port 3000 ...");
})
