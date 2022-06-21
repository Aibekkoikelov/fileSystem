const express = require('express');


const FileRouter = require('./router/fileRouter');
const getFileFromBinary = require('./middlewear/getFileFromBinary');
const {mongoose} = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname));
app.use('/file', FileRouter);
app.use(getFileFromBinary);

const url = 'mongodb+srv://aibek:1234@cluster0.dxndcbh.mongodb.net/file_writer?retryWrites=true&w=majority';
async function start ( ){
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true
        }, (err) => {
            if (err) {
                console.log('Not Connected', err.message);
            }
            else {
                console.log('Connected to MongoDB');
                app.listen(PORT, () => {
                    console.log(`Server is running on port ${PORT}`);
                })
            }
        })
    }
    catch (err) {
        console.log(err);
    }
}
start()


