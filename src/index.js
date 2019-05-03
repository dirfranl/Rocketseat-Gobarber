// Importamos o server
const server = require('./server')
// Se o servidor não fornecer uma porta ao server, ele assume a porta 3000
server.listen(process.env.PORT || 3000)
