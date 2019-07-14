---
title: "Writing/Reading Java Properties Files without external dependencies"
date: "2015-09-29"
---

In this short tutorial we focus on writing/reading Java Properties files without external dependencies.

Quoting Wikipedia:

> **.properties** is a file extension for files mainly used in Java related technologies to store the configurable parameters of an application. They can also be used for storing strings for Internationalization and localization; these are known as Property Resource Bundles.
> 
> Each parameter is stored as a pair of strings, one storing the name of the parameter (called the _key_), and the other storing the value.

We usually come across properties files when dealing with configurations or translations. Those files have the following format:

```
\# Comment
key1 = value1
key2 = value2
```

Within the java.util package, we already have classes for reading and writing properties files.

## Creating a Java Properties file

```java
Properties properties = new Properties();
properties.setProperty("key1", "value1");
properties.setProperty("key2", "value2");
 
FileOutputStream fos = new FileOutputStream("C:/test.properties");
 
properties.store(fos, null);
fos.flush();
```

## Reading from a Java Properties file

```java
Properties prop = new Properties();
 
prop.load(new FileInputStream("C:/test.properties"));
System.out.println(prop.getProperty("key1"));
```