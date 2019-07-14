---
title: "Analyzing a Multi-Module Maven Project with SonarQube"
date: "2017-01-09"
---

## SonarQube Setup

Start by downloading SonarQube from the [official website.](http://sonarqube.org/)

Unzip and navigate to the bin directory, you should see multiple folders

- linux-x86-32
- linux-x86-64
- macosx-universal-64
- windows-x86-32
- windows-x86-64

Navigate into the folder depending on your current operating system, i.e. linux-x86-64.

Execute the sonar.sh script. Sonar should now startup. After a few seconds, you can navigate to SonarQube within your Webbrowser:

http://localhost:9000

The default admin login is **admin:admin**.

Navigate to _Administration > System > Update Center_.

You may now uninstall plugins you do not require like C#.

If you are using Java, you should consider installing **PMD, FindBugs and possibly CheckStyle** by clicking the Available-Tab. You have to restart SonarQube to apply the changes.

By default, SonarQube launches with an In-Memory database. To have persistent analysis, you need to configure a database. Navigate into the conf directory and open up the **sonar.properties** file.  Edit the following properties:

sonar.jdbc.username=tickeos
sonar.jdbc.password=topsecret

# Postgres Example
sonar.jdbc.url=jdbc:postgresql://localhost/sonar

# MySQL Example
sonar.jdbc.url=jdbc:mysql://localhost:3306/sonar?useUnicode=true&characterEncoding=utf8&rewriteBatchedStatements=true&useConfigs=maxPerformance

The config contains multiple examples for JDBC configuration. Make sure the database exists.

After changing the configuration, restart SonarQube.

$SONAR\_HOME/bin/linux-x86-64/sonar.sh restart

## Setting up SonarQube Scanner

The easiest way to [analyze your project](http://docs.sonarqube.org/display/SCAN/Analyzing+Source+Code) is using the SonarQube Scanner.

Download the [SonarQube Scanner (CLI)](http://docs.sonarqube.org/display/SCAN/Analyzing+with+SonarQube+Scanner), which provides a CLI to analyze projects of any language.

Unpack the SonarQube Scanner and navigate into the conf directory. Open up the **sonar-scanner.properties**.

sonar.host.url=http://127.0.0.1:9000

You are ready to analyze your Multi-Module Maven Project!

## Analyzing the Multi-Module-Maven Project

Imagine we have a Multi-Module Maven Project with the following structure

- Parent
    - Module1
    - Module2
    - Module3

There are multiple ways of configuring SonarQube for your project. You may define the project settings on the parent-level, or overwrite properties in each module. For the sake of simplicity, let us just define the settings in the parent module.

Create a sonar-project.properties file in the parent folder.

sonar.projectKey=projectKey
sonar.projectName=Project Name
sonar.projectVersion=1.0

sonar.modules=Module1,Module2,Module3

# Modules inherit properties set at parent level
sonar.sources=src
sonar.sourceEncoding=UTF-8
sonar.language=java

You have to define each module in **sonar.modules** property.

Navigate into the Parent folder and execute Maven and afterwards, execute the Scanner.

mvn clean install

# Linux
/path/to/sonar-scanner/bin/sonar-scanner -Dsonar.login=admin -Dsonar.password=admin

# Windows
C:/Apps/sonar-scanner-2.8/bin/sonar-scanner.bat -Dsonar.login=admin -Dsonar.password=admin

By the way, you can also pass the parameter for **sonar.host.url** in here, if you do not want to edit the sonar-scanner.properties.

When navigating the [Projects Administration Page (Adminstration > Projects > Management)](http://localhost:9000/projects_admin) you should be able to see your Projects. Click on the project and you should see the results from the analysis.

\[caption id="attachment\_442" align="alignnone" width="1570"\][![Undertow, analyzed with SonarQube, Project overview](https://kevcodez.de/wp-content/uploads/2017/01/sonar_analysis.png)](https://kevcodez.de/index.php/2017/01/analyzing-a-multi-module-maven-project-with-sonarqube/sonar_analysis/) Image contains the overview of an analyzed project in SonarQube\[/caption\]

Go to Issues to see the issues that were analyzed. You can also disable rules under Quality Profiles, if you find rules that do not apply to your project or you do not want to see.

This is it, enjoy static code analysis and improve your code :).
