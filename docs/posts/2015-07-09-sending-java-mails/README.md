---
title: "Sending mails with Java - Text, HTML or with attachment (Apache Commons Mail)"
date: "2015-07-09"
---

Sending mails with Java is pretty simple using the Apache Commons Mail Library. Start by adding the commons-email dependency to your poject

```xml
<dependency>
  <groupId>org.apache.commons</groupId>
  <artifactId>commons-email</artifactId>
  <version>1.4</version>
</dependency>
```

## Sending plain-text Emails

Here's a code sample for sending a plain-text email using the GMail SMTP server. Settings the debug mode to true, we get a lot of output on what happens.

```java
  private static final String SMTP\_HOST = "smtp.gmail.com";
  private static final int SMTP\_PORT = 465;
  
  private static final String USERNAME = "user@gmail.com";
  private static final String PASSWORD = "pw";

  public static void main(String\[\] args) throws EmailException
  {
    SimpleEmail email = new SimpleEmail();
    email.setHostName(SMTP\_HOST);
    email.setAuthentication(USERNAME, PASSWORD);
    email.setDebug(true);
    email.setSmtpPort(SMTP\_PORT);
    email.setSSLOnConnect(true);

    email.addTo("empfaenger@domain.de");

    email.setFrom(USERNAME, "Name of thesender");
    email.setSubject("Test message");
    email.setMsg("Hey, this is a simple text");
    email.send();
  }
```

## Sending emails with attachments

For sending emails with attachments, we cannot use the _SimpleEmail class_. We need to use the **MultiPartEmail** class.

There are multiple ways to add an attachment to a mail. One example:

```java
EmailAttachment attachment = new EmailAttachment();
attachment.setPath("mypictures/john.jpg");
attachment.setDisposition(EmailAttachment.ATTACHMENT);
attachment.setDescription("Picture of John");
attachment.setName("John");

email.attach(attachment);
```

or even easier:

```java
email.attach(new File("C:/testfile.txt"));
```

You can also provide an URL to a file, that will be downloaded and attached:

```java
mail.attach(new URL("http://urltofile.extension"), "Name", "Description");
```

An entire code sample for sending a mail with an attachment may look like this:

```java
MultiPartEmail email = new MultiPartEmail();
email.setHostName(SMTP\_HOST);
email.setAuthentication(USERNAME, PASSWORD);
email.setDebug(true);
email.setSmtpPort(SMTP\_PORT);
email.setSSLOnConnect(true);
    
email.attach(new File("C:/testfile.txt"));

email.addTo("empfaenger@domain.de");

email.setFrom(USERNAME, "Sender name");
email.setSubject("Test message with attachment");
email.setMsg("Hey there, here is my file");
email.send();
```

## Sending emails with HTML

To send emails with HTML, you need to use the _HtmlEmail_ class.

```java
HtmlEmail email = new HtmlEmail();
email.setHostName(SMTP\_HOST);
email.setAuthentication(USERNAME, PASSWORD);
email.setDebug(true);
email.setSmtpPort(SMTP\_PORT);
email.setSSLOnConnect(true);

email.setHtmlMsg("<html>Test message with <b>HTML</b></html>");

// Just in case HTML is unsupported
email.setTextMsg("Dein E-Mail-Client unterstützt kein HTML.");

email.addTo("recipient@domain.de");
email.setFrom(USERNAME, "Sender");
email.setSubject("Test message with HTML");
email.send();
```

If you like this post, feel free to follow me or hit me up on [Twitter](https://twitter.com/kevcodez).