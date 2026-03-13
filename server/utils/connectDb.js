const mongoose = require('mongoose');

let cachedConnection = global.mongooseConnection;

if (!cachedConnection) {
    cachedConnection = global.mongooseConnection = {
        conn: null,
        promise: null
    };
}

const connectDb = async () => {
    if (cachedConnection.conn) {
        return cachedConnection.conn;
    }

    if (!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI is not configured');
    }

    if (!cachedConnection.promise) {
        cachedConnection.promise = mongoose.connect(process.env.MONGODB_URI)
            .then((mongooseInstance) => mongooseInstance);
    }

    cachedConnection.conn = await cachedConnection.promise;
    return cachedConnection.conn;
};

module.exports = connectDb;