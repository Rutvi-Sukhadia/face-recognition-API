const handleGetProfileReq = (req,res,UserModel) => {
    const {id} = req.params;
    UserModel
    .find({
        _id: id
    })
    .then(user => {
        if(user[0])
        {
           res.json({
                id: user[0]._id,
                email: user[0].email,
                name: user[0].name,
                entries: user[0].entries,
                joiningDate: user[0].joiningDate
            });
        }
        else  
            res.status(400).json("No such user found"); 
    })
    .catch(err => {
        res.status(400).json("Error encountered");
        console.error(err);
    })
}

const handlePutProfileReq = (req,res,UserModel) => {
    const {id} = req.params;
    const user = req.body;
    UserModel
    .findOneAndUpdate(
        {
        _id: id 
        }, 
        user,
        {
            new: true,                       // return updated doc
            runValidators: true              // validate before update
        })
    .then(usr => {
        if(usr){
            return res.json(usr);
        }
        else
            res.status(400).json("No such user found");
        
    })
    .catch(err => {
        console.error("Error:",err);
        res.status(400).json("Error encountered");
    })
}

module.exports = {
    handleGetProfileReq: handleGetProfileReq,
    handlePutProfileReq: handlePutProfileReq
}