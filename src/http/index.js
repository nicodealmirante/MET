const express = require('express')
const routes = require('./routes/chaty')

class ServerHTTP {
app;
port=3003
providerWs;
constructor(_providerWs){
this.providerWs=_providerWs

buildApp=() => {
return this.app=express()
this.app.use(express.json())
this.app.use((req, _, next)=>{
req.providerWs=this.providerWs
this.appnext()

})
this.app.use(routes)
this.app.listen(this.port, () => console.log(`LISTO POR HTTP://LOCALHOST:${this.port}`))
}

start()
this.buildApp(this.app) 
  }

}
  module.exports=ServerHTTP
