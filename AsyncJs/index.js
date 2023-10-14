const fs = require('fs');
const superagent = require('superagent');

/* Callback hell example
fs.readFile("./dog.txt", (err, data) => {
    if (err)
        return console.log("Error reading file");
    console.log(`Breed : ${data}`);
    data = new String(data);

    superagent.get(`https://dog.ceo/api/breed/${data.toLowerCase()}/images/random`).end((err, res) => {
        if (err)
            return console.log(err.message);
        //console.log(res.body.message);

        fs.writeFile("./returned-image.txt", res.body.message, (err) => {
            if(err)
                return console.log(err.message);
            console.log("Random dog image saved to file");
        })
    })

})
*/

/* Using Promises 

Here above we see that first readfile is being run asynchronously so here we have a single callback function. After file read is executed we execute the call to dog.ceo api to fetch the breed image where breed type was stored in file. Now this again has a end function which requires a callback function. After this response data from api call has been fetch we perform write asynchronus operation, which also has a callback function. Using promise returned from superagent function we can improce code readibility by removing one call back function.

*/

// fs.readFile("./dog.txt", (err, data) => {
//     if(err)
//         return console.log("Error reading file");
//     console.log(`Breed : ${data}`);
//     data = new String(data);

//     superagent.get(`https://dog.ceo/api/breed/${data.toLowerCase()}/images/random`).then(res => {
//         console.log(res.body.message);
//         fs.writeFile("./returned-image.txt", res.body.message, err => {
//             if(err)
//                 console.log(err.message);
//             console.log("Random dog image url written to file");
//         })
//     }).catch(err => {
//         console.log(err.message);
//     })
// })

/* The above code still does not improve code readibility in that we still have callback functions which can cause issues reading code. To better utilized the promise object we turn to creating function for read and write which return promise objects. If they inbuilt return a promise then we don't have a need to do this.*/

function readFilePro(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err,data) => {
            resolve(data);
            if(err) 
                reject("Error reading file");
        })
    })
}

function writePro(file, text) {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, text, (err) => {
            if(err)
                reject("Error writing the file");
            resolve("File write success");
        })
    })
}

// readFilePro("./dog.txt")
//     .then((data) => {
//         console.log(`Breed : ${data}`);
//         data = new String(data);
//         return superagent.get(`https://dog.ceo/api/breed/${data.toLowerCase()}/images/random`);
//     }).then((res) => {
//         console.log(res.body.message);
//         return writePro("./returned-image.txt", res.body.message);
//     }).then((msg) => {
//         console.log(msg);
//     }).catch((err) => {
//         console.log(err);
//     })

/* Now onto async and await. A function marked as async will be executed asynchronously. Here await keyword is being used with a function which return promise. Here the function execution will stop till the promise is resolved. So we get the synchronous execution of functions asynchronously. This will take time. An asynchronous function returns a Promise itself.*/

const getDogPic = async () => {

    try {
        let data = await readFilePro("dog.txt");
        console.log(`Breed : ${data}`);
        data = data.toString();

        const response = await superagent.get(`https://dog.ceo/api/breed/${data.toLowerCase()}/images/random`);
        console.log(response.body.message);

        await writePro("returned-image.txt", response.body.message);
        console.log("Random dog pic url saved");
    } catch(err) {
        console.log(err);
    }
    return "Api call success";
}

/* This sequence of executions is executed asynchronously. So both start and complete process console are logged and then dogPic console are printed.  */
// console.log("Started the process");
// getDogPic();
// console.log("Process completed");

/* So in order to execute them in synchronous manner we can use await keyword on the promise returned by getDogPic async function. But since we cannot use await standalone way we need to do so inside async function. try and catch added for error handling. */
(async () => {
    try {
    console.log("Started the process");
    const res = await getDogPic();
    console.log(res);
    console.log("Process completed");
    } catch(err) {
        console.log(err.message);
    }
})();

