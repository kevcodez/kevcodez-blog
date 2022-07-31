<template><div><h1 id="collaborative-development-in-intellij-idea" tabindex="-1"><a class="header-anchor" href="#collaborative-development-in-intellij-idea" aria-hidden="true">#</a> Collaborative development in IntelliJ IDEA</h1>
<p>On the 5th of february 2005, Maxim Sharifov created the ticket <a href="https://youtrack.jetbrains.com/issue/IDEABKL-708" target="_blank" rel="noopener noreferrer">&quot;Collaborative development&quot;<ExternalLinkIcon/></a> on the JetBrains issue tracker. This issue has become the top voted issue in the entire issue tracker with <strong>over 2180 votes</strong>.</p>
<p>With pair programming and remote programming becoming more and more common (especially during a global pandemic), the need for a proper tool has risen immensly.</p>
<p><a href="https://twitter.com/hhariri" target="_blank" rel="noopener noreferrer">Hadi Hariri<ExternalLinkIcon/></a>, developer advocate at JetBrains, has already dropped some hints in march 2020 that they have been working on such feature.</p>
<p><img src="@source/posts/2020-09-12-intellij-idea-collaborative-development/hariri.png" alt="Announcement of Hadi Hariri for active development of collaborative development feature"></p>
<p><a href="https://code.visualstudio.com/" target="_blank" rel="noopener noreferrer">VSCode<ExternalLinkIcon/></a> has introduced <a href="https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare" target="_blank" rel="noopener noreferrer">Live Share<ExternalLinkIcon/></a> end of 2017 and has received much love.</p>
<p>So I was eagerly waiting for JetBrains to do their magic.
That time has now come.</p>
<h1 id="introducing-code-with-me" tabindex="-1"><a class="header-anchor" href="#introducing-code-with-me" aria-hidden="true">#</a> Introducing Code With Me</h1>
<blockquote>
<p>Code With Me is a plugin for IntelliJ IDEA and other JetBrains IDEs that enables you to collaboratively review, edit, and debug code with your colleagues in real time.</p>
</blockquote>
<p>It is completely free to use (besides having an IntelliJ license obviously).
Even better, the guests that are invited do not need a license, only the host does!</p>
<p>One person needs to start a session as a host and gets an invitation link, up to 5 guests can then join the session using that link.
The guests use a lightweight client application (reduced version of IDEA).</p>
<h2 id="experience" tabindex="-1"><a class="header-anchor" href="#experience" aria-hidden="true">#</a> Experience</h2>
<p>We did not hesistate to try out the newly released plugin at work for pair programming.
We both downloaded and installed the plugin and one of us started a session (host) and the other one connected (guest).</p>
<p>You may either choose to follow one person or work independently.
This allows to edit different files in parallel or work on the same code collaboratively so only one person edits/debugs/runs and the other one follows.
There is no screen sharing needed, because pretty much everything done in the host IDE is seen in the guest IDE.</p>
<p>It felt very intuitive to work with it. For example, if I as a host hit Run on a JUnit test, that test started for both of our IDEs (in case my colleague was following me).</p>
<p>Generally speaking, this plugin is looking extremely promising and we will continue to use that plugin at work.
We have tried a bunch of other pair programming or screen sharing tools so far and none of them really did the trick for us because some things were always missing (i.e. test execution) or felt counterintuitive.
The plugin is neatly integrated in IntelliJ itself.</p>
<h2 id="how-do-i-get-it" tabindex="-1"><a class="header-anchor" href="#how-do-i-get-it" aria-hidden="true">#</a> <strong>How do I get it?</strong></h2>
<p>Fill out the <a href="https://surveys.jetbrains.com/s3/code-with-me" target="_blank" rel="noopener noreferrer">survey from JetBrains<ExternalLinkIcon/></a> and you will be redirected to a Google Drive containing the plugin as zip. You have to install the plugin from disk by going to your plugins in IDEA and select &quot;Install plugin from disk&quot;.</p>
<p>Also check out the official <a href="https://www.jetbrains.com/help/idea/faq-about-code-with-me.html" target="_blank" rel="noopener noreferrer">FAQ<ExternalLinkIcon/></a>.</p>
<p>Found any issues, report it on the <a href="https://youtrack.jetbrains.com/" target="_blank" rel="noopener noreferrer">official bug tracker<ExternalLinkIcon/></a>.</p>
</div></template>
