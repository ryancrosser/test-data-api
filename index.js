const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

server.use(middlewares)
server.use(router)
server.listen(port, () => {
    console.log(`JSON Server is running on http://localhost:${port}`);
})