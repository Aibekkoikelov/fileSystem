const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileMetadata = new Schema({
	name: String,
	mimetype: String,
	size: Number
});

module.exports = mongoose.model('FileModel' , FileMetadata);