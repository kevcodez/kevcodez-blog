<template><div><h1 id="introduction-to-the-inside-agile-product-development-series" tabindex="-1"><a class="header-anchor" href="#introduction-to-the-inside-agile-product-development-series" aria-hidden="true">#</a> Introduction to the Inside Agile Product Development series</h1>
<h2 id="what-is-this-series-about" tabindex="-1"><a class="header-anchor" href="#what-is-this-series-about" aria-hidden="true">#</a> What is this series about?</h2>
<p>The <strong>Inside Agile Product Development</strong> series gives you an overview and insights of how we work as an agile software development team to continuously develop &amp; ship a product.
It covers a variety of different, also non-technical, topics.
The good, the bad and the ugly.
The successes, failures and learnings.</p>
<p>Take a glance inside a real-world development team.
All the stories, experiences and approaches are real.
I will not go into implementation detail or provide code samples.</p>
<p>Please note that everything written in this series is written regarding our team.
Just because something did not work or did work for us, does not mean it also applies to your development team.
A team consists of a number of highly individual people, meaning there is no general approach for any topic for all kinds of teams.
However, this can still be used as an inspiration to try a different approach in your team.</p>
<p>The first part of this series gives you a brief introduction about the product, the team and me to fully grasp the upcoming subjects.</p>
<h2 id="the-product" tabindex="-1"><a class="header-anchor" href="#the-product" aria-hidden="true">#</a> The Product</h2>
<p>For the past few years we have been developing a software for renting all sorts of articles. Technical devices such as Smartphones, TVs, consoles or drones.
Household products such as washing machines or vacuum cleaners.
Sport products such as bikes or treadmills. And many more.</p>
<p>We concentrate on B2C (business to customer).
A customer can visit our website and select the product they desire, select a rental duration and place their order.</p>
<p>The customer gets their product within a few days and will be billed automatically on a monthly basis.
When there is an issue with the product, the customers gets a free replacement.
When the rent is over, we will pickup the product for free.</p>
<p>This is just a <em>very basic</em> overview.
There's a lot more to it.</p>
<p>As you might guess, there's quite a bit of business logic to cover here:</p>
<ul>
<li>Product information management (product data, prices, media, search, ...)</li>
<li>CRM (contract management, exchanges, ...)</li>
<li>Payment (invoices, monthly billing, dunning, debt collection, ...)</li>
<li>Risk prevention</li>
<li>Supply chain (procurement of goods, warehouse, order fulfillment, ...)</li>
<li>Online Shop &amp; Compliance (GDPR, consent management, ...)</li>
<li>...</li>
</ul>
<p>We have external providers for some of these subjects.
However, as with any new business model without a ready-to-use software in the market, there are a bunch of custom systems involved.</p>
<p>This series is mainly about the work within the development team and not so much about this specific product.</p>
<h2 id="the-team" tabindex="-1"><a class="header-anchor" href="#the-team" aria-hidden="true">#</a> The Team</h2>
<p>The current total team size is roughly two dozen employees (including interns).
The team can be divided into two parties.
The <strong>business team</strong> and the <strong>development team</strong>.</p>
<h3 id="the-business-team" tabindex="-1"><a class="header-anchor" href="#the-business-team" aria-hidden="true">#</a> The business team</h3>
<p>Each member of the business team has his/her area or specialization.
Let's take risk prevention as an example.
One member of the business team is responsible for risk prevention.
That means, handling any daily operations that relate to that topic, monitoring key performance indicators and working with the development team to try and improve the area.</p>
<p>Developers are free to participate in business topics and evaluate ideas with the business team.</p>
<h3 id="the-development-team" tabindex="-1"><a class="header-anchor" href="#the-development-team" aria-hidden="true">#</a> The development team</h3>
<p>The development team consists of six experienced developers and two product owners.
Every one of us developers has worked for at least six years professionally as a developer.
Most of us knew each other from previous jobs.
After I started, over the course of two years, three old colleagues followed me.
Another team member also brought an old colleague.
I'd say the average age of the development team is roughly 31.</p>
<p>Every member of the development team is involved in planning changes to the business, implementing, testing and operating.
We try our best to avoid knowledge silos.</p>
<p>On a side note, we have been working 100% remotely for the past 6 months due to the global pandemic.</p>
<h2 id="who-am-i" tabindex="-1"><a class="header-anchor" href="#who-am-i" aria-hidden="true">#</a> Who am I?</h2>
<p>My name is Kevin.
At the time of writing this, I am 26 years old.
I've started programming when I was 12 years old.
Back then, I used VB.Net (Visual Basic) to develop desktop applications that helped me host and customize a private server for an MMORPG I was playing.
I quickly got into web development, back then with PHP.
When I was 16, I started my apprenticeship as a programmer in a small company.
We were using Java (Spring 3.x, JSF, ...) to develop web applications for big automobile companies.
I've completed my apprenticeship at the age of 18 and worked as a full time full stack developer ever since.</p>
<p>When I began working at my current job in January 2018, I was actually the first internal employee to start, followed by the next internal employee two weeks later.
Before that, only freelancers were developing the systems and building a foundation.
So it wasn't a green-field project for us, but still very early in its development.
It's important to note that the product was already live and had its customers.</p>
<p>Everything written in this series are my own experiences and my own opinion.</p>
<p>A new part will be released every week.</p>
</div></template>
