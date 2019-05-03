module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    // Salvando a sessão em res.locals.user os dados ficam disponiveis em toda
    // aplicação
    res.locals.user = req.session.user
    return next()
  }

  return res.redirect('/')
}
