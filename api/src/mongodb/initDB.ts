const mongoose = require('mongoose');

export async function connect(database:string) {
    console.log(database);
    mongoose.connect("mongodb://localhost:27017/"+database, {useNewUrlParser: true})    
    .then(() => {
        console.log("Connected to mongodb://localhost:27017/"+database)
    })
    .catch((err: any) => console.log(err));

    // TODO: If identity management is implemented then erase the code below
    const User = require("./User")
    try{
        const users = await User.find() // takes first vote that is in the mongoDB#
        if (users.length===0){
            const user1 = new User({name: "user1", password: "user1", voted: [], logged_in: false})
            user1.save().then(() => console.log("New user is saved in mongoDB"))
            const user2 = new User({name: "user2", password: "user2", voted: [], logged_in: false})
            user2.save().then(() => console.log("New user is saved in mongoDB"))
            const user3 = new User({name: "user3", password: "user3", voted: [], logged_in: false})
            user3.save().then(() => console.log("New user is saved in mongoDB"))
            const user4 = new User({name: "user4", password: "user4", voted: [], logged_in: false})
            user4.save().then(() => console.log("New user is saved in mongoDB"))
            const user5 = new User({name: "user5", password: "user5", voted: [], logged_in: false})
            user5.save().then(() => console.log("New user is saved in mongoDB"))
            const user6 = new User({name: "user6", password: "user6", voted: [], logged_in: false})
            user6.save().then(() => console.log("New user is saved in mongoDB"))
            const user7 = new User({name: "user7", password: "user7", voted: [], logged_in: false})
            user7.save().then(() => console.log("New user is saved in mongoDB"))
            const user8 = new User({name: "user8", password: "user8", voted: [], logged_in: false})
            user8.save().then(() => console.log("New user is saved in mongoDB"))
            const user9 = new User({name: "user9", password: "user9", voted: [], logged_in: false})
            user9.save().then(() => console.log("New user is saved in mongoDB"))
            const user10 = new User({name: "user10", password: "user10", voted: [], logged_in: false})
            user10.save().then(() => console.log("New user is saved in mongoDB"))
        }
    } catch (e) {
        console.log(e)
    }
}