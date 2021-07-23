const handleRegistration = (req,res,UserModel,bcrypt) => {
    const newUser = req.body;
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            let user = new UserModel({
                name: newUser.name,
                email: newUser.email,
                password: hash,
                entries: 0,
                joiningDate: new Date()
              });
              
              user.save()
                 .then(user => {
                    res.json({
                        id: user._id,
                        email: user.email,
                        name: user.name,
                        entries: user.entries,
                        joiningDate: user.joiningDate
                    });
                 })
                 .catch(err => {
                   res.status(400).json("Registration unsuccessful");
                   console.error("Error:",err);
                 })
        });
    })
    
    /*let encrypted_password='';
    database.users.push({
        id: 101 + database.users.length + '',
        name: newUser.name,
        email: newUser.email,
        password: '',
        entries: 0,
        joiningDate: new Date()
    });
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            database.users[database.users.length-1].password = hash;
            console.log(hash);
        });
    });*/
    
}

module.exports = {
    handleRegistration: handleRegistration
}