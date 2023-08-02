const BOTTOKEN = process.env.BOTTOKEN
if (!BOTTOKEN) {
  throw new Error('BOTTOKEN required')
}
const MONGOCONNSTRING = process.env.MONGOCONNSTRING
if (!MONGOCONNSTRING) {
  throw new Error('MONGOCONNSTRING required')
}

export const botToken = BOTTOKEN
export const mongoConnString = MONGOCONNSTRING
