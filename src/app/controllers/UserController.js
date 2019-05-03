/**
 * Importamos a pasta e não o arquivo user, pois assim podemos numa unica linha
 * importar modulos existentes na pasta. Ex: {User, Produto}
 */
const { User } = require('../models')

class UserController {
  // Renderiza o template signup
  create (req, res) {
    return res.render('auth/signup')
  }
  // Função que passa todo o body da requisição para cadastro no banco.
  async store (req, res) {
    // Recebe o nome do arquivo a ser guardado no banco, que vem na req
    const { filename: avatar } = req.file
    /**
     * Transformamos o req.body em objeto e carregamos com ...operator e
     * acrescentamos o filename do arquivo
     */
    await User.create({ ...req.body, avatar })
    // Depois do cadastro usuário redireciona para tela principal de login.
    return res.redirect('/')
  }
}

module.exports = new UserController()
