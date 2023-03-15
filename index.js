const core = require('@actions/core')
const github = require('@actions/github')
const https = require('https')
const simpleGit = require('simple-git');

const main = async () => {
  const currentRepoGit = simpleGit();
  const tags = (await currentRepoGit.tags({'--sort' : 'taggerdate'})).all

  const version = tags.pop()
  const repoName = github.context.payload.repository.full_name
  const changelogUrl = `https://github.com/${repoName}/releases/tag/${version}`
  
  const slackToken = core.getInput('slack_token')
  const channelId = core.getInput('channel_id')
  const projectName = core.getInput('project_name')
  
  const payload = JSON.stringify({
    channel: channelId,
    token: slackToken,
    attachments: [
      {
        pretext : `Rilasciata la nuova versione di ${projectName}: ${version}!`,
        text : `Changelog disponibile qua: ${changelogUrl}`,
      },
    ],
  })
  
  const requestOptions = {
    method: 'POST',
    port: 443,
    hostname: 'slack.com',
    path: '/api/chat.postMessage',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': payload.length,
      Authorization: `Bearer ${slackToken}`,
      Accept: 'application/json',
    },
  }

  const messageRequest = https.request(requestOptions, res => {
    let responseData = ''
    res.on('data', (d) => {
      responseData += d
    })
    res.on('end', () => {
      if (res.statusCode === 200) {
        const jsonResponse = JSON.parse(responseData)
        if (jsonResponse.ok === true) {
          core.setOutput('status', '✅ Message sent!')
          return
        }
      }
      core.setFailed(`❌ Failed request: ${responseData}`)
    })
  })

  messageRequest.on('error', () => {
    core.setFailed('Failed to fetch Slack')
  })

  messageRequest.write(payload)
  messageRequest.end()
}

main()
