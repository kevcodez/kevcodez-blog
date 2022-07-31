<template><div><h1 id="pair-programming-reviews" tabindex="-1"><a class="header-anchor" href="#pair-programming-reviews" aria-hidden="true">#</a> Pair programming &amp; reviews</h1>
<p>Funny enough, Stackoverflow published a blog post yesterday that hit right in the feelings.
Check out <a href="https://stackoverflow.blog/2021/01/19/fulfilling-the-promise-of-ci-cd/" target="_blank" rel="noopener noreferrer">Fulfilling the promise of CI/CD<ExternalLinkIcon/></a>.</p>
<p>I'll just extract a tiny bit of it, but it highly recommend giving it a read.</p>
<blockquote>
<p>The time elapsed between writing and shipping is the room temp petri dish where pathological symptoms breed and snowball.
Longer lead times lead to larger code diffs and slower code reviews.
This means anyone reviewing or revising these nightmare diffs has to pause and swap the full context in and out of their mind any time they switch gears, from writing code to reviewing and back again.</p>
</blockquote>
<blockquote>
<p>Thus the elastic feedback loop of the development cycle begins to stretch out longer and longer, as people spend more and more time waiting on each other—to review, to comment, to deploy, to make requested changes—and more and more time paging state in and out of their brains and trying to remember where they were and what they were trying to do.</p>
</blockquote>
<p>This is the exact reason why we didn't do pull requests or blocking reviews.
Every commit to the main branch was deployed to production, fully automatic.
It took less than 8 minutes (depending on service size and tech stack) from commit to production.
Obviously, there were some quality gates, like automated tests, a deployment to the test environment and so on.</p>
<p>Given a small team of just around six developers and plenty to do, we didn't pair every story.
Pairing was optional.
Given a bigger story, a colleague going on vacation or a colleague being interested in a topic, we'd usually pair-program.
The way we pair programmed was individual.
Some switched every 15 minutes using a stop watch - some did it differently.
Most developers used IntelliJ as their main IDE.
As for tooling, we tried out a bunch of different tools and what worked best (by far) was the <a href="https://www.jetbrains.com/help/idea/code-with-me.html" target="_blank" rel="noopener noreferrer">Code With Me Plugin<ExternalLinkIcon/></a>.
Other tools always lacked something, like being able to see test execution.
Unfortunately Code With Me was not available before mid 2020.</p>
<p>I'm not a big fan of forcing developers to pair.
Every developer has a different speed and way of being most productive.
Some tasks just do not make any sense to pair.
However, communication is key.
If you don't pair, that doesn't mean you shouldn't talk to your colleagues, get feedback, talk about implementation, reassure the requirements and so on.</p>
<p>As for code reviews, they were not necessary when pairing, as two developers already saw the code.
We based a lot on trust, responsibility and ownership, and it worked for us as we all shared the same mindset.
We went by the <a href="https://www.oreilly.com/library/view/97-things-every/9780596809515/ch08.html" target="_blank" rel="noopener noreferrer">Boy Scout Rule<ExternalLinkIcon/></a> - <strong>Always leave the campground cleaner than you found it</strong>.
When implementing a story without pair programming, we would still have extremely short feedback loops, get developer or product owner feedback <em>before</em> implementation and <em>during</em> implementation.
A second developer might not have seen the final version of the code, but the direction of implementation was discussed and that was enough for us.
Everyone was an experienced developer and not afraid to ask for help/feedback.
With <em>actual</em> continuous deployment, it was required to do non-breaking, small increments.
This also required us to write proper tests, otherwise you wouldn't feel too well deploying code to production.</p>
<p>By always working on the main branch and doing small increments, we avoided (big) merge conflicts.
The worst thing with blocking reviews/PRs is the amount of loops with everyone having to switch their context.
Context switches are <strong>expensive</strong>.
Big merge conflicts are <strong>expensive</strong>.
On top of that, it is frustrating for everyone.
Issuing a pull request just for it to be denied three days later because of a typo in the docs and having to get out of your current task, switch context, fix the docs and wait another three days for approval (hopefully).
In an agile product development team that is trying to move quickly, you are literally killing your productivity by doing blocking PRs/reviews.</p>
</div></template>
