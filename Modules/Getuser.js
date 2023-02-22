const mongodb = require("mongodb");
const dotenv = require('dotenv');

dotenv.config();
const mongoClient = mongodb.MongoClient;
const MONGO_URL = process.env.MONGO_URL;

const getUser = async (req, res) => {
    try {
       
        let client = await mongoClient.connect(MONGO_URL);
        
        let db = client.db("FPadmin");
     
        let user = await db.collection('users').find({ _id: mongodb.ObjectId(req.body.userid) }).toArray();
        if (user) {
            res.send(user);
        } else {
            res.json({
                message: "User not exist"
            })
        }

    } catch (error) {
        res.status(403).json({
            message: "Something went wrong!"
        })
    }
}

module.exports = getUser