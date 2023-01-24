import multer from 'multer';
import path from 'path';

//multer config
export default multer({
  storage: multer.diskStorage({}),
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
      cb(new Error('File type is not supported'), false);
      return;
    }
    cb(null, true);
  },
});
