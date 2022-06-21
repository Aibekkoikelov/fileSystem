const FileAdapter = require('../adapter/file.adapter');
const {writeMetadata, updateMetadata} = require('../metadata/metadata.service');

class FileService {
	async createFiles({fileName, uploadFile, fileSize, fileType}) {
		try{
			const answer = await FileAdapter.createAndUpdateFile(fileName,uploadFile);
			if (answer) {
				await writeMetadata({fileName, fileSize, fileType});
			}
			return answer;
		} catch (e) {
			throw new Error(e.message);
		}
	}
	async updateFile(fileName, {uploadFile,fileSize, fileType}) {
		try{
			const answer = await FileAdapter.createAndUpdateFile(fileName,uploadFile);
			if (answer) {
				await updateMetadata(fileName, fileSize, fileType);
			}
			return answer;
		} catch (e) {
			throw new Error(e.message);
		}
	}
	async  getOneByFileName(filename) {
		try{

			return await FileAdapter.getOneByFileName(filename);
		} catch (e) {
			throw new Error(e.message);
		}
	}
}

module.exports = new FileService();