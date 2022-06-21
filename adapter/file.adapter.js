const fs = require('fs');
const path = require('path');
const fileMonitoringInfo = require('../monitoring/fileMonitoringInfo');


class FileAdapter {

	createAndUpdateFile(fileName,fileContent ) {
		try {
			const startCreate = new Date();
			const filePath = path.join(__dirname, '..', 'data');
			if (!fs.existsSync(filePath)) {
				fs.mkdirSync(filePath, {recursive: true});
			}
			const filePathName = path.join(filePath, fileName);
			const writeFile = fs.createWriteStream(filePathName);
			writeFile.write(fileContent, async (err) => {
				if (err) {
					throw new Error('Произошла ошибка  во время сохранения файла');
				}
				await fileMonitoringInfo(startCreate, new Date());
			});
			return fileContent;
		} catch (e) {
			throw new Error(e.message);
		}
	}
	getOneByFileName(fileName) {
		try {
			const files = fs.readdirSync(path.join(__dirname, '..', 'data'));
			const file = files.filter(item => {
				return item === fileName;
			});
			if (file.length > 0) {
				const res = fs.createReadStream(path.join(__dirname, '..', 'data') + '/' + file[0] );
				return res.path;
			} else {
				return null;
			}
		}catch (e) {
			throw new Error(e.message);
		}
	}
}

module.exports = new FileAdapter();