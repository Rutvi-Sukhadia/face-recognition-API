const handleLogin = (req, res, UserModel, bcrypt) => {    
    UserModel
    .find({
        email: req.body.email
    })
    .then(user => {
        if(user[0])
        {
            bcrypt.compare(req.body.password, user[0].password, function(err, hash_res) {
                if(hash_res === true) {
                    return res.json({
                        id: user[0]._id,
                        email: user[0].email,
                        name: user[0].name,
                        entries: user[0].entries,
                        joiningDate: user[0].joiningDate
                    });
                }
                else
                    res.status(400).json("Login unsuccessful.. Please enter correct credentials"); 
            });
        }
        else  
            res.status(400).json("Login unsuccessful.. Please enter correct credentials"); 
    })
    .catch(err => {
        res.status(400).json("Something went wrong.. Try again!");
        console.error(err);
    })
}

module.exports = {
    handleLogin: handleLogin
}