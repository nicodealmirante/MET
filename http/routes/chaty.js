const express = require("express");
const router = express.Router();


/**
 * 
 *
 * Router
 * @param {*} req
 * @param {*} res
 * 
 * 
 */

const chatboothook =async(req,res) =>{
  const providerWs=req.providerWs;
  console_log(providerWs)
  const body=req.body
  if(body?.private){
res.send(null)

  }
  const phone = body?.conversation?.meta?.sender?.phone_number.replace('+','')
  await providerWs.sendText(`${phone}@c.us`,body.content)
  console.log(phone)
  res.send(body)
  
} 


router.post('/chatboot-hook',chatboothook)

/**
 * 

 * Controller 
 * 
 
 * 
 */


module.exports = router;
