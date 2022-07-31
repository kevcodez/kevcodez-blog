<template><div><h1 id="lifecycle-of-a-story" tabindex="-1"><a class="header-anchor" href="#lifecycle-of-a-story" aria-hidden="true">#</a> Lifecycle of a story</h1>
<h2 id="creation" tabindex="-1"><a class="header-anchor" href="#creation" aria-hidden="true">#</a> Creation</h2>
<p>Besides purely technical stories, when the product owner or business owner has an issue or an idea for improval, one developer will be  included immediately in story design.
Usually, designing a story consisted of three team members:
A product owner, a developer and a business owner.
Including a developer very very early on helped us avoid many pitfalls later on.
The developer was able to fully understand the problem/improvement and helped design the story.
This avoids many loops between development and business/product owners and we found it to be the most productive way of designing stories.</p>
<p>Most people think in solutions.
They have a problem and come up with a solution.
That's not a bad thing.
The bad thing about this is that we as a developer don't get to hear the problem.
We only hear the solution.
It is crucial to get to the root of the problem to actually find the best possible solution.
If the solution the team comes up with is the same as the initial solution from the requester, that's great!
In many cases though, when you get to the root of the problem, you find other solutions.
That is why it is essential to include a developer early on.</p>
<p>The developer also helps writing the actual story and approves that story.
If the developer is stuck, he/she can always ask another developer for help.
Usually, the rest of the development team does not see that story for now, though.</p>
<p>It is important to note that the developer helping design the stories always rotates.
There is no single developer that always helps design the stories.
We keep rotating to avoid knowledge silos.</p>
<h2 id="refinement-prioritization" tabindex="-1"><a class="header-anchor" href="#refinement-prioritization" aria-hidden="true">#</a> Refinement &amp; Prioritization</h2>
<p>After the story has been designed by a product owner, business owner and developer and the final version of the story has been approved by that developer, that story is taken into refinement.
In the refinement meeting, every developer participates.
We go through every story and every criterion for completion and make sure everyone understands.
This is a good time to intervene if something is not right.
However, since we always have a developer participate in story design and approve the stories, most stories are refined very quickly with little to no addition or questions.
If a story happens to be very unclear or big discussions occur, it will be postponed and the story will have to be brought to refinement again.</p>
<p>After refining all the stories, product owners and developers prioritize together.
The product owners know the bigger picture the best and are mainly responsible for prioritization.
There has usually been very little discussion and we quickly committed on prioritization.
If there was an important technical story that needed to be done, the product owners allowed us to prioritize it and believed our evaluation.</p>
<h2 id="implementation" tabindex="-1"><a class="header-anchor" href="#implementation" aria-hidden="true">#</a> Implementation</h2>
<p>When the story is refined, approved by the team and prioritized, it will be ready for development.
A developer will always pick the highest prioritized story (given there are no bugs and no one needs support).
There is no rule for pairing/reviewing.
The developer is supposed to apply common sense and it actually did work out for us.
If the story was a bit bigger or complicated, we would usually pair that story.
When doing the story solo, we would still get feedback before and during implementation from other developers or even the product owners.
The most important thing was a very fast feedback loop.
All changes were pushed to production automatically (after running tests and deploying to a test environment) - breaking changes or new additions were toggled.
This way, even during development we could show the business/product owners the current progress and quickly get feedback.
I've seen many developers not being certain about a requirement and just doing what they think is right.
Many loops can be avoided by simply talking for a minute.
It's a big time saver and improves the relationships within the team - don't be afraid to ask if you are unsure.</p>
<h2 id="quality-assurance" tabindex="-1"><a class="header-anchor" href="#quality-assurance" aria-hidden="true">#</a> Quality Assurance</h2>
<p>The quality assurance was usually done by the requester - either the business owner or the product owner.
I always tried to do the quality assurance together with the requester, it's a great way to keep the feedback loop extremely short.
Ideally, right after implementing the story, I would message the requester and do quality assurance.
As I said before, most times we would show the requester the progress, so the final quality assurance wasn't that bad.</p>
<p>Given a completely technical story, another developer reviewed the result.</p>
<h2 id="documentation" tabindex="-1"><a class="header-anchor" href="#documentation" aria-hidden="true">#</a> Documentation</h2>
<p>Documentation was no separate task that should be done by the end of the story.
A developer was supposed to comment the progress and hurdles on the current story <strong>at least</strong> daily.
It's a great way to document everything - especially when you're not pairing every story.
What if a developer falls sick for a week? Zero comments on the story? No code checked in?
That's going to be a hustle to continue.</p>
<h2 id="introducing-the-changes-to-the-whole-team" tabindex="-1"><a class="header-anchor" href="#introducing-the-changes-to-the-whole-team" aria-hidden="true">#</a> Introducing the changes to the whole team</h2>
<p>When the implementation finished, the quality assurance looked fine, we had to inform the team about the new changes.
We had two ways to do so:</p>
<ol>
<li>Slack</li>
</ol>
<p>Immediately after finishing a story, we would post the completed story and the changes in a specific Slack channel.
We also mentioned people that would be specifically interested in the story being finished.
For non-technical stories, we also wrote a non-technical summary of the changes.
Personally, I usually separated that post into two parts: Summary of the changes (non-technical) and technical changes (interesting refactorings, new library, library upgrades, ...).</p>
<ol start="2">
<li>Two-Weekly Review</li>
</ol>
<p>Every two weeks, the product owners invited the entire team to introduce the changes in the last two weeks.
The meeting was optional and everyone was invited to join.</p>
</div></template>
