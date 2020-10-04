---
title: "Inside Agile Product Development Series"
date: "2020-10-04"
sidebar: false
---

# Inside Agile Product Development Series

- [Introduction to the series](/posts/2020-10-04-inside-agile-product-development-series)
  - [What is this series about?](#what-is-this-series-about)
  - [The Product](#the-product)
  - [The Team](#the-team)
  - [Who am I?](#who-am-i)
- How it all started
- A brief overview of our stack
  - Codebase
  - Frontend/Backend/Ops Stack
  - Tools for development, documentation and communication
- Product development vs. Project development
- Responsibilities and ownership
- Agile Development: Scrumban
- Lifecycle of a task
  - Planning & Prioritizing
  - Implementation
  - Quality Assurance
  - Documentation
  - Introducing the changes to the whole team
- Testing principles
- Technical Debt & Refactorings
- Handling Bugs
- Pair Programming & Reviews
- Continuous Integration/Deployment
- How we do operations
- Monitoring, Logging & Alerting
- Deadlines in an agile development team
- Recurring Meetings
  - The Daily
  - Story Time
  - Weekly Developer Meetup
  - Retrospectives
- Different abilities & ranks within a team
  - Do you need a lead developer?
- Making decisions
  - How do we find common ground?
  - Handling decisions with divided opinions
- Avoiding knowledge silos
- Fuckups: Some of our fuckups and how we handled them
- Hiring new developers: Freelancers and regular employees
- The dichotomy between using third party systems and developing internally
- Keeping up2date with the constantly changing ecosystem

## What is this series about?

This series gives you an overview and insights of how we work as an agile software development team to continuously develop & ship a product.
It covers a variety of different, also non-technical, topics.
The good, the bad and the ugly.
I will not go into implementation detail or provide code samples.

Take a glance inside a real-world development team.
All the stories, experiences and approaches are real.

Please note that everything written in this series is written regarding our team.
Just because something did not work or did work for us, does not mean it also applies to your development team.
A team consists of a number of highly individual people, meaning there is no general approach for any topic for all kinds of teams.
However, this can still be used as an inspiration to try a different approach in your team.

The first part of this series gives you a brief introduction about the product, the team and me to fully grasp the upcoming subjects.

## The Product

For the past few years we have been developing a software for renting all sorts of articles. Technical devices such as Smartphones, TVs, consoles or drones.
Household products such as washing machines or vacuum cleaners.
Sport products such as bikes or treadmills. And many more.

We concentrate on B2C (business to customer).
A customer can visit our website and select the product they desire, select a rental duration and place their order.

The customer gets their product within a few days and will be billed automatically on a monthly basis.
When there is an issue with the product, the customers gets a free replacement.
When the rent is over, we will pickup the product for free.

This is just a _very basic_ overview.
There's a lot more to it.

As you might guess, there's quite a bit of business logic to cover here:

- Product information management (product data, prices, media, search, ...)
- CRM (contract management, exchanges, ...)
- Payment (invoices, monthly billing, dunning, debt collection, ...)
- Risk prevention
- Supply chain (procurement of goods, warehouse, order fulfillment, ...)
- Online Shop & Compliance (GDPR, consent management, ...)
- ...

We have external providers for some of these subjects.
However, as with any new business model without a ready-to-use software in the market, there are a bunch of custom systems involved.

This series is mainly about the work within the development team and not so much about this specific product.

## The Team

The current total team size is roughly two dozen employees (including interns).
The team can be divided into two parties.
The **business team** and the **development team**.

### The business team

Each member of the business team has his/her area or specialization.
Let's take risk prevention as an example.
One member of the business team is responsible for risk prevention.
That means, handling any daily operations that relate to that topic, monitoring key performance indicators and working with the development team to try and improve the area.

Developers are free to participate in business topics and evaluate ideas with the business team.

### The development team

The development team consists of six experienced developers and two product owners.
Every one of us developers has worked for at least six years professionally as a developer.
Most of us knew each other from previous jobs.
After I started, over the course of two years, three old colleagues followed me.
Another team member also brought an old colleague.
I'd say the average age of the development team is roughly 31.

Every member of the development team is involved in planning changes to the business, implementing, testing and operating.
We try our best to avoid knowledge silos.

On a side note, we have been working 100% remotely for the past 6 months due to the global pandemic.

## Who am I?

My name is Kevin.
At the time of writing this, I am 26 years old.
I've started programming when I was 12 years old.
Back then, I used VB.Net (Visual Basic) to develop desktop applications that helped me host and customize a private server for an MMORPG I was playing.
I quickly got into web development, back then with PHP.
When I was 16, I started my apprenticeship as a programmer in a small company.
We were using Java (Spring 3.x, JSF, ...) to develop web applications for big automobile companies.
I've completed my apprenticeship at the age of 18 and worked as a full time full stack developer ever since.

When I began working at my current job in January 2018, I was actually the first internal employee to start, followed by the next internal employee two weeks later.
Before that, only freelancers were developing the systems and building a foundation.
So it wasn't a green-field project for us, but still very early in its development.
It's important to note that the product was already live and had its customers.

Everything written in this series are my own experiences and my own opinion.
