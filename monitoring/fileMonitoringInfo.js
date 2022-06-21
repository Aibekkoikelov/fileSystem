const path = require('path');
const logFile = require('./logFile');
const { readdir, stat } = require('fs/promises');

async function fileMonitoringInfo(startCreate, finishCreate) {
	const dirSize = async (directory) => {
		const files = await readdir(directory);
		const stats = files.map((file) => stat(path.join(directory, file)));
		return (await Promise.all(stats)).reduce(
			(accumulator, { size }) => accumulator + size,
			0
		);
	};

	const allSize = await dirSize(path.join(__dirname, '..', 'data'));
	logFile(startCreate, finishCreate, allSize);
}

module.exports = fileMonitoringInfo;
