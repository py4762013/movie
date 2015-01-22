var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/movie');
exports.mongoose = mongoose;
