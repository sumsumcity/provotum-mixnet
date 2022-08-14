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
            const user1 = new User({name: "user1", password: "user1", voted: [], logged_in: false, participated_in_election: false})
            user1.save().then(() => console.log("New user is saved in mongoDB"))
            const user2 = new User({name: "user2", password: "user2", voted: [], logged_in: false, participated_in_election: false})
            user2.save().then(() => console.log("New user is saved in mongoDB"))
            const user3 = new User({name: "user3", password: "user3", voted: [], logged_in: false, participated_in_election: false})
            user3.save().then(() => console.log("New user is saved in mongoDB"))
            const user4 = new User({name: "user4", password: "user4", voted: [], logged_in: false, participated_in_election: false})
            user4.save().then(() => console.log("New user is saved in mongoDB"))
            const user5 = new User({name: "user5", password: "user5", voted: [], logged_in: false, participated_in_election: false})
            user5.save().then(() => console.log("New user is saved in mongoDB"))
            const user6 = new User({name: "user6", password: "user6", voted: [], logged_in: false, participated_in_election: false})
            user6.save().then(() => console.log("New user is saved in mongoDB"))
            const user7 = new User({name: "user7", password: "user7", voted: [], logged_in: false, participated_in_election: false})
            user7.save().then(() => console.log("New user is saved in mongoDB"))
            const user8 = new User({name: "user8", password: "user8", voted: [], logged_in: false, participated_in_election: false})
            user8.save().then(() => console.log("New user is saved in mongoDB"))
            const user9 = new User({name: "user9", password: "user9", voted: [], logged_in: false, participated_in_election: false})
            user9.save().then(() => console.log("New user is saved in mongoDB"))
            const user10 = new User({name: "user10", password: "user10", voted: [], logged_in: false, participated_in_election: false})
            user10.save().then(() => console.log("New user is saved in mongoDB"))
            const user11 = new User({name: "user11", password: "user11", voted: [], logged_in: false, participated_in_election: false})
            user11.save().then(() => console.log("New user is saved in mongoDB"))
            const user12 = new User({name: "user12", password: "user12", voted: [], logged_in: false, participated_in_election: false})
            user12.save().then(() => console.log("New user is saved in mongoDB"))
            const user13 = new User({name: "user13", password: "user13", voted: [], logged_in: false, participated_in_election: false})
            user13.save().then(() => console.log("New user is saved in mongoDB"))
            const user14 = new User({name: "user14", password: "user14", voted: [], logged_in: false, participated_in_election: false})
            user14.save().then(() => console.log("New user is saved in mongoDB"))
            const user15 = new User({name: "user15", password: "user15", voted: [], logged_in: false, participated_in_election: false})
            user15.save().then(() => console.log("New user is saved in mongoDB"))
            const user16 = new User({name: "user16", password: "user16", voted: [], logged_in: false, participated_in_election: false})
            user16.save().then(() => console.log("New user is saved in mongoDB"))
            const user17 = new User({name: "user17", password: "user17", voted: [], logged_in: false, participated_in_election: false})
            user17.save().then(() => console.log("New user is saved in mongoDB"))
            const user18 = new User({name: "user18", password: "user18", voted: [], logged_in: false, participated_in_election: false})
            user18.save().then(() => console.log("New user is saved in mongoDB"))
            const user19 = new User({name: "user19", password: "user19", voted: [], logged_in: false, participated_in_election: false})
            user19.save().then(() => console.log("New user is saved in mongoDB"))
            const user20 = new User({name: "user20", password: "user20", voted: [], logged_in: false, participated_in_election: false})
            user20.save().then(() => console.log("New user is saved in mongoDB"))
        }
    } catch (e) {
        console.log(e)
    }
}