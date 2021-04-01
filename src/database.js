const mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost/finterest', {
mongoose.connect('mongodb+srv://christiandev:L4lQwRVMuwwbs3mB@cluster0.vev98.mongodb.net/finterest-db?retryWrites=true&w=majority', {
    useNewUrlParser: true
})
    .then(db => console.log('Db is connected'))
    .catch(err => console.log(err));