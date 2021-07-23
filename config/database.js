const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://root:root@face-recognition-db.qv2i7.mongodb.net/faceRecognitionDatabase?retryWrites=true&w=majority'
const connectDB = async () => {
  try {
    await mongoose.connect(
      mongoURI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      }
    );

    console.log('MongoDB is Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;