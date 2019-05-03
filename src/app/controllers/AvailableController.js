const moment = require('moment')
// Por segurança o sequelize disponibiliza um método para buscas no banco
const { Op } = require('sequelize')
const { Appointment } = require('../models')

class AvailableController {
  async index (req, res) {
    const date = moment(parseInt(req.query.date)) // garante data em Integer

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.params.provider,
        date: {
          [Op.between]: [
            date.startOf('day').format(), // Formata de forma que o Banco possa usar
            date.endOf('day').format()
          ]
        }
      }
    })
    // Definimos o array abaixo pois neste caso os horários são no intervalo
    // fixo de 1 hora.
    const schedule = [
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00'
    ]

    /**
     * Percorremos o array de horários e pegamos a hora: 08 e o minuto: 00 usando
     * a função split.
     * No value estamos atribuindo o valor exemplo '2019-05-01 08:00:00'
     */
    const available = schedule.map(time => {
      const [hour, minute] = time.split(':')
      const value = date
        .hour(hour)
        .minute(minute)
        .second(0)

      return {
        time,
        value: value.format(),
        available:
          value.isAfter(moment()) &&
          !appointments.find(a => moment(a.date).format('HH:mm') === time)
      }
    })
    return res.render('available/index', { available })
  }
}

module.exports = new AvailableController()
