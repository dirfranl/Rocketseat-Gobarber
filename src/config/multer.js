const path = require('path')
const crypto = require('crypto') // Não precisa ser instalado, já vem com node
const multer = require('multer')
/**
 * Multer config utilizado para upload de arquivos
 * yarn add multer
 */
module.exports = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    // gera o nome do arquivo para uplod e ser salvo na tmp/uploads
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, raw) => {
        if (err) return cb(err)
        /**
         * Caso tenha sucesso ele gera o nome do arquivo + a extensão original
         * Ex: foto.jpg -> numero Hexadecimal.jpg
         */
        cb(null, raw.toString('hex') + path.extname(file.originalname))
      })
    }
  })
}
