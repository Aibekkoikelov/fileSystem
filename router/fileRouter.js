const {Router} = require('express');
const FileController = require('../controller/file.controller');
const router = Router();
const getFileFromBinary = require('../middlewear/getFileFromBinary');

router.post('/upload',getFileFromBinary,  FileController.createFiles );
router.put('/upload/:fileName', getFileFromBinary, FileController.updateFile );
router.get('/:fileName', FileController.getOneByFileName);

module.exports = router;


