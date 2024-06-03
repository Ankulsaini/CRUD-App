const express = require("express")
const app = express()
const hbs = require("hbs")
const path = require("path")
const bodyParser = require("body-parser")
const Employees = require("./models/Employees")
require("./db_connect")

app.set("view engine", "hbs")
app.use(express.static("views//public"))
hbs.registerPartials(path.join(__dirname, "/views/partials"))
const encoder = bodyParser.urlencoded()

app.get("/", async (req, res) => {
    try {
        var data = await Employees.find().sort({ _id: -1 })
        res.render("index", { data: data })
    } catch (error) {
        console.log(error)
    }
})
app.get("/add", (req, res) => {

    res.render("add", { geterrors: {}, data: {} })
})

app.post("/add", encoder, async (req, res) => {
    console.log(req.body) 
    try {
        var data = new  Employees(req.body)
        await data.save()

        res.redirect("/")
    } catch (error) {
        console.log(error)
        var geterrors = {
            email: error.keyValue?.email ? "Email ID is already exist" : error.errors?.email ? error.errors.email.message : "",
            number: error.keyValue?.number ? "Number is already exist" : error.errors?.number ? error.errors.number.message : "",
            name: error.errors?.name ? error.errors.name.message : "",
            dsg: error.errors?.dsg ? error.errors.dsg.message : "",
            city: error.errors?.city ? error.errors.city.message : "",
            state: error.errors?.state ? error.errors.state.message : "",
            salary: error.errors?.salary ? error.errors.salary.message : ""
        }
        res.render("add", { geterrors: geterrors, data: data })
    }

})

app.get("/delete/:_id", async (req, res) => {
    try {
        let data = await Employees.findOne({ _id: req.params._id })
        if (data)
            await data.deleteOne()

        res.redirect("/")
    } catch (error) {
        console.log(error)
        res.redirect("/")

    }
})
app.get("/edit/:_id", async (req, res) => {
    try {
        var new_data = await Employees.findOne({ _id: req.params._id })
        if (new_data)
            res.render("edit", { geterrors: {}, data: new_data })
        else
            res.redirect("/")

    } catch (error) {
        console.log(error)
        res.redirect("/")

    }
})

app.post("/edit/:_id", encoder, async (req, res) => {
    console.log(req.body)
    try {
        var new_data = await Employees.findOne({ _id: req.params._id })
        if (new_data) {
            new_data.name = req.body.name
            new_data.email = req.body.email
            new_data.number = req.body.number
            new_data.dsg = req.body.dsg
            new_data.salary = req.body.salary
            new_data.city = req.body.city
            new_data.state = req.body.state
            await new_data.save()
        }

        res.redirect("/")
    } catch (error) {
        console.log(error)
        var geterrors = {
            email: error.keyValue?.email ? "Email ID is already exist" : error.errors?.email ? error.errors.email.message : "",
            number: error.keyValue?.number ? "Number is already exist" : error.errors?.number ? error.errors.number.message : "",
            name: error.errors?.name ? error.errors.name.message : "",
            dsg: error.errors?.dsg ? error.errors.dsg.message : "",
            city: error.errors?.city ? error.errors.city.message : "",
            state: error.errors?.state ? error.errors.state.message : "",
            salary: error.errors?.salary ? error.errors.salary.message : ""
        }
        res.render("edit", { geterrors: geterrors, data: new_data })

    }
})

app.get("/search", async (req, res) => {
    let search = req.query.search
    // console.log(search)
    try {
        let data = await Employees.find({
            $or: [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { phone: { $regex: search, $options: "i" } },
                { dsg:    { $regex: search, $options: "i" } },
                { city: { $regex: search, $options: "i" } },
                { state: { $regex: search, $options: "i" } }
            ]
        })
        res.render("index", { data: data })
    } catch (error) {
        console.log(error)
        res.redirect("/")
    }
})
app.listen(8000, () => console.log("Running at http://localhost:8000"))