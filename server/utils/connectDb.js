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
            .then((mongooseInstance) => mongooseInstance)
            .catch((error) => {
                cachedConnection.promise = null;
                throw error;
            });
    }

    cachedConnection.conn = await cachedConnection.promise;
    return cachedConnection.conn;
};

const getDbConnectionState = () => ({
    readyState: mongoose.connection.readyState,
    host: mongoose.connection.host || null,
    name: mongoose.connection.name || null
});

module.exports = {
    connectDb,
    getDbConnectionState
};