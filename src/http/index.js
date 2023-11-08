const express = require('express')
const routes = require('./routes/chaty')

class ServerHTTP {
app;
port=process.env.PORT ?? 3003
providerWs;
constructor(_providerWs){
this.providerWs=_providerWs

buildApp=(app) => {
return this.app=express()
.use(express.json())
.use((req, _, next)=>{
req.providerWs=this.providerWs
next()

})
.use(routes)
.listen(this.port, () => console.log(`LISTO POR HTTP://LOCALHOST:${this.port}`))
}

start()
this.buildApp() 
  }

}
  module.exports=ServerHTTP
