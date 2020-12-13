---
date: "2020-12-13"
type: "guide"
editLink: false
search: false
prev: '/inside-agile-product-development-series/05-agile-development-scrumban/'
next: false
---

# Recurring Meetings

In an agile product development team, you want to be productive, efficient, avoid knowledge silos and continuously improve.
Meetings are a big part of your work and can usually be optimized greatly.
For every meeting that didn't necessarily require the full development team, we determined a single volunteer that represented the dev team.
That way, not six developers, but only one was interrupted.
We trusted each developer to best represent the team's interest.
That person switched up every time, there was not a single representative that always went to the meetings.
During the three years of development, we switched up our meetings and meeting culture quite a bit.
If you have no interest in the topic and cannot contribute in a useful way, don't go.
Usually, you're not forced to go to meetings.
I highly respect someone leaving a meeting early because they realized they cannot contribute.

I want to go into a little more depth about our recurring meetings that we established over the course of three years.
We find them useful and every developer participates in them.
Most of them come as no surprise if you work in an agile team.

## The Daily

That's a classic one.
Each day at 10am, every developer, the product owners and other volunteers from the business team meet up.
The volunteers from the business team are not supposed to really say anything, but "allowed to listen", when they were interested in our daily progress.
We'd usually stand in a circle in front of our haptic kanban board.
The following questions should be answered in a direct manner without going into too much detail:

* What have you done yesterday?
* What did you learn that you want to share and think would be helpful for the people listening?
* What are you going to do today?
* What is blocking you?
* Are you able to offer help because you just finished a task?
* Are you stuck with a problem and need help?

If you have **nothing** to say, just skip (shouldn't happen often).
Do not go into full implementation detail for 15 minutes, but keep it short and only tell the most relevant bits.
If you realize that a colleague goes too much into detail, ask them if that's part of the daily or if it should be postponed.
Usually, the colleague will reply with "We can talk about that after the daily" - and anyone that is not interested or cannot contribute won't need to invest time for that.

It takes great discipline to actually keep this meeting short AND useful.
Many people tend to go into too much detail or too few details.
In previous teams I've seen people having issues with their setup (IDE, notebook, ...) for **two full days** without mentioning it or consulting help.
Don't scream for help the second you run into an issue, try to solve yourself first.
However, when you are stuck, consult help.
After all, you are a **team** - it's a shared responsibility.
If you are stuck for days without telling anyone, it's not just your personal issue.

In case someone cannot participate in the daily, they must notify the rest and provide a written version of the questions above.
The daily needs to be taken seriously.
Each and every team I've worked in had a daily.
The concept was always the same - but the quality was night and day.
It is significant to openly talk about the daily and improve - this is one of your most important recurring meetings.

If done properly, it greatly increases productivity as you know what the rest of your colleagues do.
It prevents duplicate work and can save you tons of work - the issue you just ran into and have no clue how to fix it?
Your colleague had the same issue yesterday and mentioned it in the daily, you remember he/she mentioned something.
So you go and ask your colleague about it and solve it within a minute - possibly a few hours saved.

## Story Time

What we called the Story Time could also be called refinement and planning.
As mentioned in the previous post, at least one developer participated in writing the stories.
This _mostly_ prevented stories being completely denied in the story time after long preparation.

The story time starts with the product owner sharing the screen and going through the stories that need to be talked about.
We go through each and every criterion for completion of the ticket, see if there are misunderstandings or questions, resolve them and make sure they are understandable and ready for development.
Every developer participated in that meeting because every developer would do any ticket.
We did not split up the team or had tickets that only one developer would do.
Our kanban board had a priority and every time a developer was free to do the next task, the highest prioritized task would be picked.
There was not a single task that was directly assigned to a developer.
If a developer had a way greater understanding of the task than everyone else, that developer would offer help, but not necessarily implement.

After going through all open stories, we talk about priority.
The product owners suggest a priority and verify if that is alright with the developers.
Besides minor adjustments, we always prioritized quickly.

We did **not** estimate stories.
No t-shirt sizes, no points, no hours, no estimations at all.
As we had clear priorities and no due dates, we would be done when we're done.
It wouldn't matter.
The main advantage of estimating a story for me is talking about complexity.
Talking about complexity usually reveals misunderstandings that can then be resolved.
We did briefly talk about complexity and when a developer knew that a particular criterion for story completion would **greatly** increase the time it takes to implement, we would talk about that specific criterion and see if it really needs to be done that way or if it could be done in an easier manner.
That great advantage of talking about complexity can also be achieved without estimating the effort it takes to implement.


## Weekly Developer Meetup

Once every week, the developers would meet up to present interesting technical topics.
Learnings from big refactorings, new exciting things that occurred on the horizon.
Pretty much anything that would be interesting for the other developers.

We required everyone that presented something to properly prepare - ideally a small presentation.
Personally, I just prepared an asciidoc document and exported it as HTML and went through that document when presenting.
A beautiful document that could be shared with the team after presentation to reread.

In case no one had anything interesting to share, we skipped the meetup for that week.
It sounds so simple yet so many people would just attend that meeting and talk non-sense for an hour, because you have a one-hour meeting in your calendar, so you have to attend.
That's not true and it's crucial in an agile team.
If you realize a meeting is not helpful at all, you need to openly talk about that and adjust or not attend at all.
I see too many people going into meetings they cannot contribute to and barely listen (just working on their laptop).

## Retrospective

The retrospective, for me personally, is the most important recurring meeting in an agile development team.
If done right, it increases trust, productivity and bonds the team.

Every three weeks we would meet up to talk about what went right and what went wrong during the past three weeks.
Before diving deep into the retrospective, we would talk about the action items from the last retrospective and see if the problems from the previous weeks still persist or if they were resolved.
The format slightly varies, for demonstration purposes, I'll go over one of the formats:
Mad, Sad, Glad.

You are granted a few minutes (5-10) to collect topics that made you mad, sad or glad during the past three weeks.
When the time is up, every one presents their topics, sorts them into one of the three columns and briefly explains.
It's essential to explain why that specific topic made you mad, sad or glad.
This phase is only for collecting topics and **not** for solving them - keep your ideas to tackle the problem to yourself - for now.
Other people are allowed to ask to clarify if they don't fully understand one of the topics brought up.
If you have a topic that is out of your team's scope, i.e. a personal issue between you and your fiancée, it should not be brought up as it is not solvable by your team.
Only bring up topics that are actually worth discussing and in your team's scope.

After collecting the topics, everyone gets a few votes to prioritize what to talk about.
The amount of votes would depend on the amount of topics - usually everyone gets about three votes.
You are allowed to put all votes on a single topic or only use one of your three votes - it is up to you.

When voting is done, you have a priority.
The most voted topic will be discussed first.
Timeboxing the discussion is necessary, otherwise it could end up just talking about an issue for 60 minutes without making any progress.
You're basically trying to find a solution to tackle the problem.
Ideally, that solution is an action item that can be solved, tracked and verified. 
Sometimes it might be enough to "talk about it" and check in the next retrospective if it became better.
If not, the topic shall be brought up and discussed again.
Each action item gets a due date and will be assigned to at least one person that is responsible for it.

When the retrospective is done we vote the ROI (return of investment) on a scale of -2 to 2 (-2, -1, 0, 1, 2).
-2 meaning that you feel like you wasted a lot of time, 0 being neutral and 2 meaning the time invested paid off greatly.
After voting the return of investment, we quickly talk about why we voted what we voted for and how we could improve the next retrospective.

Retrospectives play a great role in improving your team over time.
There will always be some issues that prevent your team from being 100% productive.
It is vital to be honest, without being disrespectful and try to solve every problem.
Solving a problem now does not mean they will be solved forever - they might reoccur.
Just as the daily, a retrospective shows how great an agile team is.
Possibly criticizing each other and still solving the issues together, as a team.