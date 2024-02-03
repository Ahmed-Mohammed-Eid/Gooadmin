import mongoose from "mongoose";

// const dbConnect = () => {
//     mongoose.connect(process.env.MONGODB_LINK, () => console.log('connected'), (e) => e)
// }

// export default dbConnect;

const connection = {};

const dbConnect = async () => {
    if (connection.isConnected === 1) return;

    const db = await mongoose
        .connect(process.env.MONGODB_LINK, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(
            (db) => {
                console.log("connected to DB");
                return db;
            },
            (e) => e
        );

    connection.isConnected = db.connections[0].readyState;
};

export default dbConnect;
