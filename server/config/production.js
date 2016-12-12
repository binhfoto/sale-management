module.exports = {
    logging: true,
    auth: false,
    seed: true,
    db: {
        url: process.env.MONGODB_URI
    }
};