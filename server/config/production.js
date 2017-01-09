module.exports = {
    logging: true,
    auth: true,
    seed: true,
    db: {
        url: process.env.MONGODB_URI
    }
};
