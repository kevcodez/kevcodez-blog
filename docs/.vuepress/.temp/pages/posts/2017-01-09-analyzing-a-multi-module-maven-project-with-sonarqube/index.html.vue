<template><div><h2 id="sonarqube-setup" tabindex="-1"><a class="header-anchor" href="#sonarqube-setup" aria-hidden="true">#</a> SonarQube Setup</h2>
<p>Start by downloading SonarQube from the <a href="http://sonarqube.org/" target="_blank" rel="noopener noreferrer">official website.<ExternalLinkIcon/></a></p>
<p>Unzip and navigate to the bin directory, you should see multiple folders</p>
<ul>
<li>linux-x86-32</li>
<li>linux-x86-64</li>
<li>macosx-universal-64</li>
<li>windows-x86-32</li>
<li>windows-x86-64</li>
</ul>
<p>Navigate into the folder depending on your current operating system, i.e. linux-x86-64.</p>
<p>Execute the sonar.sh script. Sonar should now startup. After a few seconds, you can navigate to SonarQube within your Webbrowser:</p>
<p>http://localhost:9000</p>
<p>The default admin login is <strong>admin:admin</strong>.</p>
<p>Navigate to <em>Administration &gt; System &gt; Update Center</em>.</p>
<p>You may now uninstall plugins you do not require like C#.</p>
<p>If you are using Java, you should consider installing <strong>PMD, FindBugs and possibly CheckStyle</strong> by clicking the Available-Tab. You have to restart SonarQube to apply the changes.</p>
<p>By default, SonarQube launches with an In-Memory database. To have persistent analysis, you need to configure a database. Navigate into the conf directory and open up the <strong>sonar.properties</strong> file.  Edit the following properties:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>sonar.jdbc.username=tickeos
sonar.jdbc.password=topsecret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="postgres-example" tabindex="-1"><a class="header-anchor" href="#postgres-example" aria-hidden="true">#</a> Postgres Example</h1>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>sonar.jdbc.url=jdbc:postgresql://localhost/sonar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h1 id="mysql-example" tabindex="-1"><a class="header-anchor" href="#mysql-example" aria-hidden="true">#</a> MySQL Example</h1>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>sonar.jdbc.url=jdbc:mysql://localhost:3306/sonar?useUnicode=true&amp;characterEncoding=utf8&amp;rewriteBatchedStatements=true&amp;useConfigs=maxPerformance
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>The config contains multiple examples for JDBC configuration. Make sure the database exists.</p>
<p>After changing the configuration, restart SonarQube.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token variable">$SONAR</span><span class="token punctuation">\</span>_HOME/bin/linux-x86-64/sonar.sh restart
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="setting-up-sonarqube-scanner" tabindex="-1"><a class="header-anchor" href="#setting-up-sonarqube-scanner" aria-hidden="true">#</a> Setting up SonarQube Scanner</h2>
<p>The easiest way to <a href="http://docs.sonarqube.org/display/SCAN/Analyzing+Source+Code" target="_blank" rel="noopener noreferrer">analyze your project<ExternalLinkIcon/></a> is using the SonarQube Scanner.</p>
<p>Download the <a href="http://docs.sonarqube.org/display/SCAN/Analyzing+with+SonarQube+Scanner" target="_blank" rel="noopener noreferrer">SonarQube Scanner (CLI)<ExternalLinkIcon/></a>, which provides a CLI to analyze projects of any language.</p>
<p>Unpack the SonarQube Scanner and navigate into the conf directory. Open up the <strong>sonar-scanner.properties</strong>.</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>sonar.host.url=http://127.0.0.1:9000
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>You are ready to analyze your Multi-Module Maven Project!</p>
<h2 id="analyzing-the-multi-module-maven-project" tabindex="-1"><a class="header-anchor" href="#analyzing-the-multi-module-maven-project" aria-hidden="true">#</a> Analyzing the Multi-Module-Maven Project</h2>
<p>Imagine we have a Multi-Module Maven Project with the following structure</p>
<ul>
<li>Parent
<ul>
<li>Module1</li>
<li>Module2</li>
<li>Module3</li>
</ul>
</li>
</ul>
<p>There are multiple ways of configuring SonarQube for your project. You may define the project settings on the parent-level, or overwrite properties in each module. For the sake of simplicity, let us just define the settings in the parent module.</p>
<p>Create a sonar-project.properties file in the parent folder.</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>sonar.projectKey=projectKey
sonar.projectName=Project Name
sonar.projectVersion=1.0

sonar.modules=Module1,Module2,Module3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="modules-inherit-properties-set-at-parent-level" tabindex="-1"><a class="header-anchor" href="#modules-inherit-properties-set-at-parent-level" aria-hidden="true">#</a> Modules inherit properties set at parent level</h1>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>sonar.sources=src
sonar.sourceEncoding=UTF-8
sonar.language=java
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>You have to define each module in <strong>sonar.modules</strong> property.</p>
<p>Navigate into the Parent folder and execute Maven and afterwards, execute the Scanner.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>mvn clean <span class="token function">install</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h1 id="linux" tabindex="-1"><a class="header-anchor" href="#linux" aria-hidden="true">#</a> Linux</h1>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>/path/to/sonar-scanner/bin/sonar-scanner -Dsonar.login<span class="token operator">=</span>admin -Dsonar.password<span class="token operator">=</span>admin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h1 id="windows" tabindex="-1"><a class="header-anchor" href="#windows" aria-hidden="true">#</a> Windows</h1>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>C:/Apps/sonar-scanner-2.8/bin/sonar-scanner.bat -Dsonar.login<span class="token operator">=</span>admin -Dsonar.password<span class="token operator">=</span>admin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>By the way, you can also pass the parameter for <strong>sonar.host.url</strong> in here, if you do not want to edit the sonar-scanner.properties.</p>
<p>When navigating the <a href="http://localhost:9000/projects_admin" target="_blank" rel="noopener noreferrer">Projects Administration Page (Adminstration &gt; Projects &gt; Management)<ExternalLinkIcon/></a> you should be able to see your Projects. Click on the project and you should see the results from the analysis.</p>
<p><a href="./sonar_analysis.png">Undertow, analyzed with SonarQube, Project overview</a></p>
<p>Go to Issues to see the issues that were analyzed. You can also disable rules under Quality Profiles, if you find rules that do not apply to your project or you do not want to see.</p>
<p>This is it, enjoy static code analysis and improve your code 😃.</p>
</div></template>
