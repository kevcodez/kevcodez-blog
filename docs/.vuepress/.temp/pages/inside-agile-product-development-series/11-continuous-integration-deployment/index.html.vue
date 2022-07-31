<template><div><h1 id="continuous-integration-deployment" tabindex="-1"><a class="header-anchor" href="#continuous-integration-deployment" aria-hidden="true">#</a> Continuous Integration &amp; Deployment</h1>
<p>In the previous part, <RouterLink to="/inside-agile-product-development-series/10-pair-programming-reviews/">Pair programming &amp; reviews</RouterLink>, I briefly talked about CI/CD.
Again, I highly recommend the amazing blog post on Stack Overflow by <a href="https://twitter.com/mipsytipsy" target="_blank" rel="noopener noreferrer">Charity Majors<ExternalLinkIcon/></a>, which explains it so well:
<a href="https://stackoverflow.blog/2021/01/19/fulfilling-the-promise-of-ci-cd/" target="_blank" rel="noopener noreferrer">Fulfilling the promise of CI/CD<ExternalLinkIcon/></a>.</p>
<h2 id="trunk-based-vs-git-flow" tabindex="-1"><a class="header-anchor" href="#trunk-based-vs-git-flow" aria-hidden="true">#</a> Trunk-Based vs Git-Flow</h2>
<p>Trunk-Based development is a source-control branching model, where developers collaborate on code in a single branch, resist any pressure to create other long-lived development branches by employing documented techniques.
They therefore avoid merge hell, do not break the build, and live happily ever after.</p>
<p>With Git Flow, each feature gets a new branch and the entire development is done in separate branches and only merged back when the developers are &quot;happy&quot; and ready to &quot;release&quot; the code.</p>
<p>While Git Flow doesn't prevent you from continuously deploying, solely the main branch will be deployed to production.
Only when the feature branch gets merged, a deployment to production is possible.
Whether this is automated or not, it is up to the team.
In my experience, most teams don't deploy automatically on merge but rather do it consciously with Git Flow (can still be automated).</p>
<p>The likeliness of merge hell or reverts is significantly higher using Git Flow.
It also comes with increased complexity and a bit of an overhead due to the amount of branches.</p>
<h2 id="continuous-deployment-to-production" tabindex="-1"><a class="header-anchor" href="#continuous-deployment-to-production" aria-hidden="true">#</a> Continuous Deployment to Production</h2>
<p>When continuously deploying to the production environment, trunk-based development is the way to go.
Quick Note:
Trunk-Based development does not prevent you from creating short-lived branches entirely.
You can still do that to complement your development.
Trunk-Based development does not mean that you do not run tests, deploy to other environments or do whatever to ensure everything is cool, before going for production.
Quite the opposite.
When continuously deploying to production, you want to make sure whatever you are committing is not going to break your service.
This enforces writing proper tests, do non-breaking changes and do small increments, if possible.</p>
<p>We had a distributed service-oriented architecture (some would say microservices).
Being a team of six full-stack developers, there were only a few times when we had conflicting code.
If so, we just talked about it.
We avoided big merge conflicts by pushing small changes and always working on the main branch.</p>
<p>Here's a simplified breakdown of a commit going straight to production:</p>
<ul>
<li>Developer does some changes on the main branch</li>
<li>Developer pushes to the main branch</li>
<li>CI immediately triggers and builds, runs unit and integration tests</li>
<li>Dockerize application and push to registry</li>
<li>Deployment to test environment</li>
<li>Waiting for test environment to be healthy</li>
<li>Deployment to production environment</li>
<li>Waiting for production environment to be healthy</li>
</ul>
<p>Depending on the service size, the entire process took 8-10 minutes and was fully automated.</p>
<p><strong>From commit to production in under 10 minutes.</strong></p>
<h2 id="test-environment" tabindex="-1"><a class="header-anchor" href="#test-environment" aria-hidden="true">#</a> Test environment</h2>
<p>We tried to keep the test environment as close to production as possible to catch issues early on.
We only had a single Docker Image for each build because the image that was being deployed to the test environment, was the same image being deployed to production.
With anonymized data and some external integrations not being available (i.e. an external service had no sandbox/test environment) this was not always 100% reliable.</p>
<h2 id="handling-breaking-changes" tabindex="-1"><a class="header-anchor" href="#handling-breaking-changes" aria-hidden="true">#</a> Handling breaking changes</h2>
<p>Breaking changes were rolled out in a non-breaking way.
Need to add a new non-nullable field and remove another field for it?
Deploy a nullable field to production, fill the new field, change every consumer, remove the old field (at least two commits, possibly more).
Rolling out breaking changes in small increments may take a little longer in initial development because you do multiple non-breaking commits, but it saves your ass in the long run.</p>
<p>Besides only doing small non-breaking increments, another great way to handle breaking changes are feature toggles.</p>
<h2 id="feature-toggles" tabindex="-1"><a class="header-anchor" href="#feature-toggles" aria-hidden="true">#</a> Feature Toggles</h2>
<p>When changing a process, adding a new feature that shouldn't be available right away or doing some breaking changes, you can't just deploy it to production right away.
You want to test the new process first.
So any breaking change is hidden behind a feature toggle.
The feature toggle is only enabled on the test environment and enables you to make sure everything works as intended.</p>
<p>When everything looks good, you feel ready to release it into the wild, you want your new shiny feature/change to be available in production.
But wait...it's already there!
Enable the toggle on production - it's already live.
Depending on the way you configure feature toggles, this can be done in a single second without redeployment.
It's messing up in production?
Disable the feature toggle without redeployment.
That just saved you many commits, merges, branches, reviews and deployments.</p>
<p>When the feature is live, you only have to clean up the toggle, remove dead code and you're good to go.</p>
<h2 id="productivity" tabindex="-1"><a class="header-anchor" href="#productivity" aria-hidden="true">#</a> Productivity</h2>
<p>I keep stressing the Feedback Loop.
Wrote a decent bit about it in the <RouterLink to="/inside-agile-product-development-series/08-testing-principles/">Testing principles</RouterLink> part.
One way to kill developer productivity is stretching the feedback loop.
You just pushed your changes, oh no, your colleague is already building his commit and the build queue is full.
Got to wait 15 minutes, time to get a coffee.
Build is taking 10 minutes because you choose the cheapest/slowest instance for building.
In the meantime, you switch to doing something else.
Finally, after one hour, the CI tells you that one unit test has failed due to a typo.
You interrupt whatever you are doing, switch the context again, fix the typo within a few seconds and wait another hour.
Context switches are expensive.</p>
<p>Now, if you cut this time to a minimum, you can see how greatly you can improve productivity.</p>
<p>You want to make sure, that you squeeze out the best of your CI.
It doesn't matter if you're using Gitlab CI, Github Actions, Jenkins, Concourse, Travis, ...</p>
<p><strong>Faster CI/CD = Faster Time to Production = Short Feedback Loop = Increased Productivity</strong></p>
<p>Make sure your CI scales.
A developer should not wait 20 minutes for his build to start because the build queue is full.
That is 20 minutes of no feedback and completely rips the productivity.
We used Jenkins (I know, not that cool and shiny) and set up autoscaling.
During regular hours, we had one or two build servers up and if we hit the build queue limit, another instance was launched immediately, up and running within a minute.
Only when that instance idled for more than an hour, the instance was killed again.
This way, we made sure we didn't have 20 instances idling in the night and costing us big bucks.</p>
<p>Caching can also greatly improve build times.
Cache your artifacts, docker images, ...
Anything that is reused.</p>
<h2 id="fixing-forward" tabindex="-1"><a class="header-anchor" href="#fixing-forward" aria-hidden="true">#</a> Fixing Forward</h2>
<p>Afraid of pushing to production, what if you mess up in production?!
Listen, I get the anxiety.
Production is a scary and sacred place.
By now, you should know that you need to make sure that your CI is giving you <strong>confidence</strong> to deploy to production.
I'm not telling you to be stupid and deploy your untested code straight to production.
Besides that, mistakes happen, own them.
I've written my take on <RouterLink to="/inside-agile-product-development-series/04-responsibilities-ownership/">Responsibilities &amp; Ownership</RouterLink> - if you haven't read that and struggle with the idea of a ownership, give it a read.</p>
<p>Using feature branches, blocking reviews, only deploying to production once in a blue moon <strong>does not prevent mistakes from happening</strong>.
Tell me...
If you just deployed 80 commits from several developers and 15 database migrations and something is not working - how long will it take you to fix that?
Are you going for that big revert that is going to take the entire day?
The commit that caused the issue was done by a coworker who's not available, time to go through the code for the first time.
What if you just deployed a single commit with a few changes and something ain't right?
How long will it take you to figure out the issue in the code <strong>you</strong> just wrote a few minutes ago?
I think you understand where I am trying to go here 😉</p>
<p>As you're doing way smaller increments, the chance of you messing up big time is so much lower.
Mistakes <strong>will</strong> happen, even to the very best.
Try to mitigate the risk as much as possible but own the mistakes when they happen.</p>
<p>We barely ever reverted a commit, maybe a dependency upgrade that went wrong, but no commit that actually went through CI and was deployed to production.
We <strong>fix forward</strong>.
Just fix the issue in the small increment you just shipped and push again - 10 minutes later that issue is solved (in production).</p>
<h2 id="developer-satisfaction" tabindex="-1"><a class="header-anchor" href="#developer-satisfaction" aria-hidden="true">#</a> Developer satisfaction</h2>
<p>On the very first day I started at the company, I did a tiny frontend story and deployed to production.
<strong>I deployed to production within the first few hours of starting the job.</strong>
You know how that felt?
Amazing.
Satisfying.
I shipped a small improvement to production.
We tried to do this with every new employee.
Ship a small thing to production on the very first day.
This gets the developers familiar with the whole system and makes them happy.
Don't forget to keep your developers happy 😉</p>
<p>Personally, the worst thing you can do to me is make me read random documentation (i.e. Confluence) for days without giving them any context or letting me code.
&quot;Just roam Confluence&quot;.</p>
<h2 id="no-deploys-on-friday" tabindex="-1"><a class="header-anchor" href="#no-deploys-on-friday" aria-hidden="true">#</a> No deploys on Friday</h2>
<p>Always a hot take for developers.
I am not going to stretch this.
We deployed to production on any day.
Friday was no exception.
If you only ship small increments, have feature toggles and are confident about deploying to production, there is nothing wrong with pushing to production on a Friday.
Apply some common sense.
We didn't deploy huge changes or enabled feature toggles with big impact on Friday evening five minutes before leaving work.</p>
</div></template>
