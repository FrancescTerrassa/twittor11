const fs=require('fs')

const urlsafeBase64 = require('urlsafe-base64')
const vapid = require('./vapid.json')

const webpush = require('web-push');

webpush.setVapidDetails(
  'mailto:fte312@gmail.com',
  vapid.publicKey,
  vapid.privateKey
);


const suscripciones=require('./subs-db.json')

// codoficam 
module.exports.getKey = () => {
    return urlsafeBase64.decode(vapid.publicKey)
}


module.exports.addSubscription = ( suscripcion ) => {
    suscripciones.push( suscripcion );   
    fs.writeFileSync(`${ __dirname }/subs-db.json`, JSON.stringify(suscripciones) )
}


module.exports.sendPush = (post) => {
    suscripciones.forEach((suscripcion, i)=> {
        webpush.sendNotification(suscripcion,JSON.stringify(post))
    })
}