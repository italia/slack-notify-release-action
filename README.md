# Slack notify release GitHub action

[![Get invited](https://slack.developers.italia.it/badge.svg)](https://slack.developers.italia.it/)

A simple GitHub action to post a Slack message when a new version is released.

## Get a Bot token

Go in [Slack API portal](https://api.slack.com/) and get the bot token to run this app.

<img width="954" alt="image" src="https://github.com/italia/slack-notify-release-action/assets/537363/0bca7829-24ff-47f6-b45d-6a92911ee753">

## Inputs

The following inputs briefly explained here are fully declared and documented in the [action.yaml](action.yaml):

* `slack_token` [**Required**] - Slack token

* `channel_id` [**Required**] - Channel ID where to post (shown in 'channel details', e.g. 'C03AA0A0A3A')

* `project_name` [**Required**] - Project name to display

* `release_template` - Release template (default: `New release available! {{projectName}}: {{version}}`)

* `changelog_template` - Changelog template (default: `Changelog: {{changelog}}`)

## Examples

Run this action on new tag push or new release!

```yml
on:
  push:
    tags:
      - 'v1*'
jobs:
  examplejob:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
          ref: main
      - name: Notify new release on Slack
        uses: italia/slack-notify-release-action
        with:
          slack_token: ${{ secrets.SLACK_TOKEN }}
          channel_id: C03AA0A0A3A
          project_name: Slack notification action
```

Result:

<img width="555" alt="image" src="https://user-images.githubusercontent.com/537363/218570780-bb78a8aa-d2dc-43f9-9c3a-161160b9f073.png">

## Build the action

Install dependencies

```sh
npm i
```

Build the action

```sh
npm run build
```

## Contributing

Contributing is always appreciated.
Feel free to open issues, fork or submit a Pull Request.
If you want to know more about how to add new fields, check out [CONTRIBUTING.md](CONTRIBUTING.md).

## Maintainers

This software is maintained by the
[Developers Italia](https://developers.italia.it/) team.

## License

© 2023 Dipartimento per la Trasformazione Digitale - Presidenza del Consiglio dei
Ministri

Licensed under the EUPL.
The version control system provides attribution for specific lines of code.

## Remarks

This GitHub Action is published in the Github Marketplace.
As such, you can find the [Terms of Service here](https://docs.github.com/en/free-pro-team@latest/github/site-policy/github-marketplace-terms-of-service).
Also, [here](https://docs.github.com/en/free-pro-team@latest/github/site-policy/github-marketplace-developer-agreement)
you can find the GitHub Marketplace Developer Agreement.
