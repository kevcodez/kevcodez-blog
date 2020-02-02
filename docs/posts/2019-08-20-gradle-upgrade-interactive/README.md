---
title: "Gradle Upgrade Interactive"
date: "2019-08-20"
---

# Gradle Upgrade Interactive

Every time I am using yarn, I really enjoy `yarn upgrade-interactive`,
that lists the outdated dependencies and let's me easily choose what to upgrade.

Inspired by yarn, I built `gradle-upgrade-interactive`,
an interactive CLI for [Gradle](https://gradle.org/) projects that allows upgrading dependencies and the Gradle wrapper.

![CLI](./cli.gif)

To get the data for the outdated dependencies, the gradle-versions-plugin is required.

build.gradle

```sh
plugins {
  id "com.github.ben-manes.versions" version "0.22.0"
}
```

Install the CLI

```sh
npm i -g gradle-upgrade-interactive
```

Now you can simply run `gradle-upgrade-interactive` in your Gradle projects.

Package can be found on [npmjs](https://www.npmjs.com/package/gradle-upgrade-interactive).

Source can be found at [Github](https://github.com/kevcodez/gradle-upgrade-interactive).

If you like this post, feel free to follow me or hit me up on [Twitter](https://twitter.com/kevcodez).