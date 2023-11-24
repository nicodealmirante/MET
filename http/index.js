const express = require("express");
const app = express();
const ChatwootClass = require('./chatwoot/chatwoot.class')

const PORT = process.env.PORT ?? 4000;

/**
 * Clase de API REST
 */
class ServerAPI {
  providerWS;
  providerDB;
  constructor(_providerWS, _providerDB) {
    this.providerWS = _providerWS;
    this.providerDB = _providerDB;
  }

  start() {
    const middleware = (req, _, next) => {
      req.ws = this.providerWS
      req.db = this.providerDB
      next()
    }
    app.use(express.json())
    app.use("/api", middleware, require("./routes"));
    app.listen(3007, () => console.log(`http://localhost:${3007}`));
  }
}

module.exports = ServerAPI;
