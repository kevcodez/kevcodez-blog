---
date: "2021-01-17"
type: "guide"
editLink: false
search: false
prev: '/inside-agile-product-development-series/10-pair-programming-reviews/'
next: false
---

# Continuous Integration & Deployment

In the previous part, [Pair programming & reviews](./../10-pair-programming-reviews/), I briefly talked about CI/CD.
Again, I highly recommend the amazing blog post on Stack Overflow by [Charity Majors](https://twitter.com/mipsytipsy), which explains it so well:
[Fulfilling the promise of CI/CD](https://stackoverflow.blog/2021/01/19/fulfilling-the-promise-of-ci-cd/).

## Trunk-Based vs Git-Flow

Trunk-Based development is a source-control branching model, where developers collaborate on code in a single branch, resist any pressure to create other long-lived development branches by employing documented techniques.
They therefore avoid merge hell, do not break the build, and live happily ever after.

With Git Flow, each feature gets a new branch and the entire development is done in separate branches and only merged back when the developers are "happy" and ready to "release" the code.

While Git Flow doesn't prevent you from continuously deploying, solely the main branch will be deployed to production.
Only when the feature branch gets merged, a deployment to production is possible.
Whether this is automated or not, it is up to the team.
In my experience, most teams don't deploy automatically on merge but rather do it consciously with Git Flow (can still be automated).

The likeliness of merge hell or reverts is significantly higher using Git Flow.
It also comes with increased complexity and a bit of an overhead due to the amount of branches.

## Continuous Deployment to Production

When continuously deploying to the production environment, trunk-based development is the way to go.
Quick Note:
Trunk-Based development does not prevent you from creating short-lived branches entirely.
You can still do that to complement your development.
Trunk-Based development does not mean that you do not run tests, deploy to other environments or do whatever to ensure everything is cool, before going for production.
Quite the opposite.
When continuously deploying to production, you want to make sure whatever you are committing is not going to break your service.
This enforces writing proper tests, do non-breaking changes and do small increments, if possible.

We had a distributed service-oriented architecture (some would say microservices).
Being a team of six full-stack developers, there were only a few times when we had conflicting code.
If so, we just talked about it.
We avoided big merge conflicts by pushing small changes and always working on the main branch.

Here's a simplified breakdown of a commit going straight to production:

* Developer does some changes on the main branch
* Developer pushes to the main branch
* CI immediately triggers and builds, runs unit and integration tests
* Dockerize application and push to registry
* Deployment to test environment
* Waiting for test environment to be healthy
* Deployment to production environment
* Waiting for production environment to be healthy

Depending on the service size, the entire process took 8-10 minutes and was fully automated.

**From commit to production in under 10 minutes.**

## Test environment

We tried to keep the test environment as close to production as possible to catch issues early on.
We only had a single Docker Image for each build because the image that was being deployed to the test environment, was the same image being deployed to production.
With anonymized data and some external integrations not being available (i.e. an external service had no sandbox/test environment) this was not always 100% reliable.

## Handling breaking changes

Breaking changes were rolled out in a non-breaking way.
Need to add a new non-nullable field and remove another field for it?
Deploy a nullable field to production, fill the new field, change every consumer, remove the old field (at least two commits, possibly more).
Rolling out breaking changes in small increments may take a little longer in initial development because you do multiple non-breaking commits, but it saves your ass in the long run.

Besides only doing small non-breaking increments, another great way to handle breaking changes are feature toggles.

## Feature Toggles

When changing a process, adding a new feature that shouldn't be available right away or doing some breaking changes, you can't just deploy it to production right away.
You want to test the new process first.
So any breaking change is hidden behind a feature toggle.
The feature toggle is only enabled on the test environment and enables you to make sure everything works as intended.

When everything looks good, you feel ready to release it into the wild, you want your new shiny feature/change to be available in production.
But wait...it's already there!
Enable the toggle on production - it's already live.
Depending on the way you configure feature toggles, this can be done in a single second without redeployment.
It's messing up in production?
Disable the feature toggle without redeployment.
That just saved you many commits, merges, branches, reviews and deployments.

When the feature is live, you only have to clean up the toggle, remove dead code and you're good to go.

## Productivity

I keep stressing the Feedback Loop.
Wrote a decent bit about it in the [Testing principles](./../08-testing-principles/) part.
One way to kill developer productivity is stretching the feedback loop.
You just pushed your changes, oh no, your colleague is already building his commit and the build queue is full.
Got to wait 15 minutes, time to get a coffee.
Build is taking 10 minutes because you choose the cheapest/slowest instance for building.
In the meantime, you switch to doing something else.
Finally, after one hour, the CI tells you that one unit test has failed due to a typo.
You interrupt whatever you are doing, switch the context again, fix the typo within a few seconds and wait another hour.
Context switches are expensive.

Now, if you cut this time to a minimum, you can see how greatly you can improve productivity.

You want to make sure, that you squeeze out the best of your CI.
It doesn't matter if you're using Gitlab CI, Github Actions, Jenkins, Concourse, Travis, ...

**Faster CI/CD = Faster Time to Production = Short Feedback Loop = Increased Productivity**

Make sure your CI scales.
A developer should not wait 20 minutes for his build to start because the build queue is full.
That is 20 minutes of no feedback and completely rips the productivity.
We used Jenkins (I know, not that cool and shiny) and set up autoscaling.
During regular hours, we had one or two build servers up and if we hit the build queue limit, another instance was launched immediately, up and running within a minute.
Only when that instance idled for more than an hour, the instance was killed again.
This way, we made sure we didn't have 20 instances idling in the night and costing us big bucks.

Caching can also greatly improve build times.
Cache your artifacts, docker images, ...
Anything that is reused.

## Fixing Forward

Afraid of pushing to production, what if you mess up in production?!
Listen, I get the anxiety.
Production is a scary and sacred place.
By now, you should know that you need to make sure that your CI is giving you **confidence** to deploy to production.
I'm not telling you to be stupid and deploy your untested code straight to production.
Besides that, mistakes happen, own them.
I've written my take on [Responsibilities & Ownership](./../04-responsibilities-ownership/) - if you haven't read that and struggle with the idea of a ownership, give it a read.

Using feature branches, blocking reviews, only deploying to production once in a blue moon **does not prevent mistakes from happening**.
Tell me...
If you just deployed 80 commits from several developers and 15 database migrations and something is not working - how long will it take you to fix that?
Are you going for that big revert that is going to take the entire day?
The commit that caused the issue was done by a coworker who's not available, time to go through the code for the first time.
What if you just deployed a single commit with a few changes and something ain't right?
How long will it take you to figure out the issue in the code **you** just wrote a few minutes ago?
I think you understand where I am trying to go here ;)

As you're doing way smaller increments, the chance of you messing up big time is so much lower.
Mistakes **will** happen, even to the very best.
Try to mitigate the risk as much as possible but own the mistakes when they happen.

We barely ever reverted a commit, maybe a dependency upgrade that went wrong, but no commit that actually went through CI and was deployed to production.
We **fix forward**.
Just fix the issue in the small increment you just shipped and push again - 10 minutes later that issue is solved (in production).

## Developer satisfaction

On the very first day I started at the company, I did a tiny frontend story and deployed to production.
**I deployed to production within the first few hours of starting the job.**
You know how that felt? 
Amazing.
Satisfying.
I shipped a small improvement to production.
We tried to do this with every new employee.
Ship a small thing to production on the very first day.
This gets the developers familiar with the whole system and makes them happy.
Don't forget to keep your developers happy ;)

Personally, the worst thing you can do to me is make me read random documentation (i.e. Confluence) for days without giving them any context or letting me code.
"Just roam Confluence".

## No deploys on Friday

Always a hot take for developers.
I am not going to stretch this.
We deployed to production on any day.
Friday was no exception.
If you only ship small increments, have feature toggles and are confident about deploying to production, there is nothing wrong with pushing to production on a Friday.
Apply some common sense.
We didn't deploy huge changes or enabled feature toggles with big impact on Friday evening five minutes before leaving work.
