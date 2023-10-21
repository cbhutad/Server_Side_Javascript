const fs = require("fs");

const tours = JSON.parse(fs.readFileSync(`/home/cbhutad/Work/Server_Side_Javascript/Natours/dev-data/data/tours-simple.json`));

exports.checkId = (req, res, next, value) => {
    const id = parseInt(value);
    const tour = tours.find((ele) => ele.id === id);

    if(!tour) {
        res.status(404).json({
            status : "fail",
            message : "Invalid Id"
        })
    }
    next();
}

exports.checkBody = (req, res, next) => {
    if(!req.body.name || !req.body.price) {
        res.status(400).json({
            status : "fail",
            message : "Request body name or price not present"
        })
    }
}

exports.getAllTours = (req,res) => {
    res.status(200).json({
        status: "success",
        result: tours.length,
        data: {
            tours: tours
        }
    });
}; 

exports.getTour = (req,res) => {
    const id = parseInt(req.params.id);
    const tour = tours.find((ele) => ele.id === id);

    res.status(200).json({
        status : "success",
        data : {
            tour : tour
        }
    });
};

exports.createTour = (req, res) => {
    //console.log(req.body);
    const newTourId = tours[tours.length - 1]["id"] + 1;
    const newTour = Object.assign({"id" : newTourId}, req.body);
    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
        if(err) {
            res.send("New Tour addition failed");
            console.log(err.message);
        }
    });
    res.status(201).send({
        status : "New Tour added successfully",
        data : {
            newTour : newTour
        }
    });
};

exports.updateTour = (req,res) => {

    res.status(200).json({
        status : "success",
        data : {
            tour : "Updated Tour here..."
        }
    });
}; 

exports.deleteTour = (req,res) => {

    res.status(204).json({
        status : "success",
        data : null
    });
};

