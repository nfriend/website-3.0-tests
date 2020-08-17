# website-3.0-tests

<a href="https://gitlab.com/nfriend/website-3.0-tests/-/pipelines/latest"
  target="_blank"><img
  src="https://gitlab.com/nfriend/website-3.0-tests/badges/master/pipeline.svg"
  alt="GitLab build status"></a>

Automated tests for [my personal website](https://nathanfriend.io).

[View the source on GitLab.](https://gitlab.com/nfriend/website-3.0-tests)

## Getting started

1. Clone this repo
1. Run `yarn` to install dependencies
1. Run `yarn test` to run tests (or `yarn test --watch` to re-test when files
   are saved)

## About the tests

These tests run against the live version of https://nathanfriend.io. Because of
this, it's wise to make sure the tests aren't being too aggressive 🙂. However,
this shouldn't be too much of an issue since the tests [are rate
limited](./tests/setup.js).

## Notifications

When at least one test fails, a push notification is sent via
[Pushover](https://pushover.net/). In order for this to work, the following
environment variables need to be available to the pipeline:

| Variable name     | Description                            |
| ----------------- | -------------------------------------- |
| `PUSHOVER_TOKEN`  | The Pushover API token                 |
| `PUSHOVER_USER`   | The Pushover user ID                   |
| `PUSHOVER_DEVICE` | The device to send the notification to |
