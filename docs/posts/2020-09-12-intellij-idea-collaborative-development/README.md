---
title: "Collaborative development in IntelliJ IDEA"
date: "2020-09-12"
---

# Collaborative development in IntelliJ IDEA

On the 5th of february 2005, Maxim Sharifov created the ticket ["Collaborative development"](https://youtrack.jetbrains.com/issue/IDEABKL-708) on the JetBrains issue tracker. This issue has become the top voted issue in the entire issue tracker with **over 2180 votes**.

With pair programming and remote programming becoming more and more common (especially during a global pandemic), the need for a proper tool has risen immensly.

[Hadi Hariri](https://twitter.com/hhariri), developer advocate at JetBrains, has already dropped some hints in march 2020 that they have been working on such feature.

![Announcement of Hadi Hariri for active development of collaborative development feature](./hariri.png)

[VSCode](https://code.visualstudio.com/) has introduced [Live Share](https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare) end of 2017 and has received much love.

So I was eagerly waiting for JetBrains to do their magic.
That time has now come.

# Introducing Code With Me

> Code With Me is a plugin for IntelliJ IDEA and other JetBrains IDEs that enables you to collaboratively review, edit, and debug code with your colleagues in real time.

It is completely free to use (besides having an IntelliJ license obviously).
Even better, the guests that are invited do not need a license, only the host does!

One person needs to start a session as a host and gets an invitation link, up to 5 guests can then join the session using that link.
The guests use a lightweight client application (reduced version of IDEA).

## Experience

We did not hesistate to try out the newly released plugin at work for pair programming.
We both downloaded and installed the plugin and one of us started a session (host) and the other one connected (guest).

You may either choose to follow one person or work independently.
This allows to edit different files in parallel or work on the same code collaboratively so only one person edits/debugs/runs and the other one follows.
There is no screen sharing needed, because pretty much everything done in the host IDE is seen in the guest IDE.

It felt very intuitive to work with it. For example, if I as a host hit Run on a JUnit test, that test started for both of our IDEs (in case my colleague was following me).

Generally speaking, this plugin is looking extremely promising and we will continue to use that plugin at work.
We have tried a bunch of other pair programming or screen sharing tools so far and none of them really did the trick for us because some things were always missing (i.e. test execution) or felt counterintuitive.
The plugin is neatly integrated in IntelliJ itself.

## **How do I get it?**

Fill out the [survey from JetBrains](https://surveys.jetbrains.com/s3/code-with-me) and you will be redirected to a Google Drive containing the plugin as zip. You have to install the plugin from disk by going to your plugins in IDEA and select "Install plugin from disk".

Also check out the official [FAQ](https://www.jetbrains.com/help/idea/faq-about-code-with-me.html).

Found any issues, report it on the [official bug tracker](https://youtrack.jetbrains.com/).