const mongodb = require("mongodb");
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();
const mongoClient = mongodb.MongoClient;
const MONGO_URL = process.env.MONGO_URL;

const changepassword = async (req, res) => {
    try {

       
        let client = await mongoClient.connect(MONGO_URL);
    
        let db = client.db("FPadmin");
       
        const salt = bcrypt.genSaltSync(10);
        const hashedpassword = bcrypt.hashSync(req.body.password, salt);
        
        let data = await db.collection('users').findOneAndUpdate({ _id: mongodb.ObjectId(req.body.userid) }, { $set: { password: hashedpassword } });
        
        await db.collection('users').findOneAndUpdate({ _id: mongodb.ObjectId(req.body.userid) }, { $unset: { resetPasswordToken: 1, resetPasswordExpires: 1 } });
        await client.close();
        res.json({
            message: "Password changed successfully!"
        })

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!"
        })
    }
}

module.exports = changepassword