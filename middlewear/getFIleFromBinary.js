

async function getFileFromBinary(req,res,next) {
	let buff = new Buffer('');
	req.on('data', (chunk) => {
		buff = Buffer.concat([buff, chunk]);
	}).on('end', async () => {
		const newFile = {
			uploadFile : buff,
			fileName : req.headers['filename'],
			fileSize : req.headers['content-length'],
			fileType : req.headers['content-type']
		};
		req.body['file'] = newFile;
		next();
	});
}
module.exports = getFileFromBinary;