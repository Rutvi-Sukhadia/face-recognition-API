const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const connectDB = require('./config/database');
const UserModel = require('./models/user');

const login = require('./controllers/login');
const registeration = require('./controllers/registeration');
const input_image = require('./controllers/input_image');
const user_profile = require('./controllers/user_profile');

const app = express();
app.use(bodyParser.json());
app.use(cors());
connectDB();

//setting routes
app.get('/', (req,res) => {
    UserModel.getUsers()
    .then(users => {
        res.json(users);
        console.log("Users List:",users);
     })
    .catch(err => {
        res.status(400).json(`Error ${err}`);
    })
})

app.post('/login', (req,res) => { login.handleLogin(req, res, UserModel, bcrypt)});

app.post('/register',(req,res) => { registeration.handleRegistration(req, res, UserModel, bcrypt)});

app.get('/profile/:id', (req,res) => { user_profile.handleGetProfileReq(req,res,UserModel)});

app.put('/profile/:id', (req,res) => { user_profile.handlePutProfileReq(req,res,UserModel)});

app.post('/imageURL', (req,res) => { input_image.handleClarifaiReq(req, res)});

app.put('/imageEntry', (req,res) => { input_image.handleImageEntry(req, res, UserModel)});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})