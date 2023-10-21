exports.getAllUsers = (req, res) => {
    res.status(200).json({
        status : "success",
        data : {
            users : "Users data ..."
        }
    });
}

exports.getUser = (req, res) => {
    res.status(200).json({
        status : "success",
        data : {
            user : "User data ..."
        }
    });
}

exports.createUser = (req, res) => {
    res.status(201).json({
        status : "success",
        data : {
            newuser : "New user details ..."
        }
    });
}

exports.updateUser = (req, res) => {
    res.status(200).json({
        status : "success",
        data : {
            updatedUser : "Updated user details ..."
        }
    });
}

exports.deleteUser = (req, res) => {
    res.status(204).json({
        status : "succesS",
        data : null
    });
}

