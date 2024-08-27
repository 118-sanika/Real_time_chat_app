const mongoose = require('mongoose');

const url = 'mongodb+srv://sanu:admin123@cluster0.nkgmhe0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((e) => console.log('Error connecting to MongoDB', e));

module.exports = mongoose;
