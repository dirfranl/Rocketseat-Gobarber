// Carrega o servidor express
const express = require('express')
// Utilizado para gravar a sessão do usuário
// yarn add express-session
const session = require('express-session')
// connect-loki para salva a sessão no disco
// yarn add connect-loki
const LokiStore = require('connect-loki')(session)
// carrega as views templates HTML
const nunjucks = require('nunjucks')
// Biblioteca node para lidar com os caminhos do servidor
const path = require('path')
// Uso do connect-flash para mostrar mensagens ao usuário
// yarn add connect-flash
const flash = require('connect-flash')
const dateFilter = require('nunjucks-date-filter')
/**
 * Classe responsável por iniciar o servidor e suas configurações
 */
class App {
  // carrega as configurações do servidor
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'

    this.middlewares()
    this.views()
    this.routes()
  }
  // Inicia os interceptadores
  middlewares () {
    this.express.use(express.urlencoded({ extended: false }))
    this.express.use(flash())
    this.express.use(
      session({
        name: 'root', // name da sessão que sera usado para remover cookie
        secret: 'MyAppSecret',
        resave: true,
        store: new LokiStore({
          path: path.resolve(__dirname, '..', 'tmp', 'session', 'session.db')
        }),
        saveUninitialized: true
      })
    )
  }

  /**
   * Configura onde ficarão os templates HTML da aplicação e caso esteja em
   * modo desenvolvedor fica monitorando alterações feitas no código.
   */
  views () {
    /**
     * path.resolve() - Responsável por utilizar a barra correta nos caminhos do
     * S.O. do servidor.
     * __dirname - Pega o caminho atual deste aquivo. Ex: AppGobarber/src/
     * O 'app' e o 'views' - refere-se ao local onde ficarão armazenados as
     * views. Ex: AppGobarber/src/app/views
     */
    const env = nunjucks.configure(path.resolve(__dirname, 'app', 'views'), {
      watch: this.isDev,
      express: this.express,
      autoescape: true
    })
    env.addFilter('date', dateFilter)
    this.express.use(express.static(path.resolve(__dirname, 'public')))
    this.express.set('view engine', 'njk')
  }

  /**
   * Cinfiguração das rotas da aplicação
   */
  routes () {
    this.express.use(require('./routes'))
  }
}

/**
 * Exportamos uma instância da classe App, por isso do uso do new. Como funções
 * da classe não serão importadas por não haver necessidade, configuramos para
 * compartilhar apenas o express.
 */
module.exports = new App().express
