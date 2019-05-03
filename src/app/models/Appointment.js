module.exports = (sequelize, DataTypes) => {
  // Definimos os horários de atendiemnto
  const Appointment = sequelize.define('Appointment', {
    date: DataTypes.DATE
  })

  // Definimos os relacionamentos entre a tabela de agendamento e a de usuários
  Appointment.associate = models => {
    Appointment.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' })
    Appointment.belongsTo(models.User, {
      as: 'provider',
      foreignKey: 'provider_id'
    })
  }
  // Não esquecer de devolver objeto Appointment, senão vai dar erro na linha 25
  // db[model.name] = model do arquivo index.js da pasta models
  return Appointment
}
