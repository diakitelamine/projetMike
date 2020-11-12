const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/chefclub', {
    // mongoose.connect('mongodb+srv://zoubida:zoubida@cluster0.z40hd.mongodb.net/chefclub?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

mongoose.connection.on('connected', () => {
    console.log('MongoDb is run');
})

module.exports = mongoose;