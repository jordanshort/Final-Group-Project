module.exports = {
    verifyToken: function(req, res, next){
        jwt.verify(req.body.token, AUTH0_CLIENT_SECRET, (err, decoded) => {
            let db = app.get('db');
            if (err){
                console.log('Authorization failed', err);
                next(err);
            } else {
                next();
            };
           
        });
    }
}