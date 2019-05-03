// Importamos o model de usuãri
const { User } = require('../models')

/**
 * Classe que acessa o banco e carrega todos profissionais cadastrados
 */
class DashboardController {
  async index (req, res) {
    const providers = await User.findAll({ where: { provider: true } })
    // renderizamos a dashboard e passamos a lista de profissionais
    return res.render('dashboard', { providers })
  }
}

module.exports = new DashboardController()
