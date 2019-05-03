/**
 * Adicionamos o bcryptjs para fazer a criptografia da senha
 * yarn add bcryptjs
 */
const bcrypt = require('bcryptjs')
/**
 * O sequelize e o DataTypes é fornecido pelo arquivo que está na pasta
 * models/index.js
 */
module.exports = (sequelize, DataTypes) => {
  // colunas e o tipo de valor que recebe.
  // .define('TABELA' , { COLUNAS: TIPO VALOR})
  // VIRTUAL - Significa que ele não existira no banco
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      avatar: DataTypes.STRING,
      password: DataTypes.VIRTUAL,
      password_hash: DataTypes.STRING,
      provider: DataTypes.BOOLEAN
    },
    {
      hooks: {
        beforeSave: async user => {
          if (user.password) {
            user.password_hash = await bcrypt.hash(user.password, 8)
          }
        }
      }
    }
  )

  /**
   * Em vez de utilizarmos as funções como a findOne do sequelize, criamos uma
   * própria para checar a senha.
   * Veja que não utilizamos uma aero function para termos acesso a o escopo
   * this e acessar os campos do User e comparar a senha enviada a função com a
   * que está no banco.
   */
  User.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.password_hash)
  }

  return User
}
