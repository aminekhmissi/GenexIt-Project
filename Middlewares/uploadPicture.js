const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './Storages')
    },
    filename: (req, file, cb) => {
       // cb(null, file.originalname)
       cb(null, new Date().toISOString().replace(/:/g,'-')+file.originalname) 
       //replace : par - car node js ne lire pas : dans l'enregistrement
    }
})
const fileFilter =(req,file,cb)=>{
    if(
        file.mimetype =='image/jpeg' ||
        file.mimetype =='image/png' ||
        file.mimetype =='image/jpg' 
    ) 
    {
        cb(null,true)
    } 
    else 
    {
        cb(new Error("File uploaded is not ot type jpg/jpeg/png"),false)
    }
}
module.exports = multer({ storage: storage,fileFilter:fileFilter,limits :{ _fileSize:1024 * 1024 * 1024 *10} })