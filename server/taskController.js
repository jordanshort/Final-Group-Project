module.exports = {
    getUnscheduled: function(req, res){
        //need to correctly set userId 
        let userId = 1;
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
    }, 

    deleteOngoing: function(req, res){
        console.log('Delete Ongoing Endpoint Hit!')
        //need to correctly set userId
        let userId = 1;
        let id = req.params.id;
        req.app.get('db').deleteTask([id]).then(response => {
            req.app.get('db').getInProgress([userId]).then(resp => {
                res.status(200).send(resp)
            })
        });
    }, 

    deleteUnscheduled: function(req, res){
        console.log('Delete Unsched Endpoint Hit!')
        //need to correctly set userId        
        let userId = 1;
        let id = req.params.id;
        req.app.get('db').deleteTask([id]).then(response => {
            req.app.get('db').getUnscheduled([userId]).then(resp => {
                res.status(200).send(resp);
            });
        });
    }
}