module.exports = {
    getUnscheduled: function(req, res){
        //need to correctly set userId 
        let userId = 1;
        //first promise gets checklist items associated to task after getting the tasks themselves
        req.app.get('db').getUnscheduled([userId]).then(tasks => {
            let taskArray = tasks.map(task => {
                 return req.app.get('db').getCheckItem([task.taskid]).then(items => {
                    task.checkItems = items;
                    return task;
                });
            })
            //second promise gets comments for each task after getting the checklist items is complete
            Promise.all(taskArray).then((values) => {
                let test = values.map(task => {
                    return req.app.get('db').getComments([task.taskid]).then(comments => {
                        task.comments = comments;
                        return task;
                    })
                });
                Promise.all(test).then(completeTaskArray => {
                    res.status(200).send(completeTaskArray);
                });
            });

        });
    }, 

    getInProgress: function(req, res){
        //need to correctly set userId         
        let userId = 1;
        req.app.get('db').getInProgress([userId]).then(tasks => {
            let taskArray = tasks.map(task => {
                 return req.app.get('db').getCheckItem([task.taskid]).then(items => {
                    task.checkItems = items;
                    return task;
                });
            })
            //second promise gets comments for each task after getting the checklist items is complete
            Promise.all(taskArray).then((values) => {
                let test = values.map(task => {
                    return req.app.get('db').getComments([task.taskid]).then(comments => {
                        task.comments = comments;
                        return task;
                    })
                });
                Promise.all(test).then(completeTaskArray => {
                    res.status(200).send(completeTaskArray);
                });
            });

        });
    }, 

    deleteOngoing: function(req, res){
        //need to correctly set userId
        let userId = 1;
        let id = req.params.taskid;
        req.app.get('db').deleteTask([id]).then(response => {
            req.app.get('db').getInProgress([userId]).then(resp => {
                res.status(200).send(resp)
            })
        });
    }, 

    deleteUnscheduled: function(req, res){
        //need to correctly set userId        
        let userId = 1;
        let id = req.params.taskid;
        req.app.get('db').deleteTask([id]).then(response => {
            req.app.get('db').getUnscheduled([userId]).then(resp => {
                res.status(200).send(resp);
            });
        });
    }
}