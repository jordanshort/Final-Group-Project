module.exports = {
    verifyToken: function(req, res, next){
        jwt.verify(req.body.token, AUTH0_CLIENT_SECRET, (err, decoded) => {
            let db = app.get('db');
            if (err){
                console.log('Authorization failed', err);
                next(err);
            }
            let { given_name, family_name, email, sub } = decoded;
            db.checkForUser([sub]).then((resp) => {
                let user = resp[0];
                let id = '';
                if (!user){
                    db.createUser([given_name, family_name, email, sub]).then(resp => {
                        id = resp[0].userid;
                        let token = jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d'})
                        res.status(200).send(token);                    
                    });
                } else {
                    id = user.id;
                    let token = jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d'})
                    res.status(200).send(token);
                }
            })
        })
    }
}