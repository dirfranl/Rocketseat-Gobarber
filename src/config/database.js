/**
 * Renomeamos o arquivo config.json para database.js e removemos a config
 * original e vamos passar um objeto unico.
 */
module.exports = {
  dialect: 'postgres',
  host: '127.0.0.1',
  username: 'docker',
  password: 'docker',
  database: 'gonodemodule2',
  operatorAliases: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
}
