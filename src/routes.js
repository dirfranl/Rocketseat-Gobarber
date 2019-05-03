// Importa o express
const express = require('express')
// arquivo de configuração do multer
const multerConfig = require('./config/multer')
// Variável responsavel pelo upload
const upload = require('multer')(multerConfig)
/**
 * Cria uma const que recebe a função Router(), a partir dest inicialização
 * podemos utilizar os métodos conhecidos como GET, POST....
 */
const routes = express.Router()
/**
 * authMiddleware que testa se existe sessão do usuário
 */
const authMiddleware = require('./app/middlewares/auth')
/**
 * guestMiddleware que testa se existe sessão do usuário e caso sim redireciona
 * se tentar acessar qualquer outra tela sem ser a dashboard
 */
const guestMiddleware = require('./app/middlewares/guest')
/**
 * Importamos o controller UserController para direcionarmos na rota abaixo
 */
const UserController = require('./app/controllers/UserController')
// Rota exemplo
// routes.get('/', (req, res) => res.render('auth/signup'))

// Renderiza a tela de login caso não exista um usuário logado
const SessionController = require('./app/controllers/SessionController')

// Importamos a DashboardController para quando a rota for acessada lisle os
// profissionais.
const DashboardController = require('./app/controllers/DashboardController')

// FileController que acessa a pasta uploas e carrega os arquivos
const FileController = require('./app/controllers/FileController')

const AppointmentController = require('./app/controllers/AppointmentController')

const AvailableController = require('./app/controllers/AvailableController')

const ScheduleController = require('./app/controllers/ScheduleController')

// Carregamos antes de todas as rotas e salvamos res.locals para ficar
// disponível em todas as rotas
routes.use((req, res, next) => {
  res.locals.flashSucces = req.flash('success')
  res.locals.flashError = req.flash('error')

  return next()
})

// Rota que acessa os arquivos da pasta uploads
routes.get('/files/:file', FileController.show)
// Rota de login - Se ecistir uma sessão,  a página a ser carregada é a do
// endereço /app/dashboard
routes.get('/', guestMiddleware, SessionController.create)

// Após ele clicar em entrar é verificado se entrou com os dados corretos
routes.post('/signin', SessionController.store)

// Usamos o mesmo endereço /signup, pois usa metodos diferentes.
routes.get('/signup', guestMiddleware, UserController.create)
routes.post('/signup', upload.single('avatar'), UserController.store)

// Todas as rotas com /app são testadas pelo middleware
routes.use('/app', authMiddleware)

// Rota de Logout
routes.get('/app/logout', SessionController.destroy)

// Usuário logado
routes.get('/app/dashboard', DashboardController.index)

// Rota para a pagina de agendamento
routes.get('/app/appointments/new/:provider', AppointmentController.create)

// Rota para efetuar o agendamento
routes.post('/app/appointments/new/:provider', AppointmentController.store)
// Rota que disponibiliza os horários disponível para agendamento
routes.get('/app/available/:provider', AvailableController.index)

// Lista a agenda do profissional com os dados do usuário que agendou.
routes.get('/app/schedule', ScheduleController.index)

// exporta o modulo de rotas
module.exports = routes
