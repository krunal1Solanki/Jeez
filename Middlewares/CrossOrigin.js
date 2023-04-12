const origin = (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "https://melodic-mandazi-cf07e8.netlify.app");
        res.header("Access-Control-Allow-Credentials", true);
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
}

module.exports = {origin}