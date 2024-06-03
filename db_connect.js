const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/Records")
    .then(() => {
        console.log("DB has been connected")
    }).catch((error => {
        console.log(error)

    }))