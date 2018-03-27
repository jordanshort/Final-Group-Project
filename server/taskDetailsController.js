module.exports={
    addCheckItem: function(req, res){
        let item = [
            req.params.taskid,
            req.body.content
        ];
        req.app.get('db').addCheckItem(item).then()

    }, 

    addComment: function(req, res){

    }, 

    editTask: function(req, res){

    },

    addTask: function(req, res){
        
    }
}