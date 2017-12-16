var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var DataSchema = new Schema({
    title:String,
    imagespath:Array,
});

const Data =  mongoose.model('Data', DataSchema);

module.exports = Data;