// Importamos o User model para checar o login
const { User } = require('../models')

class SessionController {
  /**
   * função criada para renderizar a tela de login
   */
  async create (req, res) {
    return res.render('auth/signin')
  }

  async store (req, res) {
    // recebe os campos email e senha enviado pelo formulário no obj req.body
    const { email, password } = req.body
    // Com a função findOne do sequelize ele procura pelo email do user que é
    // único
    const user = await User.findOne({ where: { email } })
    // testa se o usuario com o email informado existe
    if (!user) {
      req.flash('error', 'Usuário não encontrado')
      return res.redirect('/')
    }
    // Testa se o password informado está correto
    if (!(await user.checkPassword(password))) {
      req.flash('error', 'Senha incorreta')
      return res.redirect('/')
    }
    // Armazenamos a sessão do usuário
    req.session.user = user
    return res.redirect('/app/dashboard')
  }

  destroy (req, res) {
    req.session.destroy(() => {
      res.clearCookie('root')
      return res.redirect('/')
    })
  }
}

module.exports = new SessionController()
