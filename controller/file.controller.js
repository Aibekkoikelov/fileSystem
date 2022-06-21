const FileService = require('../service/file.service');


class FileController {

	async createFiles(req, res) {
		try{
			const answer = await FileService.createFiles(req.body.file);
			res.status(200).send(answer);
		}catch (err) {
			res.status(400).json(err.message);
		}
	}

	async updateFile(req, res) {
		const {fileName} = req.params;
		try{
			const answer = await  FileService.updateFile(fileName, req.body.file);
			if (answer) {
				res.status(200).json('Файл обновлен');
			}
		}catch (err) {
			res.status(400).json('Не получилось обновить файл');
		}
	}

	async getOneByFileName(req, res) {
		const {fileName} = req.params;
		try{
			const answer = await FileService.getOneByFileName(fileName);
			res.status(200).sendFile(answer);
		}catch (err) {
			res.status(400).json('Нет такого файла');
		}
	}

}

module.exports = new FileController();