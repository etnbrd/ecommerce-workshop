#!/usr/bin/env node

const http = require('https')
const url = require('url')

const api_key = "b0e51e0a09654e258693098d5a526db3"
const app_key = "ebfa1f5987b61bf4e4f74ef26da19066611426ee"
const test_id = 'pdn-sai-txz'

main(test_id)

async function main(testId) {
  console.log('Test id =>', testId)
  const resultId = await triggerTest(testId)
  console.log('Result id =>', resultId)
  const result = await pollResult(resultId)

  if (result.passed) {
    console.log('Test passed successfully ✅')
    process.exit(0)
  } else {
    console.log('Test failed ❌')
    process.exit(-1)
  }
}

async function triggerTest(testId) {

  const triggerUrl = url.parse(url.format({
    protocol: 'https',
    hostname: 'api.datadoghq.com',
    pathname: '/api/v1/synthetics/tests/trigger/ci',
  }));

  const payload = await request({
    url: triggerUrl,
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "DD-API-KEY": api_key,
      "DD-APPLICATION-KEY": app_key,
    },
    body: {
      tests: [{
          public_id: "pdn-sai-txz",
          startUrl: "https://2886795279-3000-cykoria03.environments.katacoda.com/"
      }]
    }
  })

  return payload.results[0].result_id
}

async function pollResult(resultId) {
  let payload = await getResult(resultId)

  while(payload.result.eventType !== 'finished') {
    process.stdout.write('.')
    await sleep()
    payload = await getResult(resultId)
  }

  return payload.result
}

async function getResult(resultId) {

  const pollUrl = url.parse(url.format({
    protocol: 'https',
    hostname: 'api.datadoghq.com',
    pathname: '/api/v1/synthetics/tests/poll_results',
    query: {
      result_ids: `["${resultId}"]`
    }
  }));

  const payload = await request({
    url: pollUrl,
    method: 'GET',
    headers: {
      "DD-API-KEY": api_key,
      "DD-APPLICATION-KEY": app_key,
    }
  })

  return payload.results[0]
}


async function request({
  body,
  headers,
  method,
  url,
}) {
  return new Promise((resolve, reject) => {
    const req = http.request({
      host: url.hostname,
      path: url.path,
      method,
      headers
    }, (res) => {
      let body = ''
      res.on('data', chunk => body += chunk)
      res.on('end', () => resolve(JSON.parse(body)))
    })

    req.on('error', reject)

    if(body) {
      req.write(JSON.stringify(body))
    }

    req.end()
  })
}

async function sleep (seconds = 10000) {
  return new Promise(resolve => setTimeout(resolve, seconds))
}