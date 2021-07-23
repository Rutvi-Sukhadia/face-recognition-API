const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '04f7a756443e4f3e8738f5711a3fd223'
});

const handleClarifaiReq = (req,res) => {
    app.models
        .predict(Clarifai.CELEBRITY_MODEL, req.body.imageURL)
        .then(response => {
            res.json(response);
        })
        .catch(err => res.status(400).json('Error while working with Clarifai API: ' + err))
}
  
const handleImageEntry = (req,res,UserModel) => {
    const {user,faces_detected} = req.body;
    UserModel
    .findOneAndUpdate(
        {
        _id: user.id  // search query
        }, 
        Object.assign(user,{                                //Updation
            entries: Number(user.entries + faces_detected)
        }),
        {
            new: true,                       // return updated doc
            runValidators: true              // validate before update
        })
    .then(usr => {
        if(usr){
            return res.json(usr.entries);
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
    handleImageEntry: handleImageEntry,
    handleClarifaiReq: handleClarifaiReq
}