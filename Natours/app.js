const express = require("express");
const tourRoute = require("./routes/tourRoute");
const userRoute = require("./routes/userRoute");

const port = 3000;
const app = express();
app.use(express.json());


/*
app.get("/api/v1/tours", getAllTours);
//get a specific tour by passing ID as param in url
app.get("/api/v1/tours/:id", getTour);
app.post("/api/v1/tours", createTour); 
//update a specific tour
app.patch("/api/v1/tours/:id", updateTour);
//delete a specific tour
app.delete("/api/v1/tours/:id", deleteTour);
*/

app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);

module.exports = app;
