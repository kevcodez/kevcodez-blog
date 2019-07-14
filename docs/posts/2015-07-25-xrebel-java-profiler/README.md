---
title: "XRebel Java Profiler: The lightweight Java Profiler"
date: "2015-07-25"
---

The XRebel Java Profiler ist a lightweight Java Profiler frmo zeroturnaround, the makers of JRebel and also the [Optimizer for Eclipse Plugin (Speeding up Eclipse)](https://kevcodez.de/index.php/2015/07/eclipse-beschleunigen-optimizer-for-eclipse-plugin/). To include the profiler in your web application, a single VM argument needs to be passed and a little icon will be displayed at the bottom left of every page. When clicking on the icon, the XRebel interface is shown, displaying the amount and time taken of individual SQL queries and java methods. Here is a short, sympathetic video introducing XRebel.

<iframe src="https://player.vimeo.com/video/123985263" width="500" height="281" frameborder="0" allowfullscreen="allowfullscreen"></iframe>

* * *

## Profiling an application

- Understanding application performance
- Instant feedback, how long a single request or even a single method took
- Split up in application layers
- Finding the slowest methods

\[caption id="attachment\_371" align="aligncenter" width="818"\][![XRebel - Application Profiling](https://kevcodez.de/wp-content/uploads/2015/07/Profiling_noscroll_540_o.gif)](https://kevcodez.de/wp-content/uploads/2015/07/Profiling_noscroll_540_o.gif) XRebel - Application Profiling\[/caption\]

* * *

## Profiling JDBC and NoSQL Databases

- Identify excessive amounts of database queries
- Finding methods, that result in too many queries being executed, in a hierachic view
- Supports NoSQL
- Vuew MongoDB, Cassandra, HBase und Neo4j Queries
- Understand the usage of JPA

\[caption id="attachment\_372" align="aligncenter" width="788"\][![XRebel - Database Profiling](https://kevcodez.de/wp-content/uploads/2015/07/Database_540_o.gif)](https://kevcodez.de/wp-content/uploads/2015/07/Database_540_o.gif) XRebel - Database Profiling\[/caption\]

* * *

## Finding Bottlenecks in Webservices

- Exact overview of every HTTP request
- View all webservice requests, such as REST,SOAP,XML-RPC
- Identify slow HTTP requests

[![XRebel - Webservices](https://kevcodez.de/wp-content/uploads/2015/07/WebServices_noscroll_540_o.gif)](https://kevcodez.de/wp-content/uploads/2015/07/WebServices_noscroll_540_o.gif)

* * *

## Understanding Session Footprint

- View sessuib objects and their size
- Watch changes in objects stored in session
- Identify biggest objects

\[caption id="attachment\_375" align="aligncenter" width="759"\][![XRebel - Session](https://kevcodez.de/wp-content/uploads/2015/07/Session_540_o.gif)](https://kevcodez.de/wp-content/uploads/2015/07/Session_540_o.gif) XRebel - Session\[/caption\]

* * *

## Find hidden Exceptions

\[caption id="attachment\_376" align="aligncenter" width="707"\][![XRebel - Exceptions](https://kevcodez.de/wp-content/uploads/2015/07/Exception_540_o_static1.png)](https://kevcodez.de/wp-content/uploads/2015/07/Exception_540_o_static1.png) XRebel - Exceptions\[/caption\]

 

* * *

##  Installation/Pricing and Demo/Download

The XRebel Jarfile needs to be included as VM argument to your application server using **\-javaagent:pfad**. In Eclipse, open up your servers view, doubleclick your server and select "_Open launch configuration_".

\[caption id="attachment\_384" align="aligncenter" width="616"\][![Eclipse - VM Argumente](http://kevcodez.de/wp-content/uploads/2015/07/vm-arguments.png)](http://kevcodez.de/wp-content/uploads/2015/07/vm-arguments.png) Eclipse - VM Argumente\[/caption\]

XRebel offers a two weeks long trial version. Using [this Link](https://zeroturnaround.com/software/xrebel/trial/), you can request a trial version. License is **1 $ per day (365 $ per year)**. The current download is available [here - XRebel Download](https://zeroturnaround.com/software/xrebel/download/).

 

Pictures and videos are taken from the official XRebel website - [https://zeroturnaround.com/software/xrebel/](https://zeroturnaround.com/software/xrebel/).
