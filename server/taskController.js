module.exports = {
    getUnscheduled: function(req, res){
        //need to correctly set userId 
        let userId = 1;
        console.log('Endpoint hit!')
        req.app.get('db').getUnscheduled([userId]).then(response => {
            res.status(200).send(response);
        });
    }, 

    getInProgress: function(req, res){
        //need to correctly set userId         
        let userId = 1;
        req.app.get('db').getInProgress([userId]).then(response => {
            res.status(200).send(response);
        });
    }
}