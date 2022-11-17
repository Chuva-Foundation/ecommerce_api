const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {

    const authToken = req.headers.authorization;

    jwt.verify(authToken,process.env.AUTH_KEY || "068de8abbe69afe5dfc965aa16af93772a3eb2ab", function (err, decoded) {
        //console.log(err, decoded);
        if (err) {
            return res.status(401).json({
                error: 'Token Invalid'
            })
        }

        req.userid = decoded.id;
        //console.log('UserID', decoded.id);
        next();
    });
}