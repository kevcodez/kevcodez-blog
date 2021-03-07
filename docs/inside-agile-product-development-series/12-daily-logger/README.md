---
date: "2021-01-17"
type: "guide"
editLink: false
search: false
prev: '/inside-agile-product-development-series/11-continuous-integration-deployment/'
next: '/inside-agile-product-development-series/13-deadlines/'
---

# The Daily Logger

As we worked with [Scrumban](/inside-agile-product-development-series/05-agile-development-scrumban/), when we finished a task, we first checked if anyone needs support, if not, the next top priority ticket was grabbed.

But what if there are some unexpected bugs, errors, bug reports or questions from colleagues?
The **Daily Logger** to the rescue.

The Daily Logger had the following tasks:

* Check application error/warn logs for possible issues
* Check automated alerts in Slack, if there were any
* Check issues from colleagues in Slack

The Daily Logger had a strict rotation.
As we were six developers in total, we just rotated through.
Everyone was part of the rotation, no exception.
In case of illness or holiday, we just switched up the rotation a little.

This helped the other five developers to concentrate on their tasks and not get distracted much.
The Daily Logger is not supposed to fix any of the bugs they encounter, but rather do a quick analysis, if it's an actual issue and then create a story.
As bugs always had the highest priority, the next time a developer is free, that bug will be solved immediately.
Obviously, if it was a critical bug that couldn't wait a few hours, we had to solve it instantly.

Ideally, the Daily Logger checked the error/warn logs from our applications before our Daily.
This way we know if there have been any errors during the evening, night or early morning.

On a Monday, the Daily Logger also checked the weekends logs.
We pushed all the application logs in Elasticsearch making it easy to search and filter for errors/warnings.
If the issue could be solved within a few seconds, the Daily Logger usually solved it right away, notified the team in the Daily and left a small note in Slack.
When an error or warning that needed further investigation is caught by the Daily Logger, a story is created and then linked in Slack so everyone knows this error/warning and doesn't have to be checked again.

When a developer caused an application error/warning while testing, purposefully or not, the developer quickly pinged the Daily Logger to let him/her know, that it can be ignored.
Otherwise, the Daily Logger would create a task.

As with questions or issues raised by other colleagues, the Daily Logger was able to evaluate if it was an actual issue or just a misunderstanding, preventing unnecessary bug stories from being created and causing confusion.