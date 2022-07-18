import express from "express"
import { connect } from "../mongodb/initDB";

const helpersRouter: express.Router = express.Router();

helpersRouter.get("/allVote", async(req, res) => {
    //connect("provotum");
    const Vote = require("../mongodb/Vote")
    try{
        const vote = await Vote.find() // takes first vote that is in the mongoDB
        res.json(vote)
    } catch (e) {
        console.log(e)
    }
})

helpersRouter.get("/questions", async(req, res) => {
    //connect("provotum");
    const Vote = require("../mongodb/Vote")
    try{
        const vote = await Vote.find({vote: req.body.vote}).select("questions -_id") // takes first vote that is in the mongoDB
        res.json(vote)
    } catch (e) {
        console.log(e)
    }
})

helpersRouter.get("/phase", async(req, res) => {
    //connect("provotum");
    const Vote = require("../mongodb/Vote")
    try{
        const vote = await Vote.find({vote: req.body.vote}).select("phase -_id") // takes first vote that is in the mongoDB
        res.json(vote)
    } catch (e) {
        console.log(e)
    }
})

// TODO: If identity management is implemented then erase the code below
helpersRouter.get("/allUsers", async(req, res) => {
    //connect("provotum");
    const User = require("../mongodb/User")
    try{
        const users = await User.find() // takes first vote that is in the mongoDB
        res.json(users)
    } catch (e) {
        console.log(e)
    }
})

// TODO: If identity management is implemented then erase the code below
helpersRouter.post("/userWithUsername", async(req, res) => {
    //connect("provotum");
    const User = require("../mongodb/User")
    try{
        const user = await User.find({name: req.body.name})
        res.json(user)
    } catch (e) {
        console.log(e)
    }
})

// TODO: If identity management is implemented then erase the code below
helpersRouter.post("/login", async(req, res) => {
    //connect("provotum");
    const User = require("../mongodb/User")
    try{
        const password = await User.find({name: req.body.name}).select("password -_id")
        const status = await User.find({name: req.body.name}).select("logged_in -_id")
        console.log(status[0].logged_in===true)
        if (password.length===0){
            res.status(404)
            res.json({message:"username was not found"})
        }
        else if (password[0].password !== req.body.password){
            res.status(404)
            res.json({message:"wrong password"})
        }
        else if (status[0].logged_in===true){
            res.status(404)
            res.json({message:"this user is already logged in"})
        }
        else {
            await User.findOneAndUpdate({vote: req.body.name}, {logged_in: true})        
            res.json({message:"login successfull"})
        }
    } catch (e) {
        console.log(e)
    }
})

// TODO: If identity management is implemented then erase the code below
helpersRouter.post("/logout", async(req, res) => {
    //connect("provotum");
    const User = require("../mongodb/User")
    try{
        const user = await User.findOneAndUpdate({name: req.body.name}, {logged_in: false})  
        if (user===null){
            res.status(404)
            res.send("This user was not found")
        }
        else{
            res.status(200)
            res.send(req.body.name + " is logged out")
        }     
    } catch (e) {
        console.log(e)
    }
})



export { helpersRouter }