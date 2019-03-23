//
//
// HEY! Be sure to re-incorporate changes from @albinekb
// https://github.com/adieuadieu/serverless-chrome/commit/fca8328134f1098adf92e115f69002e69df24238
//
//
//
import log from '../utils/log'
import html from '../chrome/html'

export default async function handler (event, context, callback) {
  const queryStringParameters = event.queryStringParameters || {}
  const {
    url = 'https://github.com/adieuadieu/serverless-chrome',
  } = queryStringParameters
  let data

  const startTime = Date.now()

  try {
    data = await html(url)
    console.log('data', data)
  } catch (error) {
    console.error('Error getting html for', url, error)
    return callback(error)
  }

  log(`Chromium took ${Date.now() - startTime}ms to load URL.`)

  // TODO: handle cases where the response is > 10MB
  // with saving to S3 or something since API Gateway has a body limit of 10MB
  return callback(null, {
    statusCode: 200,
    body: data,
    headers: {
      'Content-Type': 'texst/plain',
    },
  })
}
