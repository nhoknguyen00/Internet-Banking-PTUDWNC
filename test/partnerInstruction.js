/* eslint-disable no-console */
const NodeRSA = require('node-rsa')
const dotenv = require('dotenv')
const crypto = require('crypto')
const axios = require('axios')
const moment = require('moment')
dotenv.config()

const RSA_PRIVATE_KEY = process.env.RSA_PRIVATE_KEY.replace(/\\n/g, '\n')
const HASH_SECRET = process.env.HASH_SECRET
const PARTNER_CODE_RSA = process.env.PARTNER_CODE_RSA

const privateKey = new NodeRSA(RSA_PRIVATE_KEY)

const serverUrl = 'https://internet-banking-29-service.herokuapp.com'
const id = 1 //id of user or account

//query user's information
/*const query = {
  partnerCode: PARTNER_CODE_RSA,
  createdAt: moment.utc().toISOString()
}

const stringifyQuery = JSON.stringify(query)

const secureHash = crypto.createHmac('sha256', HASH_SECRET).update(stringifyQuery).digest('hex')

console.log({ query, stringifyQuery, secureHash })

axios.get(`
${serverUrl}/partner/user/${id}?partnerCode=${query.partnerCode}&createdAt=${query.createdAt}&secureHash=${secureHash}`).then((response) => {
  console.log(response.data)
}).catch((err) => {
  console.log(err.response.data.message)
})*/

//increase account's balance
/*const bodyWithoutSecureHash = {
  amount: 10000,
  partnerCode: PARTNER_CODE_RSA,
  createdAt: moment.utc().toISOString()
}

const stringifyBody = JSON.stringify(bodyWithoutSecureHash)

const bodyWithoutSignature = {
  ...bodyWithoutSecureHash,
  secureHash: crypto.createHmac('sha256', HASH_SECRET).update(stringifyBody).digest('hex')
}

const requestBody = {
  ...bodyWithoutSignature,
  signature: privateKey.sign(bodyWithoutSignature, 'base64')
}

console.log({ bodyWithoutSecureHash, stringifyBody, bodyWithoutSignature, requestBody })

axios({
  method: 'patch',
  url: `${serverUrl}/partner/account/${id}`,
  data: requestBody
}).then((response) => {
  console.log(response.data)
}).catch((err) => {
  console.log(err.response.data.message)
})*/
