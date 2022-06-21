
const FileModel = require('./fileMeradata.schema');

async function writeMetadata (data){
    const {fileName, fileSize, fileType} = data;
    try{
        const candidate = await FileModel.findOne({name: fileName})
        if (candidate) {
            await updateMetadata(fileName, fileSize, fileType);
        } else {
            const newFileMetadata = await new FileModel({name:fileName,mimetype:fileType,size:fileSize})
            await newFileMetadata.save();
        }

    }catch (err){
        throw new Error(err);
    }
}

async function updateMetadata (filename, fileSize, fileType){
    const query = { name: filename };
    try{
        await  FileModel.findOneAndUpdate(query, { name: filename, mimetype: fileType, size: fileSize}, (err) =>{
            if (err) {
                throw new Error("Не получилось обновить метаданные файла")
            }
        }).clone();
    }catch (err){
        throw new Error(err);
    }


}

module.exports = {updateMetadata,writeMetadata}