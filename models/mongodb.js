var mongoose = require('mongoose');
mongoose.connect('mongodb://utest:ptest@localhost/movie');
//mongoose.connect('mongodb://localhost/movie');
exports.mongoose = mongoose;
