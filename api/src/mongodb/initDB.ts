const mongoose = require('mongoose');

export function connect(database:string) {
    console.log(database);
    mongoose.connect("mongodb://localhost:27017/"+database, {useNewUrlParser: true})
    .then(() => {
        console.log("Connected to mongodb://localhost:27017/"+database)
    })
    .catch((err: any) => console.log(err));
}